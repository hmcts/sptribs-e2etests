import { test } from "@playwright/test";
import waUsers_content from "../fixtures/content/waUsers_content.ts";
import taskNames_content from "../fixtures/content/taskNames_content.ts";
import createFEApplication from "../journeys/DSSCreateCase/createCase.ts";
import updateCaseJourney from "../journeys/DSSUpdateCase/updateCase.ts";
import commonHelpers from "../helpers/commonHelpers.ts";
import config from "../config.ts";
import task from "../journeys/CaseAPI/task.ts";

test.describe("DSS Update case tests.", () => {
  test("Check for an existing case to update, upload one document and additional information - CY @DSSUpdate", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber01: any = await createFEApplication.createFEApplication(
      page,
      false,
      waUsers_content.userRoleCitizen,
      false,
      false,
      '1234567890',
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
    await page.locator(`a.govuk-link.language:text-is(" English ")`).click();
    await commonHelpers.signOutAndGoToCase(
      page,
      waUsers_content.userRoleAdmin,
      config.CaseAPIBaseURL,
      caseNumber01,
    );
    await task.removeTask(
      page,
      taskNames_content.registerNewCaseTask,
      subjectName,
      waUsers_content.userRoleAdmin,
    );
    await task.removeTask(
      page,
      taskNames_content.processFurtherEvidence,
      subjectName,
      waUsers_content.userRoleAdmin,
    );
  });

  test("Check for an existing case to update, upload one document and no additional information @updateDSSFirefox", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber02: any = await createFEApplication.createFEApplication(
      page,
      false,
      waUsers_content.userRoleCitizen,
      false,
      false,
      '1234567890',
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
    await commonHelpers.signOutAndGoToCase(
      page,
      waUsers_content.userRoleAdmin,
      config.CaseAPIBaseURL,
      caseNumber02,
    );
    await task.removeTask(
      page,
      taskNames_content.registerNewCaseTask,
      subjectName,
      waUsers_content.userRoleAdmin,
    );
    await task.removeTask(
      page,
      taskNames_content.processFurtherEvidence,
      subjectName,
      waUsers_content.userRoleAdmin,
    );
  });

  test("Check for an existing case to update, upload no documents and additional information @updateDSSWebkit", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber03: any = await createFEApplication.createFEApplication(
      page,
      false,
      waUsers_content.userRoleCitizen,
      false,
      false,
      '1234567890',
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
    await commonHelpers.signOutAndGoToCase(
      page,
      waUsers_content.userRoleAdmin,
      config.CaseAPIBaseURL,
      caseNumber03,
    );
    await task.removeTask(
      page,
      taskNames_content.registerNewCaseTask,
      subjectName,
      waUsers_content.userRoleAdmin,
    );
    await task.removeTask(
      page,
      taskNames_content.processFurtherEvidence,
      subjectName,
      waUsers_content.userRoleAdmin,
    );
  });

  test("Test all back buttons on the Update Case application @DSSUpdate", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber04: any = await createFEApplication.createFEApplication(
      page,
      false,
      waUsers_content.userRoleCitizen,
      false,
      false,
      '1234567890',
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
    await task.removeTask(
      page,
      taskNames_content.registerNewCaseTask,
      subjectName,
      waUsers_content.userRoleAdmin,
    );
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

  test("Error messaging @ErrorMessaging", async ({ page }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber05: any = await createFEApplication.createFEApplication(
      page,
      false,
      waUsers_content.userRoleCitizen,
      false,
      false,
      '1234567890',
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
    await task.removeTask(
      page,
      taskNames_content.registerNewCaseTask,
      subjectName,
      waUsers_content.userRoleAdmin,
    );
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

  test("Error messaging - CY @ErrorMessaging", async ({ page }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber06: any = await createFEApplication.createFEApplication(
      page,
      false,
      waUsers_content.userRoleCitizen,
      false,
      false,
      '1234567890',
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
    await task.removeTask(
      page,
      taskNames_content.registerNewCaseTask,
      subjectName,
      waUsers_content.userRoleAdmin,
    );
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

test("Check for an existing case to update - aXe test as it proceeds. @accessibility", async ({
  page,
}) => {
  const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
  const caseNumber07: any = await createFEApplication.createFEApplication(
    page,
    false,
    waUsers_content.userRoleCitizen,
    false,
    false,
    '1234567890',
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
  await commonHelpers.signOutAndGoToCase(
    page,
    waUsers_content.userRoleAdmin,
    config.CaseAPIBaseURL,
    caseNumber07,
  );
  await task.removeTask(
    page,
    taskNames_content.registerNewCaseTask,
    subjectName,
    waUsers_content.userRoleAdmin,
  );
  await task.removeTask(
    page,
    taskNames_content.processFurtherEvidence,
    subjectName,
    waUsers_content.userRoleAdmin,
  );
});
