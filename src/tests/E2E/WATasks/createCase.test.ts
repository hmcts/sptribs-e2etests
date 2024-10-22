import { test } from "@playwright/test";
import createCase from "../../journeys/WA/createCase.ts";
import commonHelpers from "../../helpers/commonHelpers.ts";

test.describe("Case-API Create case tests. @CaseAPI", () => {
  test("Assessment - Fatal Category, Email Contact, multiple documents @crossbrowserCaseAPI", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber601 = await createCase.createCase(
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
      true,
      "1996",
      "Scotland",
      true,
      false,
      true,
      false,
      true,
      false,
    );
  });

  test("Assessment - Medical Re-opening Category, Email Contact", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber602: any = await createCase.createCase(
      page,
      "waCaseWorker",
      false,
      "Assessment",
      "Medical Re-opening",
      true,
      true,
      "Email",
      subjectName,
      true,
      false,
      "2001",
      "London",
      true,
      false,
      true,
      false,
      true,
      false,
    );
  });

  test("Assessment - Minor Category, Post Contact", async ({ page }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber603 = await createCase.createCase(
      page,
      "waSeniorCaseworker",
      false,
      "Assessment",
      "Minor",
      true,
      true,
      "Post",
      subjectName,
      true,
      false,
      "2008",
      "Midlands",
      true,
      false,
      true,
      false,
      true,
      false,
    );
  });

  test("Assessment - Paragraph 26 Category, Post Contact", async ({ page }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber604 = await createCase.createCase(
      page,
      "waHearingCentreTeamLead",
      false,
      "Assessment",
      "Paragraph 26",
      false,
      true,
      "Post",
      subjectName,
      true,
      true,
      "2012",
      "North East",
      true,
      false,
      true,
      false,
      true,
      false,
    );
  });

  test("Assessment - Sexual Abuse Category, Email Contact", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber605 = await createCase.createCase(
      page,
      "waRegionalHearingCentreAdmin",
      false,
      "Assessment",
      "Sexual Abuse",
      true,
      true,
      "Email",
      subjectName,
      true,
      false,
      "1996",
      "North West",
      true,
      false,
      true,
      false,
      true,
      false,
    );
  });

  test("Assessment - Special Jurisdiction Category, Email Contact", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber606 = await createCase.createCase(
      page,
      "waRegionalHearingCentreTeamLead",
      false,
      "Assessment",
      "Special Jurisdiction",
      true,
      true,
      "Email",
      subjectName,
      true,
      true,
      "2001",
      "Wales & South West",
      true,
      false,
      true,
      false,
      true,
      false,
    );
  });

  test("Eligibility - Other Category, Email Contact", async ({ page }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber607 = await createCase.createCase(
      page,
      "waCTSCAdmin",
      false,
      "Eligibility",
      "Other",
      true,
      true,
      "Email",
      subjectName,
      true,
      false,
      "2008",
      "Scotland",
      true,
      false,
      true,
      false,
      true,
      false,
    );
  });

  test("Eligibility - Fatal Category, Post Contact", async ({ page }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber608 = await createCase.createCase(
      page,
      "waCTSCTeamLead",
      false,
      "Eligibility",
      "Fatal",
      true,
      true,
      "Post",
      subjectName,
      true,
      false,
      "1996",
      "London",
      true,
      false,
      true,
      false,
      true,
      false,
    );
  });

  test("Eligibility - Medical Re-opening Category, Email Contact", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber609 = await createCase.createCase(
      page,
      "waHearingCentreAdmin",
      false,
      "Eligibility",
      "Medical Re-opening",
      true,
      true,
      "Email",
      subjectName,
      true,
      false,
      "2012",
      "Midlands",
      true,
      false,
      true,
      false,
      true,
      false,
    );
  });

  test("Eligibility - Minor Category, Post Contact @crossbrowserCaseAPI", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber610 = await createCase.createCase(
      page,
      "waHearingCentreAdmin",
      false,
      "Eligibility",
      "Minor",
      true,
      true,
      "Post",
      subjectName,
      true,
      false,
      "2001",
      "North East",
      true,
      false,
      true,
      false,
      true,
      false,
    );
  });

  test("Eligibility - Paragraph 26 Category, Post Contact", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber611 = await createCase.createCase(
      page,
      "waHearingCentreAdmin",
      false,
      "Eligibility",
      "Paragraph 26",
      true,
      true,
      "Post",
      subjectName,
      true,
      false,
      "1996",
      "North West",
      true,
      false,
      true,
      false,
      true,
      false,
    );
  });

  test("Eligibility - Sexual Abuse Category, Email Contact", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber612 = await createCase.createCase(
      page,
      "waHearingCentreAdmin",
      false,
      "Eligibility",
      "Sexual Abuse",
      true,
      true,
      "Email",
      subjectName,
      true,
      false,
      "2008",
      "Wales & South West",
      true,
      false,
      true,
      false,
      true,
      false,
    );
  });

  test("Assessment - Other Category, Email Contact", async ({ page }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber613 = await createCase.createCase(
      page,
      "waHearingCentreAdmin",
      false,
      "Assessment",
      "Other",
      true,
      true,
      "Email",
      subjectName,
      true,
      false,
      "2012",
      "Scotland",
      true,
      false,
      true,
      false,
      true,
      false,
    );
  });

  test("Eligibility - Other Category, Post Contact", async ({ page }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber614 = await createCase.createCase(
      page,
      "waHearingCentreAdmin",
      false,
      "Eligibility",
      "Other",
      true,
      true,
      "Post",
      subjectName,
      true,
      false,
      "2001",
      "London",
      true,
      false,
      true,
      false,
      true,
      false,
    );
  });

  test("Assessment - Other Category, Post Contact, Compensation Linked", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber615 = await createCase.createCase(
      page,
      "waHearingCentreAdmin",
      false,
      "Assessment",
      "Other",
      true,
      true,
      "Post",
      subjectName,
      true,
      false,
      "1996",
      "Midlands",
      true,
      false,
      true,
      false,
      true,
      false,
    );
  });

  test("Assessment - Other Category, Post Contact", async ({ page }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber616 = await createCase.createCase(
      page,
      "waHearingCentreAdmin",
      false,
      "Assessment",
      "Other",
      true,
      true,
      "Post",
      subjectName,
      true,
      false,
      "1996",
      "Midlands",
      true,
      true,
      true,
      true,
      true,
      false,
    );
  });

  test("Eligibility - Other Category, Email Contact, Applicant explained", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber617 = await createCase.createCase(
      page,
      "waHearingCentreAdmin",
      false,
      "Eligibility",
      "Other",
      true,
      true,
      "Post",
      subjectName,
      true,
      false,
      "1996",
      "Midlands",
      true,
      true,
      true,
      true,
      true,
      false,
    );
  });

  test("Assessment - Other Category, Email Contact, Applicant explained", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber618 = await createCase.createCase(
      page,
      "waHearingCentreAdmin",
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
      "Midlands",
      true,
      true,
      true,
      true,
      true,
      false,
    );
  });

  test("Error messaging. @crossbrowserCaseAPI", async ({ page }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber619 = await createCase.createCase(
      page,
      "waHearingCentreAdmin",
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
      "Midlands",
      true,
      true,
      true,
      true,
      true,
      true,
    );
  });
});

test("Accessibility test every page. @accessibilityCaseAPI", async ({
  page,
}) => {
  const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
  const caseNumber620 = await createCase.createCase(
    page,
    "waHearingCentreAdmin",
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
    true,
    true,
    false,
  );
});
