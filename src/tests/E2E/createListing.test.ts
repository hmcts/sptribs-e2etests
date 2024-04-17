import { test } from "@playwright/test";
import createListing from "../journeys/CaseAPI/createListing.ts";

test.describe("Create hearing listing tests @CaseAPI", (): void => {
  test("Create hearing listing as a caseworker in the 'Case management' state. @CaseAPI", async ({
    page,
  }): Promise<void> => {
    await createListing.createListing(
      page,
      "caseWorker",
      false,
      true,
      "1-London",
      "Case management",
      "Face to Face",
      "Morning",
      false,
      false,
      "East London Tribunal Hearing Centre-2 Clove Crescent, East India Dock London",
      false,
    );
  });

  test("Create hearing listing as a senior caseworker in Scotland for a Final hearing. @CaseAPI", async ({
    page,
  }): Promise<void> => {
    await createListing.createListing(
      page,
      "seniorCaseworker",
      false,
      true,
      "11-Scotland",
      "Final",
      "Hybrid",
      "Morning",
      true,
      false,
      "Aberdeen Tribunal Hearing Centre-AB1, 48 Huntly Street, Aberdeen, AB10 1SH",
      false,
    );
  });

  test("Create hearing listing as a hearing centre admin in the Midlands for an Interlocutory hearing. @CaseAPI", async ({
    page,
  }): Promise<void> => {
    await createListing.createListing(
      page,
      "hearingCentreAdmin",
      false,
      true,
      "2-Midlands",
      "Interlocutory",
      "Video",
      "Afternoon",
      false,
      false,
      "Birmingham Civil And Family Justice Centre-Priory Courts, 33 Bull Street",
      false,
    );
  });

  test("Create hearing listing as a hearing centre team leader in the North East for a Case management hearing. @CaseAPI", async ({
    page,
  }): Promise<void> => {
    await createListing.createListing(
      page,
      "hearingCentreTeamLead",
      true,
      true,
      "3-North East",
      "Case management",
      "Telephone",
      "All day",
      false,
      false,
      "Sheffield Magistrates Court-Castle Street",
      false,
    );
  });

  test("Create hearing listing as a caseworker in the North West for a Final hearing with Paper format. @CaseAPI", async ({
    page,
  }): Promise<void> => {
    await createListing.createListing(
      page,
      "caseWorker",
      false,
      true,
      "4-North West",
      "Final",
      "Paper",
      "Morning",
      false,
      false,
      "Liverpool Civil And Family Court-Vernon Street, City Square",
      false,
    );
  });

  test("Create hearing listing as a senior judge in the South East for an Interlocutory hearing across multiple days. @CaseAPI", async ({
    page,
  }): Promise<void> => {
    await createListing.createListing(
      page,
      "seniorJudge",
      false,
      true,
      "5-South East",
      "Interlocutory",
      "Video",
      "Afternoon",
      true,
      false,
      "Brighton Tribunal Hearing Centre-City Gate House, 185 Dyke Road",
      false,
    );
  });

  test("Create hearing listing as a hearing centre admin in the South West for a Case management hearing. @CaseAPI", async ({
    page,
  }): Promise<void> => {
    await createListing.createListing(
      page,
      "hearingCentreAdmin",
      true,
      true,
      "6-South West",
      "Case management",
      "Hybrid",
      "All day",
      false,
      false,
      "Bristol Magistrates Court-Marlborough Street, Bristol, BS1 3NU",
      false,
    );
  });

  test("Create hearing listing as a hearing centre team lead in Wales for a Final hearing with Telephone format. @CaseAPI", async ({
    page,
  }): Promise<void> => {
    await createListing.createListing(
      page,
      "hearingCentreTeamLead",
      false,
      true,
      "7-Wales",
      "Final",
      "Telephone",
      "Morning",
      false,
      false,
      "Cardiff Social Security And Child Support Tribunal-Cardiff Eastgate House, 35-43, Newport Road",
      false,
    );
  });

  test("Create hearing listing in the 'Ready to list' state. @CaseAPI", async ({
    page,
  }): Promise<void> => {
    await createListing.createListing(
      page,
      "caseWorker",
      false,
      true,
      "1-London",
      "Case management",
      "Face to Face",
      "Morning",
      false,
      true,
      "Fox Court - London (Central) SSCS Tribunal-4th Floor, Fox Court, 30 Brooke Street, London",
      false,
    );
  });

  test("Create hearing listing with the hearing across multiple days. @CaseAPI", async ({
    page,
  }): Promise<void> => {
    await createListing.createListing(
      page,
      "caseWorker",
      false,
      true,
      "1-London",
      "Case management",
      "Face to Face",
      "Morning",
      true,
      false,
      "East London Tribunal Hearing Centre-2 Clove Crescent, East India Dock London",
      false,
    );
  });

  test("Create hearing listing with no region and venue not listed. @CaseAPI", async ({
    page,
  }): Promise<void> => {
    await createListing.createListing(
      page,
      "caseWorker",
      false,
      false,
      null,
      "Case management",
      "Face to Face",
      "Morning",
      false,
      false,
      null,
      false,
    );
  });

  test("Error messaging. @CaseAPI", async ({ page }): Promise<void> => {
    await createListing.createListing(
      page,
      "caseWorker",
      false,
      true,
      "1-London",
      "Case management",
      "Face to Face",
      "Morning",
      false,
      false,
      "East London Tribunal Hearing Centre-2 Clove Crescent, East India Dock London",
      true,
    );
  });
});
