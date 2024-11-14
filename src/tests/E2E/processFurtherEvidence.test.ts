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
import hearingOptions from "../journeys/CaseAPI/hearingOptions.ts";
import createListing from "../journeys/CaseAPI/createListing.ts";
import createSummary from "../journeys/CaseAPI/createSummary.ts";
import createEditStay from "../journeys/CaseAPI/createEditStay.ts";

const priority = " low ";
const numberOfDays = 7;

test.describe("Process further evidence task tests @CaseAPI @CaseAPI4", (): void => {
  test("Check for redundant test data @crossbrowserCaseAPI", async ({
    page,
  }) => {
    test.setTimeout(10 * 60 * 1000);
    await testDataCleanUp(page, waUsers_content.userRoleAdmin);
  });

  test("DSS Submitted - DSS Update - Edit case", async ({ page }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2600 = await createFEApplication.createFEApplication(
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
      caseNumber2600,
    );
    await page.locator(`a:text-is(" Sign out ")`).click();
    await page.waitForLoadState("domcontentloaded");
    await updateCaseJourney.updateCase(
      page,
      false,
      false,
      caseNumber2600,
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
      caseNumber2600,
      taskNames_content.processFurtherEvidence,
      priority,
      authors_content.assignedUserAdmin,
      numberOfDays,
      "Case: Edit case",
      states_content.DSSSubmittedState,
      subjectName,
    );
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
      caseNumber2600,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.processFurtherEvidence,
      caseNumber2600,
      states_content.submittedState,
      subjectName,
    );
    await task.removeTask(
      page,
      taskNames_content.registerNewCaseTask,
      subjectName,
      waUsers_content.userRoleAdmin,
    );
  });

  test("Submitted - DSS Update - Edit case", async ({ page }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2601 = await createFEApplication.createFEApplication(
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
      caseNumber2601,
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
      caseNumber2601,
      subjectName,
    );
    await page.locator(`a:text-is(" Sign out ")`).click();
    await page.waitForLoadState("domcontentloaded");
    await updateCaseJourney.updateCase(
      page,
      false,
      false,
      caseNumber2601,
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
      caseNumber2601,
      taskNames_content.processFurtherEvidence,
      priority,
      authors_content.assignedUserAdmin,
      numberOfDays,
      "Case: Edit case",
      states_content.submittedState,
      subjectName,
    );
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
      caseNumber2601,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.processFurtherEvidence,
      caseNumber2601,
      states_content.submittedState,
      subjectName,
    );
    await task.removeTask(
      page,
      taskNames_content.registerNewCaseTask,
      subjectName,
      waUsers_content.userRoleAdmin,
    );
    await task.removeTask(
      page,
      taskNames_content.vetNewCaseDocuments,
      subjectName,
      waUsers_content.userRoleAdmin,
    );
  });

  test("Submitted - Doc upload - Doc amend", async ({ page }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2602 = await createCase.createCase(
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
      caseNumber2602,
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
      caseNumber2602,
      taskNames_content.processFurtherEvidence,
      priority,
      authors_content.assignedUserAdmin,
      numberOfDays,
      "Document management: Amend",
      states_content.submittedState,
      subjectName,
    );
    await documentManagementAmend.documentManagementAmend(
      page,
      false,
      caseNumber2602,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.processFurtherEvidence,
      caseNumber2602,
      states_content.submittedState,
      subjectName,
    );
  });

  test("Submitted - Doc upload - Contact parties", async ({ page }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2603 = await createCase.createCase(
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
      caseNumber2603,
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
      "Event DropDown",
      false,
      caseNumber2603,
      taskNames_content.processFurtherEvidence,
      priority,
      authors_content.assignedUserAdmin,
      numberOfDays,
      "Case: Contact parties",
      states_content.submittedState,
      subjectName,
    );
    await contactParties.contactParties(
      page,
      waUsers_content.userRoleAdmin,
      false,
      false,
      caseNumber2603,
      subjectName,
      true,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.processFurtherEvidence,
      caseNumber2603,
      states_content.submittedState,
      subjectName,
    );
  });

  test("Case management - Task is completable via next steps link - assign to me and go to task", async ({
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
    await tasksPage.markTasksAsDone(page, caseNumber160, 2, [
      "Register New Case",
      "Vet New Case Documents",
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

  test("Case management - Task is completable via next steps link - assign to me", async ({
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

  test("Case management - Task is completed via event dropdown", async ({
    page,
  }) => {
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
      false,
      taskNames_content.processFurtherEvidence,
      subjectName,
    );
    await task.initiateTask(
      page,
      waUsers_content.userRoleAdmin,
      "Event DropDown",
      false,
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
      false,
      taskNames_content.processFurtherEvidence,
      caseNumber162,
      states_content.caseManagementState,
      subjectName,
    );
  });

  test("Case management - Document management: Upload - Contact parties @crossbrowserCaseAPI", async ({
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
      false,
      taskNames_content.processFurtherEvidence,
      subjectName,
    );
    await task.initiateTask(
      page,
      waUsers_content.userRoleAdmin,
      "Event DropDown",
      false,
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
      true,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.processFurtherEvidence,
      caseNumber163,
      states_content.caseManagementState,
      subjectName,
    );
  });

  test("Ready to list - Update case - Refer to legal officer", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2604 = await createFEApplication.createFEApplication(
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
      caseNumber2604,
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
      caseNumber2604,
      subjectName,
    );
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber2604, subjectName);
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
      caseNumber2604,
      subjectName,
    );
    await page.locator(`a:text-is(" Sign out ")`).click();
    await page.waitForLoadState("domcontentloaded");
    await updateCaseJourney.updateCase(
      page,
      false,
      false,
      caseNumber2604,
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
      caseNumber2604,
      taskNames_content.processFurtherEvidence,
      priority,
      authors_content.assignedUserAdmin,
      numberOfDays,
      "Refer case to legal officer",
      states_content.readyToListState,
      subjectName,
    );
    await referCaseToLegalOfficer.referCaseToLegalOfficer(
      page,
      false,
      "Listing directions",
      false,
      caseNumber2604,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.processFurtherEvidence,
      caseNumber2604,
      states_content.readyToListState,
      subjectName,
    );
    await task.removeTask(
      page,
      taskNames_content.registerNewCaseTask,
      subjectName,
      waUsers_content.userRoleAdmin,
    );
    await task.removeTask(
      page,
      taskNames_content.vetNewCaseDocuments,
      subjectName,
      waUsers_content.userRoleAdmin,
    );
  });

  test("Ready to list - Update case - Refer to judge", async ({ page }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2605 = await createFEApplication.createFEApplication(
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
      caseNumber2605,
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
      caseNumber2605,
      subjectName,
    );
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber2605, subjectName);
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
      caseNumber2605,
      subjectName,
    );
    await page.locator(`a:text-is(" Sign out ")`).click();
    await page.waitForLoadState("domcontentloaded");
    await updateCaseJourney.updateCase(
      page,
      false,
      false,
      caseNumber2605,
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
      caseNumber2605,
      taskNames_content.processFurtherEvidence,
      priority,
      authors_content.assignedUserAdmin,
      numberOfDays,
      "Refer case to judge",
      states_content.readyToListState,
      subjectName,
    );
    await referCaseToJudge.referCaseToJudge(
      page,
      false,
      "Listing directions",
      false,
      caseNumber2605,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.processFurtherEvidence,
      caseNumber2605,
      states_content.readyToListState,
      subjectName,
    );
    await task.removeTask(
      page,
      taskNames_content.registerNewCaseTask,
      subjectName,
      waUsers_content.userRoleAdmin,
    );
    await task.removeTask(
      page,
      taskNames_content.vetNewCaseDocuments,
      subjectName,
      waUsers_content.userRoleAdmin,
    );
  });

  test("Ready to list - Doc upload - Edit case", async ({ page }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2606 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber2606, subjectName);
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
      caseNumber2606,
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
      caseNumber2606,
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
      caseNumber2606,
      taskNames_content.processFurtherEvidence,
      priority,
      authors_content.assignedUserAdmin,
      numberOfDays,
      "Case: Edit case",
      states_content.readyToListState,
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
      caseNumber2606,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.processFurtherEvidence,
      caseNumber2606,
      states_content.readyToListState,
      subjectName,
    );
  });

  test("Ready to list - Doc upload - Contact parties", async ({ page }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2607 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber2607, subjectName);
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
      caseNumber2607,
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
      caseNumber2607,
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
      caseNumber2607,
      taskNames_content.processFurtherEvidence,
      priority,
      authors_content.assignedUserAdmin,
      numberOfDays,
      "Case: Contact parties",
      states_content.readyToListState,
      subjectName,
    );
    await contactParties.contactParties(
      page,
      waUsers_content.userRoleAdmin,
      false,
      false,
      caseNumber2607,
      subjectName,
      true,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.processFurtherEvidence,
      caseNumber2607,
      states_content.readyToListState,
      subjectName,
    );
  });

  test("Ready to list - Doc upload - Doc amend", async ({ page }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2608 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber2608, subjectName);
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
      caseNumber2608,
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
      caseNumber2608,
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
      caseNumber2608,
      taskNames_content.processFurtherEvidence,
      priority,
      authors_content.assignedUserAdmin,
      numberOfDays,
      "Document management: Amend",
      states_content.readyToListState,
      subjectName,
    );
    await documentManagementAmend.documentManagementAmend(
      page,
      false,
      caseNumber2608,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.processFurtherEvidence,
      caseNumber2608,
      states_content.readyToListState,
      subjectName,
    );
  });

  test("Awaiting hearing - Update case - Refer to legal officer", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2609 = await createFEApplication.createFEApplication(
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
      caseNumber2609,
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
      caseNumber2609,
      subjectName,
    );
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber2609, subjectName);
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
      caseNumber2609,
      subjectName,
      true,
    );
    await page.locator(`a:text-is(" Sign out ")`).click();
    await page.waitForLoadState("domcontentloaded");
    await updateCaseJourney.updateCase(
      page,
      false,
      false,
      caseNumber2609,
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
      caseNumber2609,
      taskNames_content.processFurtherEvidence,
      priority,
      authors_content.assignedUserAdmin,
      numberOfDays,
      "Refer case to legal officer",
      states_content.awaitingHearingState,
      subjectName,
    );
    await referCaseToLegalOfficer.referCaseToLegalOfficer(
      page,
      false,
      "Rule 27 request",
      false,
      caseNumber2609,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.processFurtherEvidence,
      caseNumber2609,
      states_content.awaitingHearingState,
      subjectName,
    );
    await task.removeTask(
      page,
      taskNames_content.registerNewCaseTask,
      subjectName,
      waUsers_content.userRoleAdmin,
    );
    await task.removeTask(
      page,
      taskNames_content.vetNewCaseDocuments,
      subjectName,
      waUsers_content.userRoleAdmin,
    );
  });

  test("Awaiting hearing - Update case - Refer to judge", async ({ page }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2610 = await createFEApplication.createFEApplication(
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
      caseNumber2610,
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
      caseNumber2610,
      subjectName,
    );
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber2610, subjectName);
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
      caseNumber2610,
      subjectName,
      true,
    );
    await page.locator(`a:text-is(" Sign out ")`).click();
    await page.waitForLoadState("domcontentloaded");
    await updateCaseJourney.updateCase(
      page,
      false,
      false,
      caseNumber2610,
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
      caseNumber2610,
      taskNames_content.processFurtherEvidence,
      priority,
      authors_content.assignedUserAdmin,
      numberOfDays,
      "Refer case to judge",
      states_content.awaitingHearingState,
      subjectName,
    );
    await referCaseToJudge.referCaseToJudge(
      page,
      false,
      "Rule 27 request",
      false,
      caseNumber2610,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.processFurtherEvidence,
      caseNumber2610,
      states_content.awaitingHearingState,
      subjectName,
    );
    await task.removeTask(
      page,
      taskNames_content.registerNewCaseTask,
      subjectName,
      waUsers_content.userRoleAdmin,
    );
    await task.removeTask(
      page,
      taskNames_content.vetNewCaseDocuments,
      subjectName,
      waUsers_content.userRoleAdmin,
    );
  });

  test("Awaiting hearing - Doc upload - Edit case", async ({ page }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2611 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber2611, subjectName);
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
      caseNumber2611,
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
      false,
      false,
      caseNumber2611,
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
      caseNumber2611,
      taskNames_content.processFurtherEvidence,
      priority,
      authors_content.assignedUserAdmin,
      numberOfDays,
      "Case: Edit case",
      states_content.awaitingHearingState,
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
      caseNumber2611,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.processFurtherEvidence,
      caseNumber2611,
      states_content.awaitingHearingState,
      subjectName,
    );
  });

  test("Awaiting hearing - Doc upload - Contact parties", async ({ page }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2612 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber2612, subjectName);
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
      caseNumber2612,
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
      false,
      false,
      caseNumber2612,
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
      caseNumber2612,
      taskNames_content.processFurtherEvidence,
      priority,
      authors_content.assignedUserAdmin,
      numberOfDays,
      "Case: Contact parties",
      states_content.awaitingHearingState,
      subjectName,
    );
    await contactParties.contactParties(
      page,
      waUsers_content.userRoleAdmin,
      false,
      false,
      caseNumber2612,
      subjectName,
      true,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.processFurtherEvidence,
      caseNumber2612,
      states_content.awaitingHearingState,
      subjectName,
    );
  });

  test("Awaiting hearing - Doc upload - Doc amend", async ({ page }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2613 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber2613, subjectName);
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
      caseNumber2613,
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
      false,
      false,
      caseNumber2613,
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
      caseNumber2613,
      taskNames_content.processFurtherEvidence,
      priority,
      authors_content.assignedUserAdmin,
      numberOfDays,
      "Document management: Amend",
      states_content.awaitingHearingState,
      subjectName,
    );
    await documentManagementAmend.documentManagementAmend(
      page,
      false,
      caseNumber2613,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.processFurtherEvidence,
      caseNumber2613,
      states_content.awaitingHearingState,
      subjectName,
    );
  });

  test("Awaiting outcome - Update case - Refer to legal officer", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2614 = await createFEApplication.createFEApplication(
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
      caseNumber2614,
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
      caseNumber2614,
      subjectName,
    );
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber2614, subjectName);
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
      caseNumber2614,
      subjectName,
      true,
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
      caseNumber2614,
      subjectName,
    );
    await page.locator(`a:text-is(" Sign out ")`).click();
    await page.waitForLoadState("domcontentloaded");
    await updateCaseJourney.updateCase(
      page,
      false,
      false,
      caseNumber2614,
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
      caseNumber2614,
      taskNames_content.processFurtherEvidence,
      priority,
      authors_content.assignedUserAdmin,
      numberOfDays,
      "Refer case to legal officer",
      states_content.awaitingOutcomeState,
      subjectName,
    );
    await referCaseToLegalOfficer.referCaseToLegalOfficer(
      page,
      false,
      "Listing directions",
      false,
      caseNumber2614,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.processFurtherEvidence,
      caseNumber2614,
      states_content.awaitingOutcomeState,
      subjectName,
    );
    await task.removeTask(
      page,
      taskNames_content.registerNewCaseTask,
      subjectName,
      waUsers_content.userRoleAdmin,
    );
    await task.removeTask(
      page,
      taskNames_content.vetNewCaseDocuments,
      subjectName,
      waUsers_content.userRoleAdmin,
    );
  });

  test("Awaiting outcome - Update case - Refer to judge", async ({ page }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2615 = await createFEApplication.createFEApplication(
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
      caseNumber2615,
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
      caseNumber2615,
      subjectName,
    );
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber2615, subjectName);
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
      caseNumber2615,
      subjectName,
      true,
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
      caseNumber2615,
      subjectName,
    );
    await page.locator(`a:text-is(" Sign out ")`).click();
    await page.waitForLoadState("domcontentloaded");
    await updateCaseJourney.updateCase(
      page,
      false,
      false,
      caseNumber2615,
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
      caseNumber2615,
      taskNames_content.processFurtherEvidence,
      priority,
      authors_content.assignedUserAdmin,
      numberOfDays,
      "Refer case to judge",
      states_content.awaitingOutcomeState,
      subjectName,
    );
    await referCaseToJudge.referCaseToJudge(
      page,
      false,
      "Listing directions",
      false,
      caseNumber2615,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.processFurtherEvidence,
      caseNumber2615,
      states_content.awaitingOutcomeState,
      subjectName,
    );
    await task.removeTask(
      page,
      taskNames_content.registerNewCaseTask,
      subjectName,
      waUsers_content.userRoleAdmin,
    );
    await task.removeTask(
      page,
      taskNames_content.vetNewCaseDocuments,
      subjectName,
      waUsers_content.userRoleAdmin,
    );
  });

  test("Awaiting outcome - Doc upload - Edit case", async ({ page }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2616 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber2616, subjectName);
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
      caseNumber2616,
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
      caseNumber2616,
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
      caseNumber2616,
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
      caseNumber2616,
      taskNames_content.processFurtherEvidence,
      priority,
      authors_content.assignedUserAdmin,
      numberOfDays,
      "Case: Edit case",
      states_content.awaitingOutcomeState,
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
      caseNumber2616,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.processFurtherEvidence,
      caseNumber2616,
      states_content.awaitingOutcomeState,
      subjectName,
    );
  });

  test("Awaiting outcome - Doc upload - Contact parties", async ({ page }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2617 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber2617, subjectName);
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
      caseNumber2617,
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
      caseNumber2617,
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
      caseNumber2617,
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
      caseNumber2617,
      taskNames_content.processFurtherEvidence,
      priority,
      authors_content.assignedUserAdmin,
      numberOfDays,
      "Case: Contact parties",
      states_content.awaitingOutcomeState,
      subjectName,
    );
    await contactParties.contactParties(
      page,
      waUsers_content.userRoleAdmin,
      false,
      false,
      caseNumber2617,
      subjectName,
      true,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.processFurtherEvidence,
      caseNumber2617,
      states_content.awaitingOutcomeState,
      subjectName,
    );
  });

  test("Awaiting outcome - Doc upload - Doc amend", async ({ page }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2618 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber2618, subjectName);
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
      caseNumber2618,
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
      caseNumber2618,
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
      caseNumber2618,
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
      caseNumber2618,
      taskNames_content.processFurtherEvidence,
      priority,
      authors_content.assignedUserAdmin,
      numberOfDays,
      "Document management: Amend",
      states_content.awaitingOutcomeState,
      subjectName,
    );
    await documentManagementAmend.documentManagementAmend(
      page,
      false,
      caseNumber2618,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.processFurtherEvidence,
      caseNumber2618,
      states_content.awaitingOutcomeState,
      subjectName,
    );
  });

  test("Case closed - Update case - Refer to legal officer", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2619 = await createFEApplication.createFEApplication(
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
      caseNumber2619,
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
      caseNumber2619,
      subjectName,
    );
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber2619, subjectName);
    await commonHelpers.chooseEventFromDropdown(page, events_content.closeCase);
    await closeCase.closeCase(
      page,
      false,
      false,
      "caseWithdrawn",
      false,
      null,
      null,
      caseNumber2619,
      subjectName,
      true,
    );
    await page.locator(`a:text-is(" Sign out ")`).click();
    await page.waitForLoadState("domcontentloaded");
    await updateCaseJourney.updateCase(
      page,
      false,
      false,
      caseNumber2619,
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
      caseNumber2619,
      taskNames_content.processFurtherEvidence,
      priority,
      authors_content.assignedUserAdmin,
      numberOfDays,
      "Refer case to legal officer",
      states_content.closedState,
      subjectName,
    );
    await referCaseToLegalOfficer.referCaseToLegalOfficer(
      page,
      false,
      "Listing directions",
      false,
      caseNumber2619,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.processFurtherEvidence,
      caseNumber2619,
      states_content.closedState,
      subjectName,
    );
  });

  test("Case closed - Update case - Refer to judge", async ({ page }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2620 = await createFEApplication.createFEApplication(
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
      caseNumber2620,
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
      caseNumber2620,
      subjectName,
    );
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber2620, subjectName);
    await commonHelpers.chooseEventFromDropdown(page, events_content.closeCase);
    await closeCase.closeCase(
      page,
      false,
      false,
      "caseWithdrawn",
      false,
      null,
      null,
      caseNumber2620,
      subjectName,
      true,
    );
    await page.locator(`a:text-is(" Sign out ")`).click();
    await page.waitForLoadState("domcontentloaded");
    await updateCaseJourney.updateCase(
      page,
      false,
      false,
      caseNumber2620,
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
      caseNumber2620,
      taskNames_content.processFurtherEvidence,
      priority,
      authors_content.assignedUserAdmin,
      numberOfDays,
      "Refer case to judge",
      states_content.closedState,
      subjectName,
    );
    await referCaseToJudge.referCaseToJudge(
      page,
      false,
      "Listing directions",
      false,
      caseNumber2620,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.processFurtherEvidence,
      caseNumber2620,
      states_content.closedState,
      subjectName,
    );
  });

  test("Case closed - Doc upload - Contact parties", async ({ page }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2621 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber2621, subjectName);
    await commonHelpers.chooseEventFromDropdown(page, events_content.closeCase);
    await closeCase.closeCase(
      page,
      false,
      false,
      "caseWithdrawn",
      false,
      null,
      null,
      caseNumber2621,
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
      false,
      false,
      caseNumber2621,
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
      caseNumber2621,
      taskNames_content.processFurtherEvidence,
      priority,
      authors_content.assignedUserAdmin,
      numberOfDays,
      "Case: Contact parties",
      states_content.closedState,
      subjectName,
    );
    await contactParties.contactParties(
      page,
      waUsers_content.userRoleAdmin,
      false,
      false,
      caseNumber2621,
      subjectName,
      true,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.processFurtherEvidence,
      caseNumber2621,
      states_content.closedState,
      subjectName,
    );
  });

  test("Case closed - Doc upload - Doc amend", async ({ page }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2622 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber2622, subjectName);
    await commonHelpers.chooseEventFromDropdown(page, events_content.closeCase);
    await closeCase.closeCase(
      page,
      false,
      false,
      "caseWithdrawn",
      false,
      null,
      null,
      caseNumber2622,
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
      false,
      false,
      caseNumber2622,
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
      caseNumber2622,
      taskNames_content.processFurtherEvidence,
      priority,
      authors_content.assignedUserAdmin,
      numberOfDays,
      "Document management: Amend",
      states_content.closedState,
      subjectName,
    );
    await documentManagementAmend.documentManagementAmend(
      page,
      false,
      caseNumber2622,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.processFurtherEvidence,
      caseNumber2622,
      states_content.closedState,
      subjectName,
    );
  });

  test("Case stayed - Update case - Refer to legal officer", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2623 = await createFEApplication.createFEApplication(
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
      caseNumber2623,
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
      caseNumber2623,
      subjectName,
    );
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber2623, subjectName);
    await createEditStay.createEditStay(
      page,
      false,
      false,
      "awaitingACourtJudgement",
      false,
      caseNumber2623,
      subjectName,
      states_content.caseStayedState,
      true,
    );
    await page.locator(`a:text-is(" Sign out ")`).click();
    await page.waitForLoadState("domcontentloaded");
    await updateCaseJourney.updateCase(
      page,
      false,
      false,
      caseNumber2623,
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
      caseNumber2623,
      taskNames_content.processFurtherEvidence,
      priority,
      authors_content.assignedUserAdmin,
      numberOfDays,
      "Refer case to legal officer",
      states_content.caseStayedState,
      subjectName,
    );
    await referCaseToLegalOfficer.referCaseToLegalOfficer(
      page,
      false,
      "Listing directions",
      false,
      caseNumber2623,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.processFurtherEvidence,
      caseNumber2623,
      states_content.caseStayedState,
      subjectName,
    );
    await task.removeTask(
      page,
      taskNames_content.registerNewCaseTask,
      subjectName,
      waUsers_content.userRoleAdmin,
    );
    await task.removeTask(
      page,
      taskNames_content.vetNewCaseDocuments,
      subjectName,
      waUsers_content.userRoleAdmin,
    );
  });

  test("Case stayed - Update case - Refer to judge", async ({ page }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2624 = await createFEApplication.createFEApplication(
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
      caseNumber2624,
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
      caseNumber2624,
      subjectName,
    );
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber2624, subjectName);
    await createEditStay.createEditStay(
      page,
      false,
      false,
      "awaitingACourtJudgement",
      false,
      caseNumber2624,
      subjectName,
      states_content.caseStayedState,
      true,
    );
    await page.locator(`a:text-is(" Sign out ")`).click();
    await page.waitForLoadState("domcontentloaded");
    await updateCaseJourney.updateCase(
      page,
      false,
      false,
      caseNumber2624,
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
      caseNumber2624,
      taskNames_content.processFurtherEvidence,
      priority,
      authors_content.assignedUserAdmin,
      numberOfDays,
      "Refer case to judge",
      states_content.caseStayedState,
      subjectName,
    );
    await referCaseToJudge.referCaseToJudge(
      page,
      false,
      "Listing directions",
      false,
      caseNumber2624,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.processFurtherEvidence,
      caseNumber2624,
      states_content.caseStayedState,
      subjectName,
    );
    await task.removeTask(
      page,
      taskNames_content.registerNewCaseTask,
      subjectName,
      waUsers_content.userRoleAdmin,
    );
    await task.removeTask(
      page,
      taskNames_content.vetNewCaseDocuments,
      subjectName,
      waUsers_content.userRoleAdmin,
    );
  });

  test("Case stayed - Doc upload - Contact parties", async ({ page }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2625 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber2625, subjectName);
    await createEditStay.createEditStay(
      page,
      false,
      false,
      "awaitingACourtJudgement",
      false,
      caseNumber2625,
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
      caseNumber2625,
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
      caseNumber2625,
      taskNames_content.processFurtherEvidence,
      priority,
      authors_content.assignedUserAdmin,
      numberOfDays,
      "Case: Contact parties",
      states_content.caseStayedState,
      subjectName,
    );
    await contactParties.contactParties(
      page,
      waUsers_content.userRoleAdmin,
      false,
      false,
      caseNumber2625,
      subjectName,
      true,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.processFurtherEvidence,
      caseNumber2625,
      states_content.caseStayedState,
      subjectName,
    );
  });

  test("Case stayed - Doc upload - Doc amend", async ({ page }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2626 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber2626, subjectName);
    await createEditStay.createEditStay(
      page,
      false,
      false,
      "awaitingACourtJudgement",
      false,
      caseNumber2626,
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
      caseNumber2626,
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
      caseNumber2626,
      taskNames_content.processFurtherEvidence,
      priority,
      authors_content.assignedUserAdmin,
      numberOfDays,
      "Document management: Amend",
      states_content.caseStayedState,
      subjectName,
    );
    await documentManagementAmend.documentManagementAmend(
      page,
      false,
      caseNumber2626,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.processFurtherEvidence,
      caseNumber2626,
      states_content.caseStayedState,
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
    await myWorkPage.clickAssignAndGoToTask(
      page,
      subjectName,
      taskNames_content.processFurtherEvidence,
    );
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
      false,
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
