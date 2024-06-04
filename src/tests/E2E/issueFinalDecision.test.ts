import { test } from "@playwright/test";
import issueFinalDecision from "../journeys/CaseAPI/issueFinalDecision.ts";

test.describe("Issue to respondent tests @CaseAPI", () => {
  test("As a caseworker Issue a case to all parties.", async ({
    page,
  }): Promise<void> => {
    await issueFinalDecision.issueFinalDecision(
      page,
      "caseWorker",
      false,
      false,
      "Create",
      "CIC1 - Eligibility",
      "Final",
    );
  });
});
