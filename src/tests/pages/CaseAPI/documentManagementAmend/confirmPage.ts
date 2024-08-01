import { expect, Page } from "@playwright/test";
import confirm_content from "../../../fixtures/content/CaseAPI/documentManagementAmend/confirm_content.ts";
import caseSubjectDetailsObject_content
  from "../../../fixtures/content/CaseAPI/createCase/caseSubjectDetailsObject_content.ts";


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
      expect(page.locator(".govuk-heading-l")).toHaveText(
        confirm_content.pageTitle
      ),
      expect(page.locator("markdown > h3")).toContainText(
        caseSubjectDetailsObject_content.name,
      ),
      expect(page.locator("markdown > p").nth(0)).toContainText(
        confirm_content.caseReference + caseNumber,
      ),
      expect(page.locator("markdown > h1")).toContainText(
        confirm_content.textOnPage1,
      ),
    ])
  },
  async continueOn(page: Page): Promise<void> {
    await page.click(this.continue);
  },
}

export default confirmPage;