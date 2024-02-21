import { test } from "@playwright/test";
import landingPage from "../pages/DSSUpdateCase/landingPage.ts";
import caseFinderPage from "../pages/DSSUpdateCase/caseFinderPage.ts";

test.describe("DSS Update case tests. @DSSUpdate", () => {
  test.only("Check for an existing case to update.", async ({ page }) => {
    const caseNumber = ""; // This will be changed to include the create case journey and grab the number from there
    await landingPage.seeTheLandingPage(page, false);
    await landingPage.continueOn(page);
    await caseFinderPage.checkPageLoads(page, false);
    await caseFinderPage.fillInFields(page, caseNumber);
    await caseFinderPage.continueOn(page);
  });

  test("Check for the landing page - aXe test as it proceeds. @UpdateAccessibility", async ({
    page,
  }) => {
    await landingPage.seeTheLandingPage(page, true);
    await landingPage.continueOn(page);
  });
});
