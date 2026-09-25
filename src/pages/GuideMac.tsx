import { BREW, Button, DOWNLOAD, Eyebrow, Footer, Nav, REPO, Section } from "../components/Chrome.tsx";

const NAV = [
  { href: "/#features", label: "Desktop app", wide: true },
  { href: "/reader/", label: "iPhone" },
  { href: "/#download", label: "Download" },
];

const FOOT = [
  { href: "/", label: "Desktop app" },
  { href: "/compare/", label: "Compare" },
  { href: REPO, label: "GitHub" },
];

const STEPS: { title: string; body: string; image?: { src: string; alt: string } }[] = [
  {
    title: "Install it",
    body: "Download the app, or run the Homebrew line below. It needs Docker for its database: Docker Desktop or OrbStack, whichever you like. The first launch downloads about 2.4 GB of voices and tools, once. After that it opens in seconds.",
  },
  {
    title: "Add the PDF",
    body: "Drop the file on the library. The words are out in seconds, so you can search and ask questions right away. A scanned book takes one extra tick, and the pages are read on your Mac.",
    image: { src: "/guide/library.png", alt: "The library: a folder of classics, a book with 14 chapters narrated, its outputs and size" },
  },
  {
    title: "Check the chapters",
    body: "Libratory finds the chapters from the headings and the table of contents. Look them over. Move a boundary, merge two, or leave out the index and the adverts at the back.",
    image: { src: "/guide/chapters.png", alt: "A book's chapters with page ranges, word counts, durations and status" },
  },
  {
    title: "Pick a voice",
    body: "Kokoro is the clearest English voice and runs on the Mac's own chip. Pocket TTS can copy your voice from a 20-second recording. Every voice already on your Mac works too. Press play on any of them before you choose.",
    image: { src: "/guide/voice-cloning.png", alt: "The voice picker's Your voices tab, with cloned voices above the recording controls" },
  },
  {
    title: "Listen, or take it with you",
    body: "Read along as the words light up on the page. Save an M4B with chapters for any audiobook player, or a synced EPUB for the free iPhone Reader, which keeps the highlights.",
    image: { src: "/guide/read-along.gif", alt: "The narration following the printed page: the spoken sentence lit, the spoken word marked inside it" },
  },
];

const ANSWERS = [
  { q: "Is it really free?", a: "Yes. No tiers, no account, nothing to unlock. The voices that run on your Mac cost nothing. Cloud voices are optional and use your own key." },
  { q: "Does it work offline?", a: "After the first download, yes. Your books and your audio never leave the Mac unless you add a cloud key yourself." },
  { q: "Which Macs?", a: "Apple Silicon: any M1 or later. Intel Macs are not supported." },
  { q: "How long does a book take?", a: "Kokoro narrates a few times faster than you can listen. A ten-hour book is done in a few hours, and you can start listening to the first chapter while the rest is made." },
  { q: "Windows or Linux?", a: "Linux runs it from source or in Docker. Windows runs the same Docker image through Docker Desktop." },
];

export function GuideMac() {
  return (
    <>
      <Nav links={NAV} source />
      <main>
        <section className="lamplight border-b border-edge">
          <div className="mx-auto max-w-5xl px-6 pt-16 pb-16 sm:pt-20 sm:pb-20">
            <Eyebrow>Mac guide</Eyebrow>
            <h1 className="mt-5 max-w-3xl text-[clamp(2.125rem,4.6vw,3.25rem)] font-semibold tracking-tight">
              Turn a PDF into an audiobook on a Mac. For free.
            </h1>
            <p className="mt-6 max-w-[38rem] text-lg text-ink-secondary">
              Five steps, with voices that run on the Mac itself. At the end you have an audiobook with chapters, and a book that reads itself to you on the page.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href={DOWNLOAD}>Download for Mac</Button>
              <Button href="/#listen" variant="ghost">Hear a sample</Button>
            </div>
            <p className="mt-5 text-sm text-ink-muted">
              or <code className="rounded-sm border border-edge bg-inset px-2 py-1 text-ink-secondary">{BREW}</code>
            </p>
          </div>
        </section>

        <Section title="The five steps">
          <ol className="grid gap-12">
            {STEPS.map((step, i) => (
              <li key={step.title} className="grid gap-6 sm:grid-cols-[1fr_1.4fr] sm:items-start">
                <div>
                  <p className="font-display text-sm uppercase tracking-[0.28em] text-brass">Step {i + 1}</p>
                  <h3 className="mt-3 text-2xl font-semibold text-ink">{step.title}</h3>
                  <p className="mt-3 text-ink-secondary">{step.body}</p>
                </div>
                {step.image ? (
                  <img src={step.image.src} alt={step.image.alt} loading="lazy" className="w-full rounded-sm border border-edge" />
                ) : null}
              </li>
            ))}
          </ol>
        </Section>

        <Section title="Before you download" lead="The questions people ask first.">
          <dl className="grid gap-6 sm:grid-cols-2">
            {ANSWERS.map((item) => (
              <div key={item.q} className="rounded-sm border border-edge bg-raised p-6">
                <dt className="text-lg font-semibold text-ink">{item.q}</dt>
                <dd className="mt-3 text-ink-secondary">{item.a}</dd>
              </div>
            ))}
          </dl>
        </Section>
      </main>
      <Footer links={FOOT} />
    </>
  );
}
