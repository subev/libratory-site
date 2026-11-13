import { APP_STORE, Button, Footer, Nav, type Link } from "./Chrome.tsx";
import { HeroMedia } from "./Media.tsx";

export type Proof = { title: string; body: string };

// Phone: one column in reading order. Desktop: the text beside the demo, vertically centred.
const AREAS = "[grid-template-areas:'h'_'s'_'d'_'b'_'f'] lg:[grid-template-areas:'._d'_'h_d'_'s_d'_'b_d'_'f_d'_'._d'] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:grid-rows-[1fr_auto_auto_auto_auto_1fr]";

function Hero({ headline, line, free, demo }: { headline: string; line: string; free: string; demo: string }) {
  return (
    <section className="lamplight-hero border-b border-edge">
      <div className={`mx-auto grid max-w-5xl gap-x-14 px-6 pt-8 pb-14 text-center sm:pt-14 sm:pb-20 lg:text-left ${AREAS}`}>
        <h1 className="text-[clamp(2.125rem,4.6vw,3.25rem)] font-semibold tracking-tight [grid-area:h]">{headline}</h1>
        <p className="mt-4 text-lg text-ink-secondary [grid-area:s] sm:mt-5">{line}</p>
        <div className="mt-6 flex justify-center [grid-area:d] sm:mt-8 lg:mt-0"><HeroMedia name={demo} /></div>
        <div className="mt-6 [grid-area:b] sm:mt-8"><Button href={APP_STORE}>Download on the App Store</Button></div>
        <p className="mt-4 text-ink-muted [grid-area:f]">{free}</p>
      </div>
    </section>
  );
}

function Proofs({ proofs }: { proofs: Proof[] }) {
  return (
    <section className="mx-auto max-w-5xl px-6 py-12 sm:py-16">
      <div className="grid gap-8 sm:grid-cols-3">
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

/** The home page and the use-case pages: one promise, one demo, one button, the free line, three proofs */
export function Landing({ headline, line, free, demo, proofs, footer }: {
  headline: string;
  line: string;
  free: string;
  demo: string;
  proofs: Proof[];
  footer: Link[];
}) {
  return (
    <>
      <Nav links={[]} />
      <main>
        <Hero headline={headline} line={line} free={free} demo={demo} />
        <Proofs proofs={proofs} />
      </main>
      <Footer links={footer} />
    </>
  );
}
