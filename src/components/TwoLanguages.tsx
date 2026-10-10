import { Fragment, useLayoutEffect, useRef, useState, type RefObject } from "react";
import { useClip } from "./clip.ts";
import { useInView, useLoopClock, useReducedMotion } from "./demo.tsx";
import { Icon } from "./Icon.tsx";
import { Phos } from "./Phos.tsx";
import { CLIPS, type Clip } from "./twoLanguagesCues.ts";
import { TEXT, type Lang } from "./twoLanguagesText.ts";
import { CAPSULE, Glyph, INK, INK_FAINT, IOS, PAPER, PauseGlyph, PhoneFrame, PRESS, Skip, StatusBar } from "./phone.tsx";

type Word = { text: string; group: string | null };

/** Where the reader is: a word in one language's sentence. Sentences are paired one to one. */
export type Moment = { side: Lang; sentence: number; word: number };

const BOOK: Record<Lang, Word[][]> = {
  en: TEXT.en.map(parse),
  de: TEXT.de.map(parse),
};

const OTHER: Record<Lang, Lang> = { en: "de", de: "en" };

// The app's cue colours (Theme.swift): the voice's sentence and word, and the other side's sentence
const BAND = "rgba(226,96,31,0.15)";
const LAMP = "rgba(226,96,31,0.42)";
const PALE = "rgba(226,96,31,0.09)";

const NAME: Record<Lang, string> = { en: "English", de: "German" };

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

export type Narration = keyof typeof CLIPS;

function momentAt(clip: Clip, t: number): Moment {
  let at = clip.steps[0]!;
  for (const step of clip.steps) {
    if (step[3] > t) break;
    at = step;
  }
  const [side, sentence, word] = at;
  return { side, sentence, word };
}

function wordStart(clip: Clip, { side, sentence, word }: Moment) {
  return clip.steps.find(([s, n, w]) => s === side && n === sentence && w === word)?.[3] ?? 0;
}

function timestamp(ms: number) {
  const total = Math.round(ms / 1000);
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
}

/** A narration loop while the phone is on screen; one still frame for reduced motion. */
export function useNarration(narration: Narration, ref: RefObject<HTMLElement | null>) {
  const inView = useInView(ref);
  const reduced = useReducedMotion();
  const clip = CLIPS[narration];
  const [clock] = useLoopClock({ period: clip.period, running: inView && !reduced });
  const t = reduced ? clip.period * 0.4 : clock % clip.period;
  return { moment: momentAt(clip, t), ms: t, period: clip.period };
}

/** The note over the lit word: what it means on the other side. It drops below the word on the first
 * line and stays inside the pane, as the app's does. */
