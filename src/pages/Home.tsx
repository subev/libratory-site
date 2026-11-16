import { Landing } from "../components/Landing.tsx";
import { Doors, Scenes, Small } from "../components/Verse.tsx";

// Old links ending in /#download mean the Mac tool, so the id sits on the link that leads to it
const FOOT = [
  { href: "/books/", label: "Books" },
  { href: "/study/", label: "Study" },
  { href: "/documents/", label: "Documents" },
  { href: "/languages/", label: "Languages" },
  { href: "/articles/", label: "Articles" },
  { href: "/mac/", label: "For your Mac", id: "download" },
  { href: "/reader/privacy/", label: "Privacy" },
  { href: "/reader/support/", label: "Support" },
];

const SCENES = [
  {
    title: "Every word knows its partner.",
    body: "Read in two languages at once. The sentence you hear lights in both, and the word being spoken lights in the other language too. You learn the word where you met it.",
    note: "Two-language books come with the app. Translating your own is online and uses credit.",
    src: "/demos/word-pairs.webp",
    alt: "A page in English and German in Libratory: the sentence being read is marked in both languages, and the word “both” is marked together with “beide”.",
    plain: { width: 1170, height: 1519 },
  },
  {
    title: "The page you photographed, lit.",
    body: "It reads the print itself, on your iPhone, and marks the sentence, and the word inside it, on your own page. Nothing is uploaded.",
    src: "/demos/photographed-page.webp",
    alt: "A photographed page of a printed novel in Libratory, the sentence being read aloud marked on the print and the spoken word marked inside it.",
    plain: { width: 1170, height: 1066 },
  },
];

const DOORS = [
  { verse: "You already bought the book. Why are you paying again to hear it?", label: "Books", href: "/books/" },
  { verse: "You've read that paragraph four times. Try hearing it once.", label: "Study", href: "/study/" },
  { verse: "You signed it. You didn't read it. Nobody does.", label: "Documents", href: "/documents/" },
  { verse: "You speak the language fine. Until the tax office writes.", label: "Languages", href: "/languages/" },
  { verse: "“Read later” is where articles go to die.", label: "Articles", href: "/articles/" },
];

export function Home() {
  return (
    <Landing
      headline="Make a book as hard to put down as your phone."
      line="Your phone holds you with a voice and words that light up. Libratory gives the same two things to what you chose to read."
      free="Listening is free."
      demo="home"
      capture={{ src: "/demos/lamp.webp", alt: "A page open in Libratory on an iPhone, the sentence being read aloud marked on it.", focus: "9%" }}
      footer={FOOT}
    >
      <Scenes scenes={SCENES} />
      <Doors doors={DOORS} />
      <Small>
        Listening is free with the voices already on your iPhone. No account. It works without internet. PDF, EPUB, or a photo of the page.
      </Small>
    </Landing>
  );
}
