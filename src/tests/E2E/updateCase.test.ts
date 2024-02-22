import { test } from "@playwright/test";
import landingPage from "../pages/DSSUpdateCase/landingPage.ts";
import { createFEApplication } from "../journeys/DSSCreateCase/createCase.ts";
import { updateCase } from "../journeys/DSSUpdateCase/updateCase.ts";

test.describe("DSS Update case tests. @DSSUpdate", () => {
  test.only("Check for an existing case to update.", async ({ page }) => {
    const caseNumber: string | void = await createFEApplication(
      page,
      false,
      false,
      false,
      true,
      false,
      true,
      false,
      false,
      false,
    );
    await updateCase(page, false, caseNumber);
  });

  test("Check for the landing page - aXe test as it proceeds. @UpdateAccessibility", async ({
    page,
  }) => {
    await landingPage.seeTheLandingPage(page, true);
    await landingPage.continueOn(page);
  });
});
