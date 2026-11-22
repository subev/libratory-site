import { Landing } from "../components/Landing.tsx";
import { Columns, Honest, Small } from "../components/Verse.tsx";

const FOOT = [
  { href: "/", label: "Home" },
  { href: "/presets/", label: "Presets" },
  { href: "/languages/", label: "Letters" },
  { href: "/learn/", label: "Two-language books" },
  { href: "/reader/privacy/", label: "Privacy" },
];

const COLUMNS = [
  { title: "Both, lit.", body: "The original on top, the translation under it. As the voice reads, the sentence and the word light in both, so “zahlen” and “pay” find each other." },
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
      capture={{ src: "/demos/tax-notice.webp", alt: "A German tax notice open in Libratory: the sentence asking for payment is marked with “zahlen Sie” lit, and below it the English sentence with “pay” lit.", focus: "52%" }}
      footer={FOOT}
    >
      <Columns columns={COLUMNS} />
      <Honest title="For deadlines, ask a person too">
        Machine translation is good and not perfect. That is why the original stays lit above it. The app's own menus are in English.
      </Honest>
      <Small>Translating your own pages is online, needs an account and uses credit.</Small>
    </Landing>
  );
}
