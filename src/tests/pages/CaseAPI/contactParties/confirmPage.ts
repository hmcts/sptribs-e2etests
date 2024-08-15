import { expect, Page } from "@playwright/test";
import partiesToContact_content from "../../../fixtures/content/CaseAPI/contactParties/partiesToContact_content.ts";
import caseSubjectDetailsObject_content from "../../../fixtures/content/CaseAPI/createCase/caseSubjectDetailsObject_content.ts";
import confirm_content from "../../../fixtures/content/CaseAPI/contactParties/confirm_content.ts";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import selectDocument_content from "../../../fixtures/content/CaseAPI/contactParties/selectDocument_content.ts";

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
    const headingRegex = new RegExp(
      `${confirm_content.textOnPage2}|${confirm_content.textOnPage3}`,
    );
    await page.waitForSelector(`.heading-h1:text-is("${selectDocument_content.pageHint}")`);
    await Promise.all([
      expect(page.locator("markdown > h3").nth(0)).toHaveText(
        caseSubjectDetailsObject_content.name,
      ),
      expect(page.locator("markdown > p").nth(0)).toHaveText(
        partiesToContact_content.caseReference + caseNumber,
      ),
      expect(page.locator("markdown > h1").nth(0)).toHaveText(
        confirm_content.textOnPage1,
      ),
      expect(page.locator("markdown > h2")).toHaveText(headingRegex),
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
