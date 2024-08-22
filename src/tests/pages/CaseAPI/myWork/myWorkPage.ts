import { expect, Page } from "@playwright/test";
import myWorkContent from "../../../fixtures/content/CaseAPI/myWork/myWork_content.ts";
import commonHelpers from "../../../helpers/commonHelpers.ts";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";

type MyWorkPage = {
  availableTasksTab: string;
  filterButton: string;
  checkPageLoads(page: Page, accessibilityTest: boolean): Promise<void>;
  selectAvailableTasks(page: Page): Promise<void>;
  seeTask(page: Page, taskName: string): Promise<void>;
};

const myWorkPage: MyWorkPage = {
  availableTasksTab: "li.hmcts-sub-navigation__item:nth-child(2)",
  filterButton: ".hmcts-button--secondary",

  async checkPageLoads(page: Page, accessibilityTest: boolean): Promise<void> {
    await page.locator(".hmcts-primary-navigation__link").first().click();
    await page.waitForSelector(
      `.govuk-heading-xl:text-is("${myWorkContent.pageTitle}")`,
    );
    await page.click(this.filterButton);
    await Promise.all([
      commonHelpers.checkVisibleAndPresent(
        page.locator(`p:text-is("${myWorkContent.hintText}")`),
        1,
      ),
      ...Array.from({ length: 3 }, (_, index) => {
        const subtitle = (myWorkContent as any)[`filterSubtitle${index + 1}`];
        return commonHelpers.checkVisibleAndPresent(
          page.locator(`.govuk-heading-s:text-is("${subtitle}")`),
          1,
        );
      }),
      ...Array.from({ length: 4 }, (_, index) => {
        const tab = (myWorkContent as any)[`tab${index + 1}`];
        return commonHelpers.checkVisibleAndPresent(
          page.locator(`li.hmcts-sub-navigation__item:has-text("${tab}")`),
          1,
        );
      }),
      ...Array.from({ length: 7 }, (_, index) => {
        const column = (myWorkContent as any)[`column${index + 1}`];
        return commonHelpers.checkVisibleAndPresent(
          page.locator(`th.cdk-header-cell:has-text("${column}")`),
          1,
        );
      }),
    ]);
    await page.click(this.filterButton);

    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async selectAvailableTasks(
    page: Page,
  ): Promise<void> {
    await page.locator(this.availableTasksTab).click();
  },

  async seeTask(
    page: Page, taskName: string
  ): Promise<void> {
    await commonHelpers.checkVisibleAndPresent(
      page.locator(`td.cdk-column-task_title:has-text("${taskName}")`),
      1,
    );
  },
};

export default myWorkPage;
