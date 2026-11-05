import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

const dsDistPath = resolve(__dirname, "../dist");

export default defineConfig(({ command }) => {
  const isServe = command === "serve";

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: isServe
        ? {
            "@maxebina/max-ds": dsDistPath,
          }
        : {},
    },
    server: {
      port: 5173,
      strictPort: true,
    },
    build: {
      outDir: "dist",
    },
  };
});