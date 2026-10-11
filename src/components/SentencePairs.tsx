import { useEffect, useRef, useState, type ReactNode } from "react";
import { Icon, PlayIcon } from "./Icon.tsx";
import { CLIPS } from "./twoLanguagesCues.ts";
import { TEXT, type Lang } from "./twoLanguagesText.ts";

// The reader's own steps: a language being learned can go down to half speed
const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
const NAME: Record<Lang, string> = { de: "German", en: "English" };
const ROLE: Record<Lang, string> = { de: "The language you are learning", en: "Your language" };
const TIMES = ["once", "twice", "three times", "four times", "five times"];

// The first sentence of each clip, cut between its last word and the next sentence's first
const SPAN: Record<Lang, [number, number]> = { de: [0, 4600], en: [150, 5500] };
const SENTENCE: Record<Lang, string> = {
  de: TEXT.de[0]!.split(" ").map((w) => w.split("|")[0]).join(" "),
  en: TEXT.en[0]!.split(" ").map((w) => w.split("|")[0]).join(" "),
};

type Voice = { speed: number; plays: number; gap: boolean };
type Part = { lang: Lang; ms: number; gap: boolean; speed: number };

/** One sentence as Sentence pairs reads it: every play of the first language, then the other's.
 * A gap the length of the sentence follows the last play, as the reader's 100% pause does. */
function parts(first: Lang, voices: Record<Lang, Voice>): Part[] {
  const order: Lang[] = first === "de" ? ["de", "en"] : ["en", "de"];
  return order.flatMap((lang) => {
    const { speed, plays, gap } = voices[lang];
    const [from, to] = SPAN[lang];
    const ms = (to - from) / speed;
    const heard = Array.from({ length: plays }, () => ({ lang, ms, gap: false, speed }));
    return gap ? [...heard, { lang, ms, gap: true, speed }] : heard;
  });
}

function describe(lang: Lang, voice: Voice) {
  const speed = voice.speed === 1 ? "at its usual pace" : `at ${voice.speed}×`;
  return `${NAME[lang]} ${TIMES[voice.plays - 1]} ${speed}${voice.gap ? ", then a pause to say it back" : ""}`;
}

