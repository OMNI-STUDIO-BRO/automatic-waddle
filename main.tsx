import { createRoot } from "react-dom/client";
import App from "./App.tsx";

// This is the engine that starts your whole website!
const rootElement = document.getElementById("root");

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
} else {
  console.error("Could not find the root element to start the app!");
}
