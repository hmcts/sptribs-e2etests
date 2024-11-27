import { test } from "@playwright/test";
import waUsers_content from "../fixtures/content/waUsers_content.ts";
import authors_content from "../fixtures/content/authors_content.ts";
import states_content from "../fixtures/content/states_content.ts";
import taskNames_content from "../fixtures/content/taskNames_content.ts";
import createCase from "../journeys/CaseAPI/createCase.ts";
import buildCase from "../journeys/CaseAPI/buildCase.ts";
import createDraft from "../journeys/CaseAPI/createDraft.ts";
import task from "../journeys/CaseAPI/task.ts";
import commonHelpers from "../helpers/commonHelpers.ts";
import events_content from "../fixtures/content/CaseAPI/events_content.ts";
import referCaseToJudge from "../journeys/CaseAPI/referCaseToJudge.ts";
import createListing from "../journeys/CaseAPI/createListing.ts";
import config from "../config.ts";
import sendOrder from "../journeys/CaseAPI/sendOrder.ts";
import testDataCleanUp from "../helpers/testDataCleanUp.ts";

const priorityReview = null;
const priorityProcess = " medium ";
const numberOfDaysReview = 1;
const numberOfDaysProcess = 1;

test.describe("Review and Process Listed Case - Judge @CaseAPI ", (): void => {
  test("Check for redundant test data", async ({ page }) => {
    test.setTimeout(10 * 60 * 1000);
    await testDataCleanUp(page, waUsers_content.userRoleAdmin);
  });
  test("Task is completable via next steps link - assign to me and go to task @CaseAPI2", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber07 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber07, subjectName);
    await task.removeTask(
      page,
      taskNames_content.issueCaseToRespondentTask,
      subjectName,
      waUsers_content.userRoleAdmin,
    );
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
      caseNumber07,
      subjectName,
      false,
    );
    await commonHelpers.signOutAndGoToCase(
      page,
      waUsers_content.userRoleCaseWorker,
      config.CaseAPIBaseURL,
      caseNumber07,
    );
    await commonHelpers.chooseEventFromDropdown(page, "Refer case to judge");
    await referCaseToJudge.referCaseToJudge(
      page,
      false,
      "Listed case",
      false,
      caseNumber07,
      subjectName,
    );
    await task.seeTask(
      page,
      waUsers_content.userRoleJudge,
      false,
      taskNames_content.reviewListCaseJudge,
      subjectName,
    );
    await task.initiateTask(
      page,
      waUsers_content.userRoleJudge,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber07,
      taskNames_content.reviewListCaseJudge,
      priorityReview,
      authors_content.assignedUserJudge,
      numberOfDaysReview,
      "Orders: Create draft",
      states_content.awaitingHearingState,
      subjectName,
    );
    await createDraft.createDraft(
      page,
      false,
      false,
      "CIC8 - ME Joint Instruction",
      caseNumber07,
      subjectName,
    );
    await task.seeTask(
      page,
      waUsers_content.userRoleAdmin,
      false,
      taskNames_content.processDirectionsListCase,
      subjectName,
    );
    await task.initiateTask(
      page,
      waUsers_content.userRoleAdmin,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber07,
      taskNames_content.processDirectionsListCase,
      priorityProcess,
      authors_content.assignedUserAdmin,
      numberOfDaysProcess,
      "Orders: Send order",
      states_content.awaitingHearingState,
      subjectName,
    );
    await sendOrder.sendOrder(
      page,
      caseNumber07,
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
      taskNames_content.reviewListCaseJudge,
      caseNumber07,
      states_content.awaitingHearingState,
      subjectName,
    );
  });

  test("Task is completable via next steps link - assign to me", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber08 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber08, subjectName);
    await task.removeTask(
      page,
      taskNames_content.issueCaseToRespondentTask,
      subjectName,
      waUsers_content.userRoleAdmin,
    );
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
      caseNumber08,
      subjectName,
      false,
    );
    await commonHelpers.signOutAndGoToCase(
      page,
      waUsers_content.userRoleCaseWorker,
      config.CaseAPIBaseURL,
      caseNumber08,
    );
    await commonHelpers.chooseEventFromDropdown(page, "Refer case to judge");
    await referCaseToJudge.referCaseToJudge(
      page,
      false,
      "Listed case",
      false,
      caseNumber08,
      subjectName,
    );
    await task.seeTask(
      page,
      waUsers_content.userRoleJudge,
      false,
      taskNames_content.reviewListCaseJudge,
      subjectName,
    );
    await task.initiateTask(
      page,
      waUsers_content.userRoleJudge,
      "Link: Assign Task to Me",
      false,
      caseNumber08,
      taskNames_content.reviewListCaseJudge,
      priorityReview,
      authors_content.assignedUserJudge,
      numberOfDaysReview,
      "Orders: Create draft",
      states_content.awaitingHearingState,
      subjectName,
    );
    await createDraft.createDraft(
      page,
      false,
      false,
      "CIC10 - Strike Out Warning",
      caseNumber08,
      subjectName,
    );
    await task.seeTask(
      page,
      waUsers_content.userRoleAdmin,
      false,
      taskNames_content.processDirectionsListCase,
      subjectName,
    );
    await task.initiateTask(
      page,
      waUsers_content.userRoleAdmin,
      "Link: Assign Task to Me",
      false,
      caseNumber08,
      taskNames_content.processDirectionsListCase,
      priorityProcess,
      authors_content.assignedUserAdmin,
      numberOfDaysProcess,
      "Orders: Send order",
      states_content.awaitingHearingState,
      subjectName,
    );
    await sendOrder.sendOrder(
      page,
      caseNumber08,
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
      taskNames_content.reviewListCaseJudge,
      caseNumber08,
      states_content.awaitingHearingState,
      subjectName,
    );
  });

  test("Task is completed via event dropdown", async ({ page }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber09 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber09, subjectName);
    await task.removeTask(
      page,
      taskNames_content.issueCaseToRespondentTask,
      subjectName,
      waUsers_content.userRoleAdmin,
    );
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
      caseNumber09,
      subjectName,
      false,
    );
    await commonHelpers.signOutAndGoToCase(
      page,
      waUsers_content.userRoleCaseWorker,
      config.CaseAPIBaseURL,
      caseNumber09,
    );
    await commonHelpers.chooseEventFromDropdown(page, "Refer case to judge");
    await referCaseToJudge.referCaseToJudge(
      page,
      false,
      "Listed case",
      false,
      caseNumber09,
      subjectName,
    );
    await task.seeTask(
      page,
      waUsers_content.userRoleJudge,
      false,
      taskNames_content.reviewListCaseJudge,
      subjectName,
    );
    await task.initiateTask(
      page,
      waUsers_content.userRoleJudge,
      "Event DropDown",
      false,
      caseNumber09,
      taskNames_content.reviewListCaseJudge,
      priorityReview,
      authors_content.assignedUserJudge,
      numberOfDaysReview,
      "Orders: Create draft",
      states_content.awaitingHearingState,
      subjectName,
    );
    await createDraft.createDraft(
      page,
      false,
      false,
      "CIC13 - Pro Forma Summons",
      caseNumber09,
      subjectName,
    );
    await task.seeTask(
      page,
      waUsers_content.userRoleAdmin,
      false,
      taskNames_content.processDirectionsListCase,
      subjectName,
    );
    await task.initiateTask(
      page,
      waUsers_content.userRoleAdmin,
      "Event DropDown",
      false,
      caseNumber09,
      taskNames_content.processDirectionsListCase,
      priorityProcess,
      authors_content.assignedUserAdmin,
      numberOfDaysProcess,
      "Orders: Send order",
      states_content.awaitingHearingState,
      subjectName,
    );
    await sendOrder.sendOrder(
      page,
      caseNumber09,
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
      taskNames_content.reviewListCaseJudge,
      caseNumber09,
      states_content.awaitingHearingState,
      subjectName,
    );
  });

  test("Error Messaging @ErrorMessaging", async ({ page }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber60 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber60, subjectName);
    await task.removeTask(
      page,
      taskNames_content.issueCaseToRespondentTask,
      subjectName,
      waUsers_content.userRoleAdmin,
    );
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
      caseNumber60,
      subjectName,
      false,
    );
    await commonHelpers.signOutAndGoToCase(
      page,
      waUsers_content.userRoleCaseWorker,
      config.CaseAPIBaseURL,
      caseNumber60,
    );
    await commonHelpers.chooseEventFromDropdown(page, "Refer case to judge");
    await referCaseToJudge.referCaseToJudge(
      page,
      false,
      "Listed case",
      false,
      caseNumber60,
      subjectName,
    );
    await task.seeTask(
      page,
      waUsers_content.userRoleJudge,
      false,
      taskNames_content.reviewListCaseJudge,
      subjectName,
    );
    await task.initiateTask(
      page,
      waUsers_content.userRoleJudge,
      "Link: Assign Task to Me",
      false,
      caseNumber60,
      taskNames_content.reviewListCaseJudge,
      priorityReview,
      authors_content.assignedUserJudge,
      numberOfDaysReview,
      "Orders: Create draft",
      states_content.awaitingHearingState,
      subjectName,
    );
    await createDraft.createDraft(
      page,
      false,
      false,
      "CIC10 - Strike Out Warning",
      caseNumber60,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.reviewListCaseJudge,
      caseNumber60,
      states_content.awaitingHearingState,
      subjectName,
    );
  });
});

