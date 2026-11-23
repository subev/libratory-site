import { CLIPS_ON, GERMAN_CLIP, SIMPLE_CLIP, VERSE_CLIP } from "../components/clips.ts";
import { Landing } from "../components/Landing.tsx";
import { Doors, Scenes, Small, type Scene } from "../components/Verse.tsx";

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

const SCENES: Scene[] = [
  {
    title: "Hear the page told another way.",
    body: "Key takeaways, or a line of your own like “explain it to a five-year-old” or “rhymed English verse”. The voice reads the retelling in a pane under the page, and the page underlines the lines it comes from, with the word lamp on the key words.",
    note: "Presets are online and use credit. Listening to the page as printed is free.",
    src: "/demos/page-key-words.webp",
    alt: "Kant’s Critique of Pure Reason, the page “Of Space”, open in Libratory, the key phrase “we can imagine one space only” strongly underlined and the sentences around it lightly, and under it the pane Explain it to a five-year-old with “sandbox” lit.",
    plain: { width: 1170, height: 1450 },
    clip: CLIPS_ON ? SIMPLE_CLIP : undefined,
    href: "/presets/",
    more: "Presets",
  },
  {
    title: "The page and its translation, both lit.",
    body: "The sentence you hear lights in both languages, and the word being spoken lights in the other language too. You learn the word where you met it.",
    note: "Two-language books come with the app. Translating your own is online and uses credit.",
    src: "/demos/german-reader.webp",
    alt: "A German reader for beginners from 1908, in Fraktur, open in Libratory with “ein Mann” lit in the first sentence, and under it the English, “Once upon a time there was a man”, with “man” lit.",
    plain: { width: 1170, height: 1620 },
    clip: CLIPS_ON ? GERMAN_CLIP : undefined,
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
      capture={{ src: "/demos/verse-key-line.webp", alt: "Nekrasov’s poem «Пьяница» in old Russian type open in Libratory, the key line «Все та же хата бѣдная» strongly underlined and the lines around it lightly, and under it the Rhymed English verse pane, “The same poor hut is all you see”, with “hut” lit.", focus: "0%", plain: { width: 1170, height: 1496 } }}
      clip={CLIPS_ON ? VERSE_CLIP : undefined}
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
