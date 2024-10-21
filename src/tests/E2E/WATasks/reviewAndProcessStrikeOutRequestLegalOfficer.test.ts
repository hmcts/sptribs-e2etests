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
import manageDueDate from "../../journeys/WA/manageDueDate.ts";

const taskName = "Review Strike out request - Legal Officer";
const taskNameProcess = "Process strike out directions returned";
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
const eventOrders = "Orders: Create draft";
const eventSendOrder = "Orders: Send order";
const eventManageDueDate = "Orders: Manage due date";
const stateBeforeCompletion = "Case management";
const stateAfterCompletion = "Case management";
const caseClosedState = "Case closed";
const taskRemoved = " Issue Case To Respondent ";
const randomLetters = Array.from({ length: 5 }, () =>
  String.fromCharCode(65 + Math.floor(Math.random() * 26)),
).join("");

test.describe("Review Strike Out Request - Legal Officer @CaseAPI", (): void => {
  test("Task is completable via next steps link - assign to me and go to task", async ({
    page,
  }) => {
    test.setTimeout(7 * 60 * 1000);
    const subjectName = `Subject AutoTesting${randomLetters}`;
    const caseNumber127 = await createCase.createCase(
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
    console.log(`Case Number : ${caseNumber127}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber127, subjectName);
    await task.removeTask(page, taskRemoved, subjectName);
    await commonHelpers.chooseEventFromDropdown(page, eventRefer);
    await referCaseToLegalOfficer.referCaseToLegalOfficer(
      page,
      false,
      "Strike out request",
      false,
      caseNumber127,
      subjectName,
    );
    await task.seeTask(page, userRoleLO, false, taskName, subjectName);
    await task.initiateTask(
      page,
      userRoleLO,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber127,
      taskName,
      priorityReview,
      assignedUserLO,
      numberOfDaysReview,
      eventOrders,
      stateBeforeCompletion,
      subjectName,
    );
    await createDraft.createDraft(
      page,
      false,
      false,
      "CIC8 - ME Joint Instruction",
      caseNumber127,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber127,
      stateAfterCompletion,
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
      caseNumber127,
      taskNameProcess,
      priorityProcess,
      assignedUserAdmin,
      numberOfDaysProcess,
      eventSendOrder,
      stateBeforeCompletion,
      subjectName,
    );
    await sendOrder.sendOrder(
      page,
      caseNumber127,
      "DraftOrder",
      false,
      false,
      false,
      true,
      "7",
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNameProcess,
      caseNumber127,
      stateAfterCompletion,
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
      caseNumber127,
      taskNameNonCompliance,
      priorityNonCompliance,
      assignedUserAdmin,
      numberOfDaysNonCompliance,
      eventManageDueDate,
      stateBeforeCompletion,
      subjectName,
    );
    await manageDueDate.manageDueDate(
      page,
      false,
      false,
      false,
      true,
      caseNumber127,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNameNonCompliance,
      caseNumber127,
      stateAfterCompletion,
      subjectName,
    );
  });

  test("Task is completable via next steps link - assign to me", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${randomLetters}`;
    const caseNumber128 = await createCase.createCase(
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
    console.log(`Case Number : ${caseNumber128}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber128, subjectName);
    await task.removeTask(page, taskRemoved, subjectName);
    await commonHelpers.chooseEventFromDropdown(page, eventRefer);
    await referCaseToLegalOfficer.referCaseToLegalOfficer(
      page,
      false,
      "Strike out request",
      false,
      caseNumber128,
      subjectName,
    );
    await task.seeTask(page, userRoleLO, false, taskName, subjectName);
    await task.initiateTask(
      page,
      userRoleLO,
      "Link: Assign Task to Me",
      false,
      caseNumber128,
      taskName,
      priorityReview,
      assignedUserLO,
      numberOfDaysReview,
      eventOrders,
      stateBeforeCompletion,
      subjectName,
    );
    await createDraft.createDraft(
      page,
      false,
      false,
      "CIC10 - Strike Out Warning",
      caseNumber128,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber128,
      stateAfterCompletion,
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
      caseNumber128,
      taskNameProcess,
      priorityProcess,
      assignedUserAdmin,
      numberOfDaysProcess,
      eventSendOrder,
      stateBeforeCompletion,
      subjectName,
    );
    await sendOrder.sendOrder(
      page,
      caseNumber128,
      "UploadOrder",
      false,
      false,
      false,
      false,
      "1",
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNameProcess,
      caseNumber128,
      stateAfterCompletion,
      subjectName,
    );
  });

  test("Task is completed via event dropdown", async ({ page }) => {
    const subjectName = `Subject AutoTesting${randomLetters}`;
    const caseNumber129 = await createCase.createCase(
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
    console.log(`Case Number : ${caseNumber129}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber129, subjectName);
    await task.removeTask(page, taskRemoved, subjectName);
    await commonHelpers.chooseEventFromDropdown(page, eventRefer);
    await referCaseToLegalOfficer.referCaseToLegalOfficer(
      page,
      false,
      "Strike out request",
      false,
      caseNumber129,
      subjectName,
    );
    await task.seeTask(page, userRoleLO, false, taskName, subjectName);
    await task.initiateTask(
      page,
      userRoleLO,
      "Event DropDown",
      false,
      caseNumber129,
      taskName,
      priorityReview,
      assignedUserLO,
      numberOfDaysReview,
      eventOrders,
      stateBeforeCompletion,
      subjectName,
    );
    await createDraft.createDraft(
      page,
      false,
      false,
      "CIC13 - Pro Forma Summons",
      caseNumber129,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber129,
      stateAfterCompletion,
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
      caseNumber129,
      taskNameProcess,
      priorityProcess,
      assignedUserAdmin,
      numberOfDaysProcess,
      eventSendOrder,
      stateBeforeCompletion,
      subjectName,
    );
    await sendOrder.sendOrder(
      page,
      caseNumber129,
      "DraftOrder",
      false,
      false,
      false,
      true,
      "5",
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNameProcess,
      caseNumber129,
      stateAfterCompletion,
      subjectName,
    );
  });

  test("Review task is cancellable through close case", async ({ page }) => {
    const subjectName = `Subject AutoTesting${randomLetters}`;
    const caseNumber130 = await createCase.createCase(
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
    console.log(`Case Number : ${caseNumber130}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber130, subjectName);
    await task.removeTask(page, taskRemoved, subjectName);
    await commonHelpers.chooseEventFromDropdown(page, eventRefer);
    await referCaseToLegalOfficer.referCaseToLegalOfficer(
      page,
      false,
      "Strike out request",
      false,
      caseNumber130,
      subjectName,
    );
    await task.seeTask(page, userRoleLO, false, taskName, subjectName);
    await myWorkPage.clickAssignAndGoToTask(page, subjectName);
    await commonHelpers.chooseEventFromDropdown(page, events_content.closeCase);
    await closeCase.closeCase(
      page,
      false,
      false,
      "consentOrder",
      false,
      null,
      null,
      caseNumber130,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber130,
      caseClosedState,
      subjectName,
    );
  });

  test("Process task is cancellable through close case", async ({ page }) => {
    const subjectName = `Subject AutoTesting${randomLetters}`;
    const caseNumber131 = await createCase.createCase(
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
    console.log(`Case Number : ${caseNumber131}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber131, subjectName);
    await task.removeTask(page, taskRemoved, subjectName);
    await commonHelpers.chooseEventFromDropdown(page, eventRefer);
    await referCaseToLegalOfficer.referCaseToLegalOfficer(
      page,
      false,
      "Strike out request",
      false,
      caseNumber131,
      subjectName,
    );
    await task.seeTask(page, userRoleLO, false, taskName, subjectName);
    await task.initiateTask(
      page,
      userRoleLO,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber131,
      taskName,
      priorityReview,
      assignedUserLO,
      numberOfDaysReview,
      eventOrders,
      stateBeforeCompletion,
      subjectName,
    );
    await createDraft.createDraft(
      page,
      false,
      false,
      "CIC3 - Rule 27",
      caseNumber131,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber131,
      stateAfterCompletion,
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
      caseNumber131,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber131,
      caseClosedState,
      subjectName,
    );
  });
});
