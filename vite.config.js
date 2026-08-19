import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Project pages are served from /<repo>/, not the domain root.
  base: process.env.GITHUB_ACTIONS ? "/pattern-ladder/" : "/",
  plugins: [react()],
  server: { port: 5173, open: true },
});
