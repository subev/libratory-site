import { createRoot, hydrateRoot } from "react-dom/client";
import { Languages } from "./pages/Languages.tsx";
import "./styles.css";

const root = document.getElementById("root")!;

// The built page is prerendered; the dev server serves the empty shell
if (root.firstChild) hydrateRoot(root, <Languages />);
else createRoot(root).render(<Languages />);
