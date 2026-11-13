import { Landing } from "../components/Landing.tsx";

const FOOT = [
  { href: "/", label: "Home" },
  { href: "/reader/privacy/", label: "Privacy" },
];

const PROOFS = [
  { title: "One photo per page.", body: "Hold the book flat. The iPhone reads the text itself; nothing is uploaded." },
  { title: "The page stays.", body: "Your page is on the screen with the sentence you are hearing marked on it." },
  { title: "Your book, your ears.", body: "The scan stays on your phone. There is no way to send it to anyone." },
];

export function Books() {
  return (
    <Landing
      headline="Listen to the books on your shelf, a chapter at a time."
      line="Photograph tonight's chapter. Hear it tomorrow."
      free="Free. No account. Works without internet."
      demo="books"
      proofs={PROOFS}
      footer={FOOT}
    />
  );
}
