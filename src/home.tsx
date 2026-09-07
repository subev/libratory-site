import { createRoot, hydrateRoot } from "react-dom/client";
import { Home } from "./pages/Home.tsx";
import "./styles.css";

const root = document.getElementById("root")!;

// The built page is prerendered; the dev server serves the empty shell
if (root.firstChild) hydrateRoot(root, <Home />);
else createRoot(root).render(<Home />);
