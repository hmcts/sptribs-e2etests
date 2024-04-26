import { expect, Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import createSummarySelectHearingContent from "../../../fixtures/content/CaseAPI/createSummary/createSummarySelectHearing_content.ts";
import caseSubjectDetailsObject_content from "../../../fixtures/content/CaseAPI/createCase/caseSubjectDetailsObject_content.ts";

type CreateSummarySelectHearingPage = {
  previous: string;
  continue: string;
  cancel: string;
  checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
  ): Promise<void>;
  fillInFields(page: Page): Promise<void>;
  triggerErrorMessages(page: Page): Promise<void>;
  continueOn(page: Page): Promise<void>;
};

const createSummarySelectHearingPage: CreateSummarySelectHearingPage = {
  previous: ".button-secondary[disabled]",
  continue: '[type="submit"]',
  cancel: ".cancel",

  async checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
  ): Promise<void> {
    await Promise.all([
      expect(page.locator(".govuk-caption-l")).toHaveText(
        createSummarySelectHearingContent.pageHint,
      ),
      expect(page.locator(".govuk-heading-l")).toHaveText(
        createSummarySelectHearingContent.pageTitle,
      ),
      expect(page.locator("markdown > h3")).toContainText(
        caseSubjectDetailsObject_content.name,
      ),
      expect(page.locator("markdown > p").nth(0)).toContainText(
        createSummarySelectHearingContent.caseReference + caseNumber,
      ),
      expect(page.locator(".form-label")).toHaveText(
        createSummarySelectHearingContent.textOnPage,
      ),
      page.locator(this.previous).isVisible(),
      page.locator(this.continue).isVisible(),
      page.locator(this.cancel).isVisible(),
    ]);
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async fillInFields(page: Page): Promise<void> {
    await page.locator("#cicCaseHearingList").selectOption({ value: "1" });
  },

  async continueOn(page: Page): Promise<void> {
    await page.click(this.continue);
  },

  async triggerErrorMessages(page: Page): Promise<void> {
    await page.click(this.continue);
    await Promise.all([
      expect(page.locator(".govuk-error-summary__title")).toHaveText(
        createSummarySelectHearingContent.errorBanner,
      ),
      expect(page.locator(".error-message")).toHaveText(
        createSummarySelectHearingContent.chooseHearingError,
      ),
    ]);
  },
};

export default createSummarySelectHearingPage;
