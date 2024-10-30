import { test } from "@playwright/test";
import waUsers_content from "../fixtures/content/waUsers_content.ts";
import createFEApplication from "../journeys/DSSCreateCase/createCase.ts";
import updateCaseJourney from "../journeys/DSSUpdateCase/updateCase.ts";
import commonHelpers from "../helpers/commonHelpers.ts";
import config from "../config.ts";
import task from "../journeys/CaseAPI/task.ts";

test.describe("DSS Update case tests. @DSSUpdate", () => {
  test("Check for an existing case to update, upload one document and additional information - CY", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber01: any = await createFEApplication.createFEApplication(
      page,
      false,
      waUsers_content.userRoleCitizen,
      false,
      false,
      true,
      false,
      true,
      false,
      false,
      false,
      subjectName,
    );
    await commonHelpers.signOutAndGoToCase(
      page,
      waUsers_content.userRoleAdmin,
      config.CaseAPIBaseURL,
      caseNumber01,
    );
    await task.removeTask(page, "Register New Case", subjectName);
    await page.locator(`a:text-is(" Sign out ")`).click();
    await page.waitForLoadState("domcontentloaded");
    await updateCaseJourney.updateCase(
      page,
      true,
      false,
      caseNumber01,
      true,
      true,
      false,
      false,
      false,
      subjectName,
    );
  });

  test("Check for an existing case to update, upload one document and no additional information", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber02: any = await createFEApplication.createFEApplication(
      page,
      false,
      waUsers_content.userRoleCitizen,
      false,
      false,
      true,
      false,
      true,
      false,
      false,
      false,
      subjectName,
    );
    await commonHelpers.signOutAndGoToCase(
      page,
      waUsers_content.userRoleAdmin,
      config.CaseAPIBaseURL,
      caseNumber02,
    );
    await task.removeTask(page, "Register New Case", subjectName);
    await page.locator(`a:text-is(" Sign out ")`).click();
    await page.waitForLoadState("domcontentloaded");
    await updateCaseJourney.updateCase(
      page,
      false,
      false,
      caseNumber02,
      false,
      true,
      false,
      false,
      false,
      subjectName,
    );
  });

  test("Check for an existing case to update, upload no documents and additional information", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber03: any = await createFEApplication.createFEApplication(
      page,
      false,
      waUsers_content.userRoleCitizen,
      false,
      false,
      true,
      false,
      true,
      false,
      false,
      false,
      subjectName,
    );
    await commonHelpers.signOutAndGoToCase(
      page,
      waUsers_content.userRoleAdmin,
      config.CaseAPIBaseURL,
      caseNumber03,
    );
    await task.removeTask(page, "Register New Case", subjectName);
    await page.locator(`a:text-is(" Sign out ")`).click();
    await page.waitForLoadState("domcontentloaded");
    await updateCaseJourney.updateCase(
      page,
      false,
      false,
      caseNumber03,
      true,
      false,
      false,
      false,
      false,
      subjectName,
    );
  });

  test("Test all back buttons on the Update Case application", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber04: any = await createFEApplication.createFEApplication(
      page,
      false,
      waUsers_content.userRoleCitizen,
      false,
      false,
      true,
      false,
      true,
      false,
      false,
      false,
      subjectName,
    );
    await commonHelpers.signOutAndGoToCase(
      page,
      waUsers_content.userRoleAdmin,
      config.CaseAPIBaseURL,
      caseNumber04,
    );
    await task.removeTask(page, "Register New Case", subjectName);
    await page.locator(`a:text-is(" Sign out ")`).click();
    await page.waitForLoadState("domcontentloaded");
    await updateCaseJourney.updateCase(
      page,
      false,
      false,
      caseNumber04,
      true,
      true,
      false,
      true,
      false,
      subjectName,
    );
  });

  test("Error messaging", async ({ page }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber05: any = await createFEApplication.createFEApplication(
      page,
      false,
      waUsers_content.userRoleCitizen,
      false,
      false,
      true,
      false,
      true,
      false,
      false,
      false,
      subjectName,
    );
    await commonHelpers.signOutAndGoToCase(
      page,
      waUsers_content.userRoleAdmin,
      config.CaseAPIBaseURL,
      caseNumber05,
    );
    await task.removeTask(page, "Register New Case", subjectName);
    await page.locator(`a:text-is(" Sign out ")`).click();
    await page.waitForLoadState("domcontentloaded");
    await updateCaseJourney.updateCase(
      page,
      false,
      false,
      caseNumber05,
      true,
      true,
      false,
      false,
      true,
      subjectName,
    );
  });

  test("Error messaging - CY", async ({ page }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber06: any = await createFEApplication.createFEApplication(
      page,
      false,
      waUsers_content.userRoleCitizen,
      false,
      false,
      true,
      false,
      true,
      false,
      false,
      false,
      subjectName,
    );
    await commonHelpers.signOutAndGoToCase(
      page,
      waUsers_content.userRoleAdmin,
      config.CaseAPIBaseURL,
      caseNumber06,
    );
    await task.removeTask(page, "Register New Case", subjectName);
    await page.locator(`a:text-is(" Sign out ")`).click();
    await page.waitForLoadState("domcontentloaded");
    await updateCaseJourney.updateCase(
      page,
      true,
      false,
      caseNumber06,
      true,
      true,
      false,
      false,
      true,
      subjectName,
    );
  });
});

test("Check for an existing case to update - aXe test as it proceeds. @UpdateAccessibility", async ({
  page,
}) => {
  const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
  const caseNumber07: any = await createFEApplication.createFEApplication(
    page,
    false,
    waUsers_content.userRoleCitizen,
    false,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    subjectName,
  );
  await commonHelpers.signOutAndGoToCase(
    page,
    waUsers_content.userRoleAdmin,
    config.CaseAPIBaseURL,
    caseNumber07,
  );
  await task.removeTask(page, "Register New Case", subjectName);
  await page.locator(`a:text-is(" Sign out ")`).click();
  await page.waitForLoadState("domcontentloaded");
  await updateCaseJourney.updateCase(
    page,
    false,
    true,
    caseNumber07,
    true,
    true,
    false,
    false,
    false,
    subjectName,
  );
});
