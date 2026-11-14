import { Landing } from "../components/Landing.tsx";
import { Steps } from "../components/Verse.tsx";

const FOOT = [
  { href: "/", label: "Home" },
  { href: "/reader/privacy/", label: "Privacy" },
];

const STEPS = [
  { title: "Save it as a PDF.", body: "In Safari: Reader, then Share, Options, PDF, and open it in Libratory." },
  { title: "Press play.", body: "On the walk, at the sink, on the train. Once it is on your phone it needs no internet." },
  { title: "Set your speed.", body: "Down to 0.75× when the writing deserves it. Up to 2× when it doesn't." },
];

export function Articles() {
  return (
    <Landing
      long
      headline="“Read later” is where articles go to die."
      line="You saved it three weeks ago. It's still good. Press play."
      free="Free. No account. Works without internet."
      demo="articles"
      capture={{ src: "/demos/player.webp", alt: "Libratory's player on an iPhone: the chapter, a scrubber, pause and the speed.", focus: "88%" }}
      footer={FOOT}
    >
      <Steps steps={STEPS} />
    </Landing>
  );
}
