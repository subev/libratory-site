// The stroked 24px set the read-along and chat demos draw with; the app-chrome demos use Phos.tsx
const PATHS = {
  caret: "m6.5 9.5 5.5 5.5 5.5-5.5",
  search: "M10.8 4.2a6.6 6.6 0 1 0 0 13.2 6.6 6.6 0 0 0 0-13.2M15.6 15.6 20.4 20.4",
  x: "m6 6 12 12M18 6 6 18",
  square: "M5 4.4h14a.6.6 0 0 1 .6.6v14a.6.6 0 0 1-.6.6H5a.6.6 0 0 1-.6-.6V5a.6.6 0 0 1 .6-.6",
  speaker: "M11 5 6.4 9H3v6h3.4l4.6 4ZM14.8 9.6a3.4 3.4 0 0 1 0 4.8M17.6 6.8a7.4 7.4 0 0 1 0 10.4",
  speakerOff: "M11 5 6.4 9H3v6h3.4l4.6 4ZM15.4 9.8l5 4.4M20.4 9.8l-5 4.4",
} as const;

export type IconName = keyof typeof PATHS;

export function Icon({ name, className = "size-4" }: { name: IconName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={PATHS[name]} />
    </svg>
  );
}

export function PlayIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M8 5.2v13.6L19 12Z" />
    </svg>
  );
}

export function PauseIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M7.4 5h3.2v14H7.4zM13.4 5h3.2v14h-3.2z" />
    </svg>
  );
}
