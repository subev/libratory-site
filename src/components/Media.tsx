// A filmed clip takes this box as it is, so dropping one in moves nothing on the page
const RATIO = "3 / 2";

export function HeroMedia({ video }: { video?: { src: string; poster: string } }) {
  const box = "w-full max-w-[560px] rounded-xl border border-edge shadow-[0_30px_80px_rgba(0,0,0,0.55)]";

  return video ? (
    <video
      src={video.src}
      poster={video.poster}
      autoPlay
      muted
      loop
      playsInline
      className={`${box} object-cover`}
      style={{ aspectRatio: RATIO }}
    />
  ) : (
    <div
      role="img"
      aria-label="Demo clip to come"
      style={{ aspectRatio: RATIO }}
      className={`${box} flex items-center justify-center border-dashed border-edge-strong bg-inset p-6 text-sm text-ink-faint`}
    >
      Demo clip to come
    </div>
  );
}
