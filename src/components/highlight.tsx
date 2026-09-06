import { useEffect, useState, type RefObject } from "react";
import { CUES } from "./cues.ts";

type Rect = { x: number; y: number; w: number; h: number };

type Span = { start: number; from: number; to: number };

export const SENTENCES: Span[] = [];
CUES.forEach(([, a, , s], i) => {
  const span = SENTENCES[s];
  if (span) span.to = i;
  else SENTENCES[s] = { start: a, from: i, to: i };
});

/** Where the wall clock wraps until the clip's own duration is known */
export const CUE_END = CUES[CUES.length - 1]?.[2] ?? 0;

function activeSentence(ms: number) {
  for (let i = SENTENCES.length - 1; i >= 0; i--) {
    const span = SENTENCES[i];
    if (span && ms >= span.start) return i;
  }
  return -1;
}

/** One rect per visual line, so a sentence wrapping mid-page is lit as the reader sees it. */
function lineRects(rects: Rect[], from: number, to: number) {
  const lines = new Map<number, { x1: number; x2: number; y: number; h: number }>();
  for (let i = from; i <= to; i++) {
    const r = rects[i];
    if (!r) continue;
    const key = Math.round(r.y / 4);
    const line = lines.get(key);
    if (!line) lines.set(key, { x1: r.x, x2: r.x + r.w, y: r.y, h: r.h });
    else {
      line.x1 = Math.min(line.x1, r.x);
      line.x2 = Math.max(line.x2, r.x + r.w);
      line.y = Math.min(line.y, r.y);
    }
  }
  return [...lines.values()];
}

/**
 * The app draws these from cues.json; here they are measured off the rendered words, so the
 * geometry is the real page geometry rather than numbers typed by hand.
 */
export function useWordRects(ref: RefObject<HTMLElement | null>) {
  const [rects, setRects] = useState<Rect[]>([]);

  useEffect(() => {
    const page = ref.current;
    if (!page) return;
    const measure = () => {
      const base = page.getBoundingClientRect();
      setRects([...page.querySelectorAll("[data-word]")].map((node) => {
        const r = node.getBoundingClientRect();
        return { x: r.left - base.left, y: r.top - base.top, w: r.width, h: r.height };
      }));
    };
    measure();
    // The body serif swaps in after first paint and every word moves with it
    document.fonts?.ready.then(measure).catch(() => {});
    const observer = new ResizeObserver(measure);
    observer.observe(page);
    return () => observer.disconnect();
  }, [ref]);

  return rects;
}

export function Highlight({ rects, ms, line, word: wordColor }: {
  rects: Rect[];
  ms: number;
  line: string;
  word: string;
}) {
  const measured = rects.length === CUES.length;
  const sentence = activeSentence(ms);
  const range = sentence >= 0 ? SENTENCES[sentence] : undefined;
  const index = CUES.findIndex(([, a, b]) => ms >= a && ms < b);
  const word = measured && index >= 0 ? rects[index] : undefined;

  return (
    <div className="pointer-events-none absolute inset-0 z-[2]">
      {measured && range
        ? lineRects(rects, range.from, range.to).map((at, i) => (
            <span
              key={i}
              className="absolute rounded-[2px] mix-blend-multiply"
              style={{ background: line, left: at.x1 - 2, top: at.y - 1, width: at.x2 - at.x1 + 4, height: at.h + 2 }}
            />
          ))
        : null}
      <span
        className="absolute rounded-[2px] mix-blend-multiply"
        style={{
          background: wordColor,
          left: word ? word.x - 1 : 0,
          top: word ? word.y : 0,
          width: word ? word.w + 2 : 0,
          height: word ? word.h : 0,
          opacity: word ? 1 : 0,
          transition: "left 140ms ease-out, top 140ms ease-out, width 140ms ease-out, opacity 120ms linear",
        }}
      />
    </div>
  );
}
