import { expect, Page } from "@playwright/test";
import commonHelpers from "../../../helpers/commonHelpers.ts";
import caseSubjectDetailsObject_content from "../../../fixtures/content/CaseAPI/createCase/caseSubjectDetailsObject_content.ts";
import createListingListingDetailsContent from "../../../fixtures/content/CaseAPI/createListing/createListingListingDetails_content.ts";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import rule27_content from "../../../fixtures/content/CaseAPI/closeCase/rule27_content.ts";

type Rule27Page = {
  continue: string;
  previous: string;
  cancel: string;
  checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
  ): Promise<void>;
  continueOn(page: Page): Promise<void>;
  triggerErrorMessages(page: Page): Promise<void>;
};

const rule27Page: Rule27Page = {
  continue: '[type="submit"]',
  previous: ".button-secondary",
  cancel: ".cancel",

  async checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
  ): Promise<void> {
    await Promise.all([
      commonHelpers.checkVisibleAndPresent(
        page.locator(`.govuk-caption-l:text-is("${rule27_content.pageHint}")`),
        1,
      ),
      expect(page.locator("markdown > h3")).toContainText(
        caseSubjectDetailsObject_content.name,
      ),
      expect(page.locator("markdown > p").nth(0)).toContainText(
        createListingListingDetailsContent.caseReference + caseNumber,
      ),
      ...Array.from({ length: 4 }, (_, index: number) => {
        const textOnPage = (rule27_content as any)[`textOnPage${index + 1}`];
        return commonHelpers.checkVisibleAndPresent(
          page.locator(`.form-label:text-is("${textOnPage}")`),
          1,
        );
      }),
      await commonHelpers.checkForButtons(
        page,
        this.continue,
        this.previous,
        this.cancel,
      ),
    ]);
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async continueOn(page: Page): Promise<void> {
    await page.fill(`#closeRule27DecisionDate-day`, `${rule27_content.day}`);
    await page.fill(
      `#closeRule27DecisionDate-month`,
      `${rule27_content.month}`,
    );
    await page.fill(`#closeRule27DecisionDate-year`, `${rule27_content.year}`);
    await page.click(this.continue);
  },

  async triggerErrorMessages(page: Page): Promise<void> {
    await page.click(this.continue);
    await Promise.all([
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `#error-summary-title:text-is("${rule27_content.errorBanner}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `.validation-error:has-text("${rule27_content.errorConceded}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `.error-message:has-text("${rule27_content.errorConceded}")`,
        ),
        1,
      ),
    ]);
    await this.continueOn(page);
  },
};

export default rule27Page;
