import { expect, Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import commonHelpers from "../../../helpers/commonHelpers.ts";
import createListingListingDetailsContent from "../../../fixtures/content/CaseAPI/createListing/createListingListingDetails_content.ts";
import caseSubjectDetailsObject_content from "../../../fixtures/content/CaseAPI/createCase/caseSubjectDetailsObject_content.ts";

type CreateListingListingDetailsPage = {
  venue: string;
  venueNotListed: string;
  inputVenue: string;
  roomAtVenue: string;
  instructions: string;
  day: string;
  month: string;
  year: string;
  startTime: string;
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
    venue: boolean,
    venueNotListed: boolean,
    hearingSession: string,
    hearingAcrossMultipleDays: boolean,
  ): Promise<void>;
  triggerErrorMessages(page: Page): Promise<void>;
  continueOn(page: Page): Promise<void>;
};

const createListingListingDetailsPage: CreateListingListingDetailsPage = {
  venue: "#hearingVenues",
  venueNotListed: "#venueNotListedOption-VenueNotListed",
  inputVenue: "#hearingVenueNameAndAddress",
  roomAtVenue: "#roomAtVenue",
  instructions: "#addlInstr",
  day: "#date-day",
  month: "#date-month",
  year: "#date-year",
  startTime: "#hearingTime",
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
        createListingListingDetailsContent.pageHint,
      ),
      expect(page.locator(".govuk-heading-l")).toHaveText(
        createListingListingDetailsContent.pageTitle,
      ),
      expect(page.locator("markdown > h3")).toContainText(
        caseSubjectDetailsObject_content.name,
      ),
      expect(page.locator("markdown > p").nth(0)).toContainText(
        createListingListingDetailsContent.caseReference + caseNumber,
      ),
      ...Array.from({ length: 2 }, (_, index) => {
        const textOnPage = (createListingListingDetailsContent as any)[
          `textOnPage${index + 1}`
        ];
        return commonHelpers.checkVisibleAndPresent(
          page.locator(`.form-label:text-is("${textOnPage}")`),
          1,
        );
      }),
    ]);
    await page
      .getByLabel(createListingListingDetailsContent.textOnPage2, {
        exact: true,
      })
      .check();
    await expect(page.locator("label[for='hearingVenueNameAndAddress']")).toHaveText(
      (`${createListingListingDetailsContent.textOnPage3}`)
    );
    await page
      .getByLabel(createListingListingDetailsContent.textOnPage2, {
        exact: true,
      })
      .click();
    await Promise.all([
      expect(page.locator("markdown > h4")).toHaveText(
        createListingListingDetailsContent.subTitle1,
      ),
      ...Array.from({ length: 14 }, (_, index) => {
        const textOnPage = (createListingListingDetailsContent as any)[
          `textOnPage${index + 4}`
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
    venue: boolean,
    venueNotListed: boolean,
    hearingSession: string,
    hearingAcrossMultipleDays: boolean,
  ): Promise<void> {
    if (venue) {
      await page.selectOption(
        this.venue,
        "East London Tribunal Hearing Centre-2 Clove Crescent, East India Dock London",
      );
    }
    if (venueNotListed) {
      await page
        .getByLabel(createListingListingDetailsContent.textOnPage2)
        .check();
      await page.fill(this.inputVenue, "Test Venue");
    }
    await page.fill(this.roomAtVenue, createListingListingDetailsContent.room);
    await page.fill(
      this.instructions,
      createListingListingDetailsContent.instructions,
    );
    const currentDate = new Date();
    await page.fill(this.day, `${currentDate.getDate()}`);
    await page.fill(this.month, `${currentDate.getMonth() + 1}`);
    await page.fill(this.year, `${currentDate.getFullYear()}`);
    await page.getByLabel(hearingSession).dblclick();
    if (hearingSession === "Morning" || "All day") {
      await page.fill(this.startTime, "9:00");
    } else if (hearingSession === "Afternoon") {
      await page.fill(this.startTime, "14:00");
    }
    if (!hearingAcrossMultipleDays) {
      await page.getByLabel("No", { exact: true }).click();
    } else {
      await page.getByLabel("Yes", { exact: true }).click();
    }
  },

  async triggerErrorMessages(page: Page): Promise<void> {},

  async continueOn(page: Page): Promise<void> {
    await page.click(this.continue);
  },
};

export default createListingListingDetailsPage;
