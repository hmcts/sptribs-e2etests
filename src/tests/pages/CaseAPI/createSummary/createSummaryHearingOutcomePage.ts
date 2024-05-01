import { expect, Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import createSummaryHearingOutcomeContent from "../../../fixtures/content/CaseAPI/createSummary/createSummaryHearingOutcome_content.ts";
import commonHelpers, {
  hearingAdjournedReasons,
  hearingOutcome,
} from "../../../helpers/commonHelpers.ts";
import caseSubjectDetailsObject_content from "../../../fixtures/content/CaseAPI/createCase/caseSubjectDetailsObject_content.ts";

type CreateSummaryHearingOutcomePage = {
  previous: string;
  continue: string;
  cancel: string;
  checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
    errorMessaging: boolean,
  ): Promise<void>;
  fillFields(
    page: Page,
    hearingOutcome: hearingOutcome,
    hearingAdjournedReason: hearingAdjournedReasons | null,
  ): Promise<void>;
  triggerErrorMessages(page: Page): Promise<void>;
  continueOn(page: Page): Promise<void>;
};

const createSummaryHearingOutcomePage: CreateSummaryHearingOutcomePage = {
  previous: "button[name='Previous']",
  continue: '[type="submit"]',
  cancel: ".cancel",

  async checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
    errorMessaging: boolean,
  ): Promise<void> {
    await Promise.all([
      expect(page.locator(".govuk-caption-l")).toHaveText(
        createSummaryHearingOutcomeContent.pageHint,
      ),
      expect(page.locator(".govuk-heading-l")).toHaveText(
        createSummaryHearingOutcomeContent.pageTitle,
      ),
      expect(page.locator("markdown > h3")).toContainText(
        caseSubjectDetailsObject_content.name,
      ),
      expect(page.locator("markdown > p").nth(0)).toContainText(
        createSummaryHearingOutcomeContent.caseReference + caseNumber,
      ),
      ...Array.from({ length: 5 }, (_, index) => {
        const textOnPage = (createSummaryHearingOutcomeContent as any)[
          `textOnPage${index + 1}`
        ];
        return commonHelpers.checkVisibleAndPresent(
          page.locator(`.form-label:text-is("${textOnPage}")`),
          1,
        );
      }),
      page.locator(this.previous).isVisible(),
      page.locator(this.continue).isVisible(),
      page.locator(this.cancel).isVisible(),
    ]);
    if (!errorMessaging) {
      await page
        .getByLabel(createSummaryHearingOutcomeContent.textOnPage2)
        .click();
      await Promise.all([
        ...Array.from({ length: 27 }, (_, index) => {
          const textOnPage = (createSummaryHearingOutcomeContent as any)[
            `textOnPage${index + 6}`
          ];
          return commonHelpers.checkVisibleAndPresent(
            page.locator(`.form-label:text-is("${textOnPage}")`),
            1,
          );
        }),
      ]);
    }

    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async fillFields(
    page: Page,
    hearingOutcome: hearingOutcome,
    hearingAdjournedReason: hearingAdjournedReasons | null,
  ): Promise<void> {
    await page.getByLabel(hearingOutcome).click();
    if (hearingAdjournedReason !== null) {
      await page.getByLabel(hearingAdjournedReason).click();
      if (hearingAdjournedReason === "Other") {
        await page
          .locator("#hearingAdjournedReason")
          .fill(createSummaryHearingOutcomeContent.otherAdjournedReason);
      }
    }
  },

  async triggerErrorMessages(page: Page): Promise<void> {
    await page.click(this.continue);
    await Promise.all([
      expect(page.locator("#error-summary-title")).toHaveText(
        createSummaryHearingOutcomeContent.errorBanner,
      ),
      expect(page.locator(".error-message")).toHaveText(
        createSummaryHearingOutcomeContent.decisionError,
      ),
    ]);
    await page
      .getByLabel(createSummaryHearingOutcomeContent.textOnPage2)
      .click();
    await page.click(this.continue);
    await Promise.all([
      expect(page.locator("#error-summary-title")).toHaveText(
        createSummaryHearingOutcomeContent.errorBanner,
      ),
      expect(page.locator(".error-message")).toHaveText(
        createSummaryHearingOutcomeContent.adjournedError,
      ),
    ]);
  },

  async continueOn(page: Page): Promise<void> {
    await page.click(this.continue);
  },
};

export default createSummaryHearingOutcomePage;
