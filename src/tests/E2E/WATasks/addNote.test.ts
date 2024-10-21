import { test } from "@playwright/test";
import createFEApplication from "../../journeys/WA/DSSCreateCase/createCase.ts";
import createCase from "../../journeys/WA/createCase.ts";
import buildCase from "../../journeys/WA/buildCase.ts";
import events_content from "../../fixtures/content/CaseAPI/events_content.ts";
import commonHelpers from "../../helpers/commonHelpers.ts";
import addNote from "../../journeys/WA/addNote.ts";
import config from "../../config.ts";
import task from "../../journeys/WA/task.ts";
import hearingOptions from "../../journeys/WA/hearingOptions.ts";
import createListing from "../../journeys/WA/createListing.ts";
import createSummary from "../../journeys/WA/createSummary.ts";
import closeCase from "../../journeys/WA/closeCase.ts";
import createEditStay from "../../journeys/WA/createEditStay.ts";

const userRoleAdmin = "waHearingCentreAdmin";
const taskRemovedNewCase = "Register New Case";
const taskRemovedIssueCase = " Issue Case To Respondent ";
const randomLetters = Array.from({ length: 5 }, () =>
  String.fromCharCode(65 + Math.floor(Math.random() * 26)),
).join("");

test.describe("Case-API Add note tests. @CaseAPI", () => {
  if (!config.skipDSSCreateTests) {
    test("Add a note to a DSS-submitted case. @crossbrowserCaseAPI", async ({
      page,
    }): Promise<void> => {
      const subjectName = `Subject AutoTesting${randomLetters}`;
      const caseNumber200 = await createFEApplication.createFEApplication(
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
      console.log(`Case Number : ${caseNumber200}`);
      await commonHelpers.signOutAndGoToCase(
        page,
        userRoleAdmin,
        config.CaseAPIBaseURL,
        caseNumber200,
      );
      await addNote.addNote(page, false, caseNumber200, subjectName);
      await task.removeTask(page, taskRemovedNewCase, subjectName);
    });
  }

  test("Add a note to a Submitted case case. @crossbrowserCaseAPI", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${randomLetters}`;
    const caseNumber201 = await createCase.createCase(
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
    console.log(`Case Number : ${caseNumber201}`);
    await addNote.addNote(page, false, caseNumber201, subjectName);
  });

  test("Add a note to a Case management case case. @crossbrowserCaseAPI", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${randomLetters}`;
    const caseNumber202 = await createCase.createCase(
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
    console.log(`Case Number : ${caseNumber202}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber202, subjectName);
    await task.removeTask(page, taskRemovedIssueCase, subjectName);
    await addNote.addNote(page, false, caseNumber202, subjectName);
  });

  test("Add a note to a Ready to list case case. @crossbrowserCaseAPI", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${randomLetters}`;
    const caseNumber203 = await createCase.createCase(
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
    console.log(`Case Number : ${caseNumber203}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber203, subjectName);
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
    );
    await addNote.addNote(page, false, caseNumber203, subjectName);
    await task.removeTask(page, taskRemovedIssueCase, subjectName);
  });

  test("Add a note to a awaiting hearing case case. @crossbrowserCaseAPI", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${randomLetters}`;
    const caseNumber204 = await createCase.createCase(
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
    console.log(`Case Number : ${caseNumber204}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber204, subjectName);
    await task.removeTask(page, taskRemovedIssueCase, subjectName);
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
    );
    await addNote.addNote(page, false, caseNumber204, subjectName);
  });

  test("Add a note to a awaiting outcome case. @crossbrowserCaseAPI", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${randomLetters}`;
    const caseNumber205 = await createCase.createCase(
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
    console.log(`Case Number : ${caseNumber205}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber205, subjectName);
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
    await task.removeTask(page, taskRemovedIssueCase, subjectName);
  });

  test("Add a note to a case closed case. @crossbrowserCaseAPI", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${randomLetters}`;
    const caseNumber206 = await createCase.createCase(
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
    console.log(`Case Number : ${caseNumber206}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber206, subjectName);
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
    );
    await addNote.addNote(page, false, caseNumber206, subjectName);
  });
});

test("Accessibility test - Add a note to a case stayed case. @crossbrowserCaseAPI", async ({
  page,
}): Promise<void> => {
  const subjectName = `Subject AutoTesting${randomLetters}`;
  const caseNumber207 = await createCase.createCase(
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
  console.log(`Case Number : ${caseNumber207}`);
  await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
  await buildCase.buildCase(page, false, caseNumber207, subjectName);
  await createEditStay.createEditStay(
    page,
    true,
    false,
    "awaitingACourtJudgement",
    false,
    caseNumber207,
    subjectName,
  );
  await addNote.addNote(page, true, caseNumber207, subjectName);
  await task.removeTask(page, taskRemovedIssueCase, subjectName);
});