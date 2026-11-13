import { createRoot, hydrateRoot } from "react-dom/client";
import { Mac } from "./pages/Mac.tsx";
import "./styles.css";

const root = document.getElementById("root")!;

// The built page is prerendered; the dev server serves the empty shell
if (root.firstChild) hydrateRoot(root, <Mac />);
else createRoot(root).render(<Mac />);
