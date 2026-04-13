import { test } from "@playwright/test";
import linkCases from "../journeys/CaseAPI/linkCases.ts";
import createCase from "../journeys/CaseAPI/createCase.ts";
import { allEvents } from "../helpers/commonHelpers.ts";
import buildCase from "../journeys/CaseAPI/buildCase.ts";
import commonHelpers from "../helpers/commonHelpers.ts";
import events_content from "../fixtures/content/CaseAPI/events_content.ts";
import taskNames_content from "../fixtures/content/taskNames_content.ts";
import waUsers_content from "../fixtures/content/waUsers_content.ts";
import task from "../journeys/CaseAPI/task.ts";

test.describe("Linking cases tests @CaseAPI", (): void => {
  test("Link two cases in the 'Submitted' state. @CaseAPI", async ({
    page,
  }): Promise<void> => {
    let previousEvents1: allEvents[] = [];
    let eventTimes1: string[] = []; // Only checking for one of both as the second is covered by this code.
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber1: string = await createCase.createCase(
      page,
      "waHearingCentreAdmin",
      false,
      "Assessment",
      "Fatal",
      true,
      true,
      "Email",
      subjectName,
      true,
      false,
      "1996",
      "Scotland",
      true,
      false,
      true,
      false,
      true,
      false,
    );
    await page.locator(`a:text-is(" Sign out ")`).click();
    const caseNumber2: string = await createCase.createCase(
      page,
      "waHearingCentreAdmin",
      false,
      "Assessment",
      "Fatal",
      true,
      true,
      "Email",
      subjectName,
      true,
      false,
      "1996",
      "Scotland",
      true,
      false,
      true,
      false,
      true,
      false,
    );
    await linkCases.linkCase(
      page,
      caseNumber1,
      caseNumber2,
      previousEvents1,
      eventTimes1,
      false,
      "default",
      subjectName,
    );
  });

  test("Link a Submitted case to a case management case. @CaseAPI", async ({
    page,
  }): Promise<void> => {
    let previousEvents1: allEvents[] = [];
    let eventTimes1: string[] = []; // Only checking for one of both as the second is covered by this code.
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber3: string = await createCase.createCase(
      page,
      "waHearingCentreAdmin",
      false,
      "Assessment",
      "Fatal",
      true,
      true,
      "Email",
      subjectName,
      true,
      false,
      "1996",
      "Scotland",
      true,
      false,
      true,
      false,
      true,
      false,
    );
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber3, subjectName);
    await task.removeTask(
      page,
      caseNumber3,
      taskNames_content.issueCaseToRespondentTask,
      subjectName,
      waUsers_content.userRoleAdmin,
    );
    await page.locator(`a:text-is(" Sign out ")`).click();
    const caseNumber4: string = await createCase.createCase(
      page,
      "waHearingCentreAdmin",
      false,
      "Assessment",
      "Fatal",
      true,
      true,
      "Email",
      subjectName,
      true,
      false,
      "1996",
      "Scotland",
      true,
      false,
      true,
      false,
      true,
      false,
    );
    await linkCases.linkCase(
      page,
      caseNumber3,
      caseNumber4,
      previousEvents1,
      eventTimes1,
      false,
      "default",
      subjectName,
    );
  });

  test("Test error messaging", async ({
     page 
  }): Promise<void> => {
    let previousEvents1: allEvents[] = [];
    let eventTimes1: string[] = []; // Only checking for one of both as the second is covered by this code.
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber5: string = await createCase.createCase(
      page,
      "waHearingCentreAdmin",
      false,
      "Assessment",
      "Fatal",
      true,
      true,
      "Email",
      subjectName,
      true,
      false,
      "1996",
      "Scotland",
      true,
      false,
      true,
      false,
      true,
      false,
    );
    await page.locator(`a:text-is(" Sign out ")`).click();
    const caseNumber6: string = await createCase.createCase(
      page,
      "waHearingCentreAdmin",
      false,
      "Assessment",
      "Fatal",
      true,
      true,
      "Email",
      subjectName,
      true,
      false,
      "1996",
      "Scotland",
      true,
      false,
      true,
      false,
      true,
      false,
    );
    await linkCases.linkCase(
      page,
      caseNumber5,
      caseNumber6,
      previousEvents1,
      eventTimes1,
      false,
      "default",
      subjectName,
    );
  });
});

test("Accessibility test @accessibility", async ({
  page,
  }): Promise<void> => {
    let previousEvents1: allEvents[] = [];
    let eventTimes1: string[] = []; // Only checking for one of both as the second is covered by this code.
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber7: string = await createCase.createCase(
      page,
      "waHearingCentreAdmin",
      false,
      "Assessment",
      "Fatal",
      true,
      true,
      "Email",
      subjectName,
      true,
      false,
      "1996",
      "Scotland",
      true,
      false,
      true,
      false,
      true,
      false,
    );
    await page.locator(`a:text-is(" Sign out ")`).click();
    const caseNumber8: string = await createCase.createCase(
      page,
      "waHearingCentreAdmin",
      false,
      "Assessment",
      "Fatal",
      true,
      true,
      "Email",
      subjectName,
      true,
      false,
      "1996",
      "Scotland",
      true,
      false,
      true,
      false,
      true,
      false,
    );
    await linkCases.linkCase(
      page,
      caseNumber7,
      caseNumber8,
      previousEvents1,
      eventTimes1,
      false,
      "default",
      subjectName,
    );
});