function Tip({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [place, setPlace] = useState({ x: 0, above: true });

  useLayoutEffect(() => {
    const tip = ref.current;
    const word = tip?.parentElement;
    const pane = word?.offsetParent;
    if (!tip || !word || !(pane instanceof HTMLElement)) return;
    const centred = word.offsetLeft + word.offsetWidth / 2 - tip.offsetWidth / 2;
    const left = Math.min(Math.max(centred, 4), pane.clientWidth - tip.offsetWidth - 4);
    setPlace({ x: left - word.offsetLeft, above: word.offsetTop > tip.offsetHeight + 8 });
  }, [text]);

  return (
    <span
      ref={ref}
      className={`pointer-events-none absolute z-[2] rounded-[8px] border-[0.5px] border-[rgba(87,83,78,0.2)] bg-[rgba(253,251,247,0.92)] px-2 py-[3px] text-[11px] font-normal whitespace-nowrap text-[#4a3b33] shadow-[0_2px_6px_rgba(0,0,0,0.22)] backdrop-blur-md ${IOS} ${
        place.above ? "bottom-[calc(100%+5px)]" : "top-[calc(100%+5px)]"
      }`}
      style={{ left: place.x }}
    >
      {text}
    </span>
  );
}

function Pane({ lang, moment, onPick }: {
  lang: Lang;
  moment: Moment;
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
            const tip = lit && w.group ? equivalents(OTHER[lang], w.group) : null;
            const look = `relative rounded-[3px] px-px ${linked ? "underline decoration-[#e2601f] decoration-2 underline-offset-[3px]" : ""}`;
            const style = lit ? { background: LAMP } : undefined;
            const body = (
              <>
                {w.text}
                {tip ? <Tip text={tip} /> : null}
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
  return on ? (
    <svg viewBox="0 0 24 24" className="size-[15px] text-[#e2601f]" aria-hidden="true">
      <path d="M3.5 9.2h3.3L11.6 5v14l-4.8-4.2H3.5z" fill="currentColor" />
      <path d="M15 9.2a4 4 0 0 1 0 5.6M17.8 6.6a7.6 7.6 0 0 1 0 10.8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ) : (
    <Glyph d="M3.5 9.2h3.3L11.6 5v14l-4.8-4.2H3.5z" className="size-[15px] text-[#e2601f]" width="1.6" />
  );
}

const LABEL = `flex flex-none items-center gap-1.5 px-3.5 pt-1 pb-1.5 text-[11px] font-medium text-[#57534e] ${IOS}`;
const DIVIDER = "rgba(87,83,78,0.2)";

/** The two-language reader as the app draws it: its bars, a label and voice per language, the
 * original as text or on its print, and the player across the bottom. */
export function TwoLanguagePhone({ moment, ms, period, playing, layout = "stack", print = false, onPick, onPlay }: {
  moment: Moment;
  ms: number;
  period: number;
  playing: boolean;
  layout?: "stack" | "side";
  print?: boolean;
  onPick?: (moment: Moment) => void;
  onPlay?: () => void;
}) {
  const stack = layout === "stack";
  const text = stack ? "text-[11.5px]/[1.62]" : "text-[12.5px]/[1.62]";

  const original = print ? (
    <div className="mx-2.5 min-h-0 flex-1 overflow-hidden bg-white px-3.5 pt-3.5 pb-2.5 shadow-[0_1px_10px_rgba(42,20,8,0.10)]">
      <div className="mb-2 flex justify-between text-[7px] tracking-[0.16em] text-[rgba(42,20,8,0.4)]">
        <span>FRANKENSTEIN</span>
        <span>173</span>
      </div>
      <p lang="en" className={`relative font-body text-[#2a1408] ${stack ? "text-[10.5px]/[1.62]" : "text-[11.5px]/[1.62]"}`}>
        <Pane lang="en" moment={moment} onPick={onPick} />
      </p>
    </div>
  ) : (
    <div className="min-h-0 flex-1 overflow-hidden px-3.5 pt-2.5 shadow-[inset_0_7px_6px_-6px_rgba(42,20,8,0.16)]">
      <p lang="en" className={`relative font-body text-[#2a1408] ${text}`}>
        <Pane lang="en" moment={moment} onPick={onPick} />
      </p>
    </div>
  );

  return (
    <PhoneFrame
      width={stack ? 320 : 700}
      height={stack ? 660 : 470}
      radius={stack ? 50 : 32}
      pad={stack ? 12 : 13}
      screen={PAPER}
      lift
    >
      {stack ? (
        <StatusBar time="9:41" big className="flex-none" />
      ) : (
        <div className={`flex h-6 flex-none items-center px-4 text-[10px] font-semibold ${INK} ${IOS}`}>
          <span className="mr-auto">9:41 <span className="font-medium">Sun 4 Oct</span></span>
          <span className="inline-flex h-2.5 w-[18px] items-center rounded-[3px] border border-current p-px">
            <span className="block size-full rounded-[1.5px] bg-current" />
          </span>
        </div>
      )}

      <div className="flex flex-none items-center gap-1.5 px-2.5 pt-0.5 pb-2">
        <span className={CAPSULE}>
          <span className={PRESS}><Glyph d="M14.5 5 8 12l6.5 7" className="size-4" width="2.3" /></span>
          <span className={PRESS}><Glyph d="M5 5l6 6M5 5h5M5 5v5M19 19l-6-6M19 19h-5M19 19v-5" className="size-4" /></span>
        </span>
        <span className={`${CAPSULE.replace("flex-none", "")} min-w-0 flex-1 justify-center gap-1 px-3 ${stack ? "" : "mx-auto max-w-56"}`}>
          <span className={`min-w-0 truncate text-[11.5px] font-semibold text-[#4a3b33] ${IOS}`}>4 · Chapter IV</span>
          <Glyph d="m6 9 6 6 6-6" className="size-3 flex-none" width="2.4" />
        </span>
        <span className={CAPSULE}>
          <span className={PRESS}><Glyph d="M2.5 12h7M6.5 9l3 3-3 3M21.5 12h-7M17.5 9l-3 3 3 3M12 6v12" className="size-[17px]" width="1.7" /></span>
          <span className={`${PRESS} ${IOS} items-baseline font-medium`}>
            <span className="text-[10px]">A</span>
            <span className="text-[14px]">A</span>
          </span>
          <span className={PRESS}><Glyph d="M7 4h10v16l-5-4-5 4z" className="size-[15px]" width="1.9" /></span>
        </span>
      </div>

      <div className={`flex min-h-0 flex-1 ${stack ? "flex-col" : "flex-row"}`}>
        <div className={`flex min-h-0 min-w-0 flex-col ${stack ? "flex-[0_0_46%]" : "flex-1"}`}>
          <div className={LABEL}>
            {NAME.en}
            <Speaker on={moment.side === "en"} />
          </div>
          {original}
        </div>

        <div
          className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden"
          style={stack ? { borderTop: `1px solid ${DIVIDER}` } : { borderLeft: `1px solid ${DIVIDER}` }}
        >
          <div className={`${LABEL} pt-2`}>
            {NAME.de}
            <Speaker on={moment.side === "de"} />
          </div>
          <p lang="de" className={`relative px-4 pt-1 font-body text-[#2a1408] ${text}`}>
            <Pane lang="de" moment={moment} onPick={onPick} />
          </p>
        </div>
      </div>

      <div className="flex flex-none flex-col bg-[#fdfbf7]">
        <div className="flex items-center gap-3 px-4 pt-2.5">
          <Phos name="gear" className="size-5 flex-none text-[#e2601f]" />
          <span className="flex min-w-0 flex-1 flex-col gap-[3px]">
            <span className="relative block h-1 rounded-full bg-[rgba(42,20,8,0.1)]">
              <span className="absolute inset-y-0 left-0 min-w-1 rounded-full bg-[#e2601f]" style={{ width: `${(ms / period) * 100}%` }} />
            </span>
            <span className={`flex justify-between text-[9.5px] tabular-nums ${INK_FAINT} ${IOS}`}>
              <span>{timestamp(ms)}</span>
              <span>−{timestamp(Math.max(0, period - ms))}</span>
            </span>
          </span>
          <Skip back step="5" className="size-[22px] flex-none text-[#e2601f]" />
          <Skip step="5" className="size-[22px] flex-none text-[#e2601f]" />
          {onPlay ? (
            <button
              type="button"
              onClick={onPlay}
              aria-label={playing ? "Pause the narration" : "Play the narration"}
              className="flex size-7 flex-none cursor-pointer items-center justify-center text-[#e2601f] focus-visible:outline-2 focus-visible:outline-[#e2601f]"
            >
              <PlayPause playing={playing} />
            </button>
          ) : (
            <span className="flex size-7 flex-none items-center justify-center text-[#e2601f]">
              <PlayPause playing={playing} />
            </span>
          )}
        </div>
        <span className={`mx-auto mt-2.5 mb-1.5 block h-[4px] rounded-full bg-[#2a1408] ${stack ? "w-[108px]" : "w-[150px]"}`} />
      </div>
    </PhoneFrame>
  );
}

function PlayPause({ playing }: { playing: boolean }) {
  return playing ? (
    <PauseGlyph className="size-[18px]" />
  ) : (
    <svg viewBox="0 0 24 24" className="size-[18px]" fill="currentColor" aria-hidden="true"><path d="M6.5 4.5v15L19.5 12z" /></svg>
  );
}

/** The phone reading on its own and silent, for the home page */
export function NarratingPhone({ narration }: { narration: Narration }) {
  const ref = useRef<HTMLDivElement>(null);
  const { moment, ms, period } = useNarration(narration, ref);

  return (
    <div ref={ref} className="flex min-w-0 justify-center">
      <TwoLanguagePhone moment={moment} ms={ms} period={period} playing />
    </div>
  );
}

// With alternate sentences on, a tap keeps alternating; otherwise the tapped word's voice takes over
function follow(narration: Narration, side: Lang): Narration {
  return narration === "alternate" ? narration : side;
}

/** The reader with its voices: a tap while it reads goes there, a tap while paused picks the word
 * out and play starts from it — the app's own rules. */
function useListening(ref: RefObject<HTMLElement | null>, { initial, autoStart, opening = null }: {
  initial: Narration;
  autoStart: boolean;
  opening?: Moment | null;
}) {
  // Narration is intrusive in a way the silent demos are not: it counts as in view only once the
  // reader is properly on screen, not when a sliver of it is
  const inView = useInView(ref, "-15% 0px -15% 0px");
  const [narration, setNarration] = useState(initial);
  const [picked, setPicked] = useState(opening);
  const clip = CLIPS[narration];
  const audio = useClip({ url: clip.src, length: clip.period, inView, autoStart });

  const listen = (to: Narration, from: Moment | null) => {
    setNarration(to);
    setPicked(null);
    audio.seek(from ? wordStart(CLIPS[to], from) : 0);
  };

  const pick = (moment: Moment) => {
    if (audio.playing) listen(follow(narration, moment.side), moment);
    else setPicked(moment);
  };

  const play = () => {
    if (picked) listen(follow(narration, picked.side), picked);
    else if (audio.playing) audio.pause();
    else audio.play();
  };

  const hold = (moment: Moment) => {
    audio.pause();
    setPicked(moment);
  };

  return {
    ...audio,
    clip,
    moment: picked ?? momentAt(clip, audio.ms),
    listen,
    pick,
    play,
    hold,
  };
}

function SoundButton({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`inline-flex min-h-8 items-center gap-1.5 rounded-md border px-3 text-[13px] transition-colors ${
        on ? "border-edge text-ink-secondary hover:text-brass" : "border-ember-bright/60 bg-ember-bright/10 text-ember-bright"
      }`}
    >
      <Icon name={on ? "speaker" : "speakerOff"} className="size-3.5" />
      {on ? "Sound on" : "Sound off"}
    </button>
  );
}

/** The hero's phone: alternate sentences, playing muted until the visitor asks for sound */
export function ListeningPhone() {
  const ref = useRef<HTMLDivElement>(null);
  const reader = useListening(ref, { initial: "alternate", autoStart: true });

  return (
    <div ref={ref} className="flex min-w-0 flex-col items-center gap-5">
      <TwoLanguagePhone
        moment={reader.moment}
        ms={reader.ms}
        period={reader.clip.period}
        playing={reader.playing}
        onPick={reader.pick}
        onPlay={reader.play}
      />
      <SoundButton on={reader.soundOn} onToggle={reader.toggleSound} />
      <audio ref={reader.audioRef} src={reader.src} loop className="hidden" />
    </div>
  );
}

type Way = { id: string; title: string; body: string; narration: Narration | null; print?: boolean };

const WAYS: Way[] = [
  {
    id: "tap",
    title: "Tap a word",
    body: "Tap a word while the voice reads, and it goes there. Paused, a tap shows what the word means and underlines its twin. Press play to hear the book from there.",
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
  },
  {
    id: "print",
    title: "Keep the printed page",
    body: "The original can stay on its own printed page, pictures and all, beside the translation.",
    narration: "en",
    print: true,
  },
];

const NOTES = [
  { title: "Made on your computer", body: "Translate a book in the desktop app and give the translation its own voice. Save both in one synced EPUB." },
  { title: "Your place, in both", body: "Save words, find them again, and search both languages at once." },
  { title: "On older iPhones, too", body: "On iOS 15 and 16, two-language books open in a simpler two-pane reader." },
];

const SPARK = find("de", "spark");

export function TwoLanguages() {
  const ref = useRef<HTMLDivElement>(null);
  const [way, setWay] = useState("tap");
  const [layout, setLayout] = useState<"stack" | "side">("stack");
  // It opens on a picked word, so the note is the first thing seen
  const reader = useListening(ref, { initial: "de", autoStart: false, opening: SPARK });
  const current = WAYS.find((w) => w.id === way) ?? WAYS[0]!;

  const choose = (w: Way) => {
    setWay(w.id);
    if (w.narration) reader.listen(w.narration, null);
    else reader.hold(SPARK);
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
            moment={reader.moment}
            ms={reader.ms}
            period={reader.clip.period}
            playing={reader.playing}
            layout={layout}
            print={current.print}
            onPick={reader.pick}
            onPlay={reader.play}
          />
          <div className="flex flex-wrap items-center justify-center gap-3">
            <SoundButton on={reader.soundOn} onToggle={reader.toggleSound} />
            <div role="group" aria-label="How the two languages sit" className="hidden gap-0.5 rounded-lg border border-edge bg-raised p-[3px] sm:inline-flex">
              <button type="button" onClick={() => setLayout("stack")} aria-pressed={layout === "stack"} className={segment(layout === "stack")}>
                iPhone
              </button>
              <button type="button" onClick={() => setLayout("side")} aria-pressed={layout === "side"} className={segment(layout === "side")}>
                iPad
              </button>
            </div>
          </div>
          <audio ref={reader.audioRef} src={reader.src} loop className="hidden" />
        </div>

        <div className="flex min-w-0 max-w-md flex-[1_1_320px] flex-col gap-1.5">
          {WAYS.map((w) => {
            const on = w.id === way;
            return (
              <button
                key={w.id}
                type="button"
                onClick={() => choose(w)}
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
      <p className="mt-8 max-w-2xl text-ink-muted">
        Want to try one? The public shelf in Reader has two-language editions to download: Frankenstein in English and Bulgarian, Alice in English and French, A Christmas Carol in English and Spanish, and Dr Jekyll and Mr Hyde in English and Italian. Each is narrated in both languages.
      </p>
      <p className="mt-4 font-mono text-[11.5px]/[1.6] text-ink-faint">
        English read by Kokoro, a free voice in Libratory. German by Cartesia, a cloud voice you can add with your own key.
      </p>
    </div>
  );
}
