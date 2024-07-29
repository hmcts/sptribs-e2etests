import { test } from "@playwright/test";
import clearHearingOptions from "../journeys/CaseAPI/clearHearingOptions.ts";

test.describe("Case-API clear hearing options tests. @CaseAPI", () => {
  test("Caseworker clearing hearing options @crossbrowserCaseAPI", async ({
    page,
  }): Promise<void> => {
    await clearHearingOptions.clearHearingOptions(page, "caseWorker", false);
  });

  test("Senior caseworker clearing hearing options @crossbrowserCaseAPI", async ({
    page,
  }): Promise<void> => {
    await clearHearingOptions.clearHearingOptions(
      page,
      "seniorCaseworker",
      false,
    );
  });

  test("Hearing centre admin clearing hearing options", async ({
    page,
  }): Promise<void> => {
    await clearHearingOptions.clearHearingOptions(
      page,
      "hearingCentreAdmin",
      false,
    );
  });

  test("Hearing centre team lead clearing hearing options @crossbrowserCaseAPI", async ({
    page,
  }): Promise<void> => {
    await clearHearingOptions.clearHearingOptions(
      page,
      "hearingCentreTeamLead",
      false,
    );
  });
});

test("Accessibility tests - Clear hearing options @accessibilityCaseAPI", async ({
  page,
}): Promise<void> => {
  await clearHearingOptions.clearHearingOptions(
    page,
    "hearingCentreTeamLead",
    true,
  );
});
