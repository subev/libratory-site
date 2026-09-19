import { Eyebrow, StoreCta } from "./Chrome.tsx";
import { ReadAlongPhone } from "./phone.tsx";

export function ReaderApp() {
  return (
    <section id="reader" className="lamplight-pitch border-y border-t-edge-strong border-b-edge bg-raised">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <div className="grid items-center gap-14 [grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr))]">
          <ReadAlongPhone />
          <div className="min-w-0">
            <Eyebrow>On your iPhone, too</Eyebrow>
            <h2 className="mt-5 text-3xl tracking-tight sm:text-4xl">Take your book for a walk.</h2>
            <p className="mt-5 max-w-[34rem] text-lg text-ink-secondary">
              Send your book to <strong className="font-semibold text-ink">Libratory Reader</strong>.
              Listen and follow the words wherever you go. It works offline, with no account.
            </p>
            <p className="mt-4 max-w-[34rem] text-ink-muted">Your own EPUB ebooks and M4B audiobooks work here, too.</p>
            <StoreCta href="/reader/" label="See the iPhone app" />
          </div>
        </div>
      </div>
    </section>
  );
}
