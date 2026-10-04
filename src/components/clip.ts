import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./demo.tsx";

const HAVE_CURRENT_DATA = 2;

// One voice at a time on a page: whichever the visitor starts stops the rest
const voices = new Set<() => void>();

/**
 * A narration clip that drives a demo's clock. It plays muted until the visitor has interacted,
 * and when the browser refuses or the clip is still loading, the clock runs off the wall instead.
 * Switching `url` keeps the clock where it is, so a caller switching clips seeks too.
 */
export function useClip({ url, length, inView, autoStart }: {
  url: string;
  /** Where the wall clock wraps until the clip's own duration is known */
  length: number;
  inView: boolean;
  autoStart: boolean;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const reduced = useReducedMotion();

  const [ms, setMs] = useState(0);
  const msRef = useRef(0);
  // Set while the highlight is running off the wall clock instead of the element
  const wallClock = useRef<{ stamp: number; from: number } | null>(null);
  const [isPlaying, setPlaying] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [visible, setVisible] = useState(true);
  const [loaded, setLoaded] = useState<Record<string, string>>({});
  const src = loaded[url];

  // Playing is what the reader asked for. Scrolling past does not stop the narration, it silences
  // it — coming back to a paused reader mid-sentence was worse than coming back to a live one.
  const audible = soundOn && inView && visible;
  const shouldPlay = isPlaying && visible;

  useEffect(() => {
    const onChange = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", onChange);
    return () => document.removeEventListener("visibilitychange", onChange);
  }, []);

  // Only ever once: a pause the reader asked for must survive scrolling away and back
  const autoStarted = useRef(false);
  useEffect(() => {
    if (!autoStart || autoStarted.current || !inView || reduced) return;
    autoStarted.current = true;
    setPlaying(true);
  }, [autoStart, inView, reduced]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audible;
  }, [audible]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    // Without a source yet, the element would play on in the clip it was switched from
    if (!shouldPlay || !src) {
      audio.pause();
      return;
    }
    // Muted, which every browser allows to autoplay — the mute effect above has already applied it.
    // A refusal is not fatal: the tick below falls back to a wall clock and the demo still runs.
    // soundOn is a dep because turning the sound on is a gesture, and a gesture is the one thing
    // that can start audio a refused autoplay never got.
    // src is a dep because a new source resets the element to paused.
    audio.play().catch(() => {});
  }, [shouldPlay, soundOn, src]);

  // Sound is an upgrade, never a gamble: take it only where the browser says the visitor has
  // really interacted, because unmuting without that is what gets the whole thing stopped. Only
  // once, or turning the sound off would turn it straight back on.
  const upgraded = useRef(false);
  useEffect(() => {
    if (upgraded.current || !shouldPlay || !inView || soundOn) return;
    if (!navigator.userActivation?.hasBeenActive) return;
    upgraded.current = true;
    setSoundOn(true);
  }, [shouldPlay, inView, soundOn]);

  // Cloudflare Pages answers a Range request with a plain 200, and an element streaming from a
  // server like that cannot seek. A blob seeks everywhere, and the clip is small enough to take whole.
  useEffect(() => {
    if (!inView || src) return;
    let cancelled = false;
    const keep = (from: string) => !cancelled && setLoaded((all) => ({ ...all, [url]: from }));
    fetch(url)
      .then((res) => (res.ok ? res.blob() : Promise.reject(new Error(String(res.status)))))
      .then((blob) => keep(URL.createObjectURL(blob)))
      .catch(() => keep(url));
    return () => {
      cancelled = true;
    };
  }, [inView, src, url]);

  useEffect(() => {
    if (!shouldPlay || !inView) return;
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const audio = audioRef.current;
      // paused flips false the instant play() is called and stays false all through buffering, so
      // readyState is what actually says the element is producing time
      if (audio && !audio.paused && audio.readyState >= HAVE_CURRENT_DATA) {
        // Handing back after a silent stretch: the voice picks up where the highlight had got to
        if (wallClock.current) {
          audio.currentTime = msRef.current / 1000;
          wallClock.current = null;
        }
        msRef.current = audio.currentTime * 1000;
      } else {
        // Autoplay refused, still buffering, or stalled mid-clip. Wall clock, never frame deltas —
        // the point is that the highlight runs anyway rather than the panel sitting frozen.
        if (!wallClock.current) wallClock.current = { stamp: performance.now(), from: msRef.current };
        const loop = audio && audio.duration > 0 ? audio.duration * 1000 : length;
        const { stamp, from } = wallClock.current;
        msRef.current = (from + performance.now() - stamp) % loop;
      }
      setMs(msRef.current);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [shouldPlay, inView, length]);

  const stop = useCallback(() => setPlaying(false), []);
  useEffect(() => {
    voices.add(stop);
    return () => {
      voices.delete(stop);
    };
  }, [stop]);

  // A press on play or on a word asks to hear it, and is itself the gesture that allows sound —
  // unless the visitor has already set the sound themselves
  const play = useCallback(() => {
    for (const other of voices) if (other !== stop) other();
    if (!upgraded.current) {
      upgraded.current = true;
      setSoundOn(true);
    }
    setPlaying(true);
  }, [stop]);

  const toggleSound = useCallback(() => {
    upgraded.current = true;
    setSoundOn((on) => !on);
  }, []);

  const seek = useCallback((at: number) => {
    const audio = audioRef.current;
    msRef.current = at;
    setMs(at);
    // Rebase whichever clock is running, or the next frame drags the highlight straight back
    if (wallClock.current) wallClock.current = { stamp: performance.now(), from: at };
    if (audio) {
      audio.currentTime = at / 1000;
      audio.play().catch(() => {});
    }
    play();
  }, [play]);

  return { audioRef, src, ms, playing: isPlaying, play, pause: stop, soundOn, toggleSound, seek };
}
