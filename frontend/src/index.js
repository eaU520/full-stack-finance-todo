import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import App from "./App";

const index = ReactDOM.createRoot(document.getElementById("root"));
  index.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();