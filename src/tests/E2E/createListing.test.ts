import { test } from "@playwright/test";
import createListing from "../journeys/CaseAPI/createListing.ts";

test.describe("Create hearing listing tests @CaseAPI", (): void => {
  test.only("Create hearing listing as a caseworker in the 'Case management' state. @CaseAPI", async ({
    page,
  }): Promise<void> => {
    await createListing.createListing(
      page,
      "caseWorker",
      false,
      "Case management",
      "Face to Face",
      false,
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
      "Case management",
      "Face to Face",
      true,
      false,
    );
  });

  test("Error messaging. @CaseAPI", async ({ page }): Promise<void> => {
    await createListing.createListing(
      page,
      "caseWorker",
      false,
      "Case management",
      "Face to Face",
      false,
      true,
    );
  });
});
