import type { Clip } from "./Media.tsx";

// true puts the clips up; false shows each page's still in their place
export const CLIPS_ON = false;

export const RETOLD_CLIP: Clip = {
  src: "/clips/retold-page.mp4",
  poster: "/clips/retold-page-poster.webp",
  label: "Crime and Punishment as Key takeaways, read aloud under the page, 28 seconds with sound",
  width: 1170,
  height: 2532,
};

export const TRANSLATED_CLIP: Clip = {
  src: "/clips/page-and-translation.mp4",
  poster: "/clips/page-and-translation-poster.webp",
  label: "Crime and Punishment read in Russian and then English, the word lit in both, 30 seconds with sound",
  width: 1170,
  height: 2532,
};
