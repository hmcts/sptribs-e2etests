import { test } from "@playwright/test";
import hearingOptions from "../journeys/CaseAPI/hearingOptions.ts";

test.describe("Create hearing options tests @CaseAPI", (): void => {
  test("Create hearing options in the 'Case management' state. @CaseAPI", async ({
    page,
  }): Promise<void> => {
    await hearingOptions.hearingOptions(
      page,
      "caseWorker",
      false,
      "Assessment",
      "Other",
      true,
      true,
      "Email",
      true,
      true,
      "1996",
      "Scotland",
      true,
      true,
      true,
      true,
      true,
      true,
      "1-London",
      true,
      false,
      "Face to Face",
      false,
      false,
    );
  });

  test("Create hearing options with no region and no venue in the 'Case management' state. @CaseAPI", async ({
    page,
  }): Promise<void> => {
    await hearingOptions.hearingOptions(
      page,
      "caseWorker",
      false,
      "Assessment",
      "Other",
      true,
      true,
      "Email",
      true,
      true,
      "1996",
      "Scotland",
      true,
      true,
      true,
      true,
      true,
      false,
      null,
      false,
      false,
      "Face to Face",
      false,
      false,
    );
  });

  test("Create hearing options with no region and venue not listed in the 'Case management' state. @CaseAPI", async ({
    page,
  }): Promise<void> => {
    await hearingOptions.hearingOptions(
      page,
      "caseWorker",
      false,
      "Assessment",
      "Other",
      true,
      true,
      "Email",
      true,
      true,
      "1996",
      "Scotland",
      true,
      true,
      true,
      true,
      true,
      false,
      null,
      false,
      true,
      "Face to Face",
      false,
      false,
    );
  });

  test("Create hearing options with a region but venue not listed in the 'Case management' state. @CaseAPI", async ({
    page,
  }): Promise<void> => {
    await hearingOptions.hearingOptions(
      page,
      "caseWorker",
      false,
      "Assessment",
      "Other",
      true,
      true,
      "Email",
      true,
      true,
      "1996",
      "Scotland",
      true,
      true,
      true,
      true,
      true,
      true,
      "1-London",
      false,
      true,
      "Face to Face",
      false,
      false,
    );
  });

  test("Edit hearing options in the 'Ready to list' state. @CaseAPI", async ({
    page,
  }): Promise<void> => {
    await hearingOptions.hearingOptions(
      page,
      "caseWorker",
      false,
      "Assessment",
      "Other",
      true,
      true,
      "Email",
      true,
      true,
      "1996",
      "Scotland",
      true,
      true,
      true,
      true,
      true,
      true,
      "1-London",
      true,
      false,
      "Face to Face",
      false,
      true,
    );
  });
});

test("Accessibility test @accessibilityCaseAPI", async ({
  page,
}): Promise<void> => {
  await hearingOptions.hearingOptions(
    page,
    "caseWorker",
    true,
    "Assessment",
    "Other",
    true,
    true,
    "Email",
    true,
    true,
    "1996",
    "Scotland",
    true,
    true,
    true,
    true,
    true,
    true,
    "1-London",
    true,
    false,
    "Face to Face",
    false,
    false,
  );
});
