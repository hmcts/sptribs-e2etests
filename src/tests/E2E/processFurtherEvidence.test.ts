import { test } from "@playwright/test";
import waUsers_content from "../fixtures/content/waUsers_content.ts";
import authors_content from "../fixtures/content/authors_content.ts";
import states_content from "../fixtures/content/states_content.ts";
import taskNames_content from "../fixtures/content/taskNames_content.ts";
import createCase from "../journeys/CaseAPI/createCase.ts";
import buildCase from "../journeys/CaseAPI/buildCase.ts";
import task from "../journeys/CaseAPI/task.ts";
import commonHelpers from "../helpers/commonHelpers.ts";
import events_content from "../fixtures/content/CaseAPI/events_content.ts";
import documentManagementUpload from "../journeys/CaseAPI/documentManagementUpload.ts";
import contactParties from "../journeys/CaseAPI/contactParties.ts";
import createFEApplication from "../journeys/DSSCreateCase/createCase.ts";
import editCase from "../journeys/CaseAPI/editCase.ts";
import updateCaseJourney from "../journeys/DSSUpdateCase/updateCase.ts";
import config from "../config.ts";
import closeCase from "../journeys/CaseAPI/closeCase.ts";
import referCaseToJudge from "../journeys/CaseAPI/referCaseToJudge.ts";
import referCaseToLegalOfficer from "../journeys/CaseAPI/referCaseToLegalOfficer.ts";
import documentManagementAmend from "../journeys/CaseAPI/documentManagementAmend.ts";
import myWorkPage from "../pages/WA/myWorkPage.ts";
import tasksPage from "../pages/WA/tasksPage.ts";
import testDataCleanUp from "../helpers/testDataCleanUp.ts";

const priority = " low ";
const numberOfDays = 7;

