import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

export default defineConfig(({ mode }) => {
  // Modo biblioteca
  if (mode === "lib") {
    return {
      plugins: [react(), tailwindcss()],
      build: {
        lib: {
          entry: resolve(__dirname, "src/index.ts"),
          name: "MaxDS",
          fileName: (format) => `index.${format}.js`,
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
          },
        },
        cssCodeSplit: false,
      },
    };
  }

  // Modo aplicação (Storybook)
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
