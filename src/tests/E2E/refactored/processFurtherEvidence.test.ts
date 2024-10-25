import { test } from "@playwright/test";
import createCase from "../../journeys/WA/createCase.ts";
import buildCase from "../../journeys/WA/buildCase.ts";
import task from "../../journeys/WA/task.ts";
import commonHelpers from "../../helpers/commonHelpers.ts";
import events_content from "../../fixtures/content/CaseAPI/events_content.ts";
import documentManagementUpload from "../../journeys/WA/documentManagementUpload.ts";
import contactParties from "../../journeys/WA/contactParties.ts";
import createFEApplication from "../../journeys/WA/DSSCreateCase/createCase.ts";
import editCase from "../../journeys/WA/editCase.ts";
import updateCaseJourney from "../../journeys/DSSUpdateCase/updateCase.ts";
import config from "../../config.ts";
import closeCase from "../../journeys/WA/closeCase.ts";
import referCaseToJudge from "../../journeys/WA/referCaseToJudge.ts";
import referCaseToLegalOfficer from "../../journeys/WA/referCaseToLegalOfficer.ts";
import documentManagementAmend from "../../journeys/WA/documentManagementAmend.ts";
import myWorkPage from "../../pages/WA/myWorkPage.ts";
import tasksPage from "../../pages/WA/tasksPage.ts";

const taskName = "Process further evidence";
const priority = " low ";
const assignedUserAdmin = "sptribswa hearingcentreadmin";
const userRoleAdmin = "waHearingCentreAdmin";
const numberOfDays = 7;
const eventContactParties = "Case: Contact parties";
const eventEditCase = "Case: Edit case";
const eventUploadDoc = "Document management: Upload";
const eventRefer = "Refer case to judge";
const eventReferLO = "Refer case to legal officer";
const eventAmendDoc = "Document management: Amend";
const caseManagementState = "Case management";
const caseClosedState = "Case closed";
const taskRemoved = " Issue Case To Respondent ";

test.describe("Process further evidence task tests @CaseAPI", (): void => {
  test("Task is completable via next steps link - assign to me and go to task", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber160 = await createFEApplication.createFEApplication(
      page,
      false,
      "demoCitizen",
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
    console.log(`Case Number : ${caseNumber160}`);
    await commonHelpers.signOutAndGoToCase(
      page,
      userRoleAdmin,
      config.CaseAPIBaseURL,
      caseNumber160,
    );
    await commonHelpers.chooseEventFromDropdown(page, eventEditCase);
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
    await task.seeTask(page, userRoleAdmin, false, taskName, subjectName);
    await task.initiateTask(
      page,
      userRoleAdmin,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber160,
      taskName,
      priority,
      assignedUserAdmin,
      numberOfDays,
      eventReferLO,
      caseManagementState,
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
      taskName,
      caseNumber160,
      caseManagementState,
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
      "demoCitizen",
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
    console.log(`Case Number : ${caseNumber161}`);
    await commonHelpers.signOutAndGoToCase(
      page,
      userRoleAdmin,
      config.CaseAPIBaseURL,
      caseNumber161,
    );
    await commonHelpers.chooseEventFromDropdown(page, eventEditCase);
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
    await task.seeTask(page, userRoleAdmin, false, taskName, subjectName);
    await task.initiateTask(
      page,
      userRoleAdmin,
      "Link: Assign Task to Me",
      false,
      caseNumber161,
      taskName,
      priority,
      assignedUserAdmin,
      numberOfDays,
      eventRefer,
      caseManagementState,
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
      taskName,
      caseNumber161,
      caseManagementState,
      subjectName,
    );
  });

  test("Task is completed via event dropdown", async ({ page }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber162 = await createCase.createCase(
      page,
      userRoleAdmin,
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
    console.log(`Case Number : ${caseNumber162}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber162, subjectName);
    await task.removeTask(page, taskRemoved, subjectName);
    await commonHelpers.chooseEventFromDropdown(page, eventUploadDoc);
    await documentManagementUpload.documentManagementUpload(
      page,
      false,
      false,
      false,
      caseNumber162,
      subjectName,
    );
    await task.seeTask(page, userRoleAdmin, true, taskName, subjectName);
    await task.initiateTask(
      page,
      userRoleAdmin,
      "Event DropDown",
      true,
      caseNumber162,
      taskName,
      priority,
      assignedUserAdmin,
      numberOfDays,
      eventEditCase,
      caseManagementState,
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
      taskName,
      caseNumber162,
      caseManagementState,
      subjectName,
    );
  });

  test("Document management: Upload - Contact parties @crossbrowserCaseAPI", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber163 = await createCase.createCase(
      page,
      userRoleAdmin,
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
    console.log(`Case Number : ${caseNumber163}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber163, subjectName);
    await task.removeTask(page, taskRemoved, subjectName);
    await commonHelpers.chooseEventFromDropdown(page, eventUploadDoc);
    await documentManagementUpload.documentManagementUpload(
      page,
      false,
      false,
      false,
      caseNumber163,
      subjectName,
    );
    await task.seeTask(page, userRoleAdmin, true, taskName, subjectName);
    await task.initiateTask(
      page,
      userRoleAdmin,
      "Event DropDown",
      true,
      caseNumber163,
      taskName,
      priority,
      assignedUserAdmin,
      numberOfDays,
      eventContactParties,
      caseManagementState,
      subjectName,
    );
    await contactParties.contactParties(
      page,
      userRoleAdmin,
      false,
      false,
      caseNumber163,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      true,
      taskName,
      caseNumber163,
      caseManagementState,
      subjectName,
    );
  });

  test("Task is cancellable through close case", async ({ page }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber164 = await createCase.createCase(
      page,
      userRoleAdmin,
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
    console.log(`Case Number : ${caseNumber164}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber164, subjectName);
    await task.removeTask(page, taskRemoved, subjectName);
    await commonHelpers.chooseEventFromDropdown(page, eventUploadDoc);
    await documentManagementUpload.documentManagementUpload(
      page,
      false,
      false,
      false,
      caseNumber164,
      subjectName,
    );
    await task.seeTask(page, userRoleAdmin, false, taskName, subjectName);
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
      taskName,
      caseNumber164,
      caseClosedState,
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
    userRoleAdmin,
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
  console.log(`Case Number : ${caseNumber165}`);
  await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
  await buildCase.buildCase(page, false, caseNumber165, subjectName);
  await task.removeTask(page, taskRemoved, subjectName);
  await commonHelpers.chooseEventFromDropdown(page, eventUploadDoc);
  await documentManagementUpload.documentManagementUpload(
    page,
    false,
    false,
    false,
    caseNumber165,
    subjectName,
  );
  await task.seeTask(page, userRoleAdmin, true, taskName, subjectName);
  await task.initiateTask(
    page,
    userRoleAdmin,
    "Link: Assign Task to Me and Go To Task",
    true,
    caseNumber165,
    taskName,
    priority,
    assignedUserAdmin,
    numberOfDays,
    eventAmendDoc,
    caseManagementState,
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
    taskName,
    caseNumber165,
    caseManagementState,
    subjectName,
  );
});
