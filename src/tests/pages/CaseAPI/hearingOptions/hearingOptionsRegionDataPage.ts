import { expect, Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import hearingOptionsRegionDataContent from "../../../fixtures/content/CaseAPI/hearingOptions/hearingOptionsRegionData_content.ts";
import commonHelpers, {
  caseRegionCode,
} from "../../../helpers/commonHelpers.ts";

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
  fillInFields(
    page: Page,
    region: boolean,
    caseRegionCode: caseRegionCode | null,
  ): Promise<void>;
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
    await page.waitForSelector(
      `.govuk-heading-l:text-is("${hearingOptionsRegionDataContent.pageTitle}")`,
    );
    await Promise.all([
      commonHelpers.checkNumberAndSubject(page, caseNumber),
      await expect(page.locator(".form-label")).toHaveText(
        hearingOptionsRegionDataContent.textOnPage,
      ),
      commonHelpers.checkForButtons(
        page,
        this.continue,
        this.previous,
        this.cancel,
      ),
    ]);
    if (accessibilityTest) {
      // await axeTest(page);
    }
  },

  async fillInFields(
    page: Page,
    region: boolean,
    caseRegionCode: caseRegionCode | null,
  ): Promise<void> {
    if (region) {
      await page.selectOption(this.region, caseRegionCode);
    }
  },

  async continueOn(page: Page): Promise<void> {
    await page.click(this.continue);
  },
};

export default hearingOptionsRegionData;
