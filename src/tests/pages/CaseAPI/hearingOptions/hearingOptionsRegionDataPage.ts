import { expect, Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import hearingOptionsRegionDataContent from "../../../fixtures/content/CaseAPI/hearingOptions/hearingOptionsRegionData_content.ts";
import commonHelpers from "../../../helpers/commonHelpers.ts";

type HearingOptionsRegionDataPage = {
  region: string;
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

const hearingOptionsRegionData: HearingOptionsRegionDataPage = {
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
      commonHelpers.checkNumberAndSubject(page, caseNumber),
      expect(page.locator(".govuk-heading-l")).toHaveText(
        hearingOptionsRegionDataContent.pageTitle,
      ),
      await expect(page.locator(".form-label")).toHaveText(
        hearingOptionsRegionDataContent.label,
      ),
      page.locator(this.previous).isVisible(),
      page.locator(this.continue).isVisible(),
      page.locator(this.cancel).isVisible(),
    ]);
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async fillInFields(page: Page): Promise<void> {
    await page.selectOption(this.region, hearingOptionsRegionDataContent.region);
  },

  async continueOn(page: Page): Promise<void> {
    await page.click(this.continue)
  }
};

export default hearingOptionsRegionData;
