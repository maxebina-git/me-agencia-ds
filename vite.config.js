import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

export default defineConfig(({ mode, command }) => {
  // Modo biblioteca
  if (mode === "lib") {
    return {
      plugins: [react(), tailwindcss()],
      build: {
        emptyOutDir: true,
        lib: {
          entry: resolve(__dirname, "src/index.ts"),
          name: "MaxDS",
          fileName: (format) => (format === "es" ? "index.mjs" : "index.cjs"),
          formats: ["es", "cjs"],
        },
        rollupOptions: {
          external: ["react", "react-dom", "react/jsx-runtime"],
          output: {
            globals: {
              react: "React",
              "react-dom": "ReactDOM",
              "react/jsx-runtime": "jsxRuntime",
            },
            assetFileNames: (assetInfo) => {
              if (assetInfo.name === "styles.css") return "max-ds.css";
              return assetInfo.name;
            },
          },
        },
        cssCodeSplit: false,
      },
    };
  }

  // Modo aplicação (Demo do DS) - usa source direto para HMR rápido
  return {
    plugins: [react(), tailwindcss()],
    server: {
      host: "0.0.0.0",
      port: 3000,
      strictPort: true,
      hmr: {
        port: 3000,
      },
    },
  };
});
