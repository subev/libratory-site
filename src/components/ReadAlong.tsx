import { Fragment, useRef } from "react";
import { useClip } from "./clip.ts";
import { AUDIO_SRC, CUES } from "./cues.ts";
import { Icon, PauseIcon, PlayIcon } from "./Icon.tsx";
import { Notes, useInView, Window } from "./demo.tsx";
import { CUE_END, Highlight, SENTENCES, useWordRects } from "./highlight.tsx";

const CHAPTER_OFFSET_MS = 312_000;
const CHAPTER_LENGTH = "24:58";

const NOTES = [
  { title: "Listen anywhere", body: "Save an M4B audiobook with chapters. Play it offline in an app that supports M4B." },
  { title: "Follow the words", body: "See the sentence being read on the original page. Voices with word timing can highlight each word, too." },
  { title: "Make the text bigger", body: "Zoom in on the page or switch to text at a size you choose." },
];

function timestamp(ms: number) {
  const total = Math.round(ms / 1000);
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
}

export function ReadAlong() {
  const pageRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  // Narration is intrusive in a way the silent demos are not: it counts as in view only once the
  // reader is properly on screen, not when a sliver of it is
  const inView = useInView(sectionRef, "-15% 0px -15% 0px");

  const { audioRef, src, ms, playing, play, pause, soundOn, toggleSound, seek: seekMs } = useClip({
    url: AUDIO_SRC,
    length: CUE_END,
    inView,
    autoStart: true,
  });
  const rects = useWordRects(pageRef);

  const seek = (sentence: number) => {
    const at = SENTENCES[sentence];
    if (at) seekMs(at.start);
  };

  return (
    <div ref={sectionRef} className="grid gap-9 lg:grid-cols-[1fr_320px] lg:items-start">
      <Window url="localhost:5544/read/book/frankenstein?chapter=4" tag="READ-ALONG">
        <div className="px-4 pt-3.5 pb-5 font-sans sm:px-5">
          <div className="flex flex-wrap items-center gap-2.5 border-b border-edge pb-3">
            <button
              type="button"
              onClick={playing ? pause : play}
              aria-label={playing ? "Pause the narration" : "Play the narration"}
              className="flex size-7 items-center justify-center rounded-md border border-edge text-ink transition-colors hover:bg-inset"
            >
              {playing ? <PauseIcon className="size-3" /> : <PlayIcon className="size-3" />}
            </button>
            <button
              type="button"
              onClick={toggleSound}
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

          <audio ref={audioRef} src={src ?? undefined} loop className="hidden" />
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
