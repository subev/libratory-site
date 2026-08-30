type Stage = "in" | "work" | "out";

type Copy = { title: string; sub: string; mono?: boolean };

type NodeSpec = Copy & {
  x: number;
  y: number;
  w: number;
  h: number;
  stage: Stage;
  accent?: boolean;
};

// The same ramp the live panels below use for 1 · Input, 2 · Work and 3 · Output
const STAGE: Record<Stage, string> = {
  in: "var(--brass)",
  work: "var(--ember-bright)",
  out: "var(--green)",
};

// The wording is written once and laid out twice — landscape on a desktop, portrait on a phone
const COPY = {
  pdf: { title: "Drop a PDF", sub: "OCR when the scan needs it" },
  api: { title: "POST /api/books", sub: "scripts, feeds, other apps", mono: true },
  extract: { title: "Extract", sub: "text and chapters" },
  narrate: { title: "Narrate", sub: "local or cloud voice" },
  loop: { title: "Translate · rewrite · clean up", sub: "every variant kept beside the original" },
  m4b: { title: "M4B audiobook", sub: "chapters, cover" },
  docs: { title: "PDF · EPUB", sub: "the chapters you pick" },
  synced: { title: "Synced EPUB", sub: "audio and text together" },
} satisfies Record<string, Copy>;

const LOOP_NOTE = "optional, and as often as you like";

const ALT =
  "Two ways in — a dropped PDF or the JSON API — through Extract and Narrate, with an optional translate, rewrite and clean-up loop between them, out to an M4B audiobook, a PDF or EPUB, or a synced EPUB.";

// Everything is centred on the spine at y=212, so a node that moves takes its connector's control
// points with it — which is why the coordinates and the paths live together in this file
const NODES: NodeSpec[] = [
  { ...COPY.pdf, stage: "in", x: 8, y: 122, w: 204, h: 80 },
  { ...COPY.api, stage: "in", x: 8, y: 222, w: 204, h: 80 },
  { ...COPY.extract, stage: "work", x: 296, y: 166, w: 212, h: 92 },
  { ...COPY.narrate, stage: "work", x: 592, y: 166, w: 212, h: 92 },
  { ...COPY.m4b, stage: "out", x: 872, y: 100, w: 200, h: 64 },
  { ...COPY.docs, stage: "out", x: 872, y: 180, w: 200, h: 64 },
  { ...COPY.synced, stage: "out", x: 872, y: 260, w: 200, h: 64 },
];

const LOOP: NodeSpec = { ...COPY.loop, stage: "work", accent: true, x: 340, y: 340, w: 420, h: 80 };

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

