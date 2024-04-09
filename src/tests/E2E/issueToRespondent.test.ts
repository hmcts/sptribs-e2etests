import { test } from "@playwright/test";
import issueToRespondent from "../journeys/CaseAPI/issueToRespondent.ts";

test.describe("Issue to respondent tests", () => {
  test("Create and build case as a caseworker", async ({ page }) => {
    await issueToRespondent.issueToRespondent(
      page,
      "caseWorker",
      true,
      "Assessment",
      "Other",
      true,
      true,
      "Email",
      true,
      false,
      "1996",
      "Scotland",
      true,
      true,
      true,
      true,
      true,
      false,
    );
  });
});
