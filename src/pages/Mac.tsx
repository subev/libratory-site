import { Button, DOWNLOAD, Eyebrow, Footer, Mark, Nav, REPO, Section, Wordmark } from "../components/Chrome.tsx";

const PIPELINE = [
  { step: "Drop a PDF", detail: "Text comes back in seconds. OCR is there when a scan needs it." },
  { step: "Get chapters", detail: "Detected from the table of contents, or drawn by hand where the book is odd." },
  { step: "Pick a voice", detail: "Local models, macOS system voices, or a cloud engine if you have a key." },
  { step: "Listen", detail: "One M4B with real chapter markers and a cover, ready for any player." },
];

const FEATURES = [
  { title: "Per-chapter control", body: "Edit the text, exclude a chapter, re-synthesize just that one. Nothing retries silently behind your back." },
  { title: "Cleanup that reads", body: "An AI pass strips OCR artifacts, running heads and hyphen breaks before the voice ever sees them." },
  { title: "Translations and rewrites", body: "Any chapter in another language, or shortened, or explained simply — the original text is always kept beside it." },
  { title: "Ask, and keep the answer", body: "Question a chapter or a whole book. Every answer is saved as a note, and any note can become a chapter you narrate." },
  { title: "Chat across the shelves", body: "Hybrid full-text and semantic search over the content of every book, with citations that open the PDF at the page." },
  { title: "Digests", body: "Pick ten books, get one audiobook with a summary chapter for each — or drive it from a script through the JSON API." },
  { title: "Exports", body: "PDF and EPUB of the chapters you choose, or a synced EPUB that carries the audio and the highlighting with it." },
  { title: "A library, not a converter", body: "Nested folders, drag and drop, cross-folder search, and separate workspaces for separate people." },
];

const VOICES = [
  { title: "Local, on the GPU", body: "Kokoro for English, French, Spanish, Italian, Portuguese, Hindi and Mandarin. KugelAudio covers 24 European languages, and there are three Bulgarian narrators." },
  { title: "Local, on the CPU", body: "Pocket TTS runs at about 12× realtime with no GPU at all, and can clone a voice from a twenty-second sample. Every macOS system voice you have installed works too." },
  { title: "Cloud, if you want it", body: "Cartesia and ElevenLabs are one API key away, for the languages the local models do not reach. Optional, and never required." },
];

const VIDEOS = [
  { id: "OKMiox3nxPY", n: "I", title: "The core idea", body: "PDF in, chapter-marked audiobook out" },
  { id: "GhQW_Ma2qwI", n: "II", title: "Smart features", body: "Ask AI, chat with citations, translate and transform" },
  { id: "g9kX_cNFD6k", n: "III", title: "Scaling your library", body: "Instant indexing, library-wide chat, digests" },
  { id: "os3-bJxDhsM", n: "IV", title: "Documents and read-along", body: "PDF/EPUB export, synced read-along for your phone" },
  { id: "fmIiWdthnfg", n: "V", title: "Extensions and the road ahead", body: "The JSON API, scripted audiobooks, what's next" },
];

export function Mac() {
  return (
    <>
      <Nav />

      <main>
        <section className="lamplight border-b border-edge">
          <div className="mx-auto max-w-5xl px-6 pt-24 pb-28 text-center sm:pt-32 sm:pb-36">
            <Mark className="mx-auto size-16" />
            <Wordmark className="mt-8 block text-4xl text-ink sm:text-6xl" />
            <p className="mt-6 font-display text-xl font-light tracking-wide text-brass sm:text-2xl">
              A reading room for the books you already own
            </p>
            <p className="mx-auto mt-10 max-w-2xl text-lg text-ink-secondary">
              Libratory turns a shelf of PDFs into chapter-marked audiobooks — and then keeps them,
              so you can clean up a bad scan, translate a chapter, ask a book a question, or search
              every word you own. The models run on your machine. Nothing is uploaded anywhere.
            </p>
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <Button href={DOWNLOAD}>Download for macOS</Button>
              <Button href={REPO} variant="ghost">Read the source</Button>
            </div>
            <p className="mt-6 text-[0.95rem] text-ink-faint">
              Free and open source · Apple Silicon · Linux and headless servers run the same thing in Docker
            </p>
          </div>
        </section>

        <Section title="How it works" lead="Four steps, and you can stop after any of them.">
          <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {PIPELINE.map((item, index) => (
              <li key={item.step}>
                <span className="font-display text-3xl text-brass">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-xl">{item.step}</h3>
                <p className="mt-2 text-ink-muted">{item.detail}</p>
              </li>
            ))}
          </ol>
        </Section>

        <Section
          id="features"
          title="What you get after the audiobook"
          lead="The conversion is the easy half. The rest is what makes a messy PDF collection worth keeping."
        >
          <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {FEATURES.map((feature) => (
              <div key={feature.title} className="border-l border-edge pl-6">
                <h3 className="text-xl">{feature.title}</h3>
                <p className="mt-2 text-ink-muted">{feature.body}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section
          title="Voices"
          lead="Pick the language first and you get every voice that can read it, grouped by engine, each with a preview."
        >
          <div className="grid gap-10 sm:grid-cols-3">
            {VOICES.map((voice) => (
              <div key={voice.title}>
                <h3 className="text-xl">{voice.title}</h3>
                <p className="mt-2 text-ink-muted">{voice.body}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section
          id="tours"
          title="Watch it work"
          lead="Five short tours, narrated by the app's own synthesized voice — the script is a book inside the app."
        >
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {VIDEOS.map((video) => (
              <a
                key={video.id}
                href={`https://youtu.be/${video.id}`}
                className="group block"
              >
                <div className="overflow-hidden rounded-sm border border-edge bg-inset">
                  <img
                    src={`https://img.youtube.com/vi/${video.id}/hq720.jpg`}
                    alt=""
                    loading="lazy"
                    className="aspect-video w-full object-cover transition-opacity group-hover:opacity-85"
                  />
                </div>
                <h3 className="mt-4 text-lg">
                  <span className="text-brass">{video.n}</span>
                  <span className="text-ink-faint"> · </span>
                  <span className="group-hover:text-brass transition-colors">{video.title}</span>
                </h3>
                <p className="mt-1 text-ink-muted">{video.body}</p>
              </a>
            ))}
          </div>
        </Section>

        <section className="lamplight border-t border-edge">
          <div className="mx-auto max-w-5xl px-6 py-24 text-center">
            <Eyebrow>Start with one book</Eyebrow>
            <h2 className="mt-5 text-3xl tracking-tight sm:text-4xl">
              The one that has been sitting unread the longest.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-ink-muted">
              Drop in the PDF and hear the first chapter.
            </p>
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <Button href={DOWNLOAD}>Download for macOS</Button>
              <Button href={`${REPO}#how-it-works`} variant="ghost">See how it is built</Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
