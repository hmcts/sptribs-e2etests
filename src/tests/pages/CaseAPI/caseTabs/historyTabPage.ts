import { expect, Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import allTabsTitlesContent from "../../../fixtures/content/CaseAPI/caseTabs/allTabTitles_content.ts";
import historyTabContent from "../../../fixtures/content/CaseAPI/caseTabs/historyTab_content.ts";
import stateTabContent from "../../../fixtures/content/CaseAPI/caseTabs/stateTab_content.ts";
import authorsContent from "../../../fixtures/content/authors_content.ts";
import eventsContent from "../../../fixtures/content/CaseAPI/events_content.ts";

type HistoryTabPage = {
  checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    caseNumber: string,
  ): Promise<void>;
  checkPageInfo(page: Page, time: string): Promise<void>;
};

const historyTabPage: HistoryTabPage = {
  async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    caseNumber: string,
  ): Promise<void> {
    await expect(page.locator(".case-field").first()).toContainText(
      allTabsTitlesContent.pageTitle + caseNumber,
    );
    await expect(page.locator(".mat-tab-label").nth(0)).toHaveText(
      allTabsTitlesContent.tab1,
    );
    await expect(page.locator(".mat-tab-label").nth(1)).toHaveText(
      allTabsTitlesContent.tab2,
    );
    await expect(page.locator(".mat-tab-label").nth(2)).toHaveText(
      allTabsTitlesContent.tab3,
    );
    await expect(page.locator(".mat-tab-label").nth(3)).toHaveText(
      allTabsTitlesContent.tab4,
    );
    await expect(page.locator(".mat-tab-label").nth(4)).toHaveText(
      allTabsTitlesContent.tab5,
    );
    await expect(page.locator(".mat-tab-label").nth(5)).toHaveText(
      allTabsTitlesContent.tab6,
    );
    await expect(page.locator(".mat-tab-label").nth(6)).toHaveText(
      allTabsTitlesContent.tab7,
    );
    await expect(page.locator(".mat-tab-label").nth(7)).toHaveText(
      allTabsTitlesContent.tab8,
    );
    await expect(page.locator(".mat-tab-label").nth(8)).toHaveText(
      allTabsTitlesContent.tab9,
    );
    await expect(page.locator(".mat-tab-label").nth(9)).toHaveText(
      allTabsTitlesContent.tab10,
    );
    await expect(page.locator(".mat-tab-label").nth(10)).toHaveText(
      allTabsTitlesContent.tab11,
    );
    await expect(page.locator(".mat-tab-label").nth(11)).toHaveText(
      allTabsTitlesContent.tab12,
    );
    await expect(page.locator(".mat-tab-label").nth(12)).toHaveText(
      allTabsTitlesContent.tab13,
    );
    await expect(page.locator(".mat-tab-label").nth(13)).toHaveText(
      allTabsTitlesContent.tab14,
    );
    await expect(page.locator(".heading-h2").nth(0)).toHaveText(
      historyTabContent.heading1,
    );
    await expect(page.locator(".heading-h2").nth(1)).toHaveText(
      historyTabContent.heading2,
    );
    await expect(page.locator(".text-16").nth(1)).toHaveText(
      historyTabContent.textOnPage4,
    );
    await expect(page.locator(".text-16").nth(2)).toHaveText(
      historyTabContent.textOnPage1,
    );
    await expect(page.locator(".text-16").nth(3)).toHaveText(
      historyTabContent.textOnPage2,
    );
    await expect(page.locator(".text-16").nth(7)).toHaveText(
      historyTabContent.textOnPage1,
    );
    await expect(page.locator(".text-16").nth(9)).toHaveText(
      historyTabContent.textOnPage2,
    );
    await expect(page.locator(".text-16").nth(11)).toHaveText(
      historyTabContent.textOnPage3,
    );
    await expect(page.locator(".text-16").nth(13)).toHaveText(
      historyTabContent.textOnPage4,
    );
    await expect(page.locator(".text-16").nth(15)).toHaveText(
      historyTabContent.textOnPage5,
    );
    await expect(page.locator(".text-16").nth(17)).toHaveText(
      historyTabContent.textOnPage6,
    );

    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async checkPageInfo(page: Page, time: string): Promise<void> {
    await expect(page.locator(".text-16").nth(4)).toHaveText(
      eventsContent.submitCaseCIC,
    );
    await expect(page.locator(".text-16").nth(5)).toContainText(time);
    await expect(page.locator(".text-16").nth(6)).toHaveText(
      authorsContent.automatedCitizen,
    );
    await expect(page.locator(".text-16").nth(8)).toContainText(time);
    await expect(page.locator(".text-16").nth(10)).toHaveText(
      authorsContent.automatedCitizen,
    );
    await expect(page.locator(".text-16").nth(12)).toHaveText(
      stateTabContent.DSSSubmittedState,
    );
    await expect(page.locator(".text-16").nth(14)).toHaveText(
      eventsContent.submitCaseCIC,
    );
  },
};

export default historyTabPage;
