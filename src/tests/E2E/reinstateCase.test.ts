import { test } from "@playwright/test";
import reinstateCase from "../journeys/CaseAPI/reinstateCase.ts";

test.describe("Case-API Close Reinstate case tests. @CaseAPI", () => {
  test("Reinstate a case as a caseworker which has been closed in error with no optional text. @crossbrowserCaseAPI", async ({
    page,
  }): Promise<void> => {
    await reinstateCase.reinstateCase(
      page,
      "caseWorker",
      false,
      false,
      "caseHadBeenClosedInError",
      true,
    );
  });

  test("Reinstate a case as a senior caseworker which has had a withdrawal decision with no optional text.", async ({
    page,
  }): Promise<void> => {
    await reinstateCase.reinstateCase(
      page,
      "seniorCaseworker",
      false,
      false,
      "requestFollowingAWithdrawalDecision",
      false,
    );
  });

  test("Reinstate a case as a hearing centre admin which has had a oral hearing with optional text.", async ({
    page,
  }): Promise<void> => {
    await reinstateCase.reinstateCase(
      page,
      "hearingCentreAdmin",
      false,
      false,
      "Request to set aside a tribunal decision following an oral hearing",
      true,
    );
  });

  test("Reinstate a case as a hearing centre team lead which has had a rule 27 decision with no optional text.", async ({
    page,
  }): Promise<void> => {
    await reinstateCase.reinstateCase(
      page,
      "hearingCentreTeamLead",
      false,
      false,
      "requestFollowingAnOralHearingApplicationFollowingARule27Decision",
      false,
    );
  });

  test("Reinstate a case as a senior judge which has had a upper tribunal decision with optional text.", async ({
    page,
  }): Promise<void> => {
    await reinstateCase.reinstateCase(
      page,
      "seniorJudge",
      false,
      false,
      "requestFollowingADecisionFromTheUpperTribunal",
      true,
    );
  });

  test("Reinstate a case as a caseworker which has a strikeout decision with no optional text. @crossbrowserCaseAPI", async ({
    page,
  }): Promise<void> => {
    await reinstateCase.reinstateCase(
      page,
      "caseWorker",
      false,
      false,
      "RequestFollowingAStrikeOutDecision",
      false,
    );
  });

  test("Reinstate a case as a caseworker for reason other with optional text.", async ({
    page,
  }): Promise<void> => {
    await reinstateCase.reinstateCase(
      page,
      "caseWorker",
      false,
      false,
      "Other",
      true,
    );
  });

  test("Error messaging - Reinstate case. @crossbrowserCaseAPI", async ({
    page,
  }): Promise<void> => {
    await reinstateCase.reinstateCase(
      page,
      "caseWorker",
      false,
      true,
      "RequestFollowingAStrikeOutDecision",
      true,
    );
  });
});

test("Accessibility test - Reinstate case. @accessibilityCaseAPI @crossbrowserCaseAPI", async ({
  page,
}): Promise<void> => {
  await reinstateCase.reinstateCase(
    page,
    "caseWorker",
    true,
    false,
    "RequestFollowingAStrikeOutDecision",
    false,
  );
});
