import { test } from "@playwright/test";
import panelComposition from "../../journeys/WA/panelComposition.ts";
import editPanelComposition from "../../journeys/WA/editPanelComposition.ts";
import commonHelpers from "../../helpers/commonHelpers.ts";
import createCase from "../../journeys/WA/createCase.ts";
import events_content from "../../fixtures/content/CaseAPI/events_content.ts";
import buildCase from "../../journeys/WA/buildCase.ts";
import task from "../../journeys/WA/task.ts";

const userRoleAdmin = "waHearingCentreAdmin";
const taskRemovedIssueCase = " Issue Case To Respondent ";

test.describe("Panel Composition tests @CaseAPI", () => {
  test("Make a panel composition only one panel member and no specialism information. @crossbrowserCaseAPI", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber1700 = await createCase.createCase(
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
    console.log(`Case Number : ${caseNumber1700}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber1700, subjectName);
    await panelComposition.panelComposition(
      page,
      false,
      null,
      null,
      false,
      caseNumber1700,
      subjectName,
    );
    await task.removeTask(page, taskRemovedIssueCase, subjectName);
  });

  test("Make a panel composition only one panel member and specialism information.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber1701 = await createCase.createCase(
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
    console.log(`Case Number : ${caseNumber1701}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber1701, subjectName);
    await panelComposition.panelComposition(
      page,
      false,
      null,
      null,
      true,
      caseNumber1701,
      subjectName,
    );
    await task.removeTask(page, taskRemovedIssueCase, subjectName);
  });

  test("Make a panel composition only two panel members and no specialism information", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber1702 = await createCase.createCase(
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
    console.log(`Case Number : ${caseNumber1702}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber1702, subjectName);
    await panelComposition.panelComposition(
      page,
      false,
      "Lay Member",
      null,
      false,
      caseNumber1702,
      subjectName,
    );
    await task.removeTask(page, taskRemovedIssueCase, subjectName);
  });

  test("Make a panel composition with all information.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber1703 = await createCase.createCase(
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
    console.log(`Case Number : ${caseNumber1703}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber1703, subjectName);
    await panelComposition.panelComposition(
      page,
      false,
      "Medical Member",
      "Lay Member",
      true,
      caseNumber1703,
      subjectName,
    );
    await task.removeTask(page, taskRemovedIssueCase, subjectName);
  });

  test("Make and edit a panel composition with all information.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber1704 = await createCase.createCase(
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
    console.log(`Case Number : ${caseNumber1704}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber1704, subjectName);
    await panelComposition.panelComposition(
      page,
      false,
      "Medical Member",
      "Lay Member",
      false,
      caseNumber1704,
      subjectName,
    );
    await editPanelComposition.editPanelComposition(
      page,
      false,
      "Lay Member",
      "Medical Member",
      true,
      caseNumber1704,
      subjectName,
    );
    await task.removeTask(page, taskRemovedIssueCase, subjectName);
  });
});

test("Accessibility test - Create and Edit Panel composition @accessibilityCaseAPI", async ({
  page,
}): Promise<void> => {
  const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
  const caseNumber1705 = await createCase.createCase(
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
  console.log(`Case Number : ${caseNumber1705}`);
  await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
  await buildCase.buildCase(page, false, caseNumber1705, subjectName);
  await panelComposition.panelComposition(
    page,
    true,
    "Medical Member",
    "Lay Member",
    false,
    caseNumber1705,
    subjectName,
  );
  await editPanelComposition.editPanelComposition(
    page,
    true,
    "Lay Member",
    "Medical Member",
    true,
    caseNumber1705,
    subjectName,
  );
  await task.removeTask(page, taskRemovedIssueCase, subjectName);
});
