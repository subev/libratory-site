import { Landing } from "../components/Landing.tsx";

const FOOT = [
  { href: "/", label: "Home" },
  { href: "/reader/privacy/", label: "Privacy" },
];

const PROOFS = [
  { title: "Every clause, read to you.", body: "At your speed, with the page on the screen. It is harder to skip a paragraph someone is reading aloud." },
  { title: "It stays on your phone.", body: "The photos are read on the iPhone and are not uploaded." },
  { title: "Not a lawyer.", body: "It tells you what the paper says. It does not tell you whether to sign." },
];

export function Documents() {
  return (
    <Landing
      headline="Hear the small print before you sign."
      line="Photograph the contract and listen to every clause."
      free="Scanning and reading aloud are free. No account."
      demo="documents"
      proofs={PROOFS}
      footer={FOOT}
    />
  );
}
