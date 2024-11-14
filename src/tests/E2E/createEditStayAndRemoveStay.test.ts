import { test } from "@playwright/test";
import waUsers_content from "../fixtures/content/waUsers_content.ts";
import states_content from "../fixtures/content/states_content.ts";
import createEditStay from "../journeys/CaseAPI/createEditStay.ts";
import commonHelpers from "../helpers/commonHelpers.ts";
import createCase from "../journeys/CaseAPI/createCase.ts";
import buildCase from "../journeys/CaseAPI/buildCase.ts";
import events_content from "../fixtures/content/CaseAPI/events_content.ts";
import hearingOptions from "../journeys/CaseAPI/hearingOptions.ts";
import removeStay from "../journeys/CaseAPI/removeStay.ts";
import testDataCleanUp from "../helpers/testDataCleanUp.ts";

test.describe("Case-API Create/edit stay tests. @CaseAPI @CaseAPI2", () => {
  test("Check for redundant test data", async ({ page }) => {
    await testDataCleanUp(page, waUsers_content.userRoleAdmin);
  });

  test("Stay a case management case for reason waitingOutcomeOfCivilCase, with optional text. @crossbrowserCaseAPI", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber900 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber900, subjectName);
    await createEditStay.createEditStay(
      page,
      false,
      false,
      "waitingOutcomeOfCivilCase",
      true,
      caseNumber900,
      subjectName,
      states_content.caseStayedState,
      false,
    );
    await removeStay.removeStay(
      page,
      false,
      "receivedOutcomeOfCivilCase",
      true,
      false,
      caseNumber900,
      subjectName,
      states_content.caseManagementState,
    );
  });

  test("Stay a case management case for reason awaitingOutcomeOfCriminalProceedings, with no optional text.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber901 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber901, subjectName);
    await createEditStay.createEditStay(
      page,
      false,
      false,
      "awaitingOutcomeOfCriminalProceedings",
      false,
      caseNumber901,
      subjectName,
      states_content.caseStayedState,
      false,
    );
    await removeStay.removeStay(
      page,
      false,
      "receviedOutcomeOfCriminalProceedings",
      false,
      false,
      caseNumber901,
      subjectName,
      states_content.caseManagementState,
    );
  });

  test("Stay a case management case for reason awaitingACourtJudgement, with optional text.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber902 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber902, subjectName);
    await createEditStay.createEditStay(
      page,
      false,
      false,
      "awaitingACourtJudgement",
      true,
      caseNumber902,
      subjectName,
      states_content.caseStayedState,
      false,
    );
    await removeStay.removeStay(
      page,
      false,
      "receivedACourtJudgement",
      true,
      false,
      caseNumber902,
      subjectName,
      states_content.caseManagementState,
    );
  });

  test("Stay a case management case for reason unableToProgressDueToSubject, with no optional text.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber903 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber903, subjectName);
    await createEditStay.createEditStay(
      page,
      false,
      false,
      "unableToProgressDueToSubject",
      false,
      caseNumber903,
      subjectName,
      states_content.caseStayedState,
      false,
    );
    await removeStay.removeStay(
      page,
      false,
      "applicantHasReachedRequiredAge",
      false,
      false,
      caseNumber903,
      subjectName,
      states_content.caseManagementState,
    );
  });

  test("Stay a case management case for reason unableToProgressAsSubjectUndergoingOrAwaitingTreatment as a seniorJudge with optional text.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber904 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber904, subjectName);
    await createEditStay.createEditStay(
      page,
      false,
      false,
      "unableToProgressAsSubjectUndergoingOrAwaitingTreatment",
      true,
      caseNumber904,
      subjectName,
      states_content.caseStayedState,
      false,
    );
    await removeStay.removeStay(
      page,
      false,
      "subjectHasReceivedTheirMedicalTreatment",
      true,
      false,
      caseNumber904,
      subjectName,
      states_content.caseManagementState,
    );
  });

  test("Stay a case management case for reason awaitingOutcomeOfLinkedCase as a caseworker with no optional text.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber905 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber905, subjectName);
    await createEditStay.createEditStay(
      page,
      false,
      false,
      "awaitingOutcomeOfLinkedCase",
      false,
      caseNumber905,
      subjectName,
      states_content.caseStayedState,
      false,
    );
    await removeStay.removeStay(
      page,
      false,
      "receivedOutcomeOfLinkedCase",
      false,
      false,
      caseNumber905,
      subjectName,
      states_content.caseManagementState,
    );
  });

  test("Stay a case management case for reason Other, with optional text.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber906 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber906, subjectName);
    await createEditStay.createEditStay(
      page,
      false,
      false,
      "Other",
      true,
      caseNumber906,
      subjectName,
      states_content.caseStayedState,
      false,
    );
    await removeStay.removeStay(
      page,
      false,
      "Other",
      true,
      false,
      caseNumber906,
      subjectName,
      states_content.caseManagementState,
    );
  });

  test("Stay a Ready to list case for reason waitingOutcomeOfCivilCase, with optional text.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber907 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber907, subjectName);
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
      states_content.caseStayedState,
      false,
    );
  });

  test("Stay a Ready to list case for reason awaitingOutcomeOfCriminalProceedings, with no optional text.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber908 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber908, subjectName);
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
      states_content.caseStayedState,
      false,
    );
  });

  test("Stay a Ready to list case for reason awaitingACourtJudgement with optional text.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber909 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber909, subjectName);
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
      states_content.caseStayedState,
      false,
    );
  });

  test("Stay a Ready to list case for reason unableToProgressDueToSubject, with no optional text.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber910 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber910, subjectName);
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
      states_content.caseStayedState,
      false,
    );
  });

  test("Stay a Ready to list case for reason unableToProgressAsSubjectUndergoingOrAwaitingTreatment, with optional text.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber911 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber911, subjectName);
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
      states_content.caseStayedState,
      false,
    );
  });

  test("Stay a Ready to list case for reason awaitingOutcomeOfLinkedCase, with no optional text.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber912 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber912, subjectName);
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
      states_content.caseStayedState,
      false,
    );
  });

  test("Stay a Ready to list case for reason Other, with optional text.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber913 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber913, subjectName);
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
      states_content.caseStayedState,
      false,
    );
  });

  test("Error messages - Create/Edit stay", async ({ page }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber914 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber914, subjectName);
    await createEditStay.createEditStay(
      page,
      false,
      true,
      "waitingOutcomeOfCivilCase",
      false,
      caseNumber914,
      subjectName,
      states_content.caseStayedState,
      false,
    );
    await removeStay.removeStay(
      page,
      false,
      "receivedOutcomeOfCivilCase",
      false,
      true,
      caseNumber914,
      subjectName,
      states_content.caseManagementState,
    );
  });
});

test("Accessibility test - Create/Edit stay @accessibilityCaseAPI", async ({
  page,
}): Promise<void> => {
  const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
  const caseNumber915 = await createCase.createCase(
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
  await buildCase.buildCase(page, false, caseNumber915, subjectName);
  await createEditStay.createEditStay(
    page,
    true,
    false,
    "Other",
    true,
    caseNumber915,
    subjectName,
    states_content.caseStayedState,
    false,
  );
  await removeStay.removeStay(
    page,
    true,
    "Other",
    false,
    false,
    caseNumber915,
    subjectName,
    states_content.caseManagementState,
  );
});
