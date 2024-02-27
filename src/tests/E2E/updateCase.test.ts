import { test } from "@playwright/test";
import createFEApplication from "../journeys/DSSCreateCase/createCase.ts";
import updateCaseJourney from "../journeys/DSSUpdateCase/updateCase.ts";

test.describe("DSS Update case tests. @DSSUpdate", () => {
  test("Check for an existing case to update.", async ({ page }) => {
    const caseNumber: string | void = await createFEApplication.createFEApplication(
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
    await updateCaseJourney.updateCase(page, false, caseNumber, false, false);
  });

  test("Test all back buttons on the Update Case application", async ({
    page,
  }) => {
    const caseNumber: string | void = await createFEApplication.createFEApplication(
      page,
      false,
      false,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
    );
    await updateCaseJourney.updateCase(page, true, caseNumber, true, false);
  });

  test("Error messaging", async ({ page }) => {
    const caseNumber: string | void = await createFEApplication.createFEApplication(
      page,
      false,
      false,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
    );
    await updateCaseJourney.updateCase(page, true, caseNumber, false, true);
  });
});

test("Check for an existing case to update - aXe test as it proceeds. @UpdateAccessibility", async ({
  page,
}) => {
  const caseNumber: string | void = await createFEApplication.createFEApplication(
    page,
    false,
    false,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
  );
  await updateCaseJourney.updateCase(page, true, caseNumber, false, false);
});
