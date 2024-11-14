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
import documentManagementUpload from "../journeys/CaseAPI/documentManagementUpload.ts";
import testDataCleanUp from "../helpers/testDataCleanUp.ts";

const priorityReview = " low ";
const priorityProcess = " low ";
const priorityNonCompliance = " medium ";
const numberOfDaysReview = 5;
const numberOfDaysProcess = 7;
const numberOfDaysNonCompliance = 1;

test.describe("Review and Process  New Case and Provide Directions - Legal Officer @CaseAPI @CaseAPI6", (): void => {
  test("Check for redundant test data @crossbrowserCaseAPI", async ({
    page,
  }) => {
    await testDataCleanUp(page, waUsers_content.userRoleAdmin);
  });
  test("Task is completable via next steps link - assign to me and go to task @crossbrowserCaseAPI", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber69 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber69, subjectName);
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Refer case to legal officer",
    );
    await referCaseToLegalOfficer.referCaseToLegalOfficer(
      page,
      false,
      "New case",
      false,
      caseNumber69,
      subjectName,
    );
    await task.seeTask(
      page,
      waUsers_content.userRoleLO,
      false,
      taskNames_content.reviewNewCaseLO,
      subjectName,
    );
    await task.initiateTask(
      page,
      waUsers_content.userRoleLO,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber69,
      taskNames_content.reviewNewCaseLO,
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
      "CIC3 - Rule 27",
      caseNumber69,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.reviewNewCaseLO,
      caseNumber69,
      states_content.caseManagementState,
      subjectName,
    );
    await task.seeTask(
      page,
      waUsers_content.userRoleAdmin,
      false,
      taskNames_content.processDirectionsReturned,
      subjectName,
    );
    await task.initiateTask(
      page,
      waUsers_content.userRoleAdmin,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber69,
      taskNames_content.processDirectionsReturned,
      priorityProcess,
      authors_content.assignedUserAdmin,
      numberOfDaysProcess,
      "Orders: Send order",
      states_content.caseManagementState,
      subjectName,
    );
    await sendOrder.sendOrder(
      page,
      caseNumber69,
      "DraftOrder",
      false,
      false,
      true,
      true,
      "7",
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.processDirectionsReturned,
      caseNumber69,
      states_content.caseManagementState,
      subjectName,
    );
  });

  test("Task is completable via next steps link - assign to me", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber70 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber70, subjectName);
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Refer case to legal officer",
    );
    await referCaseToLegalOfficer.referCaseToLegalOfficer(
      page,
      false,
      "New case",
      false,
      caseNumber70,
      subjectName,
    );
    await task.seeTask(
      page,
      waUsers_content.userRoleLO,
      false,
      taskNames_content.reviewNewCaseLO,
      subjectName,
    );
    await task.initiateTask(
      page,
      waUsers_content.userRoleLO,
      "Link: Assign Task to Me",
      false,
      caseNumber70,
      taskNames_content.reviewNewCaseLO,
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
      caseNumber70,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.reviewNewCaseLO,
      caseNumber70,
      states_content.caseManagementState,
      subjectName,
    );
    await task.seeTask(
      page,
      waUsers_content.userRoleAdmin,
      false,
      taskNames_content.processDirectionsReturned,
      subjectName,
    );
    await task.initiateTask(
      page,
      waUsers_content.userRoleAdmin,
      "Link: Assign Task to Me",
      false,
      caseNumber70,
      taskNames_content.processDirectionsReturned,
      priorityProcess,
      authors_content.assignedUserAdmin,
      numberOfDaysProcess,
      "Orders: Send order",
      states_content.caseManagementState,
      subjectName,
    );
    await sendOrder.sendOrder(
      page,
      caseNumber70,
      "UploadOrder",
      false,
      false,
      false,
      false,
      "1",
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.processDirectionsReturned,
      caseNumber70,
      states_content.caseManagementState,
      subjectName,
    );
  });

  test("Task is completed via event dropdown", async ({ page }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber71 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber71, subjectName);
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Refer case to legal officer",
    );
    await referCaseToLegalOfficer.referCaseToLegalOfficer(
      page,
      false,
      "New case",
      false,
      caseNumber71,
      subjectName,
    );
    await task.seeTask(
      page,
      waUsers_content.userRoleLO,
      false,
      taskNames_content.reviewNewCaseLO,
      subjectName,
    );
    await task.initiateTask(
      page,
      waUsers_content.userRoleLO,
      "Event DropDown",
      false,
      caseNumber71,
      taskNames_content.reviewNewCaseLO,
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
      "CIC7 - ME Dmi Reports",
      caseNumber71,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.reviewNewCaseLO,
      caseNumber71,
      states_content.caseManagementState,
      subjectName,
    );
    await task.seeTask(
      page,
      waUsers_content.userRoleAdmin,
      false,
      taskNames_content.processDirectionsReturned,
      subjectName,
    );
    await task.initiateTask(
      page,
      waUsers_content.userRoleAdmin,
      "Event DropDown",
      false,
      caseNumber71,
      taskNames_content.processDirectionsReturned,
      priorityProcess,
      authors_content.assignedUserAdmin,
      numberOfDaysProcess,
      "Orders: Send order",
      states_content.caseManagementState,
      subjectName,
    );
    await sendOrder.sendOrder(
      page,
      caseNumber71,
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
      taskNames_content.processDirectionsReturned,
      caseNumber71,
      states_content.caseManagementState,
      subjectName,
    );
  });

  test("Review task is cancellable through close case", async ({ page }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber72 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber72, subjectName);
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Refer case to legal officer",
    );
    await referCaseToLegalOfficer.referCaseToLegalOfficer(
      page,
      false,
      "New case",
      false,
      caseNumber72,
      subjectName,
    );
    await task.seeTask(
      page,
      waUsers_content.userRoleLO,
      false,
      taskNames_content.reviewNewCaseLO,
      subjectName,
    );
    await myWorkPage.clickAssignAndGoToTask(
      page,
      subjectName,
      taskNames_content.reviewNewCaseLO,
    );
    await commonHelpers.chooseEventFromDropdown(page, events_content.closeCase);
    await closeCase.closeCase(
      page,
      false,
      false,
      "caseConcession",
      true,
      null,
      null,
      caseNumber72,
      subjectName,
      false,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.reviewNewCaseLO,
      caseNumber72,
      states_content.closedState,
      subjectName,
    );
  });

  test("Process task is cancellable through close case", async ({ page }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber73 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber73, subjectName);
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Refer case to legal officer",
    );
    await referCaseToLegalOfficer.referCaseToLegalOfficer(
      page,
      false,
      "New case",
      false,
      caseNumber73,
      subjectName,
    );
    await task.seeTask(
      page,
      waUsers_content.userRoleLO,
      false,
      taskNames_content.reviewNewCaseLO,
      subjectName,
    );
    await task.initiateTask(
      page,
      waUsers_content.userRoleLO,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber73,
      taskNames_content.reviewNewCaseLO,
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
      "CIC3 - Rule 27",
      caseNumber73,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.reviewNewCaseLO,
      caseNumber73,
      states_content.caseManagementState,
      subjectName,
    );
    await task.seeTask(
      page,
      waUsers_content.userRoleAdmin,
      false,
      taskNames_content.processDirectionsReturned,
      subjectName,
    );
    await myWorkPage.clickAssignAndGoToTask(
      page,
      subjectName,
      taskNames_content.processDirectionsReturned,
    );
    await commonHelpers.chooseEventFromDropdown(page, events_content.closeCase);
    await closeCase.closeCase(
      page,
      false,
      false,
      "caseRejected",
      false,
      "createdInError",
      null,
      caseNumber73,
      subjectName,
      false,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.processDirectionsReturned,
      caseNumber73,
      states_content.closedState,
      subjectName,
    );
  });

  test("Task is completable via next steps link - assign to me and go to task / Error Messaging - Refer to LO, contact parties ", async ({
    page,
  }) => {
    test.setTimeout(7 * 60 * 1000);
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber74 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber74, subjectName);
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Refer case to legal officer",
    );
    await referCaseToLegalOfficer.referCaseToLegalOfficer(
      page,
      false,
      "New case",
      true,
      caseNumber74,
      subjectName,
    );
    await task.seeTask(
      page,
      waUsers_content.userRoleLO,
      false,
      taskNames_content.reviewNewCaseLO,
      subjectName,
    );
    await task.initiateTask(
      page,
      waUsers_content.userRoleLO,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber74,
      taskNames_content.reviewNewCaseLO,
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
      caseNumber74,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.reviewNewCaseLO,
      caseNumber74,
      states_content.caseManagementState,
      subjectName,
    );
    await task.seeTask(
      page,
      waUsers_content.userRoleAdmin,
      false,
      taskNames_content.processDirectionsReturned,
      subjectName,
    );
    await task.initiateTask(
      page,
      waUsers_content.userRoleAdmin,
      "Event DropDown",
      false,
      caseNumber74,
      taskNames_content.processDirectionsReturned,
      priorityProcess,
      authors_content.assignedUserAdmin,
      numberOfDaysProcess,
      "Orders: Send order",
      states_content.caseManagementState,
      subjectName,
    );
    await sendOrder.sendOrder(
      page,
      caseNumber74,
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
      taskNames_content.processDirectionsReturned,
      caseNumber74,
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
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber74,
      taskNames_content.nonComplianceDirections,
      priorityNonCompliance,
      authors_content.assignedUserAdmin,
      numberOfDaysNonCompliance,
      "Document management: Upload",
      states_content.caseManagementState,
      subjectName,
    );
    await documentManagementUpload.documentManagementUpload(
      page,
      false,
      false,
      true,
      caseNumber74,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.nonComplianceDirections,
      caseNumber74,
      states_content.caseManagementState,
      subjectName,
    );
  });
});

