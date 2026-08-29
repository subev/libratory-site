import { useEffect, useRef, useState, type ReactNode } from "react";
import { Icon, PlayIcon } from "./Icon.tsx";
import { useInView, useLoopClock, useReducedMotion, Window } from "./demo.tsx";

const CHAPTERS = [
  { title: "Letter 1 · To Mrs. Saville", pages: "p.1–6", words: 1820, duration: "11:42" },
  { title: "Letter 2", pages: "p.7–12", words: 2140, duration: "13:28" },
  { title: "Letter 3", pages: "p.13–15", words: 640, duration: "4:05" },
  { title: "Letter 4", pages: "p.16–28", words: 4310, duration: "27:11" },
  { title: "Chapter I", pages: "p.29–38", words: 3180, duration: "20:04" },
  { title: "Chapter II", pages: "p.39–49", words: 3640, duration: "22:57" },
  { title: "Chapter III", pages: "p.50–60", words: 3520, duration: "22:11" },
  { title: "Chapter IV", pages: "p.61–72", words: 3960, duration: "24:58", edited: true },
  { title: "Chapter V", pages: "p.73–83", words: 3240, duration: "20:26" },
];

const CHUNKS = 12;
const FILE_DONE = 3000;
const NARR_START = 4000;
const PER = 1400;
const ASSEMBLE = 3000;
const EPUB_LAG = 1200;
const HOLD = 5200;

const NARR_END = NARR_START + PER * CHAPTERS.length;
const ASSEMBLE_END = NARR_END + ASSEMBLE;
const LOOP = ASSEMBLE_END + EPUB_LAG + HOLD;

// First paint lands mid-narration rather than on an idle extract frame: some chapters done, one
// running, outputs still waiting
const START_AT = 7500;

const ROW = "grid-cols-[26px_32px_34px_minmax(180px,1fr)_168px_76px_84px_146px]";
const FILE_ROW = "grid-cols-[36px_34px_minmax(160px,1fr)_190px_90px_120px]";

const BADGES = {
  pending: "bg-[#fdf1e4]/8 text-ink-secondary",
  synthesizing: "bg-ember-bright/20 text-[oklch(0.8_0.15_50)]",
  done: "bg-green/18 text-green-bright",
  assembling: "bg-[oklch(0.5538_0.1207_66.44_/_0.24)] text-[oklch(0.8_0.11_66)]",
  extracting: "bg-[oklch(0.7952_0.1617_86.05_/_0.2)] text-[oklch(0.86_0.14_86)]",
} as const;

