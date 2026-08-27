# libratory.dev

The site for [Libratory](https://github.com/subev/libratory) — one page, about the free Mac app.

Vite + React + Tailwind 4, matching the app's `packages/web`. A static build with no router: a
second page is a second `.html` entry, and GitHub Pages needs no 404 fallback.

```bash
pnpm install
pnpm dev      # localhost:3040
pnpm build
```

Pushing to `main` builds and deploys to Pages.

## Why this is not in the app repo

Nothing here is secret — the repo is public and so is everything in it. The split is about three
things:

1. The app is PolyForm Noncommercial. Site copy does not want that licence on it.
2. A repo gets one Pages custom domain. Spending the app repo's on this would block using it later
   for docs.
3. Copy changes weekly and cosmetically; the app releases on tags with a macOS build. Two
   histories, two CI configs, no interference.

## DNS

`public/CNAME` claims `libratory.dev`. The domain needs four `A` records at the apex pointing at
185.199.108.153, 185.199.109.153, 185.199.110.153 and 185.199.111.153, and `www` as a `CNAME` to
`subev.github.io`.
