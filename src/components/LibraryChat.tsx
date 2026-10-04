import { useRef } from "react";
import { Icon } from "./Icon.tsx";
import { Caret, Notes, reveal, useInView, useLoopClock, useReducedMotion, Window } from "./demo.tsx";

const QUESTION = "Why can trying to fix a problem make it worse?";

const ANSWER =
  "People may want different things, so one person's fix can get in another's way [1]. Changing the rules or sharing better information can help [2]. Another book describes a village that seems to accept a change, then quietly goes back to its old ways [3].";

const SOURCES = [
  { label: "Thinking in Systems — Policy resistance — p. 112", badge: "" },
  { label: "Thinking in Systems — Leverage points — p. 145", badge: "" },
  { label: "Записки по българските въстания — Глава 2 — p. 38", badge: "BG" },
];

const TOOLS = [
  { at: 1900, label: "Searched: why systems resist change" },
  { at: 2900, label: "Searched: policy resistance feedback loops" },
  { at: 3900, label: "Read the matching pages" },
];

const ASKED = 1500;
const FROM = 4600;
const TO = 13_500;

// Then it is asked to act: a change to a book comes back as a card to run, never done unasked
const REQUEST = "Make a German version of Frankenstein for my iPhone.";
const REQUESTED = 15_500;
const FOUND = 16_600;
const CARD = 17_600;
const LOOP = 26_000;

const PLACEHOLDER = "Ask about your books…";

const NOTES = [
  { title: "Check the answer", body: "See the pages it used. A quote opens the reader at the moment it is read aloud." },
  { title: "Let it do the work", body: "Drop in a PDF to make a book, or ask for a translation. Anything that changes a book waits for your OK." },
  { title: "Come back to it", body: "Conversations are kept, with the books they searched. Save a good answer as a note." },
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
  const requested = t >= REQUESTED;

  return (
    <div ref={sectionRef} className="grid gap-9 lg:grid-cols-[1fr_320px] lg:items-start">
      <Window url="localhost:5544/library" tag="ASSISTANT">
        <div className="flex min-h-[600px] flex-col gap-3 px-4 pt-3.5 pb-4 font-sans sm:px-5">
          <div className="flex items-center gap-2.5 border-b border-edge pb-3">
            <span className="hidden text-[11.5px] text-ink-faint sm:inline">‹ Library</span>
            <span className="font-display text-base font-semibold text-ink">Assistant</span>
            <span className="ml-auto flex items-center gap-1.5 rounded-md border border-edge bg-raised px-2.5 py-1 text-[11.5px] text-ink">
              Whole library
              <Icon name="caret" className="size-2.5 text-ink-faint" />
            </span>
            <span className="hidden items-center gap-1.5 rounded-md border border-edge bg-raised px-2.5 py-1 text-[11.5px] text-ink sm:flex">
              DeepSeek V4.1 Flash
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

          {requested ? (
            <div className="flex justify-end">
              <div className="max-w-[80%] rounded-2xl rounded-br-[4px] bg-ember-bright px-4 py-2.5 text-[13px]/[1.5] text-[#2a1408]">
                {REQUEST}
              </div>
            </div>
          ) : null}

          {t >= FOUND ? (
            <div className="flex items-center gap-2 text-[11.5px] text-ink-faint">
              <Icon name="search" className="size-3" />
              Found Frankenstein · 28 chapters
            </div>
          ) : null}

          {t >= CARD ? (
            <div className="max-w-[92%] rounded-xl border border-ember-bright/40 bg-ember-bright/6 px-4 py-3">
              <p className="text-[13px] font-semibold text-ink">Translate Frankenstein into German</p>
              <p className="mt-0.5 text-[11.5px] text-ink-muted">28 chapters · DeepSeek V4.1 Flash · kept beside the original</p>
              <div className="mt-2.5 flex items-center gap-2">
                <span className="rounded-md bg-ember-bright px-4 py-1.5 text-xs font-medium text-[#2a1408]">Run</span>
                <span className="rounded-md border border-edge-strong px-4 py-1.5 text-xs text-ink-secondary">Cancel</span>
                <span className="ml-1 text-[11px] text-ink-faint">Changes a book, so it waits for you</span>
              </div>
            </div>
          ) : null}

          <div className="mt-auto flex items-start gap-2">
            <div className="min-h-[52px] flex-1 rounded-[9px] border border-edge bg-raised px-3 py-2.5 text-[12.5px]/[1.5] text-ink-faint">
              {!asked
                ? reveal(QUESTION, 0, ASKED, t) || PLACEHOLDER
                : finished && !requested
                  ? reveal(REQUEST, TO + 500, REQUESTED, t) || PLACEHOLDER
                  : PLACEHOLDER}
              <Caret shown={!asked || (finished && !requested)} />
            </div>
            <span className="rounded-md bg-ember-bright px-5 py-2.5 text-[13px] font-medium text-[#2a1408]">Ask</span>
          </div>
        </div>
      </Window>

      <Notes items={NOTES} />
    </div>
  );
}
