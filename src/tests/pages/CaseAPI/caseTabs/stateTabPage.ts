import { expect, Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import stateTabContent from "../../../fixtures/content/CaseAPI/caseTabs/stateTab_content.ts";
import allTabContent from "../../../fixtures/content/CaseAPI/caseTabs/allTabTitles_content.ts";

type StateTabPage = {
  caseStateTab: string;
  checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    caseNumber: string,
  ): Promise<void>;
  changeToStateTab(page: Page): Promise<void>;
  checkStateTab(page: Page): Promise<void>;
};

const stateTabPage: StateTabPage = {
  caseStateTab: ".mat-tab-label",

  async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    caseNumber: string,
  ): Promise<void> {
    await expect(page.locator(".case-field").first()).toContainText(
      allTabContent.pageTitle + caseNumber,
    );
    await expect(page.locator(".mat-tab-label").nth(0)).toHaveText(
      allTabContent.tab1,
    );
    await expect(page.locator(".mat-tab-label").nth(1)).toHaveText(
      allTabContent.tab2,
    );
    await expect(page.locator(this.caseStateTab).nth(2)).toHaveText(
      allTabContent.tab3,
    );
    await expect(page.locator(".mat-tab-label").nth(3)).toHaveText(
      allTabContent.tab4,
    );
    await expect(page.locator(".mat-tab-label").nth(4)).toHaveText(
      allTabContent.tab5,
    );
    await expect(page.locator(".mat-tab-label").nth(5)).toHaveText(
      allTabContent.tab6,
    );
    await expect(page.locator(".mat-tab-label").nth(6)).toHaveText(
      allTabContent.tab7,
    );
    await expect(page.locator(".mat-tab-label").nth(7)).toHaveText(
      allTabContent.tab8,
    );
    await expect(page.locator(".mat-tab-label").nth(8)).toHaveText(
      allTabContent.tab9,
    );
    await expect(page.locator(".mat-tab-label").nth(9)).toHaveText(
      allTabContent.tab10,
    );
    await expect(page.locator(".mat-tab-label").nth(10)).toHaveText(
      allTabContent.tab11,
    );
    await expect(page.locator(".mat-tab-label").nth(11)).toHaveText(
      allTabContent.tab12,
    );
    await expect(page.locator(".mat-tab-label").nth(12)).toHaveText(
      allTabContent.tab13,
    );
    await expect(page.locator(".mat-tab-label").nth(13)).toHaveText(
      allTabContent.tab14,
    );
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async changeToStateTab(page: Page): Promise<void> {
    await page.locator(this.caseStateTab).nth(2).click();
  },

  async checkStateTab(page: Page): Promise<void> {
    await expect(page.locator("markdown[class='markdown'] h4")).toHaveText(
      stateTabContent.caseState + stateTabContent.DSSSubmittedState,
    );
  },
};

export default stateTabPage;
