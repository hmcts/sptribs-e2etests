import { test } from "@playwright/test";
import globalDataCleanUp from "../journeys/CaseAPI/globalDataCleanUp";

test.describe("Global Data Cleanup. @dataCleanup", () => {
  test("Global automation test data clean up.", async ({
    page,
  }): Promise<void> => {
    test.setTimeout(20 * 60 * 1000);
    await globalDataCleanUp.globalDataCleanUp(page);
  });
});
