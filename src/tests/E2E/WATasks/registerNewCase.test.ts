import { test } from "@playwright/test";
import createFEApplication from "../../journeys/WA/DSSCreateCase/createCase.ts";
import task from "../../journeys/WA/task.ts";
import editCase from "../../journeys/WA/editCase.ts";

const taskName = "Register New Case";
const priority = " low ";
const assignedUser = "sptribswa regionalhearingcentreadmin";
const userRole = "waRegionalHearingCentreAdmin";
const numberOfDays = 5;
const event = "Case: Edit case";
const stateBeforeCompletion = "Case Status:  DSS-Submitted";
const stateAfterCompletion = "Case Status:  Submitted";
const nextTriggeredTaskToCleanUp = "Vet New Case Documents";

test.describe("Register new case task tests @CaseAPI", (): void => {
  test("Task is completable via next steps link - assign to me and go to task / Edit Case : Assessment - Fatal Category, Email Contact, 1996, Scotland", async ({
    page,
  }) => {
    let caseNumber: any;
    caseNumber = await createFEApplication.createFEApplication(
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
    console.log(`Case Number : ${caseNumber}`);
    await task.seeTask(page, userRole, false, taskName);
    await task.initiateTask(
      page,
      userRole,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber,
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
      caseNumber,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber,
      stateAfterCompletion,
    );
    await task.cleanUpTestData(
      page,
      "Available tasks",
      nextTriggeredTaskToCleanUp,
      taskName,
    );
  });

  test("Task is completable via next steps link - assign to me / Edit Case : Assessment - Medical Re-opening Category, Email Contact, 2001, London", async ({
    page,
  }) => {
    let caseNumber: any;
    caseNumber = await createFEApplication.createFEApplication(
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
    console.log(`Case Number : ${caseNumber}`);
    await task.seeTask(page, userRole, false, taskName);
    await task.initiateTask(
      page,
      userRole,
      "Link: Assign Task to Me",
      false,
      caseNumber,
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
      caseNumber,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber,
      stateAfterCompletion,
    );
    await task.cleanUpTestData(
      page,
      "Available tasks",
      nextTriggeredTaskToCleanUp,
      taskName,
    );
  });

  test("Task is completed via event dropdown / Edit Case : Assessment - Minor Category, Post Contact, 2008, Midlands", async ({
    page,
  }) => {
    let caseNumber: any;
    caseNumber = await createFEApplication.createFEApplication(
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
    console.log(`Case Number : ${caseNumber}`);
    await task.seeTask(page, userRole, false, taskName);
    await task.initiateTask(
      page,
      userRole,
      "Event DropDown",
      false,
      caseNumber,
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
      caseNumber,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber,
      stateAfterCompletion,
    );
    await task.cleanUpTestData(
      page,
      "Available tasks",
      nextTriggeredTaskToCleanUp,
      taskName,
    );
  });

  test("Task is completable via next steps link / Edit Case : Assessment - Paragraph 26 Category, Post Contact, 2012, North East", async ({
    page,
  }) => {
    let caseNumber: any;
    caseNumber = await createFEApplication.createFEApplication(
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
    console.log(`Case Number : ${caseNumber}`);
    await task.seeTask(page, userRole, false, taskName);
    await task.initiateTask(
      page,
      userRole,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber,
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
      caseNumber,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber,
      stateAfterCompletion,
    );
    await task.cleanUpTestData(
      page,
      "Available tasks",
      nextTriggeredTaskToCleanUp,
      taskName,
    );
  });

  test("Task is completable via next steps link / Edit Case : Assessment - Special Jurisdiction Category, Wales & South West", async ({
    page,
  }) => {
    let caseNumber: any;
    caseNumber = await createFEApplication.createFEApplication(
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
    console.log(`Case Number : ${caseNumber}`);
    await task.seeTask(page, userRole, false, taskName);
    await task.initiateTask(
      page,
      userRole,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber,
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
      caseNumber,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber,
      stateAfterCompletion,
    );
    await task.cleanUpTestData(
      page,
      "Available tasks",
      nextTriggeredTaskToCleanUp,
      taskName,
    );
  });

  test("Task is completable via next steps link / Edit Case : Eligibility - Other Category", async ({
    page,
  }) => {
    let caseNumber: any;
    caseNumber = await createFEApplication.createFEApplication(
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
    console.log(`Case Number : ${caseNumber}`);
    await task.seeTask(page, userRole, false, taskName);
    await task.initiateTask(
      page,
      userRole,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber,
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
      caseNumber,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber,
      stateAfterCompletion,
    );
    await task.cleanUpTestData(
      page,
      "Available tasks",
      nextTriggeredTaskToCleanUp,
      taskName,
    );
  });

  test("Edit Case : Error Messaging", async ({ page }) => {
    let caseNumber: any;
    caseNumber = await createFEApplication.createFEApplication(
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
    console.log(`Case Number : ${caseNumber}`);
    await task.seeTask(page, userRole, false, taskName);
    await task.initiateTask(
      page,
      userRole,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber,
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
      caseNumber,
    );
    await task.cleanUpTestData(page, "My tasks", taskName, taskName);
  });

  test.only("Task completion: Accessibility test / Edit Case : Accessibility test", async ({
    page,
  }) => {
    let caseNumber: any;
    caseNumber = await createFEApplication.createFEApplication(
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
    console.log(`Case Number : ${caseNumber}`);
    await task.seeTask(page, userRole, true, taskName);
    await task.initiateTask(
      page,
      userRole,
      "Link: Assign Task to Me and Go To Task",
      true,
      caseNumber,
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
      caseNumber,
    );
    await task.checkCompletedTask(
      page,
      true,
      taskName,
      caseNumber,
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
