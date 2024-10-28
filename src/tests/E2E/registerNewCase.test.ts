import { test } from "@playwright/test";
import createFEApplication from "../journeys/DSSCreateCase/createCase.ts";
import task from "../journeys/CaseAPI/task.ts";
import editCase from "../journeys/CaseAPI/editCase.ts";
import commonHelpers from "../helpers/commonHelpers.ts";

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
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber34: any = await createFEApplication.createFEApplication(
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
      subjectName,
    );
    console.log(`Case Number : ${caseNumber34}`);
    await task.seeTask(page, userRole, false, taskName, subjectName);
    await task.initiateTask(
      page,
      userRole,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber34,
      taskName,
      priority,
      assignedUser,
      numberOfDays,
      event,
      stateBeforeCompletion,
      subjectName,
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
      caseNumber34,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber34,
      stateAfterCompletion,
      subjectName,
    );
    await task.removeTask(page, nextTriggeredTaskToCleanUp, subjectName);
  });

  test("Task is completable via next steps link - assign to me / Edit Case : Assessment - Medical Re-opening Category, Email Contact, 2001, London", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber35 = await createFEApplication.createFEApplication(
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
      subjectName,
    );
    console.log(`Case Number : ${caseNumber35}`);
    await task.seeTask(page, userRole, false, taskName, subjectName);
    await task.initiateTask(
      page,
      userRole,
      "Link: Assign Task to Me",
      false,
      caseNumber35,
      taskName,
      priority,
      assignedUser,
      numberOfDays,
      event,
      stateBeforeCompletion,
      subjectName,
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
      caseNumber35,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber35,
      stateAfterCompletion,
      subjectName,
    );
    await task.removeTask(page, nextTriggeredTaskToCleanUp, subjectName);
  });

  test("Task is completed via event dropdown / Edit Case : Assessment - Minor Category, Post Contact, 2008, Midlands", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber36 = await createFEApplication.createFEApplication(
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
      subjectName,
    );
    console.log(`Case Number : ${caseNumber36}`);
    await task.seeTask(page, userRole, false, taskName, subjectName);
    await task.initiateTask(
      page,
      userRole,
      "Event DropDown",
      false,
      caseNumber36,
      taskName,
      priority,
      assignedUser,
      numberOfDays,
      event,
      stateBeforeCompletion,
      subjectName,
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
      caseNumber36,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber36,
      stateAfterCompletion,
      subjectName,
    );
    await task.removeTask(page, nextTriggeredTaskToCleanUp, subjectName);
  });

  test("Task is completable via next steps link / Edit Case : Assessment - Paragraph 26 Category, Post Contact, 2012, North East", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber37 = await createFEApplication.createFEApplication(
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
      subjectName,
    );
    console.log(`Case Number : ${caseNumber37}`);
    await task.seeTask(page, userRole, false, taskName, subjectName);
    await task.initiateTask(
      page,
      userRole,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber37,
      taskName,
      priority,
      assignedUser,
      numberOfDays,
      event,
      stateBeforeCompletion,
      subjectName,
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
      caseNumber37,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber37,
      stateAfterCompletion,
      subjectName,
    );
    await task.removeTask(page, nextTriggeredTaskToCleanUp, subjectName);
  });

  test("Task is completable via next steps link / Edit Case : Assessment - Special Jurisdiction Category, Wales & South West", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber38 = await createFEApplication.createFEApplication(
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
      subjectName,
    );
    console.log(`Case Number : ${caseNumber38}`);
    await task.seeTask(page, userRole, false, taskName, subjectName);
    await task.initiateTask(
      page,
      userRole,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber38,
      taskName,
      priority,
      assignedUser,
      numberOfDays,
      event,
      stateBeforeCompletion,
      subjectName,
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
      caseNumber38,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber38,
      stateAfterCompletion,
      subjectName,
    );
    await task.removeTask(page, nextTriggeredTaskToCleanUp, subjectName);
  });

  test("Task is completable via next steps link / Edit Case : Eligibility - Other Category", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber39 = await createFEApplication.createFEApplication(
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
      subjectName,
    );
    console.log(`Case Number : ${caseNumber39}`);
    await task.seeTask(page, userRole, false, taskName, subjectName);
    await task.initiateTask(
      page,
      userRole,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber39,
      taskName,
      priority,
      assignedUser,
      numberOfDays,
      event,
      stateBeforeCompletion,
      subjectName,
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
      caseNumber39,
      subjectName,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber39,
      stateAfterCompletion,
      subjectName,
    );
    await task.removeTask(page, nextTriggeredTaskToCleanUp, subjectName);
  });

  test("Edit Case : Error Messaging", async ({ page }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber40 = await createFEApplication.createFEApplication(
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
      subjectName,
    );
    console.log(`Case Number : ${caseNumber40}`);
    await task.seeTask(page, userRole, false, taskName, subjectName);
    await task.initiateTask(
      page,
      userRole,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber40,
      taskName,
      priority,
      assignedUser,
      numberOfDays,
      event,
      stateBeforeCompletion,
      subjectName,
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
      caseNumber40,
      subjectName,
    );
  });
});

test("Task completion: Accessibility test / Edit Case : Accessibility test @accessibilityCaseAPI", async ({
  page,
}) => {
  const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
  const caseNumber41 = await createFEApplication.createFEApplication(
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
    subjectName,
  );
  console.log(`Case Number : ${caseNumber41}`);
  await task.seeTask(page, userRole, true, taskName, subjectName);
  await task.initiateTask(
    page,
    userRole,
    "Link: Assign Task to Me and Go To Task",
    true,
    caseNumber41,
    taskName,
    priority,
    assignedUser,
    numberOfDays,
    event,
    stateBeforeCompletion,
    subjectName,
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
    caseNumber41,
    subjectName,
  );
  await task.checkCompletedTask(
    page,
    true,
    taskName,
    caseNumber41,
    stateAfterCompletion,
    subjectName,
  );
  await task.removeTask(page, nextTriggeredTaskToCleanUp, subjectName);
});
