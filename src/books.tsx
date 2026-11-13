import { createRoot, hydrateRoot } from "react-dom/client";
import { Books } from "./pages/Books.tsx";
import "./styles.css";

const root = document.getElementById("root")!;

// The built page is prerendered; the dev server serves the empty shell
if (root.firstChild) hydrateRoot(root, <Books />);
else createRoot(root).render(<Books />);
