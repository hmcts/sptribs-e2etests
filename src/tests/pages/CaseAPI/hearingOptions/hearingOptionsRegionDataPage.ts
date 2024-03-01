import { expect, Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import hearingOptionsRegionDataContent from "../../../fixtures/content/CaseAPI/hearingOptions/hearingOptionsRegionData_content.ts";
import commonHelpers from "../../../helpers/commonHelpers.ts";

type HearingOptionsRegionDataPage = {
  region: string;
  previous: string;
  submit: string;
  cancel: string;
  checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
  ): Promise<void>;
  fillInFields(page: Page): Promise<void>;
};

const hearingOptionsRegionData: HearingOptionsRegionDataPage = {
  region: "#regionList",
  previous: ".button-secondary[disabled]",
  submit: '[type="submit"]',
  cancel: ".cancel",

  async checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
  ): Promise<void>{
    await Promise.all([
      commonHelpers.checkNumberAndSubject(page, caseNumber),
      expect(page.locator(".govuk-heading-xl")).toHaveText(
        hearingOptionsRegionDataContent.pageTitle,
      ),
      await expect(page.locator(".form-label")).toHaveText(
        hearingOptionsRegionDataContent.label,
      ),
      page.locator(this.previous).isVisible(),
      page.locator(this.submit).isVisible(),
      page.locator(this.cancel).isVisible(),
    ]);
    if (accessibilityTest) {
      await axeTest(page);
    }

  },

  async fillInFields(page: Page): Promise<void>{
    await page.fill(this.region, hearingOptionsRegionDataContent.region);
  },
}


export default hearingOptionsRegionData;