import { useEffect, useRef, useState, type ReactNode } from "react";
import { Phos, ThemeGlyph, type PhosName } from "./Phos.tsx";
import {
  App, Btn, Check, Divider, IconBtn, Pill, Tray, useAppWidth, useInView, useLoopClock,
  useReducedMotion, Window,
} from "./demo.tsx";

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

const FILE_ROW = "grid-cols-[44px_48px_minmax(200px,1fr)_200px_110px_130px]";

// The three tabs have very different natural heights, and the loop walks through all of them, so the
// window is held at the tallest — Outputs, with all three files listed — and the body fills whatever
// the chrome leaves. Switching tabs mid-loop must not move the page under it.
const FRAME = "h-[720px]";

const BADGES = {
  pending: "bg-[#fdf1e4]/8 text-ink-secondary",
  synthesizing: "bg-ember-bright/20 text-[oklch(0.8_0.15_50)]",
  done: "bg-green/18 text-green-bright",
} as const;

function Badge({ kind, children }: { kind: keyof typeof BADGES; children: string }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap ${BADGES[kind]}`}>
      {children}
    </span>
  );
}

function Working({ tone, children }: { tone: string; children: string }) {
  return (
    <span className={`flex items-center gap-1.5 rounded-full px-1.5 text-[10.5px] font-semibold ${tone}`}>
      <span className="size-1.5 rounded-full bg-current" style={{ animation: "softpulse 1.15s ease-in-out infinite" }} />
      {children}
    </span>
  );
}

function Tab({ n, label, count, active, showLabel, children }: {
  n: number;
  label: string;
  count: number;
  active: boolean;
  showLabel: boolean;
  children?: ReactNode;
}) {
  return (
    <span
      className={`flex items-center gap-2 border-b-2 px-3 ${
        active ? "border-ember-bright font-bold text-ink" : "border-transparent font-medium text-ink-muted"
      }`}
    >
      <span
        className={`grid size-4 place-items-center rounded-full border text-[9.5px] font-bold ${
          active ? "border-ember-bright bg-ember-bright text-[#2a1408]" : "border-edge-strong text-ink-faint"
        }`}
      >
        {n}
      </span>
      {showLabel ? label : null}
      <span className="font-normal tabular-nums text-ink-faint">{count}</span>
      {children}
    </span>
  );
}

function RowAction({ icon, dim }: { icon: PhosName; dim?: boolean }) {
  return (
    <span className={`flex size-6.5 items-center justify-center rounded-md border border-edge ${dim ? "text-[#fdf1e4]/30" : "text-ink-secondary"}`}>
      <Phos name={icon} className="size-3.5" />
    </span>
  );
}

function Output({ first, title, meta, lead, icon, tone, file, format, sub, size, latest, read }: {
  first?: boolean;
  title: string;
  meta: string;
  lead: string;
  icon: PhosName;
  tone: string;
  file?: string;
  format?: string;
  sub?: string;
  size?: string;
  latest?: boolean;
  read?: boolean;
}) {
  return (
    <>
      <div className={`flex items-baseline gap-3 ${first ? "mt-4.5" : "mt-6.5"}`}>
        <span className="font-display text-[19px] font-semibold text-ink">{title}</span>
        <span className="text-[13px] text-ink-muted">{meta}</span>
      </div>
      <p className="mt-1.5 max-w-[56ch] text-[13px]/[1.5] text-ink-muted">{lead}</p>
      {file ? (
        <div className="mt-3 grid grid-cols-[40px_1fr_auto] items-center gap-3.5 rounded-lg border border-edge bg-raised px-3.5 py-3">
          <span className={`flex size-10 items-center justify-center rounded-lg ${tone}`}>
            <Phos name={icon} className="size-5" />
          </span>
          <span className="flex min-w-0 flex-col gap-[3px]">
            <span className="flex min-w-0 items-center gap-2">
              <span className="truncate text-sm font-semibold text-ink">{file}</span>
              <span className="flex-none rounded border border-edge-strong px-1.5 py-px text-[10px] font-medium tracking-[0.05em] text-ink-secondary">
                {format}
              </span>
            </span>
            <span className="text-xs text-ink-muted">{sub}</span>
          </span>
          <span className="flex items-center gap-2.5">
            {latest ? (
              <span className="flex-none rounded-full bg-green/18 px-2 py-0.5 text-[10px] font-semibold text-green-bright">latest</span>
            ) : null}
            <span className="text-[13px] tabular-nums text-ink-secondary">{size}</span>
            {read ? <Phos name="book" className="size-4.5 text-ember-bright" /> : null}
            <Phos name="download" className="size-4.5 text-ember-bright" />
            <Phos name="trash" className="size-4.5 text-[oklch(0.74_0.15_27)]" />
          </span>
        </div>
      ) : null}
    </>
  );
}

export function Pipeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef);
  const reduced = useReducedMotion();
  const appW = useAppWidth();
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

  // The tab on show is the stage that is working, rather than all three panels stacked at once
  const onChapters = !extracting && !m4bReady;

  // Once per change of active chapter: re-issuing a smooth scroll every frame restarts the
  // animation and the table never actually moves
  const scrolledTo = useRef(-2);
  useEffect(() => {
    if (scrolledTo.current === active) return;
    scrolledTo.current = active;
    listRef.current?.scrollTo({ top: active < 0 ? 0 : Math.max(0, (active - 2) * 52), behavior: "smooth" });
  }, [active]);

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

  const showHeadMeta = appW >= 1180;
  const showWords = appW >= 1120;
  const showDuration = appW >= 1000;
  const showLabels = appW >= 1000;

  const chapterCols = [
    "28px 40px 44px minmax(140px,1fr) 168px",
    showWords ? "88px" : "",
    showDuration ? "96px" : "",
    "228px",
  ].filter(Boolean).join(" ");

  const working = extracting || narrating || assembling;

  return (
    <div ref={sectionRef}>
      <Window url="localhost:5544/books/frankenstein" tag="ON YOUR MACHINE" wide>
        <App frame={FRAME}>
          <div className="flex h-12 flex-none items-center gap-3 border-b border-edge bg-raised px-4">
            <span className="flex-none text-[13px] text-ember-bright">Home</span>
            <span className="flex flex-none items-center gap-1">
              <IconBtn><Phos name="arrowLeft" className="size-4" /></IconBtn>
              {showHeadMeta ? <span className="text-xs tabular-nums text-ink-faint">5 of 5</span> : null}
              <IconBtn><Phos name="arrowRight" className="size-4" /></IconBtn>
            </span>
            <Divider />
            <span className="flex min-w-0 flex-1 items-baseline gap-3">
              <span className="truncate font-display text-[18px] font-semibold tracking-[-0.01em] text-ink">Frankenstein</span>
              {showHeadMeta ? (
                <span className="flex-none text-xs whitespace-nowrap text-ink-muted">1 file · 9 chapters · 2:47:02</span>
              ) : null}
            </span>
            <Btn>
              <Phos name="chat" className="size-4" />
              {showLabels ? "Chat" : null}
              <span className="size-1.5 rounded-full bg-green-bright" />
            </Btn>
            <Btn><Phos name="sparkle" className="size-4" />{showLabels ? "Ask AI" : null}</Btn>
            <Btn><Phos name="book" className="size-4" />{showLabels ? "Read" : null}</Btn>
            <Btn>
              <Phos name="translate" className="size-4" />
              {showLabels ? "Original · EN" : null}
              <Phos name="caretDown" className="size-3 text-ink-faint" />
            </Btn>
            <span className="ml-2 flex">
              <Btn><ThemeGlyph /><Phos name="caretDown" className="size-3 text-ink-faint" /></Btn>
            </span>
            <IconBtn><Phos name="dots" className="size-4" /></IconBtn>
          </div>

          <div className="flex h-11 flex-none items-stretch gap-1 border-b border-edge bg-raised px-4">
            <Tab n={1} label="Source files" count={1} active={extracting} showLabel={showLabels || extracting} />
            <Tab n={2} label="Chapters" count={CHAPTERS.length} active={onChapters} showLabel={showLabels || onChapters}>
              {narrating ? (
                <Working tone="bg-ember-bright/20 text-[oklch(0.8_0.15_50)]">{`${CHAPTERS.length - done} to synthesize`}</Working>
              ) : null}
            </Tab>
            <Tab
              n={3}
              label="Outputs"
              count={epubReady ? 3 : m4bReady ? 1 : 0}
              active={m4bReady}
              showLabel={showLabels || m4bReady}
            >
              {assembling ? (
                <Working tone="bg-[oklch(0.5538_0.1207_66.44_/_0.24)] text-[oklch(0.8_0.11_66)]">assembling</Working>
              ) : null}
            </Tab>
            <span className="ml-auto flex items-center text-[11.5px] text-ink-faint">
              {onChapters && appW >= 1180 ? `${done} of ${CHAPTERS.length} chapters have audio` : ""}
            </span>
          </div>

          {extracting ? (
            <div className="min-h-0 flex-1 overflow-y-auto p-4">
              <div className="rounded-lg border border-edge bg-raised p-4">
                <div className="flex flex-wrap items-baseline gap-3">
                  <span className="font-display text-[17px] font-semibold text-ink">Source files</span>
                  <span className="text-xs text-ink-muted">Chapters are numbered in file order — reorder them in the Chapters tab.</span>
                  <span className="ml-auto text-xs text-ink-muted">1 of 1 selected</span>
                </div>
                <div className="mt-3.5 flex gap-2">
                  <Btn>Add files</Btn>
                  <Btn>Extract…</Btn>
                </div>
                <div className="mt-3 overflow-hidden rounded-lg border border-edge">
                  <div className={`grid ${FILE_ROW} items-center bg-inset text-xs font-medium tracking-[0.05em] uppercase text-ink-muted`}>
                    <span className="py-3 pl-3.5"><Check on /></span>
                    <span className="py-3">#</span>
                    <span className="py-3">Filename</span>
                    <span className="py-3">Status</span>
                    <span className="py-3 text-right">Chapters</span>
                    <span className="py-3 pl-5">Actions</span>
                  </div>
                  <div className={`grid ${FILE_ROW} h-13 items-center border-t border-edge`}>
                    <span className="pl-3.5"><Check on /></span>
                    <span className="text-[13px] text-[#fdf1e4]/72">1</span>
                    <span className="flex min-w-0 items-center gap-2.5">
                      <span className="rounded border border-edge-strong px-2 py-0.5 text-[11px] font-medium text-ink-secondary">PDF</span>
                      <span className="truncate text-sm text-ink">shelley-1888-frankenstein.pdf</span>
                    </span>
                    <span className="text-[13px] font-medium text-ember-bright">extracting</span>
                    <span className="text-right text-[13px] tabular-nums text-ink-secondary">{CHAPTERS.length}</span>
                    <span className="flex gap-2 pl-5 text-ember-bright">
                      <Phos name="refresh" className="size-4.5" />
                      <Phos name="trash" className="size-4.5 text-[oklch(0.74_0.15_27)]" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {onChapters ? (
            <div className="flex min-h-0 flex-1 flex-col p-4">
              <div className="flex flex-none flex-wrap gap-2">
                <Btn><Phos name="list" className="size-4 text-ember-bright" />Structure</Btn>
                <Btn>Manual boundaries</Btn>
              </div>
              <div className="mt-3.5 flex flex-none flex-wrap items-center gap-2">
                <Pill on>All {CHAPTERS.length}</Pill>
                <Pill>Needs audio {CHAPTERS.length - done}</Pill>
                <Pill>In flight {narrating ? 1 : 0}</Pill>
                <Pill>Needs attention 0</Pill>
                <span className="h-4 w-px bg-edge" />
                <span className="block w-42 rounded-md border border-edge-strong bg-raised px-2.5 py-[5px] text-ink-faint">Filter titles…</span>
                <span className="rounded-md border border-edge-strong px-2.5 py-[5px] font-semibold text-ink-secondary">Filters</span>
              </div>
              <div ref={listRef} className="mt-3 min-h-0 flex-1 overflow-y-auto overscroll-contain rounded-lg border border-edge">
                <div
                  className="sticky top-0 z-10 grid items-center bg-[#272420] text-xs font-medium tracking-[0.05em] uppercase text-ink-muted"
                  style={{ gridTemplateColumns: chapterCols }}
                >
                  <span className="py-3 pl-2" />
                  <span className="py-3 pl-3"><Check on /></span>
                  <span className="py-3">#</span>
                  <span className="py-3">Title</span>
                  <span className="py-3">Status</span>
                  {showWords ? <span className="py-3 text-right">Words</span> : null}
                  {showDuration ? <span className="py-3 pr-4 text-right">Duration</span> : null}
                  <span className="px-4 py-3">Actions</span>
                </div>
                {CHAPTERS.map((chapter, i) => {
                  const start = NARR_START + i * PER;
                  const isDone = t >= start + PER;
                  const isRunning = t >= start && !isDone;
                  const pct = isRunning ? Math.min(1, (t - start) / (PER - 120)) : 0;
                  const kind = isDone ? "done" : isRunning ? "synthesizing" : "pending";
                  return (
                    <div
                      key={chapter.title}
                      className={`grid h-13 items-center transition-colors duration-300 ${
                        i === 0 ? "" : "border-t border-edge"
                      } ${isRunning ? "bg-ember-bright/5" : ""}`}
                      style={{ gridTemplateColumns: chapterCols }}
                    >
                      <span className="pl-2 text-ink-faint"><Phos name="grip" className="size-4" /></span>
                      <span className="pl-3"><Check on /></span>
                      <span className="text-[13px] text-[#fdf1e4]/72">{i + 1}</span>
                      <span className="flex min-w-0 items-center gap-2.5 pr-3">
                        <span className="truncate text-sm font-semibold text-ink">{chapter.title}</span>
                        {chapter.edited ? (
                          <span className="flex-none rounded bg-brass/15 px-[5px] py-0.5 text-[10px] font-medium text-[oklch(0.82_0.11_78)]">edited</span>
                        ) : null}
                        <span className="flex-none text-xs tabular-nums whitespace-nowrap text-ember-bright">{chapter.pages}</span>
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
                      {showWords ? (
                        <span className="text-right text-[13px] tabular-nums text-[#fdf1e4]/72">{chapter.words.toLocaleString()}</span>
                      ) : null}
                      {showDuration ? (
                        <span className="pr-4 text-right text-[13px] tabular-nums text-[#fdf1e4]/72">{isDone ? chapter.duration : "—"}</span>
                      ) : null}
                      <span className="flex gap-1.5 px-4">
                        <RowAction icon="expand" />
                        <RowAction icon="play" dim={!isDone} />
                        <RowAction icon="book" />
                        <RowAction icon="sparkle" />
                        <RowAction icon="refresh" />
                        <RowAction icon="download" dim={!isDone} />
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}

          {m4bReady ? (
            <div className="min-h-0 flex-1 overflow-y-auto p-4">
              <div className="flex justify-end"><Btn wide>Export…</Btn></div>
              <Output
                first
                title="Audio + text"
                meta={epubReady ? "1 file · 213 MB" : "rendering…"}
                lead="Both formats in one file — the narration and the text locked together, so the words highlight as they are read."
                icon="book"
                tone="bg-ember-bright/16 text-ember-bright"
                file={epubReady ? "Frankenstein_readaloud_20260904_131252.epub" : undefined}
                format="EPUB"
                sub="9 chapters · Sep 4, 13:12"
                size="213 MB"
                read
              />
              <Output
                title="Audio only"
                meta="1 file · 148 MB"
                lead="Plain narration with chapter marks — plays in any audiobook app, in the car, or on a watch. BookPlayer is a good free one."
                icon="play"
                tone="bg-ember-bright/16 text-ember-bright"
                file="Frankenstein_20260904_114031.m4b"
                format="M4B"
                sub="2:47:02 · 9 chapter marks · Sep 4, 11:40"
                size="148 MB"
                latest
              />
              <Output
                title="Text only"
                meta={epubReady ? "1 file · 165 KB" : "—"}
                lead="No audio — small, and opens anywhere: EPUB in Apple Books, Kobo, Kindle or Calibre, PDF in anything."
                icon="fileText"
                tone="bg-inset text-ink-muted"
                file={epubReady ? "Frankenstein_20260904_115436.epub" : undefined}
                format="EPUB"
                sub="9 chapters · Sep 4, 11:54"
                size="165 KB"
              />
            </div>
          ) : null}

          {onChapters ? (
            <Tray
              title={`All ${CHAPTERS.length} selected`}
              sub={narrating ? `${done} with audio · 1 in flight` : `${done} with audio`}
            >
              <Btn>Synthesize ({CHAPTERS.length})</Btn>
              {showLabels ? <Btn dim>Translate (0)</Btn> : null}
              {showLabels ? <Btn>Cleanup ({CHAPTERS.length})</Btn> : null}
              {showLabels ? <Btn>Ask AI</Btn> : null}
              {showLabels ? null : <Btn>More</Btn>}
              <Btn variant="danger">Delete ({CHAPTERS.length})</Btn>
              <Divider />
              <Btn variant="solid" wide>Export…</Btn>
            </Tray>
          ) : null}

          <div className="flex h-9 flex-none items-center gap-3 border-t border-[#fdf1e4]/15 bg-[#100e0a] px-4 font-mono text-xs text-ink">
            <span className="flex flex-none items-center gap-1.5 font-sans font-medium text-[#fdf1e4]/50">
              <span
                className={`size-2 rounded-full ${working ? "bg-green" : "bg-[#fdf1e4]/50"}`}
                style={working ? { animation: "softpulse 1.15s ease-in-out infinite" } : undefined}
              />
              Logs ({46 + done})
            </span>
            <span className="min-w-0 flex-1 truncate">
              <span className="mr-2 text-[#fdf1e4]/50">{`13:2${done % 10}:1${(done * 3) % 10}`}</span>
              {caption}
            </span>
            <Phos name="caretUp" className="size-3 flex-none text-[#fdf1e4]/50" />
          </div>
        </App>
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
