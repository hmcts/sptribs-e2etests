import { test } from "@playwright/test";
import removeStay from "../journeys/CaseAPI/removeStay.ts";

test.describe("Case-API remove stay tests. @CaseAPI", () => {
  test("Remove a stay from a case for reason receivedOutcomeOfCivilCase as a caseworker with optional text.", async ({
    page,
  }): Promise<void> => {
    await removeStay.removeStay(
      page,
      false,
      "caseWorker",
      "receivedOutcomeOfCivilCase",
      true,
      false,
    );
  });

  test("Remove a stay from a case for reason receviedOutcomeOfCriminalProceedings as a seniorCaseworker without optional text.", async ({
    page,
  }): Promise<void> => {
    await removeStay.removeStay(
      page,
      false,
      "seniorCaseworker",
      "receviedOutcomeOfCriminalProceedings",
      false,
      false,
    );
  });

  test("Remove a stay from a case for reason receivedACourtJudgement as a hearingCentreAdmin with optional text.", async ({
    page,
  }): Promise<void> => {
    await removeStay.removeStay(
      page,
      false,
      "hearingCentreAdmin",
      "receivedACourtJudgement",
      true,
      false,
    );
  });

  test("Remove a stay from a case for reason applicantHasReachedRequiredAge as a hearingCentreTeamLead without optional text.", async ({
    page,
  }): Promise<void> => {
    await removeStay.removeStay(
      page,
      false,
      "hearingCentreTeamLead",
      "applicantHasReachedRequiredAge",
      false,
      false,
    );
  });

  test("Remove a stay from a case for reason subjectHasReceivedTheirMedicalTreatment as a seniorJudge with optional text.", async ({
    page,
  }): Promise<void> => {
    await removeStay.removeStay(
      page,
      false,
      "seniorJudge",
      "subjectHasReceivedTheirMedicalTreatment",
      true,
      false,
    );
  });

  test("Remove a stay from a case for reason receivedOutcomeOfCivilCase as a caseworker without optional text.", async ({
    page,
  }): Promise<void> => {
    await removeStay.removeStay(
      page,
      false,
      "caseWorker",
      "receivedOutcomeOfCivilCase",
      false,
      false,
    );
  });

  test("Remove a stay from a case for reason receivedOutcomeOfLinkedCase as a caseworker with optional text.", async ({
    page,
  }): Promise<void> => {
    await removeStay.removeStay(
      page,
      false,
      "caseWorker",
      "receivedOutcomeOfLinkedCase",
      true,
      false,
    );
  });

  test("Remove a stay from a case for reason Other as a caseworker without optional text.", async ({
    page,
  }): Promise<void> => {
    await removeStay.removeStay(
      page,
      false,
      "caseWorker",
      "Other",
      false,
      false,
    );
  });

  test("Error messages - Remove stay", async ({ page }): Promise<void> => {
    await removeStay.removeStay(
      page,
      false,
      "caseWorker",
      "Other",
      false,
      true,
    );
  });
});

test("Accessibility test - Remove stay @accessibilityCaseAPI", async ({
  page,
}): Promise<void> => {
  await removeStay.removeStay(page, true, "caseWorker", "Other", false, false);
});
