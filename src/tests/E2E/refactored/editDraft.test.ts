import { test } from "@playwright/test";
import commonHelpers from "../../helpers/commonHelpers.ts";
import createCase from "../../journeys/WA/createCase.ts";
import events_content from "../../fixtures/content/CaseAPI/events_content.ts";
import buildCase from "../../journeys/WA/buildCase.ts";
import task from "../../journeys/WA/task.ts";
import hearingOptions from "../../journeys/WA/hearingOptions.ts";
import referCaseToLegalOfficer from "../../journeys/WA/referCaseToLegalOfficer.ts";
import createDraft from "../../journeys/WA/createDraft.ts";
import editDraft from "../../journeys/WA/editDraft.ts";
import createEditStay from "../../journeys/WA/createEditStay.ts";
import createListing from "../../journeys/WA/createListing.ts";
import closeCase from "../../journeys/WA/closeCase.ts";
import config from "../../config.ts";

const taskRemovedIssueCase = " Issue Case To Respondent ";
const taskName = "Review other request - Legal Officer";
const priorityReview = " low ";
const assignedUserLO = "sptribswa seniorcaseworker";
const userRoleAdmin = "waHearingCentreAdmin";
const userRoleLO = "waSeniorCaseworker";
const numberOfDaysReview = 5;
const eventOrders = "Orders: Create draft";
const caseManagementState = "Case management";
const stateCaseStayed = "Case Status:  Case stayed";
const taskNameProcess = "Process other directions returned";

test.describe("Case-API Edit draft tests. @CaseAPI", () => {
  test("Edit a CIC3 draft in the Case Management state. @crossbrowserCaseAPI", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber1500 = await createCase.createCase(
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
    console.log(`Case Number : ${caseNumber1500}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber1500, subjectName);
    await task.removeTask(page, taskRemovedIssueCase, subjectName);
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
    await task.seeTask(page, userRoleLO, false, taskName, subjectName);
    await task.initiateTask(
      page,
      userRoleLO,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber1500,
      taskName,
      priorityReview,
      assignedUserLO,
      numberOfDaysReview,
      eventOrders,
      caseManagementState,
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
      userRoleAdmin,
      config.CaseAPIBaseURL,
      caseNumber1500,
    );
    await task.removeTask(page, taskNameProcess, subjectName);
  });

  test("Edit a CIC6 draft in the Ready to list state.", async ({ page }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber1501 = await createCase.createCase(
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
    console.log(`Case Number : ${caseNumber1501}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber1501, subjectName);
    await task.removeTask(page, taskRemovedIssueCase, subjectName);
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
    await task.seeTask(page, userRoleLO, false, taskName, subjectName);
    await task.initiateTask(
      page,
      userRoleLO,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber1501,
      taskName,
      priorityReview,
      assignedUserLO,
      numberOfDaysReview,
      eventOrders,
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
      userRoleAdmin,
      config.CaseAPIBaseURL,
      caseNumber1501,
    );
    await task.removeTask(page, taskNameProcess, subjectName);
  });

  test("Edit a CIC7 draft in the Awaiting Hearing state.", async ({ page }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber1502 = await createCase.createCase(
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
    console.log(`Case Number : ${caseNumber1502}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber1502, subjectName);
    await task.removeTask(page, taskRemovedIssueCase, subjectName);
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
    await task.seeTask(page, userRoleLO, false, taskName, subjectName);
    await task.initiateTask(
      page,
      userRoleLO,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber1502,
      taskName,
      priorityReview,
      assignedUserLO,
      numberOfDaysReview,
      eventOrders,
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
      userRoleAdmin,
      config.CaseAPIBaseURL,
      caseNumber1502,
    );
    await task.removeTask(page, taskNameProcess, subjectName);
  });

  test("Edit a CIC8 draft in the Case Stayed state.", async ({ page }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber1503 = await createCase.createCase(
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
    console.log(`Case Number : ${caseNumber1503}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber1503, subjectName);
    await task.removeTask(page, taskRemovedIssueCase, subjectName);
    await createEditStay.createEditStay(
      page,
      true,
      false,
      "awaitingACourtJudgement",
      false,
      caseNumber1503,
      subjectName,
      stateCaseStayed,
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
    await task.seeTask(page, userRoleLO, false, taskName, subjectName);
    await task.initiateTask(
      page,
      userRoleLO,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber1503,
      taskName,
      priorityReview,
      assignedUserLO,
      numberOfDaysReview,
      eventOrders,
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
      userRoleAdmin,
      config.CaseAPIBaseURL,
      caseNumber1503,
    );
    await task.removeTask(page, taskNameProcess, subjectName);
  });

  test("Edit a CIC10 draft in the Case closed state.", async ({ page }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber1504 = await createCase.createCase(
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
    console.log(`Case Number : ${caseNumber1504}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber1504, subjectName);
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
    await task.seeTask(page, userRoleLO, false, taskName, subjectName);
    await task.initiateTask(
      page,
      userRoleLO,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber1504,
      taskName,
      priorityReview,
      assignedUserLO,
      numberOfDaysReview,
      eventOrders,
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
      userRoleAdmin,
      config.CaseAPIBaseURL,
      caseNumber1504,
    );
    await task.removeTask(page, taskNameProcess, subjectName);
  });

  test("Edit a CIC13 draft.", async ({ page }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber1505 = await createCase.createCase(
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
    console.log(`Case Number : ${caseNumber1505}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber1505, subjectName);
    await task.removeTask(page, taskRemovedIssueCase, subjectName);
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
    await task.seeTask(page, userRoleLO, false, taskName, subjectName);
    await task.initiateTask(
      page,
      userRoleLO,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber1505,
      taskName,
      priorityReview,
      assignedUserLO,
      numberOfDaysReview,
      eventOrders,
      caseManagementState,
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
      userRoleAdmin,
      config.CaseAPIBaseURL,
      caseNumber1505,
    );
    await task.removeTask(page, taskNameProcess, subjectName);
  });

  test("Error messaging - Edit draft @crossbrowserCaseAPI", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber1506 = await createCase.createCase(
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
    console.log(`Case Number : ${caseNumber1506}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber1506, subjectName);
    await task.removeTask(page, taskRemovedIssueCase, subjectName);
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
    await task.seeTask(page, userRoleLO, false, taskName, subjectName);
    await task.initiateTask(
      page,
      userRoleLO,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber1506,
      taskName,
      priorityReview,
      assignedUserLO,
      numberOfDaysReview,
      eventOrders,
      caseManagementState,
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
      userRoleAdmin,
      config.CaseAPIBaseURL,
      caseNumber1506,
    );
    await task.removeTask(page, taskNameProcess, subjectName);
  });
});

test("Accessibility test - Edit draft - CIC14 @accessibilityCaseAPI", async ({
  page,
}): Promise<void> => {
  const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
  const caseNumber1507 = await createCase.createCase(
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
  console.log(`Case Number : ${caseNumber1507}`);
  await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
  await buildCase.buildCase(page, false, caseNumber1507, subjectName);
  await task.removeTask(page, taskRemovedIssueCase, subjectName);
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
  await task.seeTask(page, userRoleLO, false, taskName, subjectName);
  await task.initiateTask(
    page,
    userRoleLO,
    "Link: Assign Task to Me and Go To Task",
    false,
    caseNumber1507,
    taskName,
    priorityReview,
    assignedUserLO,
    numberOfDaysReview,
    eventOrders,
    caseManagementState,
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
    userRoleAdmin,
    config.CaseAPIBaseURL,
    caseNumber1507,
  );
  await task.removeTask(page, taskNameProcess, subjectName);
});
