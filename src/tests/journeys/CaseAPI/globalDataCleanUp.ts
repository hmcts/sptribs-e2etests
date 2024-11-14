import { Page } from "@playwright/test";
import caseAPILoginPage from "../../pages/CaseAPI/caseList/caseAPILoginPage";
import myWorkPage from "../../pages/WA/myWorkPage";
import waUsers_content from "../../fixtures/content/waUsers_content";

type GlobalDataCleanUp = {
  dataCleanUpByUser(page: Page, UserCleanUp: any): Promise<void>;
  globalDataCleanUp(page: Page, UserCleanUp: any): Promise<void>;
  signOut(page: Page): Promise<void>;
};

const globalDataCleanUp: GlobalDataCleanUp = {
  async dataCleanUpByUser(page, UserCleanUp) {
    await caseAPILoginPage.SignInUser(page, UserCleanUp);
    await myWorkPage.navigateToMyWorkPage(page);
    await myWorkPage.selectAvailableTasks(page, UserCleanUp);

    const subjectAutoTesting = `exui-task-field:has-text("Subject AutoTesting")`;
    if (!(UserCleanUp === waUsers_content.userRoleCaseWorker)) {
      while (true) {
        while (await page.locator(subjectAutoTesting).first().isVisible()) {
          await page
            .locator("tr", { hasText: "Subject AutoTesting" })
            .first()
            .locator(`button:has-text("Manage")`)
            .click({ force: true });
          await page.waitForSelector("#action_claim");
          await page.locator("#action_claim").click({ force: true });
          // if (page.url().includes('service-down')) {
          //   await myWorkPage.navigateToMyWorkPage(page);
          //   await myWorkPage.selectAvailableTasks(page, UserCleanUp);
          // }
          await page.waitForTimeout(5000);
        }

        if (!(await page.locator(subjectAutoTesting).first().isVisible())) {
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
    await page.waitForSelector(`h3:text-is("My work")`);
    await page.waitForTimeout(5000);

    while (true) {
      while (await page.locator(subjectAutoTesting).first().isVisible()) {
        await page
          .locator("tr", { hasText: "Subject AutoTesting" })
          .first()
          .locator(`button:has-text("Manage")`)
          .click();
        await page.waitForSelector("#action_cancel");
        await page.locator("#action_cancel").click({ force: true });
        await page.waitForSelector(`button:text-is("Cancel task")`);
        await page.locator("#submit-button").click({ force: true });
        await page.waitForTimeout(7000);
      }

      if (!(await page.locator(subjectAutoTesting).first().isVisible())) {
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
