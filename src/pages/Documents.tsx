import { Landing } from "../components/Landing.tsx";
import { Columns, Honest, Lines } from "../components/Verse.tsx";

const FOOT = [
  { href: "/", label: "Home" },
  { href: "/reader/privacy/", label: "Privacy" },
];

const COLUMNS = [
  { title: "Every clause, read to you.", body: "At your speed, with the page on the screen. It is harder to skip a paragraph someone is reading aloud." },
  { title: "From your mail or from paper.", body: "Open the PDF you were sent, or photograph the pages." },
  { title: "It stays on your phone.", body: "The photos are read on the iPhone and are not uploaded." },
];

const PAPERS = [
  "The lease, before you sign it.",
  "The insurance letter you've been avoiding.",
  "The terms of the thing you already use.",
];

export function Documents() {
  return (
    <Landing
      long
      headline="You signed it. You didn't read it. Nobody does."
      line="Hear the next one before you sign it."
      free="Scanning and reading aloud are free. No account."
      demo="documents"
      capture={{
        src: "/demos/contract.webp",
        alt: "A one-page mobile phone contract open in Libratory, ready to be read aloud.",
        focus: "0%",
        plain: { width: 1170, height: 1393 },
      }}
      footer={FOOT}
    >
      <Columns columns={COLUMNS} />
      <Lines lines={PAPERS} />
      <Honest title="Not a lawyer">
        It tells you what the paper says. It does not tell you whether to sign. For anything that matters, ask a person too.
      </Honest>
    </Landing>
  );
}
