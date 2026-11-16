import { Landing } from "../components/Landing.tsx";
import { Columns, Small } from "../components/Verse.tsx";

const FOOT = [
  { href: "/", label: "Home" },
  { href: "/reader/privacy/", label: "Privacy" },
];

const COLUMNS = [
  { title: "The page as printed.", body: "Figures, tables and formulas stay where the author put them, with the sentence you are hearing marked." },
  { title: "Eyes free for the figure.", body: "The voice reads the text. You look at the diagram it is talking about." },
  { title: "PDF, EPUB or paper.", body: "Open a file, or photograph the pages of a book you own." },
];

export function Study() {
  return (
    <Landing
      long
      headline="You've read that paragraph four times. Try hearing it once."
      line="Open the paper or the chapter and listen, with the page as printed in front of you."
      free="Free. No account. Works without internet."
      demo="study"
      capture={{ src: "/demos/study.webp", alt: "A page of a book open in Libratory on an iPhone: the sentence being read aloud is marked, and the word being spoken is marked inside it.", focus: "17%" }}
      footer={FOOT}
    >
      <Columns columns={COLUMNS} />
      <Small>Reading aloud happens on the phone, so it works on a plane or in a basement library.</Small>
    </Landing>
  );
}
