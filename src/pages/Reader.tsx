import { Fragment, type ReactNode } from "react";
import { BetaCta, Eyebrow, Footer, Nav, REPO, Section } from "../components/Chrome.tsx";
import { ReadAlongPhone } from "../components/phone.tsx";
import { M4bPhone, MarksPhone, PlainEpubPhone } from "../components/ReaderScreens.tsx";

const NAV = [
  { href: "/#features", label: "The desktop app" },
  { href: "/reader/", label: "Reader", current: true },
  { href: "#beta", label: "Get the beta" },
];

const FOOT = [
  { href: "/", label: "The desktop app" },
  { href: REPO, label: "Source" },
  { href: "/reader/privacy/", label: "Privacy" },
];

const STEPS = [
  {
    step: "Step one",
    title: "Narrate it on the desktop",
    body: <>The desktop app's Output stage writes a <Strong>synced EPUB</Strong> beside the M4B: the pages, the audio, and the cue file that says which rectangle each spoken word sits in.</>,
  },
  {
    step: "Step two",
    title: "Put the file on the phone",
    body: <>AirDrop it, or drop it in Files and import with <Strong>+</Strong>. It copies into the app and stays there — nothing is fetched again, and the book works with the phone in airplane mode.</>,
  },
  {
    step: "Step three",
    title: "Open it and read",
    body: <>It opens where you left off, paused. What you have heard is kept as a union of intervals rather than a furthest point, so jumping about does not lie to you later.</>,
  },
];

const VIEWS = [
  { title: "Column", note: "— the default", body: "The page's text block with its paper margins cropped away, filling the width of the phone. The print still scrolls page after page; a chapter is a mark in it, not a boundary." },
  { title: "Page", body: "The whole printed sheet, margins and running heads included — for the plate, the table or the page you want to see as it was set. A pinch is yours and is never undone inside a chapter." },
  { title: "Text", body: "The spoken words reflowed at your own size, in the reading face on the reading ground. The sentence being read is still lit; the underline is a mark you filed yourself." },
];

const KINDS = [
  {
    title: "Synced EPUB",
    tag: "Read + listen",
    lead: true,
    body: "The one the desktop app makes, and the only one that can light a word on a page. Pages, audio and cues in one file: read-along, double-tap to seek, follow-scroll, marks and search over the narration.",
  },
  {
    title: "Plain EPUB",
    tag: "Read",
    body: "An ordinary ebook you already own opens as text, at your size, with the chapter picker and your marks. One line where the transport was — Chapter 4 of 62 · 38% through — and no bar under it.",
  },
  {
    title: "M4B audiobook",
    tag: "Listen",
    body: "An empty page is not a screen, so an audiobook gets its own: cover set large, the chapter's name, one bar that is the coverage ribbon and the scrubber at once, and fifteen seconds as the step. Both were built; this one was kept.",
  },
];

const COUNTS = [
  { lead: "A sentence is heard when its audio played through to the end of it", body: " — not when it was highlighted. Scrubbing across ten minutes covers nothing." },
  { lead: "Speed does not matter.", body: " Coverage is in book time, not wall time, so 2× still covers what it spoke." },
  { lead: "Nothing ever un-covers.", body: " Back fifteen replays heard ground and the picture does not change." },
  { lead: "Reading with your eyes does not count.", body: " Scrolling past the print with the voice paused covers nothing — tempting, and wrong, because nobody can tell what you looked at." },
];

const SCREENS = [
  {
    src: "/reader/screens/shelf.png",
    width: 1170,
    height: 1114,
    alt: "The Libratory Reader shelf: a large Reading title, an ON THIS PHONE group header, and one book row",
    caption: "The shelf, ordered by what you read last — the row is the way back in.",
  },
  {
    src: "/reader/screens/chapters.png",
    width: 1170,
    height: 1334,
    alt: "The chapter picker, opened on the chapter being read, each row carrying its coverage ribbon",
    caption: "Chapters, opened on the one being read — never at the top of sixty. The rail under each is what you have heard.",
  },
  {
    src: "/reader/screens/player.png",
    width: 1170,
    height: 1030,
    alt: "The player sheet: cover, chapter title, coverage rail, back 15, play, forward 30, speed and AirPlay",
    caption: "The player, risen from the capsule: transport, speed, route. No account anywhere in it.",
  },
];

