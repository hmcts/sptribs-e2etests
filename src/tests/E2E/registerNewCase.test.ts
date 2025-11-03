import { test } from "@playwright/test";
import waUsers_content from "../fixtures/content/waUsers_content.ts";
import authors_content from "../fixtures/content/authors_content.ts";
import states_content from "../fixtures/content/states_content.ts";
import taskNames_content from "../fixtures/content/taskNames_content.ts";
import createFEApplication from "../journeys/DSSCreateCase/createCase.ts";
import task from "../journeys/CaseAPI/task.ts";
import editCase from "../journeys/CaseAPI/editCase.ts";
import editCaseDSS from "../journeys/CaseAPI/editCaseDSS.ts";
import commonHelpers from "../helpers/commonHelpers.ts";
import testDataCleanUp from "../helpers/testDataCleanUp.ts";

const priority = " low ";
const numberOfDays = 5;

test.describe("Register new case task tests @CaseAPI ", (): void => {
  test("Check for redundant test data @CaseAPI2", async ({ page }) => {
    test.setTimeout(10 * 60 * 1000);
    await testDataCleanUp(page, waUsers_content.userRoleAdmin);
  });
  test("Task is completable via next steps link - assign to me and go to task / Edit Case : Assessment - Fatal Category, Email Contact, 1996, Scotland @CaseAPI2", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber34: any = await createFEApplication.createFEApplication(
      page,
      false,
      waUsers_content.userRoleCitizen,
      true,
      true,
      "X1234567890",
      false,
      false,
      true,
      false,
      false,
      false,
      subjectName,
    );
    await task.seeTask(
      page,
      waUsers_content.userRoleAdmin,
      false,
      taskNames_content.registerNewCaseTask,
      subjectName,
    );
    await task.initiateTask(
      page,
      waUsers_content.userRoleAdmin,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber34,
      taskNames_content.registerNewCaseTask,
      priority,
      authors_content.assignedUserAdmin,
      numberOfDays,
      "Case: Edit case",
      states_content.DSSSubmittedState,
      subjectName,
    );
    await editCaseDSS.editCaseDSS(
      page,
      false,
      "DSS Submitted",
      "Assessment",
      "Fatal",
      "1234567890",
      "Test CICA Case Worker",
      "Test CICA Presenting Officer",
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
      taskNames_content.registerNewCaseTask,
      caseNumber34,
      states_content.submittedState,
      subjectName,
    );
  });

  test("Task is completable via next steps link - assign to me / Edit Case : Assessment - Medical Re-opening Category, Email Contact, 2001, London", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber35 = await createFEApplication.createFEApplication(
      page,
      false,
      waUsers_content.userRoleCitizen,
      true,
      true,
      "X1234567890",
      false,
      false,
      true,
      false,
      false,
      false,
      subjectName,
    );
    await task.seeTask(
      page,
      waUsers_content.userRoleAdmin,
      false,
      taskNames_content.registerNewCaseTask,
      subjectName,
    );
    await task.initiateTask(
      page,
      waUsers_content.userRoleAdmin,
      "Link: Assign Task to Me",
      false,
      caseNumber35,
      taskNames_content.registerNewCaseTask,
      priority,
      authors_content.assignedUserAdmin,
      numberOfDays,
      "Case: Edit case",
      states_content.DSSSubmittedState,
      subjectName,
    );
    await editCase.editCase(
      page,
      false,
      "DSS Submitted",
      "Assessment",
      "Medical Re-opening",
      "1234567890",
      "Test CICA Case Worker",
      "Test CICA Presenting Officer",
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
      taskNames_content.registerNewCaseTask,
      caseNumber35,
      states_content.submittedState,
      subjectName,
    );
  });

  test("Task is completed via event dropdown / Edit Case : Assessment - Minor Category, Post Contact, 2008, Midlands", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber36 = await createFEApplication.createFEApplication(
      page,
      false,
      waUsers_content.userRoleCitizen,
      true,
      true,
      "X1234567890",
      false,
      false,
      true,
      false,
      false,
      false,
      subjectName,
    );
    await task.seeTask(
      page,
      waUsers_content.userRoleAdmin,
      false,
      taskNames_content.registerNewCaseTask,
      subjectName,
    );
    await task.initiateTask(
      page,
      waUsers_content.userRoleAdmin,
      "Event DropDown",
      false,
      caseNumber36,
      taskNames_content.registerNewCaseTask,
      priority,
      authors_content.assignedUserAdmin,
      numberOfDays,
      "Case: Edit case",
      states_content.DSSSubmittedState,
      subjectName,
    );
    await editCase.editCase(
      page,
      false,
      "DSS Submitted",
      "Assessment",
      "Minor",
      "1234567890",
      "Test CICA Case Worker",
      "Test CICA Presenting Officer",
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
      taskNames_content.registerNewCaseTask,
      caseNumber36,
      states_content.submittedState,
      subjectName,
    );
  });

  test("Task is completable via next steps link / Edit Case : Assessment - Paragraph 26 Category, Post Contact, 2012, North East", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber37 = await createFEApplication.createFEApplication(
      page,
      false,
      waUsers_content.userRoleCitizen,
      false,
      false,
      "X1234567890",
      false,
      false,
      true,
      false,
      false,
      false,
      subjectName,
    );
    await task.seeTask(
      page,
      waUsers_content.userRoleAdmin,
      false,
      taskNames_content.registerNewCaseTask,
      subjectName,
    );
    await task.initiateTask(
      page,
      waUsers_content.userRoleAdmin,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber37,
      taskNames_content.registerNewCaseTask,
      priority,
      authors_content.assignedUserAdmin,
      numberOfDays,
      "Case: Edit case",
      states_content.DSSSubmittedState,
      subjectName,
    );
    await editCase.editCase(
      page,
      false,
      "DSS Submitted",
      "Assessment",
      "Paragraph 26",
      "1234567890",
      "Test CICA Case Worker",
      "Test CICA Presenting Officer",
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
      taskNames_content.registerNewCaseTask,
      caseNumber37,
      states_content.submittedState,
      subjectName,
    );
  });

  test("Task is completable via next steps link / Edit Case : Assessment - Special Jurisdiction Category, Wales & South West", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber38 = await createFEApplication.createFEApplication(
      page,
      false,
      waUsers_content.userRoleCitizen,
      true,
      true,
      "X1234567890",
      false,
      false,
      true,
      false,
      false,
      false,
      subjectName,
    );
    await task.seeTask(
      page,
      waUsers_content.userRoleAdmin,
      false,
      taskNames_content.registerNewCaseTask,
      subjectName,
    );
    await task.initiateTask(
      page,
      waUsers_content.userRoleAdmin,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber38,
      taskNames_content.registerNewCaseTask,
      priority,
      authors_content.assignedUserAdmin,
      numberOfDays,
      "Case: Edit case",
      states_content.DSSSubmittedState,
      subjectName,
    );
    await editCase.editCase(
      page,
      false,
      "DSS Submitted",
      "Assessment",
      "Special Jurisdiction",
      "1234567890",
      "Test CICA Case Worker",
      "Test CICA Presenting Officer",
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
      taskNames_content.registerNewCaseTask,
      caseNumber38,
      states_content.submittedState,
      subjectName,
    );
  });

  test("Task is completable via next steps link / Edit Case : Eligibility - Other Category @CaseAPI2", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber39 = await createFEApplication.createFEApplication(
      page,
      false,
      waUsers_content.userRoleCitizen,
      true,
      true,
      "X1234567890",
      false,
      false,
      true,
      false,
      false,
      false,
      subjectName,
    );
    await task.seeTask(
      page,
      waUsers_content.userRoleAdmin,
      false,
      taskNames_content.registerNewCaseTask,
      subjectName,
    );
    await task.initiateTask(
      page,
      waUsers_content.userRoleAdmin,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber39,
      taskNames_content.registerNewCaseTask,
      priority,
      authors_content.assignedUserAdmin,
      numberOfDays,
      "Case: Edit case",
      states_content.DSSSubmittedState,
      subjectName,
    );
    await editCaseDSS.editCaseDSS(
      page,
      false,
      "DSS Submitted",
      "Eligibility",
      "Other",
      "1234567890",
      "Test CICA Case Worker",
      "Test CICA Presenting Officer",
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
      taskNames_content.registerNewCaseTask,
      caseNumber39,
      states_content.submittedState,
      subjectName,
    );
  });

  test("Edit Case : Error Messaging @ErrorMessaging", async ({ page }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber40 = await createFEApplication.createFEApplication(
      page,
      false,
      waUsers_content.userRoleCitizen,
      true,
      true,
      "X1234567890",
      false,
      false,
      true,
      false,
      false,
      false,
      subjectName,
    );
    await task.seeTask(
      page,
      waUsers_content.userRoleAdmin,
      false,
      taskNames_content.registerNewCaseTask,
      subjectName,
    );
    await task.initiateTask(
      page,
      waUsers_content.userRoleAdmin,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber40,
      taskNames_content.registerNewCaseTask,
      priority,
      authors_content.assignedUserAdmin,
      numberOfDays,
      "Case: Edit case",
      states_content.DSSSubmittedState,
      subjectName,
    );
    await editCase.editCase(
      page,
      false,
      "DSS Submitted",
      "Assessment",
      "Medical Re-opening",
      "1234567890",
      "Test CICA Case Worker",
      "Test CICA Presenting Officer",
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

test("Task completion: Accessibility test / Edit Case : Accessibility test @accessibility", async ({
  page,
}) => {
  const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
  const caseNumber41 = await createFEApplication.createFEApplication(
    page,
    false,
    waUsers_content.userRoleCitizen,
    true,
    true,
    "X1234567890",
    false,
    false,
    true,
    false,
    true,
    false,
    subjectName,
  );
  await task.seeTask(
    page,
    waUsers_content.userRoleAdmin,
    false,
    taskNames_content.registerNewCaseTask,
    subjectName,
  );
  await task.initiateTask(
    page,
    waUsers_content.userRoleAdmin,
    "Link: Assign Task to Me and Go To Task",
    false,
    caseNumber41,
    taskNames_content.registerNewCaseTask,
    priority,
    authors_content.assignedUserAdmin,
    numberOfDays,
    "Case: Edit case",
    states_content.DSSSubmittedState,
    subjectName,
  );
  await editCaseDSS.editCaseDSS(
    page,
    true,
    "DSS Submitted",
    "Assessment",
    "Other",
    "1234567890",
    "Test CICA Case Worker",
    "Test CICA Presenting Officer",
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
    false,
    taskNames_content.registerNewCaseTask,
    caseNumber41,
    states_content.submittedState,
    subjectName,
  );
});
