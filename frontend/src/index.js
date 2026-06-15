import "bootstrap/dist/css/bootstrap.min.css";
import { createRoot } from "react-dom/client";
import App from "./App";

const index = createRoot(document.getElementById("root"));
index.render(<App />);
