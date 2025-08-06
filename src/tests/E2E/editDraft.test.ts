import { test } from "@playwright/test";
import waUsers_content from "../fixtures/content/waUsers_content.ts";
import authors_content from "../fixtures/content/authors_content.ts";
import states_content from "../fixtures/content/states_content.ts";
import taskNames_content from "../fixtures/content/taskNames_content.ts";
import commonHelpers from "../helpers/commonHelpers.ts";
import createCase from "../journeys/CaseAPI/createCase.ts";
import events_content from "../fixtures/content/CaseAPI/events_content.ts";
import buildCase from "../journeys/CaseAPI/buildCase.ts";
import task from "../journeys/CaseAPI/task.ts";
import hearingOptions from "../journeys/CaseAPI/hearingOptions.ts";
import referCaseToLegalOfficer from "../journeys/CaseAPI/referCaseToLegalOfficer.ts";
import createDraft from "../journeys/CaseAPI/createDraft.ts";
import editDraft from "../journeys/CaseAPI/editDraft.ts";
import createEditStay from "../journeys/CaseAPI/createEditStay.ts";
import createListing from "../journeys/CaseAPI/createListing.ts";
import closeCase from "../journeys/CaseAPI/closeCase.ts";
import config from "../config.ts";
import testDataCleanUp from "../helpers/testDataCleanUp.ts";

const priorityReview = " low ";
const numberOfDaysReview = 5;

