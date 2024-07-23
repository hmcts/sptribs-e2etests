import { expect, Page } from "@playwright/test";
import partiesToContact_content from "../../../fixtures/content/CaseAPI/contactParties/partiesToContact_content.ts";
import caseSubjectDetailsObject_content from "../../../fixtures/content/CaseAPI/createCase/caseSubjectDetailsObject_content.ts";
import confirm_content from "../../../fixtures/content/CaseAPI/contactParties/confirm_content.ts";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";

type ConfirmPage = {
  continue: string;
  checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
  ): Promise<void>;
  continueOn(page: Page): Promise<void>;
};

const confirmPage: ConfirmPage = {
  continue: '[type="submit"]',
  async checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
  ): Promise<void> {
    await Promise.all([
      expect(page.locator(".heading-h1")).toHaveText(
        partiesToContact_content.pageHint,
      ),
      expect(page.locator("markdown > h3").nth(0)).toHaveText(
        caseSubjectDetailsObject_content.name,
      ),
      expect(page.locator("markdown > p").nth(0)).toHaveText(
        partiesToContact_content.caseReference + caseNumber,
      ),
      expect(page.locator("markdown > h1").nth(0)).toHaveText(
        confirm_content.textOnPage1,
      ),
      expect(page.locator("markdown > h2")).toHaveText(
        confirm_content.textOnPage2,
      ),
    ]);
    if (accessibilityTest) {
      await axeTest(page);
    }
  },
  async continueOn(page: Page): Promise<void> {
    await page.click(this.continue);
  },
};

export default confirmPage;