const MARK_NOTES = [
  { title: "Filed into groups you name", body: <>Unknown words in one, quotes in another. A group is named the first time you use it and offered by name after that, and the whole sheet exports as one file a person can read and a model can parse.</> },
  { title: "Search hears as well as reads", body: <>The narration is the text, so a hit is somewhere you can listen from as well as a place on the printed page. Your own marks are searched beside it.</> },
];

// The coverage ribbon at its largest: heard, a gap, heard, ahead, heard, ahead — with Now on the seam
const RIBBON =
  "linear-gradient(90deg,rgba(253,241,228,0.62) 0 34%,rgba(253,241,228,0.15) 34% 44%,rgba(253,241,228,0.62) 44% 62%,rgba(253,241,228,0.06) 62% 82%,rgba(253,241,228,0.62) 82% 92%,rgba(253,241,228,0.06) 92% 100%)";

const KEY = [
  { swatch: "bg-[#fdf1e4]/62", term: "Heard.", body: "Spoken while you were listening." },
  { swatch: "bg-[#fdf1e4]/15", term: "A gap.", body: "Behind the voice and never heard — the only state you can act on." },
  { swatch: "bg-[#fdf1e4]/6", term: "Ahead.", body: "Not reached yet. Fainter, because it is not a hole, it is just the future." },
  { swatch: "", term: "Now.", body: "The one tangerine mark, and the only one that moves." },
];

function Strong({ children }: { children: ReactNode }) {
  return <strong className="font-semibold text-ink-secondary">{children}</strong>;
}

