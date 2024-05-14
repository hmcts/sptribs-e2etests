import { expect, Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import commonHelpers, {
  hearingFormat,
  hearingType,
} from "../../../helpers/commonHelpers.ts";
import createListingHearingTypeAndFormatContent from "../../../fixtures/content/CaseAPI/createListing/createListingHearingTypeAndFormat_content.ts";
import caseSubjectDetailsObject_content from "../../../fixtures/content/CaseAPI/createCase/caseSubjectDetailsObject_content.ts";

type CreateListingHearingTypeAndFormatPage = {
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
    hearingType: hearingType,
    hearingFormat: hearingFormat,
  ): Promise<void>;
  triggerErrorMessage(page: Page): Promise<void>;
  continueOn(page: Page): Promise<void>;
};

const createListingHearingTypeAndFormatPage: CreateListingHearingTypeAndFormatPage =
  {
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
          createListingHearingTypeAndFormatContent.pageHint,
        ),
        expect(page.locator(".govuk-heading-l")).toHaveText(
          createListingHearingTypeAndFormatContent.pageTitle,
        ),
        expect(page.locator("markdown > h3")).toContainText(
          caseSubjectDetailsObject_content.name,
        ),
        expect(page.locator("markdown > p").nth(0)).toContainText(
          createListingHearingTypeAndFormatContent.caseReference + caseNumber,
        ),
        ...Array.from({ length: 10 }, (_, index) => {
          const textOnPage = (createListingHearingTypeAndFormatContent as any)[
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
      hearingType: hearingType,
      hearingFormat: hearingFormat,
    ): Promise<void> {
      await page.getByLabel(hearingType).check();
      await page.getByLabel(hearingFormat).check();
    },

    async triggerErrorMessage(page: Page): Promise<void> {
      await page.click(this.continue);
      await Promise.all([
        expect(page.locator(".govuk-error-summary__title")).toHaveText(
          createListingHearingTypeAndFormatContent.errorBanner,
        ),
        expect(page.locator(".error-message").nth(0)).toHaveText(
          createListingHearingTypeAndFormatContent.hearingTypeError,
        ),
        expect(page.locator(".error-message").nth(1)).toHaveText(
          createListingHearingTypeAndFormatContent.hearingFormatError,
        ),
      ]);
    },

    async continueOn(page: Page): Promise<void> {
      await page.click(this.continue);
    },
  };

export default createListingHearingTypeAndFormatPage;
