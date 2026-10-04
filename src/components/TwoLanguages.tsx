import { Fragment, useRef, useState, type RefObject } from "react";
import { useInView, useLoopClock, useReducedMotion } from "./demo.tsx";
import { CAPSULE, Glyph, INK_FAINT, INK_SOFT, IOS, PAPER, PauseGlyph, PhoneFrame, PRESS, Skip, StatusBar } from "./phone.tsx";

type Lang = "en" | "de";
type Word = { text: string; group: string | null };

/** Where the reader is: a word in one language's sentence. Sentences are paired one to one. */
export type Moment = { side: Lang; sentence: number; word: number };

// `word|group`: words sharing a group are equivalents, the links the desktop app makes between them
const TEXT: Record<Lang, string[]> = {
  en: [
    "It was on a dreary|dreary night|night of|night November|night that I|i1 beheld|beheld the accomplishment|acc of my|my toils.|toils",
    "With an anxiety|anx that almost|almost amounted to agony,|agony I|i2 collected|coll the instruments|instr of life|life around|around me,|around that I might infuse|infuse a spark|spark of being|being into the lifeless|lifeless thing|thing that lay|lay at my feet.|feet",
    "It was already one|one in the morning;|morning the rain|rain pattered|patter dismally|dismal against the panes,|panes and my|my2 candle|candle was nearly|nearly burnt|burnt out.|burnt",
  ],
  de: [
    "Es war in einer trüben|dreary Novembernacht,|night als ich|i1 die Vollendung|acc meiner|my Mühen|toils erblickte.|beheld",
    "Mit einer Angst,|anx die fast|almost an Qual|agony grenzte, sammelte|coll ich|i2 die Werkzeuge|instr des Lebens|life um|around mich,|around um dem leblosen|lifeless Ding,|thing das zu meinen Füßen|feet lag,|lay einen Funken|spark des Daseins|being einzuflößen.|infuse",
    "Es war schon ein Uhr|one morgens;|morning der Regen|rain prasselte|patter trostlos|dismal gegen die Scheiben,|panes und meine|my2 Kerze|candle war fast|nearly heruntergebrannt.|burnt",
  ],
};

const BOOK: Record<Lang, Word[][]> = {
  en: TEXT.en.map(parse),
  de: TEXT.de.map(parse),
};

const OTHER: Record<Lang, Lang> = { en: "de", de: "en" };

const BAND = "rgba(226,96,31,0.17)";
const PALE = "rgba(226,96,31,0.07)";
const LAMP = "rgba(226,96,31,0.5)";

function parse(line: string): Word[] {
  return line.split(" ").map((token) => {
    const [text = "", group] = token.split("|");
    return { text, group: group ?? null };
  });
}

function bare(text: string) {
  return text.replace(/[.,;:!?]+$/, "");
}

function equivalents(lang: Lang, group: string) {
  return BOOK[lang].flat().filter((w) => w.group === group).map((w) => bare(w.text)).join(" ");
}

export function find(side: Lang, group: string): Moment {
  for (const [sentence, words] of BOOK[side].entries()) {
    const word = words.findIndex((w) => w.group === group);
    if (word >= 0) return { side, sentence, word };
  }
  return { side, sentence: 0, word: 0 };
}

export type Narration = "en" | "de" | "alternate";

const ORDER: Record<Narration, [Lang, number][]> = {
  en: [["en", 0], ["en", 1], ["en", 2]],
  de: [["de", 0], ["de", 1], ["de", 2]],
  alternate: [["en", 0], ["de", 0], ["en", 1], ["de", 1], ["en", 2], ["de", 2]],
};

const PAUSE = 700;

// No recording behind this demo, so a word lasts roughly as long as it takes to say
function duration(word: Word) {
  return 150 + 42 * word.text.length;
}

type Step = { at: number; moment: Moment };

function schedule(narration: Narration) {
  const steps: Step[] = [];
  let at = 0;
  for (const [side, sentence] of ORDER[narration]) {
    BOOK[side][sentence]?.forEach((w, word) => {
      steps.push({ at, moment: { side, sentence, word } });
      at += duration(w);
    });
    at += PAUSE;
  }
  return { steps, period: at };
}

