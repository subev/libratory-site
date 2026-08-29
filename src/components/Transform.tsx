import { useRef } from "react";
import { Icon } from "./Icon.tsx";
import { Caret, reveal, useInView, useLoopClock, useReducedMotion } from "./demo.tsx";

const ORIGINAL =
  "It was on a dreary night of November that I beheld the accomplishment of my toils. With an anxiety that almost amounted to agony, I collected the instruments of life around me, that I might infuse a spark of being into the lifeless thing that lay at my feet. It was already one in the morning; the rain pattered dismally against the panes, and my candle was nearly burnt out.";

const BULGARIAN =
  "Беше в една мрачна ноемврийска нощ, когато видях завършека на своите усилия. С тревога, която почти достигаше агония, събрах около себе си инструментите на живота, за да вдъхна искра живот в безжизненото нещо, което лежеше в краката ми. Часът беше вече един през нощта; дъждът чукаше унило по стъклата, а свещта ми беше почти изгоряла.";

const CHAPTERS = [
  "Letter 1 · To Mrs. Saville", "Letter 2", "Letter 3", "Letter 4",
  "Chapter I", "Chapter II", "Chapter III", "Chapter IV", "Chapter V",
];

const ACTIVE = 4;
const FROM = 1400;
const TO = 14_000;
const LOOP = 20_000;
const TOTAL_CHUNKS = 14;

export function Transform() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef);
  const reduced = useReducedMotion();
  const [clock] = useLoopClock({ period: LOOP, running: inView && !reduced });
  const t = reduced ? TO + 1 : clock;

  const running = t >= FROM && t < TO;
  const finished = t >= TO;
  const text = reveal(BULGARIAN, FROM, TO, t);
  const chunk = Math.max(1, Math.ceil((text.length / BULGARIAN.length) * TOTAL_CHUNKS));

  return (
    <div ref={sectionRef}>
      <div className="overflow-hidden rounded-xl border border-edge bg-raised shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
        <div className="flex items-center gap-2.5 overflow-x-auto border-b border-edge px-3.5 py-3 font-sans whitespace-nowrap">
          <h3 className="text-[14.5px] font-semibold text-ink">Translate / Transform</h3>
          <span className="flex items-center gap-1.5 rounded-md border border-edge bg-page px-2.5 py-1 text-xs text-ink">
            Bulgarian
            <Icon name="caret" className="size-2.5 text-ink-faint" />
          </span>
          <span className="hidden items-center gap-1.5 text-xs text-ink-secondary lg:flex">
            <Icon name="square" className="size-3.5 text-ink-faint" />
            Reasoning
          </span>
          <span className="hidden items-center gap-1.5 rounded-md border border-edge bg-page px-2.5 py-1 text-xs text-ink sm:flex">
            qwen3.8:27b <span className="text-ink-faint">· local</span>
            <Icon name="caret" className="size-2.5 text-ink-faint" />
          </span>
          <span className="rounded-[5px] bg-ember-bright px-3 py-1 text-xs font-medium text-[#2a1408]">
            {finished ? "Re-translate" : "Translate"}
          </span>
          <span className="rounded-[5px] border border-edge-strong px-3 py-1 text-xs text-ink-secondary">Stop</span>
          <span className={`min-w-0 truncate text-xs ${running ? "text-ember-bright" : "text-ink-muted"}`}>
            {running ? `Translating · ${chunk}/${TOTAL_CHUNKS} chunks...` : finished ? "Done — kept beside the original" : ""}
          </span>
          <span className="ml-auto flex size-6.5 shrink-0 items-center justify-center rounded-md text-ink-faint">
            <Icon name="x" className="size-4" />
          </span>
        </div>

        <div className="grid h-[330px] font-sans md:grid-cols-[200px_1fr_1fr]">
          <div className="hidden flex-col gap-px overflow-hidden border-r border-edge p-2 md:flex">
            {CHAPTERS.map((title, i) => {
              const state = i < ACTIVE ? "done" : i === ACTIVE ? (running ? "run" : finished ? "done" : "idle") : "idle";
              return (
                <div
                  key={title}
                  className={`flex items-center gap-2 rounded-md px-2 py-1.5 ${i === ACTIVE ? "bg-ember-bright/15" : ""}`}
                >
                  <span className="w-5 text-right font-mono text-[11px] text-ink-faint">{i + 1}.</span>
                  <span className="min-w-0 flex-1 truncate text-[12.5px] text-ink">{title}</span>
                  <span
                    className={`size-[7px] shrink-0 rounded-full ${
                      state === "done" ? "bg-green" : state === "run" ? "bg-ember-bright" : "bg-[#fdf1e4]/16"
                    }`}
                    style={state === "run" ? { animation: "softpulse 1.4s ease-in-out infinite" } : undefined}
                  />
                </div>
              );
            })}
          </div>

          <div className="flex min-w-0 flex-col border-r border-edge">
            <span className="px-4 pt-3 pb-1.5 text-[10.5px] font-medium tracking-[0.08em] uppercase text-ink-muted">Original</span>
            <p className="overflow-hidden px-4 pb-4 text-[13px]/[1.62] text-ink-secondary">{ORIGINAL}</p>
          </div>

          <div className="flex min-w-0 flex-col">
            <span className="px-4 pt-3 pb-1.5 text-[10.5px] font-medium tracking-[0.08em] uppercase text-ink-muted">Bulgarian</span>
            <p className="overflow-hidden px-4 pb-4 text-[13px]/[1.62] text-ink-secondary">
              {text || (running ? "" : "Nothing generated yet.")}
              <Caret shown={running} />
            </p>
          </div>
        </div>
      </div>

      <p className="mt-4 text-[0.95rem] text-ink-faint">
        The original is never overwritten — each variant carries its own text, its own narration and
        its own M4B.
      </p>
    </div>
  );
}
