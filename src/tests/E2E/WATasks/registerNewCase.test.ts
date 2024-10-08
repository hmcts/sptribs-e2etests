import { test } from "@playwright/test";
import createFEApplication from "../../journeys/WA/DSSCreateCase/createCase.ts";
import task from "../../journeys/WA/task.ts";
import editCase from "../../journeys/WA/editCase.ts";

const taskName = "Register New Case";
const priority = " low ";
const assignedUser = "sptribswa hearingcentreadmin";
const userRole = "waHearingCentreAdmin";
const numberOfDays = 5;
const event = "Case: Edit case";
const stateBeforeCompletion = "DSS-Submitted";
const stateAfterCompletion = "Submitted";
const nextTriggeredTaskToCleanUp = "Vet New Case Documents";

test.describe("Register new case task tests @CaseAPI", (): void => {
  test("Task is completable via next steps link - assign to me and go to task / Edit Case : Assessment - Fatal Category, Email Contact, 1996, Scotland", async ({
    page,
  }) => {
    let caseNumber01: any;
    caseNumber01 = await createFEApplication.createFEApplication(
      page,
      false,
      "demoCitizen",
      true,
      true,
      false,
      false,
      true,
      false,
      false,
      false,
    );
    console.log(`Case Number : ${caseNumber01}`);
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
    await editCase.editCase(
      page,
      false,
      "DSS Submitted",
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
      caseNumber01,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber01,
      stateAfterCompletion,
    );
    await task.removeTask(page, nextTriggeredTaskToCleanUp);
  });

  test("Task is completable via next steps link - assign to me / Edit Case : Assessment - Medical Re-opening Category, Email Contact, 2001, London", async ({
    page,
  }) => {
    let caseNumber02: any;
    caseNumber02 = await createFEApplication.createFEApplication(
      page,
      false,
      "demoCitizen",
      true,
      true,
      false,
      false,
      true,
      false,
      false,
      false,
    );
    console.log(`Case Number : ${caseNumber02}`);
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
    await editCase.editCase(
      page,
      false,
      "DSS Submitted",
      "Assessment",
      "Medical Re-opening",
      true,
      true,
      "Email",
      true,
      "2001",
      "London",
      true,
      false,
      true,
      false,
      false,
      caseNumber02,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber02,
      stateAfterCompletion,
    );
    await task.removeTask(page, nextTriggeredTaskToCleanUp);
  });

  test("Task is completed via event dropdown / Edit Case : Assessment - Minor Category, Post Contact, 2008, Midlands", async ({
    page,
  }) => {
    let caseNumber03: any;
    caseNumber03 = await createFEApplication.createFEApplication(
      page,
      false,
      "demoCitizen",
      true,
      true,
      false,
      false,
      true,
      false,
      false,
      false,
    );
    console.log(`Case Number : ${caseNumber03}`);
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
    await editCase.editCase(
      page,
      false,
      "DSS Submitted",
      "Assessment",
      "Minor",
      true,
      true,
      "Post",
      true,
      "2008",
      "Midlands",
      true,
      false,
      true,
      false,
      false,
      caseNumber03,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber03,
      stateAfterCompletion,
    );
    await task.removeTask(page, nextTriggeredTaskToCleanUp);
  });

  test("Task is completable via next steps link / Edit Case : Assessment - Paragraph 26 Category, Post Contact, 2012, North East", async ({
    page,
  }) => {
    let caseNumber04: any;
    caseNumber04 = await createFEApplication.createFEApplication(
      page,
      false,
      "demoCitizen",
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
    );
    console.log(`Case Number : ${caseNumber04}`);
    await task.seeTask(page, userRole, false, taskName);
    await task.initiateTask(
      page,
      userRole,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber04,
      taskName,
      priority,
      assignedUser,
      numberOfDays,
      event,
      stateBeforeCompletion,
    );
    await editCase.editCase(
      page,
      false,
      "DSS Submitted",
      "Assessment",
      "Paragraph 26",
      false,
      true,
      "Post",
      true,
      "2012",
      "North East",
      true,
      false,
      true,
      false,
      false,
      caseNumber04,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber04,
      stateAfterCompletion,
    );
    await task.removeTask(page, nextTriggeredTaskToCleanUp);
  });

  test("Task is completable via next steps link / Edit Case : Assessment - Special Jurisdiction Category, Wales & South West", async ({
    page,
  }) => {
    let caseNumber05: any;
    caseNumber05 = await createFEApplication.createFEApplication(
      page,
      false,
      "demoCitizen",
      true,
      true,
      false,
      false,
      true,
      false,
      false,
      false,
    );
    console.log(`Case Number : ${caseNumber05}`);
    await task.seeTask(page, userRole, false, taskName);
    await task.initiateTask(
      page,
      userRole,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber05,
      taskName,
      priority,
      assignedUser,
      numberOfDays,
      event,
      stateBeforeCompletion,
    );
    await editCase.editCase(
      page,
      false,
      "DSS Submitted",
      "Assessment",
      "Special Jurisdiction",
      true,
      true,
      "Email",
      true,
      "2001",
      "Wales & South West",
      true,
      false,
      true,
      false,
      false,
      caseNumber05,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber05,
      stateAfterCompletion,
    );
    await task.removeTask(page, nextTriggeredTaskToCleanUp);
  });

  test("Task is completable via next steps link / Edit Case : Eligibility - Other Category", async ({
    page,
  }) => {
    let caseNumber06: any;
    caseNumber06 = await createFEApplication.createFEApplication(
      page,
      false,
      "demoCitizen",
      true,
      true,
      false,
      false,
      true,
      false,
      false,
      false,
    );
    console.log(`Case Number : ${caseNumber06}`);
    await task.seeTask(page, userRole, false, taskName);
    await task.initiateTask(
      page,
      userRole,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber06,
      taskName,
      priority,
      assignedUser,
      numberOfDays,
      event,
      stateBeforeCompletion,
    );
    await editCase.editCase(
      page,
      false,
      "DSS Submitted",
      "Eligibility",
      "Other",
      true,
      true,
      "Email",
      true,
      "1996",
      "Midlands",
      true,
      true,
      true,
      true,
      false,
      caseNumber06,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber06,
      stateAfterCompletion,
    );
    await task.removeTask(page, nextTriggeredTaskToCleanUp);
  });

  test("Edit Case : Error Messaging", async ({ page }) => {
    let caseNumber07: any;
    caseNumber07 = await createFEApplication.createFEApplication(
      page,
      false,
      "demoCitizen",
      true,
      true,
      false,
      false,
      true,
      false,
      false,
      false,
    );
    console.log(`Case Number : ${caseNumber07}`);
    await task.seeTask(page, userRole, false, taskName);
    await task.initiateTask(
      page,
      userRole,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber07,
      taskName,
      priority,
      assignedUser,
      numberOfDays,
      event,
      stateBeforeCompletion,
    );
    await editCase.editCase(
      page,
      false,
      "DSS Submitted",
      "Assessment",
      "Medical Re-opening",
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
      true,
      caseNumber07,
    );
    await task.removeTask(page, taskName);
  });
});

test("Task completion: Accessibility test / Edit Case : Accessibility test @accessibilityCaseAPI", async ({
  page,
}) => {
  let caseNumber08: any;
  caseNumber08 = await createFEApplication.createFEApplication(
    page,
    false,
    "demoCitizen",
    true,
    true,
    false,
    false,
    true,
    false,
    true,
    false,
  );
  console.log(`Case Number : ${caseNumber08}`);
  await task.seeTask(page, userRole, true, taskName);
  await task.initiateTask(
    page,
    userRole,
    "Link: Assign Task to Me and Go To Task",
    true,
    caseNumber08,
    taskName,
    priority,
    assignedUser,
    numberOfDays,
    event,
    stateBeforeCompletion,
  );
  await editCase.editCase(
    page,
    true,
    "DSS Submitted",
    "Assessment",
    "Other",
    true,
    true,
    "Email",
    true,
    "1996",
    "Scotland",
    true,
    true,
    true,
    true,
    false,
    caseNumber08,
  );
  await task.checkCompletedTask(
    page,
    true,
    taskName,
    caseNumber08,
    stateAfterCompletion,
  );
  await task.removeTask(page, nextTriggeredTaskToCleanUp);
});