function Badge({ kind, children }: { kind: keyof typeof BADGES; children: string }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium whitespace-nowrap ${BADGES[kind]}`}>
      {children}
    </span>
  );
}

function Action({ dim, children }: { dim?: boolean; children: ReactNode }) {
  return (
    <span className={`flex size-6.5 items-center justify-center rounded-md border border-edge ${dim ? "text-[#fdf1e4]/30" : "text-ink-secondary"}`}>
      {children}
    </span>
  );
}

function Stage({ accent, running, bar, ring, children }: {
  accent: string;
  running: boolean;
  bar: string;
  ring?: string;
  children: ReactNode;
}) {
  return (
    <div className={`relative overflow-hidden rounded-xl border border-edge bg-raised px-4 py-3.5 ${accent}`}>
      {running ? (
        <div className="absolute inset-x-0 top-0 h-0.5 overflow-hidden">
          <div className={`h-full w-1/4 ${bar}`} style={{ animation: "slide-indeterminate 1.4s ease-in-out infinite" }} />
        </div>
      ) : null}
      {ring && running ? (
        <div
          className={`pointer-events-none absolute inset-0 rounded-xl ${ring}`}
          style={{ animation: "softpulse 2s ease-in-out infinite" }}
        />
      ) : null}
      {children}
    </div>
  );
}

export function Pipeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef);
  const reduced = useReducedMotion();
  const [running, setRunning] = useState(true);
  const [t, reset] = useLoopClock({ period: LOOP, start: START_AT, running: running && inView });

  useEffect(() => {
    if (reduced) setRunning(false);
  }, [reduced]);

  const extracting = t < FILE_DONE;
  const done = CHAPTERS.filter((_, i) => t >= NARR_START + (i + 1) * PER).length;
  const narrating = t >= NARR_START && t < NARR_END;
  const m4bReady = t >= ASSEMBLE_END;
  const epubReady = t >= ASSEMBLE_END + EPUB_LAG;
  const assembling = t >= NARR_END && !epubReady;
  const active = narrating ? Math.floor((t - NARR_START) / PER) : -1;

  // Once per change of active chapter: re-issuing a smooth scroll every frame restarts the
  // animation and the table never actually moves
  const scrolledTo = useRef(-2);
  useEffect(() => {
    if (scrolledTo.current === active) return;
    scrolledTo.current = active;
    listRef.current?.scrollTo({ top: active < 0 ? 0 : Math.max(0, (active - 2) * 52), behavior: "smooth" });
  }, [active]);

  const book = extracting
    ? (["extracting", "extracting"] as const)
    : t < NARR_START
      ? (["pending", "ready to narrate"] as const)
      : t < NARR_END
        ? (["synthesizing", `synthesizing ${done}/${CHAPTERS.length}`] as const)
        : t < ASSEMBLE_END
          ? (["assembling", "assembling"] as const)
          : (["done", "done"] as const);

  const caption = extracting
    ? "Extracting text and detecting chapters"
    : t < NARR_START
      ? "Chapters detected — ready to narrate"
      : t < NARR_END
        ? `Narrating chapter ${Math.min(CHAPTERS.length, done + 1)} of ${CHAPTERS.length} — local voice, no upload`
        : !m4bReady
          ? "Assembling the M4B with real chapter markers"
          : !epubReady
            ? "M4B assembled — the EPUB is still rendering"
            : "Done — an audiobook and an EPUB, both on disk";

  const waiting = t < NARR_END ? "waiting for narration" : "rendering...";
  const outputs = [
    { key: "m4b", icon: "fileAudio", title: "M4B audiobook", meta: "9 chapters · 2:47:02 · 148 MB", ready: m4bReady },
    { key: "epub", icon: "bookmark", title: "EPUB", meta: "9 chapters · read-along, audio inside", ready: epubReady },
  ] as const;

  return (
    <div ref={sectionRef}>
      <Window url="localhost:5544/books/frankenstein" tag="ON YOUR MACHINE">
        <div className="flex flex-col gap-4 px-4 pt-4 pb-5 font-sans sm:px-5">
          <div className="flex items-start gap-3.5">
            <div className="flex min-w-0 flex-col gap-0.5">
              <span className="text-[11.5px] text-ink-faint">‹ Library</span>
              <div className="flex items-center gap-2.5">
                <span className="font-display text-[23px] font-semibold tracking-tight text-ink">Frankenstein</span>
                <Badge kind={book[0]}>{book[1]}</Badge>
              </div>
              <span className="text-[12.5px] text-ink-muted">
                Mary Shelley · 294 pages · EN · Kokoro <span className="text-ink-faint">af_heart</span>
              </span>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <span className="hidden items-center gap-1.5 rounded-md border border-edge-strong px-2.5 py-1 text-xs text-ink-secondary sm:flex">
                <Icon name="chat" className="size-3.5" />
                Ask this book
              </span>
              <span className="flex size-7 items-center justify-center rounded-md border border-edge text-ink-secondary">
                <Icon name="gear" className="size-3.5" />
              </span>
            </div>
          </div>

          <Stage accent="border-t-2 border-t-brass/80" running={extracting} bar="bg-ember-bright">
            <div className="mb-2.5 flex items-center gap-3">
              <h3 className="flex items-baseline gap-2 text-[15px] font-semibold whitespace-nowrap text-ink-secondary">
                <span className="text-[10.5px] font-medium tracking-[0.08em] uppercase text-[oklch(0.82_0.11_78)]">1 · Input</span>
                Source files
              </h3>
              {extracting ? (
                <span className="flex items-center gap-1.5 text-[11.5px] font-medium text-ember-bright">
                  <span className="size-[7px] rounded-full bg-ember-bright" style={{ animation: "softpulse 1.4s ease-in-out infinite" }} />
                  Extracting 1 file...
                </span>
              ) : null}
              <span className="ml-auto hidden text-[12.5px] text-ink-muted sm:inline">1 of 1 selected</span>
            </div>
            <div className="mb-2.5 flex gap-2">
              <span className="rounded-[5px] bg-ember-bright px-2.5 py-1 text-[11.5px] font-medium text-[#2a1408]">Add files</span>
              <span className="rounded-[5px] border border-edge-strong px-2.5 py-1 text-[11.5px] font-medium text-ink-secondary">Extract...</span>
            </div>
            <div className="overflow-x-auto rounded-[9px] border border-edge">
              <div className={`grid ${FILE_ROW} min-w-[620px] items-center bg-inset text-[10.5px] font-medium tracking-[0.04em] uppercase text-ink-muted`}>
                <span className="py-2 pl-3" />
                <span className="py-2">#</span>
                <span className="py-2">Filename</span>
                <span className="py-2">Status</span>
                <span className="py-2 text-right">Chapters</span>
                <span className="py-2 pr-3 pl-4">Actions</span>
              </div>
              <div className={`grid ${FILE_ROW} min-w-[620px] h-11 items-center border-t border-edge`}>
                <span className="pl-3 text-ember-bright"><Icon name="check" className="size-4" /></span>
                <span className="font-mono text-[11.5px] text-ink-muted">1</span>
                <span className="flex min-w-0 items-center gap-2.5">
                  <span className="rounded-[5px] border border-edge-strong px-2 py-0.5 text-[10.5px] text-ink-secondary">PDF</span>
                  <span className="truncate text-[13px] text-ink">shelley-1888-frankenstein.pdf</span>
                </span>
                <span className={`text-xs font-medium ${extracting ? "text-ember-bright" : "text-green-bright"}`}>
                  {extracting ? "extracting" : "done"}
                </span>
                <span className="text-right text-[13px] tabular-nums text-ink-secondary">{CHAPTERS.length}</span>
                <span className="flex gap-1.5 pl-4">
                  <span className="flex size-6.5 items-center justify-center rounded-md bg-ember-bright/15 text-ember-bright"><Icon name="refresh" className="size-3.5" /></span>
                  <span className="flex size-6.5 items-center justify-center rounded-md bg-[oklch(0.5771_0.2152_27.325_/_0.2)] text-[oklch(0.74_0.15_27)]"><Icon name="trash" className="size-3.5" /></span>
                </span>
              </div>
            </div>
          </Stage>

          <Stage
            accent="border-t-2 border-t-ember-bright/80"
            running={narrating}
            bar="bg-ember-bright"
            ring="inset-ring-2 inset-ring-ember-bright/30"
          >
            <div className="mb-2.5 flex items-center gap-2.5">
              <h3 className="flex items-baseline gap-2 text-[15px] font-semibold whitespace-nowrap text-ink-secondary">
                <span className="text-[10.5px] font-medium tracking-[0.08em] uppercase text-ember-bright">2 · Work</span>
                Chapters
              </h3>
              <span className="hidden rounded-full bg-inset px-2.5 py-0.5 text-[11px] text-ink-muted sm:inline">LLM · ToC-matched</span>
              <span className="ml-auto hidden text-[12.5px] text-ink-muted sm:inline">
                {CHAPTERS.length} of {CHAPTERS.length} selected
              </span>
            </div>
            <div className="mb-2.5 flex gap-2">
              <span className="flex items-center gap-1.5 rounded-[5px] border border-edge-strong px-2.5 py-1 text-[11.5px] text-ink-secondary">
                <Icon name="list" className="size-3.5 text-ember-bright" />
                Structure
              </span>
              <span className="flex items-center gap-1.5 rounded-[5px] border border-edge-strong px-2.5 py-1 text-[11.5px] text-ink-secondary">
                <Icon name="translate" className="size-3.5 text-ember-bright" />
                Translate / Transform
              </span>
            </div>
            <div className="overflow-x-auto rounded-[9px] border border-edge">
              <div className={`grid ${ROW} min-w-[820px] items-center bg-inset text-[10.5px] font-medium tracking-[0.04em] uppercase text-ink-muted`}>
                <span className="py-2.5 pl-2.5" />
                <span className="py-2.5" />
                <span className="py-2.5">#</span>
                <span className="py-2.5">Title</span>
                <span className="py-2.5">Status</span>
                <span className="py-2.5 text-right">Words</span>
                <span className="py-2.5 text-right">Duration</span>
                <span className="py-2.5 pr-3 pl-4">Actions</span>
              </div>
              <div ref={listRef} className="h-[286px] overflow-y-auto">
                {CHAPTERS.map((chapter, i) => {
                  const start = NARR_START + i * PER;
                  const isDone = t >= start + PER;
                  const isRunning = t >= start && !isDone;
                  const pct = isRunning ? Math.min(1, (t - start) / (PER - 120)) : 0;
                  const kind = isDone ? "done" : isRunning ? "synthesizing" : "pending";
                  return (
                    <div
                      key={chapter.title}
                      className={`grid ${ROW} min-w-[820px] h-[52px] items-center transition-colors duration-300 ${
                        i === 0 ? "" : "border-t border-edge"
                      } ${isRunning ? "bg-ember-bright/5" : ""}`}
                    >
                      <span className="pl-2.5 text-ink-faint"><Icon name="grip" className="size-3.5" /></span>
                      <span className="text-ember-bright"><Icon name="check" className="size-4" /></span>
                      <span className="text-[12.5px] text-ink-secondary">{i + 1}</span>
                      <span className="flex min-w-0 items-center gap-2 pr-3">
                        <span className="truncate text-[13px] text-ink">{chapter.title}</span>
                        {chapter.edited ? (
                          <span className="rounded bg-brass/15 px-1.5 py-px text-[9.5px] font-medium text-[oklch(0.82_0.11_78)]">edited</span>
                        ) : null}
                        <span className="text-[11px] tabular-nums whitespace-nowrap text-ember-bright">{chapter.pages}</span>
                      </span>
                      <span className="flex flex-col gap-1.5 pr-3.5">
                        <span className="flex items-center gap-2">
                          <Badge kind={kind}>{kind}</Badge>
                          <span className="text-[10px] tabular-nums text-ink-muted">
                            {isRunning ? `${Math.max(1, Math.ceil(pct * CHUNKS))}/${CHUNKS}` : ""}
                          </span>
                        </span>
                        <span className={`h-[3px] w-full overflow-hidden rounded-full bg-page ${isRunning ? "" : "invisible"}`}>
                          <span className="block h-full rounded-full bg-ember-bright" style={{ width: `${pct * 100}%` }} />
                        </span>
                      </span>
                      <span className="text-right text-[12.5px] tabular-nums text-ink-secondary">{chapter.words.toLocaleString()}</span>
                      <span className="text-right text-[12.5px] tabular-nums text-ink-secondary">{isDone ? chapter.duration : "—"}</span>
                      <span className="flex gap-1.5 pl-4">
                        <Action dim={!isDone}><PlayIcon className="size-3" /></Action>
                        <Action><Icon name="expand" className="size-3" /></Action>
                        <Action><Icon name="book" className="size-3" /></Action>
                        <Action><Icon name="sparkle" className="size-3" /></Action>
                        <Action dim={!isDone}><Icon name="download" className="size-3" /></Action>
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </Stage>

          <Stage
            accent="border-t-2 border-t-green/80"
            running={assembling}
            bar="bg-green"
            ring="inset-ring-2 inset-ring-green/30"
          >
            <div className="mb-2.5 flex items-center gap-3">
              <h3 className="flex items-baseline gap-2 text-[15px] font-semibold whitespace-nowrap text-ink-secondary">
                <span className="text-[10.5px] font-medium tracking-[0.08em] uppercase text-green-bright">3 · Output</span>
                Assemblies and documents
              </h3>
              {t >= NARR_END && !epubReady ? (
                <span className="flex items-center gap-1.5 text-[11.5px] font-medium text-green-bright">
                  <span className="size-[7px] rounded-full bg-green" style={{ animation: "softpulse 1.4s ease-in-out infinite" }} />
                  {m4bReady ? "rendering EPUB..." : "assembling M4B · rendering EPUB..."}
                </span>
              ) : null}
            </div>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {outputs.map((output) => (
                <div
                  key={output.key}
                  className={`grid grid-cols-[38px_1fr_auto] items-center gap-3 rounded-[9px] px-3.5 py-3 transition-colors duration-500 ${
                    output.ready
                      ? "border border-green/45 bg-green/7"
                      : "border border-dashed border-[#fdf1e4]/16"
                  }`}
                >
                  <span className={`flex size-9.5 items-center justify-center rounded-lg ${output.ready ? "bg-green/18 text-green-bright" : "bg-inset text-ink-faint"}`}>
                    <Icon name={output.icon} className="size-5" />
                  </span>
                  <span className="flex min-w-0 flex-col gap-0.5">
                    <span className="text-[13.5px] font-semibold text-ink">{output.title}</span>
                    <span className="text-[11.5px] tabular-nums text-ink-muted">{output.ready ? output.meta : waiting}</span>
                  </span>
                  <span className={`text-[11.5px] font-semibold text-green-bright ${output.ready ? "" : "invisible"}`}>Download</span>
                </div>
              ))}
            </div>
          </Stage>
        </div>
      </Window>

      <div className="mt-4 flex items-center gap-4 text-[0.95rem] text-ink-faint">
        <span>{caption}</span>
        <span className="ml-auto flex gap-3.5">
          <button type="button" onClick={() => setRunning((on) => !on)} className="text-brass transition-colors hover:text-ember-bright">
            {running ? "Pause" : "Play"}
          </button>
          <button type="button" onClick={() => { reset(0); setRunning(true); }} className="text-brass transition-colors hover:text-ember-bright">
            Start again
          </button>
        </span>
      </div>
    </div>
  );
}
