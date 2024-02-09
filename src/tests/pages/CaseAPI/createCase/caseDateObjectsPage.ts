import { expect, Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import caseDateObjects_content from "../../../fixtures/content/CaseAPI/createCase/casedateObjects_content.ts";

type CaseDateObjectsPage = {
  continue: string;
  day: string;
  month: string;
  year: string;
  checkPageLoads(page: Page, accessibilityTest: boolean): Promise<void>;
  fillInFields(page: Page): Promise<void>;
};

const caseDateObjectsPage: CaseDateObjectsPage = {
  continue: '[type="submit"]',
  day: "#cicCaseCaseReceivedDate-day",
  month: "#cicCaseCaseReceivedDate-month",
  year: "#cicCaseCaseReceivedDate-year",

  async checkPageLoads(page: Page, accessibilityTest: boolean): Promise<void> {
    await expect(page.locator(".govuk-caption-l")).toHaveText(
      caseDateObjects_content.pageHint,
    );
    await expect(page.locator(".govuk-heading-l")).toHaveText(
      caseDateObjects_content.pageTitle,
    );
    await expect(page.locator(".form-label").nth(0)).toHaveText(
      caseDateObjects_content.textOnPage1,
    );
    await expect(page.locator(".form-label").nth(1)).toHaveText(
      caseDateObjects_content.textOnPage2,
    );
    await expect(page.locator(".form-label").nth(2)).toHaveText(
      caseDateObjects_content.textOnPage3,
    );
    await expect(page.locator(".form-label").nth(3)).toHaveText(
      caseDateObjects_content.textOnPage4,
    );
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
};

export default caseDateObjectsPage;
