import { test } from "@playwright/test";
import createCase from "../../journeys/WA/createCase.ts";

test.describe("Case-API Create case tests. @CaseAPI", () => {
  test("Assessment - Fatal Category, Email Contact, multiple documents @crossbrowserCaseAPI", async ({
    page,
  }) => {
    let caseNumber601: any;
    caseNumber601 = await createCase.createCase(
      page,
      "waHearingCentreAdmin",
      false,
      "Assessment",
      "Fatal",
      true,
      true,
      "Email",
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
    let caseNumber602: any;
    caseNumber602 = await createCase.createCase(
      page,
      "waCaseWorker",
      false,
      "Assessment",
      "Medical Re-opening",
      true,
      true,
      "Email",
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
    let caseNumber603: any;
    caseNumber603 = await createCase.createCase(
      page,
      "waSeniorCaseworker",
      false,
      "Assessment",
      "Minor",
      true,
      true,
      "Post",
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
    let caseNumber604: any;
    caseNumber604 = await createCase.createCase(
      page,
      "waHearingCentreTeamLead",
      false,
      "Assessment",
      "Paragraph 26",
      false,
      true,
      "Post",
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
    let caseNumber605: any;
    caseNumber605 = await createCase.createCase(
      page,
      "waRegionalHearingCentreAdmin",
      false,
      "Assessment",
      "Sexual Abuse",
      true,
      true,
      "Email",
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
    let caseNumber606: any;
    caseNumber606 = await createCase.createCase(
      page,
      "waRegionalHearingCentreTeamLead",
      false,
      "Assessment",
      "Special Jurisdiction",
      true,
      true,
      "Email",
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
    let caseNumber607: any;
    caseNumber607 = await createCase.createCase(
      page,
      "waCTSCAdmin",
      false,
      "Eligibility",
      "Other",
      true,
      true,
      "Email",
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
    let caseNumber608: any;
    caseNumber608 = await createCase.createCase(
      page,
      "waCTSCTeamLead",
      false,
      "Eligibility",
      "Fatal",
      true,
      true,
      "Post",
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
    let caseNumber609: any;
    caseNumber609 = await createCase.createCase(
      page,
      "waHearingCentreAdmin",
      false,
      "Eligibility",
      "Medical Re-opening",
      true,
      true,
      "Email",
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
    let caseNumber610: any;
    caseNumber610 = await createCase.createCase(
      page,
      "waHearingCentreAdmin",
      false,
      "Eligibility",
      "Minor",
      true,
      true,
      "Post",
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
    let caseNumber611: any;
    caseNumber611 = await createCase.createCase(
      page,
      "waHearingCentreAdmin",
      false,
      "Eligibility",
      "Paragraph 26",
      true,
      true,
      "Post",
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
    let caseNumber612: any;
    caseNumber612 = await createCase.createCase(
      page,
      "waHearingCentreAdmin",
      false,
      "Eligibility",
      "Sexual Abuse",
      true,
      true,
      "Email",
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
    let caseNumber613: any;
    caseNumber613 = await createCase.createCase(
      page,
      "waHearingCentreAdmin",
      false,
      "Assessment",
      "Other",
      true,
      true,
      "Email",
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
    let caseNumber614: any;
    caseNumber614 = await createCase.createCase(
      page,
      "waHearingCentreAdmin",
      false,
      "Eligibility",
      "Other",
      true,
      true,
      "Post",
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
    let caseNumber615: any;
    caseNumber615 = await createCase.createCase(
      page,
      "waHearingCentreAdmin",
      false,
      "Assessment",
      "Other",
      true,
      true,
      "Post",
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
    let caseNumber616: any;
    caseNumber616 = await createCase.createCase(
      page,
      "waHearingCentreAdmin",
      false,
      "Assessment",
      "Other",
      true,
      true,
      "Post",
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
    let caseNumber617: any;
    caseNumber617 = await createCase.createCase(
      page,
      "waHearingCentreAdmin",
      false,
      "Eligibility",
      "Other",
      true,
      true,
      "Post",
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
    let caseNumber618: any;
    caseNumber618 = await createCase.createCase(
      page,
      "waHearingCentreAdmin",
      false,
      "Assessment",
      "Other",
      true,
      true,
      "Email",
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
    let caseNumber619: any;
    caseNumber619 = await createCase.createCase(
      page,
      "waHearingCentreAdmin",
      false,
      "Assessment",
      "Other",
      true,
      true,
      "Email",
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
  let caseNumber620: any;
  caseNumber620 = await createCase.createCase(
    page,
    "waHearingCentreAdmin",
    true,
    "Assessment",
    "Other",
    true,
    true,
    "Email",
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
