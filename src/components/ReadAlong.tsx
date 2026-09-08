import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { AUDIO_SRC, CUES } from "./cues.ts";
import { Icon, PauseIcon, PlayIcon } from "./Icon.tsx";
import { Notes, useInView, useReducedMotion, Window } from "./demo.tsx";
import { CUE_END, Highlight, SENTENCES, useWordRects } from "./highlight.tsx";

const CHAPTER_OFFSET_MS = 312_000;
const CHAPTER_LENGTH = "24:58";

const NOTES = [
  { title: "Listen anywhere", body: "Save an M4B audiobook with chapters. Play it offline in an app that supports M4B." },
  { title: "Follow the words", body: "See the sentence being read on the original page. Voices with word timing can highlight each word, too." },
  { title: "Make the text bigger", body: "Zoom in on the page or switch to text at a size you choose." },
];

const HAVE_CURRENT_DATA = 2;

function timestamp(ms: number) {
  const total = Math.round(ms / 1000);
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
}

export function ReadAlong() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  // Narration is intrusive in a way the silent demos are not: it counts as in view only once the
  // reader is properly on screen, not when a sliver of it is
  const inView = useInView(sectionRef, "-15% 0px -15% 0px");
  const reduced = useReducedMotion();

  const [ms, setMs] = useState(0);
  const msRef = useRef(0);
  // Set while the highlight is running off the wall clock instead of the element
  const wallClock = useRef<{ stamp: number; from: number } | null>(null);
  const [playing, setPlaying] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [visible, setVisible] = useState(true);
  const rects = useWordRects(pageRef);

  // Playing is what the reader asked for. Scrolling past does not stop the narration, it silences
  // it — coming back to a paused reader mid-sentence was worse than coming back to a live one.
  const audible = soundOn && inView && visible;
  const shouldPlay = playing && visible;

  useEffect(() => {
    const onChange = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", onChange);
    return () => document.removeEventListener("visibilitychange", onChange);
  }, []);

  // Only ever once: a pause the reader asked for must survive scrolling away and back
  const autoStarted = useRef(false);
  useEffect(() => {
    if (autoStarted.current || !inView || reduced) return;
    autoStarted.current = true;
    setPlaying(true);
  }, [inView, reduced]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audible;
  }, [audible]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!shouldPlay) {
      audio.pause();
      return;
    }
    // Muted, which every browser allows to autoplay — the mute effect above has already applied it.
    // A refusal is not fatal: the tick below falls back to a wall clock and the demo still runs.
    // soundOn is a dep because turning the sound on is a gesture, and a gesture is the one thing
    // that can start audio a refused autoplay never got.
    audio.play().catch(() => {});
  }, [shouldPlay, soundOn]);

  // Sound is an upgrade, never a gamble: take it only where the browser says the visitor has
  // really interacted, because unmuting without that is what gets the whole thing stopped
  useEffect(() => {
    if (!shouldPlay || !inView || soundOn) return;
    if (navigator.userActivation?.hasBeenActive) setSoundOn(true);
  }, [shouldPlay, inView, soundOn]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !inView) return;
    audio.preload = "auto";
  }, [inView]);

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
        const loop = audio && audio.duration > 0 ? audio.duration * 1000 : CUE_END;
        const { stamp, from } = wallClock.current;
        msRef.current = (from + performance.now() - stamp) % loop;
      }
      setMs(msRef.current);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [shouldPlay, inView]);

  const seek = useCallback((sentence: number) => {
    const audio = audioRef.current;
    const at = SENTENCES[sentence];
    if (!at) return;
    msRef.current = at.start;
    setMs(at.start);
    // Rebase whichever clock is running, or the next frame drags the highlight straight back
    if (wallClock.current) wallClock.current = { stamp: performance.now(), from: at.start };
    if (audio) {
      audio.currentTime = at.start / 1000;
      audio.play().catch(() => {});
    }
    setPlaying(true);
  }, []);

  return (
    <div ref={sectionRef} className="grid gap-9 lg:grid-cols-[1fr_320px] lg:items-start">
      <Window url="localhost:5544/read/book/frankenstein?chapter=4" tag="READ-ALONG">
        <div className="px-4 pt-3.5 pb-5 font-sans sm:px-5">
          <div className="flex flex-wrap items-center gap-2.5 border-b border-edge pb-3">
            <button
              type="button"
              onClick={() => setPlaying((on) => !on)}
              aria-label={playing ? "Pause the narration" : "Play the narration"}
              className="flex size-7 items-center justify-center rounded-md border border-edge text-ink transition-colors hover:bg-inset"
            >
              {playing ? <PauseIcon className="size-3" /> : <PlayIcon className="size-3" />}
            </button>
            <button
              type="button"
              onClick={() => setSoundOn((on) => !on)}
              className={`flex h-7 items-center gap-1.5 rounded-md border px-2 text-[11.5px] transition-colors ${
                soundOn
                  ? "border-edge text-ink hover:bg-inset"
                  : "border-ember-bright/60 bg-ember-bright/10 text-ember-bright"
              }`}
            >
              <Icon name={soundOn ? "speaker" : "speakerOff"} className="size-3.5" />
              {soundOn ? "Sound on" : "Sound off"}
            </button>
            <span className="flex items-center gap-1.5 rounded-md border border-edge bg-raised px-2 py-1 text-xs text-ink">
              5. Chapter IV
              <Icon name="caret" className="size-2.5 text-ink-faint" />
            </span>
            <span className="hidden items-center gap-1.5 rounded-md border border-edge bg-raised px-2 py-1 text-[11.5px] text-ink sm:flex">
              1x
              <Icon name="caret" className="size-2.5 text-ink-faint" />
            </span>
            <span className="text-[11.5px] tabular-nums text-ink-muted">
              {timestamp(CHAPTER_OFFSET_MS + ms)} / {CHAPTER_LENGTH}
            </span>
            <span className="hidden gap-0.5 rounded-md border border-edge bg-raised p-0.5 md:flex">
              <span className="rounded bg-ember-bright px-2.5 py-0.5 text-[11px] font-medium text-[#2a1408]">Column</span>
              <span className="rounded px-2.5 py-0.5 text-[11px] text-ink-secondary">Page</span>
              <span className="rounded px-2.5 py-0.5 text-[11px] text-ink-secondary">Text</span>
            </span>
            <span className="ml-auto hidden items-center gap-2.5 lg:flex">
              <span className="rounded bg-inset px-1.5 py-0.5 text-[10px] font-medium tracking-[0.06em] uppercase text-ink-muted">word</span>
              <span className="text-[11px] tabular-nums text-ink-muted">16px · 94%</span>
            </span>
          </div>

          <div className="relative mt-3.5 rounded-sm bg-white px-5 pt-6 pb-5 shadow-[0_2px_14px_rgba(0,0,0,0.45)] sm:px-6">
            <div className="mb-3.5 flex justify-between text-[8.5px] tracking-[0.16em] text-[#1a1815]/45">
              <span>FRANKENSTEIN</span>
              <span>173</span>
            </div>
            <div
              ref={pageRef}
              className="relative isolate text-left font-body text-[15.5px]/[1.66] text-[#14120e]"
            >
              <Highlight rects={rects} ms={ms} line="rgba(226,96,31,0.35)" word="rgba(226,96,31,0.62)" />
              {CUES.map(([text, , , s], i) => (
                // The space between the spans is the only place the browser may break the line
                <Fragment key={i}>
                  <span data-word onClick={() => seek(s)} className="inline cursor-pointer">
                    {text}
                  </span>{" "}
                </Fragment>
              ))}
            </div>
            <p className="mt-4 text-center text-[9.5px] text-[#1a1815]/45">173</p>
          </div>

          <p className="mt-3 text-center text-[11.5px] text-ink-faint">
            {soundOn
              ? "Tap a sentence to hear it."
              : "Turn the sound on to hear this page."}
          </p>

          <audio ref={audioRef} src={AUDIO_SRC} preload="none" loop className="hidden" />
        </div>
      </Window>

      <Notes items={NOTES}>
        <p className="border-t border-edge pt-4 font-mono text-[11.5px]/[1.6] text-ink-faint">
          Made with Kokoro, one of the free voices in Libratory.
        </p>
      </Notes>
    </div>
  );
}
