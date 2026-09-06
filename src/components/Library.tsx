import { useRef } from "react";
import { Phos, ThemeGlyph } from "./Phos.tsx";
import {
  App, Btn, Check, Divider, IconBtn, Pill, Tray, useAppWidth, useInView, useLoopClock,
  useReducedMotion, Window,
} from "./demo.tsx";

type Tone = "run" | "warn" | "fail" | "idle";

type Row = {
  title: string;
  folder?: boolean;
  badge?: string;
  count: string;
  countSub?: string;
  acts?: [string, Tone][];
  langs?: string[];
  outputs?: string;
  size: string;
  last: string;
};

type Shelf = {
  tab: string;
  profile: string;
  stats: [string, string][];
  note: string;
  rows: Row[];
};

const SHELVES: Shelf[] = [
  {
    tab: "Everything in one pile",
    profile: "Me",
    stats: [["500", "books"], ["1", "folder"], ["46 GB", "on disk"]],
    note: "The laziest setup, and a perfectly good one: one folder, every PDF you own, sorted by last activity so whatever is still working sits on top.",
    rows: [
      { folder: true, title: "Everything", count: "500", countSub: "books", acts: [["6 active", "run"]], size: "46.1 GB", last: "1 min ago" },
      { title: "The Making of the Atomic Bomb", count: "41", countSub: "12 audio", acts: [["synthesizing 3", "run"]], langs: ["EN 41/41"], size: "1.4 GB", last: "just now" },
      { title: "Gödel, Escher, Bach", count: "20", acts: [["extracting", "run"]], size: "88 MB", last: "just now" },
      { title: "Thinking in Systems", count: "24", countSub: "24 audio", langs: ["EN 24/24"], outputs: "1 M4B · 1 EPUB", size: "412 MB", last: "18 min ago" },
      { title: "Seeing Like a State", count: "10", countSub: "10 audio", langs: ["EN 10/10"], outputs: "1 M4B", size: "306 MB", last: "2 hours ago" },
      { title: "scan_1998_annual_report.pdf", count: "0", acts: [["no text", "warn"]], size: "24 MB", last: "yesterday" },
    ],
  },
  {
    tab: "A folder per course",
    profile: "Uni",
    stats: [["7", "folders"], ["148", "books"], ["39", "digests"]],
    note: "One folder per course, and at the end of each week two clicks turn the readings into a single digest book you listen to on the way in.",
    rows: [
      { folder: true, title: "CS229 · Machine Learning", count: "34", countSub: "books", acts: [["2 active", "run"]], size: "6.2 GB", last: "20 min ago" },
      { folder: true, title: "Neuro 101", count: "22", countSub: "books", size: "3.8 GB", last: "yesterday" },
      { folder: true, title: "Thesis · sources", count: "61", countSub: "books", acts: [["1 failed", "fail"]], size: "11.4 GB", last: "3 days ago" },
      { title: "Week 5 — readings digest", badge: "digest", count: "9", countSub: "9 audio", langs: ["EN 9/9"], outputs: "1 M4B", size: "94 MB", last: "1 hour ago" },
      { title: "Attention Is All You Need", count: "8", countSub: "8 audio", langs: ["EN 8/8"], outputs: "1 M4B · 1 EPUB", size: "62 MB", last: "2 hours ago" },
      { title: "Lecture notes — week 6", badge: "reader", count: "6", langs: ["EN 6/6"], outputs: "1 EPUB", size: "12 MB", last: "4 hours ago" },
    ],
  },
  {
    tab: "One shelf, many languages",
    profile: "Family",
    stats: [["9", "languages"], ["84", "books translated"], ["3×", "the same book"]],
    note: "A household shelf: the same book kept in the languages the people in the house read, each variant with its own narration, all of it in one search index.",
    rows: [
      { folder: true, title: "Български", count: "37", countSub: "books", acts: [["3 active", "run"]], size: "9.1 GB", last: "12 min ago" },
      { folder: true, title: "Kids · bedtime", count: "48", countSub: "books", size: "5.5 GB", last: "yesterday" },
      { title: "Frankenstein", count: "32", countSub: "32 audio", acts: [["translating 4", "run"]], langs: ["EN 32/32", "BG 32/32", "DE 18/32"], outputs: "3 M4B · 2 EPUB", size: "1.1 GB", last: "just now" },
      { title: "Малкият принц", count: "27", countSub: "27 audio", langs: ["BG 27/27", "EN 27/27"], outputs: "2 M4B", size: "540 MB", last: "5 hours ago" },
      { title: "Sapiens", count: "20", countSub: "20 audio", langs: ["EN 20/20", "BG 20/20"], outputs: "2 M4B · 1 EPUB", size: "820 MB", last: "2 days ago" },
      { title: "Meditations (plain language)", badge: "variant", count: "12", countSub: "12 audio", langs: ["EN 12/12"], outputs: "1 M4B", size: "180 MB", last: "3 days ago" },
    ],
  },
  {
    tab: "A shelf that fills itself",
    profile: "Feed",
    stats: [["06:40", "every morning"], ["214", "arrived on their own"], ["0", "clicks"]],
    note: "Point the HN digest at yesterday's front page, or post PDFs from a script through the API — by breakfast there is a fresh episode waiting on the shelf.",
    rows: [
      { folder: true, title: "Hacker News", count: "214", countSub: "books", acts: [["1 active", "run"]], size: "18.9 GB", last: "6 min ago" },
      { folder: true, title: "arXiv · cs.CL", count: "96", countSub: "books", size: "7.7 GB", last: "today" },
      { title: "HN — 30 Aug 2026", badge: "digest", count: "11", countSub: "11 audio", acts: [["assembling", "run"]], langs: ["EN 11/11"], size: "86 MB", last: "6 min ago" },
      { title: "HN — 29 Aug 2026", badge: "digest", count: "13", countSub: "13 audio", langs: ["EN 13/13"], outputs: "1 M4B", size: "104 MB", last: "yesterday" },
      { title: "Scaling laws for retrieval", badge: "api", count: "7", countSub: "7 audio", langs: ["EN 7/7"], outputs: "1 M4B", size: "58 MB", last: "yesterday" },
      { title: "Weekly newsletter backlog", badge: "api", count: "5", acts: [["indexing…", "idle"]], langs: ["EN 5/5"], outputs: "1 EPUB", size: "9 MB", last: "2 days ago" },
    ],
  },
];

