import { test } from "@playwright/test";
import documentManagementAmend from "../journeys/CaseAPI/documentManagementAmend.ts";

test.describe("Case-API Amend document tests. @CaseAPI", () => {
  test("As a Caseworker, amend documents uploaded to a submitted case. @crossbrowserCaseAPI", async ({
    page,
  }): Promise<void> => {
    await documentManagementAmend.documentManagementAmend(
      page,
      "caseWorker",
      false,
      "Submitted",
    );
  });
  test("As a Senior Caseworker, amend documents uploaded to a case in Case Management. @crossbrowserCaseAPI", async ({
    page,
  }): Promise<void> => {
    await documentManagementAmend.documentManagementAmend(
      page,
      "seniorCaseworker",
      false,
      "Case Management",
    );
  });
  test("As a Hearing Centre Admin, amend documents uploaded to a case in Ready to List. @crossbrowserCaseAPI", async ({
    page,
  }): Promise<void> => {
    await documentManagementAmend.documentManagementAmend(
      page,
      "hearingCentreAdmin",
      false,
      "Ready to list",
    );
  });
  test("As a Hearing Centre Team Leader, amend documents uploaded to a case awaiting a hearing. @crossbrowserCaseAPI", async ({
    page,
  }): Promise<void> => {
    await documentManagementAmend.documentManagementAmend(
      page,
      "hearingCentreTeamLead",
      false,
      "Awaiting Hearing",
    );
  });
  test("As a Senior Judge, amend documents uploaded to a case awaiting an outcome. @crossbrowserCaseAPI", async ({
    page,
  }): Promise<void> => {
    await documentManagementAmend.documentManagementAmend(
      page,
      "seniorJudge",
      false,
      "Awaiting Outcome",
    );
  });
  test("As a Caseworker, amend documents uploaded to a closed case. @crossbrowserCaseAPI", async ({
    page,
  }): Promise<void> => {
    await documentManagementAmend.documentManagementAmend(
      page,
      "caseWorker",
      false,
      "Case closed",
    );
  });
  test("As a Senior Caseworker, amend documents uploaded to a Stayed case. @crossbrowserCaseAPI", async ({
    page,
  }): Promise<void> => {
    await documentManagementAmend.documentManagementAmend(
      page,
      "seniorCaseworker",
      false,
      "Case Stayed",
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
  );
});
