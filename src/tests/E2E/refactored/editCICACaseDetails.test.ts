import { test } from "@playwright/test";
import editCICACaseDetails from "../../journeys/WA/editCICACaseDetails.ts";
import commonHelpers from "../../helpers/commonHelpers.ts";
import createCase from "../../journeys/WA/createCase.ts";
import events_content from "../../fixtures/content/CaseAPI/events_content.ts";
import buildCase from "../../journeys/WA/buildCase.ts";
import task from "../../journeys/WA/task.ts";
import createListing from "../../journeys/WA/createListing.ts";
import createSummary from "../../journeys/WA/createSummary.ts";
import closeCase from "../../journeys/WA/closeCase.ts";
import createEditStay from "../../journeys/WA/createEditStay.ts";

const userRoleAdmin = "waHearingCentreAdmin";
const taskRemovedIssueCase = " Issue Case To Respondent ";
const stateCaseStayed = "Case Status:  Case stayed";

test.describe("Edit CICA case details tests @CaseAPI @crossbrowserCaseAPI", (): void => {
  test("Edit CICA case details as a respondent - case management.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber1400 = await createCase.createCase(
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
    console.log(`Case Number : ${caseNumber1400}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber1400, subjectName);
    await task.removeTask(page, taskRemovedIssueCase, subjectName);
    await editCICACaseDetails.editCICACaseDetails(
      page,
      false,
      caseNumber1400,
      subjectName,
    );
  });

  test("Edit CICA case details as a respondent - awaiting hearing.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber1401 = await createCase.createCase(
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
    console.log(`Case Number : ${caseNumber1401}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber1401, subjectName);
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
      caseNumber1401,
      subjectName,
    );
    await editCICACaseDetails.editCICACaseDetails(
      page,
      false,
      caseNumber1401,
      subjectName,
    );
  });

  test("Edit CICA case details as a respondent - awaiting outcome.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber1402 = await createCase.createCase(
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
    console.log(`Case Number : ${caseNumber1402}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber1402, subjectName);
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
      caseNumber1402,
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
      caseNumber1402,
      subjectName,
    );
    await editCICACaseDetails.editCICACaseDetails(
      page,
      false,
      caseNumber1402,
      subjectName,
    );
  });

  test("Edit CICA case details as a respondent - case stayed.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber1403 = await createCase.createCase(
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
    console.log(`Case Number : ${caseNumber1403}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber1403, subjectName);
    await task.removeTask(page, taskRemovedIssueCase, subjectName);
    await createEditStay.createEditStay(
      page,
      true,
      false,
      "awaitingACourtJudgement",
      false,
      caseNumber1403,
      subjectName,
      stateCaseStayed,
    );
    await editCICACaseDetails.editCICACaseDetails(
      page,
      false,
      caseNumber1403,
      subjectName,
    );
  });
});

test("Accessibility test - edit CICA case details - case closed @accessibilityCaseAPI. @crossbrowserCaseAPI", async ({
  page,
}): Promise<void> => {
  const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
  const caseNumber1404 = await createCase.createCase(
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
  console.log(`Case Number : ${caseNumber1404}`);
  await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
  await buildCase.buildCase(page, false, caseNumber1404, subjectName);
  await commonHelpers.chooseEventFromDropdown(page, events_content.closeCase);
  await closeCase.closeCase(
    page,
    false,
    false,
    "caseWithdrawn",
    false,
    null,
    null,
    caseNumber1404,
    subjectName,
  );
  await editCICACaseDetails.editCICACaseDetails(
    page,
    true,
    caseNumber1404,
    subjectName,
  );
});
