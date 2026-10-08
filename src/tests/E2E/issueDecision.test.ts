import { test } from "@playwright/test";
import events_content from "../fixtures/content/CaseAPI/events_content.ts";
import taskNames_content from "../fixtures/content/taskNames_content.ts";
import waUsers_content from "../fixtures/content/waUsers_content.ts";
import commonHelpers from "../helpers/commonHelpers.ts";
import testDataCleanUp from "../helpers/testDataCleanUp.ts";
import buildCase from "../journeys/CaseAPI/buildCase.ts";
import createListing from "../journeys/CaseAPI/createListing.ts";
import createSummary from "../journeys/CaseAPI/createSummary.ts";
import task from "../journeys/CaseAPI/task.ts";
import { createCaseViaApi } from "../helpers/api/ApiCreateCase.ts";

test.describe("Issue decision tests @CaseAPI", (): void => {
  test("Check for redundant test data", async ({ page }) => {
    test.setTimeout(10 * 60 * 1000);
    await testDataCleanUp(page, waUsers_content.userRoleAdmin);
  });

  test("Issue a final decision on a case. @CaseAPI2", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber1102 = await createCaseViaApi(page, subjectName);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber1102, subjectName);
    await task.removeTask(
      page,
      caseNumber1102,
      taskNames_content.issueCaseToRespondentTask,
      subjectName,
      waUsers_content.userRoleAdmin,
    );
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Hearings: Create listing",
    );
    await createListing.createListing(
      page,
      false,
      true,
      "1-London",
      "Interlocutory",
      "Face to Face",
      "Morning",
      false,
      null,
      false,
      caseNumber1102,
      subjectName,
      false,
    );
    await createSummary.createSummary(
      page,
      false,
      "Interlocutory",
      "Face to Face",
      "Morning",
      false,
      null,
      null,
      "Allowed",
      null,
      false,
      true,
      false,
      caseNumber1102,
      subjectName,
    );
  });

});