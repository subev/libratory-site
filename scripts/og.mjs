// Renders scripts/og.html to public/og.png — the 1200x630 card every link unfurl shows.
//
//   node scripts/og.mjs
//
// The card is committed, not built: Cloudflare runs `pnpm build` and has no browser, and the
// image only changes when the copy on it does. Re-run this after editing scripts/og.html and
// commit the PNG alongside it.
//
// Uses whatever Chromium is already on the machine — CHROMIUM_PATH if set, otherwise the
// `chrome` channel Playwright finds installed.
import { chromium } from "playwright-core";
import { fileURLToPath } from "node:url";

const root = new URL("..", import.meta.url);
const source = fileURLToPath(new URL("scripts/og.html", root));
const out = fileURLToPath(new URL("public/og.png", root));

const executablePath = process.env.CHROMIUM_PATH;
const browser = await chromium.launch(executablePath ? { executablePath } : { channel: "chrome" });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });

await page.goto(`file://${source}`);
await page.evaluate(() => document.fonts.ready);
await page.locator("#card").screenshot({ path: out });
await browser.close();

console.log(`public/og.png  1200x630`);