test.describe("Process further evidence task tests @CaseAPI", (): void => {
  test("Check for redundant test data", async ({ page }) => {
    test.setTimeout(20 * 60 * 1000);
    await testDataCleanUp(page, waUsers_content.userRoleAdmin);
  });
  test("Task is completable via next steps link - assign to me and go to task", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber160 = await createFEApplication.createFEApplication(
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
      caseNumber160,
    );
    await commonHelpers.chooseEventFromDropdown(page, "Case: Edit case");
    await editCase.editCase(
      page,
      false,
      "DSS Submitted",
      "Assessment",
      "Medical Re-opening",
      false,
      false,
      "Email",
      true,
      "2001",
      "London",
      true,
      false,
      true,
      false,
      false,
      caseNumber160,
      subjectName,
    );
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber160, subjectName);
    await tasksPage.markTasksAsDone(page, caseNumber160, 3, [
      "Register New Case",
      "Vet New Case Documents",
      "Issue Case To Respondent",
    ]);
    await page.locator(`a:text-is(" Sign out ")`).click();
    await page.waitForLoadState("domcontentloaded");
    await updateCaseJourney.updateCase(
      page,
      false,
      false,
      caseNumber160,
      true,
      true,
      false,
      false,
      false,
      subjectName,
    );
    await task.seeTask(
      page,
      waUsers_content.userRoleAdmin,
      false,
      taskNames_content.processFurtherEvidence,
      subjectName,
    );
    await task.initiateTask(
      page,
      waUsers_content.userRoleAdmin,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber160,
      taskNames_content.processFurtherEvidence,
      priority,
      authors_content.assignedUserAdmin,
      numberOfDays,
      "Refer case to legal officer",
      states_content.caseManagementState,
      subjectName,
    );
    await referCaseToLegalOfficer.referCaseToLegalOfficer(
      page,
      false,
      "Other",
      false,
      caseNumber160,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.processFurtherEvidence,
      caseNumber160,
      states_content.caseManagementState,
      subjectName,
    );
  });

  test("Task is completable via next steps link - assign to me", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber161 = await createFEApplication.createFEApplication(
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
      caseNumber161,
    );
    await commonHelpers.chooseEventFromDropdown(page, "Case: Edit case");
    await editCase.editCase(
      page,
      false,
      "DSS Submitted",
      "Assessment",
      "Medical Re-opening",
      false,
      false,
      "Email",
      true,
      "2001",
      "London",
      true,
      false,
      true,
      false,
      false,
      caseNumber161,
      subjectName,
    );
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber161, subjectName);
    await tasksPage.markTasksAsDone(page, caseNumber161, 3, [
      "Register New Case",
      "Vet New Case Documents",
      "Issue Case To Respondent",
    ]);
    await page.locator(`a:text-is(" Sign out ")`).click();
    await page.waitForLoadState("domcontentloaded");
    await updateCaseJourney.updateCase(
      page,
      false,
      false,
      caseNumber161,
      true,
      true,
      true,
      false,
      false,
      subjectName,
    );
    await task.seeTask(
      page,
      waUsers_content.userRoleAdmin,
      false,
      taskNames_content.processFurtherEvidence,
      subjectName,
    );
    await task.initiateTask(
      page,
      waUsers_content.userRoleAdmin,
      "Link: Assign Task to Me",
      false,
      caseNumber161,
      taskNames_content.processFurtherEvidence,
      priority,
      authors_content.assignedUserAdmin,
      numberOfDays,
      "Refer case to judge",
      states_content.caseManagementState,
      subjectName,
    );
    await referCaseToJudge.referCaseToJudge(
      page,
      false,
      "Other",
      false,
      caseNumber161,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.processFurtherEvidence,
      caseNumber161,
      states_content.caseManagementState,
      subjectName,
    );
  });

  test("Task is completed via event dropdown", async ({ page }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber162 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber162, subjectName);
    await task.removeTask(
      page,
      taskNames_content.issueCaseToRespondentTask,
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
      caseNumber162,
      subjectName,
    );
    await task.seeTask(
      page,
      waUsers_content.userRoleAdmin,
      true,
      taskNames_content.processFurtherEvidence,
      subjectName,
    );
    await task.initiateTask(
      page,
      waUsers_content.userRoleAdmin,
      "Event DropDown",
      true,
      caseNumber162,
      taskNames_content.processFurtherEvidence,
      priority,
      authors_content.assignedUserAdmin,
      numberOfDays,
      "Case: Edit case",
      states_content.caseManagementState,
      subjectName,
    );
    await editCase.editCase(
      page,
      false,
      "Case Management",
      "Eligibility",
      "Fatal",
      true,
      true,
      "Email",
      true,
      "1996",
      "Scotland",
      true,
      false,
      true,
      false,
      false,
      caseNumber162,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      true,
      taskNames_content.processFurtherEvidence,
      caseNumber162,
      states_content.caseManagementState,
      subjectName,
    );
  });

  test("Document management: Upload - Contact parties @crossbrowserCaseAPI", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber163 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber163, subjectName);
    await task.removeTask(
      page,
      taskNames_content.issueCaseToRespondentTask,
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
      caseNumber163,
      subjectName,
    );
    await task.seeTask(
      page,
      waUsers_content.userRoleAdmin,
      true,
      taskNames_content.processFurtherEvidence,
      subjectName,
    );
    await task.initiateTask(
      page,
      waUsers_content.userRoleAdmin,
      "Event DropDown",
      true,
      caseNumber163,
      taskNames_content.processFurtherEvidence,
      priority,
      authors_content.assignedUserAdmin,
      numberOfDays,
      "Case: Contact parties",
      states_content.caseManagementState,
      subjectName,
    );
    await contactParties.contactParties(
      page,
      waUsers_content.userRoleAdmin,
      false,
      false,
      caseNumber163,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      true,
      taskNames_content.processFurtherEvidence,
      caseNumber163,
      states_content.caseManagementState,
      subjectName,
    );
  });

  test("Task is cancellable through close case", async ({ page }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber164 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber164, subjectName);
    await task.removeTask(
      page,
      taskNames_content.issueCaseToRespondentTask,
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
      caseNumber164,
      subjectName,
    );
    await task.seeTask(
      page,
      waUsers_content.userRoleAdmin,
      false,
      taskNames_content.processFurtherEvidence,
      subjectName,
    );
    await myWorkPage.clickAssignAndGoToTask(page, subjectName);
    await commonHelpers.chooseEventFromDropdown(page, events_content.closeCase);
    await closeCase.closeCase(
      page,
      false,
      false,
      "deathOfAppellant",
      true,
      null,
      null,
      caseNumber164,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.processFurtherEvidence,
      caseNumber164,
      states_content.closedState,
      subjectName,
    );
  });
});

test("Task completion: Accessibility test @accessibilityCaseAPI @crossbrowserCaseAPI", async ({
  page,
}) => {
  const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
  const caseNumber165 = await createCase.createCase(
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
  await buildCase.buildCase(page, false, caseNumber165, subjectName);
  await task.removeTask(
    page,
    taskNames_content.issueCaseToRespondentTask,
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
    caseNumber165,
    subjectName,
  );
  await task.seeTask(
    page,
    waUsers_content.userRoleAdmin,
    true,
    taskNames_content.processFurtherEvidence,
    subjectName,
  );
  await task.initiateTask(
    page,
    waUsers_content.userRoleAdmin,
    "Link: Assign Task to Me and Go To Task",
    true,
    caseNumber165,
    taskNames_content.processFurtherEvidence,
    priority,
    authors_content.assignedUserAdmin,
    numberOfDays,
    "Document management: Amend",
    states_content.caseManagementState,
    subjectName,
  );
  await documentManagementAmend.documentManagementAmend(
    page,
    true,
    caseNumber165,
    subjectName,
  );
  await task.checkCompletedTask(
    page,
    true,
    taskNames_content.processFurtherEvidence,
    caseNumber165,
    states_content.caseManagementState,
    subjectName,
  );
});
