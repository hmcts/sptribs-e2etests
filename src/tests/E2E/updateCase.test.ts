import { test } from "@playwright/test";
import createFEApplication from "../journeys/DSSCreateCase/createCase.ts";
import updateCaseJourney from "../journeys/DSSUpdateCase/updateCase.ts";
import commonHelpers from "../helpers/commonHelpers.ts";
import config from "../config.ts";
import task from "../journeys/WA/task.ts";

test.describe("DSS Update case tests. @DSSUpdate", () => {
  // test("Check for an existing case to update, upload one document and additional information.", async ({
  //   page,
  // }) => {
  //   const caseNumber: string | void =
  //     await createFEApplication.createFEApplication(
  //       page,
  //       false,
  //       "citizen",
  //       false,
  //       false,
  //       true,
  //       false,
  //       true,
  //       false,
  //       false,
  //       false,
  //     );
  //
  //   await updateCaseJourney.updateCase(
  //     page,
  //     false,
  //     false,
  //     caseNumber,
  //     true,
  //     true,
  //     false,
  //     false,
  //     false,
  //   );
  // });
  //
  // test("Check for an existing case to update, upload one document and additional information - CY", async ({
  //   page,
  // }) => {
  //   const caseNumber: string | void =
  //     await createFEApplication.createFEApplication(
  //       page,
  //       false,
  //       "citizen",
  //       false,
  //       false,
  //       true,
  //       false,
  //       true,
  //       false,
  //       false,
  //       false,
  //     );
  //
  //   await updateCaseJourney.updateCase(
  //     page,
  //     true,
  //     false,
  //     caseNumber,
  //     true,
  //     true,
  //     false,
  //     false,
  //     false,
  //   );
  // });
  //
  // test("Check for an existing case to update, upload multiple documents and additional information", async ({
  //   page,
  // }) => {
  //   const caseNumber: string | void =
  //     await createFEApplication.createFEApplication(
  //       page,
  //       false,
  //       "citizen",
  //       false,
  //       false,
  //       true,
  //       false,
  //       true,
  //       false,
  //       false,
  //       false,
  //     );
  //   await updateCaseJourney.updateCase(
  //     page,
  //     false,
  //     false,
  //     caseNumber,
  //     true,
  //     true,
  //     true,
  //     false,
  //     false,
  //   );
  // });
  //
  // test("Check for an existing case to update, upload one document and no additional information", async ({
  //   page,
  // }) => {
  //   const caseNumber: string | void =
  //     await createFEApplication.createFEApplication(
  //       page,
  //       false,
  //       "citizen",
  //       false,
  //       false,
  //       true,
  //       false,
  //       true,
  //       false,
  //       false,
  //       false,
  //     );
  //   await updateCaseJourney.updateCase(
  //     page,
  //     false,
  //     false,
  //     caseNumber,
  //     false,
  //     true,
  //     false,
  //     false,
  //     false,
  //   );
  // });

  // test("Check for an existing case to update, upload no documents and additional information", async ({
  //   page,
  // }) => {
  //   const caseNumber: string | void =
  //     await createFEApplication.createFEApplication(
  //       page,
  //       false,
  //       "citizen",
  //       false,
  //       false,
  //       true,
  //       false,
  //       true,
  //       false,
  //       false,
  //       false,
  //     );
  //   await updateCaseJourney.updateCase(
  //     page,
  //     false,
  //     false,
  //     caseNumber,
  //     true,
  //     false,
  //     false,
  //     false,
  //     false,
  //   );
  // });

  test("Test all back buttons on the Update Case application", async ({
    page,
  }) => {
    const caseNumber01: any = await createFEApplication.createFEApplication(
      page,
      false,
      "citizen",
      false,
      false,
      true,
      false,
      true,
      false,
      false,
      false,
    );
    console.log(`Case Number : ${caseNumber01}`);
    await commonHelpers.signOutAndGoToCase(
      page,
      "waHearingCentreAdmin",
      config.CaseAPIBaseURL,
      caseNumber01,
    );
    await task.removeTask(page, "Register New Case");
    await page.locator(`a:text-is(" Sign out ")`).click();
    await page.waitForLoadState("domcontentloaded");
    await updateCaseJourney.updateCase(
      page,
      false,
      false,
      caseNumber01,
      true,
      true,
      false,
      true,
      false,
    );
  });

  test("Error messaging", async ({ page }) => {
    const caseNumber02: any = await createFEApplication.createFEApplication(
      page,
      false,
      "citizen",
      false,
      false,
      true,
      false,
      true,
      false,
      false,
      false,
    );
    await commonHelpers.signOutAndGoToCase(
      page,
      "waHearingCentreAdmin",
      config.CaseAPIBaseURL,
      caseNumber02,
    );
    await task.removeTask(page, "Register New Case");
    await page.locator(`a:text-is(" Sign out ")`).click();
    await page.waitForLoadState("domcontentloaded");
    await updateCaseJourney.updateCase(
      page,
      false,
      false,
      caseNumber02,
      true,
      true,
      false,
      false,
      true,
    );
  });

  test("Error messaging - CY", async ({ page }) => {
    const caseNumber03: any = await createFEApplication.createFEApplication(
      page,
      false,
      "citizen",
      false,
      false,
      true,
      false,
      true,
      false,
      false,
      false,
    );
    await commonHelpers.signOutAndGoToCase(
      page,
      "waHearingCentreAdmin",
      config.CaseAPIBaseURL,
      caseNumber03,
    );
    await task.removeTask(page, "Register New Case");
    await page.locator(`a:text-is(" Sign out ")`).click();
    await page.waitForLoadState("domcontentloaded");
    await updateCaseJourney.updateCase(
      page,
      true,
      false,
      caseNumber03,
      true,
      true,
      false,
      false,
      true,
    );
  });
});

test("Check for an existing case to update - aXe test as it proceeds. @UpdateAccessibility", async ({
  page,
}) => {
  const caseNumber04: any = await createFEApplication.createFEApplication(
    page,
    false,
    "citizen",
    false,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
  );
  await commonHelpers.signOutAndGoToCase(
    page,
    "waHearingCentreAdmin",
    config.CaseAPIBaseURL,
    caseNumber04,
  );
  await task.removeTask(page, "Register New Case");
  await page.locator(`a:text-is(" Sign out ")`).click();
  await page.waitForLoadState("domcontentloaded");
  await updateCaseJourney.updateCase(
    page,
    false,
    true,
    caseNumber04,
    true,
    true,
    false,
    false,
    false,
  );
  await commonHelpers.signOutAndGoToCase(
    page,
    "waHearingCentreAdmin",
    config.CaseAPIBaseURL,
    caseNumber04,
  );
  await task.removeTask(page, "Process further evidence");
});
