import { expect, Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import commonHelpers, {
  caseRegionCode,
} from "../../../helpers/commonHelpers.ts";
import editListingRegionInfoContent from "../../../fixtures/content/CaseAPI/editListing/editListingRegionInfo_content.ts";
import caseSubjectDetailsObject_content from "../../../fixtures/content/CaseAPI/createCase/caseSubjectDetailsObject_content.ts";

type EditListingRegionInfoPage = {
  region: string;
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
    region: boolean,
    caseRegionCode: caseRegionCode | null,
  ): Promise<void>;
  continueOn(page: Page): Promise<void>;
};

const editListingRegionInfoPage: EditListingRegionInfoPage = {
  region: "#regionList",
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
        editListingRegionInfoContent.pageHint,
      ),
      expect(page.locator(".govuk-heading-l")).toHaveText(
        editListingRegionInfoContent.pageTitle,
      ),
      expect(page.locator("markdown > h3")).toContainText(
        caseSubjectDetailsObject_content.name,
      ),
      expect(page.locator("markdown > p").nth(0)).toContainText(
        editListingRegionInfoContent.caseReference + caseNumber,
      ),
      expect(page.locator(".form-label")).toHaveText(
        editListingRegionInfoContent.textOnPage,
      ),
      commonHelpers.checkForButtons(
        page,
        this.continue,
        this.previous,
        this.cancel,
      ),
    ]);
    // if (accessibilityTest) {
    //   await axeTest(page);
    // }
  },

  async fillInFields(
    page: Page,
    region: boolean,
    caseRegionCode: caseRegionCode | null,
  ): Promise<void> {
    await expect(page.locator(this.region)).toHaveValue("2-Midlands");
    if (region) {
      await page.selectOption(this.region, caseRegionCode);
    } else {
      await page.selectOption(this.region, { value: "0" });
    }
  },

  async continueOn(page: Page): Promise<void> {
    await page.click(this.continue);
  },
};

export default editListingRegionInfoPage;
