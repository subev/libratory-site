import type { ReactNode } from "react";
import { PhoneFrame } from "./phone.tsx";

// The captures are portrait phone screens: phones show part of one as a 3:2 crop, desktop shows it whole in a frame
const CROP = "3 / 2";
const EMPTY = "flex items-center justify-center border border-dashed border-edge-strong bg-inset p-6 text-sm text-ink-faint";

/** A 1170×2532 capture; `focus` is how far down the 3:2 phone crop sits, past the status bar and toolbar */
export type Capture = { src: string; alt: string; focus: string };

/** `name` marks an empty slot, so each page's missing capture can be found in the markup */
export function HeroMedia({ name, capture }: { name: string; capture?: Capture }) {
  const crop = "w-full max-w-[560px] rounded-xl shadow-[0_30px_80px_rgba(0,0,0,0.55)] lg:hidden";
  const frame = (screen: ReactNode) => (
    <div className="hidden lg:block">
      <PhoneFrame width={300} height={602} radius={46} pad={11} screen="var(--bg-raised)" lift>{screen}</PhoneFrame>
    </div>
  );

  if (capture) {
    return (
      <div className="flex w-full justify-center">
        <img
          src={capture.src}
          alt={capture.alt}
          width={1170}
          height={2532}
          style={{ aspectRatio: CROP, objectPosition: `center ${capture.focus}` }}
          className={`${crop} border border-edge object-cover`}
        />
        {frame(<img src={capture.src} alt="" width={1170} height={2532} className="size-full object-cover" />)}
      </div>
    );
  }

  return (
    <div data-slot={`${name}-demo`} role="img" aria-label="Demo clip to come" className="flex w-full justify-center">
      <div style={{ aspectRatio: CROP }} className={`${crop} ${EMPTY}`}>Demo clip to come</div>
      {frame(<div className={`size-full ${EMPTY}`} style={{ borderRadius: 35 }}>Demo clip to come</div>)}
    </div>
  );
}
