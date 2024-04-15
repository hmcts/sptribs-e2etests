import { expect, Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import commonHelpers, {
  hearingFormat,
  hearingType,
} from "../../../helpers/commonHelpers.ts";
import createListingHearingTypeAndFormatContent from "../../../fixtures/content/CaseAPI/createListing/createListingHearingTypeAndFormat_content.ts";

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
        commonHelpers.checkNumberAndSubject(page, caseNumber),
        expect(page.locator(".govuk-caption-l")).toHaveText(
          createListingHearingTypeAndFormatContent.pageHint,
        ),
        expect(page.locator(".govuk-heading-l")).toHaveText(
          createListingHearingTypeAndFormatContent.pageTitle,
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
        page.locator(this.previous).isVisible(),
        page.locator(this.continue).isVisible(),
        page.locator(this.cancel).isVisible(),
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
