import { test } from "@playwright/test";
import editCase from "../journeys/CaseAPI/editCase.ts";

test.describe("Case-API Edit case tests. @CaseAPI", () => {
  test("Caseworker - DSS Submitted - Assessment - Fatal Category, Email Contact", async ({
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
      "1996",
      "Scotland",
      true,
      false,
      true,
      false,
      false,
    );
  });

  test("Caseworker - Submitted - Assessment - Medical Re-opening Category, Email Contact", async ({
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
      "2001",
      "Wales & South West",
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
      "1996",
      "Midlands",
      true,
      true,
      true,
      true,
      false,
    );
  });

  test("Error messaging.", async ({ page }) => {
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
      "1996",
      "Scotland",
      true,
      false,
      true,
      false,
      true,
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
    "1996",
    "Scotland",
    true,
    true,
    true,
    true,
    false,
  );
});
