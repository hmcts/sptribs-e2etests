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

const taskName = "Review Rule 27 request - Legal Officer";
const taskNameProcess = "Process Rule 27 decision";
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
const randomNumber = Math.floor(10000 + Math.random() * 90000).toString();

test.describe("Review Rule 27 request and Process decision - Legal Officer @CaseAPI", (): void => {
  test("Task is completable via next steps link - assign to me and go to task", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${randomNumber}`;
    const caseNumber103 = await createCase.createCase(
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
    console.log(`Case Number : ${caseNumber103}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber103, subjectName);
    await task.removeTask(page, taskRemoved, subjectName);
    await commonHelpers.chooseEventFromDropdown(page, eventRefer);
    await referCaseToLegalOfficer.referCaseToLegalOfficer(
      page,
      false,
      "Rule 27 request",
      false,
      caseNumber103,
      subjectName,
    );
    await task.seeTask(page, userRoleLO, false, taskName, subjectName);
    await task.initiateTask(
      page,
      userRoleLO,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber103,
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
      caseNumber103,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber103,
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
      caseNumber103,
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
      caseNumber103,
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
      caseNumber103,
      stateAfterCompletion,
      subjectName,
    );
  });

  test("Task is completable via next steps link - assign to me", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${randomNumber}`;
    const caseNumber104 = await createCase.createCase(
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
    console.log(`Case Number : ${caseNumber104}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber104, subjectName);
    await task.removeTask(page, taskRemoved, subjectName);
    await commonHelpers.chooseEventFromDropdown(page, eventRefer);
    await referCaseToLegalOfficer.referCaseToLegalOfficer(
      page,
      false,
      "Rule 27 request",
      false,
      caseNumber104,
      subjectName,
    );
    await task.seeTask(page, userRoleLO, false, taskName, subjectName);
    await task.initiateTask(
      page,
      userRoleLO,
      "Link: Assign Task to Me",
      false,
      caseNumber104,
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
      caseNumber104,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber104,
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
      caseNumber104,
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
      caseNumber104,
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
      caseNumber104,
      stateAfterCompletion,
      subjectName,
    );
  });

  test("Task is completed via event dropdown", async ({ page }) => {
    const subjectName = `Subject AutoTesting${randomNumber}`;
    const caseNumber105 = await createCase.createCase(
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
    console.log(`Case Number : ${caseNumber105}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber105, subjectName);
    await task.removeTask(page, taskRemoved, subjectName);
    await commonHelpers.chooseEventFromDropdown(page, eventRefer);
    await referCaseToLegalOfficer.referCaseToLegalOfficer(
      page,
      false,
      "Rule 27 request",
      false,
      caseNumber105,
      subjectName,
    );
    await task.seeTask(page, userRoleLO, false, taskName, subjectName);
    await task.initiateTask(
      page,
      userRoleLO,
      "Event DropDown",
      false,
      caseNumber105,
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
      caseNumber105,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber105,
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
      caseNumber105,
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
      caseNumber105,
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
      caseNumber105,
      stateAfterCompletion,
      subjectName,
    );
  });

  test("Review is cancellable through close case", async ({ page }) => {
    const subjectName = `Subject AutoTesting${randomNumber}`;
    const caseNumber106 = await createCase.createCase(
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
    console.log(`Case Number : ${caseNumber106}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber106, subjectName);
    await task.removeTask(page, taskRemoved, subjectName);
    await commonHelpers.chooseEventFromDropdown(page, eventRefer);
    await referCaseToLegalOfficer.referCaseToLegalOfficer(
      page,
      false,
      "Rule 27 request",
      false,
      caseNumber106,
      subjectName,
    );
    await task.seeTask(page, userRoleLO, false, taskName, subjectName);
    await myWorkPage.clickAssignAndGoToTask(page, subjectName);
    await commonHelpers.chooseEventFromDropdown(page, events_content.closeCase);
    await closeCase.closeCase(
      page,
      false,
      false,
      "deathOfAppellant",
      true,
      null,
      null,
      caseNumber106,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber106,
      caseClosedState,
      subjectName,
    );
  });

  test("Process task is cancellable through close case", async ({ page }) => {
    const subjectName = `Subject AutoTesting${randomNumber}`;
    const caseNumber107 = await createCase.createCase(
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
    console.log(`Case Number : ${caseNumber107}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber107, subjectName);
    await task.removeTask(page, taskRemoved, subjectName);
    await commonHelpers.chooseEventFromDropdown(page, eventRefer);
    await referCaseToLegalOfficer.referCaseToLegalOfficer(
      page,
      false,
      "Rule 27 request",
      false,
      caseNumber107,
      subjectName,
    );
    await task.seeTask(page, userRoleLO, false, taskName, subjectName);
    await task.initiateTask(
      page,
      userRoleLO,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber107,
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
      caseNumber107,
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
      "other",
      null,
      caseNumber107,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNameProcess,
      caseNumber107,
      caseClosedState,
      subjectName,
    );
  });
});

test("Task completion: Accessibility test @accessibilityCaseAPI", async ({
  page,
}) => {
  test.setTimeout(7 * 60 * 1000);
  const subjectName = `Subject AutoTesting${randomNumber}`;
  const caseNumber108 = await createCase.createCase(
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
  console.log(`Case Number : ${caseNumber108}`);
  await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
  await buildCase.buildCase(page, false, caseNumber108, subjectName);
  await task.removeTask(page, taskRemoved, subjectName);
  await commonHelpers.chooseEventFromDropdown(page, eventRefer);
  await referCaseToLegalOfficer.referCaseToLegalOfficer(
    page,
    false,
    "Rule 27 request",
    false,
    caseNumber108,
    subjectName,
  );
  await task.seeTask(page, userRoleLO, false, taskName, subjectName);
  await task.initiateTask(
    page,
    userRoleLO,
    "Link: Assign Task to Me and Go To Task",
    false,
    caseNumber108,
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
    caseNumber108,
    subjectName,
  );
  await task.checkCompletedTask(
    page,
    false,
    taskName,
    caseNumber108,
    stateAfterCompletion,
    subjectName,
  );
  await task.seeTask(page, userRoleAdmin, false, taskNameProcess, subjectName);
  await task.initiateTask(
    page,
    userRoleAdmin,
    "Link: Assign Task to Me and Go To Task",
    false,
    caseNumber108,
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
    caseNumber108,
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
    caseNumber108,
    stateAfterCompletion,
    subjectName,
  );
  await task.seeTask(
    page,
    userRoleAdmin,
    true,
    taskNameNonCompliance,
    subjectName,
  );
  await task.initiateTask(
    page,
    userRoleAdmin,
    "Event DropDown",
    true,
    caseNumber108,
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
    true,
    false,
    false,
    false,
    caseNumber108,
    subjectName,
  );
  await task.checkCompletedTask(
    page,
    true,
    taskNameNonCompliance,
    caseNumber108,
    stateAfterCompletion,
    subjectName,
  );
});
