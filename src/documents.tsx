import { createRoot, hydrateRoot } from "react-dom/client";
import { Documents } from "./pages/Documents.tsx";
import "./styles.css";

const root = document.getElementById("root")!;

// The built page is prerendered; the dev server serves the empty shell
if (root.firstChild) hydrateRoot(root, <Documents />);
else createRoot(root).render(<Documents />);
