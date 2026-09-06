import { BetaCta, Eyebrow } from "./Chrome.tsx";
import { ReadAlongPhone } from "./phone.tsx";

const NOTES = [
  { title: "Column, Page, or Text", body: "The page's text block cropped to the phone, the whole printed sheet, or the spoken words reflowed at your own size. It measures the book's type and tells you which one you want." },
  { title: "Ordinary EPUBs and M4Bs too", body: "A plain EPUB opens as text; an M4B opens as a player. Nothing is drawn as a book with something missing — a control with nothing to do removes itself." },
];

export function ReaderApp() {
  return (
    <section id="reader" className="lamplight-pitch border-y border-t-edge-strong border-b-edge bg-raised">
      <div className="mx-auto max-w-5xl px-6 pt-24 pb-22">
        <div className="grid items-center gap-14 [grid-template-columns:repeat(auto-fit,minmax(300px,1fr))]">
          <ReadAlongPhone />

          <div className="min-w-0">
            <Eyebrow>Also, on the iPhone</Eyebrow>
            <h2 className="mt-5 text-3xl tracking-tight sm:text-4xl">
              The book you made reads along in your pocket.
            </h2>
            <p className="mt-5 max-w-[34rem] text-lg text-ink-secondary">
              <strong className="font-semibold text-ink">Libratory Reader</strong> opens the synced
              EPUB the Mac app exports and plays it over the real pages — the spoken sentence lit on
              the print, the word moving inside it, exactly as the desktop reader does. Nothing
              streams, nothing signs in, and the file is the whole backend.
            </p>
            <p className="mt-4 max-w-[34rem] text-ink-muted">
              It is a companion, not a requirement. The same read-along already runs in the Mac app;
              the Reader is for the half-hour on the train where the Mac is not.
            </p>

            <div className="mt-8 grid gap-x-8 gap-y-5 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
              {NOTES.map((note) => (
                <div key={note.title} className="border-l border-edge pl-5">
                  <h3 className="text-[1.0625rem]">{note.title}</h3>
                  <p className="mt-1.5 text-[0.95rem] text-ink-muted">{note.body}</p>
                </div>
              ))}
            </div>

            <BetaCta href="/reader/" label="What the Reader does" note="install TestFlight first, then open the link" />
          </div>
        </div>
      </div>
    </section>
  );
}
