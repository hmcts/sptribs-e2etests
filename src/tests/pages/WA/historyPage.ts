import { expect, Page } from "@playwright/test";
import axeTest from "../../helpers/accessibilityTestHelper.ts";

type HistoryPage = {
  caseHistoryTab: string;
  checkStateBeforeTaskCompletion(
    page: Page,
    accessibilityTest: boolean,
    stateBeforeCompletion: string,
  ): Promise<void>;
  checkStateAfterTaskCompletion(
    page: Page,
    stateAfterCompletion: string,
  ): Promise<void>;
  navigateToHistoryTab(page: Page): Promise<void>;
};

const historyPage: HistoryPage = {
  caseHistoryTab: `.mat-tab-label-content:text-is("History")`,

  async navigateToHistoryTab(page): Promise<void> {
    await page.locator(this.caseHistoryTab).click();
    await page.waitForSelector(`h2:text-is("History")`);
  },

  async checkStateBeforeTaskCompletion(
    page: Page,
    accessibilityTest: boolean,
    stateBeforeCompletion: string,
  ): Promise<void> {
    await expect(
      page.getByRole("row", { name: `End state ${stateBeforeCompletion}` }),
    ).toBeVisible();
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async checkStateAfterTaskCompletion(
    page: Page,
    stateAfterCompletion: string,
  ): Promise<void> {
    await expect(
      page.getByRole("row", { name: `End state ${stateAfterCompletion}` }),
    ).toBeVisible();
  },
};

export default historyPage;
