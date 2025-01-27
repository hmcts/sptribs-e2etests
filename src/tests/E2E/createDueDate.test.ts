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
import createDraft from "../journeys/CaseAPI/createDraft.ts";

const priority = " low ";
const numberOfDays = 2;

test.describe("Create due date task tests @CaseAPI", (): void => {
  test("Task is completable via next steps link - assign to me and go to task - Create a due date @CaseAPI1", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber024 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber024, subjectName);
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
      caseNumber024,
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
      caseNumber024,
      subjectName,
    );
    await task.seeTask(
      page,
      waUsers_content.userRoleAdmin,
      false,
      taskNames_content.createDueDate,
      subjectName,
    );
    await task.initiateTask(
      page,
      waUsers_content.userRoleAdmin,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber024,
      taskNames_content.createDueDate,
      priority,
      authors_content.assignedUserAdmin,
      numberOfDays,
      "Orders: Create draft",
      states_content.caseManagementState,
      subjectName,
    );
    await createDraft.createDraft(
      page,
      false,
      false,
      "CIC6 - General Directions",
      caseNumber024,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.createDueDate,
      caseNumber024,
      states_content.caseManagementState,
      subjectName,
    );
  });

  test("Task is cancellable through close case", async ({ page }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber029 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber029, subjectName);
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
      caseNumber029,
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
      caseNumber029,
      subjectName,
    );
    await task.seeTask(
      page,
      waUsers_content.userRoleAdmin,
      false,
      taskNames_content.createDueDate,
      subjectName,
    );
    await myWorkPage.clickAssignAndGoToTask(
      page,
      subjectName,
      taskNames_content.createDueDate,
    );
    await commonHelpers.chooseEventFromDropdown(page, events_content.closeCase);
    await closeCase.closeCase(
      page,
      false,
      false,
      "caseWithdrawn",
      true,
      null,
      null,
      caseNumber029,
      subjectName,
      false,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.createDueDate,
      caseNumber029,
      states_content.closedState,
      subjectName,
    );
  });
});
