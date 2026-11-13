import { Landing } from "../components/Landing.tsx";

const FOOT = [
  { href: "/", label: "Home" },
  { href: "/learn/", label: "Two-language books" },
  { href: "/reader/privacy/", label: "Privacy" },
];

const PROOFS = [
  { title: "As written.", body: "Photograph the letter and hear it read in its own language, with a voice on your phone. That part is free." },
  { title: "Then in your language.", body: "Each sentence again in yours, marked on the letter. Translation is online and uses credit; you get some to try." },
  { title: "For deadlines, ask a person too.", body: "Machine translation of official language is good and not perfect." },
];

export function Languages() {
  return (
    <Landing
      headline="Hear a letter in the language it was written in. Then in yours."
      line="For the mail of your first year in a new country."
      free="Reading aloud is free. No account."
      demo="languages"
      proofs={PROOFS}
      footer={FOOT}
    />
  );
}
