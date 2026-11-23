import { Landing } from "../components/Landing.tsx";
import { Columns, Small } from "../components/Verse.tsx";

const FOOT = [
  { href: "/", label: "Home" },
  { href: "/learn/", label: "Two-language books" },
  { href: "/reader/privacy/", label: "Privacy" },
];

const COLUMNS = [
  { title: "First as written.", body: "Photograph the letter or open the PDF, and hear it read in its own language with a voice on your phone. You hear how it sounds, which is half of learning it. That part is free." },
  { title: "Then in yours.", body: "Each sentence again in your language, under the letter. The word you hear lights in both, so “zahlen” and “pay” find each other. Translation is online and uses credit." },
];

export function Languages() {
  return (
    <Landing
      long
      headline="You speak the language fine. Until the tax office writes."
      line="The lease, the school form, the letter with a deadline in it. Hear it as written. Then hear it in yours."
      free="Reading aloud is free. No account."
      demo="languages"
      capture={{ src: "/demos/tax-notice.webp", alt: "A German tax notice open in Libratory: the sentence asking for payment is marked with “zahlen Sie” lit, and below it the English sentence with “pay” lit.", focus: "52%" }}
      footer={FOOT}
    >
      <Columns columns={COLUMNS} />
      <Small>The app's own menus are in English.</Small>
    </Landing>
  );
}
