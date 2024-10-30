import {
  FullConfig,
  chromium,
  Browser,
  Page,
  BrowserContext,
} from "@playwright/test";
import caseAPILoginPage from "./pages/CaseAPI/caseList/caseAPILoginPage";
import myWorkPage from "./pages/WA/myWorkPage";

async function dataCleanUpByUser(
  UserCleanUp: any,
  action: (context: BrowserContext) => Promise<void>,
) {
  const browser: Browser = await chromium.launch({ headless: false });
  //const browser: Browser = await chromium.launch();
  const context: BrowserContext = await browser.newContext();
  const page: Page = await context.newPage();

  await caseAPILoginPage.SignInUser(page, UserCleanUp);
  await myWorkPage.navigateToMyWorkPage(page);
  await myWorkPage.selectAvailableTasks(page);

  const subjectAutoTesting = `exui-task-field:has-text("Subject AutoTesting")`;

  while (true) {
    while (await page.locator(subjectAutoTesting).first().isVisible()) {
      await page
        .locator("tr", { hasText: "Subject AutoTesting" })
        .first()
        .locator(`button:has-text("Manage")`)
        .click();
      await page.waitForSelector("#action_claim");
      await page.locator("#action_claim").click();
      await page.waitForTimeout(5000);
    }

    if (!(await page.locator(subjectAutoTesting).first().isVisible())) {
      const nextPageButton = page.locator(`a[aria-label="Next page"]`);
      if (await nextPageButton.isVisible()) {
        await nextPageButton.click();
        await page.waitForTimeout(3000);
      } else {
        break;
      }
    }
  }

  await page.locator(`a:text-is("My work")`).click();
  await page.waitForSelector(`h3:text-is("My work")`);
  await page.waitForTimeout(3000);

  while (true) {
    while (await page.locator(subjectAutoTesting).first().isVisible()) {
      await page
        .locator("tr", { hasText: "Subject AutoTesting" })
        .first()
        .locator(`button:has-text("Manage")`)
        .click();
      await page.waitForSelector("#action_complete");
      await page.locator("#action_complete").click();
      await page.waitForSelector(`button:text-is("Mark as done")`);
      await page.locator("#submit-button").click();
      await page.waitForTimeout(3000);
    }

    if (!(await page.locator(subjectAutoTesting).first().isVisible())) {
      const nextPageButton = page.locator(`a[aria-label="Next page"]`);
      if (await nextPageButton.isVisible()) {
        await nextPageButton.click();
        await page.waitForTimeout(3000);
      } else {
        break;
      }
    }
  }
  await browser.close();
}

async function globalSetup(config: FullConfig) {
  await dataCleanUpByUser("waHearingCentreAdmin", async (context) => {
    const page = await context.newPage();
  });
  await dataCleanUpByUser("waPrincipalJudge", async (context) => {
    const page = await context.newPage();
  });
  await dataCleanUpByUser("waSeniorCaseworker", async (context) => {
    const page = await context.newPage();
  });
  await dataCleanUpByUser("waCaseWorker", async (context) => {
    const page = await context.newPage();
  });
}

export default globalSetup;
