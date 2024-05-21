import { expect, Page } from "@playwright/test";
import commonHelpers from "../../../helpers/commonHelpers.ts";
import withdrawalDetails_content from "../../../fixtures/content/CaseAPI/closeCase/withdrawalDetails_content.ts";
import caseSubjectDetailsObject_content from "../../../fixtures/content/CaseAPI/createCase/caseSubjectDetailsObject_content.ts";
import createListingListingDetailsContent from "../../../fixtures/content/CaseAPI/createListing/createListingListingDetails_content.ts";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";

type WithdrawalDetailsPage = {
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

const withdrawalDetailsPage: WithdrawalDetailsPage = {
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
        page.locator(
          `.govuk-caption-l:text-is("${withdrawalDetails_content.pageHint}")`,
        ),
        1,
      ),
      expect(page.locator("markdown > h3")).toContainText(
        caseSubjectDetailsObject_content.name,
      ),
      expect(page.locator("markdown > p").nth(0)).toContainText(
        createListingListingDetailsContent.caseReference + caseNumber,
      ),
      ...Array.from({ length: 5 }, (_, index: number) => {
        const textOnPage = (withdrawalDetails_content as any)[
          `textOnPage${index + 1}`
        ];
        return commonHelpers.checkVisibleAndPresent(
          page.locator(`.form-label:text-is("${textOnPage}")`),
          1,
        );
      }),
      commonHelpers.checkForButtons(
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
    await page.fill(
      `#closeWithdrawalFullName`,
      `${withdrawalDetails_content.withdrawalName}`,
    );
    await page.fill(
      `#closeWithdrawalRequestDate-day`,
      `${withdrawalDetails_content.day}`,
    );
    await page.fill(
      `#closeWithdrawalRequestDate-month`,
      `${withdrawalDetails_content.month}`,
    );
    await page.fill(
      `#closeWithdrawalRequestDate-year`,
      `${withdrawalDetails_content.year}`,
    );
    await page.click(this.continue);
  },

  async triggerErrorMessages(page: Page): Promise<void> {
    await page.click(this.continue);
    await Promise.all([
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `#error-summary-title:text-is("${withdrawalDetails_content.errorBanner}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `.validation-error:has-text("${withdrawalDetails_content.errorWithdrew}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `.error-message:has-text("${withdrawalDetails_content.errorWithdrew}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `.validation-error:has-text("${withdrawalDetails_content.errorDate}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `.error-message:has-text("${withdrawalDetails_content.errorDate}")`,
        ),
        1,
      ),
    ]);
    await page.click(this.previous);
  },
};

export default withdrawalDetailsPage;
