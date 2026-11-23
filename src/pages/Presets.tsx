import { CLIPS_ON, SIMPLE_CLIP } from "../components/clips.ts";
import { Landing } from "../components/Landing.tsx";
import { Columns, Small } from "../components/Verse.tsx";

const FOOT = [
  { href: "/", label: "Home" },
  { href: "/translations/", label: "Translations" },
  { href: "/study/", label: "Study" },
  { href: "/reader/privacy/", label: "Privacy" },
];

const COLUMNS = [
  { title: "Key takeaways.", body: "The page boiled down to what it says, read to you in the pane under it. Make it a section, a paragraph or the whole page, and change it while it plays." },
  { title: "Or your own line.", body: "Write how you want it read, like “explain it to a five-year-old” or “rhymed English verse”, and keep it as a preset. Every page after is read that way." },
  { title: "The page keeps score.", body: "A light underline on the lines being retold, a stronger one and the word lamp on the key words. Tap a word in the pane to listen from there." },
];

export function Presets() {
  return (
    <Landing
      long
      headline="Don't trust a summary. Watch where it comes from."
      line="Hear the page told another way, in a pane under it. While the voice reads, the page underlines the lines each part comes from and lights the key words."
      free="Reading the page as printed is free. No account."
      demo="presets"
      capture={{ src: "/demos/page-explained.webp", alt: "Kant’s Critique of Pure Reason, the page “Of Space”, open in Libratory, the lines being explained underlined, and under it the pane Explain it to a five-year-old with “spaces” lit.", focus: "0%", plain: { width: 1170, height: 1440 } }}
      clip={CLIPS_ON ? SIMPLE_CLIP : undefined}
      footer={FOOT}
    >
      <Columns columns={COLUMNS} />
      <Small>Key takeaways and presets are online, need an account and credit, and need iOS 26.2 or later. Your book stays on your phone; only the passage being retold is sent.</Small>
    </Landing>
  );
}
