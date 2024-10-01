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

const taskName = "Review withdrawal request - Judge";
const taskNameProcess = "Process Case Withdrawal Directions";
const priorityReview = null;
const priorityProcess = " low ";
const assignedUserAdmin = "sptribswa regionalhearingcentreadmin";
const assignedUserJudge = "Ms Kayla Adams";
const userRoleAdmin = "waRegionalHearingCentreAdmin";
const userRoleJudge = "waPrincipalJudge";
const numberOfDaysReview = 5;
//const numberOfDaysProcess = 7;
// awaiting bug fix
const numberOfDaysProcess = 10;
const eventRefer = "Refer case to judge";
const eventOrders = "Orders: Create draft";
const eventSendOrder = "Orders: Send order";
const stateBeforeCompletion = "Case Status:  Case management";
const stateAfterCompletion = "Case Status:  Case management";

test.describe("Review Withdrawal Request - Judge @CaseAPI", (): void => {
  test.only("Task is completable via next steps link - assign to me and go to task", async ({
    page,
  }) => {
    let caseNumber01: any;
    caseNumber01 = await createCase.createCase(
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
    console.log(`Case Number : ${caseNumber01}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber01);
    await commonHelpers.chooseEventFromDropdown(page, eventRefer);
    await referCaseToJudge.referCaseToJudge(
      page,
      false,
      "Withdrawal request",
      false,
      caseNumber01,
    );
    await task.seeTask(page, userRoleJudge, false, taskName);
    await task.initiateTask(
      page,
      userRoleJudge,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber01,
      taskName,
      priorityReview,
      assignedUserJudge,
      numberOfDaysReview,
      eventOrders,
      stateBeforeCompletion,
    );
    await createDraft.createDraft(
      page,
      false,
      false,
      "CIC8 - ME Joint Instruction",
      caseNumber01,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber01,
      stateAfterCompletion,
    );
    await task.seeTask(page, userRoleAdmin, false, taskNameProcess);
    await task.initiateTask(
      page,
      userRoleAdmin,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber01,
      taskNameProcess,
      priorityProcess,
      assignedUserAdmin,
      numberOfDaysProcess,
      eventSendOrder,
      stateBeforeCompletion,
    );
    await sendOrder.sendOrder(
      page,
      caseNumber01,
      "DraftOrder",
      false,
      false,
      true,
      true,
      "1",
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNameProcess,
      caseNumber01,
      stateAfterCompletion,
    );
  });

  test("Task is completable via next steps link - assign to me", async ({
    page,
  }) => {
    let caseNumber02: any;
    caseNumber02 = await createCase.createCase(
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
    console.log(`Case Number : ${caseNumber02}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber02);
    await commonHelpers.chooseEventFromDropdown(page, eventRefer);
    await referCaseToJudge.referCaseToJudge(
      page,
      false,
      "Withdrawal request",
      false,
      caseNumber02,
    );
    await task.seeTask(page, userRoleJudge, false, taskName);
    await task.initiateTask(
      page,
      userRoleJudge,
      "Link: Assign Task to Me",
      false,
      caseNumber02,
      taskName,
      priorityReview,
      assignedUserJudge,
      numberOfDaysReview,
      eventOrders,
      stateBeforeCompletion,
    );
    await createDraft.createDraft(
      page,
      false,
      false,
      "CIC10 - Strike Out Warning",
      caseNumber02,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber02,
      stateAfterCompletion,
    );
    await task.seeTask(page, userRoleAdmin, false, taskNameProcess);
    await task.initiateTask(
      page,
      userRoleAdmin,
      "Link: Assign Task to Me",
      false,
      caseNumber02,
      taskNameProcess,
      priorityProcess,
      assignedUserAdmin,
      numberOfDaysProcess,
      eventSendOrder,
      stateBeforeCompletion,
    );
    await sendOrder.sendOrder(
      page,
      caseNumber02,
      "UploadOrder",
      false,
      false,
      false,
      true,
      "3",
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNameProcess,
      caseNumber02,
      stateAfterCompletion,
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
    await commonHelpers.chooseEventFromDropdown(page, eventRefer);
    await referCaseToJudge.referCaseToJudge(
      page,
      false,
      "Withdrawal request",
      false,
      caseNumber03,
    );
    await task.seeTask(page, userRoleJudge, false, taskName);
    await task.initiateTask(
      page,
      userRoleJudge,
      "Event DropDown",
      false,
      caseNumber03,
      taskName,
      priorityReview,
      assignedUserJudge,
      numberOfDaysReview,
      eventOrders,
      stateBeforeCompletion,
    );
    await createDraft.createDraft(
      page,
      false,
      false,
      "CIC13 - Pro Forma Summons",
      caseNumber03,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber03,
      stateAfterCompletion,
    );
    await task.seeTask(page, userRoleAdmin, false, taskNameProcess);
    await task.initiateTask(
      page,
      userRoleAdmin,
      "Event DropDown",
      false,
      caseNumber03,
      taskNameProcess,
      priorityProcess,
      assignedUserAdmin,
      numberOfDaysProcess,
      eventSendOrder,
      stateBeforeCompletion,
    );
    await sendOrder.sendOrder(
      page,
      caseNumber03,
      "DraftOrder",
      false,
      false,
      true,
      true,
      "5",
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNameProcess,
      caseNumber03,
      stateAfterCompletion,
    );
  });

  test("Task is cancellable through close case", async ({ page }) => {
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
    await commonHelpers.chooseEventFromDropdown(page, eventRefer);
    await referCaseToJudge.referCaseToJudge(
      page,
      false,
      "Withdrawal request",
      false,
      caseNumber04,
    );
    await task.seeTask(page, userRoleJudge, false, taskName);
    await myWorkPage.clickAssignAndGoToTask(page);
    await commonHelpers.chooseEventFromDropdown(page, events_content.closeCase);
    await closeCase.closeCase(
      page,
      false,
      false,
      "caseRejected",
      true,
      "vexatiousLitigant",
      null,
      caseNumber04,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber04,
      "Case Status:  Case closed",
    );
  });

  test("Process task is cancellable through close case", async ({ page }) => {
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
    await commonHelpers.chooseEventFromDropdown(page, eventRefer);
    await referCaseToJudge.referCaseToJudge(
      page,
      false,
      "Withdrawal request",
      false,
      caseNumber05,
    );
    await task.seeTask(page, userRoleJudge, false, taskName);
    await task.initiateTask(
      page,
      userRoleJudge,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber05,
      taskName,
      priorityReview,
      assignedUserJudge,
      numberOfDaysReview,
      eventOrders,
      stateBeforeCompletion,
    );
    await createDraft.createDraft(
      page,
      false,
      false,
      "CIC3 - Rule 27",
      caseNumber05,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber05,
      stateAfterCompletion,
    );
    await task.seeTask(page, userRoleAdmin, false, taskNameProcess);
    await myWorkPage.clickAssignAndGoToTask(page);
    await commonHelpers.chooseEventFromDropdown(page, events_content.closeCase);
    await closeCase.closeCase(
      page,
      false,
      false,
      "caseRejected",
      false,
      "createdInError",
      null,
      caseNumber05,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber05,
      "Case Status:  Case closed",
    );
  });
});