const SCHEDULES: Record<Narration, ReturnType<typeof schedule>> = {
  en: schedule("en"),
  de: schedule("de"),
  alternate: schedule("alternate"),
};

/** A narration loop while the phone is on screen; one still frame for reduced motion. */
export function useNarration(narration: Narration, ref: RefObject<HTMLElement | null>) {
  const inView = useInView(ref);
  const reduced = useReducedMotion();
  const { steps, period } = SCHEDULES[narration];
  const [clock] = useLoopClock({ period, running: inView && !reduced });
  const t = reduced ? period * 0.4 : clock % period;
  let moment = steps[0]!.moment;
  for (const step of steps) {
    if (step.at > t) break;
    moment = step.moment;
  }
  return { moment, progress: t / period };
}

function Pane({ lang, moment, paused, onPick }: {
  lang: Lang;
  moment: Moment;
  paused: boolean;
  onPick?: (moment: Moment) => void;
}) {
  const active = lang === moment.side;
  const group = BOOK[moment.side][moment.sentence]?.[moment.word]?.group ?? null;

  return BOOK[lang].map((words, sentence) => {
    const current = sentence === moment.sentence;
    return (
      <Fragment key={sentence}>
        <span
          className="rounded-[2px] [box-decoration-break:clone] py-px"
          style={{ background: current ? (active ? BAND : PALE) : undefined }}
        >
          {words.map((w, word) => {
            const lit = active && current && word === moment.word;
            const linked = !active && group !== null && w.group === group;
            const tip = lit && paused && w.group ? equivalents(OTHER[lang], w.group) : null;
            const look = `relative rounded-[3px] px-px ${linked ? "underline decoration-[#e2601f] decoration-2 underline-offset-[3px]" : ""}`;
            const style = lit ? { background: LAMP } : undefined;
            const body = (
              <>
                {w.text}
                {tip ? (
                  <span className={`pointer-events-none absolute bottom-[calc(100%+6px)] left-1/2 z-[2] -translate-x-1/2 rounded-[7px] bg-[#2a1408] px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap text-[#fdf1e4] shadow-[0_4px_14px_rgba(42,20,8,0.3)] ${IOS}`}>
                    {tip}
                  </span>
                ) : null}
              </>
            );
            return (
              // The space between the words is the only place the browser may break the line
              <Fragment key={word}>
                {onPick ? (
                  <button
                    type="button"
                    onClick={() => onPick({ side: lang, sentence, word })}
                    className={`${look} cursor-pointer focus-visible:outline-2 focus-visible:outline-[#e2601f]`}
                    style={style}
                  >
                    {body}
                  </button>
                ) : (
                  <span className={look} style={style}>{body}</span>
                )}{" "}
              </Fragment>
            );
          })}
        </span>{" "}
      </Fragment>
    );
  });
}

function Speaker({ on }: { on: boolean }) {
  return (
    <Glyph
      d="M4 9.5h3.5L12 5.5v13l-4.5-4H4zM15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"
      className={`size-3.5 ${on ? "text-[#e2601f]" : "text-[#b9ab9c]"}`}
    />
  );
}

const LABEL = `flex items-center justify-between px-0.5 pb-1 text-[9.5px] font-semibold tracking-[0.06em] uppercase text-[#8a7a6c] ${IOS}`;

