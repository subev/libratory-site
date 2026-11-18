import { Landing } from "../components/Landing.tsx";
import { Columns, Explained, Honest, Lines } from "../components/Verse.tsx";

const FOOT = [
  { href: "/", label: "Home" },
  { href: "/reader/privacy/", label: "Privacy" },
];

const COLUMNS = [
  { title: "Every clause, read to you.", body: "At your speed, with the page on the screen. It is harder to skip a paragraph someone is reading aloud." },
  { title: "From your mail or from paper.", body: "Open the PDF you were sent, or photograph the pages." },
  { title: "It stays on your phone.", body: "The photos are read on the iPhone and are not uploaded." },
];

const PRINTED = {
  label: "As printed",
  text: "I have the option of paying the interest that accrues on my loans during grace, in-school, deferment (including in-school deferment), forbearance, and certain other periods, but if I do not do so, ED may add unpaid interest that accrues on my loans to the principal balance of those loans at the end of the grace, deferment, forbearance, or other period. This is called \"capitalization.\" Capitalization will increase the principal amount owed on the loan and the total amount of interest I must pay.",
};

const SIMPLY = {
  label: "Explained simply",
  text: "Item 15 B explains that while you are in school or in a pause from payments, your loan can build up interest. You're allowed to pay that interest as it builds. If you don't, the lender can add the unpaid interest onto the main amount you borrowed at the end of that period — the note calls this \"capitalization.\" That makes the amount you owe bigger, and the total interest you pay will also go up.",
};

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
        src: "/demos/loan-note.webp",
        alt: "Page 2 of the federal student loan promissory note open in Libratory: the sentence about capitalization is marked, and the word being spoken is marked inside it.",
        focus: "0%",
        plain: { width: 1000, height: 1100 },
      }}
      footer={FOOT}
    >
      <Explained
        title="First what it says. Then what it means."
        printed={PRINTED}
        explained={SIMPLY}
        note="The federal student loan promissory note, page 2, item 15 B. We asked the app to explain it like we were five. The answer is the app's own, unedited. Explaining needs sign-in and uses credit."
      />
      <Columns columns={COLUMNS} />
      <Lines lines={PAPERS} />
      <Honest title="Not a lawyer">
        It tells you what the paper says. It does not tell you whether to sign. For anything that matters, ask a person too.
      </Honest>
    </Landing>
  );
}
