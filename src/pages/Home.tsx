import { APP_STORE, Button, Footer, Nav, REPO } from "../components/Chrome.tsx";
import { HeroMedia } from "../components/Media.tsx";

// Old links ending in /#download mean the Mac tool, so the id sits on the link that leads to it
const FOOT = [
  { href: "/mac/", label: "For your Mac", id: "download" },
  { href: "/reader/privacy/", label: "Privacy" },
  { href: `${REPO}/issues`, label: "Support" },
];

const PROOFS = [
  { title: "The page stays.", body: "The page you photographed is on the screen, and the sentence you are hearing is marked on it." },
  { title: "Listen anywhere.", body: "It reads with the screen locked, at your speed, and remembers where you stopped." },
  { title: "It stays on your phone.", body: "The photos are read on the iPhone and are not uploaded." },
];

function Hero() {
  return (
    <section className="lamplight border-b border-edge">
      <div className="mx-auto flex max-w-5xl flex-col items-center px-6 pt-8 pb-14 text-center sm:pt-14 sm:pb-20">
        <h1 className="max-w-3xl text-[clamp(2.125rem,5vw,3.5rem)] font-semibold tracking-tight">
          Point your iPhone at a page. It reads it to you.
        </h1>
        <p className="mt-4 max-w-xl text-lg text-ink-secondary sm:mt-5">
          A chapter of a book you own, a letter, a contract, a PDF.
        </p>
        <div className="mt-6 flex w-full justify-center sm:mt-8"><HeroMedia /></div>
        <div className="mt-6 sm:mt-8"><Button href={APP_STORE}>Download on the App Store</Button></div>
        <p className="mt-4 text-ink-muted">Free. No account. Works without internet.</p>
      </div>
    </section>
  );
}

function Proofs() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-12 sm:py-16">
      <div className="grid gap-8 sm:grid-cols-3">
        {PROOFS.map((proof) => (
          <div key={proof.title} className="border-l border-edge pl-5">
            <h2 className="text-xl">{proof.title}</h2>
            <p className="mt-2 text-ink-muted">{proof.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Home() {
  return (
    <>
      <Nav links={[]} />
      <main>
        <Hero />
        <Proofs />
      </main>
      <Footer links={FOOT} />
    </>
  );
}
