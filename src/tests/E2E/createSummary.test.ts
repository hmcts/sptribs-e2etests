import { test } from "@playwright/test";
import createSummary from "../journeys/CaseAPI/createSummary.ts";

test.describe("Create hearing summary tests @CaseAPI", (): void => {
  test.only("Create hearing summary as a caseworker.", async ({
    page,
  }): Promise<void> => {
    await createSummary.createSummary(
      page,
      "caseWorker",
      "Allowed",
      null,
      false,
      false,
    );
  });
});
