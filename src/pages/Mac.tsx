import { Button, DOWNLOAD, Eyebrow, Footer, GitHubIcon, Mark, Nav, REPO, Section, Wordmark } from "../components/Chrome.tsx";
import { Download } from "../components/Download.tsx";
import { Flow } from "../components/Flow.tsx";
import { Library } from "../components/Library.tsx";
import { LibraryChat } from "../components/LibraryChat.tsx";
import { Pipeline } from "../components/Pipeline.tsx";
import { Reader } from "../components/Reader.tsx";
import { Transform } from "../components/Transform.tsx";

const FEATURES = [
  { title: "Local by default, cloud if you ask", body: "Every narrator and every AI feature has a local option — a running Ollama or LM Studio is found without configuration. Add a cloud key if you want one; add none and nothing leaves the machine." },
  { title: "Cleanup that reads", body: "An AI pass strips OCR artifacts, running heads and hyphen breaks before the voice ever sees them." },
  { title: "Read along on the train, too", body: "A synced EPUB carries the audio and the highlighting with it, so the same read-along plays offline on a phone." },
  { title: "Digests", body: "Pick ten books, get one audiobook with a summary chapter for each." },
  { title: "A library, not a converter", body: "Nested folders, drag and drop, cross-folder search, and separate workspaces for separate people." },
  { title: "A JSON API, and what it invites", body: "POST a book and get it back as audio. The bundled script turns a day of Hacker News into a podcast that way." },
];

const VOICES = [
  { title: "Local, on the GPU", body: "Kokoro for English, French, Spanish, Italian, Portuguese, Hindi and Mandarin. KugelAudio covers 24 European languages, and there are three Bulgarian narrators." },
  { title: "Local, on the CPU", body: "Pocket TTS runs at about 12× realtime with no GPU at all, and can clone a voice from a twenty-second sample. Every macOS system voice you have installed works too." },
  { title: "Cloud, if you want it", body: "Cartesia and ElevenLabs are one API key away, for the languages the local models do not reach. Optional, and never required." },
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
            <p className="mt-6 font-display text-xl tracking-wide text-brass sm:text-2xl">
              Your free book and audiobook laboratory
            </p>
            <p className="mx-auto mt-10 max-w-2xl text-lg text-ink-secondary">
              Libratory turns a shelf of PDFs into chapter-marked audiobooks — and then keeps them,
              so you can clean up a bad scan, translate a chapter, ask a book a question, or search
              every word you own. The models run on your machine. Nothing is uploaded anywhere.
            </p>
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <Button href={DOWNLOAD}>Download for macOS</Button>
              <Button href={REPO} variant="ghost"><GitHubIcon className="mr-2.5 size-[1.05em]" />Read the source</Button>
            </div>
            <p className="mt-6 text-[0.95rem] text-ink-faint">
              Free · source on GitHub ·{" "}
              <a href="#download" className="text-brass hover:text-ember-bright">
                Linux and Windows run the same thing in Docker
              </a>
            </p>
          </div>
        </section>

        <Section
          title="How it works"
          lead="Two ways in, a loop in the middle, and more than one way out. You can stop anywhere along it."
        >
          <Flow />
        </Section>

        <Section
          id="features"
          title="Take a book apart. Put it back together."
          lead="The workbench itself. Edit a chapter, swap a voice, re-synthesize that one — and leave the rest alone."
        >
          <Pipeline />
        </Section>

        <Section
          title="And then you read along with it"
          lead="The narration comes back to the book it came from: the sentence being spoken is lit on the real print, and the word inside it moves as the voice reaches it."
        >
          <Reader />
        </Section>

        <Section
          title="One book is the demo. The shelf is the point."
          lead="Add as many as you like and keep them tidy: folders you can drag rows into, sorting on every column, and one line per book telling you what it has. Four shelves, four ways people actually use it."
        >
          <Library />
        </Section>

        <Section
          title="Voices"
          lead="That was Kokoro. Pick the language first and you get every voice that can read it, grouped by engine, each with a preview."
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
          title="Read it in another language, or in plainer words"
          lead="A translation, or a rewrite — explain it like I'm five, shorten it, or any prompt you write — from whichever model you have."
        >
          <Transform />
        </Section>

        <Section
          title="Ask the shelf, not the search box"
          lead="Ask a question and the assistant searches the content of every book, then answers with the passages it actually used."
        >
          <LibraryChat />
        </Section>

        <Section
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
          id="download"
          title="Get it"
          lead="A Mac gets an app. Everywhere else gets the same server in one container."
        >
          <Download />
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
