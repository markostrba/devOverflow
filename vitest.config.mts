import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    projects: [
      {
        extends: true,
        test: {
          name: "integration",
          include: [
            "tests/integration/**/*.test.ts",
            "tests/integration/**/*.test.tsx",
          ],
          environment: "node",
        },
      },
      {
        extends: true,
        test: {
          name: "unit",
          include: ["tests/unit/**/*.test.tsx", "tests/unit/**/*.test.ts"],
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
