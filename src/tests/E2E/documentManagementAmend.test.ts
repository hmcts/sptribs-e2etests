import { test } from "@playwright/test";
import waUsers_content from "../fixtures/content/waUsers_content.ts";
import states_content from "../fixtures/content/states_content.ts";
import documentManagementAmend from "../journeys/CaseAPI/documentManagementAmend.ts";
import commonHelpers from "../helpers/commonHelpers.ts";
import createCase from "../journeys/CaseAPI/createCase.ts";
import documentManagementUpload from "../journeys/CaseAPI/documentManagementUpload.ts";
import events_content from "../fixtures/content/CaseAPI/events_content.ts";
import buildCase from "../journeys/CaseAPI/buildCase.ts";
import hearingOptions from "../journeys/CaseAPI/hearingOptions.ts";
import createListing from "../journeys/CaseAPI/createListing.ts";
import createSummary from "../journeys/CaseAPI/createSummary.ts";
import closeCase from "../journeys/CaseAPI/closeCase.ts";
import createEditStay from "../journeys/CaseAPI/createEditStay.ts";
import testDataCleanUp from "../helpers/testDataCleanUp.ts";
import task from "../journeys/CaseAPI/task.ts";
import taskNames_content from "../fixtures/content/taskNames_content.ts";

test.describe("Case-API Amend document tests. @CaseAPI", () => {
  test("Check for redundant test data", async ({ page }) => {
    test.setTimeout(10 * 60 * 1000);
    await testDataCleanUp(page, waUsers_content.userRoleAdmin);
  });
  test("Amend documents uploaded to a submitted case.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2500 = await createCase.createCase(
      page,
      waUsers_content.userRoleAdmin,
      false,
      "Assessment",
      "Other",
      true,
      true,
      "Email",
      subjectName,
      true,
      false,
      "1996",
      "Scotland",
      true,
      true,
      true,
      false,
      true,
      false,
    );
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Document management: Upload",
    );
    await documentManagementUpload.documentManagementUpload(
      page,
      false,
      false,
      false,
      caseNumber2500,
      subjectName,
    );
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Document management: Amend",
    );
    await documentManagementAmend.documentManagementAmend(
      page,
      false,
      caseNumber2500,
      subjectName,
    );
  });

  test("Amend documents uploaded to a case in Ready to List. @CaseAPI1", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2501 = await createCase.createCase(
      page,
      waUsers_content.userRoleAdmin,
      false,
      "Assessment",
      "Other",
      true,
      true,
      "Email",
      subjectName,
      true,
      false,
      "1996",
      "Scotland",
      true,
      true,
      true,
      false,
      true,
      false,
    );
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber2501, subjectName);
    await task.removeTask(
      page,
      taskNames_content.issueCaseToRespondentTask,
      subjectName,
      waUsers_content.userRoleAdmin,
    );
    await hearingOptions.hearingOptions(
      page,
      false,
      false,
      null,
      false,
      false,
      "Face to Face",
      false,
      false,
      caseNumber2501,
      subjectName,
    );
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Document management: Upload",
    );
    await documentManagementUpload.documentManagementUpload(
      page,
      false,
      false,
      false,
      caseNumber2501,
      subjectName,
    );
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Document management: Amend",
    );
    await documentManagementAmend.documentManagementAmend(
      page,
      false,
      caseNumber2501,
      subjectName,
    );
  });

  test("Amend documents uploaded to a case awaiting a hearing.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2502 = await createCase.createCase(
      page,
      waUsers_content.userRoleAdmin,
      false,
      "Assessment",
      "Other",
      true,
      true,
      "Email",
      subjectName,
      true,
      false,
      "1996",
      "Scotland",
      true,
      true,
      true,
      false,
      true,
      false,
    );
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber2502, subjectName);
    await task.removeTask(
      page,
      taskNames_content.issueCaseToRespondentTask,
      subjectName,
      waUsers_content.userRoleAdmin,
    );
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Hearings: Create listing",
    );
    await createListing.createListing(
      page,
      false,
      true,
      "1-London",
      "Case management",
      "Face to Face",
      "Morning",
      false,
      "East London Tribunal Hearing Centre-2 Clove Crescent, East India Dock London",
      false,
      caseNumber2502,
      subjectName,
      false,
    );
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Document management: Upload",
    );
    await documentManagementUpload.documentManagementUpload(
      page,
      false,
      true,
      false,
      caseNumber2502,
      subjectName,
    );
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Document management: Amend",
    );
    await documentManagementAmend.documentManagementAmend(
      page,
      false,
      caseNumber2502,
      subjectName,
    );
  });

  test("Amend documents uploaded to a case awaiting an outcome. ", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2503 = await createCase.createCase(
      page,
      waUsers_content.userRoleAdmin,
      false,
      "Assessment",
      "Other",
      true,
      true,
      "Email",
      subjectName,
      true,
      false,
      "1996",
      "Scotland",
      true,
      true,
      true,
      false,
      true,
      false,
    );
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber2503, subjectName);
    await task.removeTask(
      page,
      taskNames_content.issueCaseToRespondentTask,
      subjectName,
      waUsers_content.userRoleAdmin,
    );
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Hearings: Create listing",
    );
    await createListing.createListing(
      page,
      false,
      true,
      "1-London",
      "Case management",
      "Face to Face",
      "Morning",
      false,
      "East London Tribunal Hearing Centre-2 Clove Crescent, East India Dock London",
      false,
      caseNumber2503,
      subjectName,
      false,
    );
    await createSummary.createSummary(
      page,
      false,
      "Case management",
      "Face to Face",
      "Morning",
      false,
      "East London Tribunal Hearing Centre-2 Clove Crescent, East India Dock London",
      "East London Tribunal Hearing Centre",
      "Allowed",
      null,
      true,
      false,
      false,
      caseNumber2503,
      subjectName,
    );
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Document management: Upload",
    );
    await documentManagementUpload.documentManagementUpload(
      page,
      false,
      false,
      false,
      caseNumber2503,
      subjectName,
    );
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Document management: Amend",
    );
    await documentManagementAmend.documentManagementAmend(
      page,
      false,
      caseNumber2503,
      subjectName,
    );
  });

  test("Amend documents uploaded to a closed case. @crossbrowserCaseAPI", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2504 = await createCase.createCase(
      page,
      waUsers_content.userRoleAdmin,
      false,
      "Assessment",
      "Other",
      true,
      true,
      "Email",
      subjectName,
      true,
      false,
      "1996",
      "Scotland",
      true,
      true,
      true,
      false,
      true,
      false,
    );
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber2504, subjectName);
    await task.removeTask(
      page,
      taskNames_content.issueCaseToRespondentTask,
      subjectName,
      waUsers_content.userRoleAdmin,
    );
    await commonHelpers.chooseEventFromDropdown(page, events_content.closeCase);
    await closeCase.closeCase(
      page,
      false,
      false,
      "caseWithdrawn",
      false,
      null,
      null,
      caseNumber2504,
      subjectName,
      false,
    );
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Document management: Upload",
    );
    await documentManagementUpload.documentManagementUpload(
      page,
      false,
      true,
      false,
      caseNumber2504,
      subjectName,
    );
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Document management: Amend",
    );
    await documentManagementAmend.documentManagementAmend(
      page,
      false,
      caseNumber2504,
      subjectName,
    );
  });

  test("Amend documents uploaded to a Stayed case.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2505 = await createCase.createCase(
      page,
      waUsers_content.userRoleAdmin,
      false,
      "Assessment",
      "Other",
      true,
      true,
      "Email",
      subjectName,
      true,
      false,
      "1996",
      "Scotland",
      true,
      true,
      true,
      false,
      true,
      false,
    );
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber2505, subjectName);
    await task.removeTask(
      page,
      taskNames_content.issueCaseToRespondentTask,
      subjectName,
      waUsers_content.userRoleAdmin,
    );
    await createEditStay.createEditStay(
      page,
      false,
      false,
      "awaitingACourtJudgement",
      false,
      caseNumber2505,
      subjectName,
      states_content.caseStayedState,
      false,
    );
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Document management: Upload",
    );
    await documentManagementUpload.documentManagementUpload(
      page,
      false,
      false,
      false,
      caseNumber2505,
      subjectName,
    );
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Document management: Amend",
    );
    await documentManagementAmend.documentManagementAmend(
      page,
      false,
      caseNumber2505,
      subjectName,
    );
  });
});
