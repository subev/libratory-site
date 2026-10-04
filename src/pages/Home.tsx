import { BREW, Button, DownloadButton, Eyebrow, Footer, Mark, Nav, REPO, Section, Wordmark } from "../components/Chrome.tsx";
import { Download } from "../components/Download.tsx";
import { Library } from "../components/Library.tsx";
import { LibraryChat } from "../components/LibraryChat.tsx";
import { Pipeline } from "../components/Pipeline.tsx";
import { ReadAlong } from "../components/ReadAlong.tsx";
import { ReaderApp } from "../components/ReaderApp.tsx";
import { Transform } from "../components/Transform.tsx";

const FEATURES = [
  { title: "Listen to your books", body: "Turn a PDF into an audiobook. Listen while you walk, cook, or rest." },
  { title: "Read and listen together", body: "Follow the words as they light up on the page." },
  { title: "Read in two languages", body: "Translate a book and hear it in both. Or ask for simpler words or a short summary." },
  { title: "An assistant on every page", body: "Ask about your books and see the pages behind the answer. Or ask it to do the work." },
  { title: "Find what you need", body: "Search all your books at once. Keep them tidy in folders." },
  { title: "Keep your books private", body: "Use voices and AI on your computer, so your books stay with you." },
];

const STEPS = [
  { title: "Get the words out", body: "Add a PDF, even a scanned book. For a hard scan, an AI model can read the pages. You get a searchable PDF back, too." },
  { title: "Sort out the chapters", body: "It finds the chapters and puts them in order. You can check and change them." },
  { title: "Pick a voice and listen", body: "Save an audiobook with chapters you can skip to." },
];

const NAV = [
  { href: "#features", label: "What you get", wide: true },
  { href: "/reader/", label: "iPhone" },
  { href: "#download", label: "Download" },
];

const FOOT = [
  { href: REPO, label: "GitHub" },
  { href: `${REPO}/releases`, label: "Updates" },
  { href: "/reader/", label: "iPhone app" },
  { href: `${REPO}/blob/main/LICENSE.md`, label: "Licence" },
];

