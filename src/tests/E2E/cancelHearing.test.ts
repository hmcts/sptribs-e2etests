import { test } from "@playwright/test";
import cancelHearing from "../journeys/CaseAPI/cancelHearing.ts";

test.describe.only("Cancel hearing tests @CaseAPI", (): void => {
  test("Cancel hearing as a caseworker - case rejected.", async ({
    page,
  }): Promise<void> => {
    await cancelHearing.cancelHearing(
      page,
      "caseWorker",
      false,
      "Case Rejected",
      false,
    );
  });

  test("Cancel hearing as a senior caseworker - consent order.", async ({
    page,
  }): Promise<void> => {
    await cancelHearing.cancelHearing(
      page,
      "seniorCaseworker",
      false,
      "Consent Order received and no time for infill",
      false,
    );
  });

  test("Cancel hearing as a hearing centre admin - incomplete panel.", async ({
    page,
  }): Promise<void> => {
    await cancelHearing.cancelHearing(
      page,
      "hearingCentreAdmin",
      false,
      "Incomplete Panel",
      false,
    );
  });

  test("Cancel hearing as a hearing centre team lead - no suitable cases.", async ({
    page,
  }): Promise<void> => {
    await cancelHearing.cancelHearing(
      page,
      "hearingCentreTeamLead",
      false,
      "No suitable cases that are ready to list",
      false,
    );
  });

  test("Cancel hearing as a senior judge - request for R27.", async ({
    page,
  }): Promise<void> => {
    await cancelHearing.cancelHearing(
      page,
      "seniorJudge",
      false,
      "Request for R27 decision and no time for infill",
      false,
    );
  });

  test("Cancel hearing as a caseworker - venue unavailable.", async ({
    page,
  }): Promise<void> => {
    await cancelHearing.cancelHearing(
      page,
      "caseWorker",
      false,
      "Venue Unavailable",
      false,
    );
  });

  test("Cancel hearing as a caseworker - other reason.", async ({
    page,
  }): Promise<void> => {
    await cancelHearing.cancelHearing(
      page,
      "caseWorker",
      false,
      "Other",
      false,
    );
  });

  test("Error messaging.", async ({ page }): Promise<void> => {
    await cancelHearing.cancelHearing(
      page,
      "caseWorker",
      false,
      "Case Rejected",
      true,
    );
  });
});

test("Accessibility test - create summary @accessibilityCaseAPI.", async ({
  page,
}): Promise<void> => {
  await cancelHearing.cancelHearing(
    page,
    "caseWorker",
    true,
    "Case Rejected",
    false,
  );
});
