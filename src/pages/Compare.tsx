import { DownloadButton, Eyebrow, Footer, Nav, REPO, Section } from "../components/Chrome.tsx";

const NAV = [
  { href: "/#features", label: "Desktop app", wide: true },
  { href: "/reader/", label: "iPhone" },
  { href: "/#download", label: "Download" },
];

const FOOT = [
  { href: "/", label: "Desktop app" },
  { href: "/pdf-to-audiobook-mac/", label: "Mac guide" },
  { href: REPO, label: "GitHub" },
];

const TOOLS = ["Libratory", "ebook2audiobook", "Audiblez", "Abogen", "Storyteller"] as const;

// One row per question a reader actually asks, one cell per tool, read from each project's own
// README in September 2026. Keep cells short: the table is scanned, not read.
const ROWS: { label: string; cells: [string, string, string, string, string] }[] = [
  {
    label: "What goes in",
    cells: [
      "PDF, including scans. Text through a JSON API.",
      "EPUB, MOBI, PDF, DOCX, TXT, images and more.",
      "EPUB only.",
      "EPUB, PDF, TXT, Markdown, subtitle files.",
      "An ebook and an audiobook you already have.",
    ],
  },
  {
    label: "What comes out",
    cells: [
      "M4B with chapters. PDF, EPUB, and a synced EPUB with the audio inside.",
      "M4B, M4A, MP3, FLAC, WAV and more, with chapters.",
      "M4B with chapters.",
      "WAV, FLAC, MP3, Opus, M4B with chapters. SRT and ASS subtitles.",
      "The two, synced, read in its own apps.",
    ],
  },
  {
    label: "Voices",
    cells: [
      "Kokoro, Pocket TTS (clones your voice), KugelAudio, every macOS voice. Cartesia and ElevenLabs with your own key.",
      "XTTS v2, Bark, VITS, Tacotron 2, Tortoise, YourTTS and more. Clones a voice. 1,158 languages.",
      "Kokoro, 9 languages.",
      "Kokoro, 9 languages, with a voice mixer.",
      "None. It aligns a narration that already exists.",
    ],
  },
  {
    label: "Follow the words",
    cells: [
      "On the original page, sentence and word, with pictures and tables in place.",
      "No.",
      "No.",
      "Subtitles beside the audio, word by word in English.",
      "In its apps, over the ebook text.",
    ],
  },
  {
    label: "Take it with you",
    cells: [
      "Synced EPUB for the free iPhone Reader, or any player that handles EPUB 3 media overlays.",
      "The audio file.",
      "The audio file.",
      "The audio file plus a subtitle file.",
      "Its own iPhone and Android apps.",
    ],
  },
  {
    label: "Scanned books",
    cells: [
      "Yes. Tesseract, Surya for hard scans, or a vision model. Highlights work on scans too.",
      "Yes, OCR for pages that are images.",
      "No.",
      "No.",
      "No.",
    ],
  },
  {
    label: "AI on the text",
    cells: [
      "Translate, rewrite, simplify, clean up OCR, ask questions across every book with page citations. Ollama or LM Studio, or a cloud key.",
      "No.",
      "No.",
      "Text normalisation with a model, in the web version.",
      "No.",
    ],
  },
  {
    label: "Runs on",
    cells: [
      "Apple Silicon Mac app. Linux. Docker, which is also the Windows route.",
      "Mac, Linux, Windows, Docker. Web UI and command line.",
      "Mac, Linux, Windows, from Python. Command line and a small window.",
      "Windows, Linux, Mac, Docker. Desktop and web versions.",
      "A self-hosted server, a web page, phone apps.",
    ],
  },
  {
    label: "Licence",
    cells: [
      "Free. Source available, PolyForm Noncommercial.",
      "Apache 2.0.",
      "MIT.",
      "MIT.",
      "MIT.",
    ],
  },
];

const PICKS = [
  {
    tool: "ebook2audiobook",
    when: "You need a language none of the voices above speak, or a cloned voice in an engine of your choosing. It has more engines and more languages than anything else on this page.",
    href: "https://github.com/DrewThomasson/ebook2audiobook",
  },
  {
    tool: "Audiblez",
    when: "You have an EPUB and want an M4B, and nothing else. It is the shortest path from one to the other.",
    href: "https://github.com/santinic/audiblez",
  },
  {
    tool: "Abogen",
    when: "You want subtitle files with the audio, for a video or for a player that shows subtitles.",
    href: "https://github.com/denizsafak/abogen",
  },
  {
    tool: "Storyteller",
    when: "You already own the audiobook, read by a person, and want it paired with the ebook so the words follow the voice.",
    href: "https://gitlab.com/storyteller-platform/storyteller",
  },
  {
    tool: "Libratory",
    when: "Your book is a PDF, maybe a scan, and the page matters: you want to follow the words where they are printed, keep the pictures and tables, and ask questions across your shelf.",
    href: "/",
  },
];

export function Compare() {
  return (
    <>
      <Nav links={NAV} source />
      <main>
        <section className="lamplight border-b border-edge">
          <div className="mx-auto max-w-5xl px-6 pt-16 pb-16 sm:pt-20 sm:pb-20">
            <Eyebrow>Compared</Eyebrow>
            <h1 className="mt-5 max-w-3xl text-[clamp(2.125rem,4.6vw,3.25rem)] font-semibold tracking-tight">
              Five free tools turn books into audio. They are not the same tool.
            </h1>
            <p className="mt-6 max-w-[38rem] text-lg text-ink-secondary">
              This page says what each one is for, so you pick the right one.
              Every cell comes from the project's own README, read in September 2026.
              If one is out of date, <a href={`${REPO}/issues`} className="text-brass hover:text-ember-bright">say so</a>.
            </p>
          </div>
        </section>

        <Section title="Side by side">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[56rem] border-collapse text-[0.95rem]">
              <thead>
                <tr>
                  <th className="w-[9rem] pb-3 text-left align-bottom font-display text-xs uppercase tracking-[0.2em] text-ink-faint">Question</th>
                  {TOOLS.map((tool) => (
                    <th key={tool} className={`pb-3 pr-4 text-left align-bottom font-semibold ${tool === "Libratory" ? "text-brass" : "text-ink"}`}>{tool}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row) => (
                  <tr key={row.label} className="border-t border-edge align-top">
                    <th scope="row" className="py-4 pr-4 text-left font-medium text-ink-muted">{row.label}</th>
                    {row.cells.map((cell, i) => (
                      <td key={TOOLS[i]} className={`py-4 pr-4 ${i === 0 ? "text-ink" : "text-ink-secondary"}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section title="Which one to pick" lead="Each of these is the right answer to a different question.">
          <ul className="grid gap-6 sm:grid-cols-2">
            {PICKS.map((pick) => (
              <li key={pick.tool} className="rounded-sm border border-edge bg-raised p-6">
                <h3 className="text-xl font-semibold text-ink">
                  <a href={pick.href} className="hover:text-brass">{pick.tool}</a>
                </h3>
                <p className="mt-3 text-ink-secondary">{pick.when}</p>
              </li>
            ))}
          </ul>
        </Section>

        <section className="lamplight-get border-t border-edge">
          <div className="mx-auto max-w-5xl px-6 py-16 text-center">
            <h2 className="text-3xl tracking-tight sm:text-4xl">Try Libratory with one book</h2>
            <p className="mx-auto mt-4 max-w-xl text-ink-muted">Free. Apple Silicon Mac, Linux, or Docker. Nothing leaves your computer unless you add a cloud key.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4"><DownloadButton /></div>
          </div>
        </section>
      </main>
      <Footer links={FOOT} />
    </>
  );
}
