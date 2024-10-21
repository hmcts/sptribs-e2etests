import { test } from "@playwright/test";
import createCase from "../../journeys/WA/createCase.ts";
import buildCase from "../../journeys/WA/buildCase.ts";
import createDraft from "../../journeys/WA/createDraft.ts";
import task from "../../journeys/WA/task.ts";
import commonHelpers from "../../helpers/commonHelpers.ts";
import events_content from "../../fixtures/content/CaseAPI/events_content.ts";
import closeCase from "../../journeys/WA/closeCase.ts";
import myWorkPage from "../../pages/WA/myWorkPage.ts";
import referCaseToJudge from "../../journeys/WA/referCaseToJudge.ts";
import sendOrder from "../../journeys/WA/sendOrder.ts";

const taskName = "Review Strike out request - Judge";
const taskNameProcess = "Process strike out directions returned";
const priorityReview = null;
const priorityProcess = " low ";
const assignedUserAdmin = "sptribswa hearingcentreadmin";
const assignedUserJudge = "Ms Kayla Adams";
const userRoleAdmin = "waHearingCentreAdmin";
const userRoleJudge = "waPrincipalJudge";
const numberOfDaysReview = 5;
const numberOfDaysProcess = 7;
const eventRefer = "Refer case to judge";
const eventOrders = "Orders: Create draft";
const eventSendOrder = "Orders: Send order";
const stateBeforeCompletion = "Case management";
const stateAfterCompletion = "Case management";
const caseClosedState = "Case closed";
const taskRemoved = " Issue Case To Respondent ";
const randomLetters = Array.from({ length: 5 }, () =>
  String.fromCharCode(65 + Math.floor(Math.random() * 26)),
).join("");

test.describe("Review Strike Out Request - Judge @CaseAPI", (): void => {
  test("Task is completable via next steps link - assign to me and go to task - CIC8 - ME Joint Instruction", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${randomLetters}`;
    const caseNumber122 = await createCase.createCase(
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
    console.log(`Case Number : ${caseNumber122}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber122, subjectName);
    await task.removeTask(page, taskRemoved, subjectName);
    await commonHelpers.chooseEventFromDropdown(page, eventRefer);
    await referCaseToJudge.referCaseToJudge(
      page,
      false,
      "Strike out request",
      false,
      caseNumber122,
      subjectName,
    );
    await task.seeTask(page, userRoleJudge, false, taskName, subjectName);
    await task.initiateTask(
      page,
      userRoleJudge,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber122,
      taskName,
      priorityReview,
      assignedUserJudge,
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
      caseNumber122,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber122,
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
      caseNumber122,
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
      caseNumber122,
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
      caseNumber122,
      stateAfterCompletion,
      subjectName,
    );
  });

  test("Task is completable via next steps link - assign to me - CIC10 - Strike Out Warning", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${randomLetters}`;
    const caseNumber123 = await createCase.createCase(
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
    console.log(`Case Number : ${caseNumber123}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber123, subjectName);
    await task.removeTask(page, taskRemoved, subjectName);
    await commonHelpers.chooseEventFromDropdown(page, eventRefer);
    await referCaseToJudge.referCaseToJudge(
      page,
      false,
      "Strike out request",
      false,
      caseNumber123,
      subjectName,
    );
    await task.seeTask(page, userRoleJudge, false, taskName, subjectName);
    await task.initiateTask(
      page,
      userRoleJudge,
      "Link: Assign Task to Me",
      false,
      caseNumber123,
      taskName,
      priorityReview,
      assignedUserJudge,
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
      caseNumber123,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber123,
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
      caseNumber123,
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
      caseNumber123,
      "UploadOrder",
      false,
      false,
      false,
      true,
      "3",
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNameProcess,
      caseNumber123,
      stateAfterCompletion,
      subjectName,
    );
  });

  test("Task is completed via event dropdown - CIC13 - Pro Forma Summons", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${randomLetters}`;
    const caseNumber124 = await createCase.createCase(
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
    console.log(`Case Number : ${caseNumber124}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber124, subjectName);
    await task.removeTask(page, taskRemoved, subjectName);
    await commonHelpers.chooseEventFromDropdown(page, eventRefer);
    await referCaseToJudge.referCaseToJudge(
      page,
      false,
      "Strike out request",
      false,
      caseNumber124,
      subjectName,
    );
    await task.seeTask(page, userRoleJudge, false, taskName, subjectName);
    await task.initiateTask(
      page,
      userRoleJudge,
      "Event DropDown",
      false,
      caseNumber124,
      taskName,
      priorityReview,
      assignedUserJudge,
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
      caseNumber124,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber124,
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
      caseNumber124,
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
      taskNameProcess,
      caseNumber124,
      stateAfterCompletion,
      subjectName,
    );
  });

  test("Review task is cancellable through close case", async ({ page }) => {
    const subjectName = `Subject AutoTesting${randomLetters}`;
    const caseNumber125 = await createCase.createCase(
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
    console.log(`Case Number : ${caseNumber125}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber125, subjectName);
    await task.removeTask(page, taskRemoved, subjectName);
    await commonHelpers.chooseEventFromDropdown(page, eventRefer);
    await referCaseToJudge.referCaseToJudge(
      page,
      false,
      "Strike out request",
      false,
      caseNumber125,
      subjectName,
    );
    await task.seeTask(page, userRoleJudge, false, taskName, subjectName);
    await myWorkPage.clickAssignAndGoToTask(page, subjectName);
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
    );
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber125,
      caseClosedState,
      subjectName,
    );
  });

  test("Process task is cancellable through close case", async ({ page }) => {
    const subjectName = `Subject AutoTesting${randomLetters}`;
    const caseNumber126 = await createCase.createCase(
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
    console.log(`Case Number : ${caseNumber126}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber126, subjectName);
    await task.removeTask(page, taskRemoved, subjectName);
    await commonHelpers.chooseEventFromDropdown(page, eventRefer);
    await referCaseToJudge.referCaseToJudge(
      page,
      false,
      "Strike out request",
      false,
      caseNumber126,
      subjectName,
    );
    await task.seeTask(page, userRoleJudge, false, taskName, subjectName);
    await task.initiateTask(
      page,
      userRoleJudge,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber126,
      taskName,
      priorityReview,
      assignedUserJudge,
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
      caseNumber126,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber126,
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
      caseNumber126,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber126,
      caseClosedState,
      subjectName,
    );
  });
});
