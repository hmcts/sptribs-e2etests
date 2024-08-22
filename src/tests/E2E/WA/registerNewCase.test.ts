import { test } from "@playwright/test";
import registerNewCase from "../../journeys/WA/registerNewCase.ts";

test.describe("Register new case task tests @CaseAPI", (): void => {
  test("AC1: New task created", async ({ page }) => {
    await registerNewCase.seeTask(page, "waRegionalHearingCentreAdmin", false);
  });

  test("AC2: Task is completable", async ({ page }) => {
    await registerNewCase.completeTask(
      page,
      "waRegionalHearingCentreAdmin",
      false,
    );
  });
});
