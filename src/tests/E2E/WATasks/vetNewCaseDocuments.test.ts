import { test } from "@playwright/test";
import createCase from "../../journeys/WA/createCase.ts";
import buildCase from "../../journeys/WA/buildCase.ts";
import task from "../../journeys/WA/task.ts";
import editCase from "../../journeys/WA/editCase.ts";
import commonHelpers from "../../helpers/commonHelpers.ts";
import events_content from "../../fixtures/content/CaseAPI/events_content.ts";

const taskName = "Vet New Case Documents";
const priority = " low ";
const assignedUser = "sptribswa hearingcentreadmin";
const userRole = "waHearingCentreAdmin";
const numberOfDays = 5;
const event = "Case: Build case";
const stateBeforeCompletion = "Submitted";
const stateAfterCompletion = "Case management";
const nextTriggeredTaskToCleanUp = "Issue Case To Respondent";
const randomLetters = Array.from({ length: 5 }, () =>
  String.fromCharCode(65 + Math.floor(Math.random() * 26)),
).join("");

test.describe("Vet new case documents task tests @CaseAPI", (): void => {
  test("Task is completable via next steps link - assign to me and go to task", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${randomLetters}`;
    const caseNumber156 = await createCase.createCase(
      page,
      userRole,
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
    console.log(`Case Number : ${caseNumber156}`);
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
    await task.seeTask(page, userRole, false, taskName, subjectName);
    await task.initiateTask(
      page,
      userRole,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber156,
      taskName,
      priority,
      assignedUser,
      numberOfDays,
      event,
      stateBeforeCompletion,
      subjectName,
    );
    await buildCase.buildCase(page, false, caseNumber156, subjectName);
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber156,
      stateAfterCompletion,
      subjectName,
    );
    await task.removeTask(page, nextTriggeredTaskToCleanUp, subjectName);
  });

  test("Task is completable via next steps link - assign to me", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${randomLetters}`;
    const caseNumber157 = await createCase.createCase(
      page,
      userRole,
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
    console.log(`Case Number : ${caseNumber157}`);
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
    await task.seeTask(page, userRole, false, taskName, subjectName);
    await task.initiateTask(
      page,
      userRole,
      "Link: Assign Task to Me",
      false,
      caseNumber157,
      taskName,
      priority,
      assignedUser,
      numberOfDays,
      event,
      stateBeforeCompletion,
      subjectName,
    );
    await buildCase.buildCase(page, false, caseNumber157, subjectName);
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber157,
      stateAfterCompletion,
      subjectName,
    );
    await task.removeTask(page, nextTriggeredTaskToCleanUp, subjectName);
  });

  test("Task is completed via event dropdown", async ({ page }) => {
    const subjectName = `Subject AutoTesting${randomLetters}`;
    const caseNumber158 = await createCase.createCase(
      page,
      userRole,
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
    console.log(`Case Number : ${caseNumber158}`);
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
    await task.seeTask(page, userRole, false, taskName, subjectName);
    await task.initiateTask(
      page,
      userRole,
      "Event DropDown",
      false,
      caseNumber158,
      taskName,
      priority,
      assignedUser,
      numberOfDays,
      event,
      stateBeforeCompletion,
      subjectName,
    );
    await buildCase.buildCase(page, false, caseNumber158, subjectName);
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber158,
      stateAfterCompletion,
      subjectName,
    );
    await task.removeTask(page, nextTriggeredTaskToCleanUp, subjectName);
  });
});

test("Task completion: Accessibility test / Build Case : Accessibility test @accessibilityCaseAPI", async ({
  page,
}) => {
  const subjectName = `Subject AutoTesting${randomLetters}`;
  const caseNumber159 = await createCase.createCase(
    page,
    userRole,
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
  console.log(`Case Number : ${caseNumber159}`);
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
  await task.seeTask(page, userRole, true, taskName, subjectName);
  await task.initiateTask(
    page,
    userRole,
    "Link: Assign Task to Me and Go To Task",
    true,
    caseNumber159,
    taskName,
    priority,
    assignedUser,
    numberOfDays,
    event,
    stateBeforeCompletion,
    subjectName,
  );
  await buildCase.buildCase(page, true, caseNumber159, subjectName);
  await task.checkCompletedTask(
    page,
    true,
    taskName,
    caseNumber159,
    stateAfterCompletion,
    subjectName,
  );
  await task.removeTask(page, nextTriggeredTaskToCleanUp, subjectName);
});
