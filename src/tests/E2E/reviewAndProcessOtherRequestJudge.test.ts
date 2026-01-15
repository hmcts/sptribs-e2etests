import { test } from "@playwright/test";
import waUsers_content from "../fixtures/content/waUsers_content.ts";
import authors_content from "../fixtures/content/authors_content.ts";
import states_content from "../fixtures/content/states_content.ts";
import taskNames_content from "../fixtures/content/taskNames_content.ts";
import createCase from "../journeys/CaseAPI/createCase.ts";
import buildCase from "../journeys/CaseAPI/buildCase.ts";
import createDraft from "../journeys/CaseAPI/createDraft.ts";
import createAndSendOrder from "../journeys/CaseAPI/createAndSendOrder.ts";
import task from "../journeys/CaseAPI/task.ts";
import commonHelpers from "../helpers/commonHelpers.ts";
import events_content from "../fixtures/content/CaseAPI/events_content.ts";
import closeCase from "../journeys/CaseAPI/closeCase.ts";
import myWorkPage from "../pages/WA/myWorkPage.ts";
import referCaseToJudge from "../journeys/CaseAPI/referCaseToJudge.ts";
import sendOrder from "../journeys/CaseAPI/sendOrder.ts";
import createListing from "../journeys/CaseAPI/createListing.ts";
import config from "../config.ts";
import testDataCleanUp from "../helpers/testDataCleanUp.ts";

const priorityReview = null;
const priorityProcess = " low ";
const numberOfDaysReview = 5;
const numberOfDaysProcess = 7;

