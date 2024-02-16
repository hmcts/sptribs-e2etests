import { test } from "@playwright/test";
import { createCase} from "../journeys/CaseAPI/createCase.ts";
import { buildCase } from "../journeys/CaseAPI/buildCase.ts";

test.describe("Case-API Build case test.", () => {
  test("Create and build case as a caseworker", async ({ page }) => {
    await createCase(
      page,
      "caseWorker",
      true,
      "Assessment",
      "Other",
      true,
      true,
      "Email",
      true,
      true,
      "1996",
      "Scotland",
      true,
      true,
      true,
      true,
    );
    await buildCase(page, "Submitted");
  });
});
