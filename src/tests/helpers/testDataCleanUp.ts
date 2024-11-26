import { Page } from "@playwright/test";
import caseAPILoginPage from "../pages/CaseAPI/caseList/caseAPILoginPage";
import myWorkPage from "../pages/WA/myWorkPage";
import taskNames_content from "../fixtures/content/taskNames_content.ts";

async function testDataCleanUp(page: Page, user: any): Promise<void> {
  const locator1: any = page
    .locator("tr", { hasText: "Subject AutoTesting" })
    .filter({
      has: page.locator(
        `exui-task-field:has-text("${taskNames_content.issueDecisionNotice}")`,
      ),
    });
  const locator2: any = page
    .locator("tr", { hasText: "Subject AutoTesting" })
    .filter({
      has: page.locator(
        `exui-task-field:has-text("${taskNames_content.completeHearingOutcome}")`,
      ),
    });
  const locator3: any = page
    .locator("tr", { hasText: "Subject AutoTesting" })
    .filter({
      has: page.locator(
        `exui-task-field:has-text("${taskNames_content.stitchCollateHearingBundle}")`,
      ),
    });
  const availableTasksLocator = [locator1, locator2, locator3];
  await caseAPILoginPage.SignInUser(page, user);
  await myWorkPage.navigateToMyWorkPage(page);
  await myWorkPage.selectAvailableTasks(page, user);
  while (true) {
    let anySelectorVisible = false;
    for (const selector of availableTasksLocator) {
      if (await selector.first().isVisible()) {
        await selector
          .first()
          .locator(`div > button:has-text("Manage")`)
          .click();
        await page.waitForSelector("#action_claim");
        await page.locator("#action_claim").click();
        if (page.url().includes("service-down")) {
          continue;
        }
        await page.waitForTimeout(7000);
        anySelectorVisible = true;
      }
    }
    if (anySelectorVisible) {
      continue;
    }
    const nextPageButton = page.locator(`a[aria-label="Next page"]`);
    if (await nextPageButton.isVisible()) {
      await nextPageButton.click();
      await page.waitForTimeout(3000);
    } else {
      break;
    }
  }
  await page.locator(`a:text-is("My work")`).click();
  await page.waitForSelector(`h3:text-is("My work")`);
  await page.waitForTimeout(7000);
  const autotestingTaskLocator1: any = page
    .locator("tr", { hasText: "Subject AutoTesting" })
    .filter({
      has: page.locator(
        `a:has-text("${taskNames_content.issueDecisionNotice}")`,
      ),
    });
  const autotestingTaskLocator2: any = page
    .locator("tr", { hasText: "Subject AutoTesting" })
    .filter({
      has: page.locator(
        `a:has-text("${taskNames_content.completeHearingOutcome}")`,
      ),
    });
  const autotestingTaskLocator3: any = page
    .locator("tr", { hasText: "Subject AutoTesting" })
    .filter({
      has: page.locator(
        `a:has-text("${taskNames_content.stitchCollateHearingBundle}")`,
      ),
    });
  const myTaskLocators = [
    autotestingTaskLocator1,
    autotestingTaskLocator2,
    autotestingTaskLocator3,
  ];
  while (true) {
    let anySelectorVisible1 = false;
    for (const selector1 of myTaskLocators) {
      if (await selector1.first().isVisible()) {
        await selector1.first().locator(`button:has-text("Manage")`).click();
        await page.waitForSelector("#action_cancel");
        await page.locator("#action_cancel").click();
        if (page.url().includes("service-down")) {
          continue;
        }
        await page.waitForSelector(`button:text-is("Cancel task")`);
        await page.locator("#submit-button").click();
        if (page.url().includes("service-down")) {
          continue;
        }
        await page.waitForTimeout(5000);
        anySelectorVisible1 = true;
      }
    }
    if (anySelectorVisible1) {
      continue;
    }
    const nextPageButton = page.locator(`a[aria-label="Next page"]`);
    if (await nextPageButton.isVisible()) {
      await nextPageButton.click();
      await page.waitForTimeout(3000);
    } else {
      break;
    }
  }
}
export default testDataCleanUp;
