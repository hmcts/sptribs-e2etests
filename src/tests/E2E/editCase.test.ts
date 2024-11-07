import { test } from "@playwright/test";
import waUsers_content from "../fixtures/content/waUsers_content.ts";
import editCase from "../journeys/CaseAPI/editCase.ts";
import commonHelpers from "../helpers/commonHelpers.ts";
import createCase from "../journeys/CaseAPI/createCase.ts";
import events_content from "../fixtures/content/CaseAPI/events_content.ts";
import buildCase from "../journeys/CaseAPI/buildCase.ts";
import hearingOptions from "../journeys/CaseAPI/hearingOptions.ts";
import createListing from "../journeys/CaseAPI/createListing.ts";
import createSummary from "../journeys/CaseAPI/createSummary.ts";
import testDataCleanUp from "../helpers/testDataCleanUp.ts";

test.describe("Case-API Edit case tests. @CaseAPI", () => {
  test("Check for redundant test data", async ({ page }) => {
    test.setTimeout(20 * 60 * 1000);
    await testDataCleanUp(page, waUsers_content.userRoleAdmin);
  });
  test("Edit Case in State Case management - Assessment - Minor Category, Post Contact", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber1300 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber1300, subjectName);
    await commonHelpers.chooseEventFromDropdown(page, "Case: Edit case");
    await editCase.editCase(
      page,
      false,
      "Case Management",
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
      caseNumber1300,
      subjectName,
    );
  });

  test("Edit case in state Ready to list - Assessment - Paragraph 26 Category, Post Contact", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber1301 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber1301, subjectName);
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
      caseNumber1301,
      subjectName,
    );
    await commonHelpers.chooseEventFromDropdown(page, "Case: Edit case");
    await editCase.editCase(
      page,
      false,
      "Ready to list",
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
      caseNumber1301,
      subjectName,
    );
  });

  test("Edit case in State Awaiting hearing - Assessment - Sexual Abuse Category, Email Contact. @crossbrowserCaseAPI", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber1302 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber1302, subjectName);
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
      caseNumber1302,
      subjectName,
      false,
    );
    await commonHelpers.chooseEventFromDropdown(page, "Case: Edit case");
    await editCase.editCase(
      page,
      false,
      "Awaiting hearing",
      "Assessment",
      "Sexual Abuse",
      true,
      true,
      "Email",
      true,
      "1996",
      "North West",
      true,
      false,
      true,
      false,
      false,
      caseNumber1302,
      subjectName,
    );
  });

  test("Edit Case in state Awaiting outcome - Assessment - Special Jurisdiction Category, Email Contact", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber1303 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber1303, subjectName);
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
      caseNumber1303,
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
      caseNumber1303,
      subjectName,
    );
    await commonHelpers.chooseEventFromDropdown(page, "Case: Edit case");
    await editCase.editCase(
      page,
      false,
      "Awaiting outcome",
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
      caseNumber1303,
      subjectName,
    );
  });
});
