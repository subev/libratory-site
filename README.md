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

## The social card

`public/og.png` is the 1200×630 image every link unfurl shows — iMessage, Slack, Twitter,
LinkedIn. It is drawn in `scripts/og.html` with the site's own fonts and colours and screenshotted
by `pnpm og`, which needs Chrome installed (or `CHROMIUM_PATH` pointed at a Chromium binary).

The PNG is committed rather than built: Cloudflare has no browser, and the card only changes when
the words on it do. Edit `scripts/og.html`, run `pnpm og`, commit both.

Unfurl caches are stubborn and keyed on the URL, so a redrawn card can keep showing the old one for
days. To force it, bump the `og:image` URL in `index.html` to `/og.png?v=2`. Facebook, LinkedIn and
Twitter each have a debugger that re-fetches on demand; iMessage does not, and clears only by
sending the link to a fresh conversation.

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
