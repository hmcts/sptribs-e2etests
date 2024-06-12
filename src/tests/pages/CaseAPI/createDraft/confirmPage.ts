import { expect, Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import commonHelpers from "../../../helpers/commonHelpers.ts";
import confirm_content from "../../../fixtures/content/CaseAPI/createDraft/confirm_content.ts";

type ConfirmPage = {
  closeAndReturn: string;
  checkPageLoads(page: Page, accessibilityTest: boolean): Promise<void>;
  closeAndReturnToCase(page: Page): Promise<void>;
};

const createCaseConfirmPage: ConfirmPage = {
  closeAndReturn: ".button",

  async checkPageLoads(page: Page, accessibilityTest: boolean): Promise<void> {
    await Promise.all([
      expect(page.locator(".heading-h1")).toHaveText(confirm_content.pageTitle),
      commonHelpers.checkVisibleAndPresent(
        page.locator(`markdown > h1:text-is("${confirm_content.subTitle1}")`),
        1,
      ),
    ]);
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async closeAndReturnToCase(page: Page): Promise<void> {
    await page.locator(this.closeAndReturn).click();
  },
};

export default createCaseConfirmPage;