/** The two-language reader: the original on its print, the translation as text, a voice for each. */
export function TwoLanguagePhone({ moment, progress, paused = false, layout = "stack", caption, onPick }: {
  moment: Moment;
  progress: number;
  paused?: boolean;
  layout?: "stack" | "side";
  caption?: string;
  onPick?: (moment: Moment) => void;
}) {
  const stack = layout === "stack";

  return (
    <PhoneFrame
      width={stack ? 320 : 700}
      height={stack ? 660 : 470}
      radius={stack ? 50 : 32}
      pad={stack ? 12 : 13}
      screen={PAPER}
      lift
    >
      <StatusBar time="9:41" big className="flex-none" />

      <div className="flex flex-none items-center gap-2 px-[11px] pb-2">
        <span className={CAPSULE}>
          <span className={PRESS}><Glyph d="M14.5 5 8 12l6.5 7" className="size-4" width="2.3" /></span>
        </span>
        <span className={`min-w-0 flex-1 truncate text-center text-[11.5px] font-semibold ${INK_SOFT} ${IOS}`}>
          Chapter IV
        </span>
        <span className={CAPSULE}>
          <span className={`${PRESS} ${IOS} text-sm font-medium tracking-[-0.03em]`}>AA</span>
          <span className={PRESS}><Glyph d="M7 4h10v16l-5-4-5 4z" className="size-[15px]" width="1.9" /></span>
        </span>
      </div>

      <div className={`flex min-h-0 flex-1 gap-2.5 px-2.5 ${stack ? "flex-col" : "flex-row gap-3"}`}>
        <div className={`flex min-h-0 min-w-0 flex-col ${stack ? "flex-[0_0_47%]" : "flex-1"}`}>
          <div className={LABEL}>
            <span>English · print</span>
            <Speaker on={moment.side === "en"} />
          </div>
          <div className="min-h-0 flex-1 overflow-hidden bg-white px-3.5 pt-3.5 pb-2.5 shadow-[0_1px_10px_rgba(42,20,8,0.10)]">
            <div className="mb-2 flex justify-between text-[7px] tracking-[0.16em] text-[rgba(42,20,8,0.4)]">
              <span>FRANKENSTEIN</span>
              <span>173</span>
            </div>
            <p lang="en" className={`font-body text-[#2a1408] ${stack ? "text-[10.5px]/[1.62]" : "text-[11.5px]/[1.62]"}`}>
              <Pane lang="en" moment={moment} paused={paused} onPick={onPick} />
            </p>
          </div>
        </div>

        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
          <div className={LABEL}>
            <span>Deutsch</span>
            <Speaker on={moment.side === "de"} />
          </div>
          <p lang="de" className={`px-1 pt-1 font-body text-[#2a1408] ${stack ? "text-[11.5px]/[1.66]" : "text-[12.5px]/[1.66]"}`}>
            <Pane lang="de" moment={moment} paused={paused} onPick={onPick} />
          </p>
        </div>
      </div>

      <div className="mx-[11px] mt-2 mb-[13px] flex flex-none flex-col items-center gap-1.5">
        {caption ? (
          <span className={`rounded-full bg-[#e2601f]/12 px-2.5 py-0.5 text-[10px] font-semibold text-[#ab4500] ${IOS}`}>
            {caption}
          </span>
        ) : null}
        <div className="flex w-full items-center gap-2 rounded-full bg-[rgba(253,250,245,0.94)] py-2 pr-2 pl-[15px] shadow-[0_2px_12px_rgba(42,20,8,0.16)] backdrop-blur-md">
          <span className="flex min-w-0 flex-1 flex-col gap-[3px]">
            <span className="relative block h-[5px] rounded-full bg-[rgba(42,20,8,0.12)]">
              <span className="absolute inset-y-0 left-0 rounded-full bg-[oklch(0.366_0.0251_49.6085)]" style={{ width: `${progress * 100}%` }} />
            </span>
            <span className={`flex justify-between text-[10px] tabular-nums ${INK_FAINT} ${IOS}`}>
              <span>3:12</span>
              <span>−5:06</span>
            </span>
          </span>
          <Skip back step="5" className="size-[23px] flex-none text-[#e2601f]" />
          <Skip step="5" className="size-[23px] flex-none text-[#e2601f]" />
          <Glyph d="M4 7h9M17 7h3M4 17h3M11 17h9M15 5v4M9 15v4" className="size-[18px] flex-none text-[#e2601f]" width="1.9" />
          <span className="flex size-[34px] flex-none items-center justify-center rounded-full bg-[#e2601f] text-[#fffdf9]">
            {paused ? (
              <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l10.5-6.5z" /></svg>
            ) : (
              <PauseGlyph className="size-4" />
            )}
          </span>
        </div>
      </div>
    </PhoneFrame>
  );
}

