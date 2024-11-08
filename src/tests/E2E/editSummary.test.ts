import { test } from "@playwright/test";
import waUsers_content from "../fixtures/content/waUsers_content.ts";
import createCase from "../journeys/CaseAPI/createCase.ts";
import commonHelpers from "../helpers/commonHelpers.ts";
import events_content from "../fixtures/content/CaseAPI/events_content.ts";
import buildCase from "../journeys/CaseAPI/buildCase.ts";
import createListing from "../journeys/CaseAPI/createListing.ts";
import createSummary from "../journeys/CaseAPI/createSummary.ts";
import editSummary from "../journeys/CaseAPI/editSummary.ts";
import testDataCleanUp from "../helpers/testDataCleanUp.ts";

test.describe("Edit hearing summary tests @CaseAPI", (): void => {
  test("Check for redundant test data", async ({ page }) => {
    test.setTimeout(20 * 60 * 1000);
    await testDataCleanUp(page, waUsers_content.userRoleAdmin);
  });
  test("Edit hearing summary - Case management, hybrid, morning, Fox Court, Allowed.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber1800 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber1800, subjectName);
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
      "Hybrid",
      "Morning",
      false,
      "Fox Court - London (Central) SSCS Tribunal-4th Floor, Fox Court, 30 Brooke Street, London",
      false,
      caseNumber1800,
      subjectName,
      false,
    );
    await createSummary.createSummary(
      page,
      false,
      "Case management",
      "Hybrid",
      "Morning",
      false,
      "Fox Court - London (Central) SSCS Tribunal-4th Floor, Fox Court, 30 Brooke Street, London",
      "Fox Court",
      "Allowed",
      null,
      true,
      false,
      false,
      caseNumber1800,
      subjectName,
    );
    await editSummary.editSummary(
      page,
      false,
      "Case management",
      "Hybrid",
      "Morning",
      false,
      "Fox Court - London (Central) SSCS Tribunal-4th Floor, Fox Court, 30 Brooke Street, London",
      "Fox Court",
      "Allowed",
      null,
      true,
      false,
      caseNumber1800,
      subjectName,
    );
  });

  test("Edit hearing summary - Final, Face to face, all day, Fox Court, Refused.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber1801 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber1801, subjectName);
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
      "Hybrid",
      "Morning",
      false,
      "Fox Court - London (Central) SSCS Tribunal-4th Floor, Fox Court, 30 Brooke Street, London",
      false,
      caseNumber1801,
      subjectName,
      false,
    );
    await createSummary.createSummary(
      page,
      false,
      "Case management",
      "Hybrid",
      "Morning",
      false,
      "Fox Court - London (Central) SSCS Tribunal-4th Floor, Fox Court, 30 Brooke Street, London",
      "Fox Court",
      "Allowed",
      null,
      true,
      false,
      false,
      caseNumber1801,
      subjectName,
    );
    await editSummary.editSummary(
      page,
      false,
      "Final",
      "Face to Face",
      "All day",
      false,
      "Fox Court - London (Central) SSCS Tribunal-4th Floor, Fox Court, 30 Brooke Street, London",
      "Fox Court",
      "Refused",
      null,
      true,
      false,
      caseNumber1801,
      subjectName,
    );
  });

  test("Edit hearing summary - Interlocutory, Video, Afternoon, Fox Court, Withdrawn at hearing.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber1802 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber1802, subjectName);
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
      "Hybrid",
      "Morning",
      false,
      "Fox Court - London (Central) SSCS Tribunal-4th Floor, Fox Court, 30 Brooke Street, London",
      false,
      caseNumber1802,
      subjectName,
      false,
    );
    await createSummary.createSummary(
      page,
      false,
      "Case management",
      "Hybrid",
      "Morning",
      false,
      "Fox Court - London (Central) SSCS Tribunal-4th Floor, Fox Court, 30 Brooke Street, London",
      "Fox Court",
      "Allowed",
      null,
      true,
      false,
      false,
      caseNumber1802,
      subjectName,
    );
    await editSummary.editSummary(
      page,
      false,
      "Interlocutory",
      "Video",
      "Afternoon",
      true,
      "Fox Court - London (Central) SSCS Tribunal-4th Floor, Fox Court, 30 Brooke Street, London",
      "Fox Court",
      "Withdrawn at Hearing",
      null,
      true,
      false,
      caseNumber1802,
      subjectName,
    );
  });

  test("Edit hearing summary - Case Management, Telephone, Morning, Fox Court, Adjourned, Admin Error.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber1803 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber1803, subjectName);
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
      "Hybrid",
      "Morning",
      false,
      "Fox Court - London (Central) SSCS Tribunal-4th Floor, Fox Court, 30 Brooke Street, London",
      false,
      caseNumber1803,
      subjectName,
      false,
    );
    await createSummary.createSummary(
      page,
      false,
      "Case management",
      "Hybrid",
      "Morning",
      false,
      "Fox Court - London (Central) SSCS Tribunal-4th Floor, Fox Court, 30 Brooke Street, London",
      "Fox Court",
      "Allowed",
      null,
      true,
      false,
      false,
      caseNumber1803,
      subjectName,
    );
    await editSummary.editSummary(
      page,
      false,
      "Case management",
      "Telephone",
      "Morning",
      false,
      "Fox Court - London (Central) SSCS Tribunal-4th Floor, Fox Court, 30 Brooke Street, London",
      "Fox Court",
      "Adjourned",
      "Admin error",
      false,
      false,
      caseNumber1803,
      subjectName,
    );
  });

  test("Edit hearing summary - Case Management, Paper, Morning, Fox Court, Adjourned, Other.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber1804 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber1804, subjectName);
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
      "Hybrid",
      "Morning",
      false,
      "Fox Court - London (Central) SSCS Tribunal-4th Floor, Fox Court, 30 Brooke Street, London",
      false,
      caseNumber1804,
      subjectName,
      false,
    );
    await createSummary.createSummary(
      page,
      false,
      "Case management",
      "Hybrid",
      "Morning",
      false,
      "Fox Court - London (Central) SSCS Tribunal-4th Floor, Fox Court, 30 Brooke Street, London",
      "Fox Court",
      "Allowed",
      null,
      true,
      false,
      false,
      caseNumber1804,
      subjectName,
    );
    await editSummary.editSummary(
      page,
      false,
      "Case management",
      "Paper",
      "Morning",
      false,
      "Fox Court - London (Central) SSCS Tribunal-4th Floor, Fox Court, 30 Brooke Street, London",
      "Fox Court",
      "Adjourned",
      "Other",
      true,
      false,
      caseNumber1804,
      subjectName,
    );
  });

  test("Edit hearing summary - Error Messaging. @crossbrowserCaseAPI", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber1805 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber1805, subjectName);
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
      "Hybrid",
      "Morning",
      false,
      "Fox Court - London (Central) SSCS Tribunal-4th Floor, Fox Court, 30 Brooke Street, London",
      false,
      caseNumber1805,
      subjectName,
      false,
    );
    await createSummary.createSummary(
      page,
      false,
      "Case management",
      "Hybrid",
      "Morning",
      false,
      "Fox Court - London (Central) SSCS Tribunal-4th Floor, Fox Court, 30 Brooke Street, London",
      "Fox Court",
      "Allowed",
      null,
      true,
      false,
      false,
      caseNumber1805,
      subjectName,
    );
    await editSummary.editSummary(
      page,
      false,
      "Case management",
      "Hybrid",
      "Morning",
      false,
      "Fox Court - London (Central) SSCS Tribunal-4th Floor, Fox Court, 30 Brooke Street, London",
      "Fox Court",
      "Allowed",
      null,
      true,
      true,
      caseNumber1805,
      subjectName,
    );
  });
});

