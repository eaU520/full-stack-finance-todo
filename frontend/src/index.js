import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import Navigation from './components/Navigation';

const index = ReactDOM.createRoot(document.getElementById("root"));
  index.render(
  <React.StrictMode>
    <BrowserRouter>
      <Navigation />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();