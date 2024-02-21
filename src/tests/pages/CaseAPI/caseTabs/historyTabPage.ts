import { expect, Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import allTabsTitlesContent from "../../../fixtures/content/CaseAPI/caseTabs/allTabTitles_content.ts";
import historyTabContent from "../../../fixtures/content/CaseAPI/caseTabs/historyTab_content.ts";
import stateTabContent from "../../../fixtures/content/CaseAPI/caseTabs/stateTab_content.ts";
import authorsContent from "../../../fixtures/content/authors_content.ts";
import allTabTitlesContent from "../../../fixtures/content/CaseAPI/caseTabs/allTabTitles_content.ts";
import commonHelpers, { allEvents } from "../../../helpers/commonHelpers.ts";
import { UserRole } from "../../../config.ts";
import SubjectDetails_content from "../../../fixtures/content/DSSCreateCase/SubjectDetails_content.ts";

type HistoryTabPage = {
  checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    caseNumber: string,
    state: string,
  ): Promise<void>;
  checkPageInfo(
    page: Page,
    allEvents: allEvents[],
    eventTimes: string[],
    user: UserRole,
    state: string,
  ): Promise<void>;
};

const historyTabPage: HistoryTabPage = {
  async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    caseNumber: string,
    state: string,
  ): Promise<void> {
    await expect(
      page.locator(
        "ccd-case-header > div > ccd-label-field > dl > dt > ccd-markdown > div > markdown > h3",
      ),
    ).toHaveText(SubjectDetails_content.name);
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
    if (state == stateTabContent.DSSSubmittedState) {
      await expect(page.locator(".mat-tab-label").nth(11)).toHaveText(
        allTabsTitlesContent.tab12,
      );
      await expect(page.locator(".mat-tab-label").nth(12)).toHaveText(
        allTabsTitlesContent.tab13,
      );
      await expect(page.locator(".mat-tab-label").nth(13)).toHaveText(
        allTabsTitlesContent.tab14,
      );
      await expect(page.locator(".mat-tab-label").nth(14)).toHaveText(
        allTabTitlesContent.tab15,
      );
    } else {
      await expect(page.locator(".mat-tab-label").nth(11)).toHaveText(
        allTabsTitlesContent.tab13,
      );
      await expect(page.locator(".mat-tab-label").nth(12)).toHaveText(
        allTabsTitlesContent.tab14,
      );
      await expect(page.locator(".mat-tab-label").nth(13)).toHaveText(
        allTabsTitlesContent.tab15,
      );
    }
    await expect(page.locator(".heading-h2").nth(0)).toHaveText(
      historyTabContent.heading1,
    );
    await expect(page.locator(".heading-h2").nth(1)).toHaveText(
      historyTabContent.heading2,
    );
    await commonHelpers.checkVisibleAndPresent(
      page.locator(`span.text-16:text-is("${historyTabContent.textOnPage1}")`),
      2,
    );
    await commonHelpers.checkVisibleAndPresent(
      page.locator(`span.text-16:text-is("${historyTabContent.textOnPage2}")`),
      2,
    );
    await commonHelpers.checkVisibleAndPresent(
      page.locator(`span.text-16:text-is("${historyTabContent.textOnPage3}")`),
      1,
    );
    await commonHelpers.checkVisibleAndPresent(
      page.locator(`span.text-16:text-is("${historyTabContent.textOnPage4}")`),
      2,
    );
    await commonHelpers.checkVisibleAndPresent(
      page.locator(`span.text-16:text-is("${historyTabContent.textOnPage5}")`),
      1,
    );
    await commonHelpers.checkVisibleAndPresent(
      page.locator(`span.text-16:text-is("${historyTabContent.textOnPage6}")`),
      1,
    );
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async checkPageInfo(
    page: Page,
    allEvents: allEvents[],
    eventTimes: string[],
    user: UserRole,
    state: string,
  ): Promise<void> {
    for (let i = 0; i < allEvents.length; i++) {
      if (allEvents.length > 1 && i == 0) {
        await commonHelpers.checkVisibleAndPresent(
          page.locator(`a.text-16:text-is("${allEvents[i]}")`),
          1,
        );
        if (eventTimes[i] === eventTimes[i + 1]) {
          await commonHelpers.checkVisibleAndPresent(
            page.locator(`div.tooltip.text-16:has-text("${eventTimes[i]}")`),
            3,
          );
        } else {
          await commonHelpers.checkVisibleAndPresent(
            page.locator(`div.tooltip.text-16:has-text("${eventTimes[i]}")`),
            1,
          );
        }
      } else {
        if (allEvents.length > 1 && eventTimes[i] === eventTimes[i - 1]) {
          await commonHelpers.checkVisibleAndPresent(
            page.locator(`div.tooltip.text-16:has-text("${eventTimes[i]}")`),
            3,
          );
        } else {
          await commonHelpers.checkVisibleAndPresent(
            page.locator(`div.tooltip.text-16:has-text("${eventTimes[i]}")`),
            2,
          );
        }
        await commonHelpers.checkVisibleAndPresent(
          page.locator(`a.text-16:text-is("${allEvents[i]}")`),
          1,
        );
        await commonHelpers.checkVisibleAndPresent(
          page.locator(`span.text-16:text-is("${allEvents[i]}")`),
          1,
        );
      }
      if (user == "caseWorker") {
        await commonHelpers.checkVisibleAndPresent(
          page.locator(
            `span.text-16:text-is("${authorsContent.automatedCaseworker}")`,
          ),
          allEvents.length + 1,
        );
      } else if (user == "citizen") {
        await commonHelpers.checkVisibleAndPresent(
          page.locator(
            `span.text-16:text-is("${authorsContent.automatedCitizen}")`,
          ),
          allEvents.length + 1,
        );
      }
      await commonHelpers.checkVisibleAndPresent(
        page.locator(`span.text-16:text-is("${state}")`),
        1,
      );
    }
  },
};

export default historyTabPage;
