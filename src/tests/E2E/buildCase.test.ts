import { test } from "@playwright/test";
import { createCase } from "../journeys/CaseAPI/createCase.ts";
import { buildCase } from "../journeys/CaseAPI/buildCase.ts";
import historyTabPage from "../pages/CaseAPI/caseTabs/historyTabPage.ts";
import createCaseConfirmPage from "../pages/CaseAPI/createCase/confirmPage.ts";
import stateTab_content from "../fixtures/content/CaseAPI/caseTabs/stateTab_content.ts";
import { allEvents } from "../helpers/commonHelpers.ts";
import buildCaseConfirmPage from "../pages/CaseAPI/buildCase/confirmPage.ts";

test.describe("Case-API Build case test.", () => {
  test("Create and build case as a caseworker", async ({ page }) => {
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
    const caseNumber = await createCaseConfirmPage.returnCaseNumber(page);
    const createCaseTime =
      await createCaseConfirmPage.closeAndReturnToCase(page);
    let previousEvents: allEvents[] = ["Create Case"];
    let eventTimes: string[] = [createCaseTime];
    await historyTabPage.checkPageLoads(
      page,
      true,
      caseNumber,
      stateTab_content.submittedState,
    );
    await historyTabPage.checkPageInfo(
      page,
      previousEvents,
      eventTimes,
      "caseWorker",
      stateTab_content.submittedState,
    );
    await buildCase(page, caseNumber, true);
    const buildCaseTime = await buildCaseConfirmPage.continueOn(page);
    previousEvents = ["Create Case", "Case: Build case"];
    eventTimes = [createCaseTime, buildCaseTime];
    await historyTabPage.checkPageLoads(
      page,
      true,
      caseNumber,
      stateTab_content.submittedState,
    );
    await historyTabPage.checkPageInfo(
      page,
      previousEvents,
      eventTimes,
      "caseWorker",
      stateTab_content.caseManagementState,
    );
  });
});
