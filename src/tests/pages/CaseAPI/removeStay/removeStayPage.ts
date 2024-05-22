import { expect, Page } from "@playwright/test";
import commonHelpers from "../../../helpers/commonHelpers.ts";
import caseSubjectDetailsObject_content from "../../../fixtures/content/CaseAPI/createCase/caseSubjectDetailsObject_content.ts";
import createListingNotifyPageContent from "../../../fixtures/content/CaseAPI/createListing/createListingNotifyPage_content.ts";
import removeStay_content from "../../../fixtures/content/CaseAPI/removeStay/removeStay_content.ts";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";

export type RemoveReason =
  | "receivedOutcomeOfCivilCase"
  | "receviedOutcomeOfCriminalProceedings"
  | "receivedACourtJudgement"
  | "applicantHasReachedRequiredAge"
  | "subjectHasReceivedTheirMedicalTreatment"
  | "receivedOutcomeOfLinkedCase"
  | "Other";

type RemoveStayPage = {
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
    removeReason: RemoveReason,
    optionalText: boolean,
  ): Promise<void>;
  triggerErrorMessages(page: Page): Promise<void>;
};

const removeStayPage: RemoveStayPage = {
  continue: '[type="submit"]',
  previous: ".button-secondary[disabled]",
  cancel: ".cancel",

  async checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
  ): Promise<void> {
    await Promise.all([
      expect(page.locator(".govuk-caption-l")).toHaveText(
        removeStay_content.pageHint,
      ),
      expect(page.locator(".govuk-heading-l")).toHaveText(
        removeStay_content.pageTitle,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `markdown > h3:text-is("${caseSubjectDetailsObject_content.name}")`,
        ),
        1,
      ),
      expect(page.locator("markdown > p").nth(0)).toContainText(
        createListingNotifyPageContent.caseReference + caseNumber,
      ),
      ...Array.from({ length: 9 }, (_, index: number) => {
        const textOnPage = (removeStay_content as any)[
          `textOnPage${index + 1}`
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
    removeReason: RemoveReason,
    optionalText: boolean,
  ): Promise<void> {
    await page.click(`#removeStayStayRemoveReason-${removeReason}`);
    if (removeReason === "Other") {
      await commonHelpers.checkVisibleAndPresent(
        page.locator(
          `.form-label:text-is("${removeStay_content.textOnPage10}")`,
        ),
        1,
      );
      await page.fill(`#stayFlagType`, removeStay_content.otherText);
    }
    if (optionalText) {
      await page.fill(
        `#removeStayAdditionalDetail`,
        `${removeStay_content.optionalText}`,
      );
    }
    await page.click(this.continue);
  },

  async triggerErrorMessages(page: Page): Promise<void> {
    await page.click(this.continue);
    await Promise.all([
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `#error-summary-title:text-is("${removeStay_content.errorBanner}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `.validation-error:has-text("${removeStay_content.errorReasonMissing}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `.error-message:has-text("${removeStay_content.errorReasonMissing}")`,
        ),
        1,
      ),
    ]);
    await page.click(`#removeStayStayRemoveReason-Other`);
    await page.click(this.continue);
    await Promise.all([
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `#error-summary-title:text-is("${removeStay_content.errorBanner}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `.validation-error:has-text("${removeStay_content.errorOtherMissing}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `.error-message:has-text("${removeStay_content.errorOtherMissing}")`,
        ),
        1,
      ),
    ]);
    await this.continueOn(page, "receivedOutcomeOfCivilCase", false);
  },
};

export default removeStayPage;
