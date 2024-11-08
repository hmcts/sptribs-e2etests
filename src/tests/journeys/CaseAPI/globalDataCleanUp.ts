import { Page } from "@playwright/test";
import caseAPILoginPage from "../../pages/CaseAPI/caseList/caseAPILoginPage";
import myWorkPage from "../../pages/WA/myWorkPage";
import waUsers_content from "../../fixtures/content/waUsers_content";

type GlobalDataCleanUp = {
  dataCleanUpByUser(page: Page, UserCleanUp: any): Promise<void>;
  globalDataCleanUp(page: Page): Promise<void>;
  signOut(page: Page): Promise<void>;
};

const globalDataCleanUp: GlobalDataCleanUp = {
  async dataCleanUpByUser(page, UserCleanUp) {
    await caseAPILoginPage.SignInUser(page, UserCleanUp);
    await myWorkPage.navigateToMyWorkPage(page);
    await myWorkPage.selectAvailableTasks(page, UserCleanUp);

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
          await page.waitForTimeout(5000);
        } else {
          break;
        }
      }
    }

    await page.locator(`a:text-is("My work")`).click();
    await page.waitForSelector(`h3:text-is("My work")`);
    await page.waitForTimeout(5000);

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
        await page.waitForTimeout(5000);
      }

      if (!(await page.locator(subjectAutoTesting).first().isVisible())) {
        const nextPageButton = page.locator(`a[aria-label="Next page"]`);
        if (await nextPageButton.isVisible()) {
          await nextPageButton.click();
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

  async globalDataCleanUp(page: Page): Promise<void> {
    await this.dataCleanUpByUser(page, waUsers_content.userRoleAdmin);
    await this.signOut(page);
    await this.dataCleanUpByUser(page, waUsers_content.userRoleCaseWorker);
    await this.signOut(page);
    await this.dataCleanUpByUser(page, waUsers_content.userRoleJudge);
    await this.signOut(page);
    await this.dataCleanUpByUser(page, waUsers_content.userRoleLO);
  },
};
export default globalDataCleanUp;
