import { test } from "@playwright/test";
import createCase from "../../journeys/WA/createCase.ts";
import buildCase from "../../journeys/WA/buildCase.ts";
import createDraft from "../../journeys/WA/createDraft.ts";
import task from "../../journeys/WA/task.ts";
import commonHelpers from "../../helpers/commonHelpers.ts";
import events_content from "../../fixtures/content/CaseAPI/events_content.ts";
import sendOrder from "../../journeys/WA/sendOrder.ts";
import createListing from "../../journeys/WA/createListing.ts";
import config from "../../config.ts";
import referCaseToLegalOfficer from "../../journeys/WA/referCaseToLegalOfficer.ts";

const taskName = "Review Postponement request - Legal Officer";
const taskNameProcess = "Process postponement directions";
const priorityReview = " medium ";
const priorityProcess = " medium ";
const assignedUserAdmin = "sptribswa hearingcentreadmin";
const assignedUserLO = "sptribswa seniorcaseworker";
const userRoleAdmin = "waHearingCentreAdmin";
const userRoleLO = "waSeniorCaseworker";
const userRoleCaseWorker = "waCaseWorker";
const numberOfDaysReview = 1;
const numberOfDaysProcess = 1;
const eventRefer = "Refer case to legal officer";
const eventOrders = "Orders: Create draft";
const eventSendOrder = "Orders: Send order";
const stateBeforeCompletion = "Awaiting hearing";
const stateAfterCompletion = "Awaiting hearing";
const taskRemoved = " Issue Case To Respondent ";

test.describe("Review and Process Postponement Directions - Legal Officer @CaseAPI", (): void => {
  test("Task is completable via next steps link - assign to me and go to task @crossbrowserCaseAPI", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber89 = await createCase.createCase(
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
    console.log(`Case Number : ${caseNumber89}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber89, subjectName);
    await task.removeTask(page, taskRemoved, subjectName);
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Hearings: Create listing",
    );
    await createListing.createListing(
      page,
      false,
      true,
      "1-London",
      "Case management",
      "Face to Face",
      "Morning",
      false,
      "East London Tribunal Hearing Centre-2 Clove Crescent, East India Dock London",
      false,
      caseNumber89,
      subjectName,
    );
    await commonHelpers.signOutAndGoToCase(
      page,
      userRoleCaseWorker,
      config.CaseAPIBaseURL,
      caseNumber89,
    );
    await commonHelpers.chooseEventFromDropdown(page, eventRefer);
    await referCaseToLegalOfficer.referCaseToLegalOfficer(
      page,
      false,
      "Postponement request",
      false,
      caseNumber89,
      subjectName,
    );
    await task.seeTask(page, userRoleLO, false, taskName, subjectName);
    await task.initiateTask(
      page,
      userRoleLO,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber89,
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
      caseNumber89,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber89,
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
      caseNumber89,
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
      caseNumber89,
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
      caseNumber89,
      stateAfterCompletion,
      subjectName,
    );
  });

  test("Task is completable via next steps link - assign to me", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber90 = await createCase.createCase(
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
    console.log(`Case Number : ${caseNumber90}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber90, subjectName);
    await task.removeTask(page, taskRemoved, subjectName);
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Hearings: Create listing",
    );
    await createListing.createListing(
      page,
      false,
      true,
      "1-London",
      "Case management",
      "Face to Face",
      "Morning",
      false,
      "East London Tribunal Hearing Centre-2 Clove Crescent, East India Dock London",
      false,
      caseNumber90,
      subjectName,
    );
    await commonHelpers.signOutAndGoToCase(
      page,
      userRoleCaseWorker,
      config.CaseAPIBaseURL,
      caseNumber90,
    );
    await commonHelpers.chooseEventFromDropdown(page, eventRefer);
    await referCaseToLegalOfficer.referCaseToLegalOfficer(
      page,
      false,
      "Postponement request",
      false,
      caseNumber90,
      subjectName,
    );
    await task.seeTask(page, userRoleLO, false, taskName, subjectName);
    await task.initiateTask(
      page,
      userRoleLO,
      "Link: Assign Task to Me",
      false,
      caseNumber90,
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
      caseNumber90,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber90,
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
      caseNumber90,
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
      caseNumber90,
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
      caseNumber90,
      stateAfterCompletion,
      subjectName,
    );
  });

  test("Task is completed via event dropdown", async ({ page }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber91 = await createCase.createCase(
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
    console.log(`Case Number : ${caseNumber91}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber91, subjectName);
    await task.removeTask(page, taskRemoved, subjectName);
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Hearings: Create listing",
    );
    await createListing.createListing(
      page,
      false,
      true,
      "1-London",
      "Case management",
      "Face to Face",
      "Morning",
      false,
      "East London Tribunal Hearing Centre-2 Clove Crescent, East India Dock London",
      false,
      caseNumber91,
      subjectName,
    );
    await commonHelpers.signOutAndGoToCase(
      page,
      userRoleCaseWorker,
      config.CaseAPIBaseURL,
      caseNumber91,
    );
    await commonHelpers.chooseEventFromDropdown(page, eventRefer);
    await referCaseToLegalOfficer.referCaseToLegalOfficer(
      page,
      false,
      "Postponement request",
      false,
      caseNumber91,
      subjectName,
    );
    await task.seeTask(page, userRoleLO, false, taskName, subjectName);
    await task.initiateTask(
      page,
      userRoleLO,
      "Event DropDown",
      false,
      caseNumber91,
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
      caseNumber91,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber91,
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
      caseNumber91,
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
      caseNumber91,
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
      caseNumber91,
      stateAfterCompletion,
      subjectName,
    );
  });
});
