import { Landing } from "../components/Landing.tsx";
import { Columns, Honest } from "../components/Verse.tsx";

const FOOT = [
  { href: "/", label: "Home" },
  { href: "/learn/", label: "Two-language books" },
  { href: "/reader/privacy/", label: "Privacy" },
];

const COLUMNS = [
  { title: "First as written.", body: "Photograph the letter or open the PDF, and hear it read in its own language with a voice on your phone. You hear how it sounds, which is half of learning it. That part is free." },
  { title: "Then in yours.", body: "Each sentence again in your language, marked on the letter, so you always know which sentence you are in. Translation is online and uses credit." },
];

export function Languages() {
  return (
    <Landing
      long
      headline="You speak the language fine. Until the tax office writes."
      line="The lease, the school form, the letter with a deadline in it. Hear it as written. Then hear it in yours."
      free="Reading aloud is free. No account."
      demo="languages"
      capture={{ src: "/demos/two-languages.webp", alt: "A book in English and German open in Libratory, the sentence being read marked in both languages.", focus: "22%" }}
      footer={FOOT}
    >
      <Columns columns={COLUMNS} />
      <Honest title="For deadlines, ask a person too">
        Machine translation of official language is good and not perfect. The app's own menus are in English.
      </Honest>
    </Landing>
  );
}
