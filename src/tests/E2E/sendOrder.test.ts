import { test } from "@playwright/test";
import waUsers_content from "../fixtures/content/waUsers_content.ts";
import authors_content from "../fixtures/content/authors_content.ts";
import states_content from "../fixtures/content/states_content.ts";
import taskNames_content from "../fixtures/content/taskNames_content.ts";
import sendOrder from "../journeys/CaseAPI/sendOrder.ts";
import commonHelpers from "../helpers/commonHelpers.ts";
import createCase from "../journeys/CaseAPI/createCase.ts";
import events_content from "../fixtures/content/CaseAPI/events_content.ts";
import buildCase from "../journeys/CaseAPI/buildCase.ts";
import task from "../journeys/CaseAPI/task.ts";
import hearingOptions from "../journeys/CaseAPI/hearingOptions.ts";
import referCaseToLegalOfficer from "../journeys/CaseAPI/referCaseToLegalOfficer.ts";
import createDraft from "../journeys/CaseAPI/createDraft.ts";
import createEditStay from "../journeys/CaseAPI/createEditStay.ts";
import testDataCleanUp from "../helpers/testDataCleanUp.ts";

const priorityReview = " low ";
const priorityProcess = " low ";
const numberOfDaysReview = 5;
const numberOfDaysProcess = 7;

test.describe("Send order tests @CaseAPI @CaseAPI7", () => {
  test("Check for redundant test data", async ({ page }) => {
    await testDataCleanUp(page, waUsers_content.userRoleAdmin);
  });

  test("Send a draft order in the Ready to list state @crossbrowserCaseAPI", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2400 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber2400, subjectName);
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
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Refer case to legal officer",
    );
    await referCaseToLegalOfficer.referCaseToLegalOfficer(
      page,
      false,
      "Other",
      false,
      caseNumber2400,
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
      caseNumber2400,
      taskNames_content.reviewOtherRequestLO,
      priorityReview,
      authors_content.assignedUserLO,
      numberOfDaysReview,
      "Orders: Create draft",
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
      taskNames_content.reviewOtherRequestLO,
      caseNumber2400,
      "Ready to list",
      subjectName,
    );
    await task.seeTask(
      page,
      waUsers_content.userRoleAdmin,
      false,
      taskNames_content.processOtherDirectionsReturned,
      subjectName,
    );
    await task.initiateTask(
      page,
      waUsers_content.userRoleAdmin,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber2400,
      taskNames_content.processOtherDirectionsReturned,
      priorityProcess,
      authors_content.assignedUserAdmin,
      numberOfDaysProcess,
      "Orders: Send order",
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
    await buildCase.buildCase(page, false, caseNumber2401, subjectName);
    await createEditStay.createEditStay(
      page,
      false,
      false,
      "awaitingACourtJudgement",
      false,
      caseNumber2401,
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
      caseNumber2401,
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
      caseNumber2401,
      taskNames_content.reviewOtherRequestLO,
      priorityReview,
      authors_content.assignedUserLO,
      numberOfDaysReview,
      "Orders: Create draft",
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
      taskNames_content.reviewOtherRequestLO,
      caseNumber2401,
      "Case stayed",
      subjectName,
    );
    await task.seeTask(
      page,
      waUsers_content.userRoleAdmin,
      false,
      taskNames_content.processOtherDirectionsReturned,
      subjectName,
    );
    await task.initiateTask(
      page,
      waUsers_content.userRoleAdmin,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber2401,
      taskNames_content.processOtherDirectionsReturned,
      priorityProcess,
      authors_content.assignedUserAdmin,
      numberOfDaysProcess,
      "Orders: Send order",
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
    await buildCase.buildCase(page, false, caseNumber2402, subjectName);
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
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Refer case to legal officer",
    );
    await referCaseToLegalOfficer.referCaseToLegalOfficer(
      page,
      false,
      "Other",
      false,
      caseNumber2402,
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
      caseNumber2402,
      taskNames_content.reviewOtherRequestLO,
      priorityReview,
      authors_content.assignedUserLO,
      numberOfDaysReview,
      "Orders: Create draft",
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
      taskNames_content.reviewOtherRequestLO,
      caseNumber2402,
      "Ready to list",
      subjectName,
    );
    await task.seeTask(
      page,
      waUsers_content.userRoleAdmin,
      false,
      taskNames_content.processOtherDirectionsReturned,
      subjectName,
    );
    await task.initiateTask(
      page,
      waUsers_content.userRoleAdmin,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber2402,
      taskNames_content.processOtherDirectionsReturned,
      priorityProcess,
      authors_content.assignedUserAdmin,
      numberOfDaysProcess,
      "Orders: Send order",
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
    await buildCase.buildCase(page, false, caseNumber2403, subjectName);
    await createEditStay.createEditStay(
      page,
      true,
      false,
      "awaitingACourtJudgement",
      false,
      caseNumber2403,
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
      caseNumber2403,
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
      caseNumber2403,
      taskNames_content.reviewOtherRequestLO,
      priorityReview,
      authors_content.assignedUserLO,
      numberOfDaysReview,
      "Orders: Create draft",
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
      taskNames_content.reviewOtherRequestLO,
      caseNumber2403,
      "Case stayed",
      subjectName,
    );
    await task.seeTask(
      page,
      waUsers_content.userRoleAdmin,
      false,
      taskNames_content.processOtherDirectionsReturned,
      subjectName,
    );
    await task.initiateTask(
      page,
      waUsers_content.userRoleAdmin,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber2403,
      taskNames_content.processOtherDirectionsReturned,
      priorityProcess,
      authors_content.assignedUserAdmin,
      numberOfDaysProcess,
      "Orders: Send order",
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
