import { expect, Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import commonHelpers from "../../../helpers/commonHelpers.ts";
import caseSubjectDetailsObject_content from "../../../fixtures/content/CaseAPI/createCase/caseSubjectDetailsObject_content.ts";
import referCaseToJudgeReasonContent from "../../../fixtures/content/CaseAPI/referCaseToJudge/referCaseToJudgeReason_content.ts";

export type referralReason =
  | "Corrections"
  | "Listed case"
  | "Listed case (within 5 days)"
  | "Listing directions"
  | "New case"
  | "Postponement request"
  | "Reinstatement request"
  | "Rule 27 request"
  | "Set aside request"
  | "Stay request"
  | "Strike out request"
  | "Time extension request"
  | "Withdrawal request"
  | "Written reasons request"
  | "Other";

type ReferCaseToJudgeReasonPage = {
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

const referCaseToJudgeReasonPage: ReferCaseToJudgeReasonPage = {
  continue: '[type="submit"]',
  previous: ".button-secondary[disabled]",
  cancel: ".cancel",

  async checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page.waitForSelector(
      `.govuk-heading-l:text-is("${referCaseToJudgeReasonContent.pageTitle}")`,
    );
    await Promise.all([
      expect(page.locator("markdown > h3")).toContainText(
        caseSubjectDetailsObject_content.name,
      ),
      expect(page.locator("markdown > p").nth(0)).toContainText(
        referCaseToJudgeReasonContent.caseReference + caseNumber,
      ),
      expect(page.locator(".form-label").nth(0)).toHaveText(
        referCaseToJudgeReasonContent.textOnPage1,
      ),
      commonHelpers.checkForButtons(
        page,
        this.continue,
        this.previous,
        this.cancel,
      ),
    ]);
    await page.selectOption("#referToJudgeReferralReason", "Other");
    await expect(page.locator(".form-label").nth(1)).toHaveText(
      referCaseToJudgeReasonContent.textOnPage2,
    );
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async fillFields(page: Page, referralReason: referralReason): Promise<void> {
    await page.selectOption("#referToJudgeReferralReason", referralReason);
    if (referralReason === "Other") {
      await page.fill(
        "#referToJudgeReasonForReferral",
        referCaseToJudgeReasonContent.reason,
      );
    }
  },

  async continueOn(page: Page): Promise<void> {
    await page.click(this.continue);
  },

  async triggerErrorMessages(page: Page): Promise<void> {
    await page.selectOption("#referToJudgeReferralReason", {
      value: "0: null",
    });
    await page.click(this.continue);
    await Promise.all([
      expect(page.locator(".govuk-error-summary__title")).toHaveText(
        referCaseToJudgeReasonContent.errorBanner,
      ),
      expect(page.locator(".validation-error")).toHaveText(
        referCaseToJudgeReasonContent.referralError,
      ),
      expect(page.locator(".error-message")).toHaveText(
        referCaseToJudgeReasonContent.referralError,
      ),
    ]);
    await page.selectOption("#referToJudgeReferralReason", "Other");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await page.click(this.continue);
    await Promise.all([
      expect(page.locator(".govuk-error-summary__title")).toHaveText(
        referCaseToJudgeReasonContent.errorBanner,
      ),
      expect(page.locator(".validation-error")).toHaveText(
        referCaseToJudgeReasonContent.reasonError,
      ),
      expect(page.locator(".error-message")).toHaveText(
        referCaseToJudgeReasonContent.reasonError,
      ),
    ]);
  },
};

export default referCaseToJudgeReasonPage;
