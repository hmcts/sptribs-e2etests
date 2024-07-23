import { test } from "@playwright/test";
import editCICACaseDetails from "../journeys/CaseAPI/editCICACaseDetails.ts";

test.describe("Edit CICA case details tests @CaseAPI @crossbrowserCaseAPI", (): void => {
  test("Edit CICA case details as a respondent - case management.", async ({
    page,
  }): Promise<void> => {
    await editCICACaseDetails.editCICACaseDetails(
      page,
      "respondent",
      false,
      "Case Management",
    );
  });

  test("Edit CICA case details as a respondent - awaiting hearing.", async ({
    page,
  }): Promise<void> => {
    await editCICACaseDetails.editCICACaseDetails(
      page,
      "respondent",
      false,
      "Awaiting hearing",
    );
  });

  test("Edit CICA case details as a respondent - awaiting outcome. @crossbrowserCaseAPI", async ({
    page,
  }): Promise<void> => {
    await editCICACaseDetails.editCICACaseDetails(
      page,
      "respondent",
      false,
      "Awaiting outcome",
    );
  });

  test("Edit CICA case details as a respondent - case stayed.", async ({
    page,
  }): Promise<void> => {
    await editCICACaseDetails.editCICACaseDetails(
      page,
      "respondent",
      false,
      "Case stayed",
    );
  });

  test("Edit CICA case details as a respondent - case closed. @crossbrowserCaseAPI", async ({
    page,
  }): Promise<void> => {
    await editCICACaseDetails.editCICACaseDetails(
      page,
      "respondent",
      false,
      "Case closed",
    );
  });
});

test("Accessibility test - edit CICA case details @accessibilityCaseAPI. @crossbrowserCaseAPI", async ({
  page,
}): Promise<void> => {
  await editCICACaseDetails.editCICACaseDetails(
    page,
    "respondent",
    true,
    "Case Management",
  );
});
