import { Landing } from "../components/Landing.tsx";

const FOOT = [
  { href: "/", label: "Home" },
  { href: "/reader/privacy/", label: "Privacy" },
];

const PROOFS = [
  { title: "Save it as a PDF.", body: "In Safari: Reader, then Share, Options, PDF, and open it in Libratory." },
  { title: "The page stays.", body: "The article is on the screen with its pictures, and the sentence you are hearing is marked." },
  { title: "Then no internet needed.", body: "Once it is on your phone it reads on a plane." },
];

export function Articles() {
  return (
    <Landing
      headline="Listen to that long article you saved."
      line="Save it as a PDF, open it in Libratory, press Play."
      free="Free. No account. Works without internet."
      demo="articles"
      proofs={PROOFS}
      footer={FOOT}
    />
  );
}
