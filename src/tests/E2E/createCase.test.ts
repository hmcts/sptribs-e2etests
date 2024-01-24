import { Page, test } from "@playwright/test";
import { UserRole } from "../config.ts";
import caseAPILoginPage from "../pages/CaseAPI/caseList/caseAPILoginPage.ts";
import casesPage from "../pages/CaseAPI/caseList/casesPage.ts";
import caseFilterPage from "../pages/CaseAPI/createCase/caseFilterPage.ts";

async function createCase(
  page: Page,
  user: UserRole,
  accessibilityTest: boolean,
): Promise<void> {
  await caseAPILoginPage.SignInUser(page, user);
  await casesPage.checkPageLoads(page, accessibilityTest);
  await casesPage.createCase(page);
  await caseFilterPage.checkPageLoads(page, accessibilityTest);
  await caseFilterPage.fillInFields(page);
}

test.only("some test", async ({ page }) => {
  await createCase(page, "caseWorker", true);
});
