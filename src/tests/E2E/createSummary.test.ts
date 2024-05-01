import { test } from "@playwright/test";
import createSummary from "../journeys/CaseAPI/createSummary.ts";

test.describe("Create hearing summary tests @CaseAPI", (): void => {
  test.only("Create hearing summary as a caseworker - hearing outcome is allowed.", async ({
    page,
  }): Promise<void> => {
    await createSummary.createSummary(
      page,
      "caseWorker",
      false,
      true,
      "1-London",
      "Case management",
      "Hybrid",
      "Morning",
      false,
      "Fox Court - London (Central) SSCS Tribunal-4th Floor, Fox Court, 30 Brooke Street, London",
      "Allowed",
      null,
      false,
      false,
    );
  });
});
