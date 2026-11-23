import type { Clip } from "./Media.tsx";

// One switch per clip: true only after a person has played it with sound. false shows the page's still in its place.
const ON = {
  verse: true,
  german: true,
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

/** Presets: a hard page explained to a five-year-old (a page of Capital with the money formulas, to come). Words only until then */
export const SIMPLE_CLIP: Clip | undefined = undefined;

/** Translations: a German beginner's reader, the word lit in both languages */
export const GERMAN_CLIP: Clip | undefined = ON.german
  ? {
    src: "/clips/german-tale.mp4",
    poster: "/clips/german-tale-poster.webp",
    label: "A German reader for beginners from 1908 read in German and then in English, each word lit with its partner, 21 seconds with sound",
    width: 1170,
    height: 2532,
  }
  : undefined;
