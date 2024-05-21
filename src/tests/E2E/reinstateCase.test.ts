import { test } from "@playwright/test";
import reinstateCase from "../journeys/CaseAPI/reinstateCase.ts";

test.describe("Case-API Close Reinstate case tests. @CaseAPI", () => {
  test("Reinstate a case as a caseworker.", async ({ page }): Promise<void> => {
    await reinstateCase.reinstateCase(page, "caseWorker", false, false);
  });
});
