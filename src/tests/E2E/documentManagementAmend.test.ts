import { test } from "@playwright/test";
import documentManagementAmend from "../journeys/CaseAPI/documentManagementAmend.ts";

test.describe("Case-API Upload document tests. @CaseAPI", () => {
  test("Amend documents uploaded to a submitted case as a caseworker. @crossbrowserCaseAPI", async ({
    page,
  }): Promise<void> => {
    await documentManagementAmend.documentManagementAmend(
      page,
      "caseWorker",
      false,
      "Submitted",
      false,
      false,
    );
  });
});