test("Task completion: Accessibility test / Review New Case and Provide Directions - Legal Officer : Accessibility test @accessibilityCaseAPI", async ({
  page,
}) => {
  test.setTimeout(7 * 60 * 1000);
  const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
  const caseNumber75 = await createCase.createCase(
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
  await buildCase.buildCase(page, false, caseNumber75, subjectName);
  await commonHelpers.chooseEventFromDropdown(
    page,
    "Refer case to legal officer",
  );
  await referCaseToLegalOfficer.referCaseToLegalOfficer(
    page,
    true,
    "New case",
    false,
    caseNumber75,
    subjectName,
  );
  await task.seeTask(
    page,
    waUsers_content.userRoleLO,
    true,
    taskNames_content.reviewNewCaseLO,
    subjectName,
  );
  await task.initiateTask(
    page,
    waUsers_content.userRoleLO,
    "Link: Assign Task to Me and Go To Task",
    true,
    caseNumber75,
    taskNames_content.reviewNewCaseLO,
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
    "CIC3 - Rule 27",
    caseNumber75,
    subjectName,
  );
  await task.checkCompletedTask(
    page,
    true,
    taskNames_content.reviewNewCaseLO,
    caseNumber75,
    states_content.caseManagementState,
    subjectName,
  );
  await task.seeTask(
    page,
    waUsers_content.userRoleAdmin,
    false,
    taskNames_content.processDirectionsReturned,
    subjectName,
  );
  await task.initiateTask(
    page,
    waUsers_content.userRoleAdmin,
    "Event DropDown",
    false,
    caseNumber75,
    taskNames_content.processDirectionsReturned,
    priorityProcess,
    authors_content.assignedUserAdmin,
    numberOfDaysProcess,
    "Orders: Send order",
    states_content.caseManagementState,
    subjectName,
  );
  await sendOrder.sendOrder(
    page,
    caseNumber75,
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
    taskNames_content.processDirectionsReturned,
    caseNumber75,
    states_content.caseManagementState,
    subjectName,
  );
  await task.seeTask(
    page,
    waUsers_content.userRoleAdmin,
    true,
    taskNames_content.nonComplianceDirections,
    subjectName,
  );
  await task.initiateTask(
    page,
    waUsers_content.userRoleAdmin,
    "Link: Assign Task to Me and Go To Task",
    true,
    caseNumber75,
    taskNames_content.nonComplianceDirections,
    priorityNonCompliance,
    authors_content.assignedUserAdmin,
    numberOfDaysNonCompliance,
    "Document management: Upload",
    states_content.caseManagementState,
    subjectName,
  );
  await documentManagementUpload.documentManagementUpload(
    page,
    true,
    true,
    false,
    caseNumber75,
    subjectName,
  );
  await task.checkCompletedTask(
    page,
    true,
    taskNames_content.nonComplianceDirections,
    caseNumber75,
    states_content.caseManagementState,
    subjectName,
  );
});
