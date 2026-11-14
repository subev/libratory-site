import { REPO } from "../components/Chrome.tsx";
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
  { href: `${REPO}/issues`, label: "Support" },
];

const SCENES = [
  {
    title: "It goes where you go.",
    body: "It reads with the screen locked, at your speed, and remembers where you stopped.",
    src: "/demos/player.webp",
    alt: "Libratory's player on an iPhone: the chapter, a scrubber, skip back and forward, pause and the speed.",
  },
  {
    title: "In the language you think in.",
    body: "Hear a page as it was written. Then hear each sentence again in yours.",
    note: "Translation is online and uses credit. Listening does not.",
    src: "/demos/two-languages.webp",
    alt: "A book in English and German open in Libratory, the sentence being read marked in both languages.",
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
