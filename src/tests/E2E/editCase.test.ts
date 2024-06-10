import { test } from "@playwright/test";
import editCase from "../journeys/CaseAPI/editCase.ts";

test.describe("Case-API Edit case tests. @CaseAPI", () => {
  test("Caseworker - DSS Submitted - Assessment - Fatal Category, Email Contact, multiple documents", async ({
    page,
  }) => {
    await editCase.editCase(
      page,
      "caseWorker",
      false,
      "DSS Submitted",
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
      false,
    );
  });

  test.only("Caseworker - Submitted - Assessment - Medical Re-opening Category, Email Contact", async ({
    page,
  }) => {
    await editCase.editCase(
      page,
      "caseWorker",
      false,
      "Submitted",
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
      false,
    );
  });

  test("Caseworker - Case management - Assessment - Minor Category, Post Contact", async ({
    page,
  }) => {
    await editCase.editCase(
      page,
      "caseWorker",
      false,
      "Case Management",
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
      false,
    );
  });

  test("Caseworker - Ready to list - Assessment - Paragraph 26 Category, Post Contact", async ({
    page,
  }) => {
    await editCase.editCase(
      page,
      "caseWorker",
      false,
      "Ready to list",
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
      false,
    );
  });

  test("Caseworker - Awaiting hearing - Assessment - Sexual Abuse Category, Email Contact", async ({
    page,
  }) => {
    await editCase.editCase(
      page,
      "caseWorker",
      false,
      "Awaiting hearing",
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
      false,
    );
  });

  test("Caseworker - Awaiting outcome - Assessment - Special Jurisdiction Category, Email Contact", async ({
    page,
  }) => {
    await editCase.editCase(
      page,
      "caseWorker",
      false,
      "Awaiting outcome",
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
      false,
    );
  });

  test("Caseworker - Eligibility - Other Category, Email Contact", async ({
    page,
  }) => {
    await editCase.editCase(
      page,
      "caseWorker",
      false,
      "Submitted",
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
      false,
    );
  });

  test("Caseworker - Eligibility - Fatal Category, Post Contact", async ({
    page,
  }) => {
    await editCase.editCase(
      page,
      "caseWorker",
      false,
      "Submitted",
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
      false,
    );
  });

  test("Caseworker - Eligibility - Medical Re-opening Category, Email Contact", async ({
    page,
  }) => {
    await editCase.editCase(
      page,
      "caseWorker",
      false,
      "Submitted",
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
      false,
    );
  });

  test("Caseworker - Eligibility - Minor Category, Post Contact", async ({
    page,
  }) => {
    await editCase.editCase(
      page,
      "caseWorker",
      false,
      "Submitted",
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
      false,
    );
  });

  test("Caseworker - Eligibility - Paragraph 26 Category, Post Contact", async ({
    page,
  }) => {
    await editCase.editCase(
      page,
      "caseWorker",
      false,
      "Submitted",
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
      false,
    );
  });

  test("Caseworker - Eligibility - Sexual Abuse Category, Email Contact", async ({
    page,
  }) => {
    await editCase.editCase(
      page,
      "caseWorker",
      false,
      "Submitted",
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
      false,
    );
  });

  test("Caseworker - Assessment - Other Category, Email Contact", async ({
    page,
  }) => {
    await editCase.editCase(
      page,
      "caseWorker",
      false,
      "Submitted",
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
      false,
    );
  });

  test("Caseworker - Eligibility - Other Category, Post Contact", async ({
    page,
  }) => {
    await editCase.editCase(
      page,
      "caseWorker",
      false,
      "Submitted",
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
      false,
    );
  });

  test("Senior Judge - Assessment - Other Category, Post Contact", async ({
    page,
  }) => {
    await editCase.editCase(
      page,
      "seniorJudge",
      false,
      "Submitted",
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
      false,
    );
  });

  test("Senior Caseworker - Assessment - Other Category, Post Contact", async ({
    page,
  }) => {
    await editCase.editCase(
      page,
      "seniorCaseworker",
      false,
      "Submitted",
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
      false,
    );
  });

  test("Hearing centre admin - Eligibility - Other Category, Email Contact", async ({
    page,
  }) => {
    await editCase.editCase(
      page,
      "hearingCentreAdmin",
      false,
      "Submitted",
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
      false,
    );
  });

  test("Hearing Centre Team Lead - Assessment - Other Category, Email Contact", async ({
    page,
  }) => {
    await editCase.editCase(
      page,
      "hearingCentreTeamLead",
      false,
      "Submitted",
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
      false,
    );
  });
});

test("Accessibility test every page. @accessibilityCaseAPI", async ({
  page,
}) => {
  await editCase.editCase(
    page,
    "caseWorker",
    true,
    "Submitted",
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
    false,
  );
});
