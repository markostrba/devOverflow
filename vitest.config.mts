import path from "node:path";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
  test: {
    projects: [
      {
        extends: true,
        test: {
          name: "node-tests",
          include: ["tests/{integration,e2e}/**/*"],
          environment: "node",
        },
      },
      {
        extends: true,
        test: {
          name: "jsdom-tests",
          include: ["tests/unit/**/*"],
          environment: "jsdom",
        },
      },
    ],

    coverage: {
      provider: "v8",
      include: ["features/**/*.{js,jsx,ts,tsx}", "lib/**/*.{js,ts}"],
      exclude: ["**/*.d.ts", "**/node_modules/**", "**/*.test.{js,jsx,ts,tsx}"],
    },
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
  },
});
