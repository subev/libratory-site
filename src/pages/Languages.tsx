import { Landing } from "../components/Landing.tsx";

const FOOT = [
  { href: "/", label: "Home" },
  { href: "/learn/", label: "Two-language books" },
  { href: "/reader/privacy/", label: "Privacy" },
];

const PROOFS = [
  { title: "As written.", body: "Photograph the letter and hear it read in its own language, with a voice on your phone. That part is free." },
  { title: "Then in your language.", body: "Each sentence again in yours, marked on the letter. Translation is online and uses credit; you get some to try." },
];

export function Languages() {
  return (
    <Landing
      headline="Hear your mail as written. Then in your language."
      line="For the mail of your first year in a new country."
      free="Reading aloud is free. No account."
      note={{ title: "For deadlines, ask a person too.", body: "Machine translation of official language is good and not perfect." }}
      demo="languages"
      proofs={PROOFS}
      footer={FOOT}
    />
  );
}
