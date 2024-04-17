import { expect, Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import commonHelpers, {
  caseRegionCode,
  hearingFormat,
  hearingType,
} from "../../../helpers/commonHelpers.ts";
import hearingOptionsHearingDetailsContent from "../../../fixtures/content/CaseAPI/hearingOptions/hearingOptionsHearingDetails_content.ts";
import submitContent from "../../../fixtures/content/CaseAPI/createListing/submit_content.ts";
import caseSubjectDetailsObject_content from "../../../fixtures/content/CaseAPI/createCase/caseSubjectDetailsObject_content.ts";
import createListingListingDetailsContent from "../../../fixtures/content/CaseAPI/createListing/createListingListingDetails_content.ts";

type SubmitPage = {
  saveAndContinue: string;
  previous: string;
  cancel: string;
  checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
  ): Promise<void>;
  checkValidInfo(
    page: Page,
    region: boolean,
    caseRegionCode: caseRegionCode | null,
    hearingType: hearingType,
    hearingFormat: hearingFormat,
    hearingSession: string,
    hearingAcrossMultipleDays: boolean,
  ): Promise<void>;
  continueOn(page: Page): Promise<void>;
};

const submitPage: SubmitPage = {
  saveAndContinue: '[type="submit"]',
  previous: ".button-secondary",
  cancel: ".cancel",

  async checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
  ): Promise<void> {
    await Promise.all([
      expect(page.locator(".govuk-heading-l")).toHaveText(
        submitContent.pageTitle,
      ),
      expect(page.locator("markdown > h3")).toContainText(
        caseSubjectDetailsObject_content.name,
      ),
      expect(page.locator("markdown > p").nth(0)).toContainText(
        createListingListingDetailsContent.caseReference + caseNumber,
      ),
      expect(page.locator(".heading-h2")).toHaveText(submitContent.subTitle),
      expect(page.locator("span.text-16").nth(0)).toHaveText(
        submitContent.textOnPage1,
      ),
      ...Array.from({ length: 14 }, (_, index) => {
        const textOnPage = (submitContent as any)[`textOnPage${index + 2}`];
        return commonHelpers.checkVisibleAndPresent(
          page.locator(
            `th.case-field-label > span.text-16:text-is("${textOnPage}")`,
          ),
          1,
        );
      }),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `th.case-field-label > span.text-16:text-is("${submitContent.textOnPage16}")`,
        ),
        4,
      ),
      page.locator(this.previous).isVisible(),
      page.locator(this.saveAndContinue).isVisible(),
      page.locator(this.cancel).isVisible(),
    ]);
    if (region) {
      await commonHelpers.checkVisibleAndPresent(
        page.locator(
          `th.case-field-label > span.text-16:text-is("${submitContent.textOnPage2}")`,
        ),
        1,
      );
    }
    if (venue) {
      await commonHelpers.checkVisibleAndPresent(
        page.locator(
          `th.case-field-label > span.text-16:text-is("${submitContent.textOnPage3}")`,
        ),
        1,
      );
    }
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async checkValidInfo(
    page: Page,
    region: boolean,
    caseRegionCode: caseRegionCode | null,
    hearingType: hearingType,
    hearingFormat: hearingFormat,
    hearingSession: string,
    hearingAcrossMultipleDays: boolean,
  ): Promise<void> {
    if (region) {
      await commonHelpers.checkVisibleAndPresent(
        page.locator(
          `ccd-read-dynamic-list-field > span.text-16:text-is("${caseRegionCode}")`,
        ),
        1,
      );
    }
    if (venue) {
      await commonHelpers.checkVisibleAndPresent(
        page.locator(
          `ccd-read-dynamic-list-field > span.text-16:text-is("${hearingOptionsHearingDetailsContent.venue}")`,
        ),
        1,
      );
    }
    if (venueNotListed) {
      await commonHelpers.checkVisibleAndPresent(
        page.locator(
          `span.text-16:text-is("${hearingOptionsHearingDetailsContent.textOnPage2}")`,
        ),
        1,
      );
    }
    await Promise.all([
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `ccd-read-text-field > span.text-16:text-is("${hearingOptionsHearingDetailsContent.room}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `ccd-read-text-field > span.text-16:text-is("${hearingOptionsHearingDetailsContent.instructions}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `ccd-read-fixed-radio-list-field > span.text-16:text-is("${hearingFormat}")`,
        ),
        1,
      ),
    ]);
    if (shortNoticeHearing) {
      await commonHelpers.checkVisibleAndPresent(
        page.locator(`ccd-read-yes-no-field > span.text-16:text-is("Yes")`),
        1,
      );
    } else {
      await commonHelpers.checkVisibleAndPresent(
        page.locator(`ccd-read-yes-no-field > span.text-16:text-is("No")`),
        1,
      );
    }
  },

  async continueOn(page: Page): Promise<void> {
    await page.click(this.saveAndContinue);
  },
};

export default submitPage;