export function Home() {
  return (
    <>
      <Nav links={NAV} source />
      <main>
        <section className="lamplight border-b border-edge">
          <div className="mx-auto max-w-5xl px-6 pt-16 pb-20 text-center sm:pt-20 sm:pb-24">
            <Mark className="mx-auto size-14" />
            <Wordmark className="mt-6 block text-2xl text-ink sm:text-3xl" />
            <a
              href="/reader/#two-languages"
              className="group mt-7 inline-flex min-h-9 items-center gap-2.5 rounded-full border border-brass/35 bg-brass/4 py-1 pr-3.5 pl-1 text-[0.95rem] text-ink-secondary transition-colors hover:border-brass/60 hover:bg-brass/8"
            >
              <span className="rounded-full bg-brass px-2 py-0.5 font-sans text-[11px] font-semibold tracking-[0.06em] text-[#1a1408] uppercase">New</span>
              Read a book in two languages on your iPhone
              <span className="text-brass">→</span>
            </a>
            <h1 className="mx-auto mt-7 max-w-3xl text-4xl tracking-tight sm:text-6xl">
              Turn your books into audiobooks. For free.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-ink-secondary">
              Add a PDF. Pick a voice. Listen and follow the words on the page.
              Translate a book and hear it in both languages, too.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <DownloadButton />
              <Button href="#listen" variant="ghost">Hear a sample</Button>
            </div>
            <p data-platform="mac" className="mt-5 items-baseline gap-2 text-sm text-ink-muted">
              or <code className="rounded-sm border border-edge bg-inset px-2 py-1 text-ink-secondary">{BREW}</code>
            </p>
            <p className="mt-5 text-[0.95rem] text-ink-muted">
              Free for personal use · Mac, <a href="#download" className="text-brass hover:text-ember-bright">Linux and Windows</a>
            </p>
          </div>
        </section>

        <Section id="features" title="All of this. Free." lead="Use the books you already have. The voices and AI can run on your own computer.">
          <div className="grid gap-x-12 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <div key={feature.title} className="border-l border-edge pl-5">
                <h3 className="text-xl">{feature.title}</h3>
                <p className="mt-2 text-ink-muted">{feature.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-ink-muted">Online AI and voice services are optional and may charge fees.</p>
        </Section>

        <Section id="listen" title="Hear it. Follow every word." lead="Turn the sound on to try it. The words light up as the voice reads.">
          <ReadAlong />
        </Section>

        <Section title="From PDF to play" lead="No copying text page by page. No splitting chapters by hand. Libratory does that work for you.">
          <ol className="grid gap-8 sm:grid-cols-3">
            {STEPS.map((step, i) => (
              <li key={step.title} className="border-l border-edge pl-5">
                <h3 className="text-xl"><span className="text-brass">{i + 1}.</span> {step.title}</h3>
                <p className="mt-2 text-ink-muted">{step.body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10"><Pipeline /></div>
        </Section>

        <Section id="translate" title="Translate a book. Read it in both languages." lead="Pick a language and Libratory translates the book, chapter by chapter. The original stays. The translation gets its own voice. Then read both on your iPhone.">
          <Transform />
        </Section>

        <Section id="assistant" title="An assistant beside every page." lead="Ask about your books and see the passages behind each answer. Or ask it to make a book, translate one, or tidy your library.">
          <LibraryChat />
        </Section>

        <Section title="All your books. Easy to find." lead="Keep books in folders, search them together, or make one audio summary from several books.">
          <Library />
        </Section>

        <ReaderApp />

        <Section id="agents" title="Let your AI agent run it." lead="Libratory is an MCP server, so Claude Code, Cursor, Codex or Claude Desktop can use your library. Hand it a PDF and get an audiobook back.">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:items-start">
            <div className="min-w-0 overflow-hidden rounded-xl border border-edge bg-raised font-mono text-[13px]/[1.7] shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
              <div className="overflow-x-auto px-5 py-4 whitespace-nowrap">
                <span className="text-ink-faint">$ </span>
                <span className="text-ink">claude mcp add --transport http libratory http://localhost:3034/mcp</span>
              </div>
              <div className="border-t border-edge px-5 py-4 text-ink-secondary">
                <span className="text-brass">›</span> Turn ~/Downloads/dune.pdf into an audiobook.
              </div>
            </div>
            <div className="text-ink-muted">
              <p>The agent gets the same tools as the assistant: make books, pick voices, translate, search, and export. It runs on your computer, on the same port as the app.</p>
              <a href={`${REPO}/blob/main/docs/mcp.md`} className="mt-4 inline-block text-brass hover:text-ember-bright">See the tools →</a>
            </div>
          </div>
        </Section>

        <Section id="download" title="Get Libratory for free" lead="Choose your computer to get started.">
          <Download />
          <details className="mt-8 text-ink-muted">
            <summary className="cursor-pointer text-brass hover:text-ember-bright">Voices and AI setup</summary>
            <div className="mt-4 max-w-2xl space-y-3">
              <p>Pick a language and preview a voice. Free options include Kokoro, KugelAudio, Pocket TTS, and your computer's built-in voices. Some need a graphics chip; Pocket TTS does not.</p>
              <p>For questions, summaries, and translations, run Ollama or LM Studio on your computer. Libratory finds them automatically.</p>
              <p>You can also connect online services with an API key. They receive the text you send and may charge fees.</p>
              <a href={`${REPO}#readme`} className="inline-block text-brass hover:text-ember-bright">Read the setup guide →</a>
            </div>
          </details>
        </Section>

        <section className="lamplight border-t border-edge">
          <div className="mx-auto max-w-5xl px-6 py-20 text-center">
            <Eyebrow>Start with one book</Eyebrow>
            <h2 className="mt-5 text-3xl tracking-tight sm:text-4xl">That book you keep meaning to read?</h2>
            <p className="mt-5 text-lg text-ink-muted">Now you can listen to it.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4"><DownloadButton /></div>
          </div>
        </section>
      </main>
      <Footer links={FOOT} />
    </>
  );
}
