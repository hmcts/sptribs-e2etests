import { test } from "@playwright/test";
import panelComposition from "../journeys/CaseAPI/panelComposition.ts";

test.describe("Panel Composition tests @CaseAPI", () => {
  test("As a caseworker make a panel composition with all information.", async ({
    page,
  }): Promise<void> => {
    await panelComposition.panelComposition(
      page,
      "caseWorker",
      false,
      "Tribunal Judge",
      "Medical Member",
      true,
    );
  });
});
