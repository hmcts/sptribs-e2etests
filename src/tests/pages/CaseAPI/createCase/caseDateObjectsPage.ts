import { expect, Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import caseDateObjects_content from "../../../fixtures/content/CaseAPI/createCase/casedateObjects_content.ts";
import commonHelpers from "../../../helpers/commonHelpers.ts";

type CaseDateObjectsPage = {
  continue: string;
  day: string;
  month: string;
  year: string;
  checkPageLoads(page: Page, accessibilityTest: boolean): Promise<void>;
  fillInFields(page: Page): Promise<void>;
  triggerErrorMessages(page: Page): Promise<void>;
};

const caseDateObjectsPage: CaseDateObjectsPage = {
  continue: '[type="submit"]',
  day: "#cicCaseCaseReceivedDate-day",
  month: "#cicCaseCaseReceivedDate-month",
  year: "#cicCaseCaseReceivedDate-year",

  async checkPageLoads(page: Page, accessibilityTest: boolean): Promise<void> {
    await page.waitForSelector(
      `.govuk-heading-l:text-is("${caseDateObjects_content.pageTitle}")`,
    );
    await Promise.all([
      expect(page.locator(".govuk-caption-l")).toHaveText(
        caseDateObjects_content.pageHint,
      ),
      ...Array.from({ length: 4 }, (_, index) => {
        const textOnPage = (caseDateObjects_content as any)[
          `textOnPage${index + 1}`
        ];
        return commonHelpers.checkVisibleAndPresent(
          page.locator(`.form-label:text-is("${textOnPage}")`),
          1,
        );
      }),
    ]);
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async fillInFields(page: Page): Promise<void> {
    await page.fill(this.day, caseDateObjects_content.day);
    await page.fill(this.month, caseDateObjects_content.month);
    await page.fill(this.year, caseDateObjects_content.year);
    await page.click(this.continue);
    if (page.url().includes("casedateObjects")) {
      await page.click(this.continue); // This is here in the chance that the "continue" button does not continue
    }
  },

  async triggerErrorMessages(page: Page): Promise<void> {
    await page.click(this.continue);
    await Promise.all([
      expect(page.locator("#error-summary-title")).toHaveText(
        caseDateObjects_content.errorBanner,
      ),
      expect(page.locator(".validation-error")).toHaveText(
        caseDateObjects_content.dateError,
      ),
      expect(page.locator(".error-message")).toHaveText(
        caseDateObjects_content.dateError,
      ),
    ]);
    await page.fill(this.day, "90");
    await page.click(this.continue);
    await Promise.all([
      expect(page.locator("#error-summary-title")).toHaveText(
        caseDateObjects_content.errorBanner,
      ),
      expect(page.locator(".validation-error")).toHaveText(
        caseDateObjects_content.validDateError,
      ),
      expect(page.locator(".error-message")).toHaveText(
        caseDateObjects_content.inlineValidDateError,
      ),
    ]);
    await page.locator(this.day).clear();
  },
};

export default caseDateObjectsPage;
