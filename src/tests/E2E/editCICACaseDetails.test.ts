import { test } from "@playwright/test";
import waUsers_content from "../fixtures/content/waUsers_content.ts";
import states_content from "../fixtures/content/states_content.ts";
import editCICACaseDetails from "../journeys/CaseAPI/editCICACaseDetails.ts";
import commonHelpers from "../helpers/commonHelpers.ts";
import createCase from "../journeys/CaseAPI/createCase.ts";
import events_content from "../fixtures/content/CaseAPI/events_content.ts";
import buildCase from "../journeys/CaseAPI/buildCase.ts";
import createListing from "../journeys/CaseAPI/createListing.ts";
import createSummary from "../journeys/CaseAPI/createSummary.ts";
import closeCase from "../journeys/CaseAPI/closeCase.ts";
import createEditStay from "../journeys/CaseAPI/createEditStay.ts";
import testDataCleanUp from "../helpers/testDataCleanUp.ts";

test.describe("Edit CICA case details tests @CaseAPI @CaseAPI3", (): void => {
  test("Check for redundant test data", async ({ page }) => {
    await testDataCleanUp(page, waUsers_content.userRoleAdmin);
  });

  test("Edit CICA case details as a respondent - case management.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber1400 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber1400, subjectName);
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
    await buildCase.buildCase(page, false, caseNumber1401, subjectName);
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
      false,
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
    await buildCase.buildCase(page, false, caseNumber1402, subjectName);
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
    await buildCase.buildCase(page, false, caseNumber1403, subjectName);
    await createEditStay.createEditStay(
      page,
      false,
      false,
      "awaitingACourtJudgement",
      false,
      caseNumber1403,
      subjectName,
      states_content.caseStayedState,
      false,
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
    false,
  );
  await editCICACaseDetails.editCICACaseDetails(
    page,
    true,
    caseNumber1404,
    subjectName,
  );
});
