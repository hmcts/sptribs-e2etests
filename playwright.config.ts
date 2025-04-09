import { defineConfig, devices } from "@playwright/test";

const DEFAULT_VIEWPORT = { width: 1920, height: 1080 };

module.exports = defineConfig({
  testDir: "./src/tests/E2E",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: 4, // Set the number of retries for all projects

  timeout: 7 * 60 * 1000,
  expect: {
    timeout: 2 * 60 * 1000,
  },
  use: {
    actionTimeout: 30_000,
    navigationTimeout: 30_000,
    trace: "retain-on-failure",
    video: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  reportSlowTests: null,

  /* Opt out of parallel tests on CI. */
  workers: process.env.FUNCTIONAL_TESTS_WORKERS ? 5 : 5,
  reporter: process.env.CI ? "html" : "list",
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        channel: "chrome",
        javaScriptEnabled: true,
        viewport: DEFAULT_VIEWPORT,
      },
    },
    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
        javaScriptEnabled: true,
        viewport: DEFAULT_VIEWPORT,
      },
    },
    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
        javaScriptEnabled: true,
        viewport: DEFAULT_VIEWPORT,
      },
    },
    {
      name: "MobileChrome",
      use: {
        ...devices["Pixel 5"],
        screenshot: "only-on-failure",
        trace: "off",
      },
    },
    {
      name: "MobileSafari",
      use: {
        ...devices["iPhone 12"],
        screenshot: "only-on-failure",
        trace: "off",
      },
    },
    {
      name: "MicrosoftEdge",
      use: {
        ...devices["Desktop Edge"],
        channel: "msedge",
        screenshot: "only-on-failure",
        trace: "off",
      },
    },
  ],
});
