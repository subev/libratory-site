import { REPO } from "../components/Chrome.tsx";
import { Landing } from "../components/Landing.tsx";

// Old links ending in /#download mean the Mac tool, so the id sits on the link that leads to it
const FOOT = [
  { href: "/books/", label: "Books" },
  { href: "/study/", label: "Study" },
  { href: "/mac/", label: "For your Mac", id: "download" },
  { href: "/reader/privacy/", label: "Privacy" },
  { href: `${REPO}/issues`, label: "Support" },
];

const PROOFS = [
  { title: "The page stays.", body: "The page you photographed is on the screen, and the sentence you are hearing is marked on it." },
  { title: "Listen anywhere.", body: "It reads with the screen locked, at your speed, and remembers where you stopped." },
  { title: "It stays on your phone.", body: "The photos are read on the iPhone and are not uploaded." },
];

export function Home() {
  return (
    <Landing
      headline="Point your iPhone at a page. It reads it to you."
      line="A chapter of a book you own, a letter, a contract, a PDF."
      free="Free. No account. Works without internet."
      demo="home"
      proofs={PROOFS}
      footer={FOOT}
    />
  );
}
