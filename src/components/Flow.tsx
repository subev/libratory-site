const NODES = {
  pdf: { x: 10, y: 92, w: 232, h: 78, title: "Drop a PDF", sub: "OCR when the scan needs it" },
  api: { x: 10, y: 200, w: 232, h: 78, title: "POST /api/books", sub: "scripts, feeds, other apps" },
  extract: { x: 310, y: 141, w: 216, h: 88, title: "Extract", sub: "text and chapters" },
  narrate: { x: 594, y: 141, w: 216, h: 88, title: "Narrate", sub: "local or cloud voice" },
};

const OUTPUTS = [
  { y: 72, title: "M4B audiobook", sub: "chapters, cover" },
  { y: 148, title: "PDF · EPUB", sub: "the chapters you pick" },
  { y: 224, title: "Synced EPUB", sub: "audio and text together" },
];

const STEPS = [
  { title: "In", body: "A PDF you drop, or a book posted to the JSON API by a script." },
  { title: "Extract", body: "Text back in seconds, chapters detected or drawn by hand. OCR when the scan needs it." },
  { title: "Transform, as often as you like", body: "Translate, rewrite, clean up. Every variant is kept beside the original and can be narrated on its own." },
  { title: "Narrate", body: "A local model, a macOS system voice, or a cloud engine if you have a key." },
  { title: "Out", body: "An M4B with real chapter markers, a PDF or EPUB of the chapters you pick, or a synced EPUB carrying audio and text together." },
];

function Node({ x, y, w, h, title, sub, accent }: {
  x: number; y: number; w: number; h: number; title: string; sub: string; accent?: boolean;
}) {
  return (
    <g>
      <rect
        x={x} y={y} width={w} height={h} rx="10"
        fill="#fdf1e4" fillOpacity="0.035"
        stroke={accent ? "var(--ember)" : "var(--brass)"}
        strokeOpacity={accent ? 0.55 : 0.4}
      />
      <text x={x + w / 2} y={y + h / 2 - 4} textAnchor="middle" className="font-display" fontSize="25" fontWeight="600" fill="var(--text-primary)">
        {title}
      </text>
      <text x={x + w / 2} y={y + h / 2 + 22} textAnchor="middle" className="font-body" fontSize="18" fill="var(--text-muted)">
        {sub}
      </text>
    </g>
  );
}

export function Flow() {
  return (
    <>
      <svg
        viewBox="0 0 1080 440"
        className="hidden w-full sm:block"
        role="img"
        aria-label="Two ways in — a dropped PDF or the JSON API — through extraction and narration, with a repeatable translate and rewrite loop, out to an M4B audiobook, a PDF or EPUB, or a synced EPUB."
      >
        <defs>
          <marker id="tip" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0 0 L10 5 L0 10 z" fill="var(--brass)" fillOpacity="0.75" />
          </marker>
          <marker id="tip-ember" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0 0 L10 5 L0 10 z" fill="var(--ember)" />
          </marker>
        </defs>

        <g stroke="var(--brass)" strokeOpacity="0.34" strokeWidth="1.5" fill="none" markerEnd="url(#tip)">
          <path d="M242 131 C 274 131, 274 185, 304 185" />
          <path d="M242 239 C 274 239, 274 185, 304 185" />
          <path d="M526 185 L 588 185" />
          <path d="M810 185 C 840 185, 842 104, 872 104" />
          <path d="M810 185 L 872 185" />
          <path d="M810 185 C 840 185, 842 256, 872 256" />
        </g>

        <g stroke="var(--ember)" strokeOpacity="0.75" strokeWidth="1.5" fill="none" markerEnd="url(#tip-ember)">
          <path d="M418 229 C 418 286, 400 300, 400 324" />
          <path d="M712 324 C 712 300, 702 286, 702 235" />
        </g>

        <Node {...NODES.pdf} />
        <Node {...NODES.api} />
        <Node {...NODES.extract} />
        <Node {...NODES.narrate} />

        {OUTPUTS.map((output) => (
          <Node key={output.title} x={876} y={output.y} w={196} h={64} title={output.title} sub={output.sub} />
        ))}

        <Node x={354} y={330} w={400} h={88} title="Translate · rewrite · clean up" sub="every variant kept beside the original" accent />

        <g stroke="var(--ember)" strokeWidth="1.5" fill="none">
          <path d="M320 374 A 22 22 0 1 1 326 390" markerEnd="url(#tip-ember)" />
        </g>
        <text x="298" y="352" textAnchor="end" className="font-body" fontSize="17" fill="var(--brass)">
          as often
        </text>
        <text x="298" y="374" textAnchor="end" className="font-body" fontSize="17" fill="var(--brass)">
          as you like
        </text>

        <text x="126" y="60" textAnchor="middle" className="font-body" fontSize="16" letterSpacing="3" fill="var(--text-faint)">IN</text>
        <text x="974" y="44" textAnchor="middle" className="font-body" fontSize="16" letterSpacing="3" fill="var(--text-faint)">OUT</text>
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
