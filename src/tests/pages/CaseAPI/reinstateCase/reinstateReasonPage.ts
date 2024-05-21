import { expect, Page } from "@playwright/test";
import commonHelpers from "../../../helpers/commonHelpers.ts";
import caseSubjectDetailsObject_content from "../../../fixtures/content/CaseAPI/createCase/caseSubjectDetailsObject_content.ts";
import createListingListingDetailsContent from "../../../fixtures/content/CaseAPI/createListing/createListingListingDetails_content.ts";
import reinstateReason_content from "../../../fixtures/content/CaseAPI/reinstateCase/reinstateReason_content.ts";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";

export type ReinstateReason =
  | "requestFollowingAWithdrawalDecision"
  | "RequestFollowingAStrikeOutDecision"
  | "caseHadBeenClosedInError"
  | "requestFollowingADecisionFromTheUpperTribunal"
  | "requestFollowingAnOralHearingApplicationFollowingARule27Decision"
  | "Request to set aside a tribunal decision following an oral hearing"
  | "Other";

type ReinstateReasonPage = {
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
    reinstateReason: ReinstateReason,
    optionalText: boolean,
  ): Promise<void>;
  triggerErrorMessages(page: Page): Promise<void>;
};

const reinstateReasonPage: ReinstateReasonPage = {
  continue: '[type="submit"]',
  previous: ".button-secondary[disabled]",
  cancel: ".cancel",

  async checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
  ): Promise<void> {
    await Promise.all([
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `.govuk-caption-l:text-is("${reinstateReason_content.pageHint}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `.govuk-heading-l:text-is("${reinstateReason_content.pageTitle}")`,
        ),
        1,
      ),
      expect(page.locator("markdown > h3")).toContainText(
        caseSubjectDetailsObject_content.name,
      ),
      expect(page.locator("markdown > p").nth(0)).toContainText(
        createListingListingDetailsContent.caseReference + caseNumber,
      ),
      ...Array.from({ length: 8 }, (_, index) => {
        const textOnPage = (reinstateReason_content as any)[
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

  async continueOn(
    page: Page,
    reinstateReason: ReinstateReason,
    optionalText: boolean,
  ): Promise<void> {
    await page.click(`#cicCaseReinstateReason-${reinstateReason}`);
    if (optionalText) {
      await page.fill(
        `#cicCaseReinstateAdditionalDetail`,
        reinstateReason_content.optionalText,
      );
    }
    await page.click(this.continue);
  },

  async triggerErrorMessages(page: Page): Promise<void> {
    await page.click(this.continue);
    await Promise.all([
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `#error-summary-title:text-is("${reinstateReason_content.errorBanner}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `.validation-error:has-text("${reinstateReason_content.errorNoInput}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `.error-message:has-text("${reinstateReason_content.errorNoInput}")`,
        ),
        1,
      ),
    ]);
    await this.continueOn(page, "Other", false);
  },
};

export default reinstateReasonPage;
