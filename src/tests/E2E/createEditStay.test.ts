import { test } from "@playwright/test";
import createEditStay from "../journeys/CaseAPI/createEditStay.ts";

test.describe("Case-API Create/edit stay tests. @CaseAPI", () => {
  test("Stay a case management case for reason waitingOutcomeOfCivilCase as a caseworker with optional text. @crossbrowserCaseAPI", async ({
    page,
  }): Promise<void> => {
    await createEditStay.createEditStay(
      page,
      false,
      "Case Management",
      "caseWorker",
      false,
      "waitingOutcomeOfCivilCase",
      true,
    );
  });

  test("Stay a case management case for reason awaitingOutcomeOfCriminalProceedings as a senior caseworker with no optional text.", async ({
    page,
  }): Promise<void> => {
    await createEditStay.createEditStay(
      page,
      false,
      "Case Management",
      "seniorCaseworker",
      false,
      "awaitingOutcomeOfCriminalProceedings",
      false,
    );
  });

  test("Stay a case management case for reason awaitingACourtJudgement as a hearingCentreAdmin with optional text.", async ({
    page,
  }): Promise<void> => {
    await createEditStay.createEditStay(
      page,
      false,
      "Case Management",
      "hearingCentreAdmin",
      false,
      "awaitingACourtJudgement",
      true,
    );
  });

  test("Stay a case management case for reason unableToProgressDueToSubject as a hearingCentreTeamLead with no optional text.", async ({
    page,
  }): Promise<void> => {
    await createEditStay.createEditStay(
      page,
      false,
      "Case Management",
      "hearingCentreTeamLead",
      false,
      "unableToProgressDueToSubject",
      false,
    );
  });

  test("Stay a case management case for reason unableToProgressAsSubjectUndergoingOrAwaitingTreatment as a seniorJudge with optional text.", async ({
    page,
  }): Promise<void> => {
    await createEditStay.createEditStay(
      page,
      false,
      "Case Management",
      "seniorJudge",
      false,
      "unableToProgressAsSubjectUndergoingOrAwaitingTreatment",
      true,
    );
  });

  test("Stay a case management case for reason awaitingOutcomeOfLinkedCase as a caseworker with no optional text.", async ({
    page,
  }): Promise<void> => {
    await createEditStay.createEditStay(
      page,
      false,
      "Case Management",
      "caseWorker",
      false,
      "awaitingOutcomeOfLinkedCase",
      false,
    );
  });

  test("Stay a case management case for reason Other as a caseworker with optional text.", async ({
    page,
  }): Promise<void> => {
    await createEditStay.createEditStay(
      page,
      false,
      "Case Management",
      "caseWorker",
      false,
      "Other",
      true,
    );
  });

  test("Stay a Ready to list case for reason waitingOutcomeOfCivilCase as a caseworker with optional text.", async ({
    page,
  }): Promise<void> => {
    await createEditStay.createEditStay(
      page,
      false,
      "Ready to list",
      "caseWorker",
      false,
      "waitingOutcomeOfCivilCase",
      true,
    );
  });

  test("Stay a Ready to list case for reason awaitingOutcomeOfCriminalProceedings as a senior caseworker with no optional text.", async ({
    page,
  }): Promise<void> => {
    await createEditStay.createEditStay(
      page,
      false,
      "Ready to list",
      "seniorCaseworker",
      false,
      "awaitingOutcomeOfCriminalProceedings",
      false,
    );
  });

  test("Stay a Ready to list case for reason awaitingACourtJudgement as a hearingCentreAdmin with optional text.", async ({
    page,
  }): Promise<void> => {
    await createEditStay.createEditStay(
      page,
      false,
      "Ready to list",
      "hearingCentreAdmin",
      false,
      "awaitingACourtJudgement",
      true,
    );
  });

  test("Stay a Ready to list case for reason unableToProgressDueToSubject as a hearingCentreTeamLead with no optional text. @crossbrowserCaseAPI", async ({
    page,
  }): Promise<void> => {
    await createEditStay.createEditStay(
      page,
      false,
      "Ready to list",
      "hearingCentreTeamLead",
      false,
      "unableToProgressDueToSubject",
      false,
    );
  });

  test("Stay a Ready to list case for reason unableToProgressAsSubjectUndergoingOrAwaitingTreatment as a seniorJudge with optional text.", async ({
    page,
  }): Promise<void> => {
    await createEditStay.createEditStay(
      page,
      false,
      "Ready to list",
      "seniorJudge",
      false,
      "unableToProgressAsSubjectUndergoingOrAwaitingTreatment",
      true,
    );
  });

  test("Stay a Ready to list case for reason awaitingOutcomeOfLinkedCase as a caseworker with no optional text.", async ({
    page,
  }): Promise<void> => {
    await createEditStay.createEditStay(
      page,
      false,
      "Ready to list",
      "caseWorker",
      false,
      "awaitingOutcomeOfLinkedCase",
      false,
    );
  });

  test("Stay a Ready to list case for reason Other as a caseworker with optional text.", async ({
    page,
  }): Promise<void> => {
    await createEditStay.createEditStay(
      page,
      false,
      "Ready to list",
      "caseWorker",
      false,
      "Other",
      true,
    );
  });
  test("Error messages - Create/Edit stay @crossbrowserCaseAPI", async ({
    page,
  }): Promise<void> => {
    await createEditStay.createEditStay(
      page,
      false,
      "Case Management",
      "caseWorker",
      true,
      "Other",
      true,
    );
  });
});

test("Accessibility test - Create/Edit stay @accessibilityCaseAPI @crossbrowserCaseAPI", async ({
  page,
}): Promise<void> => {
  await createEditStay.createEditStay(
    page,
    true,
    "Case Management",
    "caseWorker",
    false,
    "Other",
    true,
  );
});
