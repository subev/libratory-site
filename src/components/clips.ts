import type { Clip } from "./Media.tsx";

// true puts the clips up; false shows each page's still in their place. Turned on only after a person has played them with sound.
export const CLIPS_ON = false;

/** Home: an old Russian poem heard as rhymed English verse */
export const VERSE_CLIP: Clip = {
  src: "/clips/verse-retold.mp4",
  poster: "/clips/verse-retold-poster.webp",
  label: "A page of Nekrasov's poem “The Drunkard” in old Russian type, heard as rhymed English verse in the pane under it, 29 seconds with sound",
  width: 1170,
  height: 2532,
};

/** Presets: a hard page explained to a five-year-old */
export const SIMPLE_CLIP: Clip = {
  src: "/clips/page-explained.mp4",
  poster: "/clips/page-explained-poster.webp",
  label: "A page of Kant's Critique of Pure Reason explained to a five-year-old, read aloud in the pane under it, 28 seconds with sound",
  width: 1170,
  height: 2532,
};

/** Translations: a German beginner book, the word lit in both languages. Not recorded yet */
export const GERMAN_CLIP: Clip | undefined = undefined;
