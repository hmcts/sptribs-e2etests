import { test } from "@playwright/test";
import waUsers_content from "../fixtures/content/waUsers_content.ts";
import globalDataCleanUp from "../journeys/CaseAPI/globalDataCleanUp";

test.describe("Global Data Cleanup. @dataCleanup", () => {
  test("Global automation test data clean up. - Admin", async ({
    page,
  }): Promise<void> => {
    test.setTimeout(15 * 60 * 1000);
    await globalDataCleanUp.globalDataCleanUp(
      page,
      waUsers_content.userRoleAdmin,
    );
  });

  test("Global automation test data clean up. - Judge", async ({
    page,
  }): Promise<void> => {
    test.setTimeout(15 * 60 * 1000);
    await globalDataCleanUp.globalDataCleanUp(
      page,
      waUsers_content.userRoleJudge,
    );
  });

  test("Global automation test data clean up. - Legal Officer", async ({
    page,
  }): Promise<void> => {
    test.setTimeout(15 * 60 * 1000);
    await globalDataCleanUp.globalDataCleanUp(page, waUsers_content.userRoleLO);
  });

  test("Global automation test data clean up. - Caseworker", async ({
    page,
  }): Promise<void> => {
    test.setTimeout(15 * 60 * 1000);
    await globalDataCleanUp.globalDataCleanUp(
      page,
      waUsers_content.userRoleCaseWorker,
    );
  });
});
