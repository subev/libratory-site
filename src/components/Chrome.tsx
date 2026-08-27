import type { ReactNode } from "react";

export const REPO = "https://github.com/subev/libratory";
export const DOWNLOAD = `${REPO}/releases/latest`;

export function Mark({ className = "size-8" }: { className?: string }) {
  return (
    <svg viewBox="0 2 64 64" className={className} fill="none" stroke="#fffdf9" strokeWidth="2.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M30.5 15.4 L19 30.82" stroke="#e2601f" strokeWidth="1.2" />
      <path d="M30.5 18 L20 32.08" stroke="#e2601f" strokeWidth="1.2" />
      <path d="M30.5 20.6 L21 33.34" stroke="#e2601f" strokeWidth="1.2" />
      <path d="M33.5 15.4 L45 30.82" stroke="#e2601f" strokeWidth="1.2" />
      <path d="M33.5 18 L44 32.08" stroke="#e2601f" strokeWidth="1.2" />
      <path d="M33.5 20.6 L43 33.34" stroke="#e2601f" strokeWidth="1.2" />
      <path d="M30.5 12.4 L17 30.5" strokeWidth="4" />
      <path d="M33.5 12.4 L47 30.5" strokeWidth="4" />
      <circle cx="32" cy="38" r="7.4" />
      <path d="M23.4 61 Q23.4 52.6 32 52.6 Q40.6 52.6 40.6 61" />
      <path d="M25 54 L17.8 44.4" />
      <path d="M39 54 L46.2 44.4" />
      <path d="M14 36.6 Q12 38 14 39.4" stroke="#e2601f" />
      <path d="M50 36.6 Q52 38 50 39.4" stroke="#e2601f" />
      <path d="M10.4 34.6 Q8 38 10.4 41.4" stroke="#e2601f" />
      <path d="M53.6 34.6 Q56 38 53.6 41.4" stroke="#e2601f" />
      <path d="M6.8 32.6 Q3.4 38 6.8 43.4" stroke="#e2601f" />
      <path d="M57.2 32.6 Q60.6 38 57.2 43.4" stroke="#e2601f" />
    </svg>
  );
}

export function GitHubIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.42 7.42 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-wordmark font-medium uppercase tracking-[0.34em] ${className}`}>Libratory</span>
  );
}

export function Nav() {
  const link = "text-[0.95rem] text-ink-muted hover:text-brass transition-colors";

  return (
    <header className="sticky top-0 z-20 border-b border-edge bg-page">
      <nav className="mx-auto flex h-16 max-w-5xl items-center gap-6 px-6">
        <a href="/" className="flex items-center gap-3">
          <Mark className="size-7" />
          <Wordmark className="text-lg" />
        </a>
        <div className="ml-auto flex items-center gap-7">
          <a href="#features" className={link}>What it does</a>
          <a href="#tours" className={link}>Tours</a>
          <a href="#download" className={link}>Get it</a>
          <a href={REPO} className={link} aria-label="Source on GitHub" title="Source on GitHub">
            <GitHubIcon />
          </a>
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
          <a href={REPO} className="inline-flex items-center gap-2 transition-colors hover:text-brass">
            <GitHubIcon className="size-4" />
            Source
          </a>
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
