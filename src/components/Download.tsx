import type { ReactNode } from "react";
import { DOWNLOAD, REPO } from "./Chrome.tsx";

const COMMAND = `git clone ${REPO}.git
cd libratory
docker compose --profile app up -d --build`;

function Card({ os, title, sub, children }: {
  os: string;
  title: string;
  sub: string;
  children: ReactNode;
}) {
  return (
    <div data-card={os} className="platform-card rounded-sm border border-edge p-6">
      <div className="flex items-baseline gap-3">
        <h3 className="text-xl">{title}</h3>
        <span className="platform-yours text-sm text-brass">you're on this</span>
      </div>
      <p className="mt-1 text-ink-muted">{sub}</p>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function Command() {
  return (
    <pre className="rounded-sm border border-edge bg-inset p-4 text-xs leading-relaxed whitespace-pre-wrap break-words text-ink-secondary">
      <code>{COMMAND}</code>
    </pre>
  );
}

export function Download() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <Card os="mac" title="macOS" sub="Apple Silicon. A DMG that installs its own runtime — no checkout, no terminal.">
        <a
          href={DOWNLOAD}
          className="inline-flex h-11 items-center rounded-sm bg-ember px-6 text-[0.95rem] tracking-wide text-[#16140f] transition-colors hover:bg-ember-bright"
        >
          Download the DMG
        </a>
        <p className="mt-4 text-sm text-ink-faint">
          Not notarized yet, so the first launch needs Right-click → Open. Intel Macs are not built
          for: the Metal narrators would have nothing to run on.
        </p>
      </Card>

      <Card os="linux" title="Linux" sub="x86_64 or arm64. One container holds the server, the UI and both Python environments.">
        <Command />
        <p className="mt-4 text-sm text-ink-faint">
          Then open <code className="text-ink-muted">localhost:3034</code>. A CPU is enough; no GPU
          required.
        </p>
      </Card>

      <Card os="win" title="Windows" sub="The same container, through Docker Desktop and WSL2.">
        <Command />
        <p className="mt-4 text-sm text-ink-faint">
          There is no native Windows app yet. This route is new, so if something does not work,{" "}
          <a href={`${REPO}/issues/new`} className="text-brass hover:text-ember-bright">let us know</a>{" "}
          and it will get fixed.
        </p>
      </Card>
    </div>
  );
}
