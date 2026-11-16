import { Landing } from "../components/Landing.tsx";
import { Columns, Small } from "../components/Verse.tsx";

const FOOT = [
  { href: "/", label: "Home" },
  { href: "/reader/privacy/", label: "Privacy" },
];

const COLUMNS = [
  { title: "First as printed.", body: "The voice reads the page word for word, with the sentence and the word lit. That part is free and stays on your phone." },
  { title: "Then only what matters.", body: "Key takeaways: the page boiled down to what it claims, read to you in the same voice." },
  { title: "Then your way.", body: "Write one line, like “explain it to a ten-year-old” or “explain it to an engineer”, and every page is read to you like that." },
];

export function Study() {
  return (
    <Landing
      long
      headline="You've read it four times. Maybe you're a listener."
      line="Hear the page read to you. Then hear it explained like you're ten, or boiled down to what matters."
      free="Reading aloud is free. No account."
      demo="study"
      capture={{ src: "/demos/study.webp", alt: "A page of a book open in Libratory on an iPhone: the sentence being read aloud is marked, and the word being spoken is marked inside it.", focus: "17%" }}
      footer={FOOT}
    >
      <Columns columns={COLUMNS} />
      <Small>Key takeaways and your own angles are online, need sign-in and use credit, and arrive with the next update. For anything that matters, check it against the page.</Small>
    </Landing>
  );
}
