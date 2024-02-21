import { test } from "@playwright/test";
import { createCase, verifyDetails } from "../journeys/CaseAPI/createCase.ts";
import { buildCase } from "../journeys/CaseAPI/buildCase.ts";
import { allEvents } from "../helpers/commonHelpers.ts";

test.describe("Case-API Build case tests.", () => {
  test("Create and build case as a caseworker", async ({ page }) => {
    let caseNumber: string = "";
    let previousEvents: allEvents[] = [];
    let eventTimes: string[] = [];
    await createCase(
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
    );
    await verifyDetails(
      page,
      "caseWorker",
      true,
      caseNumber,
      previousEvents,
      eventTimes,
    );
    await buildCase(page, caseNumber, previousEvents, eventTimes, true);
  });
});
