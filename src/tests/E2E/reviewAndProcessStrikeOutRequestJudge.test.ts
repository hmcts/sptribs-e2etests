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
import testDataCleanUp from "../helpers/testDataCleanUp.ts";

const priorityReview = null;
const priorityProcess = " low ";
const numberOfDaysReview = 5;
const numberOfDaysProcess = 7;

test.describe("Review Strike Out Request - Judge @CaseAPI ", (): void => {
  test("Check for redundant test data", async ({ page }) => {
    test.setTimeout(10 * 60 * 1000);
    await testDataCleanUp(page, waUsers_content.userRoleAdmin);
  });
  test("Task is completable via next steps link - assign to me and go to task - CIC8 - ME Joint Instruction @CaseAPI3", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber122 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber122, subjectName);
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
      "Strike out request",
      false,
      caseNumber122,
      subjectName,
    );
    await task.seeTask(
      page,
      waUsers_content.userRoleJudge,
      false,
      taskNames_content.reviewStrikeOutJudge,
      subjectName,
    );
    await task.initiateTask(
      page,
      waUsers_content.userRoleJudge,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber122,
      taskNames_content.reviewStrikeOutJudge,
      priorityReview,
      authors_content.assignedUserJudge,
      numberOfDaysReview,
      "Orders: Create and send order",
      states_content.caseManagementState,
      subjectName,
    );
    await createAndSendOrder.createAndSendOrder(
      page,
      false,
      false,
      true,
      "CIC8 - ME Joint Instruction",
      caseNumber122,
      "DraftOrder",
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.reviewStrikeOutJudge,
      caseNumber122,
      states_content.caseManagementState,
      subjectName,
    );
  });

  test("Task is completable via next steps link - assign to me - CIC10 - Strike Out Warning @CaseAPI3", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber123 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber123, subjectName);
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
      "Strike out request",
      false,
      caseNumber123,
      subjectName,
    );
    await task.seeTask(
      page,
      waUsers_content.userRoleJudge,
      false,
      taskNames_content.reviewStrikeOutJudge,
      subjectName,
    );
    await task.initiateTask(
      page,
      waUsers_content.userRoleJudge,
      "Link: Assign Task to Me",
      false,
      caseNumber123,
      taskNames_content.reviewStrikeOutJudge,
      priorityReview,
      authors_content.assignedUserJudge,
      numberOfDaysReview,
      "Orders: Create and send order",
      states_content.caseManagementState,
      subjectName,
    );
    await createAndSendOrder.createAndSendOrder(
      page,
      false,
      false,
      false,
      "CIC10 - Strike Out Warning",
      caseNumber123,
      "UploadOrder",
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.reviewStrikeOutJudge,
      caseNumber123,
      states_content.caseManagementState,
      subjectName,
    );
  });

  test("Task is completed via event dropdown - CIC13 - Pro Forma Summons", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber124 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber124, subjectName);
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
      "Strike out request",
      false,
      caseNumber124,
      subjectName,
    );
    await task.seeTask(
      page,
      waUsers_content.userRoleJudge,
      false,
      taskNames_content.reviewStrikeOutJudge,
      subjectName,
    );
    await task.initiateTask(
      page,
      waUsers_content.userRoleJudge,
      "Event DropDown",
      false,
      caseNumber124,
      taskNames_content.reviewStrikeOutJudge,
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
      "CIC13 - Pro Forma Summons",
      caseNumber124,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.reviewStrikeOutJudge,
      caseNumber124,
      states_content.caseManagementState,
      subjectName,
    );
    await task.seeTask(
      page,
      waUsers_content.userRoleAdmin,
      false,
      taskNames_content.processStrikeOut,
      subjectName,
    );
    await task.initiateTask(
      page,
      waUsers_content.userRoleAdmin,
      "Event DropDown",
      false,
      caseNumber124,
      taskNames_content.processStrikeOut,
      priorityProcess,
      authors_content.assignedUserAdmin,
      numberOfDaysProcess,
      "Orders: Send order",
      states_content.caseManagementState,
      subjectName,
    );
    await sendOrder.sendOrder(
      page,
      caseNumber124,
      "DraftOrder",
      false,
      false,
      true,
      true,
      "5",
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.processStrikeOut,
      caseNumber124,
      states_content.caseManagementState,
      subjectName,
    );
  });

  test("Review task is cancellable through close case", async ({ page }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber125 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber125, subjectName);
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
      "Strike out request",
      false,
      caseNumber125,
      subjectName,
    );
    await task.seeTask(
      page,
      waUsers_content.userRoleJudge,
      false,
      taskNames_content.reviewStrikeOutJudge,
      subjectName,
    );
    await myWorkPage.clickAssignAndGoToTask(
      page,
      subjectName,
      taskNames_content.reviewStrikeOutJudge,
    );
    await commonHelpers.chooseEventFromDropdown(page, events_content.closeCase);
    await closeCase.closeCase(
      page,
      false,
      false,
      "caseRejected",
      true,
      "deadlineMissed",
      null,
      caseNumber125,
      subjectName,
      false,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.reviewStrikeOutJudge,
      caseNumber125,
      states_content.closedState,
      subjectName,
    );
  });

  test("Process task is cancellable through close case ", async ({ page }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber126 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber126, subjectName);
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
      "Strike out request",
      false,
      caseNumber126,
      subjectName,
    );
    await task.seeTask(
      page,
      waUsers_content.userRoleJudge,
      false,
      taskNames_content.reviewStrikeOutJudge,
      subjectName,
    );
    await task.initiateTask(
      page,
      waUsers_content.userRoleJudge,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber126,
      taskNames_content.reviewStrikeOutJudge,
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
      "CIC3 - Rule 27",
      caseNumber126,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.reviewStrikeOutJudge,
      caseNumber126,
      states_content.caseManagementState,
      subjectName,
    );
    await task.seeTask(
      page,
      waUsers_content.userRoleAdmin,
      false,
      taskNames_content.processStrikeOut,
      subjectName,
    );
    await myWorkPage.clickAssignAndGoToTask(
      page,
      subjectName,
      taskNames_content.processStrikeOut,
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
      caseNumber126,
      subjectName,
      false,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.reviewStrikeOutJudge,
      caseNumber126,
      states_content.closedState,
      subjectName,
    );
  });
});
