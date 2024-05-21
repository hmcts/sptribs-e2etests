import { test } from "@playwright/test";
import editListing from "../journeys/CaseAPI/editListing.ts";

test.describe("Edit hearing listing tests @CaseAPI", (): void => {
  test("Edit hearing listing as a caseworker.", async ({
    page,
  }): Promise<void> => {
    await editListing.editListing(
      page,
      "caseWorker",
      false,
      true,
      "1-London",
      "Case management",
      "Face to Face",
      "Morning",
      false,
      "East London Tribunal Hearing Centre-2 Clove Crescent, East India Dock London",
      false,
    );
  });

  test("Edit hearing listing as a senior caseworker.", async ({
    page,
  }): Promise<void> => {
    await editListing.editListing(
      page,
      "seniorCaseworker",
      false,
      true,
      "11-Scotland",
      "Final",
      "Hybrid",
      "Morning",
      true,
      "Aberdeen Tribunal Hearing Centre-AB1, 48 Huntly Street, Aberdeen, AB10 1SH",
      false,
    );
  });

  test("Edit hearing listing as a hearing centre admin.", async ({
    page,
  }): Promise<void> => {
    await editListing.editListing(
      page,
      "hearingCentreAdmin",
      false,
      true,
      "2-Midlands",
      "Interlocutory",
      "Video",
      "Afternoon",
      false,
      "Birmingham Civil And Family Justice Centre-Priory Courts, 33 Bull Street",
      false,
    );
  });

  test("Edit hearing listing as a hearing centre team leader.", async ({
    page,
  }): Promise<void> => {
    await editListing.editListing(
      page,
      "hearingCentreTeamLead",
      false,
      true,
      "3-North East",
      "Case management",
      "Telephone",
      "All day",
      false,
      "Sheffield Magistrates Court-Castle Street",
      false,
    );
  });

  test("Edit hearing listing as a senior judge.", async ({
    page,
  }): Promise<void> => {
    await editListing.editListing(
      page,
      "seniorJudge",
      false,
      true,
      "5-South East",
      "Interlocutory",
      "Video",
      "Afternoon",
      true,
      "Brighton Tribunal Hearing Centre-City Gate House, 185 Dyke Road",
      false,
    );
  });

  test("Edit hearing listing with no region and venue not listed.", async ({
    page,
  }): Promise<void> => {
    await editListing.editListing(
      page,
      "caseWorker",
      false,
      false,
      null,
      "Case management",
      "Face to Face",
      "Morning",
      false,
      null,
      false,
    );
  });

  test("Edit hearing listing with a region but venue not listed.", async ({
    page,
  }): Promise<void> => {
    await editListing.editListing(
      page,
      "caseWorker",
      false,
      true,
      "2-Midlands",
      "Case management",
      "Face to Face",
      "Morning",
      false,
      null,
      false,
    );
  });

  test("Error messaging.", async ({ page }): Promise<void> => {
    await editListing.editListing(
      page,
      "caseWorker",
      false,
      true,
      "1-London",
      "Case management",
      "Face to Face",
      "Morning",
      false,
      "East London Tribunal Hearing Centre-2 Clove Crescent, East India Dock London",
      true,
    );
  });
});

test("Accessibility test - edit listing @accessibilityCaseAPI", async ({
  page,
}): Promise<void> => {
  await editListing.editListing(
    page,
    "caseWorker",
    true,
    true,
    "1-London",
    "Case management",
    "Face to Face",
    "Morning",
    false,
    "East London Tribunal Hearing Centre-2 Clove Crescent, East India Dock London",
    false,
  );
});