test("Task completion: Accessibility test / Review Listed Case - Judge : Accessibility test @accessibility", async ({
  page,
}) => {
  const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
  const caseNumber61 = await createCase.createCase(
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
  await buildCase.buildCase(page, false, caseNumber61, subjectName);
  await task.removeTask(
    page,
    taskNames_content.issueCaseToRespondentTask,
    subjectName,
    waUsers_content.userRoleAdmin,
  );
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
    caseNumber61,
    subjectName,
    false,
  );
  await commonHelpers.signOutAndGoToCase(
    page,
    waUsers_content.userRoleCaseWorker,
    config.CaseAPIBaseURL,
    caseNumber61,
  );
  await commonHelpers.chooseEventFromDropdown(page, "Refer case to judge");
  await referCaseToJudge.referCaseToJudge(
    page,
    false,
    "Listed case",
    false,
    caseNumber61,
    subjectName,
  );
  await task.seeTask(
    page,
    waUsers_content.userRoleJudge,
    false,
    taskNames_content.reviewListCaseJudge,
    subjectName,
  );
  await task.initiateTask(
    page,
    waUsers_content.userRoleJudge,
    "Link: Assign Task to Me",
    false,
    caseNumber61,
    taskNames_content.reviewListCaseJudge,
    priorityReview,
    authors_content.assignedUserJudge,
    numberOfDaysReview,
    "Orders: Create draft",
    states_content.awaitingHearingState,
    subjectName,
  );
  await createDraft.createDraft(
    page,
    false,
    false,
    "CIC10 - Strike Out Warning",
    caseNumber61,
    subjectName,
  );
  await task.checkCompletedTask(
    page,
    false,
    taskNames_content.reviewListCaseJudge,
    caseNumber61,
    states_content.awaitingHearingState,
    subjectName,
  );
});
