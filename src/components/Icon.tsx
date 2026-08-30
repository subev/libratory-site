const PATHS = {
  chat: "M20 12c0 3.9-3.6 7-8 7-1 0-2-.2-2.9-.5L4 20l1.4-3.6A6.6 6.6 0 0 1 4 12c0-3.9 3.6-7 8-7s8 3.1 8 7Z",
  gear: "M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6M12 3v2.2M12 18.8V21M21 12h-2.2M5.2 12H3M18.4 5.6 16.8 7.2M7.2 16.8 5.6 18.4M18.4 18.4l-1.6-1.6M7.2 7.2 5.6 5.6",
  check: "M5 4h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1M8.2 12l2.6 2.6 5-5.6",
  refresh: "M4.5 12A7.5 7.5 0 0 1 17.6 7M19.5 12a7.5 7.5 0 0 1-13.1 5M17.8 2.8V7h-4.2M6.2 21.2V17h4.2",
  trash: "M4 7h16M9.5 7V4.8a.8.8 0 0 1 .8-.8h3.4a.8.8 0 0 1 .8.8V7M6.4 7l.9 12.1a2 2 0 0 0 2 1.9h5.4a2 2 0 0 0 2-1.9L17.6 7",
  list: "M9 6h11M9 12h11M9 18h11M4.6 6h.01M4.6 12h.01M4.6 18h.01",
  translate: "M3 6.2h10M8 4v2.2M11.6 6.2c0 4.4-3.6 8-8.6 8.6M6 10.4c1.6 2.8 3.9 4.5 7 5.4M12.8 21l4.6-11L22 21M14.6 17.4h5.6",
  grip: "M9.4 6h.01M9.4 12h.01M9.4 18h.01M14.6 6h.01M14.6 12h.01M14.6 18h.01",
  expand: "M14.5 4H20v5.5M9.5 20H4v-5.5M20 4l-6.6 6.6M4 20l6.6-6.6",
  book: "M12 6.6C10.4 5 7.9 4.4 4 4.7v12.5c3.9-.3 6.4.3 8 1.8 1.6-1.5 4.1-2.1 8-1.8V4.7c-3.9-.3-6.4.3-8 1.9M12 6.6V19",
  sparkle: "M12 3.4 13.8 9 19 10.8 13.8 12.6 12 18.2l-1.8-5.6L5 10.8 10.2 9Z",
  download: "M12 4v10.6M7.6 10.4 12 14.8l4.4-4.4M5 19.4h14",
  caret: "m6.5 9.5 5.5 5.5 5.5-5.5",
  search: "M10.8 4.2a6.6 6.6 0 1 0 0 13.2 6.6 6.6 0 0 0 0-13.2M15.6 15.6 20.4 20.4",
  x: "m6 6 12 12M18 6 6 18",
  square: "M5 4.4h14a.6.6 0 0 1 .6.6v14a.6.6 0 0 1-.6.6H5a.6.6 0 0 1-.6-.6V5a.6.6 0 0 1 .6-.6",
  fileAudio: "M13.6 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8.4Zm0 0v5.4H19M9.6 14v3M12 12.4v6.2M14.4 14.6v2",
  bookmark: "M19.4 3H8.2A3.2 3.2 0 0 0 5 6.2v11.6M19.4 3v12M5 17.8A3.2 3.2 0 0 0 8.2 21h11.2v-6H8.2A3.2 3.2 0 0 0 5 17.8M11.4 3v6.4l2.6-1.8 2.6 1.8V3",
  speaker: "M11 5 6.4 9H3v6h3.4l4.6 4ZM14.8 9.6a3.4 3.4 0 0 1 0 4.8M17.6 6.8a7.4 7.4 0 0 1 0 10.4",
  folder: "M3.6 7.6a1.4 1.4 0 0 1 1.4-1.4h3.4l2 2.4h8.6a1.4 1.4 0 0 1 1.4 1.4v8.4a1.4 1.4 0 0 1-1.4 1.4H5a1.4 1.4 0 0 1-1.4-1.4Z",
  filePdf: "M13.6 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8.4Zm0 0v5.4H19M8.8 13h2.4M8.8 16.6h6.4",
  upload: "M12 19.4V6.2M7.6 10.6 12 6.2l4.4 4.4M5 4h14",
  plus: "M12 5.2v13.6M5.2 12h13.6",
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
