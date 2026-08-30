import { useRef } from "react";
import { Icon } from "./Icon.tsx";
import { useInView, useLoopClock, useReducedMotion, Window } from "./demo.tsx";

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
  foot: string;
  rows: Row[];
};

const SHELVES: Shelf[] = [
  {
    tab: "Everything in one pile",
    profile: "Me",
    stats: [["500", "books"], ["1", "folder"], ["46 GB", "on disk"]],
    note: "The laziest setup, and a perfectly good one: one folder, every PDF you own, sorted by last activity so whatever is still working sits on top.",
    foot: "Sorted by Last activity ↓ · 500 books, 1 folder",
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
    foot: "Folder: Home · 7 folders, 148 books · digests keep a link back to every source book",
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
    foot: "Folder: Home · languages column shows translated chapters out of total",
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
    foot: "Sorted by Created ↓ · api rows were posted by a script; digest rows were built overnight",
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

// Columns leave in reverse order of usefulness rather than the table squeezing to mush:
// Outputs, Size and Languages go first, then Chapters and Last activity
const COLS = "grid-cols-[34px_minmax(150px,1fr)_146px] sm:grid-cols-[34px_minmax(160px,1fr)_74px_132px_112px] lg:grid-cols-[34px_minmax(180px,1fr)_74px_132px_172px_116px_76px_112px]";
const MIN = "min-w-[330px] sm:min-w-[512px] lg:min-w-[896px]";
const AT_SM = "hidden sm:block";
const AT_LG = "hidden lg:block";

const TONES: Record<Tone, string> = {
  run: "bg-ember-bright/16 text-[#f2a674]",
  warn: "bg-brass/16 text-[oklch(0.84_0.12_75)]",
  fail: "bg-[oklch(0.62_0.17_27_/_0.18)] text-[oklch(0.78_0.13_27)]",
  idle: "bg-[#fdf1e4]/6 text-ink-faint",
};

function Chip({ children }: { children: string }) {
  return (
    <span className="flex items-center gap-1.5 rounded-md border border-edge bg-raised px-2.5 py-1 text-xs text-ink">
      {children}
      <Icon name="caret" className="size-2.5 text-ink-faint" />
    </span>
  );
}

function Tick() {
  return <span className="block size-3 rounded-[3px] border border-edge-strong" />;
}

export function Library() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef);
  const reduced = useReducedMotion();
  const [clock] = useLoopClock({ period: LOOP, running: inView && !reduced });
  const t = reduced ? 0 : clock;

  const index = Math.floor(t / HOLD) % SHELVES.length;
  const progress = (t % HOLD) / HOLD;
  const shelf = SHELVES[index] ?? SHELVES[0]!;

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

      <div className="mt-8 grid grid-cols-2 items-end gap-x-8 gap-y-6 sm:grid-cols-[repeat(3,max-content)_minmax(200px,1fr)] sm:gap-x-13">
        {shelf.stats.map(([value, label]) => (
          <div key={label}>
            <div className="font-display text-[2.5rem] leading-[0.94] font-semibold tracking-[-0.02em] tabular-nums text-ink sm:text-[3.5rem]">
              {value}
            </div>
            <div className="mt-2.5 font-mono text-[10.5px] tracking-[0.13em] uppercase text-ink-faint">{label}</div>
          </div>
        ))}
        <p className="col-span-2 text-[0.95rem] text-ink-muted sm:col-span-1">{shelf.note}</p>
      </div>

      <div className="mt-8">
        <Window url="localhost:5544" tag="LOCAL · NOTHING UPLOADED">
          <div className="px-4 pt-4 pb-5 font-sans sm:px-5">
            <div className="flex items-center gap-2.5">
              <span className="font-display text-[21px] font-semibold text-ink">Libratory</span>
              <Chip>{shelf.profile}</Chip>
              <span className="ml-auto hidden items-center gap-1.5 rounded-md border border-edge bg-raised px-2.5 py-1 text-xs text-ink sm:flex">
                <Icon name="chat" className="size-3.5" />
                Chat with library
              </span>
              <span className="hidden items-center gap-1.5 rounded-md border border-edge bg-raised px-2.5 py-1 text-xs text-ink lg:flex">
                <Icon name="book" className="size-3.5" />
                Open a read-along EPUB
              </span>
              <span className="flex size-7 shrink-0 items-center justify-center rounded-md border border-edge bg-raised text-ink-muted max-sm:ml-auto">
                <Icon name="gear" className="size-3.5" />
              </span>
            </div>

            <div className="mt-4 flex items-center justify-center gap-2.5 rounded-[9px] border border-dashed border-[#fdf1e4]/16 bg-[#fdf1e4]/2 p-4 text-center text-[12.5px] text-ink-faint">
              <Icon name="upload" className="size-3.5 shrink-0" />
              Drop PDFs here — or a whole folder of them
            </div>

            <div className="mt-4.5 flex items-center gap-3">
              <span className="text-[15px] font-semibold text-ink-secondary">Books</span>
              <span className="ml-auto flex w-[230px] max-w-[55%] items-center gap-1.5 rounded-md border border-edge bg-raised px-2.5 py-1 text-xs text-ink-faint">
                <Icon name="search" className="size-3 shrink-0" />
                <span className="truncate">Search all books…</span>
              </span>
            </div>

            <div className="mt-3 flex items-center gap-2">
              <span className="rounded-md border border-ember-bright/40 bg-ember-bright/22 px-2.5 py-1 text-xs whitespace-nowrap text-[#f7c39a]">
                Create digest (0)
              </span>
              <span className="rounded-md border border-edge bg-raised px-2.5 py-1 text-xs whitespace-nowrap text-ink-muted">HN digest</span>
              <span className="hidden rounded-md border border-edge bg-raised px-2.5 py-1 text-xs whitespace-nowrap text-ink-faint sm:inline">
                Move to folder (0)
              </span>
              <span className="ml-auto flex items-center gap-1.5 rounded-md border border-edge bg-raised px-2.5 py-1 text-xs whitespace-nowrap text-ink-muted">
                <Icon name="plus" className="size-3" />
                New folder
              </span>
            </div>

            <div className="mt-3 overflow-hidden rounded-[9px] border border-edge">
              <div className="overflow-x-auto">
                <div className={`grid ${COLS} ${MIN} items-center bg-raised text-[10px] font-medium tracking-[0.09em] whitespace-nowrap uppercase text-ink-faint`}>
                  <span className="py-2.5 pl-3"><Tick /></span>
                  <span className="px-3 py-2.5">Title</span>
                  <span className={`px-3 py-2.5 text-right ${AT_SM}`}>Chapters</span>
                  <span className="px-3 py-2.5">Activity</span>
                  <span className={`px-3 py-2.5 ${AT_LG}`}>Languages</span>
                  <span className={`px-3 py-2.5 ${AT_LG}`}>Outputs</span>
                  <span className={`px-3 py-2.5 text-right ${AT_LG}`}>Size</span>
                  <span className={`px-3 py-2.5 text-right ${AT_SM}`}>Last activity</span>
                </div>
                {shelf.rows.map((row, i) => {
                  const acts = row.acts ?? [];
                  const langs = row.langs ?? [];
                  return (
                    <div
                      key={row.title}
                      className={`grid ${COLS} ${MIN} items-center text-[12.5px] text-ink-muted ${
                        i === 0 ? "" : "border-t border-[#fdf1e4]/8"
                      } ${row.folder ? "bg-[#fdf1e4]/2" : ""}`}
                    >
                      <span className="py-2.5 pl-3"><Tick /></span>
                      <span className="flex min-w-0 items-center gap-2 px-3 py-2.5">
                        <Icon
                          name={row.folder ? "folder" : "filePdf"}
                          className={`size-3.5 shrink-0 ${row.folder ? "text-ink-muted" : "text-[#fdf1e4]/26"}`}
                        />
                        <span className={`truncate text-[13px] ${row.folder ? "font-semibold text-ink" : "font-medium text-[#f2a674]"}`}>
                          {row.title}
                        </span>
                        {row.badge ? (
                          <span className="shrink-0 rounded bg-[#fdf1e4]/6 px-1.5 py-px text-[9.5px] font-semibold tracking-[0.03em] text-ink-muted">
                            {row.badge}
                          </span>
                        ) : null}
                      </span>
                      <span className={`px-3 py-2.5 text-right tabular-nums ${AT_SM}`}>
                        {row.count}
                        {row.countSub ? <span className="block text-[10.5px] text-ink-faint">{row.countSub}</span> : null}
                      </span>
                      <span className="flex flex-wrap gap-1.5 px-3 py-2.5">
                        {acts.length ? (
                          acts.map(([label, tone]) => (
                            <span
                              key={label}
                              className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10.5px] font-medium whitespace-nowrap ${TONES[tone]}`}
                            >
                              {tone === "run" ? (
                                <span className="size-[5px] rounded-full bg-current" style={{ animation: "softpulse 1.4s ease-in-out infinite" }} />
                              ) : null}
                              {label}
                            </span>
                          ))
                        ) : (
                          <span className="text-[11.5px] text-[#fdf1e4]/26">—</span>
                        )}
                      </span>
                      <span className="hidden flex-wrap gap-1.5 px-3 py-2.5 lg:flex">
                        {langs.length ? (
                          langs.map((label) => (
                            <span
                              key={label}
                              className="inline-flex items-center rounded-full border border-[#fdf1e4]/16 px-2 py-px text-[10.5px] whitespace-nowrap"
                            >
                              {label}
                            </span>
                          ))
                        ) : (
                          <span className="text-[11.5px] text-[#fdf1e4]/26">—</span>
                        )}
                      </span>
                      <span className={`px-3 py-2.5 text-xs whitespace-nowrap ${AT_LG}`}>{row.outputs ?? "—"}</span>
                      <span className={`px-3 py-2.5 text-right tabular-nums whitespace-nowrap ${AT_LG}`}>{row.size}</span>
                      <span className={`px-3 py-2.5 text-right whitespace-nowrap ${AT_SM}`}>{row.last}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <p className="mt-3 px-0.5 text-[11.5px] text-ink-faint">
              {shelf.foot}
              <span className="sm:hidden"> · Chapters, Languages, Outputs, Size and Last activity hidden at this width</span>
              <span className="hidden sm:inline lg:hidden"> · Languages, Outputs and Size hidden at this width</span>
              <span className="hidden lg:inline"> · Created is off to the right</span>
            </p>
          </div>
        </Window>
      </div>

      <p className="mt-4 text-[0.95rem] text-ink-faint">
        Drag rows onto a folder to move them, shift-click to take a range, select two books and the
        digest button wakes up. These are sample libraries, not anyone's real one.
      </p>
    </div>
  );
}
