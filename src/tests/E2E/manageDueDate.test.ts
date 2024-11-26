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
import closeCase from "../journeys/CaseAPI/closeCase.ts";
import referCaseToLegalOfficer from "../journeys/CaseAPI/referCaseToLegalOfficer.ts";
import sendOrder from "../journeys/CaseAPI/sendOrder.ts";
import manageDueDate from "../journeys/CaseAPI/manageDueDate.ts";
import hearingOptions from "../journeys/CaseAPI/hearingOptions.ts";
import testDataCleanUp from "../helpers/testDataCleanUp.ts";
import createListing from "../journeys/CaseAPI/createListing.ts";
import createEditStay from "../journeys/CaseAPI/createEditStay.ts";

const priorityReview = " low ";
const priorityProcess = " low ";

test.describe("User is able to Manage Due Date of an order @CaseAPI", (): void => {
  test("Check for redundant test data", async ({ page }) => {
    test.setTimeout(10 * 60 * 1000);
    await testDataCleanUp(page, waUsers_content.userRoleAdmin);
  });

  test("User is able to manage due date in state 'Ready to list' Orders sent in state Case management @crossbrowserCaseAPI", async ({
    page,
  }) => {
    const numberOfDaysReview = 5;
    const numberOfDaysProcess = 7;
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2700 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber2700, subjectName);
    await task.removeTask(
      page,
      taskNames_content.issueCaseToRespondentTask,
      subjectName,
      waUsers_content.userRoleAdmin,
    );
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Refer case to legal officer",
    );
    await referCaseToLegalOfficer.referCaseToLegalOfficer(
      page,
      false,
      "Rule 27 request",
      false,
      caseNumber2700,
      subjectName,
    );
    await task.seeTask(
      page,
      waUsers_content.userRoleLO,
      false,
      taskNames_content.reviewRule27LO,
      subjectName,
    );
    await task.initiateTask(
      page,
      waUsers_content.userRoleLO,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber2700,
      taskNames_content.reviewRule27LO,
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
      "CIC8 - ME Joint Instruction",
      caseNumber2700,
      subjectName,
    );
    await task.seeTask(
      page,
      waUsers_content.userRoleAdmin,
      false,
      taskNames_content.processRule27,
      subjectName,
    );
    await task.initiateTask(
      page,
      waUsers_content.userRoleAdmin,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber2700,
      taskNames_content.processRule27,
      priorityProcess,
      authors_content.assignedUserAdmin,
      numberOfDaysProcess,
      "Orders: Send order",
      states_content.caseManagementState,
      subjectName,
    );
    await sendOrder.sendOrder(
      page,
      caseNumber2700,
      "DraftOrder",
      false,
      false,
      true,
      true,
      "1",
      subjectName,
    );
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
      caseNumber2700,
      subjectName,
    );
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Orders: Manage due date",
    );
    await manageDueDate.manageDueDate(
      page,
      false,
      false,
      true,
      true,
      caseNumber2700,
      subjectName,
    );
  });

  test("User is able to manage due date in state 'Awaiting Hearing', Orders sent in state Case Management @CaseAPI2", async ({
    page,
  }) => {
    const numberOfDaysReview = 1;
    const numberOfDaysProcess = 1;
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2701 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber2701, subjectName);
    await task.removeTask(
      page,
      taskNames_content.issueCaseToRespondentTask,
      subjectName,
      waUsers_content.userRoleAdmin,
    );
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Refer case to legal officer",
    );
    await referCaseToLegalOfficer.referCaseToLegalOfficer(
      page,
      false,
      "Time extension request",
      false,
      caseNumber2701,
      subjectName,
    );
    await task.seeTask(
      page,
      waUsers_content.userRoleLO,
      false,
      taskNames_content.reviewTimeExtensionLO,
      subjectName,
    );
    await task.initiateTask(
      page,
      waUsers_content.userRoleLO,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber2701,
      taskNames_content.reviewTimeExtensionLO,
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
      "CIC8 - ME Joint Instruction",
      caseNumber2701,
      subjectName,
    );
    await task.seeTask(
      page,
      waUsers_content.userRoleAdmin,
      false,
      taskNames_content.processTimeExtensionDirections,
      subjectName,
    );
    await task.initiateTask(
      page,
      waUsers_content.userRoleAdmin,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber2701,
      taskNames_content.processTimeExtensionDirections,
      priorityProcess,
      authors_content.assignedUserAdmin,
      numberOfDaysProcess,
      "Orders: Send order",
      states_content.caseManagementState,
      subjectName,
    );
    await sendOrder.sendOrder(
      page,
      caseNumber2701,
      "DraftOrder",
      false,
      false,
      true,
      true,
      "1",
      subjectName,
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
      caseNumber2701,
      subjectName,
      false,
    );
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Orders: Manage due date",
    );
    await manageDueDate.manageDueDate(
      page,
      false,
      false,
      true,
      true,
      caseNumber2701,
      subjectName,
    );
  });

  test("User is able to manage due date in state 'case closed', Orders sent in state Case Closed", async ({
    page,
  }) => {
    const numberOfDaysReview = 5;
    const numberOfDaysProcess = 5;
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2702 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber2702, subjectName);
    await task.removeTask(
      page,
      taskNames_content.issueCaseToRespondentTask,
      subjectName,
      waUsers_content.userRoleAdmin,
    );
    await commonHelpers.chooseEventFromDropdown(page, events_content.closeCase);
    await closeCase.closeCase(
      page,
      false,
      false,
      "caseRejected",
      true,
      "duplicateCase",
      null,
      caseNumber2702,
      subjectName,
      false,
    );
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Refer case to legal officer",
    );
    await referCaseToLegalOfficer.referCaseToLegalOfficer(
      page,
      false,
      "Reinstatement request",
      false,
      caseNumber2702,
      subjectName,
    );
    await task.seeTask(
      page,
      waUsers_content.userRoleLO,
      false,
      taskNames_content.reviewReinstatementLO,
      subjectName,
    );
    await task.initiateTask(
      page,
      waUsers_content.userRoleLO,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber2702,
      taskNames_content.reviewReinstatementLO,
      priorityReview,
      authors_content.assignedUserLO,
      numberOfDaysReview,
      "Orders: Create draft",
      states_content.closedState,
      subjectName,
    );
    await createDraft.createDraft(
      page,
      false,
      false,
      "CIC8 - ME Joint Instruction",
      caseNumber2702,
      subjectName,
    );
    await task.seeTask(
      page,
      waUsers_content.userRoleAdmin,
      false,
      taskNames_content.processReinstatement,
      subjectName,
    );
    await task.initiateTask(
      page,
      waUsers_content.userRoleAdmin,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber2702,
      taskNames_content.processReinstatement,
      priorityProcess,
      authors_content.assignedUserAdmin,
      numberOfDaysProcess,
      "Orders: Send order",
      states_content.closedState,
      subjectName,
    );
    await sendOrder.sendOrder(
      page,
      caseNumber2702,
      "DraftOrder",
      false,
      false,
      true,
      true,
      "1",
      subjectName,
    );
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Orders: Manage due date",
    );
    await manageDueDate.manageDueDate(
      page,
      false,
      false,
      true,
      true,
      caseNumber2702,
      subjectName,
    );
  });

  test("User is able to manage due date in state 'case stayed', Orders Sent in state Case Stayed ", async ({
    page,
  }) => {
    const numberOfDaysReview = 5;
    const numberOfDaysProcess = 7;
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2703 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber2703, subjectName);
    await task.removeTask(
      page,
      taskNames_content.issueCaseToRespondentTask,
      subjectName,
      waUsers_content.userRoleAdmin,
    );
    await createEditStay.createEditStay(
      page,
      true,
      false,
      "awaitingACourtJudgement",
      false,
      caseNumber2703,
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
      caseNumber2703,
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
      caseNumber2703,
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
      caseNumber2703,
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
      caseNumber2703,
      taskNames_content.processOtherDirectionsReturned,
      priorityProcess,
      authors_content.assignedUserAdmin,
      numberOfDaysProcess,
      "Orders: Send order",
      states_content.caseStayedState,
      subjectName,
    );
    await sendOrder.sendOrder(
      page,
      caseNumber2703,
      "DraftOrder",
      false,
      false,
      true,
      true,
      "1",
      subjectName,
    );
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Orders: Manage due date",
    );
    await manageDueDate.manageDueDate(
      page,
      false,
      false,
      true,
      true,
      caseNumber2703,
      subjectName,
    );
  });
});
