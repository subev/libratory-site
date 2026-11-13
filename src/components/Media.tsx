import { PhoneFrame } from "./phone.tsx";

// The captures are portrait phone screens: phones show the top of one as a 3:2 crop, desktop shows it whole in a frame
const CROP = "3 / 2";
const EMPTY = "flex items-center justify-center border border-dashed border-edge-strong bg-inset p-6 text-sm text-ink-faint";

/** `name` marks the empty slot, so each page's missing capture can be found in the markup */
export function HeroMedia({ name }: { name: string }) {
  return (
    <div data-slot={`${name}-demo`} role="img" aria-label="Demo clip to come" className="flex w-full justify-center">
      <div
        style={{ aspectRatio: CROP }}
        className={`w-full max-w-[560px] rounded-xl shadow-[0_30px_80px_rgba(0,0,0,0.55)] lg:hidden ${EMPTY}`}
      >
        Demo clip to come
      </div>
      <div className="hidden lg:block">
        <PhoneFrame width={300} height={620} radius={46} pad={11} screen="var(--bg-raised)" lift>
          <div className={`size-full ${EMPTY}`} style={{ borderRadius: 35 }}>Demo clip to come</div>
        </PhoneFrame>
      </div>
    </div>
  );
}
