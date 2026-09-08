import {
  CREAM, CREAM_BG, GRAB, Glyph, INK, INK_DIM, INK_FAINT, INK_SOFT, IOS, PAPER, PAPER_WHITE, PhoneFrame,
  Skip, StatusBar,
} from "./phone.tsx";

const RAISED = "bg-[oklch(0.9885_0.0057_84.5659)]";

// The reader's own gradient trick: one bar that is the coverage ribbon and the scrubber at once
const COVERAGE =
  "linear-gradient(90deg,rgba(61,47,34,0.55) 0 3%,rgba(61,47,34,0.16) 3% 22.5%,rgba(61,47,34,0.55) 22.5% 24.5%,rgba(61,47,34,0.16) 24.5% 31%,#e2601f 31% 32.5%,rgba(61,47,34,0.16) 32.5% 42.5%,rgba(61,47,34,0.55) 42.5% 44%,rgba(61,47,34,0.09) 44% 100%)";

const MARKS = [
  { word: "luxuriances", line: "…but these luxuriances only formed a more horrid contrast with his watery eyes.", at: "5 · Chapter IV · 12:41 · p. 173" },
  { word: "dun-white", line: "…almost of the same colour as the dun-white sockets in which they were set.", at: "5 · Chapter IV · 13:02 · p. 173" },
  { word: "turbulent", line: "…along the bank of a large, turbulent river while looking after a flock of white geese.", at: "2 · The Goose Boy · 4:18 · p. 41" },
];

const BEHIND =
  "A poor goose boy went walking along the bank of a large, turbulent river while looking after a flock of white geese. On the bank there was a stone, and on the stone a ring; and the boy, having nothing better to do, put it on. It was already one in the morning; the rain pattered dismally against the panes, and my candle was nearly burnt out, when, by the glimmer of the half-extinguished light, I saw the dull yellow eye of the creature open. It breathed hard, and a convulsive motion agitated its limbs.";

function Caption({ lead, children }: { lead: string; children: string }) {
  return (
    <p className="max-w-[320px] text-[0.95rem] text-ink-muted">
      <strong className="font-semibold text-ink-secondary">{lead}</strong> {children}
    </p>
  );
}

