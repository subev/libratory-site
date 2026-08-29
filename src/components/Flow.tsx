type Stage = "in" | "work" | "out";

type NodeSpec = {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  sub: string;
  stage: Stage;
  mono?: boolean;
  accent?: boolean;
};

// The same ramp the live panels below use for 1 · Input, 2 · Work and 3 · Output
const STAGE: Record<Stage, string> = {
  in: "var(--brass)",
  work: "var(--ember-bright)",
  out: "var(--green)",
};

// Everything is centred on the spine at y=212, so a node that moves takes its connector's control
// points with it — which is why the coordinates and the paths live together in this file
const NODES: NodeSpec[] = [
  { stage: "in", x: 8, y: 122, w: 204, h: 80, title: "Drop a PDF", sub: "OCR when the scan needs it" },
  { stage: "in", x: 8, y: 222, w: 204, h: 80, title: "POST /api/books", sub: "scripts, feeds, other apps", mono: true },
  { stage: "work", x: 296, y: 166, w: 212, h: 92, title: "Extract", sub: "text and chapters" },
  { stage: "work", x: 592, y: 166, w: 212, h: 92, title: "Narrate", sub: "local or cloud voice" },
  { stage: "out", x: 872, y: 100, w: 200, h: 64, title: "M4B audiobook", sub: "chapters, cover" },
  { stage: "out", x: 872, y: 180, w: 200, h: 64, title: "PDF · EPUB", sub: "the chapters you pick" },
  { stage: "out", x: 872, y: 260, w: 200, h: 64, title: "Synced EPUB", sub: "audio and text together" },
];

const LOOP: NodeSpec = {
  stage: "work",
  accent: true,
  x: 340,
  y: 340,
  w: 420,
  h: 80,
  title: "Translate · rewrite · clean up",
  sub: "every variant kept beside the original",
};

// Tips stop 4–6px short of an edge so the arrowhead never touches a card stroke
const PATHS = [
  "M212 162 C 252 162, 254 212, 290 212",
  "M212 262 C 252 262, 254 212, 290 212",
  "M508 212 L 586 212",
  "M804 212 C 840 212, 836 132, 866 132",
  "M804 212 L 866 212",
  "M804 212 C 840 212, 836 292, 866 292",
];

const LOOP_PATHS = ["M402 258 L 402 334", "M698 340 L 698 264"];

const RAILS: { stage: Stage; label: string; x1: number; x2: number }[] = [
  { stage: "in", label: "1 · IN", x1: 8, x2: 212 },
  { stage: "work", label: "2 · WORK", x1: 296, x2: 804 },
  { stage: "out", label: "3 · OUT", x1: 872, x2: 1072 },
];

const STEPS = [
  { title: "In", body: "A PDF you drop, or a book posted to the JSON API by a script." },
  { title: "Extract", body: "Text back in seconds, chapters detected or drawn by hand. OCR when the scan needs it." },
  { title: "Transform, as often as you like", body: "Translate, rewrite, clean up. Every variant is kept beside the original and can be narrated on its own." },
  { title: "Narrate", body: "A local model, a macOS system voice, or a cloud engine if you have a key." },
  { title: "Out", body: "An M4B with real chapter markers, a PDF or EPUB of the chapters you pick, or a synced EPUB carrying audio and text together." },
];

function Node({ x, y, w, h, title, sub, stage, mono, accent }: NodeSpec) {
  const titleSize = h >= 92 ? 23 : w >= 204 ? 21 : 18;
  const titleY = y + (h >= 92 ? 42 : h >= 80 ? 36 : 28);
  const subY = titleY + (h >= 92 ? 23 : h >= 80 ? 22 : 21);
  const center = x + w / 2;

  return (
    <g>
      {/* The stage reads off the card's own outline; a coloured rule on top of each of eight cards
          stacked into a third horizontal echo under the section rule and the rails */}
      <rect
        x={x} y={y} width={w} height={h} rx="10"
        fill="var(--bg-raised)"
        stroke={STAGE[stage]}
        strokeOpacity={accent ? 0.6 : 0.28}
      />
      <text
        x={center} y={titleY} textAnchor="middle"
        className={mono ? "font-mono" : "font-display"}
        fontSize={mono ? titleSize - 5 : titleSize}
        fontWeight="600"
        fill="var(--text-primary)"
      >
        {title}
      </text>
      <text x={center} y={subY} textAnchor="middle" className="font-body" fontSize={w <= 204 ? 13.5 : 14.5} fill="var(--text-muted)">
        {sub}
      </text>
    </g>
  );
}

export function Flow() {
  return (
    <>
      <svg
        viewBox="0 0 1080 452"
        className="hidden w-full sm:block"
        role="img"
        aria-label="Two ways in — a dropped PDF or the JSON API — through Extract and Narrate, with an optional translate, rewrite and clean-up loop between them, out to an M4B audiobook, a PDF or EPUB, or a synced EPUB."
      >
        <defs>
          <marker id="tip" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0 0 L10 5 L0 10 z" fill="var(--brass)" />
          </marker>
          <marker id="tip-ember" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0 0 L10 5 L0 10 z" fill="var(--ember-bright)" />
          </marker>
        </defs>

        {RAILS.map((rail) => (
          <g key={rail.label}>
            <text x={rail.x1} y="26" className="font-body" fontSize="13" letterSpacing="2.6" fill={STAGE[rail.stage]}>
              {rail.label}
            </text>
            <line x1={rail.x1} y1="40" x2={rail.x2} y2="40" stroke={STAGE[rail.stage]} strokeOpacity="0.4" />
          </g>
        ))}

        <g stroke="var(--brass)" strokeOpacity="0.5" strokeWidth="1.25" fill="none" markerEnd="url(#tip)">
          {PATHS.map((d) => <path key={d} d={d} />)}
        </g>

        <g stroke="var(--ember-bright)" strokeOpacity="0.85" strokeWidth="1.25" fill="none" markerEnd="url(#tip-ember)">
          {LOOP_PATHS.map((d) => <path key={d} d={d} />)}
        </g>

        {NODES.map((node) => <Node key={node.title} {...node} />)}

        <Node {...LOOP} />
        <text x={LOOP.x + LOOP.w / 2} y="440" textAnchor="middle" className="font-body" fontSize="14" fill="var(--brass)">
          optional, and as often as you like
        </text>
      </svg>

      <ol className="space-y-7 sm:hidden">
        {STEPS.map((step) => (
          <li key={step.title} className="border-l border-edge pl-5">
            <h3 className="text-xl">{step.title}</h3>
            <p className="mt-1 text-ink-muted">{step.body}</p>
          </li>
        ))}
      </ol>
    </>
  );
}
