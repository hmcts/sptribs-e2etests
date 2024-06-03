import { test } from "@playwright/test";
import editCICACaseDetails from "../journeys/CaseAPI/editCICACaseDetails.ts";

test.describe.only("Edit CICA case details tests @CaseAPI", (): void => {
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

  test("Edit CICA case details as a respondent - awaiting outcome.", async ({
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

  test("Edit CICA case details as a respondent - case closed.", async ({
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

test("Accessibility test - edit CICA case details @accessibilityCaseAPI.", async ({
  page,
}): Promise<void> => {
  await editCICACaseDetails.editCICACaseDetails(
    page,
    "respondent",
    true,
    "Case Management",
  );
});
