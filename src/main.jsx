import React from "react";
import { createRoot } from "react-dom/client";
import "./storage.js"; // must come before the app, which reads window.storage
import PatternLadder from "./PatternLadder.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PatternLadder />
  </React.StrictMode>
);
