import { Landing } from "../components/Landing.tsx";
import { Columns, Explained, Small } from "../components/Verse.tsx";

const FOOT = [
  { href: "/", label: "Home" },
  { href: "/reader/privacy/", label: "Privacy" },
];

const COLUMNS = [
  { title: "First as printed.", body: "The voice reads the page word for word, with the sentence and the word lit. That part is free and stays on your phone." },
  { title: "Then only what matters.", body: "Key takeaways: the page boiled down to what it claims, read to you in the same voice." },
  { title: "Then your way.", body: "Write one line, like “explain it to a ten-year-old” or “explain it to an engineer”, and every page is read to you like that." },
];

const PRINTED = {
  label: "As printed",
  text: "A colony of honeybees is not a crowd of separate insects but a single animal spread across fifty thousand bodies. When it grows too large for its home, it does what any living thing does when it outgrows its skin: it divides.",
  audio: "/demos/study-as-printed.m4a",
  listen: "Hear the page as printed",
};

const TAKEAWAYS = {
  label: "Key takeaways",
  text: "A honeybee colony acts as “a single animal spread across fifty thousand bodies,” splitting its colony in two when it outgrows its home. A swarm signals a strong colony, not a failure; the true cost is honey, since an early-summer swarm rarely fills its supers.",
  audio: "/demos/study-key-takeaways.m4a",
  listen: "Hear the key takeaways of the page",
};

const TEN = {
  label: "“Explain it to a ten-year-old.”",
  text: "Imagine one bee colony — about fifty thousand bees — as if it were a single, huge animal living in many little bodies. When that “animal” gets too big for its home, it does the same thing your body does when you outgrow your clothes or your skin: it splits apart.",
  audio: "/demos/study-for-a-ten-year-old.m4a",
  listen: "Hear the page explained to a ten-year-old",
};

export function Study() {
  return (
    <Landing
      long
      headline="You've read it four times. Maybe you're a listener."
      line="Hear the page read to you. Then hear it explained like you're ten, or boiled down to what matters."
      free="Reading aloud is free. No account."
      demo="study"
      capture={{ src: "/demos/study.webp", alt: "A page of a book open in Libratory on an iPhone: the sentence being read aloud is marked, and the word being spoken is marked inside it.", focus: "17%" }}
      footer={FOOT}
    >
      <Explained
        title="One page. Three ways to hear it."
        printed={PRINTED}
        explained={TAKEAWAYS}
        more={TEN}
        note="The opening of a chapter on why bees swarm. Each box shows how that reading begins; press play to hear the whole page. The words and the voice are the app's own, unedited."
      />
      <Columns columns={COLUMNS} />
      <Small>Key takeaways and your own angles are online, need sign-in and use credit. For anything that matters, check it against the page.</Small>
    </Landing>
  );
}
