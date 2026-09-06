import { createRoot, hydrateRoot } from "react-dom/client";
import { Reader } from "./pages/Reader.tsx";
import "./styles.css";

const root = document.getElementById("root")!;

// The built page is prerendered; the dev server serves the empty shell
if (root.firstChild) hydrateRoot(root, <Reader />);
else createRoot(root).render(<Reader />);
