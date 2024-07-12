import { test } from "@playwright/test";
import editDraft from "../journeys/CaseAPI/editDraft.ts";

test.describe("Case-API Edit draft tests. @CaseAPI", () => {
  test("As a Caseworker edit a CIC3 draft in the Case Management state. @crossbrowserCaseAPI", async ({
    page,
  }) => {
    await editDraft.editDraft(
      page,
      "caseWorker",
      "Case Management",
      false,
      false,
      "CIC3 - Rule 27",
    );
  });

  test("As a Senior Caseworker edit a CIC6 draft in the Ready to list state.", async ({
    page,
  }) => {
    await editDraft.editDraft(
      page,
      "seniorCaseworker",
      "Ready to list",
      false,
      false,
      "CIC6 - General Directions",
    );
  });

  test("As a hearing centre admin edit a CIC7 draft in the Awaiting Hearing state.", async ({
    page,
  }) => {
    await editDraft.editDraft(
      page,
      "hearingCentreAdmin",
      "Awaiting Hearing",
      false,
      false,
      "CIC7 - ME Dmi Reports",
    );
  });

  test("As a hearing Centre Team Lead edit a CIC8 draft in the Case Stayed state.", async ({
    page,
  }) => {
    await editDraft.editDraft(
      page,
      "hearingCentreTeamLead",
      "Case Stayed",
      false,
      false,
      "CIC8 - ME Joint Instruction",
    );
  });

  test("As a Senior Judge edit a CIC10 draft in the Case closed state. @crossbrowserCaseAPI", async ({
    page,
  }) => {
    await editDraft.editDraft(
      page,
      "seniorJudge",
      "Case closed",
      false,
      false,
      "CIC10 - Strike Out Warning",
    );
  });

  test("As a Judge edit a CIC13 draft in the case management state.", async ({
    page,
  }) => {
    await editDraft.editDraft(
      page,
      "judge",
      "Case Management",
      false,
      false,
      "CIC13 - Pro Forma Summons",
    );
  });

  test("As a Caseworker edit a CIC14 draft in the case management state.", async ({
    page,
  }) => {
    await editDraft.editDraft(
      page,
      "caseWorker",
      "Case Management",
      false,
      false,
      "CIC14 – LO General Directions",
    );
  });

  test("Error messaging - Edit draft @crossbrowserCaseAPI", async ({
    page,
  }) => {
    await editDraft.editDraft(
      page,
      "caseWorker",
      "Case Management",
      false,
      true,
      "CIC14 – LO General Directions",
    );
  });
});

test("Accessibility test - Edit draft @accessibilityCaseAPI @crossbrowserCaseAPI", async ({
  page,
}): Promise<void> => {
  await editDraft.editDraft(
    page,
    "caseWorker",
    "Case Management",
    true,
    false,
    "CIC14 – LO General Directions",
  );
});
