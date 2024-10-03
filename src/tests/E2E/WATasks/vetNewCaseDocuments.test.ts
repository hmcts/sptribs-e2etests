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

test.describe("Vet new case documents task tests @CaseAPI", (): void => {
  test("Task is completable via next steps link - assign to me and go to task", async ({
    page,
  }) => {
    let caseNumber01: any;
    caseNumber01 = await createCase.createCase(
      page,
      userRole,
      false,
      "Assessment",
      "Other",
      true,
      true,
      "Email",
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
    console.log(`Case Number : ${caseNumber01}`);
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
      caseNumber01,
    );
    await task.seeTask(page, userRole, false, taskName);
    await task.initiateTask(
      page,
      userRole,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber01,
      taskName,
      priority,
      assignedUser,
      numberOfDays,
      event,
      stateBeforeCompletion,
    );
    await buildCase.buildCase(page, false, caseNumber01);
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber01,
      stateAfterCompletion,
    );
    await task.cleanUpTestData(
      page,
      "Available tasks",
      nextTriggeredTaskToCleanUp,
      taskName,
    );
  });

  test("Task is completable via next steps link - assign to me", async ({
    page,
  }) => {
    let caseNumber02: any;
    caseNumber02 = await createCase.createCase(
      page,
      userRole,
      false,
      "Assessment",
      "Other",
      true,
      true,
      "Email",
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
    console.log(`Case Number : ${caseNumber02}`);
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
      caseNumber02,
    );
    await task.seeTask(page, userRole, false, taskName);
    await task.initiateTask(
      page,
      userRole,
      "Link: Assign Task to Me",
      false,
      caseNumber02,
      taskName,
      priority,
      assignedUser,
      numberOfDays,
      event,
      stateBeforeCompletion,
    );
    await buildCase.buildCase(page, false, caseNumber02);
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber02,
      stateAfterCompletion,
    );
    await task.cleanUpTestData(
      page,
      "Available tasks",
      nextTriggeredTaskToCleanUp,
      taskName,
    );
  });

  test("Task is completed via event dropdown", async ({ page }) => {
    let caseNumber03: any;
    caseNumber03 = await createCase.createCase(
      page,
      userRole,
      false,
      "Assessment",
      "Other",
      true,
      true,
      "Email",
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
    console.log(`Case Number : ${caseNumber03}`);
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
      caseNumber03,
    );
    await task.seeTask(page, userRole, false, taskName);
    await task.initiateTask(
      page,
      userRole,
      "Event DropDown",
      false,
      caseNumber03,
      taskName,
      priority,
      assignedUser,
      numberOfDays,
      event,
      stateBeforeCompletion,
    );
    await buildCase.buildCase(page, false, caseNumber03);
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber03,
      stateAfterCompletion,
    );
    await task.cleanUpTestData(
      page,
      "Available tasks",
      nextTriggeredTaskToCleanUp,
      taskName,
    );
  });
});

test("Task completion: Accessibility test / Build Case : Accessibility test @accessibilityCaseAPI", async ({
  page,
}) => {
  let caseNumber04: any;
  caseNumber04 = await createCase.createCase(
    page,
    userRole,
    false,
    "Assessment",
    "Other",
    true,
    true,
    "Email",
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
  console.log(`Case Number : ${caseNumber04}`);
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
    caseNumber04,
  );
  await task.seeTask(page, userRole, true, taskName);
  await task.initiateTask(
    page,
    userRole,
    "Link: Assign Task to Me and Go To Task",
    true,
    caseNumber04,
    taskName,
    priority,
    assignedUser,
    numberOfDays,
    event,
    stateBeforeCompletion,
  );
  await buildCase.buildCase(page, true, caseNumber04);
  await task.checkCompletedTask(
    page,
    true,
    taskName,
    caseNumber04,
    stateAfterCompletion,
  );
  await task.cleanUpTestData(
    page,
    "Available tasks",
    nextTriggeredTaskToCleanUp,
    taskName,
  );
});
