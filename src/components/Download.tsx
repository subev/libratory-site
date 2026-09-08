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
    <div data-card={os} className="platform-card min-w-0 rounded-sm border border-edge p-6">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 className="text-xl">{title}</h3>
        <span className="platform-yours text-sm text-brass">your computer</span>
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
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <Card os="mac" title="Mac" sub="For Macs with an Apple M-series chip.">
        <a
          href={DOWNLOAD}
          className="inline-flex h-11 items-center rounded-sm bg-ember px-6 text-[0.95rem] tracking-wide text-[#16140f] transition-colors hover:bg-ember-bright"
        >
          Download for Mac
        </a>
        <p className="mt-4 text-sm text-ink-faint">
          Open the download and install the app.
        </p>
      </Card>

      <Card os="linux" title="Linux" sub="Requires Git and Docker. Supports x86_64 and arm64.">
        <Command />
        <p className="mt-4 text-sm text-ink-faint">
          Then open <code className="text-ink-muted">localhost:3034</code>. No graphics card needed.
        </p>
      </Card>

      <Card os="win" title="Windows" sub="Requires Git and Docker Desktop with WSL2.">
        <Command />
        <p className="mt-4 text-sm text-ink-faint">
          Run the commands, then open <code className="text-ink-muted">localhost:3034</code>. Need help?{" "}
          <a href={`${REPO}/issues/new`} className="text-brass hover:text-ember-bright">Report a problem</a>.
        </p>
      </Card>
    </div>
  );
}
