import { test } from "@playwright/test";
import waUsers_content from "../fixtures/content/waUsers_content.ts";
import authors_content from "../fixtures/content/authors_content.ts";
import states_content from "../fixtures/content/states_content.ts";
import taskNames_content from "../fixtures/content/taskNames_content.ts";
import createDraft from "../journeys/CaseAPI/createDraft.ts";
import commonHelpers from "../helpers/commonHelpers.ts";
import createCase from "../journeys/CaseAPI/createCase.ts";
import events_content from "../fixtures/content/CaseAPI/events_content.ts";
import buildCase from "../journeys/CaseAPI/buildCase.ts";
import task from "../journeys/CaseAPI/task.ts";
import createEditStay from "../journeys/CaseAPI/createEditStay.ts";
import hearingOptions from "../journeys/CaseAPI/hearingOptions.ts";
import referCaseToLegalOfficer from "../journeys/CaseAPI/referCaseToLegalOfficer.ts";
import testDataCleanUp from "../helpers/testDataCleanUp.ts";

const priorityReview = " low ";
const numberOfDaysReview = 5;

test.describe("Case-API Create draft tests. @CaseAPI", () => {
  test("Check for redundant test data @crossbrowserCaseAPI", async ({
    page,
  }) => {
    test.setTimeout(20 * 60 * 1000);
    await testDataCleanUp(page, waUsers_content.userRoleAdmin);
  });

  test("Create a CIC6 draft in the Ready to list state. @crossbrowserCaseAPI", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber800 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber800, subjectName);
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
      caseNumber800,
      subjectName,
    );
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Refer case to legal officer",
    );
    await referCaseToLegalOfficer.referCaseToLegalOfficer(
      page,
      false,
      "Other",
      false,
      caseNumber800,
      subjectName,
    );
    await task.seeTask(
      page,
      waUsers_content.userRoleLO,
      false,
      taskNames_content.reviewOtherRequestLO,
      subjectName,
    );
    await task.initiateTask(
      page,
      waUsers_content.userRoleLO,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber800,
      taskNames_content.reviewOtherRequestLO,
      priorityReview,
      authors_content.assignedUserLO,
      numberOfDaysReview,
      "Orders: Create draft",
      states_content.readyToListState,
      subjectName,
    );
    await createDraft.createDraft(
      page,
      false,
      false,
      "CIC6 - General Directions",
      caseNumber800,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.reviewOtherRequestLO,
      caseNumber800,
      states_content.readyToListState,
      subjectName,
    );
  });

  test("Create a CIC8 draft in the Case Stayed state.", async ({ page }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber801 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber801, subjectName);
    await createEditStay.createEditStay(
      page,
      true,
      false,
      "awaitingACourtJudgement",
      false,
      caseNumber801,
      subjectName,
      states_content.caseStayedState,
      false,
    );
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Refer case to legal officer",
    );
    await referCaseToLegalOfficer.referCaseToLegalOfficer(
      page,
      false,
      "Other",
      false,
      caseNumber801,
      subjectName,
    );
    await task.seeTask(
      page,
      waUsers_content.userRoleLO,
      false,
      taskNames_content.reviewOtherRequestLO,
      subjectName,
    );
    await task.initiateTask(
      page,
      waUsers_content.userRoleLO,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber801,
      taskNames_content.reviewOtherRequestLO,
      priorityReview,
      authors_content.assignedUserLO,
      numberOfDaysReview,
      "Orders: Create draft",
      states_content.caseStayedState,
      subjectName,
    );
    await createDraft.createDraft(
      page,
      false,
      false,
      "CIC8 - ME Joint Instruction",
      caseNumber801,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.reviewOtherRequestLO,
      caseNumber801,
      states_content.caseStayedState,
      subjectName,
    );
  });

  test("Error messaging - Create draft", async ({ page }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber802 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber802, subjectName);
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Refer case to legal officer",
    );
    await referCaseToLegalOfficer.referCaseToLegalOfficer(
      page,
      false,
      "Other",
      false,
      caseNumber802,
      subjectName,
    );
    await task.seeTask(
      page,
      waUsers_content.userRoleLO,
      false,
      taskNames_content.reviewOtherRequestLO,
      subjectName,
    );
    await task.initiateTask(
      page,
      waUsers_content.userRoleLO,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber802,
      taskNames_content.reviewOtherRequestLO,
      priorityReview,
      authors_content.assignedUserLO,
      numberOfDaysReview,
      "Orders: Create draft",
      states_content.caseManagementState,
      subjectName,
    );
    await createDraft.createDraft(
      page,
      false,
      false,
      "CIC6 - General Directions",
      caseNumber802,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.reviewOtherRequestLO,
      caseNumber802,
      states_content.caseManagementState,
      subjectName,
    );
  });
});
