import { test } from "@playwright/test";
import issueToRespondent from "../journeys/CaseAPI/issueToRespondent.ts";

test.describe("Issue to respondent tests @CaseAPI", () => {
  test("As a caseworker Issue a case to all parties. @crossbrowserCaseAPI", async ({
    page,
  }): Promise<void> => {
    await issueToRespondent.issueToRespondent(
      page,
      "caseWorker",
      false,
      false,
      ["Subject", "Representative", "Respondent", "Applicant"],
    );
  });
  test("As a caseworker Issue a case to a subject.", async ({
    page,
  }): Promise<void> => {
    await issueToRespondent.issueToRespondent(
      page,
      "caseWorker",
      false,
      false,
      ["Subject"],
    );
  });
  test("As a caseworker Issue a case to a representative.", async ({
    page,
  }): Promise<void> => {
    await issueToRespondent.issueToRespondent(
      page,
      "caseWorker",
      false,
      false,
      ["Representative"],
    );
  });
  test("As a caseworker Issue a case to a respondent. @crossbrowserCaseAPI", async ({
    page,
  }): Promise<void> => {
    await issueToRespondent.issueToRespondent(
      page,
      "caseWorker",
      false,
      false,
      ["Respondent"],
    );
  });
  test("As a caseworker Issue a case to an applicant.", async ({
    page,
  }): Promise<void> => {
    await issueToRespondent.issueToRespondent(
      page,
      "caseWorker",
      false,
      false,
      ["Applicant"],
    );
  });
  test("As a senior caseworker Issue a case to all parties.", async ({
    page,
  }): Promise<void> => {
    await issueToRespondent.issueToRespondent(
      page,
      "seniorCaseworker",
      false,
      false,
      ["Subject", "Representative", "Respondent", "Applicant"],
    );
  });
  test("As a hearing centre admin Issue a case to all parties.", async ({
    page,
  }): Promise<void> => {
    await issueToRespondent.issueToRespondent(
      page,
      "hearingCentreAdmin",
      false,
      false,
      ["Subject", "Representative", "Respondent", "Applicant"],
    );
  });
  test("As a hearing centre team lead Issue a case to all parties.", async ({
    page,
  }): Promise<void> => {
    await issueToRespondent.issueToRespondent(
      page,
      "hearingCentreTeamLead",
      false,
      false,
      ["Subject", "Representative", "Respondent", "Applicant"],
    );
  });
  test("Error messaging - Issue to respondent. @crossbrowserCaseAPI", async ({
    page,
  }): Promise<void> => {
    await issueToRespondent.issueToRespondent(page, "caseWorker", false, true, [
      "Subject",
    ]);
  });
});

test("Accessibility test - Issue to respondent @accessibilityCaseAPI", async ({
  page,
}): Promise<void> => {
  await issueToRespondent.issueToRespondent(page, "caseWorker", true, false, [
    "Subject",
  ]);
});
