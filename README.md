# libratory.dev

The site for [Libratory](https://github.com/subev/libratory) — one page, about the free Mac app.

Vite + React + Tailwind 4, matching the app's `packages/web`. A static build with no router: a
second page is a second `.html` entry, and GitHub Pages needs no 404 fallback.

`pnpm build` renders the page to static markup and deletes the client bundle — the page has no
state and no events, so it ships CSS and HTML and no JavaScript. `pnpm dev` still renders in the
browser as usual. Anything interactive added later has to opt back into hydration.

```bash
pnpm install
pnpm dev      # localhost:3040
pnpm build
```

Cloudflare Pages builds and deploys every push to `main` — build command `pnpm build`, output
directory `dist`, `NODE_VERSION=22`. There is no workflow in this repo; Cloudflare does the build.

## Why this is not in the app repo

Nothing here is secret — the repo is public and so is everything in it. The split is about three
things:

1. The app is PolyForm Noncommercial. Site copy does not want that licence on it.
2. A repo gets one Pages custom domain. Spending the app repo's on this would block using it later
   for docs.
3. Copy changes weekly and cosmetically; the app releases on tags with a macOS build. Two
   histories, two CI configs, no interference.

## DNS

The domain is on Cloudflare, and Pages wires the apex record itself when the custom domain is added
from the project's **Custom domains** tab. `public/CNAME` is left in place only so a move back to
GitHub Pages needs no thought; Cloudflare ignores it.
