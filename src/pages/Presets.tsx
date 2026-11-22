import { Landing } from "../components/Landing.tsx";
import { Columns, Honest, Small } from "../components/Verse.tsx";

const FOOT = [
  { href: "/", label: "Home" },
  { href: "/translations/", label: "Translations" },
  { href: "/study/", label: "Study" },
  { href: "/reader/privacy/", label: "Privacy" },
];

const COLUMNS = [
  { title: "Key takeaways.", body: "The page boiled down to what it says, read to you in the pane under it. Make it a section, a paragraph or the whole page, and change it while it plays." },
  { title: "Or your own line.", body: "Write how you want it read, like “explain it to a ten-year-old” or “explain it to an engineer”, and keep it as a preset. Every page after is read that way." },
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
      footer={FOOT}
    >
      <Columns columns={COLUMNS} />
      <Honest title="Check it against the page">
        A retelling can leave things out. That is what the underlines are for. Hold How it reads to go back to the page as printed, and if a passage can't be retold, it is read as printed with a short note saying why.
      </Honest>
      <Small>Key takeaways and presets are online, need an account and credit, and need iOS 26.2 or later. Your book stays on your phone; only the passage being retold is sent.</Small>
    </Landing>
  );
}
