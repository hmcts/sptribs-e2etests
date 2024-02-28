import { expect, Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import commonHelpers from "../../../helpers/commonHelpers.ts";
import confirm_content from "../../../fixtures/content/CaseAPI/LinkCase/confirm_content.ts";

type CreateCaseLinkCreateCaseLink3Page = {
  closeAndReturn: string;
  checkPageLoads(page: Page, accessibilityTest: boolean): Promise<void>;
  fillInFields(page: Page): Promise<void>;
};

const createCaseLinkCreateCaseLink3: CreateCaseLinkCreateCaseLink3Page = {
  closeAndReturn: '[type="submit"]',

  async checkPageLoads(page: Page, accessibilityTest: boolean): Promise<void> {
    await Promise.all([
      page.locator(this.closeAndReturn).isVisible(),
      expect(page.locator(".heading-h1")).toHaveText(confirm_content.pageTitle),
      commonHelpers.checkVisibleAndPresent(
        page.locator(`h1:text-is("${confirm_content.textOnPage1}")`),
        1,
      ),
    ]);
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async fillInFields(page: Page): Promise<void> {
    await page.click(this.closeAndReturn);
    console.log("here");
  },
};

export default createCaseLinkCreateCaseLink3;
