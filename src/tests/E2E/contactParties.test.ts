import { test } from "@playwright/test";
import contactParties from "../journeys/CaseAPI/contactParties.ts";

test.describe("Case-API Contact parties tests. @CaseAPI", () => {
  test("As a Caseworker send a message to all parties related to a draft case.", async ({
    page,
  }): Promise<void> => {
    await contactParties.contactParties(page, "caseWorker", false, "Draft");
  });
  test("As a Senior Caseworker send a message to all parties related to a withdrawn case.", async ({
    page,
  }): Promise<void> => {
    await contactParties.contactParties(
      page,
      "seniorCaseworker",
      false,
      "Withdrawn",
    );
  });
  test("As a Hearing Centre Admin send a message to all parties related to a rejected case.", async ({
    page,
  }): Promise<void> => {
    await contactParties.contactParties(
      page,
      "hearingCentreAdmin",
      false,
      "Rejected",
    );
  });
  test("As a Hearing Centre Team Lead send a message to all parties related to a submitted case.", async ({
    page,
  }): Promise<void> => {
    await contactParties.contactParties(
      page,
      "hearingCentreTeamLead",
      false,
      "Submitted",
    );
  });
  test("As a Senior Judge send a message to all parties related to a case in Case Management.", async ({
    page,
  }): Promise<void> => {
    await contactParties.contactParties(
      page,
      "seniorJudge",
      false,
      "Case Management",
    );
  });
  test("As a Respondent send a message to all parties related to a case in Ready to list.", async ({
    page,
  }): Promise<void> => {
    await contactParties.contactParties(
      page,
      "respondent",
      false,
      "Ready to list",
    );
  });
  test("As a Caseworker send a message to all parties related to a case that is awaiting a hearing.", async ({
    page,
  }): Promise<void> => {
    await contactParties.contactParties(
      page,
      "caseWorker",
      false,
      "Awaiting Hearing",
    );
  });
  test("As a Caseworker send a message to all parties related to a case that is awaiting an outcome decision.", async ({
    page,
  }): Promise<void> => {
    await contactParties.contactParties(
      page,
      "caseWorker",
      false,
      "Awaiting Outcome",
    );
  });
  test("As a Caseworker send a message to all parties related to a closed case.", async ({
    page,
  }): Promise<void> => {
    await contactParties.contactParties(
      page,
      "caseWorker",
      false,
      "Case closed",
    );
  });
  test("As a Caseworker send a message to all parties related to a case that is stayed.", async ({
    page,
  }): Promise<void> => {
    await contactParties.contactParties(
      page,
      "caseWorker",
      false,
      "Case Stayed",
    );
  });
});
