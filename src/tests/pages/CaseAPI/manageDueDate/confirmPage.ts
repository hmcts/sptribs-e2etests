import { expect, Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import confirm_content from "../../../fixtures/content/CaseAPI/manageDueDate/confirm-content.ts";
import commonHelpers from "../../../helpers/commonHelpers.ts";
import caseSubjectDetailsObject_content from "../../../fixtures/content/CaseAPI/createCase/caseSubjectDetailsObject_content.ts";

type ConfirmPage = {
  closeAndReturn: string;
  checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    caseNumber: string,
  ): Promise<void>;
  closeAndReturnToCase(page: Page): Promise<void>;
};

const managageDueDateConfirmPage: ConfirmPage = {
  closeAndReturn: ".button",

  async checkPageLoads(page, accessibilityTest, caseNumber): Promise<void> {
    await Promise.all([
      expect(page.locator(".heading-h1")).toHaveText(confirm_content.pageTitle),
      commonHelpers.checkVisibleAndPresent(
        page.locator(`markdown > h1:text-is("${confirm_content.subTitle1}")`),
        1,
      ),
      expect(page.locator("markdown > h3")).toContainText(
        caseSubjectDetailsObject_content.name,
      ),
      expect(page.locator("markdown > p").nth(0)).toContainText(
        confirm_content.caseReference + caseNumber,
      ),
    ]);

    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async closeAndReturnToCase(page: Page): Promise<void> {
    await page.locator(this.closeAndReturn).click();
    await page.waitForLoadState("load");
  },
};

export default managageDueDateConfirmPage;
