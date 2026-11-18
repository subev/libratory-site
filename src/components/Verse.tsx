import type { ReactNode } from "react";
import { PhoneFrame } from "./phone.tsx";

const WRAP = "mx-auto max-w-5xl px-6";

/** A 1170×2532 screen shown small in a phone frame */
function Phone({ src, alt }: { src: string; alt: string }) {
  return (
    <PhoneFrame width={236} height={474} radius={38} pad={9} screen="var(--bg-raised)" lift>
      <img src={src} alt={alt} width={1170} height={2532} loading="lazy" className="size-full object-cover" />
    </PhoneFrame>
  );
}

export type Scene = { title: string; body: string; note?: string; src: string; alt: string; /** A cut-out of a screen, shown larger and without the phone */ plain?: { width: number; height: number } };

/** Picture and text side by side, the picture changing sides from one scene to the next */
export function Scenes({ scenes }: { scenes: Scene[] }) {
  return (
    <section className={`${WRAP} py-14 sm:py-20`}>
      <div className="flex flex-col gap-16 sm:gap-24">
        {scenes.map((scene, index) => (
          <div key={scene.title} className={`mx-auto flex max-w-4xl flex-col items-center justify-center gap-8 sm:gap-16 ${index % 2 ? "sm:flex-row-reverse" : "sm:flex-row"}`}>
            {scene.plain ? (
              <img
                src={scene.src}
                alt={scene.alt}
                width={scene.plain.width}
                height={scene.plain.height}
                loading="lazy"
                className="w-full max-w-[400px] flex-none rounded-xl border border-edge shadow-[0_30px_80px_rgba(0,0,0,0.55)] sm:w-[400px]"
              />
            ) : (
              <div className="flex flex-none justify-center sm:w-[280px]"><Phone src={scene.src} alt={scene.alt} /></div>
            )}
            <div className="max-w-md text-center sm:text-left">
              <h2 className="text-[clamp(1.6rem,3.2vw,2.2rem)] text-balance">{scene.title}</h2>
              <p className="mt-3 text-lg text-ink-secondary">{scene.body}</p>
              {scene.note ? <p className="mt-3 text-[0.95rem] text-ink-faint">{scene.note}</p> : null}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export type Step = { title: string; body: string };

/** Numbered, top to bottom, in the order you would do it */
export function Steps({ steps }: { steps: Step[] }) {
  return (
    <section className={`${WRAP} py-12 sm:py-16`}>
      <ol className="mx-auto flex max-w-2xl flex-col gap-9">
        {steps.map((step, index) => (
          <li key={step.title} className="flex gap-5">
            <span className="font-display text-4xl leading-none text-brass tabular-nums">{index + 1}</span>
            <div>
              <h2 className="text-xl">{step.title}</h2>
              <p className="mt-1.5 text-ink-muted">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

/** Short blocks side by side, for a page whose text is a pair or a trio */
export function Columns({ columns }: { columns: Step[] }) {
  return (
    <section className={`${WRAP} py-12 sm:py-16`}>
      <div className={`grid gap-8 ${columns.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3"}`}>
        {columns.map((column) => (
          <div key={column.title} className="border-l border-edge pl-5">
            <h2 className="text-xl">{column.title}</h2>
            <p className="mt-2 text-ink-muted">{column.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/** Things someone says, set as speech */
export function Voices({ lines }: { lines: { say: string; then: string }[] }) {
  return (
    <section className={`${WRAP} py-12 sm:py-16`}>
      <div className="mx-auto flex max-w-2xl flex-col gap-8">
        {lines.map((line) => (
          <div key={line.say}>
            <p className="font-display text-[clamp(1.35rem,2.6vw,1.75rem)] text-balance text-ink">“{line.say}”</p>
            <p className="mt-2 text-ink-muted">{line.then}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/** The limits, said plainly */
export function Honest({ title = "What it can't do", children }: { title?: string; children: ReactNode }) {
  return (
    <section className={`${WRAP} pb-12 sm:pb-16`}>
      <div className="mx-auto max-w-2xl rounded-xl border border-edge bg-inset px-6 py-5">
        <h2 className="font-display text-sm uppercase tracking-[0.22em] text-brass">{title}</h2>
        <p className="mt-2 text-ink-secondary">{children}</p>
      </div>
    </section>
  );
}

export type Door = { verse: string; label: string; href: string };

/** One line per use, each leading to its page */
export function Doors({ doors }: { doors: Door[] }) {
  return (
    <section className="border-t border-edge">
      <div className={`${WRAP} py-14 sm:py-20`}>
        <ul className="mx-auto flex max-w-3xl flex-col">
          {doors.map((door) => (
            <li key={door.href} className="border-b border-edge first:border-t">
              <a href={door.href} className="group flex flex-col gap-1 py-5 transition-colors sm:flex-row sm:items-baseline sm:gap-6">
                <span className="font-display text-[clamp(1.2rem,2.3vw,1.5rem)] text-balance text-ink group-hover:text-brass">{door.verse}</span>
                <span className="flex-none text-sm uppercase tracking-[0.18em] text-ink-faint group-hover:text-brass sm:ml-auto">{door.label} →</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** The reassurance, small and last */
export function Small({ children }: { children: ReactNode }) {
  return (
    <section className={`${WRAP} pb-14 sm:pb-20`}>
      <p className="mx-auto max-w-2xl text-center text-[0.95rem] text-balance text-ink-faint">{children}</p>
    </section>
  );
}

/** A few short lines set large, one under the other */
export function Lines({ lines }: { lines: string[] }) {
  return (
    <section className="border-t border-edge">
      <div className={`${WRAP} py-12 sm:py-16`}>
        <ul className="mx-auto flex max-w-2xl flex-col gap-3 text-center">
          {lines.map((line) => (
            <li key={line} className="font-display text-[clamp(1.25rem,2.4vw,1.6rem)] text-balance text-ink-secondary">{line}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export type Said = { label: string; text: string };

/** The same passage twice, as printed and as the app explained it */
export function Explained({ title, printed, explained, more, note }: { title: string; printed: Said; explained: Said; more?: Said; note: string }) {
  return (
    <section className="border-t border-edge">
      <div className={`${WRAP} py-12 sm:py-16`}>
        <h2 className="mx-auto max-w-2xl text-center text-[clamp(1.5rem,3vw,2rem)] text-balance">{title}</h2>
        <div className={`mt-9 grid gap-6 ${more ? "lg:grid-cols-3" : "md:grid-cols-2"}`}>
          {[printed, explained, ...(more ? [more] : [])].map((said, index) => (
            <figure key={said.label} className={`flex flex-col rounded-xl border p-6 ${index > 0 ? "border-brass bg-raised" : "border-edge"}`}>
              <figcaption className="text-sm font-semibold tracking-wide text-brass uppercase">{said.label}</figcaption>
              <blockquote className={`mt-3 grow ${index > 0 ? (more ? "text-ink" : "text-lg text-ink") : "text-[0.95rem] text-ink-muted"}`}>{said.text}</blockquote>
            </figure>
          ))}
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-[0.95rem] text-balance text-ink-faint">{note}</p>
      </div>
    </section>
  );
}
