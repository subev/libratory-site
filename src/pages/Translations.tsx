import { CLIPS_ON, GERMAN_CLIP } from "../components/clips.ts";
import { Landing } from "../components/Landing.tsx";
import { Columns, Small } from "../components/Verse.tsx";

const FOOT = [
  { href: "/", label: "Home" },
  { href: "/presets/", label: "Presets" },
  { href: "/languages/", label: "Letters" },
  { href: "/learn/", label: "Two-language books" },
  { href: "/reader/privacy/", label: "Privacy" },
];

const COLUMNS = [
  { title: "Both, lit.", body: "The original on top, the translation under it. As the voice reads, the sentence and the word light in both, so “Mann” and “man” find each other." },
  { title: "Your order.", body: "Hear the original first and then yours, the other way round, or only one of them. Tap a word in the other language to hear that sentence its way." },
  { title: "Your own pages.", body: "A PDF, an EPUB, or a photo of the letter that came in the post. Or start with a two-language book that comes with the app." },
];

export function Translations() {
  return (
    <Landing
      long
      headline="A translation you can't check is a rumour."
      line="Your page and its translation together. The sentence you hear lights in both languages, and so does the word being spoken."
      free="Listening to the original is free. No account."
      demo="translations"
      capture={{ src: "/demos/german-reader.webp", alt: "A German reader for beginners from 1908, in Fraktur, open in Libratory with “ein Mann” lit in the first sentence, and under it the English, “Once upon a time there was a man”, with “man” lit.", focus: "0%", plain: { width: 1170, height: 1620 } }}
      clip={CLIPS_ON ? GERMAN_CLIP : undefined}
      footer={FOOT}
    >
      <Columns columns={COLUMNS} />
      <Small>Translating your own pages is online, needs an account and uses credit. The app's own menus are in English.</Small>
    </Landing>
  );
}