export function SentencePairs() {
  const [first, setFirst] = useState<Lang>("de");
  const [voices, setVoices] = useState<Record<Lang, Voice>>({
    de: { speed: 1, plays: 2, gap: true },
    en: { speed: 1, plays: 1, gap: false },
  });
  const [at, setAt] = useState<number | null>(null);
  const run = useRef(0);
  const audio = useRef<Partial<Record<Lang, HTMLAudioElement>>>({});

  const sequence = parts(first, voices);
  const total = sequence.reduce((sum, p) => sum + p.ms, 0);
  const second: Lang = first === "de" ? "en" : "de";

  const stop = () => {
    run.current++;
    for (const el of Object.values(audio.current)) el?.pause();
    setAt(null);
  };

  useEffect(() => stop, []);

  const play = async () => {
    const id = ++run.current;
    const wait = (ms: number) => new Promise((done) => setTimeout(done, ms));
    for (const [i, part] of sequence.entries()) {
      if (run.current !== id) return;
      setAt(i);
      if (!part.gap) {
        const el = (audio.current[part.lang] ??= new Audio(CLIPS[part.lang].src));
        el.currentTime = SPAN[part.lang][0] / 1000;
        el.playbackRate = part.speed;
        try {
          await el.play();
        } catch {
          return stop();
        }
      }
      await wait(part.ms);
      audio.current[part.lang]?.pause();
    }
    if (run.current === id) setAt(null);
  };

  const change = (lang: Lang, to: Partial<Voice>) => {
    stop();
    setVoices((v) => ({ ...v, [lang]: { ...v[lang], ...to } }));
  };

  const reading = at === null ? null : sequence[at]!;

  return (
    <div className="rounded-lg border border-edge bg-raised p-5 sm:p-8">
      <div className="grid gap-8 [grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr))]">
        {([first, second] as Lang[]).map((lang, i) => {
          const voice = voices[lang];
          const speed = SPEEDS.indexOf(voice.speed);
          return (
            <fieldset key={lang} className="min-w-0">
              <legend className="font-display text-xl font-semibold">
                <span className="text-brass">{i + 1}.</span> {NAME[lang]}
              </legend>
              <p className="mt-1 text-[0.95rem] text-ink-muted">{ROLE[lang]}</p>
              <dl className="mt-5 grid gap-3">
                <Row label="Speed">
                  <Stepper
                    value={`${voice.speed}×`}
                    fewer={speed > 0 ? () => change(lang, { speed: SPEEDS[speed - 1]! }) : null}
                    more={speed < SPEEDS.length - 1 ? () => change(lang, { speed: SPEEDS[speed + 1]! }) : null}
                    names={["Slower", "Faster"]}
                  />
                </Row>
                <Row label="Plays">
                  <Stepper
                    value={String(voice.plays)}
                    fewer={voice.plays > 1 ? () => change(lang, { plays: voice.plays - 1 }) : null}
                    more={voice.plays < 5 ? () => change(lang, { plays: voice.plays + 1 }) : null}
                    names={["Fewer plays", "More plays"]}
                  />
                </Row>
                <Row label="Pause to say it back">
                  <button
                    type="button"
                    role="switch"
                    aria-checked={voice.gap}
                    aria-label={`Pause after ${NAME[lang]}`}
                    onClick={() => change(lang, { gap: !voice.gap })}
                    className={`relative h-7 w-12 flex-none rounded-full transition-colors ${voice.gap ? "bg-ember" : "bg-inset border border-edge"}`}
                  >
                    <span className={`absolute top-1 size-5 rounded-full bg-ink transition-[left] ${voice.gap ? "left-6" : "left-1"}`} />
                  </button>
                </Row>
              </dl>
            </fieldset>
          );
        })}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-edge pt-6">
        <span className="text-[0.95rem] text-ink-muted">Start with</span>
        {(["de", "en"] as Lang[]).map((lang) => (
          <button
            key={lang}
            type="button"
            aria-pressed={first === lang}
            onClick={() => { stop(); setFirst(lang); }}
            className={`inline-flex min-h-8 items-center rounded-md px-3.5 text-[13px] font-medium transition-colors ${
              first === lang ? "bg-brass text-[#1a1408]" : "border border-edge text-ink-secondary hover:text-brass"
            }`}
          >
            {NAME[lang]}
          </button>
        ))}
      </div>

      <div className="mt-6 flex h-11 w-full overflow-hidden rounded-md border border-edge" aria-hidden="true">
        {sequence.map((part, i) => (
          <div
            key={i}
            style={{ flexGrow: part.ms }}
            className={`flex min-w-0 basis-0 items-center justify-center border-r border-page px-1 font-mono text-[11px] last:border-r-0 ${
              part.gap
                ? "bg-[repeating-linear-gradient(135deg,transparent_0_6px,rgba(253,241,228,0.06)_6px_12px)] text-ink-faint"
                : part.lang === "de" ? "bg-ember/25 text-ink" : "bg-brass/15 text-ink-secondary"
            } ${at === i ? "outline-2 -outline-offset-2 outline-ember-bright" : ""}`}
          >
            <span className="truncate">{part.gap ? "your turn" : `${part.lang.toUpperCase()} ${part.speed}×`}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-start gap-x-8 gap-y-4">
        <button
          type="button"
          onClick={at === null ? play : stop}
          className="inline-flex h-11 flex-none items-center gap-2 rounded-sm bg-ember px-5 text-[0.95rem] text-[#16140f] transition-colors hover:bg-ember-bright"
        >
          {at === null ? <PlayIcon className="size-4" /> : <Icon name="square" className="size-4" />}
          {at === null ? "Hear one sentence" : "Stop"}
        </button>
        <p className="min-w-0 flex-[1_1_20rem] text-ink-muted">
          {describe(first, voices[first])}. Then {describe(second, voices[second])}.{" "}
          <span className="whitespace-nowrap text-ink-secondary">About {Math.round(total / 1000)} seconds a sentence.</span>
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2" aria-live="polite">
        {(["de", "en"] as Lang[]).map((lang) => (
          <p
            key={lang}
            lang={lang}
            className={`border-l-2 pl-4 transition-colors ${
              reading?.lang === lang ? (reading.gap ? "border-brass text-ink" : "border-ember-bright text-ink") : "border-edge text-ink-muted"
            }`}
          >
            {SENTENCE[lang]}
            {reading?.lang === lang && reading.gap ? <span className="mt-1 block text-[0.9rem] text-brass">Your turn: say it back.</span> : null}
          </p>
        ))}
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex min-h-10 items-center justify-between gap-4">
      <dt className="text-ink-secondary">{label}</dt>
      <dd className="flex items-center">{children}</dd>
    </div>
  );
}

function Stepper({ value, fewer, more, names }: {
  value: string;
  fewer: (() => void) | null;
  more: (() => void) | null;
  names: [string, string];
}) {
  const button = "flex size-9 items-center justify-center text-lg text-ink-secondary transition-colors hover:text-brass disabled:text-ink-faint disabled:hover:text-ink-faint";
  return (
    <span className="inline-flex items-center rounded-md border border-edge bg-page">
      <button type="button" aria-label={names[0]} disabled={!fewer} onClick={fewer ?? undefined} className={button}>−</button>
      <span className="w-12 text-center font-mono text-sm tabular-nums">{value}</span>
      <button type="button" aria-label={names[1]} disabled={!more} onClick={more ?? undefined} className={button}>+</button>
    </span>
  );
}
