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
import createListing from "../../journeys/WA/createListing.ts";
import config from "../../config.ts";

const taskName = "Review other request - Judge";
const taskNameProcess = "Process other directions returned";
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
const caseManagementState = "Case management";
const awaitingHearingState = "Awaiting hearing";
const caseClosedState = "Case closed";
const taskRemoved = " Issue Case To Respondent ";

test.describe("Review and Process Other Request - Judge @CaseAPI", (): void => {
  test("Task is completable via next steps link - assign to me and go to task - Case management", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber76 = await createCase.createCase(
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
    console.log(`Case Number : ${caseNumber76}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber76, subjectName);
    await task.removeTask(page, taskRemoved, subjectName);
    await commonHelpers.chooseEventFromDropdown(page, eventRefer);
    await referCaseToJudge.referCaseToJudge(
      page,
      false,
      "Other",
      false,
      caseNumber76,
      subjectName,
    );
    await task.seeTask(page, userRoleJudge, false, taskName, subjectName);
    await task.initiateTask(
      page,
      userRoleJudge,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber76,
      taskName,
      priorityReview,
      assignedUserJudge,
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
      caseNumber76,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber76,
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
      caseNumber76,
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
      taskNameProcess,
      caseNumber76,
      caseManagementState,
      subjectName,
    );
  });

  test("Task is completable via next steps link - assign to me - Awaiting hearing @crossbrowserCaseAPI", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber77 = await createCase.createCase(
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
    console.log(`Case Number : ${caseNumber77}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber77, subjectName);
    await task.removeTask(page, taskRemoved, subjectName);
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
    );
    await commonHelpers.signOutAndGoToCase(
      page,
      userRoleAdmin,
      config.CaseAPIBaseURL,
      caseNumber77,
    );
    await commonHelpers.chooseEventFromDropdown(page, eventRefer);
    await referCaseToJudge.referCaseToJudge(
      page,
      false,
      "Other",
      false,
      caseNumber77,
      subjectName,
    );
    await task.seeTask(page, userRoleJudge, false, taskName, subjectName);
    await task.initiateTask(
      page,
      userRoleJudge,
      "Link: Assign Task to Me",
      false,
      caseNumber77,
      taskName,
      priorityReview,
      assignedUserJudge,
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
      caseNumber77,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber77,
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
      caseNumber77,
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
      taskNameProcess,
      caseNumber77,
      awaitingHearingState,
      subjectName,
    );
  });

  test("Task is completed via event dropdown - Case closed", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber78 = await createCase.createCase(
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
    console.log(`Case Number : ${caseNumber78}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber78, subjectName);
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
    );
    await commonHelpers.chooseEventFromDropdown(page, eventRefer);
    await referCaseToJudge.referCaseToJudge(
      page,
      false,
      "Other",
      false,
      caseNumber78,
      subjectName,
    );
    await task.seeTask(page, userRoleJudge, false, taskName, subjectName);
    await task.initiateTask(
      page,
      userRoleJudge,
      "Event DropDown",
      false,
      caseNumber78,
      taskName,
      priorityReview,
      assignedUserJudge,
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
      caseNumber78,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber78,
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
      caseNumber78,
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
      caseNumber78,
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
      caseNumber78,
      caseClosedState,
      subjectName,
    );
  });

  test("Review task is cancellable through close case", async ({ page }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber79 = await createCase.createCase(
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
    console.log(`Case Number : ${caseNumber79}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber79, subjectName);
    await task.removeTask(page, taskRemoved, subjectName);
    await commonHelpers.chooseEventFromDropdown(page, eventRefer);
    await referCaseToJudge.referCaseToJudge(
      page,
      false,
      "Other",
      false,
      caseNumber79,
      subjectName,
    );
    await task.seeTask(page, userRoleJudge, false, taskName, subjectName);
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
      caseNumber79,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber79,
      caseClosedState,
      subjectName,
    );
  });

  test("Process task is cancellable through close case", async ({ page }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber80 = await createCase.createCase(
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
    console.log(`Case Number : ${caseNumber80}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber80, subjectName);
    await task.removeTask(page, taskRemoved, subjectName);
    await commonHelpers.chooseEventFromDropdown(page, eventRefer);
    await referCaseToJudge.referCaseToJudge(
      page,
      false,
      "Other",
      false,
      caseNumber80,
      subjectName,
    );
    await task.seeTask(page, userRoleJudge, false, taskName, subjectName);
    await task.initiateTask(
      page,
      userRoleJudge,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber80,
      taskName,
      priorityReview,
      assignedUserJudge,
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
      caseNumber80,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber80,
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
      caseNumber80,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNameProcess,
      caseNumber80,
      caseClosedState,
      subjectName,
    );
  });
});
