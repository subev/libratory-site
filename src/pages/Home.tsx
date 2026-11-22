import { Landing } from "../components/Landing.tsx";
import { Doors, Scenes, Small } from "../components/Verse.tsx";

// Old links ending in /#download mean the Mac tool, so the id sits on the link that leads to it
const FOOT = [
  { href: "/presets/", label: "Presets" },
  { href: "/translations/", label: "Translations" },
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
    title: "Hear the page told another way.",
    body: "Key takeaways, or a line of your own like “explain it to a ten-year-old”. The voice reads the retelling in a pane under the page, and the page underlines the lines it comes from, with the word lamp on the key words.",
    note: "Presets are online and use credit. Listening to the page as printed is free.",
    href: "/presets/",
    more: "Presets",
  },
  {
    title: "The page and its translation, both lit.",
    body: "The sentence you hear lights in both languages, and the word being spoken lights in the other language too. You learn the word where you met it.",
    note: "Two-language books come with the app. Translating your own is online and uses credit.",
    src: "/demos/tax-notice.webp",
    alt: "A German tax notice open in Libratory: the sentence asking for payment is marked with “zahlen Sie” lit, and below it the English sentence with “pay” lit.",
    href: "/translations/",
    more: "Translations",
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
      capture={{
        src: "/demos/word-pairs.webp",
        alt: "A page in English and German in Libratory: the sentence being read is marked in both languages, and the word “both” is marked together with “beide”.",
        focus: "0%",
        plain: { width: 1170, height: 1519 },
      }}
      footer={FOOT}
    >
      <Scenes scenes={SCENES} />
      <Doors doors={DOORS} title="And what people read with it" />
      <Small>
        Listening is free with the voices already on your iPhone. No account. It works without internet. PDF, EPUB, or a photo of the page.
      </Small>
    </Landing>
  );
}
