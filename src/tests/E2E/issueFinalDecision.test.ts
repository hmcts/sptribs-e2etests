import { test } from "@playwright/test";
import issueFinalDecision from "../journeys/CaseAPI/issueFinalDecision.ts";

test.describe.only("Issue a final decision tests @CaseAPI", () => {
  test("As a caseworker issue a final decision which is uploaded", async ({
    page,
  }): Promise<void> => {
    await issueFinalDecision.issueFinalDecision(
      page,
      "caseWorker",
      false,
      false,
      "upload",
      null,
      "Final",
    );
  });

  test("As a senior caseworker issue a final decision which is uploaded", async ({
    page,
  }): Promise<void> => {
    await issueFinalDecision.issueFinalDecision(
      page,
      "seniorCaseworker",
      false,
      false,
      "upload",
      null,
      "Final",
    );
  });

  test("As a hearing centre admin issue a final decision which is uploaded", async ({
    page,
  }): Promise<void> => {
    await issueFinalDecision.issueFinalDecision(
      page,
      "hearingCentreAdmin",
      false,
      false,
      "upload",
      null,
      "Final",
    );
  });

  test("As a hearing centre team lead issue a final decision which is uploaded", async ({
    page,
  }): Promise<void> => {
    await issueFinalDecision.issueFinalDecision(
      page,
      "hearingCentreTeamLead",
      false,
      false,
      "upload",
      null,
      "Final",
    );
  });

  test("As a senior judge issue a final decision which is uploaded", async ({
    page,
  }): Promise<void> => {
    await issueFinalDecision.issueFinalDecision(
      page,
      "seniorJudge",
      false,
      false,
      "upload",
      null,
      "Final",
    );
  });

  test("As a caseworker issue a final decision which is a generated Eligibility decision", async ({
    page,
  }): Promise<void> => {
    await issueFinalDecision.issueFinalDecision(
      page,
      "caseWorker",
      false,
      false,
      "Create",
      "CIC1 - Eligibility",
      "Final",
    );
  });

  test("As a senior caseworker issue a final decision which is a generated Quantum decision", async ({
    page,
  }): Promise<void> => {
    await issueFinalDecision.issueFinalDecision(
      page,
      "seniorCaseworker",
      false,
      false,
      "Create",
      "CIC2 - Quantum",
      "Final",
    );
  });

  test("As a hearing centre admin issue a final decision which is a generated rule27 decision", async ({
    page,
  }): Promise<void> => {
    await issueFinalDecision.issueFinalDecision(
      page,
      "hearingCentreAdmin",
      false,
      false,
      "Create",
      "CIC3 - Rule 27",
      "Final",
    );
  });

  test("As a hearing centre team lead issue a final decision which is a generated blank decision", async ({
    page,
  }): Promise<void> => {
    await issueFinalDecision.issueFinalDecision(
      page,
      "hearingCentreTeamLead",
      false,
      false,
      "Create",
      "CIC4 - Blank Decision Notice",
      "Final",
    );
  });

  test("As a Senior Judge issue a final decision which is a generated General Directions", async ({
    page,
  }): Promise<void> => {
    await issueFinalDecision.issueFinalDecision(
      page,
      "seniorJudge",
      false,
      false,
      "Create",
      "CIC6 - General Directions",
      "Final",
    );
  });

  test("As a caseworker issue a final decision which is a generated ME Dmi Reports", async ({
    page,
  }): Promise<void> => {
    await issueFinalDecision.issueFinalDecision(
      page,
      "caseWorker",
      false,
      false,
      "Create",
      "CIC7 - ME Dmi Reports",
      "Final",
    );
  });

  test("As a caseworker issue a final decision which is a generated ME Joint directions", async ({
    page,
  }): Promise<void> => {
    await issueFinalDecision.issueFinalDecision(
      page,
      "caseWorker",
      false,
      false,
      "Create",
      "CIC8 - ME Joint Instructions",
      "Final",
    );
  });

  test("As a caseworker issue a final decision which is a strike out warning", async ({
    page,
  }): Promise<void> => {
    await issueFinalDecision.issueFinalDecision(
      page,
      "caseWorker",
      false,
      false,
      "Create",
      "CIC10 - Strike Out Warning",
      "Final",
    );
  });

  test("As a caseworker issue a final decision which is a strike decision notice", async ({
    page,
  }): Promise<void> => {
    await issueFinalDecision.issueFinalDecision(
      page,
      "caseWorker",
      false,
      false,
      "Create",
      "CIC11 - Strike Out Decision Notice",
      "Final",
    );
  });

  test("As a caseworker issue a final decision which is a Pro Forma Summons", async ({
    page,
  }): Promise<void> => {
    await issueFinalDecision.issueFinalDecision(
      page,
      "caseWorker",
      false,
      false,
      "Create",
      "CIC13 - Pro Forma Summons",
      "Final",
    );
  });

  test("Error Messaging - Issue a final decision", async ({
    page,
  }): Promise<void> => {
    await issueFinalDecision.issueFinalDecision(
      page,
      "caseWorker",
      false,
      true,
      "Create",
      "CIC4 - Blank Decision Notice",
      "Final",
    );
  });
});

test("Accessibility test - Issue a final decision @accessibilityCaseAPI", async ({
  page,
}): Promise<void> => {
  await issueFinalDecision.issueFinalDecision(
    page,
    "caseWorker",
    true,
    true,
    "Create",
    "CIC4 - Blank Decision Notice",
    "Final",
  );
});
