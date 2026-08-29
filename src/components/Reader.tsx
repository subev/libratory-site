import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { AUDIO_SRC, CUES } from "./cues.ts";
import { Icon, PauseIcon, PlayIcon } from "./Icon.tsx";
import { Notes, useInView, useReducedMotion, Window } from "./demo.tsx";

const CHAPTER_OFFSET_MS = 312_000;
const CHAPTER_LENGTH = "24:58";

const NOTES = [
  { title: "The M4B", body: "Real chapter markers, cover, and the book's own metadata. It plays in any audiobook app, offline, and it is a file on your disk — not an entry in someone's catalogue." },
  { title: "The highlight is on the print", body: "Narration writes a cue file beside the audio: for every sentence, and — where the voice engine reports word timings, which not all of them do — for every word, the page it sits on and its rectangle. The reader draws those over the rendered page, so the words lighting up are the book's own." },
  { title: "Where the type is too small", body: "Column crops the margins away, Page shows the whole sheet, and Text reflows the spoken words at your own size. The reader measures the book's body type and says which one you want." },
];

type Rect = { x: number; y: number; w: number; h: number };

type Span = { start: number; from: number; to: number };

const SENTENCES: Span[] = [];
CUES.forEach(([, a, , s], i) => {
  const span = SENTENCES[s];
  if (span) span.to = i;
  else SENTENCES[s] = { start: a, from: i, to: i };
});

function timestamp(ms: number) {
  const total = Math.round(ms / 1000);
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
}

function activeSentence(ms: number) {
  for (let i = SENTENCES.length - 1; i >= 0; i--) {
    const span = SENTENCES[i];
    if (span && ms >= span.start) return i;
  }
  return -1;
}

/** One rect per visual line, so a sentence wrapping mid-page is lit as the reader sees it. */
function lineRects(rects: Rect[], from: number, to: number) {
  const lines = new Map<number, { x1: number; x2: number; y: number; h: number }>();
  for (let i = from; i <= to; i++) {
    const r = rects[i];
    if (!r) continue;
    const key = Math.round(r.y / 4);
    const line = lines.get(key);
    if (!line) lines.set(key, { x1: r.x, x2: r.x + r.w, y: r.y, h: r.h });
    else {
      line.x1 = Math.min(line.x1, r.x);
      line.x2 = Math.max(line.x2, r.x + r.w);
      line.y = Math.min(line.y, r.y);
    }
  }
  return [...lines.values()];
}

export function Reader() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  // Narration is intrusive in a way the silent demos are not: it counts as in view only once the
  // reader is properly on screen, not when a sliver of it is
  const inView = useInView(sectionRef, "-15% 0px -15% 0px");
  const reduced = useReducedMotion();

  const [ms, setMs] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [rects, setRects] = useState<Rect[]>([]);
  const [visible, setVisible] = useState(true);

  // Playing is what the reader asked for. Scrolling past does not stop the narration, it silences
  // it — coming back to a paused reader mid-sentence was worse than coming back to a live one.
  const audible = soundOn && inView && visible;
  const shouldPlay = playing && visible;

  // The app draws these from cues.json; here they are measured off the rendered words, so the
  // geometry is the real page geometry rather than numbers typed by hand
  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;
    const measure = () => {
      const base = page.getBoundingClientRect();
      const next = [...page.querySelectorAll("[data-word]")].map((node) => {
        const r = node.getBoundingClientRect();
        return { x: r.left - base.left, y: r.top - base.top, w: r.width, h: r.height };
      });
      setRects(next);
    };
    measure();
    // The body serif swaps in after first paint and every word moves with it
    document.fonts?.ready.then(measure).catch(() => {});
    const observer = new ResizeObserver(measure);
    observer.observe(page);
    return () => observer.disconnect();
  }, []);

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
    // Muted, which every browser allows to autoplay — the mute effect above has already applied it
    audio.play().catch(() => setPlaying(false));
  }, [shouldPlay]);

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
      if (audio) setMs(audio.currentTime * 1000);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [shouldPlay, inView]);

  const seek = useCallback((sentence: number) => {
    const audio = audioRef.current;
    const at = SENTENCES[sentence];
    if (!audio || !at) return;
    audio.currentTime = at.start / 1000;
    setMs(at.start);
    setPlaying(true);
  }, []);

  const measured = rects.length === CUES.length;
  const sentence = activeSentence(ms);
  const range = sentence >= 0 ? SENTENCES[sentence] : undefined;
  const wordIndex = CUES.findIndex(([, a, b]) => ms >= a && ms < b);
  const word = measured && wordIndex >= 0 ? rects[wordIndex] : undefined;

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
              <div className="pointer-events-none absolute inset-0 z-[2]">
                {measured && range
                  ? lineRects(rects, range.from, range.to).map((line, i) => (
                      <span
                        key={i}
                        className="absolute rounded-[2px] bg-[rgba(226,96,31,0.35)] mix-blend-multiply"
                        style={{ left: line.x1 - 2, top: line.y - 1, width: line.x2 - line.x1 + 4, height: line.h + 2 }}
                      />
                    ))
                  : null}
                <span
                  className="absolute rounded-[2px] bg-[rgba(226,96,31,0.62)] mix-blend-multiply"
                  style={{
                    left: word ? word.x - 1 : 0,
                    top: word ? word.y : 0,
                    width: word ? word.w + 2 : 0,
                    height: word ? word.h : 0,
                    opacity: word ? 1 : 0,
                    transition: "left 140ms ease-out, top 140ms ease-out, width 140ms ease-out, opacity 120ms linear",
                  }}
                />
              </div>
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
              ? "Click any sentence to hear it — the audio moves there."
              : "Turn the sound on — the highlight is following the real narration."}
          </p>

          <audio ref={audioRef} src={AUDIO_SRC} preload="none" loop className="hidden" />
        </div>
      </Window>

      <Notes items={NOTES}>
        <p className="border-t border-edge pt-4 font-mono text-[11.5px]/[1.6] text-ink-faint">
          This one is not a mock-up of the timing: the voice you hear is Kokoro
          <span className="text-ink-muted"> af_heart</span>, run through the app's own narration
          script, and the cursor is driven by the word timings it wrote out.
        </p>
      </Notes>
    </div>
  );
}
