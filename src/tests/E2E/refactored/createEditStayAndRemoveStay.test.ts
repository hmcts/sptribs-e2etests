import { test } from "@playwright/test";
import createEditStay from "../../journeys/WA/createEditStay.ts";
import commonHelpers from "../../helpers/commonHelpers.ts";
import createCase from "../../journeys/WA/createCase.ts";
import buildCase from "../../journeys/WA/buildCase.ts";
import task from "../../journeys/WA/task.ts";
import events_content from "../../fixtures/content/CaseAPI/events_content.ts";
import hearingOptions from "../../journeys/WA/hearingOptions.ts";
import removeStay from "../../journeys/WA/removeStay.ts";
import testDataCleanUp from "../../helpers/testDataCleanUp.ts";

const userRoleAdmin = "waHearingCentreAdmin";
const taskRemovedIssueCase = " Issue Case To Respondent ";
const state = "Case Status:  Case management";
const stateCaseStayed = "Case Status:  Case stayed";

test.describe("Case-API Create/edit stay tests. @CaseAPI", () => {
  test("Check for redundant test data", async ({ page }) => {
    test.setTimeout(20 * 60 * 1000);
    await testDataCleanUp(page, userRoleAdmin);
  });

  test("Stay a case management case for reason waitingOutcomeOfCivilCase, with optional text. @crossbrowserCaseAPI", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber900 = await createCase.createCase(
      page,
      userRoleAdmin,
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
    console.log(`Case Number : ${caseNumber900}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber900, subjectName);
    await task.removeTask(page, taskRemovedIssueCase, subjectName);
    await createEditStay.createEditStay(
      page,
      false,
      false,
      "waitingOutcomeOfCivilCase",
      true,
      caseNumber900,
      subjectName,
      stateCaseStayed,
    );
    await removeStay.removeStay(
      page,
      false,
      "receivedOutcomeOfCivilCase",
      true,
      false,
      caseNumber900,
      subjectName,
      state,
    );
  });

  test("Stay a case management case for reason awaitingOutcomeOfCriminalProceedings, with no optional text.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber901 = await createCase.createCase(
      page,
      userRoleAdmin,
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
    console.log(`Case Number : ${caseNumber901}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber901, subjectName);
    await task.removeTask(page, taskRemovedIssueCase, subjectName);
    await createEditStay.createEditStay(
      page,
      false,
      false,
      "awaitingOutcomeOfCriminalProceedings",
      false,
      caseNumber901,
      subjectName,
      stateCaseStayed,
    );
    await removeStay.removeStay(
      page,
      false,
      "receviedOutcomeOfCriminalProceedings",
      false,
      false,
      caseNumber901,
      subjectName,
      state,
    );
  });

  test("Stay a case management case for reason awaitingACourtJudgement, with optional text.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber902 = await createCase.createCase(
      page,
      userRoleAdmin,
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
    console.log(`Case Number : ${caseNumber902}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber902, subjectName);
    await task.removeTask(page, taskRemovedIssueCase, subjectName);
    await createEditStay.createEditStay(
      page,
      false,
      false,
      "awaitingACourtJudgement",
      true,
      caseNumber902,
      subjectName,
      stateCaseStayed,
    );
    await removeStay.removeStay(
      page,
      false,
      "receivedACourtJudgement",
      true,
      false,
      caseNumber902,
      subjectName,
      state,
    );
  });

  test("Stay a case management case for reason unableToProgressDueToSubject, with no optional text.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber903 = await createCase.createCase(
      page,
      userRoleAdmin,
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
    console.log(`Case Number : ${caseNumber903}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber903, subjectName);
    await task.removeTask(page, taskRemovedIssueCase, subjectName);
    await createEditStay.createEditStay(
      page,
      false,
      false,
      "unableToProgressDueToSubject",
      false,
      caseNumber903,
      subjectName,
      stateCaseStayed,
    );
    await removeStay.removeStay(
      page,
      false,
      "applicantHasReachedRequiredAge",
      false,
      false,
      caseNumber903,
      subjectName,
      state,
    );
  });

  test("Stay a case management case for reason unableToProgressAsSubjectUndergoingOrAwaitingTreatment as a seniorJudge with optional text.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber904 = await createCase.createCase(
      page,
      userRoleAdmin,
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
    console.log(`Case Number : ${caseNumber904}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber904, subjectName);
    await task.removeTask(page, taskRemovedIssueCase, subjectName);
    await createEditStay.createEditStay(
      page,
      false,
      false,
      "unableToProgressAsSubjectUndergoingOrAwaitingTreatment",
      true,
      caseNumber904,
      subjectName,
      stateCaseStayed,
    );
    await removeStay.removeStay(
      page,
      false,
      "subjectHasReceivedTheirMedicalTreatment",
      true,
      false,
      caseNumber904,
      subjectName,
      state,
    );
  });

  test("Stay a case management case for reason awaitingOutcomeOfLinkedCase as a caseworker with no optional text.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber905 = await createCase.createCase(
      page,
      userRoleAdmin,
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
    console.log(`Case Number : ${caseNumber905}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber905, subjectName);
    await task.removeTask(page, taskRemovedIssueCase, subjectName);
    await createEditStay.createEditStay(
      page,
      false,
      false,
      "awaitingOutcomeOfLinkedCase",
      false,
      caseNumber905,
      subjectName,
      stateCaseStayed,
    );
    await removeStay.removeStay(
      page,
      false,
      "receivedOutcomeOfLinkedCase",
      false,
      false,
      caseNumber905,
      subjectName,
      state,
    );
  });

  test("Stay a case management case for reason Other, with optional text.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber906 = await createCase.createCase(
      page,
      userRoleAdmin,
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
    console.log(`Case Number : ${caseNumber906}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber906, subjectName);
    await task.removeTask(page, taskRemovedIssueCase, subjectName);
    await createEditStay.createEditStay(
      page,
      false,
      false,
      "Other",
      true,
      caseNumber906,
      subjectName,
      stateCaseStayed,
    );
    await removeStay.removeStay(
      page,
      false,
      "Other",
      true,
      false,
      caseNumber906,
      subjectName,
      state,
    );
  });

  test("Stay a Ready to list case for reason waitingOutcomeOfCivilCase, with optional text.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber907 = await createCase.createCase(
      page,
      userRoleAdmin,
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
    console.log(`Case Number : ${caseNumber907}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber907, subjectName);
    await task.removeTask(page, taskRemovedIssueCase, subjectName);
    await hearingOptions.hearingOptions(
      page,
      false,
      false,
      null,
      false,
      false,
      "Face to Face",
      false,
      false,
      caseNumber907,
      subjectName,
    );
    await createEditStay.createEditStay(
      page,
      false,
      false,
      "waitingOutcomeOfCivilCase",
      true,
      caseNumber907,
      subjectName,
      stateCaseStayed,
    );
  });

  test("Stay a Ready to list case for reason awaitingOutcomeOfCriminalProceedings, with no optional text.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber908 = await createCase.createCase(
      page,
      userRoleAdmin,
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
    console.log(`Case Number : ${caseNumber908}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber908, subjectName);
    await task.removeTask(page, taskRemovedIssueCase, subjectName);
    await hearingOptions.hearingOptions(
      page,
      false,
      false,
      null,
      false,
      false,
      "Face to Face",
      false,
      false,
      caseNumber908,
      subjectName,
    );
    await createEditStay.createEditStay(
      page,
      false,
      false,
      "awaitingOutcomeOfCriminalProceedings",
      false,
      caseNumber908,
      subjectName,
      stateCaseStayed,
    );
  });

  test("Stay a Ready to list case for reason awaitingACourtJudgement with optional text.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber909 = await createCase.createCase(
      page,
      userRoleAdmin,
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
    console.log(`Case Number : ${caseNumber909}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber909, subjectName);
    await task.removeTask(page, taskRemovedIssueCase, subjectName);
    await hearingOptions.hearingOptions(
      page,
      false,
      false,
      null,
      false,
      false,
      "Face to Face",
      false,
      false,
      caseNumber909,
      subjectName,
    );
    await createEditStay.createEditStay(
      page,
      false,
      false,
      "awaitingACourtJudgement",
      true,
      caseNumber909,
      subjectName,
      stateCaseStayed,
    );
  });

  test("Stay a Ready to list case for reason unableToProgressDueToSubject, with no optional text. @crossbrowserCaseAPI", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber910 = await createCase.createCase(
      page,
      userRoleAdmin,
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
    console.log(`Case Number : ${caseNumber910}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber910, subjectName);
    await task.removeTask(page, taskRemovedIssueCase, subjectName);
    await hearingOptions.hearingOptions(
      page,
      false,
      false,
      null,
      false,
      false,
      "Face to Face",
      false,
      false,
      caseNumber910,
      subjectName,
    );
    await createEditStay.createEditStay(
      page,
      false,
      false,
      "unableToProgressDueToSubject",
      false,
      caseNumber910,
      subjectName,
      stateCaseStayed,
    );
  });

  test("Stay a Ready to list case for reason unableToProgressAsSubjectUndergoingOrAwaitingTreatment, with optional text.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber911 = await createCase.createCase(
      page,
      userRoleAdmin,
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
    console.log(`Case Number : ${caseNumber911}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber911, subjectName);
    await task.removeTask(page, taskRemovedIssueCase, subjectName);
    await hearingOptions.hearingOptions(
      page,
      false,
      false,
      null,
      false,
      false,
      "Face to Face",
      false,
      false,
      caseNumber911,
      subjectName,
    );
    await createEditStay.createEditStay(
      page,
      false,
      false,
      "unableToProgressAsSubjectUndergoingOrAwaitingTreatment",
      true,
      caseNumber911,
      subjectName,
      stateCaseStayed,
    );
  });

  test("Stay a Ready to list case for reason awaitingOutcomeOfLinkedCase, with no optional text.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber912 = await createCase.createCase(
      page,
      userRoleAdmin,
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
    console.log(`Case Number : ${caseNumber912}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber912, subjectName);
    await task.removeTask(page, taskRemovedIssueCase, subjectName);
    await hearingOptions.hearingOptions(
      page,
      false,
      false,
      null,
      false,
      false,
      "Face to Face",
      false,
      false,
      caseNumber912,
      subjectName,
    );
    await createEditStay.createEditStay(
      page,
      false,
      false,
      "awaitingOutcomeOfLinkedCase",
      false,
      caseNumber912,
      subjectName,
      stateCaseStayed,
    );
  });

  test("Stay a Ready to list case for reason Other, with optional text.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber913 = await createCase.createCase(
      page,
      userRoleAdmin,
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
    console.log(`Case Number : ${caseNumber913}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber913, subjectName);
    await task.removeTask(page, taskRemovedIssueCase, subjectName);
    await hearingOptions.hearingOptions(
      page,
      false,
      false,
      null,
      false,
      false,
      "Face to Face",
      false,
      false,
      caseNumber913,
      subjectName,
    );
    await createEditStay.createEditStay(
      page,
      false,
      false,
      "Other",
      true,
      caseNumber913,
      subjectName,
      stateCaseStayed,
    );
  });

  test("Error messages - Create/Edit stay @crossbrowserCaseAPI", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber914 = await createCase.createCase(
      page,
      userRoleAdmin,
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
    console.log(`Case Number : ${caseNumber914}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber914, subjectName);
    await task.removeTask(page, taskRemovedIssueCase, subjectName);
    await createEditStay.createEditStay(
      page,
      false,
      true,
      "waitingOutcomeOfCivilCase",
      false,
      caseNumber914,
      subjectName,
      stateCaseStayed,
    );
    await removeStay.removeStay(
      page,
      false,
      "receivedOutcomeOfCivilCase",
      false,
      true,
      caseNumber914,
      subjectName,
      state,
    );
  });
});

test("Accessibility test - Create/Edit stay @accessibilityCaseAPI", async ({
  page,
}): Promise<void> => {
  const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
  const caseNumber915 = await createCase.createCase(
    page,
    userRoleAdmin,
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
  console.log(`Case Number : ${caseNumber915}`);
  await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
  await buildCase.buildCase(page, false, caseNumber915, subjectName);
  await task.removeTask(page, taskRemovedIssueCase, subjectName);
  await createEditStay.createEditStay(
    page,
    true,
    false,
    "Other",
    true,
    caseNumber915,
    subjectName,
    stateCaseStayed,
  );
  await removeStay.removeStay(
    page,
    true,
    "Other",
    false,
    false,
    caseNumber915,
    subjectName,
    state,
  );
});
