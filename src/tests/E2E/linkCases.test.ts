import { test } from "@playwright/test";
import linkCases from "../journeys/CaseAPI/linkCases.ts";
import createCase from "../journeys/CaseAPI/createCase.ts";
import buildCase from "../journeys/CaseAPI/buildCase.ts";
import { allEvents } from "../helpers/commonHelpers.ts";

test.describe("Linking cases tests @CaseAPI", (): void => {
  test.only("Link two cases in the 'Submitted' state.", async ({
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
    const caseNumber2: string = await createCase.createCase(
      page,
      "caseWorker",
      false,
      "Assessment",
      "Other",
      true,
      true,
      "Post",
      true,
      false,
      "2008",
      "London",
      false,
      true,
      true,
      false,
      false,
    );
    await linkCases.linkCase(
      page,
      caseNumber1,
      caseNumber2,
      previousEvents1,
      eventTimes1,
      false,
    );
  });
});
