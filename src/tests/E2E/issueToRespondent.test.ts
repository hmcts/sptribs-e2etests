import { test } from "@playwright/test";
import issueToRespondent from "../journeys/CaseAPI/issueToRespondent.ts";

test.describe("Issue to respondent tests", () => {
  test("Issue a case to all parties @CaseAPI", async ({
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
