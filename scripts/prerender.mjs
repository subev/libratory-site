import { readFile, rm, writeFile } from "node:fs/promises";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { Home, Reader } from "../dist-ssr/entry-server.js";

const PAGES = [
  { file: "dist/index.html", page: Home },
  { file: "dist/reader/index.html", page: Reader },
];

for (const { file, page } of PAGES) {
  const html = await readFile(file, "utf8");
  // renderToString, not renderToStaticMarkup: hydration needs the text-node markers
  const markup = renderToString(createElement(page));
  // The bundle stays: the live demos hydrate over this markup
  const prerendered = html.replace('<div id="root"></div>', `<div id="root">${markup}</div>`);
  // A shell whose root div moved would otherwise ship un-prerendered on a green build
  if (prerendered === html) throw new Error(`${file}: no <div id="root"></div> to prerender into`);
  await writeFile(file, prerendered);
}

await rm("dist-ssr", { recursive: true, force: true });
