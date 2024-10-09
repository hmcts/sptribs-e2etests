import { test } from "@playwright/test";
import createCase from "../../journeys/WA/createCase.ts";
import buildCase from "../../journeys/WA/buildCase.ts";
import createDraft from "../../journeys/WA/createDraft.ts";
import task from "../../journeys/WA/task.ts";
import commonHelpers from "../../helpers/commonHelpers.ts";
import events_content from "../../fixtures/content/CaseAPI/events_content.ts";
import referCaseToJudge from "../../journeys/WA/referCaseToJudge.ts";
import createListing from "../../journeys/WA/createListing.ts";
import config from "../../config.ts";
import sendOrder from "../../journeys/WA/sendOrder.ts";

const taskName = "Review List Case - Judge";
const taskNameProcess = "Process directions re. listed case";
const priorityReview = null;
const priorityProcess = " medium ";
const assignedUserAdmin = "sptribswa hearingcentreadmin";
const assignedUserJudge = "Ms Kayla Adams";
const userRoleAdmin = "waHearingCentreAdmin";
const userRoleJudge = "waPrincipalJudge";
const userRoleCaseWorker = "waCaseWorker";
const numberOfDaysReview = 1;
const numberOfDaysProcess = 1;
const eventRefer = "Refer case to judge";
const eventOrders = "Orders: Create draft";
const eventSendOrder = "Orders: Send order";
const stateBeforeCompletion = "Awaiting hearing";
const stateAfterCompletion = "Awaiting hearing";
const taskRemoved = " Issue Case To Respondent ";

test.describe("Review and Process Listed Case - Judge @CaseAPI", (): void => {
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
    await task.removeTask(page, taskRemoved);
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
      caseNumber01,
    );
    await commonHelpers.signOutAndGoToCase(
      page,
      userRoleCaseWorker,
      config.CaseAPIBaseURL,
      caseNumber01,
    );
    await commonHelpers.chooseEventFromDropdown(page, eventRefer);
    await referCaseToJudge.referCaseToJudge(
      page,
      false,
      "Listed case",
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
      taskName,
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
    await task.removeTask(page, taskRemoved);
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
      caseNumber02,
    );
    await commonHelpers.signOutAndGoToCase(
      page,
      userRoleCaseWorker,
      config.CaseAPIBaseURL,
      caseNumber02,
    );
    await commonHelpers.chooseEventFromDropdown(page, eventRefer);
    await referCaseToJudge.referCaseToJudge(
      page,
      false,
      "Listed case",
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
      taskName,
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
    await task.removeTask(page, taskRemoved);
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Hearings: Create listing",
    );
    await createListing.createListing(
      page,
      false,
      true,
      "2-Midlands",
      "Interlocutory",
      "Video",
      "Afternoon",
      false,
      "Birmingham Civil And Family Justice Centre-Priory Courts, 33 Bull Street",
      false,
      caseNumber03,
    );
    await commonHelpers.signOutAndGoToCase(
      page,
      userRoleCaseWorker,
      config.CaseAPIBaseURL,
      caseNumber03,
    );
    await commonHelpers.chooseEventFromDropdown(page, eventRefer);
    await referCaseToJudge.referCaseToJudge(
      page,
      false,
      "Listed case",
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
      "1",
    );
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber03,
      stateAfterCompletion,
    );
  });

  test("Error Messaging", async ({ page }) => {
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
    await task.removeTask(page, taskRemoved);
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Hearings: Create listing",
    );
    await createListing.createListing(
      page,
      false,
      true,
      "4-North West",
      "Final",
      "Paper",
      "Morning",
      false,
      "Liverpool Civil And Family Court-Vernon Street, City Square",
      true,
      caseNumber05,
    );
    await commonHelpers.signOutAndGoToCase(
      page,
      userRoleCaseWorker,
      config.CaseAPIBaseURL,
      caseNumber05,
    );
    await commonHelpers.chooseEventFromDropdown(page, eventRefer);
    await referCaseToJudge.referCaseToJudge(
      page,
      false,
      "Listed case",
      false,
      caseNumber05,
    );
    await task.seeTask(page, userRoleJudge, false, taskName);
    await task.initiateTask(
      page,
      userRoleJudge,
      "Link: Assign Task to Me",
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
      "CIC10 - Strike Out Warning",
      caseNumber05,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber05,
      stateAfterCompletion,
    );
  });
});

test("Task completion: Accessibility test / Review Listed Case - Judge : Accessibility test @accessibilityCaseAPI", async ({
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
  await task.removeTask(page, taskRemoved);
  await commonHelpers.chooseEventFromDropdown(page, "Hearings: Create listing");
  await createListing.createListing(
    page,
    true,
    true,
    "5-South East",
    "Interlocutory",
    "Video",
    "Afternoon",
    true,
    "Brighton Tribunal Hearing Centre-City Gate House, 185 Dyke Road",
    false,
    caseNumber06,
  );
  await commonHelpers.signOutAndGoToCase(
    page,
    userRoleCaseWorker,
    config.CaseAPIBaseURL,
    caseNumber06,
  );
  await commonHelpers.chooseEventFromDropdown(page, eventRefer);
  await referCaseToJudge.referCaseToJudge(
    page,
    false,
    "Listed case",
    false,
    caseNumber06,
  );
  await task.seeTask(page, userRoleJudge, false, taskName);
  await task.initiateTask(
    page,
    userRoleJudge,
    "Link: Assign Task to Me",
    false,
    caseNumber06,
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
    caseNumber06,
  );
  await task.checkCompletedTask(
    page,
    false,
    taskName,
    caseNumber06,
    stateAfterCompletion,
  );
});
