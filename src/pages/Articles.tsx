import { Landing } from "../components/Landing.tsx";
import { Columns, Small } from "../components/Verse.tsx";

const FOOT = [
  { href: "/", label: "Home" },
  { href: "/reader/privacy/", label: "Privacy" },
];

const SOURCES = [
  { title: "A web page.", body: "In Safari: Reader, then Share, Options, PDF, and open it in Libratory. The long post you keep meaning to read." },
  { title: "A PDF.", body: "The report from work, the paper a friend sent, the newsletter you printed to a file. Open it and press play." },
  { title: "A photo.", body: "The magazine on the table, the page in the waiting room. Photograph it, and the page itself reads to you." },
];

export function Articles() {
  return (
    <Landing
      long
      headline="“Read later” is where articles go to die."
      line="The web page, the PDF from work, the magazine on the table. If it has words, press play."
      free="Free. No account. Works without internet."
      demo="articles"
      capture={{ src: "/demos/player.webp", alt: "Libratory's player on an iPhone: the chapter, a scrubber, pause and the speed.", focus: "88%" }}
      footer={FOOT}
    >
      <Columns columns={SOURCES} />
      <Small>On the walk, at the sink, on the train. Once it is on your phone it needs no internet.</Small>
    </Landing>
  );
}
