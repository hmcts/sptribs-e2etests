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

const taskName = "Review new case and provide directions - Legal Officer";
const taskNameProcess = "Process directions returned";
const priorityReview = " low ";
const priorityProcess = " low ";
const assignedUserAdmin = "sptribswa regionalhearingcentreadmin";
const assignedUserLO = "sptribswa seniorcaseworker";
const userRoleAdmin = "waRegionalHearingCentreAdmin";
const userRoleLO = "waSeniorCaseworker";
const numberOfDaysReview = 5;
//const numberOfDaysProcess = 7;
// awaiting bug fix
const numberOfDaysProcess = 10;
const eventRefer = "Refer case to legal officer";
const eventOrders = "Orders: Create draft";
const eventSendOrder = "Orders: Send order";
const stateBeforeCompletion = "Case Status:  Case management";
const stateAfterCompletion = "Case Status:  Case management";

test.describe("Review and Process  New Case and Provide Directions - Legal Officer @CaseAPI", (): void => {
  test("Task is completable via next steps link - assign to me and go to task", async ({
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
    await referCaseToLegalOfficer.referCaseToLegalOfficer(
      page,
      false,
      "New case",
      false,
      caseNumber01,
    );
    await task.seeTask(page, userRoleLO, false, taskName);
    await task.initiateTask(
      page,
      userRoleLO,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber01,
      taskName,
      priorityReview,
      assignedUserLO,
      numberOfDaysReview,
      eventOrders,
      stateBeforeCompletion,
    );
    await createDraft.createDraft(
      page,
      false,
      false,
      "CIC3 - Rule 27",
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
      "7",
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
    await referCaseToLegalOfficer.referCaseToLegalOfficer(
      page,
      false,
      "New case",
      false,
      caseNumber02,
    );
    await task.seeTask(page, userRoleLO, false, taskName);
    await task.initiateTask(
      page,
      userRoleLO,
      "Link: Assign Task to Me",
      false,
      caseNumber02,
      taskName,
      priorityReview,
      assignedUserLO,
      numberOfDaysReview,
      eventOrders,
      stateBeforeCompletion,
    );
    await createDraft.createDraft(
      page,
      false,
      false,
      "CIC6 - General Directions",
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
      false,
      "1",
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
    await referCaseToLegalOfficer.referCaseToLegalOfficer(
      page,
      false,
      "New case",
      false,
      caseNumber03,
    );
    await task.seeTask(page, userRoleLO, false, taskName);
    await task.initiateTask(
      page,
      userRoleLO,
      "Event DropDown",
      false,
      caseNumber03,
      taskName,
      priorityReview,
      assignedUserLO,
      numberOfDaysReview,
      eventOrders,
      stateBeforeCompletion,
    );
    await createDraft.createDraft(
      page,
      false,
      false,
      "CIC7 - ME Dmi Reports",
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

  test("Review task is cancellable through close case", async ({ page }) => {
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
    await referCaseToLegalOfficer.referCaseToLegalOfficer(
      page,
      false,
      "New case",
      false,
      caseNumber04,
    );
    await task.seeTask(page, userRoleLO, false, taskName);
    await myWorkPage.clickAssignAndGoToTask(page);
    await commonHelpers.chooseEventFromDropdown(page, events_content.closeCase);
    await closeCase.closeCase(
      page,
      false,
      false,
      "caseConcession",
      true,
      null,
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
    await referCaseToLegalOfficer.referCaseToLegalOfficer(
      page,
      false,
      "New case",
      false,
      caseNumber05,
    );
    await task.seeTask(page, userRoleLO, false, taskName);
    await task.initiateTask(
      page,
      userRoleLO,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber05,
      taskName,
      priorityReview,
      assignedUserLO,
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

  test("Task is completable via next steps link - assign to me and go to task / Error Messaging  ", async ({
    page,
  }) => {
    let caseNumber06: any;
    caseNumber06 = await createCase.createCase(
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
    console.log(`Case Number : ${caseNumber06}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber06);
    await commonHelpers.chooseEventFromDropdown(page, eventRefer);
    await referCaseToLegalOfficer.referCaseToLegalOfficer(
      page,
      false,
      "New case",
      true,
      caseNumber06,
    );
    await task.seeTask(page, userRoleLO, false, taskName);
    await task.initiateTask(
      page,
      userRoleLO,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber06,
      taskName,
      priorityReview,
      assignedUserLO,
      numberOfDaysReview,
      eventOrders,
      stateBeforeCompletion,
    );
    await createDraft.createDraft(
      page,
      false,
      false,
      "CIC6 - General Directions",
      caseNumber06,
    );
  });
});

test("Task completion: Accessibility test / Review New Case and Provide Directions - Legal Officer : Accessibility test @accessibilityCaseAPI", async ({
  page,
}) => {
  let caseNumber07: any;
  caseNumber07 = await createCase.createCase(
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
  console.log(`Case Number : ${caseNumber07}`);
  await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
  await buildCase.buildCase(page, false, caseNumber07);
  await commonHelpers.chooseEventFromDropdown(page, eventRefer);
  await referCaseToLegalOfficer.referCaseToLegalOfficer(
    page,
    true,
    "New case",
    false,
    caseNumber07,
  );
  await task.seeTask(page, userRoleLO, true, taskName);
  await task.initiateTask(
    page,
    userRoleLO,
    "Link: Assign Task to Me and Go To Task",
    true,
    caseNumber07,
    taskName,
    priorityReview,
    assignedUserLO,
    numberOfDaysReview,
    eventOrders,
    stateBeforeCompletion,
  );
  await createDraft.createDraft(
    page,
    false,
    false,
    "CIC3 - Rule 27",
    caseNumber07,
  );
  await task.checkCompletedTask(
    page,
    true,
    taskName,
    caseNumber07,
    stateAfterCompletion,
  );
});
