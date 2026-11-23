import type { Clip } from "./Media.tsx";

// true puts the clips up; false shows each page's still in their place. Turned on only after a person has played them with sound.
export const CLIPS_ON = false;

/** Home: an old Russian poem heard as rhymed English verse */
export const VERSE_CLIP: Clip = {
  src: "/clips/verse-retold.mp4",
  poster: "/clips/verse-retold-poster.webp",
  label: "A page of Nekrasov's poem “The Drunkard” in old Russian type, heard as rhymed English verse in the pane under it, its key line underlined on the page, 21 seconds with sound",
  width: 1170,
  height: 2532,
};

/** Presets: a hard page explained to a five-year-old */
export const SIMPLE_CLIP: Clip = {
  src: "/clips/page-explained.mp4",
  poster: "/clips/page-explained-poster.webp",
  label: "A page of Kant's Critique of Pure Reason explained to a five-year-old in the pane under it, its key phrases underlined on the page, 29 seconds with sound",
  width: 1170,
  height: 2532,
};

/** Translations: a German beginner's reader, the word lit in both languages */
export const GERMAN_CLIP: Clip = {
  src: "/clips/german-reader.mp4",
  poster: "/clips/german-reader-poster.webp",
  label: "A German reader for beginners from 1908 read in German and then in English, each word lit with its partner, 21 seconds with sound",
  width: 1170,
  height: 2532,
};
