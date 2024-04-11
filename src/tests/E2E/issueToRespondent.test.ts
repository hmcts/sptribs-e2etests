import { test } from "@playwright/test";
import issueToRespondent from "../journeys/CaseAPI/issueToRespondent.ts";

test.describe("Issue to respondent tests", () => {
  test("As a caseworker Issue a case to all parties @CaseAPI", async ({
    page,
  }): Promise<void> => {
    await issueToRespondent.issueToRespondent(
      page,
      "caseWorker",
      false,
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
      ["Subject", "Representative", "Respondent", "Applicant"],
    );
  });
  test("As a caseworker Issue a case to a subject @CaseAPI", async ({
    page,
  }): Promise<void> => {
    await issueToRespondent.issueToRespondent(
      page,
      "caseWorker",
      false,
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
      ["Subject"],
    );
  });
  test("As a caseworker Issue a case to a representative @CaseAPI", async ({
    page,
  }): Promise<void> => {
    await issueToRespondent.issueToRespondent(
      page,
      "caseWorker",
      false,
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
      ["Representative"],
    );
  });
  test("As a caseworker Issue a case to a respondent @CaseAPI", async ({
    page,
  }): Promise<void> => {
    await issueToRespondent.issueToRespondent(
      page,
      "caseWorker",
      false,
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
      ["Respondent"],
    );
  });
  test("As a caseworker Issue a case to an applicant @CaseAPI", async ({
    page,
  }): Promise<void> => {
    await issueToRespondent.issueToRespondent(
      page,
      "caseWorker",
      false,
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
      ["Applicant"],
    );
  });
  test("As a senior caseworker Issue a case to all parties @CaseAPI", async ({
    page,
  }): Promise<void> => {
    await issueToRespondent.issueToRespondent(
      page,
      "seniorCaseworker",
      false,
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
      ["Subject", "Representative", "Respondent", "Applicant"],
    );
  });
  test("As a hearing centre admin Issue a case to all parties @CaseAPI", async ({
    page,
  }): Promise<void> => {
    await issueToRespondent.issueToRespondent(
      page,
      "hearingCentreAdmin",
      false,
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
      ["Subject", "Representative", "Respondent", "Applicant"],
    );
  });
  test("As a hearing centre team lead Issue a case to all parties @CaseAPI", async ({
    page,
  }): Promise<void> => {
    await issueToRespondent.issueToRespondent(
      page,
      "hearingCentreTeamLead",
      false,
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
      ["Subject", "Representative", "Respondent", "Applicant"],
    );
  });
  test("Error messaging - Issue to respondent @CaseAPI", async ({
    page,
  }): Promise<void> => {
    await issueToRespondent.issueToRespondent(
      page,
      "caseWorker",
      false,
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
      true,
      ["Subject"],
    );
  });
});

test("Accessibility test - Issue to respondent @accessibilityCaseAPI", async ({
  page,
}): Promise<void> => {
  await issueToRespondent.issueToRespondent(
    page,
    "caseWorker",
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
    ["Subject"],
  );
});