/** The phone reading on its own, for the heroes and the home page */
export function NarratingPhone({ narration, caption }: { narration: Narration; caption?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { moment, progress } = useNarration(narration, ref);

  return (
    <div ref={ref} className="flex min-w-0 justify-center">
      <TwoLanguagePhone moment={moment} progress={progress} caption={caption} />
    </div>
  );
}

type Way = { id: string; title: string; body: string; narration: Narration | null; caption?: string };

const WAYS: Way[] = [
  {
    id: "tap",
    title: "Tap a word",
    body: "See what it means in the other language. The same words light up on both sides. Press play to hear the book from there.",
    narration: null,
  },
  {
    id: "listen",
    title: "Listen in either language",
    body: "Each side has its own voice. The side being read glows brighter, and its match glows softly beside it.",
    narration: "de",
  },
  {
    id: "alternate",
    title: "Alternate sentences",
    body: "Hear each sentence in one language, then in the other.",
    narration: "alternate",
    caption: "Alternate sentences",
  },
  {
    id: "print",
    title: "Keep the printed page",
    body: "The original can stay on its own printed page, pictures and all, beside the translation.",
    narration: "en",
  },
];

const NOTES = [
  { title: "Made on your computer", body: "Translate a book in the desktop app and give the translation its own voice. Save both in one synced EPUB." },
  { title: "Your place, in both", body: "Save words, find them again, and search both languages at once." },
  { title: "On older iPhones, too", body: "On iOS 15 and 16, two-language books open in a simpler two-pane reader." },
];

export function TwoLanguages() {
  const ref = useRef<HTMLDivElement>(null);
  const [way, setWay] = useState("tap");
  const [layout, setLayout] = useState<"stack" | "side">("stack");
  const [picked, setPicked] = useState<Moment>(() => find("de", "spark"));
  const current = WAYS.find((w) => w.id === way) ?? WAYS[0]!;
  // Paused on a tap; any other way runs its own narration
  const narrating = useNarration(current.narration ?? "de", ref);
  const tapping = current.narration === null;

  const pick = (moment: Moment) => {
    setWay("tap");
    setPicked(moment);
  };

  const segment = (on: boolean) =>
    `inline-flex min-h-8 items-center rounded-md px-3.5 text-[13px] font-medium transition-colors ${
      on ? "bg-brass text-[#1a1408]" : "text-ink-secondary hover:text-brass"
    }`;

  return (
    <div ref={ref}>
      <div className="flex flex-wrap items-start gap-12">
        <div className="flex min-w-0 flex-[1_1_320px] flex-col items-center gap-5">
          <TwoLanguagePhone
            moment={tapping ? picked : narrating.moment}
            progress={tapping ? 0.38 : narrating.progress}
            paused={tapping}
            layout={layout}
            caption={current.caption}
            onPick={pick}
          />
          <div role="group" aria-label="How the two languages sit" className="hidden gap-0.5 rounded-lg border border-edge bg-raised p-[3px] sm:inline-flex">
            <button type="button" onClick={() => setLayout("stack")} aria-pressed={layout === "stack"} className={segment(layout === "stack")}>
              Top and bottom
            </button>
            <button type="button" onClick={() => setLayout("side")} aria-pressed={layout === "side"} className={segment(layout === "side")}>
              Side by side
            </button>
          </div>
        </div>

        <div className="flex min-w-0 max-w-md flex-[1_1_320px] flex-col gap-1.5">
          {WAYS.map((w) => {
            const on = w.id === way;
            return (
              <button
                key={w.id}
                type="button"
                onClick={() => setWay(w.id)}
                aria-pressed={on}
                className={`block w-full cursor-pointer border-l py-3.5 pr-4 pl-5 text-left transition-colors ${
                  on ? "border-l-2 border-ember bg-ember/6" : "border-edge hover:bg-inset"
                }`}
              >
                <span className={`block font-display text-xl font-semibold ${on ? "text-ink" : "text-ink-secondary"}`}>{w.title}</span>
                <span className="mt-1 block text-[0.95rem] text-ink-muted">{w.body}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-14 grid gap-8 border-t border-edge pt-8 sm:grid-cols-3">
        {NOTES.map((note) => (
          <div key={note.title}>
            <h3 className="text-xl">{note.title}</h3>
            <p className="mt-2 text-ink-muted">{note.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
