import { Landing } from "../components/Landing.tsx";

const FOOT = [
  { href: "/", label: "Home" },
  { href: "/reader/privacy/", label: "Privacy" },
];

const PROOFS = [
  { title: "The page as printed.", body: "Figures, tables and formulas stay where the author put them, with the sentence you are hearing marked." },
  { title: "PDF or paper.", body: "Open a file, or photograph the pages of a book you own." },
  { title: "Offline.", body: "Reading aloud happens on the phone, so it works on a plane or in a basement library." },
];

export function Study() {
  return (
    <Landing
      headline="Hear the paper. Keep the figures."
      line="Open the PDF or photograph the chapter, and listen with the page as printed."
      free="Free. No account. Works without internet."
      demo="study"
      proofs={PROOFS}
      footer={FOOT}
    />
  );
}
