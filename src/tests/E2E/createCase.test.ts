import { Page, test } from "@playwright/test";
import { UserRole } from "../config.ts";
import { Category, SubCategory } from "../helpers/commonHelpers.ts";
import caseAPILoginPage from "../pages/CaseAPI/caseList/caseAPILoginPage.ts";
import casesPage from "../pages/CaseAPI/caseList/casesPage.ts";
import caseFilterPage from "../pages/CaseAPI/createCase/caseFilterPage.ts";
import caseCategorisationDetailsPage from "../pages/CaseAPI/createCase/caseCategorisationDetailsPage.ts";
import caseDateObjectsPage from "../pages/CaseAPI/createCase/caseDateObjectsPage.ts";
import caseObjectsSubjectsPage from "../pages/CaseAPI/createCase/caseObjectsSubjectsPage.ts";

async function createCase(
  page: Page,
  user: UserRole,
  accessibilityTest: boolean,
  category: Category,
  subCategory: SubCategory,
): Promise<void> {
  await caseAPILoginPage.SignInUser(page, user);
  await casesPage.checkPageLoads(page, accessibilityTest);
  await casesPage.createCase(page);
  await caseFilterPage.checkPageLoads(page, accessibilityTest);
  await caseFilterPage.fillInFields(page);
  await caseCategorisationDetailsPage.checkPageLoads(page, accessibilityTest);
  await caseCategorisationDetailsPage.fillInFields(page, category, subCategory);
  await caseDateObjectsPage.checkPageLoads(page, accessibilityTest);
  await caseDateObjectsPage.fillInFields(page);
  await caseObjectsSubjectsPage.checkPageLoads(page, accessibilityTest);
  await caseObjectsSubjectsPage.fillInFields(page, subCategory);
}

test.only("some test", async ({ page }) => {
  const user = "caseWorker",
    accessibilityTest = true,
    category = "Assessment",
    subCategory = "Other";
  await createCase(page, user, accessibilityTest, category, subCategory);
});