export function PlainEpubPhone() {
  return (
    <div className="flex min-w-0 flex-col items-center gap-5">
      <PhoneFrame width={276} height={520} radius={44} pad={10} screen={PAPER}>
        <StatusBar time="9:41" />
        <div className="flex items-center gap-2 px-3 pt-0.5 pb-2">
          <Glyph d="M14.5 5 8 12l6.5 7" className="size-4 flex-none text-[#e2601f]" width="2.3" />
          <span className={`min-w-0 flex-1 truncate text-center text-[10.5px] font-semibold tracking-[0.06em] ${INK_SOFT} ${IOS}`}>
            4 · THE WHITE SNAKE
          </span>
          <span className="flex-none font-body text-base font-semibold text-[#e2601f]">Aa</span>
          <Glyph d="M4 6h16M4 12h16M4 18h10" className="size-4 flex-none text-[#e2601f]" />
        </div>
        <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-hidden px-5 pt-1 font-body text-[12.5px]/[1.62] text-[#2a1408]">
          <p>A long time ago there lived a king whose wisdom was praised throughout the land. Nothing remained hidden from him, and it seemed as if news of the most secret things was carried to him through the air.</p>
          <p>
            He had, however, one strange custom. Every day at dinner, after the table had been cleared and no one else was present, a trusted servant had to bring him one more dish. It was covered, and even the servant did not know what was in it, for the king never took off the cover until he was quite alone. One day the servant was overcome with such{" "}
            <span className="border-b-[1.5px] border-[rgba(42,20,8,0.34)]">curiosity</span> that he carried the dish into his room.
          </p>
        </div>
        <div className="flex justify-center px-5 pt-2 pb-3.5">
          <span className={`text-[10px] tabular-nums ${INK_DIM} ${IOS}`}>Chapter 4 of 62 · 38% through</span>
        </div>
      </PhoneFrame>
      <Caption lead="Ebook.">
        Read at your own text size. Your chapter and place are saved.
      </Caption>
    </div>
  );
}

export function M4bPhone() {
  return (
    <div className="flex min-w-0 flex-col items-center gap-5">
      <PhoneFrame width={276} height={520} radius={44} pad={10} screen={CREAM}>
        <StatusBar time="14:06" />
        <div className="flex items-center gap-2 px-[11px] pt-0.5 pb-2">
          <span className={`flex size-[30px] flex-none items-center justify-center rounded-full text-[#e2601f] shadow-[0_1px_6px_rgba(42,20,8,0.08)] ${RAISED}`}>
            <Glyph d="M14.5 5 8 12l6.5 7" className="size-4" width="2.3" />
          </span>
          <span className={`min-w-0 flex-1 truncate text-center text-[9.5px] font-semibold tracking-[0.13em] ${INK_SOFT} ${IOS}`}>
            NOW PLAYING
          </span>
          <span className={`flex h-[30px] flex-none items-center gap-px rounded-full px-[5px] text-[#e2601f] shadow-[0_1px_6px_rgba(42,20,8,0.08)] ${RAISED}`}>
            <span className="flex size-[23px] items-center justify-center">
              <Glyph d="M7 4h10v16l-5-4-5 4z" className="size-3.5" width="1.9" />
            </span>
            <span className="flex size-[23px] items-center justify-center">
              <Glyph d="M9 6h11M9 12h11M9 18h11M4.6 6h.01M4.6 12h.01M4.6 18h.01" className="size-[15px]" />
            </span>
          </span>
        </div>

        <div className="flex min-h-0 flex-1 flex-col px-3.5">
          <div className="flex flex-col items-center gap-3 pt-3.5">
            <div className="flex h-[130px] w-23 flex-none items-center justify-center rounded-lg bg-[#1e3a5c] p-2.5 text-center shadow-[0_8px_20px_rgba(42,20,8,0.22)]">
              <span className={`font-body text-[8px]/[1.3] ${PAPER_WHITE}`}>Shelley 1888 Frankenstein</span>
            </div>
            <div className={`flex flex-col items-center gap-0.5 text-center ${IOS}`}>
              <span className={`text-sm font-semibold ${INK}`}>INTRODUCTION.</span>
              <span className={`text-[10.5px] tabular-nums ${INK_FAINT}`}>Chapter 2 of 32 · 12 min</span>
            </div>
          </div>

          <div className={`mt-auto flex flex-col gap-1.5 ${IOS}`}>
            <span className="block h-[7px] rounded-full" style={{ background: COVERAGE }} />
            <span className={`flex justify-between text-[10px] tabular-nums ${INK_SOFT}`}>
              <span>3:55</span>
              <span>−8:19</span>
            </span>
            <span className={`flex justify-between text-[10px] ${INK_FAINT}`}>
              <span>heard 7% of this chapter</span>
              <span>3 gaps, 5 min</span>
            </span>
          </div>

          <div className="flex items-center justify-center gap-[30px] pt-3.5 pb-2.5">
            <Skip back step="15" className={`size-[27px] flex-none ${INK_SOFT}`} />
            <span className="flex size-[46px] items-center justify-center rounded-full bg-[#e2601f]">
              <svg viewBox="0 0 24 24" className="size-[21px] text-[#2a1408]" fill="currentColor" aria-hidden="true">
                <path d="M8 5.2v13.6L19 12Z" />
              </svg>
            </span>
            <Skip step="15" className={`size-[27px] flex-none ${INK_SOFT}`} />
          </div>

          <div className={`flex items-center justify-between px-0.5 pt-0.5 pb-4 ${IOS}`}>
            <span className="text-[12.5px] font-semibold text-[#e2601f]">1×</span>
            <svg viewBox="0 0 24 24" className="size-[18px] text-[#e2601f]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
              <path d="M9.4 14.9 A3.2 3.2 0 1 1 14.6 14.9" />
              <path d="M7.4 16.2 A5.6 5.6 0 1 1 16.6 16.2" />
              <path d="M5.5 17.6 A8 8 0 1 1 18.5 17.6" />
              <path d="M12 12.4 L18.4 20.4 L5.6 20.4 Z" fill="currentColor" stroke="none" />
            </svg>
          </div>
        </div>
      </PhoneFrame>
      <Caption lead="Audiobook.">
        Pick a chapter and press play. The bar shows what you have heard and what you skipped.
      </Caption>
    </div>
  );
}

export function MarksPhone() {
  return (
    <div className="flex min-w-0 justify-center">
      <PhoneFrame width={290} height={568} radius={46} pad={11} screen={PAPER}>
        <div className="absolute inset-0 px-5 pt-8.5 font-body text-[11px]/[1.66] text-[#2a1408] opacity-50">{BEHIND}</div>
        <div className="absolute inset-0 bg-black/40" />

        <div className={`absolute inset-x-0 top-37 bottom-0 flex flex-col rounded-t-[14px] shadow-[0_-6px_24px_rgba(0,0,0,0.2)] ${CREAM_BG}`}>
          <span className={`mx-auto mt-2 mb-1.5 h-[5px] w-9 rounded-full ${GRAB}`} />

          <div className={`grid grid-cols-[auto_1fr_auto] items-center gap-2 px-3 pb-2.5 ${IOS}`}>
            <span className={`flex size-8 items-center justify-center rounded-full text-[#e2601f] ${RAISED}`}>
              <Glyph d="M12 15V4M8 8l4-4 4 4M5 14v5h14v-5" className="size-4" width="1.9" />
            </span>
            <span className={`text-center text-sm font-semibold ${INK}`}>Marks</span>
            <span className={`rounded-full px-3.5 py-[7px] text-[12.5px] text-[#e2601f] ${RAISED}`}>Done</span>
          </div>

          <div className={`mx-[11px] flex rounded-full bg-[rgba(61,47,34,0.09)] p-[1.5px] text-[11px]/[1.2] ${IOS}`}>
            {["Chapters", "Marks", "Search"].map((tab) => (
              <span
                key={tab}
                className={`flex-1 rounded-full py-1 text-center ${INK} ${
                  tab === "Marks" ? "bg-white shadow-[0_1px_3px_rgba(42,20,8,0.12)]" : ""
                }`}
              >
                {tab}
              </span>
            ))}
          </div>

          <div className={`flex gap-[7px] p-[11px] text-[11px]/[1.2] ${IOS}`}>
            <span className="rounded-full bg-[rgba(226,96,31,0.16)] px-[11px] py-[4.5px] font-semibold text-[#b8480c]">Unknown words · 24</span>
            <span className={`rounded-full bg-[rgba(61,47,34,0.08)] px-[11px] py-[4.5px] ${INK}`}>Quotes · 6</span>
          </div>

          <div className="flex-none overflow-hidden bg-white">
            {MARKS.map((mark, i) => (
              <div key={mark.word}>
                {i ? <div className="ml-3.5 h-px bg-[rgba(61,47,34,0.10)]" /> : null}
                <div className="flex flex-col gap-[3px] px-3.5 py-[11px]">
                  <span className="self-start border-b-[1.5px] border-[rgba(42,20,8,0.34)] font-body text-[15px] text-[#2a1408]">
                    {mark.word}
                  </span>
                  <span className={`text-[10.5px]/[1.45] ${INK_FAINT} ${IOS}`}>{mark.line}</span>
                  <span className={`text-[10px] tabular-nums ${INK_DIM} ${IOS}`}>{mark.at}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PhoneFrame>
    </div>
  );
}
