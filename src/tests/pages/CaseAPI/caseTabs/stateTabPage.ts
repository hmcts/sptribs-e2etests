import { expect, Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import stateTabContent from "../../../fixtures/content/CaseAPI/caseTabs/stateTab_content.ts";
import commonHelpers from "../../../helpers/commonHelpers.ts";
import stateTab_content from "../../../fixtures/content/CaseAPI/caseTabs/stateTab_content.ts";

type StateTabPage = {
  caseStateTab: string;
  checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    caseNumber: string,
    subjectName: string,
  ): Promise<void>;
  changeToStateTab(page: Page): Promise<void>;
  checkStateTab(page: Page, state: string): Promise<void>;
};

const stateTabPage: StateTabPage = {
  caseStateTab: ".mat-tab-label",

  async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    caseNumber: string,
    subjectName: string,
  ): Promise<void> {
    await commonHelpers.checkAllCaseTabs(page, caseNumber, false, subjectName);
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async changeToStateTab(page: Page): Promise<void> {
    await page.locator(this.caseStateTab).nth(2).click();
  },

  async checkStateTab(page: Page, state: string): Promise<void> {
    if (state == stateTabContent.DSSSubmittedState) {
      await expect(page.locator("markdown[class='markdown'] h4")).toHaveText(
        stateTabContent.caseState + stateTabContent.DSSSubmittedState,
      );
    } else if (state == stateTabContent.submittedState) {
      await expect(page.locator("markdown[class='markdown'] h4")).toHaveText(
        stateTabContent.caseState + stateTabContent.submittedState,
      );
    } else if (state == stateTabContent.caseManagementState) {
      await expect(page.locator("markdown[class='markdown'] h4")).toHaveText(
        stateTabContent.caseState + stateTabContent.caseManagementState,
      );
    } else if (state == stateTab_content.closedState) {
      await expect(page.locator("markdown[class='markdown'] h4")).toHaveText(
        stateTabContent.caseState + stateTabContent.closedState,
      );
    }
  },
};

export default stateTabPage;
