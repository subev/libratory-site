import { Fragment, useRef, type ReactNode } from "react";
import { CUES } from "./cues.ts";
import { useInView, useLoopClock, useReducedMotion } from "./demo.tsx";
import { CUE_END, Highlight, useWordRects } from "./highlight.tsx";

export const IOS = "[font-family:-apple-system,BlinkMacSystemFont,system-ui,sans-serif]";

export const PAPER = "oklch(0.9363 0.0218 83.2637)";
export const CREAM = "oklch(0.9600 0.0150 82)";

// Written out in full: Tailwind reads class names from the source, so a fragment would never build
export const INK = "text-[oklch(0.366_0.0251_49.6085)]";
export const INK_SOFT = "text-[oklch(0.4444_0.0096_73.639)]";
export const INK_FAINT = "text-[oklch(0.5534_0.0116_58.0708)]";
export const INK_DIM = "text-[oklch(0.6400_0.0100_58)]";
export const PAPER_WHITE = "text-[oklch(0.9600_0.0150_82)]";
export const CREAM_BG = "bg-[oklch(0.9600_0.0150_82)]";
export const GRAB = "bg-[oklch(0.6400_0.0100_58)]";

// The rest of the paragraph the cue file does not cover, so the page reads as a page
const REST =
  "His limbs were in proportion, and I had selected his features as beautiful. Beautiful! Great God! His yellow skin scarcely covered the work of muscles and arteries beneath; his hair was of a lustrous black, and flowing; his teeth of a pearly whiteness; but these luxuriances only formed a more horrid contrast with his watery eyes, that seemed almost of the same colour as the dun-white sockets in which they were set, his shrivelled complexion and straight black lips.";

function timestamp(ms: number) {
  const total = Math.round(ms / 1000);
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
}

export function PhoneFrame({ width, height, radius, pad, screen, lift, children }: {
  width: number;
  height: number;
  radius: number;
  pad: number;
  screen: string;
  lift?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className="max-w-full flex-none"
      style={{
        width,
        padding: pad,
        borderRadius: radius,
        background: "linear-gradient(160deg,#3a352c,#100e0a 45%,#26221b)",
        boxShadow: `${lift ? "0 40px 90px rgba(0,0,0,0.6)" : "0 30px 70px rgba(0,0,0,0.55)"}, 0 0 0 1px rgba(253,241,228,0.08)`,
      }}
    >
      <div
        className="relative flex flex-col overflow-hidden"
        style={{ height, borderRadius: radius - pad, background: screen }}
      >
        {children}
      </div>
    </div>
  );
}

export function StatusBar({ time, big, className = "" }: { time: string; big?: boolean; className?: string }) {
  return (
    <div
      className={`flex flex-none items-center font-semibold ${INK} ${IOS} ${
        big ? "h-8 px-6 text-[11.5px]" : "h-7 px-5 text-[10.5px]"
      } ${className}`}
    >
      <span className="mr-auto">{time}</span>
      <span className={`rounded-full bg-[#100e0a] ${big ? "h-[19px] w-[60px]" : "h-[17px] w-[52px]"}`} />
      <span className="ml-auto flex items-center gap-[3px]">
        {big ? (
          <svg viewBox="0 0 16 12" className="h-[11px] w-3.5" fill="currentColor" aria-hidden="true">
            <path d="M8 2.2c1.7 0 3.3.6 4.5 1.7l.9-1A7.7 7.7 0 0 0 8 .8 7.7 7.7 0 0 0 2.6 2.9l.9 1A6.5 6.5 0 0 1 8 2.2Zm0 3c1 0 1.9.4 2.6 1l.9-1A5.1 5.1 0 0 0 8 3.8c-1.3 0-2.5.5-3.5 1.4l.9 1c.7-.6 1.6-1 2.6-1Zm0 2.9c-.6 0-1.1.2-1.5.6L8 11.2l1.5-1.7A2.2 2.2 0 0 0 8 8.1Z" />
          </svg>
        ) : null}
        <span className={`inline-flex items-center rounded-[3px] border border-current p-px ${big ? "h-[11px] w-5" : "h-2.5 w-[18px]"}`}>
          <span className="block size-full rounded-[1.5px] bg-current" />
        </span>
      </span>
    </div>
  );
}