export function Reader() {
  return (
    <>
      <Nav links={NAV} />

      <main>
        <section className="lamplight-hero border-b border-edge">
          <div className="mx-auto grid max-w-5xl items-center gap-14 px-6 pt-20 pb-22 [grid-template-columns:repeat(auto-fit,minmax(300px,1fr))]">
            <div className="min-w-0">
              <Eyebrow>Libratory Reader · iPhone</Eyebrow>
              <h1 className="mt-5 text-[clamp(2.125rem,4.6vw,3.25rem)] font-semibold tracking-tight">
                The audiobook plays over the page it came from.
              </h1>
              <p className="mt-6 max-w-[34rem] text-lg text-ink-secondary">
                Make the book on the desktop, export the synced EPUB, open it here. The narration plays
                over the real print — the spoken sentence lit, the word moving inside it — and a
                double tap on any sentence sends the voice there.
              </p>
              <p className="mt-4 max-w-[34rem] text-ink-muted">
                Offline, and no account. The file is the whole backend: nothing is uploaded, and
                nothing about the book lives anywhere but on the phone it was copied to.
              </p>
              <BetaCta href="/#download" label="Get the desktop app first" note="a public link, no invitation to collect" />
            </div>

            <ReadAlongPhone />
          </div>
        </section>

        <Section
          title="How a book gets here"
          lead="Three steps, one of which is a file transfer. There is no sign-in and no sync service in the middle."
        >
          <div className="grid gap-x-12 gap-y-8 [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
            {STEPS.map((step) => (
              <div key={step.step} className="border-l border-edge pl-6">
                <p className="font-mono text-[10.5px] tracking-[0.13em] uppercase text-brass">{step.step}</p>
                <h3 className="mt-2.5 text-xl">{step.title}</h3>
                <p className="mt-2 text-ink-muted">{step.body}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section
          title="Three ways to look at a page"
          lead="A page set for paper is unreadable at arm's length, so the crop is the default and the whole sheet is one tap away. When the book's body type comes out too small to hold, the reader says so and offers the third."
          sub={<>The first two need printed pages to show, so they belong to the <Strong>synced EPUB</Strong> — the only file that carries them. Text is what every book has, and in one that was only ever text it is not a third option, it is the reader.</>}
        >
          <div className="grid gap-x-12 gap-y-8 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
            {VIEWS.map((view) => (
              <div key={view.title} className="border-l border-edge pl-6">
                <h3 className="text-xl">
                  {view.title}
                  {view.note ? <span className="font-body text-[0.95rem] font-normal text-brass"> {view.note}</span> : null}
                </h3>
                <p className="mt-2 text-ink-muted">{view.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 max-w-2xl text-[0.95rem] text-ink-faint">
            Text is set at a size you choose under <strong className="font-semibold">Aa</strong>, and
            appearance follows the system while the print keeps the book's own paper. In all three the
            print moves only when it must, and then puts as much of the spoken sentence on the screen as
            will fit, from its start, without pushing the lit word off — and never past the edge of the
            page it is following. Wander off and <em>Back to the voice</em> is waiting.
          </p>
        </Section>

        <Section
          title="Half a book is still a whole book"
          lead="An EPUB you dragged in is not a synced book with a piece missing — nothing is missing from it; it is a book that was only ever text. So a thinner book says nothing about being thin: it just has less chrome, because every control asks whether this file has audio, cues or pages and quietly leaves if not. Absence is silent; loss is not — only a book that promises a voice it lacks gets a notice."
        >
          <div className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
            {KINDS.map((kind) => (
              <div
                key={kind.title}
                className={`rounded-sm border p-6 ${kind.lead ? "border-brass/45 bg-brass/4" : "border-edge"}`}
              >
                <div className="flex flex-wrap items-baseline gap-3">
                  <h3 className="text-xl">{kind.title}</h3>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-sans text-[11px] font-semibold ${
                      kind.lead ? "bg-ember/16 text-ember-bright" : "bg-[#fdf1e4]/6 text-ink-muted"
                    }`}
                  >
                    {kind.tag}
                  </span>
                </div>
                <p className="mt-2.5 text-ink-muted">{kind.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 grid items-start gap-12 [grid-template-columns:repeat(auto-fit,minmax(300px,1fr))]">
            <PlainEpubPhone />
            <M4bPhone />
          </div>

          <p className="mt-10 max-w-2xl text-[0.95rem] text-ink-faint">
            Both keep what has nothing to do with a page: background audio, the lock screen told the
            right step, and <em>Keep screen awake</em> on by default in the books that light a word — a
            read-along that lets the phone lock mid-sentence is not one.
          </p>
        </Section>

        <Section
          title="Heard is not the same as how far you got"
          lead="A progress bar answers where am I with one number — the furthest point reached. A read-along makes that number lie: you double-tap a paragraph to jump, you skip a chapter, you step back fifteen seconds, you open a favourite out of order. What you actually want to know is which parts have I heard, and that is not a number. It is a set of intervals, so it is drawn as a field with holes in it."
        >
          <div className="grid items-start gap-x-12 gap-y-10 [grid-template-columns:repeat(auto-fit,minmax(300px,1fr))]">
            <div className="min-w-0">
              <h3 className="text-xl">The vocabulary</h3>
              <div className="relative mt-5 h-4 rounded" style={{ background: RIBBON }}>
                <div className="absolute -top-1 -bottom-1 left-[62%] w-0.5 rounded-[1px] bg-ember-bright shadow-[0_0_0_2px_#16140f]" />
              </div>
              <div className="mt-5 grid grid-cols-[auto_1fr] items-center gap-3">
                {KEY.map((entry) => (
                  <Fragment key={entry.term}>
                    {entry.swatch ? (
                      <span className={`h-2.5 w-[22px] rounded-[3px] ${entry.swatch}`} />
                    ) : (
                      <span className="grid w-[22px] place-items-center">
                        <span className="block h-3.5 w-0.5 rounded-[1px] bg-ember-bright" />
                      </span>
                    )}
                    <span className="text-[0.95rem] text-ink-secondary">
                      <strong className="font-semibold text-ink">{entry.term}</strong> {entry.body}
                    </span>
                  </Fragment>
                ))}
              </div>
              <p className="mt-5 text-[0.95rem] text-ink-faint">
                Heard blocks that touch are one block — no seam at a chapter join, and none where a
                fifteen-second step back re-covered ground. Anything under about twenty seconds is
                swallowed into its neighbour rather than drawn as a hole nobody made on purpose.
              </p>
            </div>

            <div className="min-w-0">
              <h3 className="text-xl">What counts as heard</h3>
              <div className="mt-5 grid gap-4">
                {COUNTS.map((entry) => (
                  <p key={entry.lead} className="text-ink-muted">
                    <Strong>{entry.lead}</Strong>{entry.body}
                  </p>
                ))}
              </div>
              <p className="mt-6 border-t border-edge pt-4 text-[0.95rem] text-ink-faint">
                The same ribbon repeats at three sizes: a shelf row, a chapter row, and the scrubber
                rail in the reader. One drawing, three lengths.
              </p>
            </div>
          </div>
        </Section>

        <Section
          title="A mark is a word you stopped for"
          lead="Selecting already stops the voice — the app reads that as stopping to look at something. So a mark is made from the selection in one tap, and the thing being collected is usually a single unknown word rather than a passage. Not a list of places, then: a set of words with their sentences and their coordinates, filed into groups you name."
          sub={<>Search arrives at the same door. The cue list <em>is</em> the text — concatenating what the voice says gives the chapter back word for word, with a millisecond and a rectangle on every sentence — so <Strong>every hit is a place you can listen to and a place on the printed page</Strong>. No index, no server, and no new button in a bar that floats over the words: it is the third face of the sheet the chapters already live in.</>}
        >
          <div className="grid items-center gap-12 [grid-template-columns:repeat(auto-fit,minmax(300px,1fr))]">
            <MarksPhone />
            <div className="grid min-w-0 gap-7">
              {MARK_NOTES.map((note) => (
                <div key={note.title}>
                  <h3 className="text-xl">{note.title}</h3>
                  <p className="mt-2 text-ink-muted">{note.body}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <section id="beta" className="lamplight-beta border-y border-t-edge-strong border-b-edge bg-raised">
          <div className="mx-auto max-w-5xl px-6 py-22">
            <Eyebrow>The beta</Eyebrow>
            <h2 className="mt-5 max-w-2xl text-3xl tracking-tight sm:text-4xl">
              It is being tested by people who read, not by people who test.
            </h2>
            <p className="mt-5 max-w-2xl text-lg text-ink-secondary">
              Install <strong className="font-semibold text-ink">TestFlight</strong> from the App Store,
              open the link, and the app arrives with a short three-chapter guide already on the shelf
              — itself a synced book, so reading it is the fastest way to see what this does. About
              three minutes.
            </p>
            <p className="mt-5 max-w-2xl text-ink-muted">
              Three screens from that build, on the guide itself — so a tester who has not made a book
              yet still has something to read.
            </p>
            <div className="mt-8 grid items-start gap-6 [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
              {SCREENS.map((screen) => (
                <figure key={screen.src} className="m-0">
                  <img
                    src={screen.src}
                    alt={screen.alt}
                    width={screen.width}
                    height={screen.height}
                    loading="lazy"
                    className="block h-auto w-full rounded-[10px] border border-edge"
                  />
                  <figcaption className="mt-3.5 text-sm text-ink-faint">{screen.caption}</figcaption>
                </figure>
              ))}
            </div>

            <p className="mt-10 max-w-2xl text-ink-muted">
              Then bring a book of your own from the desktop app and spend a real half-hour in it. That is
              the part that cannot be tested from here: whether the highlighted word keeps up with the
              voice through a long chapter, whether the page is legible at your size on your phone, and
              whether closing the app mid-sentence puts you back an hour later.
            </p>
            <BetaCta href="/#download" label="Get the desktop app" note="4 MB · builds expire after 90 days and are replaced" />
          </div>
        </section>
      </main>

      <Footer links={FOOT} />
    </>
  );
}
