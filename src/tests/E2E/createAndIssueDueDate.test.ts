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
import createAndSendOrder from "../journeys/CaseAPI/createAndSendOrder.ts";
import sendOrder from "../journeys/CaseAPI/sendOrder.ts";

const priority = " low ";
const numberOfDays = 2;

test.describe("Create and issue due date task tests @CaseAPI", (): void => {
  test("Task is completable via next steps link - assign to me and go to task - Create and issue a due date @CaseAPI1", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2800 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber2800, subjectName);
    await task.initiateTask(
      page,
      waUsers_content.userRoleAdmin,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber2800,
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
      caseNumber2800,
      subjectName,
    );
    await commonHelpers.chooseEventFromDropdown(page, events_content.createDraft);
    await createDraft.createDraft(
      page,
      false,
      false,
      "CIC6 - General Directions",
      caseNumber2800,
      subjectName,
    );
    await commonHelpers.chooseEventFromDropdown(page, events_content.sendOrder);
    await sendOrder.sendOrder(
      page,
      caseNumber2800,
      "DraftOrder",
      false,
      false,
      true,
      false,
      "7",
      subjectName,
    );
  });

  test("Create due date task is cancellable through close case", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2801 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber2801, subjectName);
    await task.initiateTask(
      page,
      waUsers_content.userRoleAdmin,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber2801,
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
      caseNumber2801,
      subjectName,
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
      caseNumber2801,
      subjectName,
      false,
    );
  });

  test("Issue due date task is cancellable through close case", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2802 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber2802, subjectName);
    await task.initiateTask(
      page,
      waUsers_content.userRoleAdmin,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber2802,
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
      caseNumber2802,
      subjectName,
    );
    await commonHelpers.chooseEventFromDropdown(page, events_content.createDraft);
    await createDraft.createDraft(
      page,
      false,
      false,
      "CIC6 - General Directions",
      caseNumber2802,
      subjectName,
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
      caseNumber2802,
      subjectName,
      false,
    );
  });
});
