import { test } from "@playwright/test";
import waUsers_content from "../fixtures/content/waUsers_content.ts";
import states_content from "../fixtures/content/states_content.ts";
import createFEApplication from "../journeys/DSSCreateCase/createCase.ts";
import createCase from "../journeys/CaseAPI/createCase.ts";
import buildCase from "../journeys/CaseAPI/buildCase.ts";
import events_content from "../fixtures/content/CaseAPI/events_content.ts";
import commonHelpers from "../helpers/commonHelpers.ts";
import addNote from "../journeys/CaseAPI/addNote.ts";
import config from "../config.ts";
import hearingOptions from "../journeys/CaseAPI/hearingOptions.ts";
import createListing from "../journeys/CaseAPI/createListing.ts";
import createSummary from "../journeys/CaseAPI/createSummary.ts";
import closeCase from "../journeys/CaseAPI/closeCase.ts";
import createEditStay from "../journeys/CaseAPI/createEditStay.ts";
import task from "../journeys/CaseAPI/task.ts";
import taskNames_content from "../fixtures/content/taskNames_content.ts";

test.describe("Case-API Add note tests. @CaseAPI", () => {
  if (!config.skipDSSCreateTests) {
    test("Add a note to a DSS-submitted case.", async ({
      page,
    }): Promise<void> => {
      const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
      const caseNumber200 = await createFEApplication.createFEApplication(
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
      await commonHelpers.signOutAndGoToCase(
        page,
        waUsers_content.userRoleAdmin,
        config.CaseAPIBaseURL,
        caseNumber200,
      );
      await addNote.addNote(page, false, caseNumber200, subjectName);
    });
  }

  test("Add a note to a Submitted case case.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber201 = await createCase.createCase(
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
    await addNote.addNote(page, false, caseNumber201, subjectName);
  });

  test("Add a note to a Case management case case. @CaseAPI1", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber202 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber202, subjectName);
    await addNote.addNote(page, false, caseNumber202, subjectName);
    await task.removeTask(
      page,
      taskNames_content.issueCaseToRespondentTask,
      subjectName,
      waUsers_content.userRoleAdmin,
    );
  });

  test("Add a note to a Ready to list case case.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber203 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber203, subjectName);
    await task.removeTask(
      page,
      taskNames_content.issueCaseToRespondentTask,
      subjectName,
      waUsers_content.userRoleAdmin,
    );
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
      caseNumber203,
      subjectName,
    );
    await addNote.addNote(page, false, caseNumber203, subjectName);
  });

  test("Add a note to a awaiting hearing case case.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber204 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber204, subjectName);
    await task.removeTask(
      page,
      taskNames_content.issueCaseToRespondentTask,
      subjectName,
      waUsers_content.userRoleAdmin,
    );
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Hearings: Create listing",
    );
    await createListing.createListing(
      page,
      false,
      true,
      "1-London",
      "Case management",
      "Face to Face",
      "Morning",
      false,
      "East London Tribunal Hearing Centre-2 Clove Crescent, East India Dock London",
      false,
      caseNumber204,
      subjectName,
      false,
    );
    await addNote.addNote(page, false, caseNumber204, subjectName);
  });

  test("Add a note to a awaiting outcome case.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber205 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber205, subjectName);
    await task.removeTask(
      page,
      taskNames_content.issueCaseToRespondentTask,
      subjectName,
      waUsers_content.userRoleAdmin,
    );
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Hearings: Create listing",
    );
    await createListing.createListing(
      page,
      false,
      true,
      "1-London",
      "Case management",
      "Face to Face",
      "Morning",
      false,
      "East London Tribunal Hearing Centre-2 Clove Crescent, East India Dock London",
      false,
      caseNumber205,
      subjectName,
      false,
    );
    await createSummary.createSummary(
      page,
      false,
      "Case management",
      "Face to Face",
      "Morning",
      false,
      "East London Tribunal Hearing Centre-2 Clove Crescent, East India Dock London",
      "East London Tribunal Hearing Centre",
      "Allowed",
      null,
      true,
      false,
      false,
      caseNumber205,
      subjectName,
    );
    await addNote.addNote(page, false, caseNumber205, subjectName);
  });

  test("Add a note to a case closed case. @CaseAPI1", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber206 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber206, subjectName);
    await task.removeTask(
      page,
      taskNames_content.issueCaseToRespondentTask,
      subjectName,
      waUsers_content.userRoleAdmin,
    );
    await commonHelpers.chooseEventFromDropdown(page, events_content.closeCase);
    await closeCase.closeCase(
      page,
      false,
      false,
      "caseWithdrawn",
      false,
      null,
      null,
      caseNumber206,
      subjectName,
      false,
    );
    await addNote.addNote(page, false, caseNumber206, subjectName);
  });
});

test("Accessibility test - Add a note to a case stayed case. @accessibility", async ({
  page,
}): Promise<void> => {
  const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
  const caseNumber207 = await createCase.createCase(
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
  await buildCase.buildCase(page, false, caseNumber207, subjectName);
  await task.removeTask(
    page,
    taskNames_content.issueCaseToRespondentTask,
    subjectName,
    waUsers_content.userRoleAdmin,
  );
  await createEditStay.createEditStay(
    page,
    true,
    false,
    "awaitingACourtJudgement",
    false,
    caseNumber207,
    subjectName,
    states_content.caseStayedState,
    false,
  );
  await addNote.addNote(page, true, caseNumber207, subjectName);
});
