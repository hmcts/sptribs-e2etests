import { defineConfig, devices } from "@playwright/test";

module.exports = defineConfig({
  testDir: "./src/tests/E2E",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: 4, // Set the number of retries for all projects

  timeout: 8 * 30 * 1000,
  expect: {
    timeout: 60 * 1000,
  },

  /* Opt out of parallel tests on CI. */
  workers: process.env.FUNCTIONAL_TESTS_WORKERS ? 5 : 5,
  reporter: process.env.CI ? "html" : "list",
  use: {
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"], channel: "chrome" },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
    {
      name: "MobileChrome",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "MobileSafari",
      use: { ...devices["iPhone 12"] },
    },
    {
      name: "MicrosoftEdge",
      use: { ...devices["Desktop Edge"], channel: "msedge" },
    },
  ],
});
