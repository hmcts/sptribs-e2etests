import { expect, Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import createListingOtherInformationContent from "../../../fixtures/content/CaseAPI/createListing/createListingOtherInformation_content.ts";
import caseSubjectDetailsObject_content from "../../../fixtures/content/CaseAPI/createCase/caseSubjectDetailsObject_content.ts";

type CreateListingOtherInformationPage = {
  importantInfo: string;
  previous: string;
  continue: string;
  cancel: string;
  checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
  ): Promise<void>;
  fillInFields(page: Page): Promise<void>;
  continueOn(page: Page): Promise<void>;
};

const createListingOtherInformationPage: CreateListingOtherInformationPage = {
  importantInfo: "#importantInfoDetails",
  previous: ".button-secondary",
  continue: '[type="submit"]',
  cancel: ".cancel",

  async checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page.waitForURL(
      `**/case-details/${caseNumber.replace(/-/g, "")}/trigger/caseworker-record-listing/caseworker-record-listingotherInformation`,
    );
    await Promise.all([
      expect(page.locator(".govuk-caption-l")).toHaveText(
        createListingOtherInformationContent.pageHint,
      ),
      expect(page.locator(".govuk-heading-l")).toHaveText(
        createListingOtherInformationContent.pageTitle,
      ),
      expect(page.locator("markdown > h3")).toContainText(
        caseSubjectDetailsObject_content.name,
      ),
      expect(page.locator("markdown > p").nth(0)).toContainText(
        createListingOtherInformationContent.caseReference + caseNumber,
      ),
      expect(page.locator("markdown > p").nth(1)).toHaveText(
        createListingOtherInformationContent.textOnPage1,
      ),
      expect(page.locator(".form-label")).toHaveText(
        createListingOtherInformationContent.textOnPage2,
      ),
      page.locator(this.previous).isVisible(),
      page.locator(this.continue).isVisible(),
      page.locator(this.cancel).isVisible(),
    ]);
    // if (accessibilityTest) {
    //   await axeTest(page);
    // }
  },

  async fillInFields(page: Page): Promise<void> {
    await page.fill(
      this.importantInfo,
      createListingOtherInformationContent.otherInformation,
    );
  },

  async continueOn(page: Page): Promise<void> {
    await page.click(this.continue);
  },
};

export default createListingOtherInformationPage;
