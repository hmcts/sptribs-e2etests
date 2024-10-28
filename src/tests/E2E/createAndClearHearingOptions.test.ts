import { test } from "@playwright/test";
import hearingOptions from "../journeys/CaseAPI/hearingOptions.ts";
import commonHelpers from "../helpers/commonHelpers.ts";
import createCase from "../journeys/CaseAPI/createCase.ts";
import events_content from "../fixtures/content/CaseAPI/events_content.ts";
import buildCase from "../journeys/CaseAPI/buildCase.ts";
import task from "../journeys/CaseAPI/task.ts";
import clearHearingOptions from "../journeys/CaseAPI/clearHearingOptions.ts";

const userRoleAdmin = "waHearingCentreAdmin";
const taskRemovedIssueCase = " Issue Case To Respondent ";

test.describe("Create and clear hearing options tests @CaseAPI", (): void => {
  test("Create and clear hearing options in the 'Case management' state. @crossbrowserCaseAPI", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber401 = await createCase.createCase(
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
    console.log(`Case Number : ${caseNumber401}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber401, subjectName);
    await hearingOptions.hearingOptions(
      page,
      false,
      true,
      "1-London",
      true,
      false,
      "Face to Face",
      false,
      false,
      caseNumber401,
      subjectName,
    );
    await clearHearingOptions.clearHearingOptions(
      page,
      false,
      caseNumber401,
      subjectName,
    );
    await task.removeTask(page, taskRemovedIssueCase, subjectName);
  });

  test("Create hearing options with no region and no venue in the 'Case management' state.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber402 = await createCase.createCase(
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
    console.log(`Case Number : ${caseNumber402}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber402, subjectName);
    await hearingOptions.hearingOptions(
      page,
      false,
      false,
      null,
      false,
      false,
      "Face to Face",
      false,
      false,
      caseNumber402,
      subjectName,
    );
    await task.removeTask(page, taskRemovedIssueCase, subjectName);
  });

  test("Create hearing options with no region and venue not listed in the 'Case management' state.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber403 = await createCase.createCase(
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
    console.log(`Case Number : ${caseNumber403}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber403, subjectName);
    await hearingOptions.hearingOptions(
      page,
      false,
      false,
      null,
      false,
      true,
      "Face to Face",
      false,
      false,
      caseNumber403,
      subjectName,
    );
    await task.removeTask(page, taskRemovedIssueCase, subjectName);
  });

  test("Create hearing options with a region but venue not listed in the 'Case management' state. @crossbrowserCaseAPI", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber404 = await createCase.createCase(
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
    console.log(`Case Number : ${caseNumber404}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber404, subjectName);
    await hearingOptions.hearingOptions(
      page,
      false,
      true,
      "1-London",
      false,
      true,
      "Face to Face",
      false,
      false,
      caseNumber404,
      subjectName,
    );
    await task.removeTask(page, taskRemovedIssueCase, subjectName);
  });

  test("Edit hearing options in the 'Ready to list' state.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber405 = await createCase.createCase(
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
    console.log(`Case Number : ${caseNumber405}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber405, subjectName);
    await hearingOptions.hearingOptions(
      page,
      false,
      true,
      "1-London",
      true,
      false,
      "Face to Face",
      false,
      true,
      caseNumber405,
      subjectName,
    );
    await task.removeTask(page, taskRemovedIssueCase, subjectName);
  });
});

test("Accessibility test @accessibilityCaseAPI", async ({
  page,
}): Promise<void> => {
  const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
  const caseNumber406 = await createCase.createCase(
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
  console.log(`Case Number : ${caseNumber406}`);
  await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
  await buildCase.buildCase(page, false, caseNumber406, subjectName);
  await hearingOptions.hearingOptions(
    page,
    true,
    true,
    "1-London",
    true,
    false,
    "Face to Face",
    false,
    false,
    caseNumber406,
    subjectName,
  );
  await clearHearingOptions.clearHearingOptions(
    page,
    true,
    caseNumber406,
    subjectName,
  );
  await task.removeTask(page, taskRemovedIssueCase, subjectName);
});
