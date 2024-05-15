import { expect, Page } from "@playwright/test";
import commonHelpers from "../../../helpers/commonHelpers.ts";
import caseSubjectDetailsObject_content from "../../../fixtures/content/CaseAPI/createCase/caseSubjectDetailsObject_content.ts";
import createListingListingDetailsContent from "../../../fixtures/content/CaseAPI/createListing/createListingListingDetails_content.ts";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import rejectionDetails_content from "../../../fixtures/content/CaseAPI/closeCase/rejectionDetails_content.ts";

export type RejectionReason =
  | "createdInError"
  | "deadlineMissed"
  | "duplicateCase"
  | "vexatiousLitigant"
  | "other";

type RejectionDetailsPage = {
  continue: string;
  previous: string;
  cancel: string;
  checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
  ): Promise<void>;
  continueOn(page: Page, rejectionReason: RejectionReason): Promise<void>;
  triggerErrorMessages(page: Page): Promise<void>;
};

const rejectionDetailsPage: RejectionDetailsPage = {
  continue: '[type="submit"]',
  previous: ".button-secondary",
  cancel: ".cancel",

  async checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page.click(`#closeRejectionReason-other`);
    await Promise.all([
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `.govuk-caption-l:text-is("${rejectionDetails_content.pageHint}")`,
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
        const textOnPage = (rejectionDetails_content as any)[
          `textOnPage${index + 1}`
        ];
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

  async continueOn(
    page: Page,
    rejectionReason: RejectionReason,
  ): Promise<void> {
    await page.click(`#closeRejectionReason-${rejectionReason}`);
    if (rejectionReason === "other") {
      await page.fill(
        `#closeRejectionDetails`,
        rejectionDetails_content.otherText,
      );
    }
    await page.click(this.continue);
  },

  async triggerErrorMessages(page: Page): Promise<void> {
    await page.click(this.continue);
    await Promise.all([
      await commonHelpers.checkVisibleAndPresent(
        page.locator(
          `#error-summary-title:text-is("${rejectionDetails_content.errorBanner}")`,
        ),
        1,
      ),
      await commonHelpers.checkVisibleAndPresent(
        page.locator(
          `.validation-error:has-text("${rejectionDetails_content.errorNoInput}")`,
        ),
        1,
      ),
      await commonHelpers.checkVisibleAndPresent(
        page.locator(
          `.error-message:has-text("${rejectionDetails_content.errorNoInput}")`,
        ),
        1,
      ),
    ]);
    await page.click(`#closeRejectionReason-other`);
    await page.click(this.continue);
    await Promise.all([
      await commonHelpers.checkVisibleAndPresent(
        page.locator(
          `#error-summary-title:text-is("${rejectionDetails_content.errorBanner}")`,
        ),
        1,
      ),
      await commonHelpers.checkVisibleAndPresent(
        page.locator(
          `.validation-error:has-text("${rejectionDetails_content.errorNoOther}")`,
        ),
        1,
      ),
      await commonHelpers.checkVisibleAndPresent(
        page.locator(
          `.error-message:has-text("${rejectionDetails_content.errorNoOther}")`,
        ),
        1,
      ),
    ]);
    await this.continueOn(page, "createdInError");
  },
};

export default rejectionDetailsPage;
