import { expect, Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import postponeHearingReasonContent from "../../../fixtures/content/CaseAPI/postponeHearing/postponeHearingReason_content.ts";
import commonHelpers, {
  hearingPostponedReasons,
} from "../../../helpers/commonHelpers.ts";
import caseSubjectDetailsObject_content from "../../../fixtures/content/CaseAPI/createCase/caseSubjectDetailsObject_content.ts";

type PostponeHearingReasonPage = {
  previous: string;
  continue: string;
  cancel: string;
  checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
  ): Promise<void>;
  fillInFields(
    page: Page,
    reasonPostponed: hearingPostponedReasons,
  ): Promise<void>;
  triggerErrorMessages(page: Page): Promise<void>;
  continueOn(page: Page): Promise<void>;
};

const postponeHearingReasonPage: PostponeHearingReasonPage = {
  previous: ".button-secondary",
  continue: '[type="submit"]',
  cancel: ".cancel",

  async checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
  ): Promise<void> {
    await Promise.all([
      expect(page.locator(".govuk-caption-l")).toHaveText(
        postponeHearingReasonContent.pageHint,
      ),
      expect(page.locator(".govuk-heading-l")).toHaveText(
        postponeHearingReasonContent.pageTitle,
      ),
      expect(page.locator("markdown > h3")).toContainText(
        caseSubjectDetailsObject_content.name,
      ),
      expect(page.locator("markdown > p").nth(0)).toContainText(
        postponeHearingReasonContent.caseReference + caseNumber,
      ),
      ...Array.from({ length: 21 }, (_, index) => {
        const textOnPage = (postponeHearingReasonContent as any)[
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

  async fillInFields(
    page: Page,
    reasonPostponed: hearingPostponedReasons,
  ): Promise<void> {
    await page.getByLabel(reasonPostponed, { exact: true }).click();
    await page.fill(
      "#postponeAdditionalInformation",
      postponeHearingReasonContent.otherImportantInformation,
    );
  },

  async continueOn(page: Page): Promise<void> {
    await page.click(this.continue);
  },

  async triggerErrorMessages(page: Page): Promise<void> {
    await page.click(this.continue);
    await Promise.all([
      expect(page.locator(".govuk-error-summary__title")).toHaveText(
        postponeHearingReasonContent.errorBanner,
      ),
      expect(page.locator(".validation-error")).toHaveText(
        postponeHearingReasonContent.reasonError,
      ),
      expect(page.locator(".error-message")).toHaveText(
        postponeHearingReasonContent.reasonError,
      ),
    ]);
  },
};

export default postponeHearingReasonPage;
