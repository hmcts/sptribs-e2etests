import { expect, Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import createCaseLinkCreateCaseLink_content from "../../../fixtures/content/CaseAPI/LinkCase/createCaseLinkCreateCaseLink_content.ts";
import commonHelpers from "../../../helpers/commonHelpers.ts";

type CreateCaseLinkCreateCaseLink = {
  next: string;
  previous: string;
  submit: string;
  cancel: string;
  checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
  ): Promise<void>;
  fillInFields(page: Page): Promise<void>;
  triggerErrorMessage(page: Page): Promise<void>;
};

const createCaseLinkCreateCaseLink: CreateCaseLinkCreateCaseLink = {
  next: "#next-button",
  previous: ".button-secondary[disabled]",
  submit: '[type="submit"]',
  cancel: ".cancel",

  async checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
  ): Promise<void> {
    await commonHelpers.checkNumberAndSubject(page, caseNumber);
    await expect(page.locator(".govuk-heading-xl")).toHaveText(
      createCaseLinkCreateCaseLink_content.pageTitle,
    );
    await expect(page.locator(".govuk-body").nth(0)).toHaveText(
      createCaseLinkCreateCaseLink_content.textOnPage1,
    );
    await expect(page.locator(".govuk-body").nth(1)).toHaveText(
      createCaseLinkCreateCaseLink_content.textOnPage2,
    );
    await page.locator(this.next).isVisible();
    await page.locator(this.previous).isVisible();
    await page.locator(this.submit).isVisible();
    await page.locator(this.cancel).isVisible();

    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async fillInFields(page: Page): Promise<void> {
    await page.click(this.next);
  },

  async triggerErrorMessage(page: Page): Promise<void> {
    await page.click(this.submit);
    await expect(page.locator("#error-summary-title")).toHaveText(
      createCaseLinkCreateCaseLink_content.errorBanner,
    );
    await expect(page.locator(".validation-error")).toHaveText(
      createCaseLinkCreateCaseLink_content.errorMessage,
    );
  },
};

export default createCaseLinkCreateCaseLink;
