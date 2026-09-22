import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/L-intimit-/",
  envPrefix: ["VITE_", "NEXT_PUBLIC_"],
});
