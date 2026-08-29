import { useRef } from "react";
import { Icon } from "./Icon.tsx";
import { Caret, Notes, reveal, useInView, useLoopClock, useReducedMotion, Window } from "./demo.tsx";

const QUESTION = "Which of my books explain why a system pushes back when you try to fix it?";

const ANSWER =
  "Three of your books circle this. Donella Meadows calls it policy resistance: a system pulled by several actors toward different goals snaps back the moment any one of them lets go, so the fix has to change the goals rather than pull harder [1]. She lists the places where a small push does move it — rules, information flows, and the paradigm underneath them [2]. Захари Стоянов describes the same shape socially: a village that appears to comply and quietly restores itself the week after [3].";

const SOURCES = [
  { label: "Thinking in Systems — Policy resistance — p. 112", badge: "" },
  { label: "Thinking in Systems — Leverage points — p. 145", badge: "" },
  { label: "Записки по българските въстания — Глава 2 — p. 38", badge: "BG" },
];

const TOOLS = [
  { at: 1900, label: "Searched: why systems resist change" },
  { at: 2900, label: "Searched: policy resistance feedback loops" },
  { at: 3900, label: "Read more around c_7" },
];

const ASKED = 1500;
const FROM = 4600;
const TO = 13_500;
const LOOP = 21_000;

const PLACEHOLDER = "Ask your library… (Enter to send, Shift+Enter for newline)";

const NOTES = [
  { title: "It reads, then answers", body: "The assistant runs its own searches over the index and shows you each one. An answer that cites nothing is an answer you can see was never grounded." },
  { title: "Across languages", body: "Ask in English and it finds the Bulgarian passage, and the other way round — originals and translations sit in the same index." },
  { title: "Answers become material", body: "Save one as a note, and a note can be appended to a book as a chapter of its own — reordered, narrated, and carried into the next M4B." },
];

export function LibraryChat() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef);
  const reduced = useReducedMotion();
  const [clock] = useLoopClock({ period: LOOP, running: inView && !reduced });
  const t = reduced ? TO + 1 : clock;

  const asked = t >= ASKED;
  const answering = t >= FROM && t < TO;
  const searching = asked && t < FROM;
  const finished = t >= TO;
  const answer = reveal(ANSWER, FROM, TO, t);

  return (
    <div ref={sectionRef} className="grid gap-9 lg:grid-cols-[1fr_320px] lg:items-start">
      <Window url="localhost:5544/chat" tag="12 BOOKS INDEXED">
        <div className="flex min-h-[430px] flex-col gap-3 px-4 pt-3.5 pb-4 font-sans sm:px-5">
          <div className="flex items-center gap-2.5 border-b border-edge pb-3">
            <span className="hidden text-[11.5px] text-ink-faint sm:inline">‹ Library</span>
            <span className="font-display text-base font-semibold text-ink">Library chat</span>
            <span className="ml-auto flex items-center gap-1.5 rounded-md border border-edge bg-raised px-2.5 py-1 text-[11.5px] text-ink">
              Whole library
              <Icon name="caret" className="size-2.5 text-ink-faint" />
            </span>
            <span className="hidden items-center gap-1.5 rounded-md border border-edge bg-raised px-2.5 py-1 text-[11.5px] text-ink sm:flex">
              qwen3.8:27b
              <Icon name="caret" className="size-2.5 text-ink-faint" />
            </span>
          </div>

          {asked ? (
            <div className="flex justify-end">
              <div className="max-w-[80%] rounded-2xl rounded-br-[4px] bg-ember-bright px-4 py-2.5 text-[13px]/[1.5] text-[#2a1408]">
                {QUESTION}
              </div>
            </div>
          ) : null}

          {TOOLS.filter((tool) => t >= tool.at).map((tool) => (
            <div key={tool.label} className="flex items-center gap-2 text-[11.5px] text-ink-faint">
              <Icon name="search" className="size-3" />
              {tool.label}
            </div>
          ))}

          {searching || answering ? (
            <div className="flex items-center gap-2 text-[12.5px] text-ink-muted">
              <span className="size-[7px] rounded-full bg-ember-bright" style={{ animation: "softpulse 1.4s ease-in-out infinite" }} />
              {searching ? "Searching the library…" : "Answering…"}
            </div>
          ) : null}

          {answer ? (
            <div className="flex">
              <div className="max-w-[92%] rounded-2xl rounded-bl-[4px] border border-edge bg-raised px-4 py-3.5">
                <p className="text-[13px]/[1.62] text-ink">
                  {answer}
                  <Caret shown={answering} />
                </p>
                {finished ? (
                  <>
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {SOURCES.map((source, i) => (
                        <span
                          key={source.label}
                          className="inline-flex max-w-[360px] items-center gap-1.5 rounded-full border border-edge bg-inset px-2.5 py-1 text-[11px] text-ink-muted"
                        >
                          <span className="font-semibold text-ink-secondary">{i + 1}.</span>
                          <span className="truncate">{source.label}</span>
                          {source.badge ? (
                            <span className="text-[9.5px] font-semibold tracking-[0.06em] text-ink-faint">{source.badge}</span>
                          ) : null}
                        </span>
                      ))}
                    </div>
                    <div className="mt-2.5 text-[11.5px] text-ink-faint">Save as note</div>
                  </>
                ) : null}
              </div>
            </div>
          ) : null}

          <div className="mt-auto flex items-start gap-2">
            <div className="min-h-[52px] flex-1 rounded-[9px] border border-edge bg-raised px-3 py-2.5 text-[12.5px]/[1.5] text-ink-faint">
              {asked ? PLACEHOLDER : reveal(QUESTION, 0, ASKED, t) || PLACEHOLDER}
              <Caret shown={!asked} />
            </div>
            <span className="rounded-md bg-ember-bright px-5 py-2.5 text-[13px] font-medium text-[#2a1408]">Ask</span>
          </div>
        </div>
      </Window>

      <Notes items={NOTES} />
    </div>
  );
}
