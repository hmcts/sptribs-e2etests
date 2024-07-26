import { test } from "@playwright/test";
import manageDueDate from "../journeys/CaseAPI/manageDueDate.ts";

test.describe("Manage due date of an order @CaseAPI", () => {
  test("Manage due date of an order in 'Case Management' State as a Caseworker. @crossbrowserCaseAPI", async ({
    page,
  }): Promise<void> => {
    await manageDueDate.manageDueDate(
      page,
      "caseWorker",
      "Case Management",
      false,
      false,
      true,
      true,
    );
  });

  test("Manage due date of an order in 'Ready to List State' as a Senior Caseworker", async ({
    page,
  }): Promise<void> => {
    await manageDueDate.manageDueDate(
      page,
      "seniorCaseworker",
      "Ready to list",
      false,
      false,
      true,
      false,
    );
  });

  test("Manage due date of an order in 'Awaiting Hearing' State as a Hearing Center Admin", async ({
    page,
  }): Promise<void> => {
    await manageDueDate.manageDueDate(
      page,
      "hearingCentreAdmin",
      "Awaiting Hearing",
      false,
      false,
      false,
      false,
    );
  });

  test("Manage due date of an order in 'Case Stayed' State as a Hearing Center Team Lead", async ({
    page,
  }): Promise<void> => {
    await manageDueDate.manageDueDate(
      page,
      "hearingCentreTeamLead",
      "Case Stayed",
      false,
      false,
      false,
      true,
    );
  });

  test("Manage due date of an order in 'Case Closed' State as a Senior Judge. @crossbrowserCaseAPI", async ({
    page,
  }): Promise<void> => {
    await manageDueDate.manageDueDate(
      page,
      "seniorJudge",
      "Case closed",
      false,
      false,
      true,
      true,
    );
  });

  test.only("Error Messaging - Orders: Manage Due Date. @crossbrowserCaseAPI", async ({
    page,
  }): Promise<void> => {
    await manageDueDate.manageDueDate(
      page,
      "caseWorker",
      "Case Management",
      false,
      true,
      false,
      false,
    );
  });
});

test("Accessibility test - Orders: Manage Due Date @accessibilityCaseAPI. @crossbrowserCaseAPI", async ({
  page,
}): Promise<void> => {
  await manageDueDate.manageDueDate(
    page,
    "caseWorker",
    "Awaiting Hearing",
    true,
    false,
    true,
    true,
  );
});
