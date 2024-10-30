import { test } from "@playwright/test";
import waUsers_content from "../fixtures/content/waUsers_content.ts";
import authors_content from "../fixtures/content/authors_content.ts";
import states_content from "../fixtures/content/states_content.ts";
import taskNames_content from "../fixtures/content/taskNames_content.ts";
import createCase from "../journeys/CaseAPI/createCase.ts";
import buildCase from "../journeys/CaseAPI/buildCase.ts";
import task from "../journeys/CaseAPI/task.ts";
import editCase from "../journeys/CaseAPI/editCase.ts";
import commonHelpers from "../helpers/commonHelpers.ts";
import events_content from "../fixtures/content/CaseAPI/events_content.ts";

const priority = " low ";
const numberOfDays = 5;

test.describe("Vet new case documents task tests @CaseAPI", (): void => {
  test("Task is completable via next steps link - assign to me and go to task", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber156 = await createCase.createCase(
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
    await commonHelpers.chooseEventFromDropdown(page, events_content.editCase);
    await editCase.editCase(
      page,
      false,
      "Submitted",
      "Eligibility",
      "Fatal",
      true,
      true,
      "Email",
      true,
      "1996",
      "Scotland",
      true,
      false,
      true,
      false,
      false,
      caseNumber156,
      subjectName,
    );
    await task.seeTask(
      page,
      waUsers_content.userRoleAdmin,
      false,
      taskNames_content.vetNewCaseDocuments,
      subjectName,
    );
    await task.initiateTask(
      page,
      waUsers_content.userRoleAdmin,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber156,
      taskNames_content.vetNewCaseDocuments,
      priority,
      authors_content.assignedUserAdmin,
      numberOfDays,
      "Case: Build case",
      states_content.submittedState,
      subjectName,
    );
    await buildCase.buildCase(page, false, caseNumber156, subjectName);
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.vetNewCaseDocuments,
      caseNumber156,
      states_content.caseManagementState,
      subjectName,
    );
    await task.removeTask(
      page,
      taskNames_content.issueCaseToRespondentTask,
      subjectName,
    );
  });

  test("Task is completable via next steps link - assign to me", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber157 = await createCase.createCase(
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
    await commonHelpers.chooseEventFromDropdown(page, events_content.editCase);
    await editCase.editCase(
      page,
      false,
      "Submitted",
      "Assessment",
      "Fatal",
      true,
      true,
      "Email",
      true,
      "1996",
      "Scotland",
      true,
      false,
      true,
      false,
      false,
      caseNumber157,
      subjectName,
    );
    await task.seeTask(
      page,
      waUsers_content.userRoleAdmin,
      false,
      taskNames_content.vetNewCaseDocuments,
      subjectName,
    );
    await task.initiateTask(
      page,
      waUsers_content.userRoleAdmin,
      "Link: Assign Task to Me",
      false,
      caseNumber157,
      taskNames_content.vetNewCaseDocuments,
      priority,
      authors_content.assignedUserAdmin,
      numberOfDays,
      "Case: Build case",
      states_content.submittedState,
      subjectName,
    );
    await buildCase.buildCase(page, false, caseNumber157, subjectName);
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.vetNewCaseDocuments,
      caseNumber157,
      states_content.caseManagementState,
      subjectName,
    );
    await task.removeTask(
      page,
      taskNames_content.issueCaseToRespondentTask,
      subjectName,
    );
  });

  test("Task is completed via event dropdown", async ({ page }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber158 = await createCase.createCase(
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
    await commonHelpers.chooseEventFromDropdown(page, events_content.editCase);
    await editCase.editCase(
      page,
      false,
      "Submitted",
      "Assessment",
      "Fatal",
      true,
      true,
      "Email",
      true,
      "1996",
      "Scotland",
      true,
      false,
      true,
      false,
      false,
      caseNumber158,
      subjectName,
    );
    await task.seeTask(
      page,
      waUsers_content.userRoleAdmin,
      false,
      taskNames_content.vetNewCaseDocuments,
      subjectName,
    );
    await task.initiateTask(
      page,
      waUsers_content.userRoleAdmin,
      "Event DropDown",
      false,
      caseNumber158,
      taskNames_content.vetNewCaseDocuments,
      priority,
      authors_content.assignedUserAdmin,
      numberOfDays,
      "Case: Build case",
      states_content.submittedState,
      subjectName,
    );
    await buildCase.buildCase(page, false, caseNumber158, subjectName);
    await task.checkCompletedTask(
      page,
      false,
      taskNames_content.vetNewCaseDocuments,
      caseNumber158,
      states_content.caseManagementState,
      subjectName,
    );
    await task.removeTask(
      page,
      taskNames_content.issueCaseToRespondentTask,
      subjectName,
    );
  });
});

test("Task completion: Accessibility test / Build Case : Accessibility test @accessibilityCaseAPI @crossbrowserCaseAPI", async ({
  page,
}) => {
  const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
  const caseNumber159 = await createCase.createCase(
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
  await commonHelpers.chooseEventFromDropdown(page, events_content.editCase);
  await editCase.editCase(
    page,
    false,
    "Submitted",
    "Assessment",
    "Fatal",
    true,
    true,
    "Email",
    true,
    "1996",
    "Scotland",
    true,
    false,
    true,
    false,
    false,
    caseNumber159,
    subjectName,
  );
  await task.seeTask(
    page,
    waUsers_content.userRoleAdmin,
    true,
    taskNames_content.vetNewCaseDocuments,
    subjectName,
  );
  await task.initiateTask(
    page,
    waUsers_content.userRoleAdmin,
    "Link: Assign Task to Me and Go To Task",
    true,
    caseNumber159,
    taskNames_content.vetNewCaseDocuments,
    priority,
    authors_content.assignedUserAdmin,
    numberOfDays,
    "Case: Build case",
    states_content.submittedState,
    subjectName,
  );
  await buildCase.buildCase(page, true, caseNumber159, subjectName);
  await task.checkCompletedTask(
    page,
    true,
    taskNames_content.vetNewCaseDocuments,
    caseNumber159,
    states_content.caseManagementState,
    subjectName,
  );
  await task.removeTask(
    page,
    taskNames_content.issueCaseToRespondentTask,
    subjectName,
  );
});
