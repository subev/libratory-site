import { useCallback, useEffect, useRef, useState, type ReactNode, type RefObject } from "react";

export function useInView(ref: RefObject<HTMLElement | null>, rootMargin = "120px") {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry ? entry.isIntersecting : false),
      { rootMargin },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, rootMargin]);

  return inView;
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const onChange = () => setReduced(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

/** Wall-clock, not accumulated frame deltas: a backgrounded tab gets no rAF and would freeze at zero. */
export function useLoopClock({ period, start = 0, running = true }: {
  period: number;
  start?: number;
  running?: boolean;
}) {
  const [t, setT] = useState(start);
  const base = useRef(start);
  const [epoch, setEpoch] = useState(0);

  useEffect(() => {
    if (!running) return;
    const from = base.current;
    const stamp = performance.now();
    const sync = () => {
      const at = (from + (performance.now() - stamp)) % period;
      base.current = at;
      setT(at);
    };
    let raf = requestAnimationFrame(function tick() {
      raf = requestAnimationFrame(tick);
      sync();
    });
    // rAF stops in a hidden tab; the interval keeps the state honest for background loads
    const timer = setInterval(sync, 250);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(timer);
    };
  }, [period, running, epoch]);

  const reset = useCallback((at: number) => {
    base.current = at;
    setT(at);
    setEpoch((n) => n + 1);
  }, []);

  return [t, reset] as const;
}

export function reveal(text: string, from: number, to: number, at: number) {
  if (at <= from) return "";
  if (at >= to) return text;
  return text.slice(0, Math.floor(text.length * ((at - from) / (to - from))));
}

export function Caret({ shown }: { shown: boolean }) {
  return (
    <span
      className="ml-0.5 inline-block h-[0.85em] w-[0.45em] translate-y-[0.12em] bg-ember-bright"
      style={{ display: shown ? "inline-block" : "none", animation: "softpulse 1s steps(2) infinite" }}
    />
  );
}

export function Notes({ items, children }: {
  items: { title: string; body: string }[];
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6 pt-1.5">
      {items.map((note) => (
        <div key={note.title}>
          <h3 className="text-lg">{note.title}</h3>
          <p className="mt-2 text-[0.95rem] text-ink-muted">{note.body}</p>
        </div>
      ))}
      {children}
    </div>
  );
}

export function Window({ url, tag, children }: { url: string; tag: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl border border-edge bg-page shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
      <div className="flex items-center gap-3 border-b border-edge bg-raised px-3.5 py-2.5">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[#fdf1e4]/16" />
          <span className="size-2.5 rounded-full bg-[#fdf1e4]/16" />
          <span className="size-2.5 rounded-full bg-[#fdf1e4]/16" />
        </div>
        <span className="mx-auto truncate rounded-md bg-inset px-3 py-[3px] font-mono text-[11.5px] text-ink-faint">
          {url}
        </span>
        <span className="hidden font-mono text-[10.5px] tracking-[0.1em] text-ink-faint sm:inline">{tag}</span>
      </div>
      {children}
    </div>
  );
}