export function Glyph({ d, className, width = "2" }: { d: string; className: string; width?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

export function Skip({ back, step, className }: { back?: boolean; step: string; className: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
      <path d={back ? "M12 3.6 A8.4 8.4 0 1 1 4.05 9.4" : "M12 3.6 A8.4 8.4 0 1 0 19.95 9.4"} />
      <path
        d={back ? "M12.2 1.1 L12.2 6.1 L8.3 3.6 Z" : "M11.8 1.1 L11.8 6.1 L15.7 3.6 Z"}
        fill="currentColor"
        stroke="none"
      />
      <text
        x="12" y="15.5" textAnchor="middle" stroke="none" fill="currentColor"
        fontSize={step.length > 1 ? 9.4 : 10.2} fontWeight="600" className={IOS}
      >
        {step}
      </text>
    </svg>
  );
}

function PauseGlyph({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M7.4 5h3.2v14H7.4zM13.4 5h3.2v14h-3.2z" />
    </svg>
  );
}

const CAPSULE = "flex h-[38px] flex-none items-center gap-0.5 rounded-full bg-[rgba(253,250,245,0.94)] px-1.5 text-[#e2601f] shadow-[0_1px_8px_rgba(42,20,8,0.10)] backdrop-blur-md";
const PRESS = "flex size-[26px] items-center justify-center";

/** The synced EPUB open on the phone: the same cues the desktop read-along runs, over the same print. */
export function ReadAlongPhone() {
  const pageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const inView = useInView(frameRef);
  const reduced = useReducedMotion();
  const [clock] = useLoopClock({ period: CUE_END, running: inView && !reduced });
  const ms = reduced ? 7000 : clock;
  const rects = useWordRects(pageRef);

  return (
    <div ref={frameRef} className="flex min-w-0 justify-center">
      <PhoneFrame width={320} height={660} radius={50} pad={12} screen={PAPER} lift>
        <StatusBar time="9:41" big className="absolute inset-x-0 top-0 z-[3]" />

        <div className="absolute inset-0 z-[1] flex flex-col overflow-hidden pt-10">
          <div className="flex min-h-0 flex-1 flex-col bg-white px-[22px] py-6 shadow-[0_1px_10px_rgba(42,20,8,0.10)]">
            <div className="mb-3.5 flex justify-between text-[7.5px] tracking-[0.16em] text-[rgba(42,20,8,0.4)]">
              <span>FRANKENSTEIN</span>
              <span>173</span>
            </div>
            <div ref={pageRef} className="relative isolate text-left font-body text-[11.5px]/[1.7] text-[#2a1408]">
              <Highlight
                rects={rects}
                ms={ms}
                line="color-mix(in oklch, #e2601f 15%, transparent)"
                word="color-mix(in oklch, #e2601f 42%, transparent)"
              />
              {CUES.map(([text], i) => (
                <Fragment key={i}>
                  <span data-word className="inline">{text}</span>{" "}
                </Fragment>
              ))}
            </div>
            <p className="mt-2.5 min-h-0 flex-1 overflow-hidden text-left font-body text-[11.5px]/[1.7] text-[#2a1408]">{REST}</p>
            <p className="mt-3 text-center text-[7.5px] text-[rgba(42,20,8,0.4)]">173</p>
          </div>
        </div>

        <div className="absolute inset-x-[11px] top-9 z-[4] flex items-center gap-2">
          <span className={CAPSULE}>
            <span className={PRESS}><Glyph d="M14.5 5 8 12l6.5 7" className="size-4" width="2.3" /></span>
            <span className={PRESS}><Glyph d="M4 9h5V4M20 15h-5v5M9 9 4.5 4.5M15 15l4.5 4.5" className="size-4" /></span>
          </span>
          <span className={`min-w-0 flex-1 truncate text-center text-[11.5px] font-semibold ${INK_SOFT} ${IOS}`}>
            Chapter IV
          </span>
          <span className={CAPSULE}>
            <span className={`${PRESS} ${IOS} text-sm font-medium tracking-[-0.03em]`}>AA</span>
            <span className={PRESS}><Glyph d="M9 6h11M9 12h11M9 18h11M4.6 6h.01M4.6 12h.01M4.6 18h.01" className="size-4" /></span>
            <span className={PRESS}><Glyph d="M7 4h10v16l-5-4-5 4z" className="size-[15px]" width="1.9" /></span>
          </span>
        </div>

        <div className="absolute inset-x-[11px] bottom-[13px] z-[4] flex items-center gap-[11px] rounded-full bg-[rgba(253,250,245,0.94)] px-[15px] py-2.5 shadow-[0_2px_12px_rgba(42,20,8,0.16)] backdrop-blur-md">
          <Glyph d="m5 15 7-7 7 7" className="size-4 flex-none text-[#e2601f]" width="2.2" />
          <span className="flex min-w-0 flex-1 flex-col gap-[3px]">
            <span className="relative block h-[5px] rounded-full bg-[rgba(42,20,8,0.12)]">
              <span className="absolute inset-y-0 left-0 rounded-full bg-[oklch(0.366_0.0251_49.6085)]" style={{ width: `${(ms / CUE_END) * 100}%` }} />
            </span>
            <span className={`flex justify-between text-[10px] tabular-nums ${INK_FAINT} ${IOS}`}>
              <span>{timestamp(ms)}</span>
              <span>−{timestamp(Math.max(0, CUE_END - ms))}</span>
            </span>
          </span>
          <Skip back step="5" className="size-[23px] flex-none text-[#e2601f]" />
          <Skip step="5" className="size-[23px] flex-none text-[#e2601f]" />
          <PauseGlyph className="size-[18px] flex-none text-[#e2601f]" />
        </div>
      </PhoneFrame>
    </div>
  );
}
