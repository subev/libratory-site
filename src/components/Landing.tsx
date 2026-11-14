import { APP_STORE, Button, Footer, Nav, type Link } from "./Chrome.tsx";
import type { ReactNode } from "react";
import { HeroMedia, type Capture } from "./Media.tsx";

export type Proof = { title: string; body: string };

// Phone: the free line sits above the demo so it is on the first screen. Desktop: the text beside the demo.
const AREAS = "[grid-template-areas:'h'_'s'_'f'_'d'_'b'_'n'] lg:[grid-template-areas:'._d'_'h_d'_'s_d'_'b_d'_'f_d'_'n_d'_'._d'] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:grid-rows-[1fr_auto_auto_auto_auto_auto_1fr]";

function Hero({ headline, line, free, note, demo, capture, long }: {
  long?: boolean;
  headline: string;
  line: string;
  free: string;
  note?: Proof;
  demo: string;
  capture?: Capture;
}) {
  return (
    <section className="lamplight-hero border-b border-edge">
      <div className={`mx-auto grid max-w-5xl gap-x-14 px-6 pt-6 pb-14 text-center sm:pt-14 sm:pb-20 lg:text-left ${AREAS}`}>
        <h1 className={`${long ? "text-[clamp(1.7rem,3.5vw,2.5rem)]" : "text-[clamp(2rem,4.6vw,3.25rem)]"} font-semibold tracking-tight text-balance [grid-area:h]`}>{headline}</h1>
        <p className="mt-3 text-lg text-balance text-ink-secondary [grid-area:s] sm:mt-5">{line}</p>
        <div className="mt-5 flex justify-center [grid-area:d] sm:mt-8 lg:mt-0"><HeroMedia name={demo} capture={capture} /></div>
        <div className="mt-5 [grid-area:b] sm:mt-8"><Button href={APP_STORE}>Download on the App Store</Button></div>
        <p className="mt-3 text-balance text-ink-muted [grid-area:f] lg:mt-4">{free}</p>
        {note ? (
          <p className="mt-6 text-[0.95rem] text-ink-faint [grid-area:n] lg:mt-3">
            <span className="font-semibold text-ink-muted">{note.title}</span> {note.body}
          </p>
        ) : null}
      </div>
    </section>
  );
}

function Proofs({ proofs }: { proofs: Proof[] }) {
  return (
    <section className="mx-auto max-w-5xl px-6 py-12 sm:py-16">
      <div className={`grid gap-8 ${proofs.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3"}`}>
        {proofs.map((proof) => (
          <div key={proof.title} className="border-l border-edge pl-5">
            <h2 className="text-xl">{proof.title}</h2>
            <p className="mt-2 text-ink-muted">{proof.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/** The home page and the use-case pages: one line that starts an argument, one picture, one button, then each page's own sections */
export function Landing({ headline, line, free, note, demo, capture, proofs, footer, long, children }: {
  /** A headline of several sentences is set smaller */
  long?: boolean;
  children?: ReactNode;
  headline: string;
  line: string;
  free: string;
  note?: Proof;
  demo: string;
  capture?: Capture;
  proofs?: Proof[];
  footer: Link[];
}) {
  return (
    <>
      <Nav links={[]} />
      <main>
        <Hero headline={headline} line={line} free={free} note={note} demo={demo} capture={capture} long={long} />
        {proofs ? <Proofs proofs={proofs} /> : null}
        {children}
      </main>
      <Footer links={footer} />
    </>
  );
}
