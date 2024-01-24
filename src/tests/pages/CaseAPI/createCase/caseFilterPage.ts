import { expect, Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import caseFilter_content from "../../../fixtures/content/CaseAPI/createCase/caseFilter_content.ts";

type CaseFilterPage = {
  submit: string;
  checkPageLoads(page: Page, accessibilityTest: boolean): Promise<void>;
  fillInFields(page: Page): Promise<void>;
};

const caseFilterPage: CaseFilterPage = {
  submit: ".button",

  async checkPageLoads(page: Page, accessibilityTest: boolean): Promise<void> {
    await expect(page.locator(".govuk-heading-xl")).toHaveText(
      caseFilter_content.pageTitle,
    );
    await expect(page.locator(".form-label").nth(0)).toHaveText(
      caseFilter_content.textOnPage1,
    );
    await expect(page.locator(".form-label").nth(1)).toHaveText(
      caseFilter_content.textOnPage2,
    );
    await expect(page.locator(".form-label").nth(2)).toHaveText(
      caseFilter_content.textOnPage3,
    );
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async fillInFields(page: Page): Promise<void> {
    await page.selectOption("#cc-jurisdiction", caseFilter_content.dropdown1);
    await page.selectOption("#cc-case-type", caseFilter_content.dropdown2);
    await page.selectOption("#cc-event", caseFilter_content.dropdown3);
    await page.click(this.submit);
  },
};

export default caseFilterPage;
