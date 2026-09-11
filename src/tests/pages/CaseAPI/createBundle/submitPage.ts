import { expect, Page } from "@playwright/test";
import submitContent from "../../../fixtures/content/CaseAPI/createBundle/submit_content.ts";
import commonHelpers from "../../../helpers/commonHelpers.ts";

type SubmitPage = {
  saveAndContinue: string;
  previous: string;
  cancel: string;
  checkPageLoads(
    page: Page,
    caseNumber: string,
    subjectName: string,
  ): Promise<void>;
  continueOn(page: Page): Promise<void>;
};

const submitPage: SubmitPage = {
  saveAndContinue: '[type="submit"]',
  previous: 'button[name="Previous"]',
  cancel: ".cancel",

  async checkPageLoads(
    page: Page,
    caseNumber: string,
    subjectName: string,
  ): Promise<void> {
    await page.waitForSelector(
      `.govuk-heading-l:text-is("${submitContent.pageTitle}")`,
    );
    await Promise.all([
      expect(page.locator("markdown > h3").first()).toContainText(
        `${subjectName}`,
      ),
      expect(page.locator("markdown > p").nth(0)).toContainText(
        submitContent.caseReference + caseNumber,
      ),
      commonHelpers.checkForButtons(
        page,
        this.saveAndContinue,
        this.previous,
        this.cancel,
      ),
    ]);
  },

  async continueOn(page: Page): Promise<void> {
    await page.click(this.saveAndContinue);
  },
};

export default submitPage;
