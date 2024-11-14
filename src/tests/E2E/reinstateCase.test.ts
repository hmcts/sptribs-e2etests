import { test } from "@playwright/test";
import waUsers_content from "../fixtures/content/waUsers_content.ts";
import reinstateCase from "../journeys/CaseAPI/reinstateCase.ts";
import commonHelpers from "../helpers/commonHelpers.ts";
import createCase from "../journeys/CaseAPI/createCase.ts";
import events_content from "../fixtures/content/CaseAPI/events_content.ts";
import buildCase from "../journeys/CaseAPI/buildCase.ts";
import closeCase from "../journeys/CaseAPI/closeCase.ts";
import testDataCleanUp from "../helpers/testDataCleanUp.ts";

test.describe("Case-API Close Reinstate case tests. @CaseAPI @CaseAPI5", () => {
  test("Check for redundant test data", async ({ page }) => {
    test.setTimeout(10 * 60 * 1000);
    await testDataCleanUp(page, waUsers_content.userRoleAdmin);
  });
  test("Reinstate a case which has been closed in error with no optional text. @crossbrowserCaseAPI", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2300 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber2300, subjectName);
    await commonHelpers.chooseEventFromDropdown(page, events_content.closeCase);
    await closeCase.closeCase(
      page,
      false,
      false,
      "caseWithdrawn",
      false,
      null,
      null,
      caseNumber2300,
      subjectName,
      false,
    );
    await reinstateCase.reinstateCase(
      page,
      false,
      false,
      "caseHadBeenClosedInError",
      true,
      caseNumber2300,
      subjectName,
    );
  });

  test("Reinstate a case which has had a withdrawal decision with no optional text.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2301 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber2301, subjectName);
    await commonHelpers.chooseEventFromDropdown(page, events_content.closeCase);
    await closeCase.closeCase(
      page,
      false,
      false,
      "caseWithdrawn",
      false,
      null,
      null,
      caseNumber2301,
      subjectName,
      false,
    );
    await reinstateCase.reinstateCase(
      page,
      false,
      false,
      "requestFollowingAWithdrawalDecision",
      false,
      caseNumber2301,
      subjectName,
    );
  });

  test("Reinstate a case which has had a oral hearing with optional text.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2302 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber2302, subjectName);
    await commonHelpers.chooseEventFromDropdown(page, events_content.closeCase);
    await closeCase.closeCase(
      page,
      false,
      false,
      "caseWithdrawn",
      false,
      null,
      null,
      caseNumber2302,
      subjectName,
      false,
    );
    await reinstateCase.reinstateCase(
      page,
      false,
      false,
      "Request to set aside a tribunal decision following an oral hearing",
      true,
      caseNumber2302,
      subjectName,
    );
  });

  test("Reinstate a case as which has had a rule 27 decision with no optional text.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2303 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber2303, subjectName);
    await commonHelpers.chooseEventFromDropdown(page, events_content.closeCase);
    await closeCase.closeCase(
      page,
      false,
      false,
      "caseWithdrawn",
      false,
      null,
      null,
      caseNumber2303,
      subjectName,
      false,
    );
    await reinstateCase.reinstateCase(
      page,
      false,
      false,
      "requestFollowingAnOralHearingApplicationFollowingARule27Decision",
      false,
      caseNumber2303,
      subjectName,
    );
  });

  test("Reinstate a case as which has had a upper tribunal decision with optional text.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2304 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber2304, subjectName);
    await commonHelpers.chooseEventFromDropdown(page, events_content.closeCase);
    await closeCase.closeCase(
      page,
      false,
      false,
      "caseWithdrawn",
      false,
      null,
      null,
      caseNumber2304,
      subjectName,
      false,
    );
    await reinstateCase.reinstateCase(
      page,
      false,
      false,
      "requestFollowingADecisionFromTheUpperTribunal",
      true,
      caseNumber2304,
      subjectName,
    );
  });

  test("Reinstate a case which has a strikeout decision with no optional text.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2305 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber2305, subjectName);
    await commonHelpers.chooseEventFromDropdown(page, events_content.closeCase);
    await closeCase.closeCase(
      page,
      false,
      false,
      "caseWithdrawn",
      false,
      null,
      null,
      caseNumber2305,
      subjectName,
      false,
    );
    await reinstateCase.reinstateCase(
      page,
      false,
      false,
      "RequestFollowingAStrikeOutDecision",
      false,
      caseNumber2305,
      subjectName,
    );
  });

  test("Reinstate a case for reason other with optional text.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2306 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber2306, subjectName);
    await commonHelpers.chooseEventFromDropdown(page, events_content.closeCase);
    await closeCase.closeCase(
      page,
      false,
      false,
      "caseWithdrawn",
      false,
      null,
      null,
      caseNumber2306,
      subjectName,
      false,
    );
    await reinstateCase.reinstateCase(
      page,
      false,
      false,
      "Other",
      true,
      caseNumber2306,
      subjectName,
    );
  });

  test("Error messaging - Reinstate case.", async ({ page }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2307 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber2307, subjectName);
    await commonHelpers.chooseEventFromDropdown(page, events_content.closeCase);
    await closeCase.closeCase(
      page,
      false,
      false,
      "caseWithdrawn",
      false,
      null,
      null,
      caseNumber2307,
      subjectName,
      false,
    );
    await reinstateCase.reinstateCase(
      page,
      false,
      true,
      "RequestFollowingAStrikeOutDecision",
      true,
      caseNumber2307,
      subjectName,
    );
  });
});

test("Accessibility test - Reinstate case. @accessibilityCaseAPI", async ({
  page,
}): Promise<void> => {
  const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
  const caseNumber2308 = await createCase.createCase(
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
  await buildCase.buildCase(page, false, caseNumber2308, subjectName);
  await commonHelpers.chooseEventFromDropdown(page, events_content.closeCase);
  await closeCase.closeCase(
    page,
    false,
    false,
    "caseWithdrawn",
    false,
    null,
    null,
    caseNumber2308,
    subjectName,
    false,
  );
  await reinstateCase.reinstateCase(
    page,
    true,
    false,
    "RequestFollowingAStrikeOutDecision",
    false,
    caseNumber2308,
    subjectName,
  );
});
