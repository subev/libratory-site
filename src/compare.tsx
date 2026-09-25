import { createRoot, hydrateRoot } from "react-dom/client";
import { Compare } from "./pages/Compare.tsx";
import "./styles.css";

const root = document.getElementById("root")!;

// The built page is prerendered; the dev server serves the empty shell
if (root.firstChild) hydrateRoot(root, <Compare />);
else createRoot(root).render(<Compare />);
