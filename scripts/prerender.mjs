import { readFile, rm, writeFile } from "node:fs/promises";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { Mac } from "../dist-ssr/entry-server.js";

const html = await readFile("dist/index.html", "utf8");
// renderToString, not renderToStaticMarkup: hydration needs the text-node markers
const markup = renderToString(createElement(Mac));

// The bundle stays: the live demos hydrate over this markup
const prerendered = html.replace('<div id="root"></div>', `<div id="root">${markup}</div>`);

await writeFile("dist/index.html", prerendered);
await rm("dist-ssr", { recursive: true, force: true });
