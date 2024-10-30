import { test } from "@playwright/test";
import waUsers_content from "../fixtures/content/waUsers_content.ts";
import authors_content from "../fixtures/content/authors_content.ts";
import states_content from "../fixtures/content/states_content.ts";
import taskNames_content from "../fixtures/content/taskNames_content.ts";
import createCase from "../journeys/CaseAPI/createCase.ts";
import buildCase from "../journeys/CaseAPI/buildCase.ts";
import task from "../journeys/CaseAPI/task.ts";
import issueToRespondent from "../journeys/CaseAPI/issueToRespondent.ts";
import commonHelpers from "../helpers/commonHelpers.ts";
import events_content from "../fixtures/content/CaseAPI/events_content.ts";
import closeCase from "../journeys/CaseAPI/closeCase.ts";
import myWorkPage from "../pages/WA/myWorkPage.ts";
import referCaseToJudge from "../journeys/CaseAPI/referCaseToJudge.ts";
import referCaseToLegalOfficer from "../journeys/CaseAPI/referCaseToLegalOfficer.ts";
import testDataCleanUp from "../helpers/testDataCleanUp.ts";

const priority = " low ";
const numberOfDays = 2;

test.describe("Issue case to respondent task tests @CaseAPI", (): void => {
  test("Check for redundant test data", async ({ page }) => {
    test.setTimeout(20 * 60 * 1000);
    await testDataCleanUp(page, waUsers_content.userRoleAdmin);
  });
  test("Task is completable via next steps link - assign to me and go to task - Issue a case to all parties", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber24 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber24, subjectName);
    await task.seeTask(
      page,
      waUsers_content.userRoleAdmin,
      false,
      taskNames_content.issueCaseToRespondentTask,
      subjectName,
    );
    await task.initiateTask(
      page,
      waUsers_content.userRoleAdmin,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber24,
      taskNames_content.issueCaseToRespondentTask,
      priority,
      authors_content.assignedUserAdmin,
      numberOfDays,
      "Case: Issue to respondent",
      states_content.caseManagementState,
      subjectName,
    );
    await issueToRespondent.issueToRespondent(
      page,
      waUsers_content.userRoleAdmin,
      false,
      false,
      ["Subject", "Representative", "Respondent", "Applicant"],
      caseNumber24,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.issueCaseToRespondentTask,
      caseNumber24,
      states_content.caseManagementState,
      subjectName,
    );
  });

  test("Task is completable via next steps link - assign to me - Issue case to a subject", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber25 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber25, subjectName);
    await task.seeTask(
      page,
      waUsers_content.userRoleAdmin,
      false,
      taskNames_content.issueCaseToRespondentTask,
      subjectName,
    );
    await task.initiateTask(
      page,
      waUsers_content.userRoleAdmin,
      "Link: Assign Task to Me",
      false,
      caseNumber25,
      taskNames_content.issueCaseToRespondentTask,
      priority,
      authors_content.assignedUserAdmin,
      numberOfDays,
      "Case: Issue to respondent",
      states_content.caseManagementState,
      subjectName,
    );
    await issueToRespondent.issueToRespondent(
      page,
      waUsers_content.userRoleAdmin,
      false,
      false,
      ["Subject"],
      caseNumber25,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.issueCaseToRespondentTask,
      caseNumber25,
      states_content.caseManagementState,
      subjectName,
    );
  });

  test("Task is completed via event dropdown - Issue a case to a representative @crossbrowserCaseAPI", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber26 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber26, subjectName);
    await task.seeTask(
      page,
      waUsers_content.userRoleAdmin,
      false,
      taskNames_content.issueCaseToRespondentTask,
      subjectName,
    );
    await task.initiateTask(
      page,
      waUsers_content.userRoleAdmin,
      "Event DropDown",
      false,
      caseNumber26,
      taskNames_content.issueCaseToRespondentTask,
      priority,
      authors_content.assignedUserAdmin,
      numberOfDays,
      "Case: Issue to respondent",
      states_content.caseManagementState,
      subjectName,
    );
    await issueToRespondent.issueToRespondent(
      page,
      waUsers_content.userRoleAdmin,
      false,
      false,
      ["Representative"],
      caseNumber26,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.issueCaseToRespondentTask,
      caseNumber26,
      states_content.caseManagementState,
      subjectName,
    );
  });

  test("Task is completable via next steps link - Issue a case to a respondent", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber27 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber27, subjectName);
    await task.seeTask(
      page,
      waUsers_content.userRoleAdmin,
      false,
      taskNames_content.issueCaseToRespondentTask,
      subjectName,
    );
    await task.initiateTask(
      page,
      waUsers_content.userRoleAdmin,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber27,
      taskNames_content.issueCaseToRespondentTask,
      priority,
      authors_content.assignedUserAdmin,
      numberOfDays,
      "Case: Issue to respondent",
      states_content.caseManagementState,
      subjectName,
    );
    await issueToRespondent.issueToRespondent(
      page,
      waUsers_content.userRoleAdmin,
      false,
      false,
      ["Respondent"],
      caseNumber27,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.issueCaseToRespondentTask,
      caseNumber27,
      states_content.caseManagementState,
      subjectName,
    );
  });

  test("Task is completable via next steps link - Issue a case to an applicant", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber28 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber28, subjectName);
    await task.seeTask(
      page,
      waUsers_content.userRoleAdmin,
      false,
      taskNames_content.issueCaseToRespondentTask,
      subjectName,
    );
    await task.initiateTask(
      page,
      waUsers_content.userRoleAdmin,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber28,
      taskNames_content.issueCaseToRespondentTask,
      priority,
      authors_content.assignedUserAdmin,
      numberOfDays,
      "Case: Issue to respondent",
      states_content.caseManagementState,
      subjectName,
    );
    await issueToRespondent.issueToRespondent(
      page,
      waUsers_content.userRoleAdmin,
      false,
      false,
      ["Applicant"],
      caseNumber28,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.issueCaseToRespondentTask,
      caseNumber28,
      states_content.caseManagementState,
      subjectName,
    );
  });

  test("Task is cancellable through close case", async ({ page }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber29 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber29, subjectName);
    await task.seeTask(
      page,
      waUsers_content.userRoleAdmin,
      false,
      taskNames_content.issueCaseToRespondentTask,
      subjectName,
    );
    await myWorkPage.clickAssignAndGoToTask(page, subjectName);
    await commonHelpers.chooseEventFromDropdown(page, events_content.closeCase);
    await closeCase.closeCase(
      page,
      false,
      false,
      "caseWithdrawn",
      true,
      null,
      null,
      caseNumber29,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.issueCaseToRespondentTask,
      caseNumber29,
      states_content.closedState,
      subjectName,
    );
  });

  test("Task is cancellable through refer to judge", async ({ page }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber30 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber30, subjectName);
    await task.seeTask(
      page,
      waUsers_content.userRoleAdmin,
      false,
      taskNames_content.issueCaseToRespondentTask,
      subjectName,
    );
    await myWorkPage.clickAssignAndGoToTask(page, subjectName);
    await commonHelpers.chooseEventFromDropdown(page, "Refer case to judge");
    await referCaseToJudge.referCaseToJudge(
      page,
      false,
      "Listing directions",
      false,
      caseNumber30,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.issueCaseToRespondentTask,
      caseNumber30,
      states_content.caseManagementState,
      subjectName,
    );
  });

  test("Task is cancellable through refer to legal officer", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber31 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber31, subjectName);
    await task.seeTask(
      page,
      waUsers_content.userRoleAdmin,
      false,
      taskNames_content.issueCaseToRespondentTask,
      subjectName,
    );
    await myWorkPage.clickAssignAndGoToTask(page, subjectName);
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Refer case to legal officer",
    );
    await referCaseToLegalOfficer.referCaseToLegalOfficer(
      page,
      false,
      "Listing directions",
      false,
      caseNumber31,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.issueCaseToRespondentTask,
      caseNumber31,
      states_content.caseManagementState,
      subjectName,
    );
  });

  test("Issue to respondent : Error messaging @crossbrowserCaseAPI", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber31 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber31, subjectName);
    await task.seeTask(
      page,
      waUsers_content.userRoleAdmin,
      false,
      taskNames_content.issueCaseToRespondentTask,
      subjectName,
    );
    await task.initiateTask(
      page,
      waUsers_content.userRoleAdmin,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber31,
      taskNames_content.issueCaseToRespondentTask,
      priority,
      authors_content.assignedUserAdmin,
      numberOfDays,
      "Case: Issue to respondent",
      states_content.caseManagementState,
      subjectName,
    );
    await issueToRespondent.issueToRespondent(
      page,
      waUsers_content.userRoleAdmin,
      false,
      true,
      ["Subject"],
      caseNumber31,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.issueCaseToRespondentTask,
      caseNumber31,
      states_content.caseManagementState,
      subjectName,
    );
  });
});

test("Task completion: Accessibility test / Issue Case to Respondent : Accessibility test @accessibilityCaseAPI", async ({
  page,
}) => {
  const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
  const caseNumber33 = await createCase.createCase(
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
  await buildCase.buildCase(page, false, caseNumber33, subjectName);
  await task.seeTask(
    page,
    waUsers_content.userRoleAdmin,
    true,
    taskNames_content.issueCaseToRespondentTask,
    subjectName,
  );
  await task.initiateTask(
    page,
    waUsers_content.userRoleAdmin,
    "Link: Assign Task to Me and Go To Task",
    true,
    caseNumber33,
    taskNames_content.issueCaseToRespondentTask,
    priority,
    authors_content.assignedUserAdmin,
    numberOfDays,
    "Case: Issue to respondent",
    states_content.caseManagementState,
    subjectName,
  );
  await issueToRespondent.issueToRespondent(
    page,
    waUsers_content.userRoleAdmin,
    true,
    false,
    ["Subject", "Representative", "Respondent", "Applicant"],
    caseNumber33,
    subjectName,
  );
  await task.checkCompletedTask(
    page,
    true,
    taskNames_content.issueCaseToRespondentTask,
    caseNumber33,
    states_content.caseManagementState,
    subjectName,
  );
});
