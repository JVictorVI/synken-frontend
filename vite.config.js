import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { vitePluginErrorOverlay } from "@hiogawa/vite-plugin-error-overlay";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), vitePluginErrorOverlay()],
});