function Tip({ id, fill }: { id: string; fill: string }) {
  return (
    <marker id={id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M0 0 L10 5 L0 10 z" fill={fill} />
    </marker>
  );
}

function Landscape() {
  return (
    // lg is where Section's max-w-5xl finally renders this viewBox near 1:1; narrower, the portrait
    // layout below reads better than this one scaled down
    <svg viewBox="0 0 1080 452" className="hidden w-full lg:block" role="img" aria-label={ALT}>
      <defs>
        <Tip id="tip" fill="var(--brass)" />
        <Tip id="tip-ember" fill="var(--ember-bright)" />
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
        {LOOP_NOTE}
      </text>
    </svg>
  );
}

// Anything narrower than a laptop gets the same diagram stood on its end: one spine down the left
// gutter, cards hanging off it at full width, so the type stays at reading size instead of being
// scaled to five pixels. Like the landscape half, the card coordinates and the paths move together.
const P = { x: 27, w: 292 };

type Card = Copy & { stage: Stage; y: number; h: number; accent?: boolean; note?: string };

const P_CARDS: Card[] = [
  { ...COPY.pdf, stage: "in", y: 30, h: 56 },
  { ...COPY.api, stage: "in", y: 98, h: 56 },
  { ...COPY.extract, stage: "work", y: 216, h: 64 },
  { ...COPY.loop, stage: "work", y: 304, h: 80, accent: true, note: LOOP_NOTE },
  { ...COPY.narrate, stage: "work", y: 408, h: 64 },
  { ...COPY.m4b, stage: "out", y: 548, h: 52 },
  { ...COPY.docs, stage: "out", y: 610, h: 52 },
  { ...COPY.synced, stage: "out", y: 672, h: 52 },
];

const P_RAILS: { stage: Stage; label: string; y: number }[] = [
  { stage: "in", label: "1 · IN", y: 18 },
  { stage: "work", label: "2 · WORK", y: 204 },
  { stage: "out", label: "3 · OUT", y: 508 },
];

// The two inputs join on the gutter line and turn into Extract; the three outputs come off the same
// gutter below Narrate. Both elbows cross their stage rule at the spine, where no label sits, and
// only a path that ends at a card carries a head.
const P_LINES = [
  "M27 58 L 13 58",
  "M27 126 L 13 126",
  "M173 472 L 173 520 Q 173 532, 161 532 L 25 532 Q 13 532, 13 544 L 13 698",
];

const P_ARROWS = [
  "M13 58 L 13 156 Q 13 168, 25 168 L 161 168 Q 173 168, 173 180 L 173 212",
  "M13 574 L 24 574",
  "M13 636 L 24 636",
  "M13 698 L 24 698",
];

const P_LOOP_PATHS = ["M173 280 L 173 300", "M173 384 L 173 404"];

function PortraitNode({ y, h, title, sub, stage, mono, accent, note }: Card) {
  const big = h >= 64;
  const titleY = y + (big ? 27 : 23);
  const subY = titleY + (big ? 20 : 18);
  const center = P.x + P.w / 2;

  return (
    <g>
      <rect
        x={P.x} y={y} width={P.w} height={h} rx="9"
        fill="var(--bg-raised)"
        stroke={STAGE[stage]}
        strokeOpacity={accent ? 0.6 : 0.28}
      />
      <text
        x={center} y={titleY} textAnchor="middle"
        className={mono ? "font-mono" : "font-display"}
        fontSize={mono ? 13.5 : big ? 17 : 15.5}
        fontWeight="600"
        fill="var(--text-primary)"
      >
        {title}
      </text>
      <text x={center} y={subY} textAnchor="middle" className="font-body" fontSize="12" fill="var(--text-muted)">
        {sub}
      </text>
      {note ? (
        <text x={center} y={subY + 19} textAnchor="middle" className="font-body" fontSize="11.5" fill="var(--brass)">
          {note}
        </text>
      ) : null}
    </g>
  );
}

function Portrait() {
  return (
    <svg viewBox="0 0 320 736" className="mx-auto w-full max-w-[400px] lg:hidden" role="img" aria-label={ALT}>
      <defs>
        <Tip id="tip-p" fill="var(--brass)" />
        <Tip id="tip-ember-p" fill="var(--ember-bright)" />
      </defs>

      {P_RAILS.map((rail) => (
        <g key={rail.label}>
          <text x="0" y={rail.y - 8} className="font-body" fontSize="12" letterSpacing="2.4" fill={STAGE[rail.stage]}>
            {rail.label}
          </text>
          <line x1="0" y1={rail.y} x2="320" y2={rail.y} stroke={STAGE[rail.stage]} strokeOpacity="0.4" />
        </g>
      ))}

      <g stroke="var(--brass)" strokeOpacity="0.5" strokeWidth="1.25" fill="none">
        {P_LINES.map((d) => <path key={d} d={d} />)}
      </g>

      <g stroke="var(--brass)" strokeOpacity="0.5" strokeWidth="1.25" fill="none" markerEnd="url(#tip-p)">
        {P_ARROWS.map((d) => <path key={d} d={d} />)}
      </g>

      <g stroke="var(--ember-bright)" strokeOpacity="0.85" strokeWidth="1.25" fill="none" markerEnd="url(#tip-ember-p)">
        {P_LOOP_PATHS.map((d) => <path key={d} d={d} />)}
      </g>

      {P_CARDS.map((card) => <PortraitNode key={card.title} {...card} />)}
    </svg>
  );
}

export function Flow() {
  return (
    <>
      <Landscape />
      <Portrait />
      <p className="mt-10 text-ink-muted lg:mt-12">
        Each stage has a section of its own below — keep scrolling to see what it looks like in the app.
      </p>
    </>
  );
}
