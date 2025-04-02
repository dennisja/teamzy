import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";
import { loadEnv } from "vite";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],

  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    env: loadEnv("test", process.cwd(), ""),
    exclude: ["node_modules/**/*"],
  },
});
