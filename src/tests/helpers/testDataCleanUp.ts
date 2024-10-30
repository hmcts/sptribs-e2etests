import { Page } from "@playwright/test";
import caseAPILoginPage from "../pages/CaseAPI/caseList/caseAPILoginPage";
import myWorkPage from "../pages/WA/myWorkPage";
import tasksPage from "../pages/WA/tasksPage";

async function testDataCleanUp(page: Page, user: any): Promise<void> {
  const locators = [
    `exui-task-field:text-is(" Issue Decision Notice ")`,
    `exui-task-field:text-is(" Complete Hearing Outcome ")`,
    `exui-task-field:text-is(" Stitch/collate hearing bundle ")`,
  ];

  await caseAPILoginPage.SignInUser(page, user);
  await myWorkPage.navigateToMyWorkPage(page);
  await myWorkPage.selectAvailableTasks(page);

  while (true) {
    let anySelectorVisible = false;
    for (const selector of locators) {
      if (await page.locator(selector).first().isVisible()) {
        await myWorkPage.dataCleanUpAssignTask(page, selector);
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
  await page.waitForTimeout(5000);

  const autotestingTaskLocator1: any = page
    .locator("tr", { hasText: "Subject AutoTesting" })
    .filter({ has: page.locator(`a:text-is("Issue Decision Notice")`) });

  const autotestingTaskLocator2: any = page
    .locator("tr", { hasText: "Subject AutoTesting" })
    .filter({ has: page.locator(`a:text-is("Complete Hearing Outcome")`) });

  const autotestingTaskLocator3: any = page
    .locator("tr", { hasText: "Subject AutoTesting" })
    .filter({
      has: page.locator(`a:text-is("Stitch/collate hearing bundle")`),
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
        await tasksPage.dataCleanUpMarkAsDone(page, selector1);
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
