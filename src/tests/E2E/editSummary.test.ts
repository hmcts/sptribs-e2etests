import { test } from "@playwright/test";
import editSummary from "../journeys/CaseAPI/editSummary.ts";

test.describe("Edit hearing summary tests @CaseAPI", (): void => {
  test("Edit hearing summary as a caseworker. @crossbrowserCaseAPI", async ({
    page,
  }): Promise<void> => {
    await editSummary.editSummary(
      page,
      "caseWorker",
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
    );
  });

  test("Edit hearing summary as a senior caseworker.", async ({
    page,
  }): Promise<void> => {
    await editSummary.editSummary(
      page,
      "seniorCaseworker",
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
    );
  });

  test("Edit hearing summary as a hearing centre admin.", async ({
    page,
  }): Promise<void> => {
    await editSummary.editSummary(
      page,
      "hearingCentreAdmin",
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
    );
  });

  test("Edit hearing summary as a hearing centre team leader.", async ({
    page,
  }): Promise<void> => {
    await editSummary.editSummary(
      page,
      "hearingCentreTeamLead",
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
    );
  });

  test("Edit hearing summary as a senior judge.", async ({
    page,
  }): Promise<void> => {
    await editSummary.editSummary(
      page,
      "seniorJudge",
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
    );
  });

  test("Error messaging. @crossbrowserCaseAPI", async ({
    page,
  }): Promise<void> => {
    await editSummary.editSummary(
      page,
      "caseWorker",
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
    );
  });
});

test("Accessibility test - edit summary @accessibilityCaseAPI", async ({
  page,
}): Promise<void> => {
  await editSummary.editSummary(
    page,
    "caseWorker",
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
    false,
  );
});
