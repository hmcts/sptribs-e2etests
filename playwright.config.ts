import { CommonConfig, ProjectsConfig } from "@hmcts/playwright-common";
import { defineConfig } from "@playwright/test";

module.exports = defineConfig({
  ...CommonConfig.recommended,
  testDir: "./src/tests/E2E",
  timeout: 7 * 60 * 1000,
  expect: {
    timeout: 60_000,
  },
  workers: process.env.FUNCTIONAL_TESTS_WORKERS ? 10 : 10,
  retries: 4, // Set the number of retries for all projects
  projects: [
    {
      ...ProjectsConfig.chromium,
    },
    {
      ...ProjectsConfig.firefox,
    },
    {
      ...ProjectsConfig.webkit,
    },
    {
      ...ProjectsConfig.tabletChrome,
    },
    {
      ...ProjectsConfig.tabletWebkit,
    },
    {
      ...ProjectsConfig.edge,
    },
  ],
});
