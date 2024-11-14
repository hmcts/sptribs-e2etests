import { test } from "@playwright/test";
import waUsers_content from "../fixtures/content/waUsers_content.ts";
import events_content from "../fixtures/content/CaseAPI/events_content.ts";
import states_content from "../fixtures/content/states_content.ts";
import commonHelpers from "../helpers/commonHelpers.ts";
import contactParties from "../journeys/CaseAPI/contactParties.ts";
import createCase from "../journeys/CaseAPI/createCase.ts";
import buildCase from "../journeys/CaseAPI/buildCase.ts";
import hearingOptions from "../journeys/CaseAPI/hearingOptions.ts";
import createListing from "../journeys/CaseAPI/createListing.ts";
import createSummary from "../journeys/CaseAPI/createSummary.ts";
import closeCase from "../journeys/CaseAPI/closeCase.ts";
import createEditStay from "../journeys/CaseAPI/createEditStay.ts";

test.describe("Case-API Contact parties tests. @CaseAPI @CaseAPI1", () => {
  test("Send a message to all parties related to a closed case.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2500 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber2500, subjectName);
    await commonHelpers.chooseEventFromDropdown(page, events_content.closeCase);
    await closeCase.closeCase(
      page,
      false,
      false,
      "caseWithdrawn",
      false,
      null,
      null,
      caseNumber2500,
      subjectName,
      false,
    );
    await commonHelpers.chooseEventFromDropdown(page, "Case: Contact parties");
    await contactParties.contactParties(
      page,
      waUsers_content.userRoleAdmin,
      false,
      false,
      caseNumber2500,
      subjectName,
      false,
    );
  });

  test("Send a message to all parties related to a case that is stayed.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2501 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber2501, subjectName);
    await createEditStay.createEditStay(
      page,
      true,
      false,
      "awaitingACourtJudgement",
      false,
      caseNumber2501,
      subjectName,
      states_content.caseStayedState,
      false,
    );
    await commonHelpers.chooseEventFromDropdown(page, "Case: Contact parties");
    await contactParties.contactParties(
      page,
      waUsers_content.userRoleAdmin,
      false,
      false,
      caseNumber2501,
      subjectName,
      false,
    );
  });

  test("Send a message to all parties related to a submitted case. ", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2502 = await createCase.createCase(
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
    await commonHelpers.chooseEventFromDropdown(page, "Case: Contact parties");
    await contactParties.contactParties(
      page,
      waUsers_content.userRoleAdmin,
      false,
      false,
      caseNumber2502,
      subjectName,
      false,
    );
  });

  test("Send a message to all parties related to a case in Ready to list.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2503 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber2503, subjectName);
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
      caseNumber2503,
      subjectName,
    );
    await commonHelpers.chooseEventFromDropdown(page, "Case: Contact parties");
    await contactParties.contactParties(
      page,
      waUsers_content.userRoleAdmin,
      false,
      false,
      caseNumber2503,
      subjectName,
      false,
    );
  });

  test("Send a message to all parties related to a case that is awaiting a hearing.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2504 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber2504, subjectName);
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
      caseNumber2504,
      subjectName,
      false,
    );
    await commonHelpers.chooseEventFromDropdown(page, "Case: Contact parties");
    await contactParties.contactParties(
      page,
      waUsers_content.userRoleAdmin,
      false,
      false,
      caseNumber2504,
      subjectName,
      false,
    );
  });
  test("Send a message to all parties related to a case that is awaiting an outcome decision. @crossbrowserCaseAPI", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2505 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber2505, subjectName);
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
      caseNumber2505,
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
      caseNumber2505,
      subjectName,
    );
    await commonHelpers.chooseEventFromDropdown(page, "Case: Contact parties");
    await contactParties.contactParties(
      page,
      waUsers_content.userRoleAdmin,
      false,
      false,
      caseNumber2505,
      subjectName,
      false,
    );
  });
});
