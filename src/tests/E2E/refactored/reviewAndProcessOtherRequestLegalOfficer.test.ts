import { test } from "@playwright/test";
import createCase from "../../journeys/WA/createCase.ts";
import buildCase from "../../journeys/WA/buildCase.ts";
import createDraft from "../../journeys/WA/createDraft.ts";
import task from "../../journeys/WA/task.ts";
import commonHelpers from "../../helpers/commonHelpers.ts";
import events_content from "../../fixtures/content/CaseAPI/events_content.ts";
import closeCase from "../../journeys/WA/closeCase.ts";
import myWorkPage from "../../pages/WA/myWorkPage.ts";
import referCaseToLegalOfficer from "../../journeys/WA/referCaseToLegalOfficer.ts";
import sendOrder from "../../journeys/WA/sendOrder.ts";
import config from "../../config.ts";
import createListing from "../../journeys/WA/createListing.ts";
import referCaseToJudge from "../../journeys/WA/referCaseToJudge.ts";

const taskName = "Review other request - Legal Officer";
const taskNameProcess = "Process other directions returned";
const taskNameNonCompliance = "Follow up noncompliance of directions";
const priorityReview = " low ";
const priorityProcess = " low ";
const priorityNonCompliance = " medium ";
const assignedUserAdmin = "sptribswa hearingcentreadmin";
const assignedUserLO = "sptribswa seniorcaseworker";
const userRoleAdmin = "waHearingCentreAdmin";
const userRoleLO = "waSeniorCaseworker";
const numberOfDaysReview = 5;
const numberOfDaysProcess = 7;
const numberOfDaysNonCompliance = 1;
const eventRefer = "Refer case to legal officer";
const eventReferJudge = "Refer case to judge";
const eventOrders = "Orders: Create draft";
const eventSendOrder = "Orders: Send order";
const caseManagementState = "Case management";
const awaitingHearingState = "Awaiting hearing";
const caseClosedState = "Case closed";
const taskRemoved = " Issue Case To Respondent ";

