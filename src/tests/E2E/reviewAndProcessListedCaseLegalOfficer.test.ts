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
import createListing from "../journeys/CaseAPI/createListing.ts";
import referCaseToLegalOfficer from "../journeys/CaseAPI/referCaseToLegalOfficer.ts";
import config from "../config.ts";
import sendOrder from "../journeys/CaseAPI/sendOrder.ts";
import testDataCleanUp from "../helpers/testDataCleanUp.ts";

const priorityReview = " medium ";
const priorityProcess = " medium ";
const numberofDaysReview = 1;
const numberOfDaysProcess = 1;

test.describe("Review and Process Listed Case - Legal Officer @CaseAPI @CaseAPI6", (): void => {
  test("Check for redundant test data", async ({ page }) => {
    test.setTimeout(10 * 60 * 1000);
    await testDataCleanUp(page, waUsers_content.userRoleAdmin);
  });

  test("Task is completable via next steps link - assign to me and go to task @crossbrowserCaseAPI", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber13 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber13, subjectName);
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
      "6-South West",
      "Case management",
      "Hybrid",
      "All day",
      false,
      "Bristol Magistrates Court-Marlborough Street, Bristol, BS1 3NU",
      false,
      caseNumber13,
      subjectName,
      false,
    );
    await commonHelpers.signOutAndGoToCase(
      page,
      waUsers_content.userRoleCaseWorker,
      config.CaseAPIBaseURL,
      caseNumber13,
    );
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Refer case to legal officer",
    );
    await referCaseToLegalOfficer.referCaseToLegalOfficer(
      page,
      false,
      "Listed case",
      false,
      caseNumber13,
      subjectName,
    );
    await task.seeTask(
      page,
      waUsers_content.userRoleLO,
      false,
      taskNames_content.reviewListCaseLO,
      subjectName,
    );
    await task.initiateTask(
      page,
      waUsers_content.userRoleLO,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber13,
      taskNames_content.reviewListCaseLO,
      priorityReview,
      authors_content.assignedUserLO,
      numberofDaysReview,
      "Orders: Create draft",
      states_content.awaitingHearingState,
      subjectName,
    );
    await createDraft.createDraft(
      page,
      false,
      false,
      "CIC8 - ME Joint Instruction",
      caseNumber13,
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
      caseNumber13,
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
      caseNumber13,
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
      taskNames_content.reviewListCaseLO,
      caseNumber13,
      states_content.awaitingHearingState,
      subjectName,
    );
  });

  test("Task is completable via next steps link - assign to me", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber14 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber14, subjectName);
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
      "7-Wales",
      "Final",
      "Telephone",
      "Morning",
      false,
      "Cardiff Social Security And Child Support Tribunal-Cardiff Eastgate House, 35-43, Newport Road",
      false,
      caseNumber14,
      subjectName,
      false,
    );
    await commonHelpers.signOutAndGoToCase(
      page,
      waUsers_content.userRoleCaseWorker,
      config.CaseAPIBaseURL,
      caseNumber14,
    );
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Refer case to legal officer",
    );
    await referCaseToLegalOfficer.referCaseToLegalOfficer(
      page,
      false,
      "Listed case",
      false,
      caseNumber14,
      subjectName,
    );
    await task.seeTask(
      page,
      waUsers_content.userRoleLO,
      false,
      taskNames_content.reviewListCaseLO,
      subjectName,
    );
    await task.initiateTask(
      page,
      waUsers_content.userRoleLO,
      "Link: Assign Task to Me",
      false,
      caseNumber14,
      taskNames_content.reviewListCaseLO,
      priorityReview,
      authors_content.assignedUserLO,
      numberofDaysReview,
      "Orders: Create draft",
      states_content.awaitingHearingState,
      subjectName,
    );
    await createDraft.createDraft(
      page,
      false,
      false,
      "CIC10 - Strike Out Warning",
      caseNumber14,
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
      caseNumber14,
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
      caseNumber14,
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
      taskNames_content.reviewListCaseLO,
      caseNumber14,
      states_content.awaitingHearingState,
      subjectName,
    );
  });

  test("Task is completed via event dropdown", async ({ page }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber15 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber15, subjectName);
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
      "Fox Court - London (Central) SSCS Tribunal-4th Floor, Fox Court, 30 Brooke Street, London",
      false,
      caseNumber15,
      subjectName,
      false,
    );
    await commonHelpers.signOutAndGoToCase(
      page,
      waUsers_content.userRoleCaseWorker,
      config.CaseAPIBaseURL,
      caseNumber15,
    );
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Refer case to legal officer",
    );
    await referCaseToLegalOfficer.referCaseToLegalOfficer(
      page,
      false,
      "Listed case",
      false,
      caseNumber15,
      subjectName,
    );
    await task.seeTask(
      page,
      waUsers_content.userRoleLO,
      false,
      taskNames_content.reviewListCaseLO,
      subjectName,
    );
    await task.initiateTask(
      page,
      waUsers_content.userRoleLO,
      "Event DropDown",
      false,
      caseNumber15,
      taskNames_content.reviewListCaseLO,
      priorityReview,
      authors_content.assignedUserLO,
      numberofDaysReview,
      "Orders: Create draft",
      states_content.awaitingHearingState,
      subjectName,
    );
    await createDraft.createDraft(
      page,
      false,
      false,
      "CIC13 - Pro Forma Summons",
      caseNumber15,
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
      caseNumber15,
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
      caseNumber15,
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
      taskNames_content.reviewListCaseLO,
      caseNumber15,
      states_content.awaitingHearingState,
      subjectName,
    );
  });
});
