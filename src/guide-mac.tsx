import { createRoot, hydrateRoot } from "react-dom/client";
import { GuideMac } from "./pages/GuideMac.tsx";
import "./styles.css";

const root = document.getElementById("root")!;

// The built page is prerendered; the dev server serves the empty shell
if (root.firstChild) hydrateRoot(root, <GuideMac />);
else createRoot(root).render(<GuideMac />);
