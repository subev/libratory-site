import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  server: { port: 3040 },
  // No router: a second page is a second entry, and Pages serves /reader/ from its own index.html
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        reader: "reader/index.html",
        compare: "compare/index.html",
        guideMac: "pdf-to-audiobook-mac/index.html",
      },
    },
  },
});