test.describe("Review and Process Other Request - Legal Officer @CaseAPI", (): void => {
  test("Task is completable via next steps link - assign to me and go to task - Case management @crossbrowserCaseAPI", async ({
    page,
  }) => {
    test.setTimeout(7 * 60 * 1000);
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber81 = await createCase.createCase(
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
    console.log(`Case Number : ${caseNumber81}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber81, subjectName);
    await task.removeTask(page, taskRemoved, subjectName);
    await commonHelpers.chooseEventFromDropdown(page, eventRefer);
    await referCaseToLegalOfficer.referCaseToLegalOfficer(
      page,
      false,
      "Other",
      false,
      caseNumber81,
      subjectName,
    );
    await task.seeTask(page, userRoleLO, false, taskName, subjectName);
    await task.initiateTask(
      page,
      userRoleLO,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber81,
      taskName,
      priorityReview,
      assignedUserLO,
      numberOfDaysReview,
      eventOrders,
      caseManagementState,
      subjectName,
    );
    await createDraft.createDraft(
      page,
      false,
      false,
      "CIC8 - ME Joint Instruction",
      caseNumber81,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber81,
      caseManagementState,
      subjectName,
    );
    await task.seeTask(
      page,
      userRoleAdmin,
      false,
      taskNameProcess,
      subjectName,
    );
    await task.initiateTask(
      page,
      userRoleAdmin,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber81,
      taskNameProcess,
      priorityProcess,
      assignedUserAdmin,
      numberOfDaysProcess,
      eventSendOrder,
      caseManagementState,
      subjectName,
    );
    await sendOrder.sendOrder(
      page,
      caseNumber81,
      "DraftOrder",
      false,
      false,
      true,
      true,
      "1",
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNameProcess,
      caseNumber81,
      caseManagementState,
      subjectName,
    );
    await task.seeTask(
      page,
      userRoleAdmin,
      false,
      taskNameNonCompliance,
      subjectName,
    );
    await task.initiateTask(
      page,
      userRoleAdmin,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber81,
      taskNameNonCompliance,
      priorityNonCompliance,
      assignedUserAdmin,
      numberOfDaysNonCompliance,
      eventReferJudge,
      caseManagementState,
      subjectName,
    );
    await referCaseToJudge.referCaseToJudge(
      page,
      false,
      "Other",
      false,
      caseNumber81,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNameNonCompliance,
      caseNumber81,
      caseManagementState,
      subjectName,
    );
  });

  test("Task is completable via next steps link - assign to me - Awaiting hearing", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber82 = await createCase.createCase(
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
    console.log(`Case Number : ${caseNumber82}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber82, subjectName);
    await task.removeTask(page, taskRemoved, subjectName);
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Hearings: Create listing",
    );
    await createListing.createListing(
      page,
      false,
      true,
      "7-Wales",
      "Final",
      "Telephone",
      "Morning",
      false,
      "Cardiff Social Security And Child Support Tribunal-Cardiff Eastgate House, 35-43, Newport Road",
      false,
      caseNumber82,
      subjectName,
    );
    await commonHelpers.signOutAndGoToCase(
      page,
      userRoleLO,
      config.CaseAPIBaseURL,
      caseNumber82,
    );
    await commonHelpers.chooseEventFromDropdown(page, eventRefer);
    await referCaseToLegalOfficer.referCaseToLegalOfficer(
      page,
      false,
      "Other",
      false,
      caseNumber82,
      subjectName,
    );
    await task.seeTask(page, userRoleLO, false, taskName, subjectName);
    await task.initiateTask(
      page,
      userRoleLO,
      "Link: Assign Task to Me",
      false,
      caseNumber82,
      taskName,
      priorityReview,
      assignedUserLO,
      numberOfDaysReview,
      eventOrders,
      awaitingHearingState,
      subjectName,
    );
    await createDraft.createDraft(
      page,
      false,
      false,
      "CIC10 - Strike Out Warning",
      caseNumber82,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber82,
      awaitingHearingState,
      subjectName,
    );
    await task.seeTask(
      page,
      userRoleAdmin,
      false,
      taskNameProcess,
      subjectName,
    );
    await task.initiateTask(
      page,
      userRoleAdmin,
      "Link: Assign Task to Me",
      false,
      caseNumber82,
      taskNameProcess,
      priorityProcess,
      assignedUserAdmin,
      numberOfDaysProcess,
      eventSendOrder,
      awaitingHearingState,
      subjectName,
    );
    await sendOrder.sendOrder(
      page,
      caseNumber82,
      "DraftOrder",
      false,
      false,
      true,
      true,
      "1",
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNameProcess,
      caseNumber82,
      awaitingHearingState,
      subjectName,
    );
  });

  test("Task is completed via event dropdown - Case closed", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber83 = await createCase.createCase(
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
    console.log(`Case Number : ${caseNumber83}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber83, subjectName);
    await commonHelpers.chooseEventFromDropdown(page, events_content.closeCase);
    await closeCase.closeCase(
      page,
      false,
      false,
      "rule27",
      false,
      null,
      null,
      caseNumber83,
      subjectName,
    );
    await commonHelpers.chooseEventFromDropdown(page, eventRefer);
    await referCaseToLegalOfficer.referCaseToLegalOfficer(
      page,
      false,
      "Other",
      false,
      caseNumber83,
      subjectName,
    );
    await task.seeTask(page, userRoleLO, false, taskName, subjectName);
    await task.initiateTask(
      page,
      userRoleLO,
      "Event DropDown",
      false,
      caseNumber83,
      taskName,
      priorityReview,
      assignedUserLO,
      numberOfDaysReview,
      eventOrders,
      caseClosedState,
      subjectName,
    );
    await createDraft.createDraft(
      page,
      false,
      false,
      "CIC13 - Pro Forma Summons",
      caseNumber83,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber83,
      caseClosedState,
      subjectName,
    );
    await task.seeTask(
      page,
      userRoleAdmin,
      false,
      taskNameProcess,
      subjectName,
    );
    await task.initiateTask(
      page,
      userRoleAdmin,
      "Event DropDown",
      false,
      caseNumber83,
      taskNameProcess,
      priorityProcess,
      assignedUserAdmin,
      numberOfDaysProcess,
      eventSendOrder,
      caseClosedState,
      subjectName,
    );
    await sendOrder.sendOrder(
      page,
      caseNumber83,
      "DraftOrder",
      false,
      false,
      true,
      true,
      "1",
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNameProcess,
      caseNumber83,
      caseClosedState,
      subjectName,
    );
  });

  test("Review is cancellable through close case", async ({ page }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber84 = await createCase.createCase(
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
    console.log(`Case Number : ${caseNumber84}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber84, subjectName);
    await task.removeTask(page, taskRemoved, subjectName);
    await commonHelpers.chooseEventFromDropdown(page, eventRefer);
    await referCaseToLegalOfficer.referCaseToLegalOfficer(
      page,
      false,
      "Other",
      false,
      caseNumber84,
      subjectName,
    );
    await task.seeTask(page, userRoleLO, false, taskName, subjectName);
    await myWorkPage.clickAssignAndGoToTask(page, subjectName);
    await commonHelpers.chooseEventFromDropdown(page, events_content.closeCase);
    await closeCase.closeCase(
      page,
      false,
      false,
      "caseStrikeOut",
      true,
      null,
      "noncomplianceWithDirections",
      caseNumber84,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber84,
      caseClosedState,
      subjectName,
    );
  });

  test("Process task is cancellable through close case @crossbrowserCaseAPI", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber85 = await createCase.createCase(
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
    console.log(`Case Number : ${caseNumber85}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber85, subjectName);
    await task.removeTask(page, taskRemoved, subjectName);
    await commonHelpers.chooseEventFromDropdown(page, eventRefer);
    await referCaseToLegalOfficer.referCaseToLegalOfficer(
      page,
      false,
      "Other",
      false,
      caseNumber85,
      subjectName,
    );
    await task.seeTask(page, userRoleLO, false, taskName, subjectName);
    await task.initiateTask(
      page,
      userRoleLO,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber85,
      taskName,
      priorityReview,
      assignedUserLO,
      numberOfDaysReview,
      eventOrders,
      caseManagementState,
      subjectName,
    );
    await createDraft.createDraft(
      page,
      false,
      false,
      "CIC8 - ME Joint Instruction",
      caseNumber85,
      subjectName,
    );
    await task.seeTask(
      page,
      userRoleAdmin,
      false,
      taskNameProcess,
      subjectName,
    );
    await myWorkPage.clickAssignAndGoToTask(page, subjectName);
    await commonHelpers.chooseEventFromDropdown(page, events_content.closeCase);
    await closeCase.closeCase(
      page,
      false,
      false,
      "caseRejected",
      false,
      "createdInError",
      null,
      caseNumber85,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNameProcess,
      caseNumber85,
      caseClosedState,
      subjectName,
    );
  });
});
