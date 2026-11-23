import type { Clip } from "./Media.tsx";

// One switch per clip: true only after a person has played it with sound. false shows the page's still in its place.
const ON = {
  verse: true,
  explained: false,
  german: false,
};

/** Home: an old Russian poem heard as rhymed English verse */
export const VERSE_CLIP: Clip | undefined = ON.verse
  ? {
    src: "/clips/verse-rhymed.mp4",
    poster: "/clips/verse-rhymed-poster.webp",
    label: "A page of Nekrasov's poem “The Drunkard” in old Russian type, heard as rhymed English verse in the pane under it, its key lines underlined on the page, 35 seconds with sound",
    width: 1170,
    height: 2532,
  }
  : undefined;

/** Presets: a hard page explained to a five-year-old */
export const SIMPLE_CLIP: Clip | undefined = ON.explained
  ? {
    src: "/clips/page-explained.mp4",
    poster: "/clips/page-explained-poster.webp",
    label: "A page of Kant's Critique of Pure Reason explained to a five-year-old in the pane under it, its key phrases underlined on the page, 29 seconds with sound",
    width: 1170,
    height: 2532,
  }
  : undefined;

/** Translations: a German beginner's reader, the word lit in both languages */
export const GERMAN_CLIP: Clip | undefined = ON.german
  ? {
    src: "/clips/german-reader.mp4",
    poster: "/clips/german-reader-poster.webp",
    label: "A German reader for beginners from 1908 read in German and then in English, each word lit with its partner, 21 seconds with sound",
    width: 1170,
    height: 2532,
  }
  : undefined;
