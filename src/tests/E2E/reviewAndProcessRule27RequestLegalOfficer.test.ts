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
import myWorkPage from "../pages/WA/myWorkPage.ts";
import referCaseToLegalOfficer from "../journeys/CaseAPI/referCaseToLegalOfficer.ts";
import sendOrder from "../journeys/CaseAPI/sendOrder.ts";
import manageDueDate from "../journeys/CaseAPI/manageDueDate.ts";
import testDataCleanUp from "../helpers/testDataCleanUp.ts";

const priorityReview = " low ";
const priorityProcess = " low ";
const priorityNonCompliance = " medium ";
const numberOfDaysReview = 5;
const numberOfDaysProcess = 7;
const numberOfDaysNonCompliance = 1;

test.describe("Review Rule 27 request and Process decision - Legal Officer @CaseAPI ", (): void => {
  test("Check for redundant test data", async ({ page }) => {
    test.setTimeout(10 * 60 * 1000);
    await testDataCleanUp(page, waUsers_content.userRoleAdmin);
  });
  test("Task is completable via next steps link - assign to me and go to task @CaseAPI3", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber103 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber103, subjectName);
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
      caseNumber103,
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
      caseNumber103,
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
      caseNumber103,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.reviewRule27LO,
      caseNumber103,
      states_content.caseManagementState,
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
      caseNumber103,
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
      taskNames_content.processRule27,
      caseNumber103,
      states_content.caseManagementState,
      subjectName,
    );
  });

  test("Task is completable via next steps link - assign to me", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber104 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber104, subjectName);
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
      caseNumber104,
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
      "Link: Assign Task to Me",
      false,
      caseNumber104,
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
      "CIC10 - Strike Out Warning",
      caseNumber104,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.reviewRule27LO,
      caseNumber104,
      states_content.caseManagementState,
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
      "Link: Assign Task to Me",
      false,
      caseNumber104,
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
      taskNames_content.processRule27,
      caseNumber104,
      states_content.caseManagementState,
      subjectName,
    );
  });

  test("Task is completed via event dropdown @CaseAPI3", async ({ page }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber105 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber105, subjectName);
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
      caseNumber105,
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
      "Event DropDown",
      false,
      caseNumber105,
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
      "CIC13 - Pro Forma Summons",
      caseNumber105,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.reviewRule27LO,
      caseNumber105,
      states_content.caseManagementState,
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
      "Event DropDown",
      false,
      caseNumber105,
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
      taskNames_content.processRule27,
      caseNumber105,
      states_content.caseManagementState,
      subjectName,
    );
  });

  test("Review is cancellable through close case", async ({ page }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber106 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber106, subjectName);
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
      caseNumber106,
      subjectName,
    );
    await task.seeTask(
      page,
      waUsers_content.userRoleLO,
      false,
      taskNames_content.reviewRule27LO,
      subjectName,
    );
    await myWorkPage.clickAssignAndGoToTask(
      page,
      subjectName,
      taskNames_content.reviewRule27LO,
    );
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
      false,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.reviewRule27LO,
      caseNumber106,
      states_content.closedState,
      subjectName,
    );
  });

  test("Process task is cancellable through close case", async ({ page }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber107 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber107, subjectName);
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
      caseNumber107,
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
      caseNumber107,
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
      caseNumber107,
      subjectName,
    );
    await task.seeTask(
      page,
      waUsers_content.userRoleAdmin,
      false,
      taskNames_content.processRule27,
      subjectName,
    );
    await myWorkPage.clickAssignAndGoToTask(
      page,
      subjectName,
      taskNames_content.processRule27,
    );
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
      false,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.processRule27,
      caseNumber107,
      states_content.closedState,
      subjectName,
    );
  });
});

test("Task completion: Accessibility test @accessibility ", async ({
  page,
}) => {
  const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
  const caseNumber108 = await createCase.createCase(
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
  await buildCase.buildCase(page, false, caseNumber108, subjectName);
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
    caseNumber108,
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
    caseNumber108,
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
    caseNumber108,
    subjectName,
  );
  await task.checkCompletedTask(
    page,
    false,
    taskNames_content.reviewRule27LO,
    caseNumber108,
    states_content.caseManagementState,
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
    caseNumber108,
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
    taskNames_content.processRule27,
    caseNumber108,
    states_content.caseManagementState,
    subjectName,
  );
  await task.seeTask(
    page,
    waUsers_content.userRoleAdmin,
    false,
    taskNames_content.nonComplianceDirections,
    subjectName,
  );
  await task.initiateTask(
    page,
    waUsers_content.userRoleAdmin,
    "Event DropDown",
    true,
    caseNumber108,
    taskNames_content.nonComplianceDirections,
    priorityNonCompliance,
    authors_content.assignedUserAdmin,
    numberOfDaysNonCompliance,
    "Orders: Manage due date",
    states_content.caseManagementState,
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
    taskNames_content.nonComplianceDirections,
    caseNumber108,
    states_content.caseManagementState,
    subjectName,
  );
});
