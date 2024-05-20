import { expect, Page } from "@playwright/test";
import commonHelpers from "../../../helpers/commonHelpers.ts";
import caseSubjectDetailsObject_content from "../../../fixtures/content/CaseAPI/createCase/caseSubjectDetailsObject_content.ts";
import createListingListingDetailsContent from "../../../fixtures/content/CaseAPI/createListing/createListingListingDetails_content.ts";
import selectReason_content from "../../../fixtures/content/CaseAPI/closeCase/selectReason_content.ts";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";

export type CaseCloseReason =
  | "caseWithdrawn"
  | "caseRejected"
  | "caseStrikeOut"
  | "caseConcession"
  | "consentOrder"
  | "rule27";

type SelectReasonPage = {
  continue: string;
  previous: string;
  cancel: string;
  checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
  ): Promise<void>;
  continueOn(
    page: Page,
    closeReason: CaseCloseReason,
    optionalText: boolean,
  ): Promise<void>;
  triggerErrorMessages(page: Page): Promise<void>;
};

const selectReasonPage: SelectReasonPage = {
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
          `.govuk-caption-l:text-is("${selectReason_content.pageHint}")`,
        ),
        1,
      ),
      expect(page.locator("markdown > h3")).toContainText(
        caseSubjectDetailsObject_content.name,
      ),
      expect(page.locator("markdown > p").nth(0)).toContainText(
        createListingListingDetailsContent.caseReference + caseNumber,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `.form-label:text-is("${selectReason_content.textOnPage1}")`,
        ),
        1,
      ),
      ...Array.from({ length: 7 }, (_, index: number) => {
        const textOnPage = (selectReason_content as any)[
          `textOnPage${index + 2}`
        ];
        return commonHelpers.checkVisibleAndPresent(
          page.locator(`.form-label:text-is("${textOnPage}")`),
          1,
        );
      }),
    ]);
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async continueOn(
    page: Page,
    closeReason: CaseCloseReason,
    optionalText: boolean,
  ): Promise<void> {
    await page.click(`#closeCloseCaseReason-${closeReason}`);
    if (optionalText) {
      await page.fill(
        `#closeAdditionalDetail`,
        `${selectReason_content.optionalText}`,
      );
    }
    await page.click(this.continue);
  },

  async triggerErrorMessages(page: Page): Promise<void> {
    await page.click(this.continue);
    await Promise.all([
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `#error-summary-title:text-is("${selectReason_content.errorBanner}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `.validation-error:has-text("${selectReason_content.errorMessage}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `.error-message:has-text("${selectReason_content.errorMessage}")`,
        ),
        1,
      ),
    ]);
    await this.continueOn(page, "caseWithdrawn", false);
  },
};

export default selectReasonPage;
