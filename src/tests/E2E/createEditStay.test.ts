import { test } from "@playwright/test";
import createEditStay from "../journeys/CaseAPI/createEditStay.ts";

test.describe("Case-API Create/edit stay tests. @CaseAPI", () => {
  test("Stay a case management case for reason <> as a caseworker.", async ({
    page,
  }): Promise<void> => {
    await createEditStay.createEditStay(
      page,
      false,
      "Case Management",
      "caseWorker",
    );
  });
});
