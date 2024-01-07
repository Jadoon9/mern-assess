import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslintPlugin from "@vitejs/plugin-eslint";

export default defineConfig({
  plugins: [react(), eslintPlugin()],
});