test("Accessibility test - edit summary @accessibilityCaseAPI", async ({
  page,
}): Promise<void> => {
  const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
  const caseNumber1806 = await createCase.createCase(
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
  await buildCase.buildCase(page, false, caseNumber1806, subjectName);
  await commonHelpers.chooseEventFromDropdown(page, "Hearings: Create listing");
  await createListing.createListing(
    page,
    false,
    true,
    "1-London",
    "Case management",
    "Hybrid",
    "Morning",
    false,
    "Fox Court - London (Central) SSCS Tribunal-4th Floor, Fox Court, 30 Brooke Street, London",
    false,
    caseNumber1806,
    subjectName,
    false,
  );
  await createSummary.createSummary(
    page,
    false,
    "Case management",
    "Hybrid",
    "Morning",
    false,
    "Fox Court - London (Central) SSCS Tribunal-4th Floor, Fox Court, 30 Brooke Street, London",
    "Fox Court",
    "Allowed",
    null,
    true,
    false,
    false,
    caseNumber1806,
    subjectName,
  );
  await editSummary.editSummary(
    page,
    true,
    "Case management",
    "Hybrid",
    "Morning",
    false,
    "Fox Court - London (Central) SSCS Tribunal-4th Floor, Fox Court, 30 Brooke Street, London",
    "Fox Court",
    "Allowed",
    null,
    true,
    true,
    caseNumber1806,
    subjectName,
  );
});
