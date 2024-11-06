import { test } from "@playwright/test";
import waUsers_content from "../fixtures/content/waUsers_content.ts";
import cancelHearing from "../journeys/CaseAPI/cancelHearing.ts";
import createCase from "../journeys/CaseAPI/createCase.ts";
import commonHelpers from "../helpers/commonHelpers.ts";
import events_content from "../fixtures/content/CaseAPI/events_content.ts";
import buildCase from "../journeys/CaseAPI/buildCase.ts";
import createListing from "../journeys/CaseAPI/createListing.ts";

test.describe("Cancel hearing tests @CaseAPI", (): void => {
  test("Cancel hearing - case rejected. @crossbrowserCaseAPI", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber301 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber301, subjectName);
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Hearings: Create listing",
    );
    await createListing.createListing(
      page,
      false,
      true,
      "2-Midlands",
      "Final",
      "Paper",
      "Morning",
      false,
      "Birmingham Civil And Family Justice Centre-Priory Courts, 33 Bull Street",
      false,
      caseNumber301,
      subjectName,
      false,
    );
    await cancelHearing.cancelHearing(
      page,
      false,
      "Case Rejected",
      false,
      caseNumber301,
      subjectName,
    );
  });

  test("Cancel hearing - consent order.", async ({ page }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber302 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber302, subjectName);
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Hearings: Create listing",
    );
    await createListing.createListing(
      page,
      false,
      true,
      "2-Midlands",
      "Final",
      "Paper",
      "Morning",
      false,
      "Birmingham Civil And Family Justice Centre-Priory Courts, 33 Bull Street",
      false,
      caseNumber302,
      subjectName,
      false,
    );
    await cancelHearing.cancelHearing(
      page,
      false,
      "Consent Order received and no time for infill",
      false,
      caseNumber302,
      subjectName,
    );
  });

  test("Cancel hearing - incomplete panel.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber303 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber303, subjectName);
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Hearings: Create listing",
    );
    await createListing.createListing(
      page,
      false,
      true,
      "2-Midlands",
      "Final",
      "Paper",
      "Morning",
      false,
      "Birmingham Civil And Family Justice Centre-Priory Courts, 33 Bull Street",
      false,
      caseNumber303,
      subjectName,
      false,
    );
    await cancelHearing.cancelHearing(
      page,
      false,
      "Incomplete Panel",
      false,
      caseNumber303,
      subjectName,
    );
  });

  test("Cancel hearing - no suitable cases.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber304 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber304, subjectName);
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Hearings: Create listing",
    );
    await createListing.createListing(
      page,
      false,
      true,
      "2-Midlands",
      "Final",
      "Paper",
      "Morning",
      false,
      "Birmingham Civil And Family Justice Centre-Priory Courts, 33 Bull Street",
      false,
      caseNumber304,
      subjectName,
      false,
    );
    await cancelHearing.cancelHearing(
      page,
      false,
      "No suitable cases that are ready to list",
      false,
      caseNumber304,
      subjectName,
    );
  });

  test("Cancel hearing - request for R27.", async ({ page }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber305 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber305, subjectName);
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Hearings: Create listing",
    );
    await createListing.createListing(
      page,
      false,
      true,
      "2-Midlands",
      "Final",
      "Paper",
      "Morning",
      false,
      "Birmingham Civil And Family Justice Centre-Priory Courts, 33 Bull Street",
      false,
      caseNumber305,
      subjectName,
      false,
    );
    await cancelHearing.cancelHearing(
      page,
      false,
      "Request for R27 decision and no time for infill",
      false,
      caseNumber305,
      subjectName,
    );
  });

  test("Cancel hearing - venue unavailable.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber306 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber306, subjectName);
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Hearings: Create listing",
    );
    await createListing.createListing(
      page,
      false,
      true,
      "2-Midlands",
      "Final",
      "Paper",
      "Morning",
      false,
      "Birmingham Civil And Family Justice Centre-Priory Courts, 33 Bull Street",
      false,
      caseNumber306,
      subjectName,
      false,
    );
    await cancelHearing.cancelHearing(
      page,
      false,
      "Venue Unavailable",
      false,
      caseNumber306,
      subjectName,
    );
  });

  test("Error messaging. @crossbrowserCaseAPI", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber307 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber307, subjectName);
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Hearings: Create listing",
    );
    await createListing.createListing(
      page,
      false,
      true,
      "2-Midlands",
      "Final",
      "Paper",
      "Morning",
      false,
      "Birmingham Civil And Family Justice Centre-Priory Courts, 33 Bull Street",
      false,
      caseNumber307,
      subjectName,
      false,
    );
    await cancelHearing.cancelHearing(
      page,
      false,
      "Case Rejected",
      true,
      caseNumber307,
      subjectName,
    );
  });
});

test("Accessibility test - cancel hearing - other @accessibilityCaseAPI. @crossbrowserCaseAPI", async ({
  page,
}): Promise<void> => {
  const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
  const caseNumber308 = await createCase.createCase(
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
  await buildCase.buildCase(page, false, caseNumber308, subjectName);
  await commonHelpers.chooseEventFromDropdown(page, "Hearings: Create listing");
  await createListing.createListing(
    page,
    false,
    true,
    "2-Midlands",
    "Final",
    "Paper",
    "Morning",
    false,
    "Birmingham Civil And Family Justice Centre-Priory Courts, 33 Bull Street",
    false,
    caseNumber308,
    subjectName,
    false,
  );
  await cancelHearing.cancelHearing(
    page,
    true,
    "Other",
    false,
    caseNumber308,
    subjectName,
  );
});
