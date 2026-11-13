import { createRoot, hydrateRoot } from "react-dom/client";
import { Study } from "./pages/Study.tsx";
import "./styles.css";

const root = document.getElementById("root")!;

// The built page is prerendered; the dev server serves the empty shell
if (root.firstChild) hydrateRoot(root, <Study />);
else createRoot(root).render(<Study />);
