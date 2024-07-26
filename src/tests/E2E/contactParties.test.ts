import { test } from "@playwright/test";
import contactParties from "../journeys/CaseAPI/contactParties.ts";

test.describe("Case-API Contact parties tests. @CaseAPI", () => {
  test("As a Hearing Centre Team Lead send a message to all parties related to a submitted case. @crossbrowserCaseAPI", async ({
    page,
  }): Promise<void> => {
    await contactParties.contactParties(
      page,
      "hearingCentreTeamLead",
      false,
      "Submitted",
      false,
    );
  });
  test("As a Hearing Centre Admin send a message to all parties related to a closed case.", async ({
    page,
  }): Promise<void> => {
    await contactParties.contactParties(
      page,
      "hearingCentreAdmin",
      false,
      "Case closed",
      false,
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
      false,
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
      false,
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
      false,
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
      false,
    );
  });
  test("As a Senior Caseworker send a message to all parties related to a case that is awaiting an outcome decision. @crossbrowserCaseAPI", async ({
    page,
  }): Promise<void> => {
    await contactParties.contactParties(
      page,
      "seniorCaseworker",
      false,
      "Awaiting Outcome",
      false,
    );
  });
  test("Error messaging - Contact parties @crossbrowserCaseAPI", async ({
    page,
  }): Promise<void> => {
    await contactParties.contactParties(
      page,
      "caseWorker",
      false,
      "Case Management",
      true,
    );
  });
});

test("Accessibility Test – Contact parties @accessibilityCaseAPI", async ({
  page,
}): Promise<void> => {
  await contactParties.contactParties(
    page,
    "caseWorker",
    true,
    "Case Management",
    false,
  );
});
