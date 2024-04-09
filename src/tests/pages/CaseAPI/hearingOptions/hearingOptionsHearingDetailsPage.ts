import { expect, Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import commonHelpers from "../../../helpers/commonHelpers.ts";
import hearingOptionsHearingDetailsContent from "../../../fixtures/content/CaseAPI/hearingOptions/hearingOptionsHearingDetails_content.ts";

type HearingOptionsHearingDetailsPage = {
  venue: string;
  roomAtVenue: string;
  instructions: string;
  previous: string;
  continue: string;
  cancel: string;
  checkPageLoads(page: Page, accessibilityTest: boolean): Promise<void>;
  fillInFields(
    page: Page,
    hearingFormat: string,
    shortNoticeHearing: boolean,
  ): Promise<void>;
  continueOn(page: Page): Promise<void>;
};

const hearingOptionsHearingDetails: HearingOptionsHearingDetailsPage = {
  venue: "#hearingVenues",
  roomAtVenue: "#roomAtVenue",
  instructions: "#addlInstr",
  previous: ".button-secondary",
  continue: '[type="submit"]',
  cancel: ".cancel",

  async checkPageLoads(page: Page, accessibilityTest: boolean): Promise<void> {
    await Promise.all([
      expect(page.locator(".govuk-heading-l")).toHaveText(
        hearingOptionsHearingDetailsContent.pageTitle,
      ),
      ...Array.from({ length: 11 }, (_, index) => {
        const textOnPage = (hearingOptionsHearingDetailsContent as any)[
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
    hearingFormat: string,
    shortNoticeHearing: boolean,
  ): Promise<void> {
    await page.selectOption(
      this.venue,
      hearingOptionsHearingDetailsContent.venue,
    );
    await page.fill(this.roomAtVenue, hearingOptionsHearingDetailsContent.room);
    await page.fill(
      this.instructions,
      hearingOptionsHearingDetailsContent.instructions,
    );
    await page.getByLabel(hearingFormat).check();
    if (shortNoticeHearing) {
      await page.getByLabel("Yes", { exact: true }).check();
    } else {
      await page.getByLabel("No", { exact: true }).check();
    }
  },

  async continueOn(page: Page): Promise<void> {
    await page.click(this.continue);
  },
};

export default hearingOptionsHearingDetails;
