import { readdir, readFile, rm, unlink, writeFile } from "node:fs/promises";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Mac } from "../dist-ssr/entry-server.js";

const html = await readFile("dist/index.html", "utf8");
const markup = renderToStaticMarkup(createElement(Mac));

const prerendered = html
  .replace('<div id="root"></div>', `<div id="root">${markup}</div>`)
  .replace(/\s*<script type="module" [^>]*src="\/assets\/[^"]+"><\/script>/, "");

await writeFile("dist/index.html", prerendered);
await rm("dist-ssr", { recursive: true, force: true });

// The page has no interactivity, so the client bundle has nothing left to do
for (const file of await readdir("dist/assets")) {
  if (file.endsWith(".js")) await unlink(`dist/assets/${file}`);
}
