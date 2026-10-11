import { APP_STORE, Button, Eyebrow, Footer, Nav, REPO, Section, StoreCta } from "../components/Chrome.tsx";
import { SentencePairs } from "../components/SentencePairs.tsx";
import { ListeningPhone, TwoLanguages } from "../components/TwoLanguages.tsx";

const NAV = [
  { href: "#try", label: "Try it" },
  { href: "/reader/", label: "iPhone", wide: true },
  { href: "#start", label: "Get a book" },
];

const FOOT = [
  { href: "/", label: "Desktop app" },
  { href: "/reader/", label: "iPhone" },
  { href: REPO, label: "GitHub" },
  { href: "/reader/privacy/", label: "Privacy" },
];

const WORDS = [
  { title: "See what it means", body: "Pause and tap a word. Its twin in the other language is underlined, and a tip says what it means." },
  { title: "Hear just that word", body: "Tap the tip to hear the word on its own, as many times as you like." },
  { title: "Keep it", body: "Hold a word to save it. Put it in a group, add a note, and find it again in Marks." },
];

const SHELF = [
  { book: "Frankenstein", pair: "English and Bulgarian" },
  { book: "Alice's Adventures in Wonderland", pair: "English and French" },
  { book: "A Christmas Carol", pair: "English and Spanish" },
  { book: "Dr Jekyll and Mr Hyde", pair: "English and Italian" },
];

const OWN = [
  { title: "Add a book you own", body: "A PDF or a DRM-free EPUB, in the Libratory desktop app." },
  { title: "Translate it", body: "Chapter by chapter, with a model on your computer or an online one with your own key. The original stays." },
  { title: "Give each language a voice", body: "Then send the book to your phone. Scan the code on the app's Phone page, or use AirDrop or Files." },
];

const QUESTIONS = [
  {
    q: "Is it free?",
    a: "Yes. Reader is free on the App Store, and the desktop app is free for personal use. Online models and voices are optional, and their providers charge for them.",
  },
  {
    q: "Which languages can I learn?",
    a: "Any pair the translation model knows. Free voices on your computer read English, German, Spanish, French, Italian, Portuguese, Hindi, Mandarin and Bulgarian, among others. Other languages can use an online voice.",
  },
  {
    q: "Is the translation made by AI?",
    a: "Yes. A language model you choose translates each chapter. It reads well, but it can be wrong, so the original is always beside it.",
  },
  {
    q: "Do I need the internet?",
    a: "Only to get a book. Reading and listening work offline, with no account.",
  },
  {
    q: "Is there an Android app?",
    a: "Not yet. Reader is for iPhone and iPad. The desktop app runs on Mac, Linux and Windows.",
  },
];

export function Learn() {
  return (
    <>
      <Nav links={NAV} />
      <main>
        <section className="lamplight-hero border-b border-edge">
          <div className="mx-auto grid max-w-5xl items-center gap-14 px-6 pt-16 pb-20 [grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr))]">
            <div className="min-w-0">
              <Eyebrow>For language learners</Eyebrow>
              <h1 className="mt-5 text-[clamp(2.125rem,4.6vw,3.25rem)] font-semibold tracking-tight">
                Learn a language with a book you love.
              </h1>
              <p className="mt-6 max-w-[34rem] text-lg text-ink-secondary">
                Read a book and its translation on one screen, each with its own voice. Hear a sentence
                in the language you are learning, as slowly and as often as you need. Then hear it in yours.
              </p>
              <p className="mt-4 text-ink-muted">Free on iPhone and iPad. Works offline. No account.</p>
              <StoreCta href="#try" label="Try it here" />
            </div>
            <ListeningPhone />
          </div>
        </section>

        <Section id="try" title="Tap a word. Hear it in both." lead="This is the reader, running in your browser. Tap a word on either side and see its twin.">
          <TwoLanguages />
        </Section>

        <Section
          id="pairs"
          title="One sentence at a time"
          lead="Sentence pairs reads each sentence, then its translation. Give each language its own speed, hear it up to five times, and leave a pause to say it back."
          sub="Set it up the way you would in the app, then press play."
        >
          <SentencePairs />
        </Section>

        <Section title="Words you want to keep" lead="Every word in the book is linked to its twin in the translation.">
          <div className="grid gap-8 sm:grid-cols-3">
            {WORDS.map((item) => (
              <div key={item.title} className="border-l border-edge pl-5">
                <h3 className="text-xl">{item.title}</h3>
                <p className="mt-2 text-ink-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="start" title="Start reading tonight" lead="Pick a free classic, or make a two-language edition of a book you own.">
          <div className="grid gap-8 [grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr))]">
            <div className="rounded-lg border border-edge bg-raised p-6 sm:p-8">
              <h3 className="text-2xl">A free classic, nothing to set up</h3>
              <p className="mt-3 text-ink-muted">Reader has a public shelf of narrated classics. These come in two languages, read aloud in both:</p>
              <ul className="mt-5 grid gap-3">
                {SHELF.map((item) => (
                  <li key={item.book} className="flex flex-wrap items-baseline justify-between gap-x-4 border-t border-edge pt-3">
                    <span className="font-display text-lg">{item.book}</span>
                    <span className="text-[0.95rem] text-ink-muted">{item.pair}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-7"><Button href={APP_STORE}>Get Reader free</Button></div>
            </div>
            <div className="rounded-lg border border-edge p-6 sm:p-8">
              <h3 className="text-2xl">Or any book you own</h3>
              <ol className="mt-5 grid gap-5">
                {OWN.map((step, i) => (
                  <li key={step.title}>
                    <span className="block font-display text-lg"><span className="text-brass">{i + 1}.</span> {step.title}</span>
                    <span className="mt-1 block text-ink-muted">{step.body}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-7"><Button href="/#download" variant="ghost">Get the desktop app</Button></div>
            </div>
          </div>
        </Section>

        <Section id="speaking" title="Next: say it back, and hear how it went" lead="The pause after a sentence already gives you time to say it aloud. Speaking practice will listen and tell you how close you came.">
          <p className="max-w-2xl text-ink-muted">
            It is not built yet. If you want it, open the listening options in a two-language book and tap{" "}
            <span className="text-ink-secondary">Speaking practice (Beta)</span>. Tell us which language you are practising.
          </p>
        </Section>

        <Section title="Questions">
          <div className="grid max-w-3xl gap-2">
            {QUESTIONS.map((item) => (
              <details key={item.q} className="group border-t border-edge py-4">
                <summary className="cursor-pointer font-display text-xl marker:text-brass">{item.q}</summary>
                <p className="mt-3 text-ink-muted">{item.a}</p>
              </details>
            ))}
          </div>
        </Section>

        <section className="lamplight-get border-y border-t-edge-strong border-b-edge bg-raised">
          <div className="mx-auto max-w-5xl px-6 py-20">
            <Eyebrow>Free on iPhone and iPad</Eyebrow>
            <h2 className="mt-5 text-3xl tracking-tight sm:text-4xl">Your next book, in two languages.</h2>
            <p className="mt-5 max-w-2xl text-lg text-ink-secondary">
              Get Reader, open the public shelf, and start with a classic. Make your own with the desktop app.
            </p>
            <StoreCta href="/#download" label="Get the desktop app" />
          </div>
        </section>
      </main>
      <Footer links={FOOT} />
    </>
  );
}
