import { test } from "@playwright/test";
import documentManagementAmend from "../journeys/CaseAPI/documentManagementAmend.ts";

test.describe("Case-API Upload document tests. @CaseAPI", () => {
  test("As a Caseworker, amend documents uploaded to a submitted case. @crossbrowserCaseAPI", async ({
    page,
  }): Promise<void> => {
    await documentManagementAmend.documentManagementAmend(
      page,
      "caseWorker",
      false,
      "Submitted",
      false,
      false,
    );
  });
  test("As a Senior Caseworker, amend documents uploaded to a submitted case. @crossbrowserCaseAPI", async ({
    page,
  }): Promise<void> => {
    await documentManagementAmend.documentManagementAmend(
      page,
      "seniorCaseworker",
      false,
      "Case Management",
      false,
      false,
    );
  });
  test("As a Hearing Centre Admin, amend documents uploaded to a submitted case. @crossbrowserCaseAPI", async ({
    page,
  }): Promise<void> => {
    await documentManagementAmend.documentManagementAmend(
      page,
      "hearingCentreAdmin",
      false,
      "Ready to list",
      false,
      false,
    );
  });
  test("As a Hearing Centre Team Leader, amend documents uploaded to a submitted case. @crossbrowserCaseAPI", async ({
    page,
  }): Promise<void> => {
    await documentManagementAmend.documentManagementAmend(
      page,
      "hearingCentreTeamLead",
      false,
      "Awaiting Hearing",
      false,
      false,
    );
  });
  test("As a Senior Judge, amend documents uploaded to a submitted case. @crossbrowserCaseAPI", async ({
    page,
  }): Promise<void> => {
    await documentManagementAmend.documentManagementAmend(
      page,
      "seniorJudge",
      false,
      "Awaiting Outcome",
      false,
      false,
    );
  });
  test("As a Caseworker, amend documents uploaded to a submitted case. @crossbrowserCaseAPI", async ({
    page,
  }): Promise<void> => {
    await documentManagementAmend.documentManagementAmend(
      page,
      "caseWorker",
      false,
      "Case closed",
      false,
      false,
    );
  });
  test("As a Senior Caseworker, amend documents uploaded to a submitted case. @crossbrowserCaseAPI", async ({
    page,
  }): Promise<void> => {
    await documentManagementAmend.documentManagementAmend(
      page,
      "seniorCaseworker",
      false,
      "Case Stayed",
      false,
      false,
    );
  });
});

test("Accessibility tests - Document Management: Amend @accessibilityCaseAPI", async ({
  page,
}): Promise<void> => {
  await documentManagementAmend.documentManagementAmend(
    page,
    "caseWorker",
    true,
    "Submitted",
    false,
    false,
  );
});
