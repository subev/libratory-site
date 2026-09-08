import { BetaCta, Eyebrow, Footer, Nav, REPO, Section } from "../components/Chrome.tsx";
import { ReadAlongPhone } from "../components/phone.tsx";
import { M4bPhone, MarksPhone, PlainEpubPhone } from "../components/ReaderScreens.tsx";

const NAV = [
  { href: "/#features", label: "Desktop app", wide: true },
  { href: "/reader/", label: "iPhone", current: true },
  { href: "#beta", label: "Get the app" },
];

const FOOT = [
  { href: "/", label: "Desktop app" },
  { href: REPO, label: "GitHub" },
  { href: "/reader/privacy/", label: "Privacy" },
];

const STEPS = [
  { title: "Make your audiobook", body: "In the desktop app, save a synced EPUB. It holds the book, the audio, and the word highlights in one file." },
  { title: "Send it to your iPhone", body: "Use AirDrop or the Files app. Open Reader and tap + to add the book." },
  { title: "Read and listen", body: "Press play. Your book works offline and remembers your place." },
];

const VIEWS = [
  { title: "Column", body: "Make the printed words fill your screen." },
  { title: "Page", body: "See the whole page, including pictures and tables." },
  { title: "Text", body: "Choose a text size that feels right for you." },
];

const KINDS = [
  { title: "Read and listen", body: "Open a synced EPUB from Libratory. Follow the highlights or double-tap a sentence to hear it." },
  { title: "Just read", body: "Bring an EPUB ebook you already own. Change the text size and save your favourite lines." },
  { title: "Just listen", body: "Open an M4B audiobook. Pick a chapter, change the speed, or listen with the screen locked." },
];

export function Reader() {
  return (
    <>
      <Nav links={NAV} />
      <main>
        <section className="lamplight-hero border-b border-edge">
          <div className="mx-auto grid max-w-5xl items-center gap-14 px-6 pt-16 pb-20 [grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr))]">
            <div className="min-w-0">
              <Eyebrow>Libratory Reader · iPhone</Eyebrow>
              <h1 className="mt-5 text-[clamp(2.125rem,4.6vw,3.25rem)] font-semibold tracking-tight">
                Take your books with you.
              </h1>
              <p className="mt-6 max-w-[34rem] text-lg text-ink-secondary">
                Listen on your iPhone. Watch each word light up as it is read.
                Double-tap a sentence to hear it again.
              </p>
              <p className="mt-4 text-ink-muted">Works offline. No account. Free.</p>
              <BetaCta href="/#download" label="Get the desktop app" note="Currently in beta" />
            </div>
            <ReadAlongPhone />
          </div>
        </section>

        <Section title="Your book, on your phone" lead="Make a book on your computer. Bring it with you.">
          <ol className="grid gap-8 sm:grid-cols-3">
            {STEPS.map((step, i) => (
              <li key={step.title} className="border-l border-edge pl-5">
                <h3 className="text-xl"><span className="text-brass">{i + 1}.</span> {step.title}</h3>
                <p className="mt-2 text-ink-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </Section>

        <Section title="Read. Listen. Or both." lead="Bring your own ebooks and audiobooks, too.">
          <div className="grid gap-8 sm:grid-cols-3">
            {KINDS.map((kind) => (
              <div key={kind.title} className="border-l border-edge pl-5">
                <h3 className="text-xl">{kind.title}</h3>
                <p className="mt-2 text-ink-muted">{kind.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 grid items-start gap-12 [grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr))]">
            <PlainEpubPhone />
            <M4bPhone />
          </div>
          <details className="mt-8">
            <summary className="cursor-pointer text-brass hover:text-ember-bright">Three ways to view your book</summary>
            <p className="mt-4 text-ink-muted">Books made with Libratory offer all three. Ordinary ebooks use Text.</p>
            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              {VIEWS.map((view) => (
                <div key={view.title}>
                  <h3 className="text-xl">{view.title}</h3>
                  <p className="mt-2 text-ink-muted">{view.body}</p>
                </div>
              ))}
            </div>
          </details>
        </Section>

        <Section title="Pick up where you left off" lead="Reader remembers your place and shows which parts you have heard.">
          <div className="grid gap-8 sm:grid-cols-3">
            <div><h3 className="text-xl">See what you skipped</h3><p className="mt-2 text-ink-muted">Skipped parts stay marked, so you can come back to them.</p></div>
            <div><h3 className="text-xl">Save a word or a quote</h3><p className="mt-2 text-ink-muted">Select it, save it, and put it in a group you name.</p></div>
            <div><h3 className="text-xl">Find it again</h3><p className="mt-2 text-ink-muted">Search the book and your saved words. Jump back to read or listen.</p></div>
          </div>
          <div className="mt-12"><MarksPhone /></div>
        </Section>

        <section id="beta" className="lamplight-beta border-y border-t-edge-strong border-b-edge bg-raised">
          <div className="mx-auto max-w-5xl px-6 py-20">
            <Eyebrow>Free on iPhone</Eyebrow>
            <h2 className="mt-5 text-3xl tracking-tight sm:text-4xl">Your first book is already there.</h2>
            <p className="mt-5 max-w-2xl text-lg text-ink-secondary">
              Reader comes with a short sample book. Open it and press play.
            </p>
            <p className="mt-4 max-w-2xl text-ink-muted">The app is still being tested. Try your own book and tell us how it goes.</p>
            <BetaCta href="/#download" label="Get the desktop app" note="Beta versions last 90 days; update in TestFlight" />
          </div>
        </section>
      </main>
      <Footer links={FOOT} />
    </>
  );
}
