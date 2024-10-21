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
    let caseNumber01: any;
    caseNumber01 = await createFEApplication.createFEApplication(
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
    );
    console.log(`Case Number : ${caseNumber01}`);
    await commonHelpers.signOutAndGoToCase(
      page,
      userRoleAdmin,
      config.CaseAPIBaseURL,
      caseNumber01,
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
      caseNumber01,
    );
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber01);
    await tasksPage.markTasksAsDone(page, caseNumber01, 3, [
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
      caseNumber01,
      true,
      true,
      false,
      false,
      false,
    );
    await task.seeTask(page, userRoleAdmin, false, taskName);
    await task.initiateTask(
      page,
      userRoleAdmin,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber01,
      taskName,
      priority,
      assignedUserAdmin,
      numberOfDays,
      eventReferLO,
      caseManagementState,
    );
    await referCaseToLegalOfficer.referCaseToLegalOfficer(
      page,
      false,
      "Other",
      false,
      caseNumber01,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber01,
      caseManagementState,
    );
  });

  test("Task is completable via next steps link - assign to me", async ({
    page,
  }) => {
    let caseNumber02: any;
    caseNumber02 = await createFEApplication.createFEApplication(
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
    );
    console.log(`Case Number : ${caseNumber02}`);
    await commonHelpers.signOutAndGoToCase(
      page,
      userRoleAdmin,
      config.CaseAPIBaseURL,
      caseNumber02,
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
      caseNumber02,
    );
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber02);
    await tasksPage.markTasksAsDone(page, caseNumber02, 3, [
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
      caseNumber02,
      true,
      true,
      true,
      false,
      false,
    );
    await task.seeTask(page, userRoleAdmin, false, taskName);
    await task.initiateTask(
      page,
      userRoleAdmin,
      "Link: Assign Task to Me",
      false,
      caseNumber02,
      taskName,
      priority,
      assignedUserAdmin,
      numberOfDays,
      eventRefer,
      caseManagementState,
    );
    await referCaseToJudge.referCaseToJudge(
      page,
      false,
      "Other",
      false,
      caseNumber02,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber02,
      caseManagementState,
    );
  });

  test("Task is completed via event dropdown", async ({ page }) => {
    let caseNumber03: any;
    caseNumber03 = await createCase.createCase(
      page,
      userRoleAdmin,
      false,
      "Assessment",
      "Other",
      true,
      true,
      "Email",
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
    console.log(`Case Number : ${caseNumber03}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber03);
    await task.removeTask(page, taskRemoved);
    await commonHelpers.chooseEventFromDropdown(page, eventUploadDoc);
    await documentManagementUpload.documentManagementUpload(
      page,
      false,
      false,
      false,
      caseNumber03,
    );
    await task.seeTask(page, userRoleAdmin, true, taskName);
    await task.initiateTask(
      page,
      userRoleAdmin,
      "Event DropDown",
      true,
      caseNumber03,
      taskName,
      priority,
      assignedUserAdmin,
      numberOfDays,
      eventEditCase,
      caseManagementState,
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
      caseNumber03,
    );
    await task.checkCompletedTask(
      page,
      true,
      taskName,
      caseNumber03,
      caseManagementState,
    );
  });

  test("Document management: Upload - Contact parties", async ({ page }) => {
    let caseNumber04: any;
    caseNumber04 = await createCase.createCase(
      page,
      userRoleAdmin,
      false,
      "Assessment",
      "Other",
      true,
      true,
      "Email",
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
    console.log(`Case Number : ${caseNumber04}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber04);
    await task.removeTask(page, taskRemoved);
    await commonHelpers.chooseEventFromDropdown(page, eventUploadDoc);
    await documentManagementUpload.documentManagementUpload(
      page,
      false,
      false,
      false,
      caseNumber04,
    );
    await task.seeTask(page, userRoleAdmin, true, taskName);
    await task.initiateTask(
      page,
      userRoleAdmin,
      "Event DropDown",
      true,
      caseNumber04,
      taskName,
      priority,
      assignedUserAdmin,
      numberOfDays,
      eventContactParties,
      caseManagementState,
    );
    await contactParties.contactParties(
      page,
      userRoleAdmin,
      false,
      false,
      caseNumber04,
    );
    await task.checkCompletedTask(
      page,
      true,
      taskName,
      caseNumber04,
      caseManagementState,
    );
  });

  test("Task is cancellable through close case", async ({ page }) => {
    let caseNumber05: any;
    caseNumber05 = await createCase.createCase(
      page,
      userRoleAdmin,
      false,
      "Assessment",
      "Other",
      true,
      true,
      "Email",
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
    console.log(`Case Number : ${caseNumber05}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber05);
    await task.removeTask(page, taskRemoved);
    await commonHelpers.chooseEventFromDropdown(page, eventUploadDoc);
    await documentManagementUpload.documentManagementUpload(
      page,
      false,
      false,
      false,
      caseNumber05,
    );
    await task.seeTask(page, userRoleAdmin, false, taskName);
    await myWorkPage.clickAssignAndGoToTask(page);
    await commonHelpers.chooseEventFromDropdown(page, events_content.closeCase);
    await closeCase.closeCase(
      page,
      false,
      false,
      "deathOfAppellant",
      true,
      null,
      null,
      caseNumber05,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber05,
      caseClosedState,
    );
  });
});

test("Task completion: Accessibility test @accessibilityCaseAPI", async ({
  page,
}) => {
  let caseNumber06: any;
  caseNumber06 = await createCase.createCase(
    page,
    userRoleAdmin,
    false,
    "Assessment",
    "Other",
    true,
    true,
    "Email",
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
  console.log(`Case Number : ${caseNumber06}`);
  await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
  await buildCase.buildCase(page, false, caseNumber06);
  await task.removeTask(page, taskRemoved);
  await commonHelpers.chooseEventFromDropdown(page, eventUploadDoc);
  await documentManagementUpload.documentManagementUpload(
    page,
    false,
    false,
    false,
    caseNumber06,
  );
  await task.seeTask(page, userRoleAdmin, true, taskName);
  await task.initiateTask(
    page,
    userRoleAdmin,
    "Link: Assign Task to Me and Go To Task",
    true,
    caseNumber06,
    taskName,
    priority,
    assignedUserAdmin,
    numberOfDays,
    eventAmendDoc,
    caseManagementState,
  );
  await documentManagementAmend.documentManagementAmend(
    page,
    true,
    caseNumber06,
  );
  await task.checkCompletedTask(
    page,
    true,
    taskName,
    caseNumber06,
    caseManagementState,
  );
});