test.describe("Review and Process Other Request - Judge @CaseAPI ", (): void => {
  test("Check for redundant test data", async ({ page }) => {
    test.setTimeout(10 * 60 * 1000);
    await testDataCleanUp(page, waUsers_content.userRoleAdmin);
  });
  test("Task is completable via next steps link - assign to me and go to task - Case management", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber76 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber76, subjectName);
    await task.removeTask(
      page,
      taskNames_content.issueCaseToRespondentTask,
      subjectName,
      waUsers_content.userRoleAdmin,
    );
    await commonHelpers.chooseEventFromDropdown(page, "Refer case to judge");
    await referCaseToJudge.referCaseToJudge(
      page,
      false,
      "Other",
      false,
      caseNumber76,
      subjectName,
    );
    await task.seeTask(
      page,
      waUsers_content.userRoleJudge,
      false,
      taskNames_content.reviewOtherRequestJudge,
      subjectName,
    );
    await task.initiateTask(
      page,
      waUsers_content.userRoleJudge,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber76,
      taskNames_content.reviewOtherRequestJudge,
      priorityReview,
      authors_content.assignedUserJudge,
      numberOfDaysReview,
      "Orders: Create draft",
      states_content.caseManagementState,
      subjectName,
    );
    await createDraft.createDraft(
      page,
      false,
      false,
      "CIC8 - ME Joint Instruction",
      caseNumber76,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.reviewOtherRequestJudge,
      caseNumber76,
      states_content.caseManagementState,
      subjectName,
    );
    await task.seeTask(
      page,
      waUsers_content.userRoleAdmin,
      false,
      taskNames_content.processOtherDirectionsReturned,
      subjectName,
    );
    await task.initiateTask(
      page,
      waUsers_content.userRoleAdmin,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber76,
      taskNames_content.processOtherDirectionsReturned,
      priorityProcess,
      authors_content.assignedUserAdmin,
      numberOfDaysProcess,
      "Orders: Send order",
      states_content.caseManagementState,
      subjectName,
    );
    await sendOrder.sendOrder(
      page,
      caseNumber76,
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
      taskNames_content.processOtherDirectionsReturned,
      caseNumber76,
      states_content.caseManagementState,
      subjectName,
    );
  });

  test("Task is completable via next steps link - assign to me - Awaiting hearing", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber77 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber77, subjectName);
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
      "11-Scotland",
      "Final",
      "Hybrid",
      "Morning",
      true,
      "Aberdeen Tribunal Hearing Centre-AB1, 48 Huntly Street, Aberdeen, AB10 1SH",
      false,
      caseNumber77,
      subjectName,
      false,
    );
    await commonHelpers.signOutAndGoToCase(
      page,
      waUsers_content.userRoleAdmin,
      config.CaseAPIBaseURL,
      caseNumber77,
    );
    await commonHelpers.chooseEventFromDropdown(page, "Refer case to judge");
    await referCaseToJudge.referCaseToJudge(
      page,
      false,
      "Other",
      false,
      caseNumber77,
      subjectName,
    );
    await task.seeTask(
      page,
      waUsers_content.userRoleJudge,
      false,
      taskNames_content.reviewOtherRequestJudge,
      subjectName,
    );
    await task.initiateTask(
      page,
      waUsers_content.userRoleJudge,
      "Link: Assign Task to Me",
      false,
      caseNumber77,
      taskNames_content.reviewOtherRequestJudge,
      priorityReview,
      authors_content.assignedUserJudge,
      numberOfDaysReview,
      "Orders: Create draft",
      states_content.awaitingHearingState,
      subjectName,
    );
    await createDraft.createDraft(
      page,
      false,
      false,
      "CIC10 - Strike Out Warning",
      caseNumber77,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.reviewOtherRequestJudge,
      caseNumber77,
      states_content.awaitingHearingState,
      subjectName,
    );
    await task.seeTask(
      page,
      waUsers_content.userRoleAdmin,
      false,
      taskNames_content.processOtherDirectionsReturned,
      subjectName,
    );
    await task.initiateTask(
      page,
      waUsers_content.userRoleAdmin,
      "Link: Assign Task to Me",
      false,
      caseNumber77,
      taskNames_content.processOtherDirectionsReturned,
      priorityProcess,
      authors_content.assignedUserAdmin,
      numberOfDaysProcess,
      "Orders: Send order",
      states_content.awaitingHearingState,
      subjectName,
    );
    await sendOrder.sendOrder(
      page,
      caseNumber77,
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
      taskNames_content.processOtherDirectionsReturned,
      caseNumber77,
      states_content.awaitingHearingState,
      subjectName,
    );
  });

  test("Task is completed via event dropdown - Case closed @CaseAPI2", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber78 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber78, subjectName);
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
      "rule27",
      false,
      null,
      null,
      caseNumber78,
      subjectName,
      false,
    );
    await commonHelpers.chooseEventFromDropdown(page, "Refer case to judge");
    await referCaseToJudge.referCaseToJudge(
      page,
      false,
      "Other",
      false,
      caseNumber78,
      subjectName,
    );
    await task.seeTask(
      page,
      waUsers_content.userRoleJudge,
      false,
      taskNames_content.reviewOtherRequestJudge,
      subjectName,
    );
    await task.initiateTask(
      page,
      waUsers_content.userRoleJudge,
      "Event DropDown",
      false,
      caseNumber78,
      taskNames_content.reviewOtherRequestJudge,
      priorityReview,
      authors_content.assignedUserJudge,
      numberOfDaysReview,
      "Orders: Create and send order",
      states_content.closedState,
      subjectName,
    );
    await createAndSendOrder.createAndSendOrder(
      page,
      false,
      false,
      true,
      "CIC13 - Pro Forma Summons",
      caseNumber78,
      "DraftOrder",
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.processOtherDirectionsReturned,
      caseNumber78,
      states_content.closedState,
      subjectName,
    );
  });

  test("Review task is cancellable through close case", async ({ page }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber79 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber79, subjectName);
    await task.removeTask(
      page,
      taskNames_content.issueCaseToRespondentTask,
      subjectName,
      waUsers_content.userRoleAdmin,
    );
    await commonHelpers.chooseEventFromDropdown(page, "Refer case to judge");
    await referCaseToJudge.referCaseToJudge(
      page,
      false,
      "Other",
      false,
      caseNumber79,
      subjectName,
    );
    await task.seeTask(
      page,
      waUsers_content.userRoleJudge,
      false,
      taskNames_content.reviewOtherRequestJudge,
      subjectName,
    );
    await myWorkPage.clickAssignAndGoToTask(
      page,
      subjectName,
      taskNames_content.reviewOtherRequestJudge,
    );
    await commonHelpers.chooseEventFromDropdown(page, events_content.closeCase);
    await closeCase.closeCase(
      page,
      false,
      false,
      "caseStrikeOut",
      true,
      null,
      "noncomplianceWithDirections",
      caseNumber79,
      subjectName,
      false,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.reviewOtherRequestJudge,
      caseNumber79,
      states_content.closedState,
      subjectName,
    );
  });

  test("Process task is cancellable through close case", async ({ page }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber80 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber80, subjectName);
    await task.removeTask(
      page,
      taskNames_content.issueCaseToRespondentTask,
      subjectName,
      waUsers_content.userRoleAdmin,
    );
    await commonHelpers.chooseEventFromDropdown(page, "Refer case to judge");
    await referCaseToJudge.referCaseToJudge(
      page,
      false,
      "Other",
      false,
      caseNumber80,
      subjectName,
    );
    await task.seeTask(
      page,
      waUsers_content.userRoleJudge,
      false,
      taskNames_content.reviewOtherRequestJudge,
      subjectName,
    );
    await task.initiateTask(
      page,
      waUsers_content.userRoleJudge,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber80,
      taskNames_content.reviewOtherRequestJudge,
      priorityReview,
      authors_content.assignedUserJudge,
      numberOfDaysReview,
      "Orders: Create draft",
      states_content.caseManagementState,
      subjectName,
    );
    await createDraft.createDraft(
      page,
      false,
      false,
      "CIC8 - ME Joint Instruction",
      caseNumber80,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.reviewOtherRequestJudge,
      caseNumber80,
      states_content.caseManagementState,
      subjectName,
    );
    await task.seeTask(
      page,
      waUsers_content.userRoleAdmin,
      false,
      taskNames_content.processOtherDirectionsReturned,
      subjectName,
    );
    await myWorkPage.clickAssignAndGoToTask(
      page,
      subjectName,
      taskNames_content.processOtherDirectionsReturned,
    );
    await commonHelpers.chooseEventFromDropdown(page, events_content.closeCase);
    await closeCase.closeCase(
      page,
      false,
      false,
      "caseRejected",
      false,
      "createdInError",
      null,
      caseNumber80,
      subjectName,
      false,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.processOtherDirectionsReturned,
      caseNumber80,
      states_content.closedState,
      subjectName,
    );
  });
});
