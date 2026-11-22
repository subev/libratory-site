import type { Clip } from "./Media.tsx";

// Off until a person has played both clips through; then the files are committed and this turns on
export const CLIPS_PLAYED = false;

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
  label: "Crime and Punishment read in Russian and then English, the word lit in both, 28 seconds with sound",
  width: 1170,
  height: 2532,
};
