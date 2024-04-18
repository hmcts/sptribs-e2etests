import { test } from "@playwright/test";
import panelComposition from "../journeys/CaseAPI/panelComposition.ts";

test.describe("Panel Composition tests @CaseAPI", () => {
  test("As a caseworker make a panel composition only one panel member and no specialism information.", async ({
    page,
  }): Promise<void> => {
    await panelComposition.panelComposition(
      page,
      "caseWorker",
      false,
      null,
      null,
      false,
    );
  });
  test("As a caseworker make a panel composition only one panel member and specialism information.", async ({
    page,
  }): Promise<void> => {
    await panelComposition.panelComposition(
      page,
      "caseWorker",
      false,
      null,
      null,
      true,
    );
  });
  test("As a caseworker make a panel composition only two panel members and no specialism information", async ({
    page,
  }): Promise<void> => {
    await panelComposition.panelComposition(
      page,
      "caseWorker",
      false,
      "Lay Member",
      null,
      false,
    );
  });
  test("As a caseworker make a panel composition with all information.", async ({
    page,
  }): Promise<void> => {
    await panelComposition.panelComposition(
      page,
      "caseWorker",
      false,
      "Medical Member",
      "Lay Member",
      true,
    );
  });
  test("As a senior caseworker make a panel composition with all information.", async ({
    page,
  }): Promise<void> => {
    await panelComposition.panelComposition(
      page,
      "seniorCaseworker",
      false,
      "Medical Member",
      "Lay Member",
      true,
    );
  });
  test("As a hearing centre admin make a panel composition with all information.", async ({
    page,
  }): Promise<void> => {
    await panelComposition.panelComposition(
      page,
      "hearingCentreAdmin",
      false,
      "Medical Member",
      "Lay Member",
      true,
    );
  });
  test("As a hearing centre team lead make a panel composition with all information.", async ({
    page,
  }): Promise<void> => {
    await panelComposition.panelComposition(
      page,
      "hearingCentreTeamLead",
      false,
      "Medical Member",
      "Lay Member",
      true,
    );
  });
});
