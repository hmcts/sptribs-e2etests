import { test } from "@playwright/test";
import landingPage from "../pages/DSSUpdateCase/landingPage.ts";

test.describe("DSS Update case tests. @DSSUpdate", () => {
  test.only("Check for the landing page.", async ({ page }) => {
    await landingPage.seeTheLandingPage(page, false);
    await landingPage.continueOn(page);
  });

  test("Check for the landing page - aXe test as it proceeds. @UpdateAccessibility", async ({
    page,
  }) => {
    await landingPage.seeTheLandingPage(page, true);
    await landingPage.continueOn(page);
  });
});
