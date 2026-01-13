import { Page } from "@playwright/test";
import caseAPILoginPage from "../../pages/CaseAPI/caseList/caseAPILoginPage";
import myWorkPage from "../../pages/WA/myWorkPage";
import waUsers_content from "../../fixtures/content/waUsers_content";

type GlobalDataCleanUp = {
  dataCleanUpByUser(page: Page, UserCleanUp: any): Promise<void>;
  globalDataCleanUp(page: Page, UserCleanUp: any): Promise<void>;
  signOut(page: Page): Promise<void>;
};

async function getNextValidAutoTestingRow(page: Page, cutoff: Date) {
  const rows = page.locator('tr', { hasText: 'Subject AutoTesting' });
  const count = await rows.count();

  for (let i = 0; i < count; i++) {
    const row = rows.nth(i);

    const createdDateText = await row
      .locator('td:nth-child(6)')
      .innerText();

    if (!createdDateText.trim()) continue;
    const createdDate = new Date(createdDateText.trim());
    if (createdDate > cutoff) {
      return row;
    }
  }
  return null;
}

const cutoffDate = new Date("2026-01-03");

const globalDataCleanUp: GlobalDataCleanUp = {
  async dataCleanUpByUser(page, UserCleanUp) {
    await caseAPILoginPage.SignInUser(page, UserCleanUp);
    await myWorkPage.navigateToMyWorkPage(page);
    await myWorkPage.selectAvailableTasks(page, UserCleanUp);

    const subjectAutoTesting = `exui-task-field:has-text("Subject AutoTesting")`;
    if (!(UserCleanUp === waUsers_content.userRoleCaseWorker)) {
      while (true) {
        while (true) {
        const row = await getNextValidAutoTestingRow(page, cutoffDate);
        if (!row) break;

        await row.locator('button:has-text("Manage")').click({ force: true });
          if (page.url().includes("service-down")) {
            continue;
          }
          await page.waitForSelector("#action_claim");
          await page.locator("#action_claim").click({ force: true });
          await page.waitForTimeout(2000); 
          if (page.url().includes("service-down")) {
            continue;
          }
          await page.waitForTimeout(5000);
          if (page.url().includes("service-down")) {
            await myWorkPage.navigateToMyWorkPage(page);
            await myWorkPage.selectAvailableTasks(page, UserCleanUp);
          }
        }

        const row = await getNextValidAutoTestingRow(page, cutoffDate);
        if (!row) {
          const nextPageButton = page.locator(`a[aria-label="Next page"]`);
          if (await nextPageButton.isVisible()) {
            await nextPageButton.click({ force: true });
            await page.waitForTimeout(5000);
          } else {
            break;
          }
        }
      }
    }

    await page.locator(`a:text-is("My work")`).click({ force: true });
    if (page.url().includes("service-down")) {
      await page.locator(`a:text-is("My work")`).click({ force: true });
    }
    await page.waitForSelector(`h3:text-is("My work")`);
    await page.waitForTimeout(5000);

    while (true) {
      while (true) {
        const row = await getNextValidAutoTestingRow(page, cutoffDate);
        if (!row) break;

        await row.locator('button:has-text("Manage")').click();
        await page.waitForSelector("#action_cancel");
        await page.locator("#action_cancel").click({ force: true });
        await page.waitForTimeout(2000); 
        if (page.url().includes("service-down")) {
          continue;
        }
        await page.waitForSelector(`button:text-is("Cancel task")`);
        await page.locator("#submit-button").click({ force: true });
        await page.waitForTimeout(2000); 
        if (page.url().includes("service-down")) {
          continue;
        }
        await page.waitForTimeout(7000);
      }

        const row = await getNextValidAutoTestingRow(page, cutoffDate);
        if (!row) {
        const nextPageButton = page.locator(`a[aria-label="Next page"]`);
        if (await nextPageButton.isVisible()) {
          await nextPageButton.click({ force: true });
          await page.waitForTimeout(5000);
        } else {
          break;
        }
      }
    }
  },
  async signOut(page): Promise<void> {
    await page.locator(`a:text-is(" Sign out ")`).click();
    await page.waitForLoadState("domcontentloaded");
  },

  async globalDataCleanUp(page: Page, UserCleanUp: any): Promise<void> {
    await this.dataCleanUpByUser(page, UserCleanUp);
    await this.signOut(page);
  },
};
export default globalDataCleanUp;
