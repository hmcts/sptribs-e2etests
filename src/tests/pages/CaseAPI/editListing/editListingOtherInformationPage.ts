import { expect, Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import commonHelpers from "../../../helpers/commonHelpers.ts";
import editListingOtherInformationContent from "../../../fixtures/content/CaseAPI/editListing/editListingOtherInformation_content.ts";
import caseSubjectDetailsObject_content from "../../../fixtures/content/CaseAPI/createCase/caseSubjectDetailsObject_content.ts";

type EditListingOtherInformationPage = {
  importantInfo: string;
  previous: string;
  continue: string;
  cancel: string;
  checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
  ): Promise<void>;
  checkFields(page: Page): Promise<void>;
  continueOn(page: Page): Promise<void>;
};

const editListingOtherInformationPage: EditListingOtherInformationPage = {
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
      `**/case-details/${caseNumber.replace(/-/g, "")}/trigger/caseworker-edit-record-listing/caseworker-edit-record-listingotherInformation`,
    );
    await Promise.all([
      expect(page.locator(".govuk-caption-l")).toHaveText(
        editListingOtherInformationContent.pageHint,
      ),
      expect(page.locator(".govuk-heading-l")).toHaveText(
        editListingOtherInformationContent.pageTitle,
      ),
      expect(page.locator("markdown > h3")).toContainText(
        caseSubjectDetailsObject_content.name,
      ),
      expect(page.locator("markdown > p").nth(0)).toContainText(
        editListingOtherInformationContent.caseReference + caseNumber,
      ),
      expect(page.locator("markdown > p").nth(1)).toHaveText(
        editListingOtherInformationContent.textOnPage1,
      ),
      expect(page.locator(".form-label")).toHaveText(
        editListingOtherInformationContent.textOnPage2,
      ),
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

  async checkFields(page: Page): Promise<void> {
    await expect(page.locator(this.importantInfo)).toContainText(
      editListingOtherInformationContent.otherInformation,
    );
  },

  async continueOn(page: Page): Promise<void> {
    await page.click(this.continue);
  },
};

export default editListingOtherInformationPage;
