import { expect, Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import commonHelpers, {
  hearingSession,
  hearingVenueNames,
  hearingVenues,
} from "../../../helpers/commonHelpers.ts";
import createSummaryListingDetailsContent from "../../../fixtures/content/CaseAPI/createSummary/createSummaryListingDetails_content.ts";
import caseSubjectDetailsObject_content from "../../../fixtures/content/CaseAPI/createCase/caseSubjectDetailsObject_content.ts";

type CreateListingListingDetailsPage = {
  venueNotListed: string;
  inputVenue: string;
  roomAtVenue: string;
  day: string;
  month: string;
  year: string;
  startTime: string;
  previous: string;
  continue: string;
  cancel: string;
  remove: string;
  checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
    hearingAcrossMultipleDays: boolean,
    venue: hearingVenues | null,
  ): Promise<void>;
  checkFields(
    page: Page,
    venue: hearingVenues | null,
    venueName: hearingVenueNames | null,
    hearingSession: hearingSession,
    hearingAcrossMultipleDays: boolean,
    editJourney: boolean,
  ): Promise<void>;
  triggerErrorMessages(page: Page): Promise<void>;
  continueOn(page: Page): Promise<void>;
};

const createListingListingDetailsPage: CreateListingListingDetailsPage = {
  venueNotListed: "#venueNotListedOption-VenueNotListed",
  inputVenue: "#hearingVenueNameAndAddress",
  roomAtVenue: "#roomAtVenue",
  day: "#date-day",
  month: "#date-month",
  year: "#date-year",
  startTime: "#hearingTime",
  previous: "button[name='Previous']",
  continue: '[type="submit"]',
  cancel: ".cancel",
  remove: "button[aria-label='Remove Additional Hearing date']",

  async checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
    hearingAcrossMultipleDays: boolean,
    venue: hearingVenues | null,
  ): Promise<void> {
    await Promise.all([
      expect(page.locator(".govuk-caption-l")).toHaveText(
        createSummaryListingDetailsContent.pageHint,
      ),
      expect(page.locator(".govuk-heading-l")).toHaveText(
        createSummaryListingDetailsContent.pageTitle,
      ),
      expect(page.locator("markdown > h3")).toContainText(
        caseSubjectDetailsObject_content.name,
      ),
      expect(page.locator("markdown > p").nth(0)).toContainText(
        createSummaryListingDetailsContent.caseReference + caseNumber,
      ),
      expect(page.locator(".case-field__label").nth(2)).toHaveText(
        createSummaryListingDetailsContent.textOnPage1,
      ),
      expect(page.locator(".form-label").nth(1)).toHaveText(
        createSummaryListingDetailsContent.textOnPage2,
      ),
      expect(page.locator("markdown > h4")).toHaveText(
        createSummaryListingDetailsContent.subTitle1,
      ),
      ...Array.from({ length: 2 }, (_, index) => {
        const textOnPage = (createSummaryListingDetailsContent as any)[
          `textOnPage${index + 4}`
        ];
        return commonHelpers.checkVisibleAndPresent(
          page.locator(`.form-label:text-is("${textOnPage}")`),
          1,
        );
      }),
      ...Array.from({ length: 4 }, (_, index) => {
        const textOnPage = (createSummaryListingDetailsContent as any)[
          `textOnPage${index + 13}`
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
    if (venue === null) {
      await expect(
        page.locator("label[for='hearingVenueNameAndAddress']"),
      ).toHaveText(`${createSummaryListingDetailsContent.textOnPage3}`);
    }

    if (!hearingAcrossMultipleDays) {
      await Promise.all([
        ...Array.from({ length: 7 }, (_, index) => {
          const textOnPage = (createSummaryListingDetailsContent as any)[
            `textOnPage${index + 6}`
          ];
          return commonHelpers.checkVisibleAndPresent(
            page.locator(`.form-label:text-is("${textOnPage}")`),
            1,
          );
        }),
      ]);
    } else {
      await Promise.all([
        expect(page.locator(".heading-h2").nth(0)).toHaveText(
          createSummaryListingDetailsContent.subTitle2,
        ),
        ...Array.from({ length: 7 }, (_, index) => {
          const textOnPage = (createSummaryListingDetailsContent as any)[
            `textOnPage${index + 6}`
          ];
          return commonHelpers.checkVisibleAndPresent(
            page.locator(`.form-label:text-is("${textOnPage}")`),
            4,
          );
        }),
        commonHelpers.checkVisibleAndPresent(
          page.locator(
            `div.float-left > label > h3.heading-h3:has-text("${createSummaryListingDetailsContent.additionalHearingDateTitle}")`,
          ),
          3,
        ),
        commonHelpers.checkVisibleAndPresent(
          page.locator(
            `.form-label:text-is("${createSummaryListingDetailsContent.additionalHearingDateTitle}")`,
          ),
          3,
        ),
        commonHelpers.checkVisibleAndPresent(
          page.locator(
            `.form-label:text-is("${createSummaryListingDetailsContent.additionalHearingDateTime}")`,
          ),
          3,
        ),
        commonHelpers.checkVisibleAndPresent(page.locator(this.remove), 3),
      ]);
    }

    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async checkFields(
    page: Page,
    venue: hearingVenues | null,
    venueName: hearingVenueNames | null,
    hearingSession: hearingSession,
    hearingAcrossMultipleDays: boolean,
    editJourney: boolean,
  ): Promise<void> {
    const currentDate = new Date();
    switch (editJourney) {
      default:
        if (venue) {
          await commonHelpers.checkVisibleAndPresent(
            page.locator(`.text-16:text-is("${venueName}")`),
            1,
          );
        } else {
          await expect(
            page.locator("#venueNotListedOption-VenueNotListed"),
          ).toBeChecked();
          await expect(page.locator(this.inputVenue)).toHaveText("Test Venue");
        }
        await Promise.all([
          expect(page.locator(this.roomAtVenue)).toHaveValue(
            createSummaryListingDetailsContent.room,
          ),
          expect(page.locator(this.day)).toHaveValue(
            `${commonHelpers.padZero(currentDate.getDate())}`,
          ),
          expect(page.locator(this.month)).toHaveValue(
            `${commonHelpers.padZero(currentDate.getMonth() + 1)}`,
          ),
          expect(page.locator(this.year)).toHaveValue(
            `${currentDate.getFullYear()}`,
          ),
          expect(page.getByLabel(hearingSession)).toBeChecked(),
        ]);
        if (hearingSession === "Morning" || hearingSession === "All day") {
          await expect(page.locator(this.startTime)).toHaveValue(
            createSummaryListingDetailsContent.morningTime,
          );
        } else if (hearingSession === "Afternoon") {
          await expect(page.locator(this.startTime)).toHaveValue(
            createSummaryListingDetailsContent.afternoonTime,
          );
        }
        if (!hearingAcrossMultipleDays) {
          await expect(page.getByLabel("No", { exact: true })).toBeChecked();
        } else {
          await expect(page.getByLabel("Yes", { exact: true })).toBeChecked();
          if (hearingSession === "Morning") {
            for (let i = 0; i < 3; i++) {
              await expect(
                page.locator(`#additionalHearingDate_${i}_hearingVenueTime`),
              ).toHaveText(createSummaryListingDetailsContent.morningTime);
              await expect(
                page.locator(
                  `#additionalHearingDate_${i}_hearingVenueSession-morning`,
                ),
              ).toBeChecked();
            }
          } else if (hearingSession === "All day") {
            for (let i = 0; i < 3; i++) {
              await expect(
                page.locator(`#additionalHearingDate_${i}_hearingVenueTime`),
              ).toHaveText(createSummaryListingDetailsContent.morningTime);
              await expect(
                page.locator(
                  `#additionalHearingDate_${i}_hearingVenueSession-allDay`,
                ),
              ).toBeChecked();
            }
          } else if (hearingSession === "Afternoon") {
            for (let i = 0; i < 3; i++) {
              await expect(
                page.locator(`#additionalHearingDate_${i}_hearingVenueTime`),
              ).toHaveText(createSummaryListingDetailsContent.afternoonTime);
              await expect(
                page.locator(
                  `#additionalHearingDate_${i}_hearingVenueSession-afternoon`,
                ),
              ).toBeChecked();
            }
          }

          await Promise.all([
            commonHelpers.checkVisibleAndPresent(
              page.locator(
                `#hearingVenueDate-day:text-is("${currentDate.getDate()}")`,
              ),
              3,
            ),
            commonHelpers.checkVisibleAndPresent(
              page.locator(
                `#hearingVenueDate-month:text-is("${currentDate.getMonth() + 1}")`,
              ),
              3,
            ),
            commonHelpers.checkVisibleAndPresent(
              page.locator(
                `#hearingVenueDate-year:text-is("${currentDate.getFullYear()}")`,
              ),
              3,
            ),
          ]);
        }
        break;
      case true:
        break;
    }
  },

  async triggerErrorMessages(page: Page): Promise<void> {
    await page.click(this.continue);
  },

  async continueOn(page: Page): Promise<void> {
    await page.click(this.continue);
  },
};

export default createListingListingDetailsPage;
