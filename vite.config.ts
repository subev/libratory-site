import { existsSync } from "node:fs";
import type { Connect } from "vite";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

// Pages answers /learn with a 308 to /learn/; without this the dev server falls back to the home page
const trailingSlash: Connect.NextHandleFunction = (req, res, next) => {
  const path = req.url?.split("?")[0] ?? "/";
  const dir = path.slice(1);
  if (dir && !dir.includes(".") && !path.endsWith("/") && [dir, `public/${dir}`].some((d) => existsSync(`${d}/index.html`))) {
    res.writeHead(308, { Location: `${path}/${req.url!.slice(path.length)}` });
    res.end();
    return;
  }
  next();
};

export default defineConfig({
  plugins: [
    tailwindcss(),
    {
      name: "trailing-slash",
      configureServer: (server) => void server.middlewares.use(trailingSlash),
      configurePreviewServer: (server) => void server.middlewares.use(trailingSlash),
    },
  ],
  server: { port: 3040 },
  // No router: a second page is a second entry, and Pages serves /reader/ from its own index.html
  build: {
    rollupOptions: {
      input: { main: "index.html", reader: "reader/index.html", learn: "learn/index.html" },
    },
  },
});
