import { test } from "@playwright/test";
import globalDataCleanUp from "../journeys/CaseAPI/globalDataCleanUp";
import waUsers_content from "../fixtures/content/waUsers_content.ts";

test.describe("Global Data Cleanup. @dataCleanup", () => {
  test("Global automation test data clean up. - Admin", async ({
    page,
  }): Promise<void> => {
    test.setTimeout(20 * 60 * 1000);
    await globalDataCleanUp.globalDataCleanUp(
      page,
      waUsers_content.userRoleAdmin,
    );
    await globalDataCleanUp.globalDataCleanUp(
      page,
      waUsers_content.userRoleJudge,
    );
    await globalDataCleanUp.globalDataCleanUp(page, waUsers_content.userRoleLO);
    await globalDataCleanUp.globalDataCleanUp(
      page,
      waUsers_content.userRoleCaseWorker,
    );
  });
});
