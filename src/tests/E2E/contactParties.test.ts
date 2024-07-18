import { test } from "@playwright/test";
import contactParties from "../journeys/CaseAPI/contactParties.ts";

test.describe("Case-API Contact parties tests. @CaseAPI", () => {
  test("Contact all case related parties as a caseworker.", async ({
    page,
  }): Promise<void> => {
    await contactParties.contactParties(page, "caseWorker", false, "Withdrawn");
  });
});
