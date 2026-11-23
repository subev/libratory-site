import type { Clip, ClipPairing } from "./Media.tsx";

// One switch per clip: true only after a person has played it with sound. false shows the page's still in its place.
const ON = {
  verse: true,
  literal: true,
  capital: true,
  german: true,
};

/** An old Russian poem heard as rhymed English verse */
export const VERSE_CLIP: Clip | undefined = ON.verse
  ? {
    src: "/clips/verse-rhymed.mp4",
    poster: "/clips/verse-rhymed-poster.webp",
    label: "A page of Nekrasov's poem “The Drunkard” in old Russian type, heard as rhymed English verse in the pane under it, its key lines underlined on the page, 35 seconds with sound",
    width: 1170,
    height: 2532,
  }
  : undefined;

/** The same page read in Russian, then word for word in English */
export const LITERAL_CLIP: Clip | undefined = ON.literal
  ? {
    src: "/clips/verse-literal.mp4",
    poster: "/clips/verse-literal-poster.webp",
    label: "The same page of Nekrasov read in Russian, then translated word for word into English, each word lit with its partner, 34 seconds with sound",
    width: 1170,
    height: 2532,
  }
  : undefined;

/** The two Nekrasov clips side by side; with one of them pulled, the other shows alone */
export const VERSE_PAIR: ClipPairing | undefined = LITERAL_CLIP && VERSE_CLIP
  ? { first: LITERAL_CLIP, firstLabel: "Word for word", second: VERSE_CLIP, secondLabel: "As verse" }
  : undefined;

/** Presets: a hard page explained to a five-year-old */
export const SIMPLE_CLIP: Clip | undefined = ON.capital
  ? {
    src: "/clips/capital-explained.mp4",
    poster: "/clips/capital-explained-poster.webp",
    label: "A page of Marx's Capital, the cotton bought for £100 and resold for £110, explained to a five-year-old in the pane under it, its key phrases underlined on the page, 30 seconds with sound",
    width: 1170,
    height: 2532,
  }
  : undefined;

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