const HOLD = 6200;
const LOOP = HOLD * SHELVES.length;

const TONES: Record<Tone, string> = {
  run: "bg-ember-bright/16 text-[#f2a674]",
  warn: "bg-brass/16 text-[oklch(0.84_0.12_75)]",
  fail: "bg-[oklch(0.62_0.17_27_/_0.18)] text-[oklch(0.78_0.13_27)]",
  idle: "bg-[#fdf1e4]/6 text-ink-faint",
};

function Dash() {
  return <span className="text-xs text-ink-faint">—</span>;
}

export function Library() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef);
  const reduced = useReducedMotion();
  const appW = useAppWidth();
  const [clock] = useLoopClock({ period: LOOP, running: inView && !reduced });
  const t = reduced ? 0 : clock;

  const index = Math.floor(t / HOLD) % SHELVES.length;
  const progress = (t % HOLD) / HOLD;
  const shelf = SHELVES[index] ?? SHELVES[0]!;

  // Columns leave in reverse order of usefulness rather than the table squeezing to mush
  const showLangs = appW >= 1180;
  const showOutputs = appW >= 1080;
  const showSize = appW >= 1000;
  const showLabels = appW >= 1000;

  const cols = [
    "40px minmax(160px,1fr) 84px 120px",
    showLangs ? "148px" : "",
    showOutputs ? "168px" : "",
    showSize ? "92px" : "",
    "128px 96px",
  ].filter(Boolean).join(" ");

  const books = shelf.rows.filter((row) => !row.folder);
  const tones = (row: Row) => (row.acts ?? []).map(([, tone]) => tone);
  const chips: [string, number][] = [
    ["All", books.length],
    ["Working", books.filter((row) => tones(row).includes("run")).length],
    ["Needs attention", books.filter((row) => tones(row).some((tone) => tone === "warn" || tone === "fail")).length],
    ["Ready to read", books.filter((row) => !!row.countSub && !tones(row).includes("run")).length],
  ];

  return (
    <div ref={sectionRef}>
      <div className="flex flex-wrap gap-2">
        {SHELVES.map((entry, i) => (
          <span
            key={entry.tab}
            className={`relative overflow-hidden rounded-full border px-3.5 py-2 text-[13px] whitespace-nowrap transition-colors duration-300 ${
              i === index ? "border-ember-bright/50 bg-ember-bright/12 text-ink" : "border-edge text-ink-faint"
            }`}
          >
            {entry.tab}
            {i === index && !reduced ? (
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-ember-bright" style={{ width: `${progress * 100}%` }} />
            ) : null}
          </span>
        ))}
      </div>

      <div className="mt-8 grid items-end gap-x-13 gap-y-6 [grid-template-columns:repeat(auto-fit,minmax(160px,1fr))]">
        {shelf.stats.map(([value, label]) => (
          <div key={label}>
            <div className="font-display text-[clamp(2.5rem,4.5vw,3.5rem)] leading-[0.94] font-semibold tracking-[-0.02em] tabular-nums text-ink">
              {value}
            </div>
            <div className="mt-2.5 font-mono text-[10.5px] tracking-[0.13em] uppercase text-ink-faint">{label}</div>
          </div>
        ))}
        <p className="min-w-[200px] text-[0.95rem] text-ink-muted">{shelf.note}</p>
      </div>

      <div className="mt-8">
        <Window url="localhost:5544" tag="LOCAL · NOTHING UPLOADED" wide>
          <App>
            <div className="flex h-12 items-center gap-2 border-b border-edge bg-raised px-4">
              <span className="font-display text-[17px] font-semibold tracking-[-0.01em] text-ink">Libratory</span>
              <Btn>
                <Phos name="user" className="size-3.5" />
                {shelf.profile}
                <Phos name="caretDown" className="size-3 text-ink-faint" />
              </Btn>
              <span className="flex-1" />
              <Btn><Phos name="chat" className="size-4" />{showLabels ? "Chat with library" : null}</Btn>
              <Btn><Phos name="book" className="size-4" />{showLabels ? "Open a read-along EPUB" : null}</Btn>
              <span className="ml-2 flex">
                <Btn><ThemeGlyph /><Phos name="caretDown" className="size-3 text-ink-faint" /></Btn>
              </span>
              <IconBtn><Phos name="gear" className="size-4" /></IconBtn>
            </div>

            <div className="flex h-11 items-center gap-2 border-b border-edge bg-raised px-4">
              <span className="text-[13px] text-ember-bright">Home</span>
              <span className="flex-1" />
              <span className="inline-flex items-center gap-1.5 rounded-md border border-dashed border-edge-strong px-2.5 py-1 text-ink-muted">
                <Phos name="upload" className="size-4" />
                Drop PDFs or <span className="font-semibold text-ember-bright">browse…</span>
              </span>
              <Btn><Phos name="plus" className="size-3" />New folder</Btn>
            </div>

            <div className="flex h-10 items-center gap-2 border-b border-edge px-4">
              {chips.map(([label, n], i) => (
                <Pill key={label} on={i === 0}>{`${label} ${n}`}</Pill>
              ))}
              <span className="h-4 w-px bg-edge" />
              <span className="block w-52 rounded-md border border-edge-strong bg-raised px-3 py-[5px] text-ink-faint">Search all books…</span>
            </div>

            <div className="p-4">
              <div className="overflow-hidden rounded-lg border border-edge">
                <div
                  className="grid items-center bg-inset text-xs font-medium tracking-[0.05em] whitespace-nowrap uppercase text-ink-muted"
                  style={{ gridTemplateColumns: cols }}
                >
                  <span className="py-3 pl-3"><Check /></span>
                  <span className="px-4 py-3">Title</span>
                  <span className="px-4 py-3 text-right">Ch.</span>
                  <span className="px-4 py-3">Status</span>
                  {showLangs ? <span className="px-4 py-3">Languages</span> : null}
                  {showOutputs ? <span className="px-4 py-3">Outputs</span> : null}
                  {showSize ? <span className="px-4 py-3 text-right">Size</span> : null}
                  <span className="inline-flex items-center justify-end gap-1 px-4 py-3">
                    Last activity
                    <Phos name="caretDown" className="size-3" />
                  </span>
                  <span className="px-4 py-3" />
                </div>
                {shelf.rows.map((row, i) => {
                  const acts = row.acts ?? [];
                  const langs = row.langs ?? [];
                  return (
                    <div
                      key={row.title}
                      className={`grid items-center text-[13px] text-[#fdf1e4]/72 ${i === 0 ? "" : "border-t border-edge"} ${
                        row.folder ? "bg-[#fdf1e4]/2" : ""
                      }`}
                      style={{ gridTemplateColumns: cols }}
                    >
                      <span className="py-3 pl-3"><Check /></span>
                      <span className="flex min-w-0 items-center gap-2 px-4 py-3">
                        {row.folder ? <Phos name="folder" className="size-4 flex-none text-ink-muted" /> : null}
                        <span className={`truncate text-sm ${row.folder ? "font-semibold text-ink" : "font-medium text-ember-bright"}`}>
                          {row.title}
                        </span>
                        {row.folder ? (
                          <span className="inline-flex flex-none gap-1.5 text-ink-faint">
                            <Phos name="pencil" className="size-3" />
                            <Phos name="trash" className="size-3" />
                          </span>
                        ) : null}
                        {row.badge ? (
                          <span className="flex-none rounded bg-inset px-1.5 py-0.5 text-[10px] font-medium text-ink-secondary">{row.badge}</span>
                        ) : null}
                        {row.folder ? null : <Phos name="check" className="size-3 flex-none text-ink-faint" />}
                      </span>
                      <span className="px-4 py-3 text-right tabular-nums text-ink-secondary">
                        {row.count}
                        {row.countSub ? <span className="block text-[11px] text-ink-faint">{row.countSub}</span> : null}
                      </span>
                      <span className="flex flex-wrap gap-1.5 px-4 py-3">
                        {acts.length ? acts.map(([label, tone]) => (
                          <span
                            key={label}
                            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium whitespace-nowrap ${TONES[tone]}`}
                          >
                            {tone === "run" ? (
                              <span className="size-1.5 rounded-full bg-current" style={{ animation: "softpulse 1.4s ease-in-out infinite" }} />
                            ) : null}
                            {label}
                          </span>
                        )) : <Dash />}
                      </span>
                      {showLangs ? (
                        <span className="flex flex-wrap gap-1.5 px-4 py-3">
                          {langs.length ? langs.map((label) => (
                            <span
                              key={label}
                              className="inline-flex items-center rounded-full border border-edge px-2 py-0.5 text-[11px] font-medium whitespace-nowrap text-ink-secondary"
                            >
                              {label}
                            </span>
                          )) : <Dash />}
                        </span>
                      ) : null}
                      {showOutputs ? <span className="px-4 py-3 whitespace-nowrap">{row.outputs ?? "—"}</span> : null}
                      {showSize ? <span className="px-4 py-3 text-right tabular-nums whitespace-nowrap">{row.size}</span> : null}
                      <span className="px-4 py-3 text-right whitespace-nowrap">{row.last}</span>
                      <span className="flex items-center justify-end gap-1 px-4 py-3">
                        {!row.folder && row.countSub ? (
                          <>
                            <IconBtn><Phos name="book" className="size-4" /></IconBtn>
                            <IconBtn><Phos name="dots" className="size-4" /></IconBtn>
                          </>
                        ) : null}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <Tray title="Nothing selected" sub="Shift-click a checkbox to take a range">
              <Btn dim>Create digest (0)</Btn>
              {showLabels ? <Btn>HN digest</Btn> : null}
              {showLabels ? <Btn dim>Move to folder (0)</Btn> : null}
              <Btn dim>Clear</Btn>
              <Btn variant="danger" dim>Delete selected (0)</Btn>
              <Divider />
              <Btn variant="solid"><Phos name="upload" className="size-4" />Add books</Btn>
            </Tray>
          </App>
        </Window>
      </div>

      <p className="mt-4 text-[0.95rem] text-ink-faint">
        Drag rows onto a folder to move them, shift-click to take a range, select two books and the
        digest button wakes up. These are sample libraries, not anyone's real one.
      </p>
    </div>
  );
}
