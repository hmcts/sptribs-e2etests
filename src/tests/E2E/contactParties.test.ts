import { test } from "@playwright/test";
import contactParties from "../journeys/CaseAPI/contactParties.ts";

test.describe("Case-API Contact parties tests. @CaseAPI", () => {
  test("Contact all case related parties as a caseworker.", async ({
    page,
  }): Promise<void> => {
    await contactParties.contactParties(page, "caseWorker", false, "Draft");
  });
  test("As a caseworker send a message to all parties related to a withdrawn case.", async ({
    page,
  }): Promise<void> => {
    await contactParties.contactParties(page, "caseWorker", false, "Withdrawn");
  });
  test("As a caseworker send a message to all parties related to a rejected case.", async ({
    page,
  }): Promise<void> => {
    await contactParties.contactParties(page, "caseWorker", false, "Rejected");
  });
  test("As a caseworker send a message to all parties related to a submitted case.", async ({
    page,
  }): Promise<void> => {
    await contactParties.contactParties(page, "caseWorker", false, "Submitted");
  });
  test("As a caseworker send a message to all parties related to a case.", async ({
    page,
  }): Promise<void> => {
    await contactParties.contactParties(
      page,
      "caseWorker",
      false,
      "Case Management",
    );
  });
  test("As a caseworker send a message to all parties related to a case in Ready to list.", async ({
    page,
  }): Promise<void> => {
    await contactParties.contactParties(
      page,
      "caseWorker",
      false,
      "Ready to list",
    );
  });
  test("As a caseworker send a message to all parties related to a case that is awaiting a hearing.", async ({
    page,
  }): Promise<void> => {
    await contactParties.contactParties(
      page,
      "caseWorker",
      false,
      "Awaiting Hearing",
    );
  });
  test("As a caseworker send a message to all parties related to a case that is awaiting an outcome decision.", async ({
    page,
  }): Promise<void> => {
    await contactParties.contactParties(
      page,
      "caseWorker",
      false,
      "Awaiting Outcome",
    );
  });
  test("As a caseworker send a message to all parties related to a closed case.", async ({
    page,
  }): Promise<void> => {
    await contactParties.contactParties(
      page,
      "caseWorker",
      false,
      "Case closed",
    );
  });
  test("As a caseworker send a message to all parties related to a case that is stayed.", async ({
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
