import { SIMPLE_CLIP } from "../components/clips.ts";
import { Landing } from "../components/Landing.tsx";
import { Columns, Scenes, Small, type Scene } from "../components/Verse.tsx";

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

// The credit figure on each row is painted out until Petur says to show it; the screen as it is waits untracked as presets-list-credits.webp
const YOURS: Scene[] = [
  {
    title: "Key takeaways is only the start.",
    body: "Say or write how you want to listen, in your own words, and it becomes your own preset, there for every page after. Four of them here: “Rhymed English verse”, “Explain it to a five-year-old”, “For an engineer” and “Only the argument, no examples”.",
    note: "Key takeaways comes built in. The rest is up to you.",
    src: "/demos/presets-list.webp",
    alt: "How it reads in Libratory, open over a page of Capital: Read as printed, Key takeaways built in, and four presets marked yours, “Rhymed English verse”, “Explain it to a five-year-old”, “For an engineer” and “Only the argument, no examples”, then New preset…, Say or write how you want to listen.",
    plain: { width: 1170, height: 2300 },
  },
];

export function Presets() {
  return (
    <Landing
      long
      headline="Don't trust a summary. Watch where it comes from."
      line="Hear the page told another way, in a pane under it. While the voice reads, the page underlines the lines each part comes from and lights the key words."
      free="Reading the page as printed is free. No account."
      demo="presets"
      capture={{ src: "/demos/capital-explained.webp", alt: "A page of Marx’s Capital open in Libratory, “resold for £100+£10 or £110” strongly underlined and the lines around it lightly, and under it the pane Explain it to a five-year-old, “A man buys cotton for 100 pounds. Later he sells it for 110 pounds.”, with “Later” lit.", focus: "0%", plain: { width: 1170, height: 1440 } }}
      clip={SIMPLE_CLIP}
      footer={FOOT}
    >
      <Scenes scenes={YOURS} />
      <Columns columns={COLUMNS} />
      <Small>Key takeaways and presets are online, need an account and credit, and need iOS 26.2 or later. Your book stays on your phone; only the passage being retold is sent.</Small>
    </Landing>
  );
}
