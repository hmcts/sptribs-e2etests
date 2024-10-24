import { test } from "@playwright/test";
import createListing from "../../journeys/WA/createListing.ts";
import commonHelpers from "../../helpers/commonHelpers.ts";
import createCase from "../../journeys/WA/createCase.ts";
import events_content from "../../fixtures/content/CaseAPI/events_content.ts";
import buildCase from "../../journeys/WA/buildCase.ts";
import task from "../../journeys/WA/task.ts";
import hearingOptions from "../../journeys/WA/hearingOptions.ts";

const userRoleAdmin = "waHearingCentreAdmin";
const taskRemovedIssueCase = " Issue Case To Respondent ";

test.describe("Create hearing listing tests @CaseAPI", (): void => {
  test("Create hearing listing in the 'Ready to list' state. @crossbrowserCaseAPI", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber1000 = await createCase.createCase(
      page,
      userRoleAdmin,
      false,
      "Assessment",
      "Other",
      true,
      true,
      "Email",
      subjectName,
      true,
      false,
      "1996",
      "Scotland",
      true,
      true,
      true,
      false,
      true,
      false,
    );
    console.log(`Case Number : ${caseNumber1000}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber1000, subjectName);
    await task.removeTask(page, taskRemovedIssueCase, subjectName);
    await hearingOptions.hearingOptions(
      page,
      false,
      true,
      "1-London",
      true,
      false,
      "Hybrid",
      false,
      false,
      caseNumber1000,
      subjectName,
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
      "Case management",
      "Face to Face",
      "Morning",
      false,
      "Fox Court - London (Central) SSCS Tribunal-4th Floor, Fox Court, 30 Brooke Street, London",
      false,
      caseNumber1000,
      subjectName
    );
  });
});