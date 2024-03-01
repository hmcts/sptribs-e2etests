import { test } from "@playwright/test";
import createCase from "../journeys/CaseAPI/createCase.ts";
import { allEvents } from "../helpers/commonHelpers.ts";
import buildCase from "../journeys/CaseAPI/buildCase.ts";

test.describe("Create hearing options tests @CaseAPI", (): void => {
  test("Create hearing options in the 'Case management' state. @CaseAPI", async ({
    page,
  }): Promise<void> => {
    let previousEvents1: allEvents[] = [];
    let eventTimes1: string[] = []; // Only checking for one of both as the second is covered by this code.
    const caseNumber1: string = await createCase.createCase(
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
    );
    await createCase.verifyDetails(
      page,
      "caseWorker",
      true,
      caseNumber1,
      previousEvents1,
      eventTimes1,
    );
    await buildCase.buildCase(
      page,
      caseNumber1,
      previousEvents1,
      eventTimes1,
      false,
    );
  });

  test("Create hearing options in the 'Ready to list' state. @CaseAPI", async ({
    page,
  }): Promise<void> => {
    let previousEvents1: allEvents[] = [];
    let eventTimes1: string[] = []; // Only checking for one of both as the second is covered by this code.
    const caseNumber1: string = await createCase.createCase(
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
    );
    await createCase.verifyDetails(
      page,
      "caseWorker",
      true,
      caseNumber1,
      previousEvents1,
      eventTimes1,
    );
    await buildCase.buildCase(
      page,
      caseNumber1,
      previousEvents1,
      eventTimes1,
      false,
    );
  });

  test("Test error messaging. @CaseAPI", async ({ page }): Promise<void> => {});
});

test("Accessibility test @accessibilityCaseAPI", async ({
  page,
}): Promise<void> => {});
