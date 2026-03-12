import { test } from "@playwright/test";
import waUsers_content from "../fixtures/content/waUsers_content.ts";
import authors_content from "../fixtures/content/authors_content.ts";
import states_content from "../fixtures/content/states_content.ts";
import taskNames_content from "../fixtures/content/taskNames_content.ts";
import createCase from "../journeys/CaseAPI/createCase.ts";
import buildCase from "../journeys/CaseAPI/buildCase.ts";
import createDraft from "../journeys/CaseAPI/createDraft.ts";
import createAndSendOrder from "../journeys/CaseAPI/createAndSendOrder.ts";
import commonHelpers from "../helpers/commonHelpers.ts";
import events_content from "../fixtures/content/CaseAPI/events_content.ts";
import closeCase from "../journeys/CaseAPI/closeCase.ts";
import referCaseToJudge from "../journeys/CaseAPI/referCaseToJudge.ts";
import task from "../journeys/CaseAPI/task.ts";
import sendOrder from "../journeys/CaseAPI/sendOrder.ts";
import testDataCleanUp from "../helpers/testDataCleanUp.ts";

const priorityReview = null;
const priorityProcess = " low ";
const numberOfDaysReview = 5;
const numberOfDaysProcess = 5;

test.describe("Review and Process Reinstatement Request - Judge @CaseAPI ", (): void => {
  test("Check for redundant test data @CaseAPI3", async ({ page }) => {
    test.setTimeout(10 * 60 * 1000);
    await testDataCleanUp(page, waUsers_content.userRoleAdmin);
  });

  test("Task is completable via next steps link - assign to me and go to task @CaseAPI3", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber92 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber92, subjectName);
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
      "deathOfAppellant",
      false,
      null,
      null,
      caseNumber92,
      subjectName,
      false,
    );
    await commonHelpers.chooseEventFromDropdown(page, "Refer case to judge");
    await referCaseToJudge.referCaseToJudge(
      page,
      false,
      "Reinstatement request",
      false,
      caseNumber92,
      subjectName,
    );
    await task.seeTask(
      page,
      waUsers_content.userRoleJudge,
      false,
      taskNames_content.reviewReinstatementJudge,
      subjectName,
    );
    await task.initiateTask(
      page,
      waUsers_content.userRoleJudge,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber92,
      taskNames_content.reviewReinstatementJudge,
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
      "CIC8 - ME Joint Instruction",
      caseNumber92,
      "DraftOrder",
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.reviewReinstatementJudge,
      caseNumber92,
      states_content.closedState,
      subjectName,
    );
  });

  test("Task is completable via next steps link - assign to me", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber93 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber93, subjectName);
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
      "caseRejected",
      true,
      "createdInError",
      null,
      caseNumber93,
      subjectName,
      false,
    );
    await commonHelpers.chooseEventFromDropdown(page, "Refer case to judge");
    await referCaseToJudge.referCaseToJudge(
      page,
      false,
      "Reinstatement request",
      false,
      caseNumber93,
      subjectName,
    );
    await task.seeTask(
      page,
      waUsers_content.userRoleJudge,
      false,
      taskNames_content.reviewReinstatementJudge,
      subjectName,
    );
    await task.initiateTask(
      page,
      waUsers_content.userRoleJudge,
      "Link: Assign Task to Me",
      false,
      caseNumber93,
      taskNames_content.reviewReinstatementJudge,
      priorityReview,
      authors_content.assignedUserJudge,
      numberOfDaysReview,
      "Orders: Create draft",
      states_content.closedState,
      subjectName,
    );
    await createDraft.createDraft(
      page,
      false,
      false,
      "CIC8 - ME Joint Instruction",
      caseNumber93,
      subjectName,
    );
    await task.seeTask(
      page,
      waUsers_content.userRoleAdmin,
      false,
      taskNames_content.processReinstatement,
      subjectName,
    );
    await task.initiateTask(
      page,
      waUsers_content.userRoleAdmin,
      "Link: Assign Task to Me",
      false,
      caseNumber93,
      taskNames_content.processReinstatement,
      priorityProcess,
      authors_content.assignedUserAdmin,
      numberOfDaysProcess,
      "Orders: Send order",
      states_content.closedState,
      subjectName,
    );
    await sendOrder.sendOrder(
      page,
      caseNumber93,
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
      taskNames_content.processReinstatement,
      caseNumber93,
      states_content.closedState,
      subjectName,
    );
  });

  test("Task is completed via event dropdown", async ({ page }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber94 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber94, subjectName);
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
      "caseRejected",
      false,
      "deadlineMissed",
      null,
      caseNumber94,
      subjectName,
      false,
    );
    await commonHelpers.chooseEventFromDropdown(page, "Refer case to judge");
    await referCaseToJudge.referCaseToJudge(
      page,
      false,
      "Reinstatement request",
      false,
      caseNumber94,
      subjectName,
    );
    await task.seeTask(
      page,
      waUsers_content.userRoleJudge,
      false,
      taskNames_content.reviewReinstatementJudge,
      subjectName,
    );
    await task.initiateTask(
      page,
      waUsers_content.userRoleJudge,
      "Event DropDown",
      false,
      caseNumber94,
      taskNames_content.reviewReinstatementJudge,
      priorityReview,
      authors_content.assignedUserJudge,
      numberOfDaysReview,
      "Orders: Create draft",
      states_content.closedState,
      subjectName,
    );
    await createDraft.createDraft(
      page,
      false,
      false,
      "CIC8 - ME Joint Instruction",
      caseNumber94,
      subjectName,
    );
    await task.seeTask(
      page,
      waUsers_content.userRoleAdmin,
      false,
      taskNames_content.processReinstatement,
      subjectName,
    );
    await task.initiateTask(
      page,
      waUsers_content.userRoleAdmin,
      "Event DropDown",
      false,
      caseNumber94,
      taskNames_content.processReinstatement,
      priorityProcess,
      authors_content.assignedUserAdmin,
      numberOfDaysProcess,
      "Orders: Send order",
      states_content.closedState,
      subjectName,
    );
    await sendOrder.sendOrder(
      page,
      caseNumber94,
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
      taskNames_content.processReinstatement,
      caseNumber94,
      states_content.closedState,
      subjectName,
    );
  });
});
