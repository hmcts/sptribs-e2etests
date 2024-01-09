import { expect, Page } from "@playwright/test";
import axeTest from "../../helpers/accessibilityTestHelper";
import applicationSubmittedContent from "../../fixtures/content/DSSCreateCase/applicationSubmitted_content.ts";

type ApplicationSubmittedPage = {
  closeAndExitButton: string;
  checkPageLoads(page: Page, accessibilityTest: boolean): Promise<void>;
  checkCICCaseNumber(page: Page): Promise<void>;
  returnCICCaseNumber(page: Page): Promise<string>;
};

const applicationSubmittedPage: ApplicationSubmittedPage = {
  closeAndExitButton: "a[role='button']",

  async checkPageLoads(page: Page, accessibilityTest: boolean): Promise<void> {
    await expect(page.locator(".govuk-panel__title")).toHaveText(
      applicationSubmittedContent.pageTitle,
    );
    await expect(
      page.locator("div[class='govuk-panel__body'] strong"),
    ).toContainText(applicationSubmittedContent.subTitle1);
    await expect(page.locator(".govuk-body").nth(4)).toHaveText(
      applicationSubmittedContent.textOnPage1,
    );
    await expect(page.locator(".govuk-body").nth(5)).toHaveText(
      applicationSubmittedContent.textOnPage2,
    );
    await expect(page.locator(".govuk-notification-banner__title")).toHaveText(
      applicationSubmittedContent.subTitle2,
    );
    await expect(
      page.locator(".govuk-notification-banner__content"),
    ).toContainText(applicationSubmittedContent.textOnPage3);
    await expect(
      page.locator(".govuk-notification-banner__content"),
    ).toContainText(applicationSubmittedContent.textOnPage4);
    await expect(
      page.locator(".govuk-notification-banner__content"),
    ).toContainText(applicationSubmittedContent.textOnPage5);
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async checkCICCaseNumber(page: Page): Promise<void> {
    const cicCaseData = await page.textContent(".govuk-panel__body");
    const caseNumber = cicCaseData.replace(/\D/g, "");
    if (caseNumber.length !== 16) {
      throw new Error(
        `String length should be 16, but it is ${caseNumber.length}`,
      );
    }
  },

  async returnCICCaseNumber(page: Page): Promise<string> {
    let cicCaseData = await page.textContent(".govuk-panel__body");
    cicCaseData = cicCaseData.replace(/\D/g, "");
    cicCaseData = cicCaseData.replace(/(\d{4})/g, "$1-");
    cicCaseData = cicCaseData.slice(0, -1);
    return cicCaseData;
  },
};

export default applicationSubmittedPage;
