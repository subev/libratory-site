import type { ReactNode } from "react";

export const REPO = "https://github.com/subev/libratory";
export const DOWNLOAD = `${REPO}/releases/latest`;

export function Mark({ className = "size-8" }: { className?: string }) {
  return (
    <svg viewBox="0 2 64 64" className={className} fill="none" stroke="#fdf1e4" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M32 10.5 L17 30.5 Q15.6 34.4 18.4 36.2 Q26 30 32 19 Z" fill="#e2601f" stroke="none" />
      <path d="M32 10.5 L47 30.5 Q48.4 34.4 45.6 36.2 Q38 30 32 19 Z" fill="#e2601f" stroke="none" />
      <path d="M30.5 12.4 L17 30.5" strokeWidth="4.6" />
      <path d="M33.5 12.4 L47 30.5" strokeWidth="4.6" />
      <circle cx="32" cy="38" r="7.4" />
      <path d="M23.4 61 Q23.4 52.6 32 52.6 Q40.6 52.6 40.6 61" />
      <path d="M25 54 L17.8 44.4" />
      <path d="M39 54 L46.2 44.4" />
      <path d="M10.4 34.6 Q8 38 10.4 41.4" stroke="#e2601f" />
      <path d="M6.8 32.6 Q3.4 38 6.8 43.4" stroke="#e2601f" />
      <path d="M53.6 34.6 Q56 38 53.6 41.4" stroke="#e2601f" />
      <path d="M57.2 32.6 Q60.6 38 57.2 43.4" stroke="#e2601f" />
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display uppercase tracking-[0.34em] ${className}`}>Libratory</span>
  );
}

export function Nav() {
  const link = "text-[0.95rem] text-ink-muted hover:text-brass transition-colors";

  return (
    <header className="sticky top-0 z-10 border-b border-edge bg-page/85 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-5xl items-center gap-6 px-6">
        <a href="/" className="flex items-center gap-3">
          <Mark className="size-7" />
          <Wordmark className="text-lg" />
        </a>
        <div className="ml-auto flex items-center gap-7">
          <a href="#features" className={link}>What it does</a>
          <a href="#tours" className={link}>Tours</a>
          <a href={REPO} className={link}>Source</a>
        </div>
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-edge">
      <div className="mx-auto flex max-w-5xl flex-col gap-5 px-6 py-12 text-[0.95rem] text-ink-faint sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <Mark className="size-6" />
          <Wordmark className="text-ink-muted" />
        </div>
        <div className="flex gap-7 sm:ml-auto">
          <a href={REPO} className="transition-colors hover:text-brass">Source</a>
          <a href={`${REPO}/releases`} className="transition-colors hover:text-brass">Releases</a>
          <a href={`${REPO}/blob/main/LICENSE.md`} className="transition-colors hover:text-brass">Licence</a>
        </div>
      </div>
    </footer>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-display text-sm uppercase tracking-[0.28em] text-brass">{children}</p>
  );
}

export function Section({ id, title, lead, children }: {
  id?: string;
  title: string;
  lead?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-5xl px-6 py-20">
      <div className="rule-double pt-10">
        <h2 className="text-3xl tracking-tight sm:text-4xl">{title}</h2>
        {lead ? <p className="mt-4 max-w-2xl text-lg text-ink-muted">{lead}</p> : null}
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}

export function Button({ href, children, variant = "primary" }: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
}) {
  const base = "inline-flex h-12 items-center justify-center rounded-sm px-7 text-[0.95rem] tracking-wide transition-colors";
  const styles = variant === "primary"
    ? "bg-ember text-[#16140f] hover:bg-ember-bright"
    : "border border-edge-strong text-ink-secondary hover:border-brass hover:text-brass";

  return <a href={href} className={`${base} ${styles}`}>{children}</a>;
}
