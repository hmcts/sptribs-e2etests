import { expect, Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import commonHelpers from "../../../helpers/commonHelpers.ts";
import caseSubjectDetailsObject_content from "../../../fixtures/content/CaseAPI/createCase/caseSubjectDetailsObject_content.ts";
import referCaseToLegalOfficerReasonContent from "../../../fixtures/content/CaseAPI/referCaseToLegalOfficer/referCaseToLegalOfficerReason_content.ts";
import { referralReason } from "../referCaseToJudge/referCaseToJudgeReasonPage.ts";

type ReferCaseToLegalOfficerReasonPage = {
  continue: string;
  previous: string;
  cancel: string;
  checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
  ): Promise<void>;
  fillFields(page: Page, referralReason: referralReason): Promise<void>;
  continueOn(page: Page): Promise<void>;
  triggerErrorMessages(page: Page): Promise<void>;
};

const referCaseToLegalOfficerReasonPage: ReferCaseToLegalOfficerReasonPage = {
  continue: '[type="submit"]',
  previous: ".button-secondary[disabled]",
  cancel: ".cancel",

  async checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
  ): Promise<void> {
    await Promise.all([
      expect(page.locator(".govuk-heading-l")).toHaveText(
        referCaseToLegalOfficerReasonContent.pageTitle,
      ),
      expect(page.locator("markdown > h3")).toContainText(
        caseSubjectDetailsObject_content.name,
      ),
      expect(page.locator("markdown > p").nth(0)).toContainText(
        referCaseToLegalOfficerReasonContent.caseReference + caseNumber,
      ),
      expect(page.locator(".form-label").nth(0)).toHaveText(
        referCaseToLegalOfficerReasonContent.textOnPage1,
      ),
      commonHelpers.checkForButtons(
        page,
        this.continue,
        this.previous,
        this.cancel,
      ),
    ]);
    await page.selectOption("#referToLegalOfficerReferralReason", "Other");
    await expect(page.locator(".form-label").nth(1)).toHaveText(
      referCaseToLegalOfficerReasonContent.textOnPage2,
    );
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async fillFields(page: Page, referralReason: referralReason): Promise<void> {
    await page.selectOption(
      "#referToLegalOfficerReferralReason",
      referralReason,
    );
    if (referralReason === "Other") {
      await page.fill(
        "#referToLegalOfficerReasonForReferral",
        referCaseToLegalOfficerReasonContent.reason,
      );
    }
  },

  async continueOn(page: Page): Promise<void> {
    await page.click(this.continue);
  },

  async triggerErrorMessages(page: Page): Promise<void> {
    await page.selectOption("#referToLegalOfficerReferralReason", {
      value: "0: null",
    });
    await page.click(this.continue);
    await Promise.all([
      expect(page.locator(".govuk-error-summary__title")).toHaveText(
        referCaseToLegalOfficerReasonContent.errorBanner,
      ),
      expect(page.locator(".validation-error")).toHaveText(
        referCaseToLegalOfficerReasonContent.referralError,
      ),
      expect(page.locator(".error-message")).toHaveText(
        referCaseToLegalOfficerReasonContent.referralError,
      ),
    ]);
    await page.selectOption("#referToLegalOfficerReferralReason", "Other");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await page.click(this.continue);
    await Promise.all([
      expect(page.locator(".govuk-error-summary__title")).toHaveText(
        referCaseToLegalOfficerReasonContent.errorBanner,
      ),
      expect(page.locator(".validation-error")).toHaveText(
        referCaseToLegalOfficerReasonContent.reasonError,
      ),
      expect(page.locator(".error-message")).toHaveText(
        referCaseToLegalOfficerReasonContent.reasonError,
      ),
    ]);
  },
};

export default referCaseToLegalOfficerReasonPage;
