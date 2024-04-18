import { test } from "@playwright/test";
import editPanelComposition from "../journeys/CaseAPI/editPanelComposition.ts";

test.describe("Edit Panel Composition tests @CaseAPI", () => {
  test("As a caseworker edit a panel composition.", async ({
    page,
  }): Promise<void> => {
    await editPanelComposition.editPanelComposition(
      page,
      "caseWorker",
      false,
      "Lay Member",
      "Medical Member",
      true,
    );
  });

  test("As a senior caseworker edit a panel composition.", async ({
    page,
  }): Promise<void> => {
    await editPanelComposition.editPanelComposition(
      page,
      "seniorCaseworker",
      false,
      "Lay Member",
      "Medical Member",
      true,
    );
  });

  test("As a hearing centre admin edit a panel composition.", async ({
    page,
  }): Promise<void> => {
    await editPanelComposition.editPanelComposition(
      page,
      "hearingCentreAdmin",
      false,
      "Lay Member",
      "Medical Member",
      true,
    );
  });

  test("As a hearing centre team lead edit a panel composition.", async ({
    page,
  }): Promise<void> => {
    await editPanelComposition.editPanelComposition(
      page,
      "hearingCentreTeamLead",
      false,
      "Lay Member",
      "Medical Member",
      true,
    );
  });
});

test("Edit a panel composition - Accessibility test. @accessibilityCaseAPI", async ({
  page,
}): Promise<void> => {
  await editPanelComposition.editPanelComposition(
    page,
    "hearingCentreTeamLead",
    true,
    "Lay Member",
    "Medical Member",
    true,
  );
});