test.describe("Case-API Edit draft tests. @CaseAPI", () => {
  test("Check for redundant test data", async ({ page }) => {
    test.setTimeout(10 * 60 * 1000);
    await testDataCleanUp(page, waUsers_content.userRoleAdmin);
  });
  test("Edit a CIC3 draft in the Case Management state.", async ({ page }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber1500 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber1500, subjectName);
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
      "Other",
      false,
      caseNumber1500,
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
      caseNumber1500,
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
      "CIC3 - Rule 27",
      caseNumber1500,
      subjectName,
    );
    await editDraft.editDraft(
      page,
      false,
      false,
      "CIC3 - Rule 27",
      caseNumber1500,
      subjectName,
    );
    await commonHelpers.signOutAndGoToCase(
      page,
      waUsers_content.userRoleAdmin,
      config.CaseAPIBaseURL,
      caseNumber1500,
    );
  });

  test("Edit a CIC6 draft in the Ready to list state.", async ({ page }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber1501 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber1501, subjectName);
    await task.removeTask(
      page,
      taskNames_content.issueCaseToRespondentTask,
      subjectName,
      waUsers_content.userRoleAdmin,
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
      caseNumber1501,
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
      caseNumber1501,
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
      caseNumber1501,
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
      "CIC6 - General Directions",
      caseNumber1501,
      subjectName,
    );
    await editDraft.editDraft(
      page,
      false,
      false,
      "CIC6 - General Directions",
      caseNumber1501,
      subjectName,
    );
    await commonHelpers.signOutAndGoToCase(
      page,
      waUsers_content.userRoleAdmin,
      config.CaseAPIBaseURL,
      caseNumber1501,
    );
  });

  test("Edit a CIC7 draft in the Awaiting Hearing state. @CaseAPI1", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber1502 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber1502, subjectName);
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
      caseNumber1502,
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
      "Other",
      false,
      caseNumber1502,
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
      caseNumber1502,
      taskNames_content.reviewOtherRequestLO,
      priorityReview,
      authors_content.assignedUserLO,
      numberOfDaysReview,
      "Orders: Create draft",
      "Awaiting hearing",
      subjectName,
    );
    await createDraft.createDraft(
      page,
      false,
      false,
      "CIC7 - ME Dmi Reports",
      caseNumber1502,
      subjectName,
    );
    await editDraft.editDraft(
      page,
      false,
      false,
      "CIC7 - ME Dmi Reports",
      caseNumber1502,
      subjectName,
    );
    await commonHelpers.signOutAndGoToCase(
      page,
      waUsers_content.userRoleAdmin,
      config.CaseAPIBaseURL,
      caseNumber1502,
    );
  });

  test("Edit a CIC8 draft in the Case Stayed state.", async ({ page }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber1503 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber1503, subjectName);
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
      caseNumber1503,
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
      caseNumber1503,
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
      caseNumber1503,
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
      caseNumber1503,
      subjectName,
    );
    await editDraft.editDraft(
      page,
      false,
      false,
      "CIC8 - ME Joint Instruction",
      caseNumber1503,
      subjectName,
    );
    await commonHelpers.signOutAndGoToCase(
      page,
      waUsers_content.userRoleAdmin,
      config.CaseAPIBaseURL,
      caseNumber1503,
    );
  });

  test("Edit a CIC10 draft in the Case closed state.", async ({ page }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber1504 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber1504, subjectName);
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
      "caseWithdrawn",
      false,
      null,
      null,
      caseNumber1504,
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
      "Other",
      false,
      caseNumber1504,
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
      caseNumber1504,
      taskNames_content.reviewOtherRequestLO,
      priorityReview,
      authors_content.assignedUserLO,
      numberOfDaysReview,
      "Orders: Create draft",
      "Case closed",
      subjectName,
    );
    await createDraft.createDraft(
      page,
      false,
      false,
      "CIC10 - Strike Out Warning",
      caseNumber1504,
      subjectName,
    );
    await editDraft.editDraft(
      page,
      false,
      false,
      "CIC10 - Strike Out Warning",
      caseNumber1504,
      subjectName,
    );
    await commonHelpers.signOutAndGoToCase(
      page,
      waUsers_content.userRoleAdmin,
      config.CaseAPIBaseURL,
      caseNumber1504,
    );
  });

  test("Edit a CIC13 draft. @CaseAPI1", async ({ page }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber1505 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber1505, subjectName);
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
      "Other",
      false,
      caseNumber1505,
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
      caseNumber1505,
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
      "CIC13 - Pro Forma Summons",
      caseNumber1505,
      subjectName,
    );
    await editDraft.editDraft(
      page,
      false,
      false,
      "CIC13 - Pro Forma Summons",
      caseNumber1505,
      subjectName,
    );
    await commonHelpers.signOutAndGoToCase(
      page,
      waUsers_content.userRoleAdmin,
      config.CaseAPIBaseURL,
      caseNumber1505,
    );
  });

  test("Error messaging - Edit draft @ErrorMessaging", async ({ page }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber1506 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber1506, subjectName);
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
      "Other",
      false,
      caseNumber1506,
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
      caseNumber1506,
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
      "CIC14 – LO General Directions",
      caseNumber1506,
      subjectName,
    );
    await editDraft.editDraft(
      page,
      false,
      true,
      "CIC14 – LO General Directions",
      caseNumber1506,
      subjectName,
    );
    await commonHelpers.signOutAndGoToCase(
      page,
      waUsers_content.userRoleAdmin,
      config.CaseAPIBaseURL,
      caseNumber1506,
    );
  });
});

test("Accessibility test - Edit draft - CIC14 @accessibility", async ({
  page,
}): Promise<void> => {
  const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
  const caseNumber1507 = await createCase.createCase(
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
  await buildCase.buildCase(page, false, caseNumber1507, subjectName);
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
    "Other",
    false,
    caseNumber1507,
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
    caseNumber1507,
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
    "CIC14 – LO General Directions",
    caseNumber1507,
    subjectName,
  );
  await editDraft.editDraft(
    page,
    true,
    false,
    "CIC14 – LO General Directions",
    caseNumber1507,
    subjectName,
  );
  await commonHelpers.signOutAndGoToCase(
    page,
    waUsers_content.userRoleAdmin,
    config.CaseAPIBaseURL,
    caseNumber1507,
  );
});
