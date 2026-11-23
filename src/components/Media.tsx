import type { ReactNode } from "react";
import { PhoneFrame } from "./phone.tsx";

// The captures are portrait phone screens: phones show part of one as a 3:2 crop, desktop shows it whole in a frame
const CROP = "3 / 2";
const EMPTY = "flex items-center justify-center border border-dashed border-edge-strong bg-inset p-6 text-sm text-ink-faint";

/** A 1170×2532 capture; `focus` is how far down the 3:2 phone crop sits, past the status bar and toolbar */
export type Capture = { src: string; alt: string; focus: string; /** A cut-out of a screen, shown as it is on every width */ plain?: { width: number; height: number } };

/** A screen recording with the app's own sound; only one a person has played goes here */
export type Clip = { src: string; poster: string; label: string; width: number; height: number };

export function ClipPlayer({ clip, className = "" }: { clip: Clip; className?: string }) {
  return (
    <video
      src={clip.src}
      poster={clip.poster}
      aria-label={clip.label}
      width={clip.width}
      height={clip.height}
      controls
      playsInline
      preload="none"
      className={`h-auto w-full rounded-xl border border-edge bg-inset shadow-[0_30px_80px_rgba(0,0,0,0.55)] ${className}`}
    />
  );
}

/** Two clips of the same page, shown side by side and captioned */
export type ClipPairing = { first: Clip; firstLabel: string; second: Clip; secondLabel: string };

export function ClipPair({ pair }: { pair: ClipPairing }) {
  const sides = [
    { clip: pair.first, label: pair.firstLabel },
    { clip: pair.second, label: pair.secondLabel },
  ];
  return (
    <div className="grid w-full max-w-[480px] grid-cols-2 gap-3 sm:gap-5">
      {sides.map(({ clip, label }) => (
        <figure key={clip.src} className="flex flex-col items-center gap-2">
          <ClipPlayer clip={clip} />
          <figcaption className="text-sm text-ink-muted">{label}</figcaption>
        </figure>
      ))}
    </div>
  );
}

/** `name` marks an empty slot, so each page's missing capture can be found in the markup */
export function HeroMedia({ name, capture, clip, pair }: { name: string; capture?: Capture; clip?: Clip; pair?: ClipPairing }) {
  const crop = "w-full max-w-[560px] rounded-xl shadow-[0_30px_80px_rgba(0,0,0,0.55)] lg:hidden";
  const frame = (screen: ReactNode) => (
    <div className="hidden lg:block">
      <PhoneFrame width={300} height={602} radius={46} pad={11} screen="var(--bg-raised)" lift>{screen}</PhoneFrame>
    </div>
  );

  if (pair) {
    return (
      <div className="flex w-full justify-center">
        <ClipPair pair={pair} />
      </div>
    );
  }

  if (clip) {
    return (
      <div className="flex w-full justify-center">
        <ClipPlayer clip={clip} className="max-w-[260px] sm:max-w-[320px]" />
      </div>
    );
  }

  if (capture?.plain) {
    return (
      <div className="flex w-full justify-center">
        <img
          src={capture.src}
          alt={capture.alt}
          width={capture.plain.width}
          height={capture.plain.height}
          className="w-full max-w-[440px] rounded-xl border border-edge shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
        />
      </div>
    );
  }

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
