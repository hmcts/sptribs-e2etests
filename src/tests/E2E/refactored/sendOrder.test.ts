import { test } from "@playwright/test";
import sendOrder from "../../journeys/WA/sendOrder.ts";
import commonHelpers from "../../helpers/commonHelpers.ts";
import createCase from "../../journeys/WA/createCase.ts";
import events_content from "../../fixtures/content/CaseAPI/events_content.ts";
import buildCase from "../../journeys/WA/buildCase.ts";
import task from "../../journeys/WA/task.ts";
import hearingOptions from "../../journeys/WA/hearingOptions.ts";
import referCaseToLegalOfficer from "../../journeys/WA/referCaseToLegalOfficer.ts";
import createDraft from "../../journeys/WA/createDraft.ts";
import createEditStay from "../../journeys/WA/createEditStay.ts";

const taskName = "Review other request - Legal Officer";
const taskNameProcess = "Process other directions returned";
const priorityReview = " low ";
const priorityProcess = " low ";
const assignedUserAdmin = "sptribswa hearingcentreadmin";
const assignedUserLO = "sptribswa seniorcaseworker";
const userRoleAdmin = "waHearingCentreAdmin";
const userRoleLO = "waSeniorCaseworker";
const numberOfDaysReview = 5;
const numberOfDaysProcess = 7;
const eventRefer = "Refer case to legal officer";
const eventOrders = "Orders: Create draft";
const eventSendOrder = "Orders: Send order";
const stateCaseStayed = "Case Status:  Case stayed";
const taskRemoved = " Issue Case To Respondent ";

test.describe("Send order tests @CaseAPI", () => {
  test("Send a draft order in the Ready to list state", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2400 = await createCase.createCase(
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
    console.log(`Case Number : ${caseNumber2400}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber2400, subjectName);
    await task.removeTask(page, taskRemoved, subjectName);
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
      caseNumber2400,
      subjectName,
    );
    await commonHelpers.chooseEventFromDropdown(page, eventRefer);
    await referCaseToLegalOfficer.referCaseToLegalOfficer(
      page,
      false,
      "Other",
      false,
      caseNumber2400,
      subjectName,
    );
    await task.seeTask(page, userRoleLO, false, taskName, subjectName);
    await task.initiateTask(
      page,
      userRoleLO,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber2400,
      taskName,
      priorityReview,
      assignedUserLO,
      numberOfDaysReview,
      eventOrders,
      "Ready to list",
      subjectName,
    );
    await createDraft.createDraft(
      page,
      false,
      false,
      "CIC8 - ME Joint Instruction",
      caseNumber2400,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber2400,
      "Ready to list",
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
      caseNumber2400,
      taskNameProcess,
      priorityProcess,
      assignedUserAdmin,
      numberOfDaysProcess,
      eventSendOrder,
      "Ready to list",
      subjectName,
    );
    await sendOrder.sendOrder(
      page,
      caseNumber2400,
      "DraftOrder",
      false,
      false,
      true,
      false,
      "3",
      subjectName,
    );
  });

  test("Send a draft order in the Case Stayed state", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2401 = await createCase.createCase(
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
    console.log(`Case Number : ${caseNumber2401}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber2401, subjectName);
    await task.removeTask(page, taskRemoved, subjectName);
    await createEditStay.createEditStay(
      page,
      false,
      false,
      "awaitingACourtJudgement",
      false,
      caseNumber2401,
      subjectName,
      stateCaseStayed,
    );
    await commonHelpers.chooseEventFromDropdown(page, eventRefer);
    await referCaseToLegalOfficer.referCaseToLegalOfficer(
      page,
      false,
      "Other",
      false,
      caseNumber2401,
      subjectName,
    );
    await task.seeTask(page, userRoleLO, false, taskName, subjectName);
    await task.initiateTask(
      page,
      userRoleLO,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber2401,
      taskName,
      priorityReview,
      assignedUserLO,
      numberOfDaysReview,
      eventOrders,
      "Case stayed",
      subjectName,
    );
    await createDraft.createDraft(
      page,
      false,
      false,
      "CIC8 - ME Joint Instruction",
      caseNumber2401,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber2401,
      "Case stayed",
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
      caseNumber2401,
      taskNameProcess,
      priorityProcess,
      assignedUserAdmin,
      numberOfDaysProcess,
      eventSendOrder,
      "Case stayed",
      subjectName,
    );
    await sendOrder.sendOrder(
      page,
      caseNumber2401,
      "DraftOrder",
      false,
      false,
      false,
      true,
      "7",
      subjectName,
    );
  });

  test("Send a upload order in the Ready to list state", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2402 = await createCase.createCase(
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
    console.log(`Case Number : ${caseNumber2402}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber2402, subjectName);
    await task.removeTask(page, taskRemoved, subjectName);
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
      caseNumber2402,
      subjectName,
    );
    await commonHelpers.chooseEventFromDropdown(page, eventRefer);
    await referCaseToLegalOfficer.referCaseToLegalOfficer(
      page,
      false,
      "Other",
      false,
      caseNumber2402,
      subjectName,
    );
    await task.seeTask(page, userRoleLO, false, taskName, subjectName);
    await task.initiateTask(
      page,
      userRoleLO,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber2402,
      taskName,
      priorityReview,
      assignedUserLO,
      numberOfDaysReview,
      eventOrders,
      "Ready to list",
      subjectName,
    );
    await createDraft.createDraft(
      page,
      false,
      false,
      "CIC8 - ME Joint Instruction",
      caseNumber2402,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber2402,
      "Ready to list",
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
      caseNumber2402,
      taskNameProcess,
      priorityProcess,
      assignedUserAdmin,
      numberOfDaysProcess,
      eventSendOrder,
      "Ready to list",
      subjectName,
    );
    await sendOrder.sendOrder(
      page,
      caseNumber2402,
      "UploadOrder",
      false,
      false,
      true,
      false,
      "7",
      subjectName,
    );
  });

  test("Send a upload order in the Case Stayed state", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2403 = await createCase.createCase(
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
    console.log(`Case Number : ${caseNumber2403}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber2403, subjectName);
    await task.removeTask(page, taskRemoved, subjectName);
    await createEditStay.createEditStay(
      page,
      true,
      false,
      "awaitingACourtJudgement",
      false,
      caseNumber2403,
      subjectName,
      stateCaseStayed,
    );
    await commonHelpers.chooseEventFromDropdown(page, eventRefer);
    await referCaseToLegalOfficer.referCaseToLegalOfficer(
      page,
      false,
      "Other",
      false,
      caseNumber2403,
      subjectName,
    );
    await task.seeTask(page, userRoleLO, false, taskName, subjectName);
    await task.initiateTask(
      page,
      userRoleLO,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber2403,
      taskName,
      priorityReview,
      assignedUserLO,
      numberOfDaysReview,
      eventOrders,
      "Case stayed",
      subjectName,
    );
    await createDraft.createDraft(
      page,
      false,
      false,
      "CIC8 - ME Joint Instruction",
      caseNumber2403,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber2403,
      "Case stayed",
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
      caseNumber2403,
      taskNameProcess,
      priorityProcess,
      assignedUserAdmin,
      numberOfDaysProcess,
      eventSendOrder,
      "Case stayed",
      subjectName,
    );
    await sendOrder.sendOrder(
      page,
      caseNumber2403,
      "UploadOrder",
      false,
      false,
      false,
      true,
      "3",
      subjectName,
    );
  });
});
