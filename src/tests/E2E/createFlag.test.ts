import { test } from "@playwright/test";
import waUsers_content from "../fixtures/content/waUsers_content.ts";
import commonHelpers from "../helpers/commonHelpers";
import createCase from "../journeys/CaseAPI/createCase";
import buildCase from "../journeys/CaseAPI/buildCase";
import events_content from "../fixtures/content/CaseAPI/events_content";
import task from "../journeys/CaseAPI/task.ts";
import taskNames_content from "../fixtures/content/taskNames_content.ts";
import createFlag from "../journeys/CaseAPI/createFlag.ts";

test.describe("Create case flags @CaseAPI", (): void => {
  test("Create flag at Case Level, type Urgent Case. @CaseAPI1", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber1000 = await createCase.createCase(
      page,
      waUsers_content.userRoleAdmin,
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
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber1000, subjectName);
    await task.removeTask(
      page,
      caseNumber1000,
      taskNames_content.issueCaseToRespondentTask,
      subjectName,
      waUsers_content.userRoleAdmin,
    );
    await commonHelpers.chooseEventFromDropdown(page, "Create Flag");
    await createFlag.createFlag(
        page,
        false,
        caseNumber1000,
        subjectName,
        1,
        2,
    );
  });
});

test("Accessibility test - Create case flag @accessibility", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber1000 = await createCase.createCase(
      page,
      waUsers_content.userRoleAdmin,
      true,
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
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, true, caseNumber1000, subjectName);
    await task.removeTask(
      page,
      caseNumber1000,
      taskNames_content.issueCaseToRespondentTask,
      subjectName,
      waUsers_content.userRoleAdmin,
    );
    await commonHelpers.chooseEventFromDropdown(page, "Create Flag");
    await createFlag.createFlag(
        page,
        true,
        caseNumber1000,
        subjectName,
        1,
        2,
    );
  });