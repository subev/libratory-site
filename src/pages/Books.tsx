import { Landing } from "../components/Landing.tsx";
import { Honest, Small, Steps } from "../components/Verse.tsx";

const FOOT = [
  { href: "/", label: "Home" },
  { href: "/reader/privacy/", label: "Privacy" },
];

const STEPS = [
  { title: "Lay it open.", body: "Photograph two pages at once. The iPhone reads the print itself; nothing is uploaded." },
  { title: "Press play.", body: "The voice reads your own copy: the same pages, the same print, the sentence marked as it is spoken." },
  { title: "Put the phone in your pocket.", body: "It reads with the screen locked, at your speed, and remembers where you stopped." },
];

export function Books() {
  return (
    <Landing
      long
      headline="You already bought the book. Why are you paying again to hear it?"
      line="It's on your shelf. It's yours. Nobody said eyes only."
      free="Free. No account. Works without internet."
      demo="books"
      capture={{
        src: "/demos/photographed-page.webp",
        alt: "A photographed page of a printed novel in Libratory, the sentence being read aloud marked on the print and the spoken word marked inside it.",
        focus: "0%",
        plain: { width: 1170, height: 1066 },
      }}
      footer={FOOT}
    >
      <Steps steps={STEPS} />
      <Honest>
        It struggles with curved pages and poor light. Hold the book flat, near a window. A whole book is a lot of photographs, so do a chapter at a time. If you have the PDF or the EPUB, open that and skip the camera.
      </Honest>
      <Small>For the books you own, for your own ears. The scan stays on your phone.</Small>
    </Landing>
  );
}
