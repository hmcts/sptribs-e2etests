import { test } from "@playwright/test";
import hearingOptions from "../journeys/CaseAPI/hearingOptions.ts";

test.describe("Create hearing options tests @CaseAPI", (): void => {
  test("Create hearing options in the 'Case management' state.", async ({
    page,
  }): Promise<void> => {
    await hearingOptions.hearingOptions(
      page,
      "caseWorker",
      false,
      true,
      "1-London",
      true,
      false,
      "Face to Face",
      false,
      false,
    );
  });

  test("Create hearing options with no region and no venue in the 'Case management' state.", async ({
    page,
  }): Promise<void> => {
    await hearingOptions.hearingOptions(
      page,
      "caseWorker",
      false,
      false,
      null,
      false,
      false,
      "Face to Face",
      false,
      false,
    );
  });

  test("Create hearing options with no region and venue not listed in the 'Case management' state.", async ({
    page,
  }): Promise<void> => {
    await hearingOptions.hearingOptions(
      page,
      "caseWorker",
      false,
      false,
      null,
      false,
      true,
      "Face to Face",
      false,
      false,
    );
  });

  test("Create hearing options with a region but venue not listed in the 'Case management' state.", async ({
    page,
  }): Promise<void> => {
    await hearingOptions.hearingOptions(
      page,
      "caseWorker",
      false,
      true,
      "1-London",
      false,
      true,
      "Face to Face",
      false,
      false,
    );
  });

  test("Edit hearing options in the 'Ready to list' state.", async ({
    page,
  }): Promise<void> => {
    await hearingOptions.hearingOptions(
      page,
      "caseWorker",
      false,
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
    true,
    "1-London",
    true,
    false,
    "Face to Face",
    false,
    false,
  );
});
