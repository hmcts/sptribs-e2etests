const { expect } = require("@playwright/test");
const axeTest = require("../helpers/accessibilityTestHelper.js");
const applicationSubmittedDetailsPage = require("../fixtures/content/applicationSubmitted_content.js");

module.exports = {
  closeAndExitButton: "a[role='button']",

  async checkPageLoads(page, accessibilityTest) {
    await expect(page.locator(".govuk-panel__title")).toHaveText(
      applicationSubmittedDetailsPage.pageTitle,
    );
    await expect(
      page.locator("div[class='govuk-panel__body'] strong"),
    ).toContainText(applicationSubmittedDetailsPage.subTitle1);
    await expect(page.locator(".govuk-body").nth(4)).toHaveText(
      applicationSubmittedDetailsPage.textOnPage1,
    );
    await expect(page.locator(".govuk-body").nth(5)).toHaveText(
      applicationSubmittedDetailsPage.textOnPage2,
    );
    await expect(page.locator(".govuk-notification-banner__title")).toHaveText(
      applicationSubmittedDetailsPage.subTitle2,
    );
    await expect(
      page.locator(".govuk-notification-banner__content"),
    ).toContainText(applicationSubmittedDetailsPage.textOnPage3);
    await expect(
      page.locator(".govuk-notification-banner__content"),
    ).toContainText(applicationSubmittedDetailsPage.textOnPage4);
    await expect(
      page.locator(".govuk-notification-banner__content"),
    ).toContainText(applicationSubmittedDetailsPage.textOnPage5);
    if (accessibilityTest) {
      await axeTest.axeTest(page);
    }
  },

  async checkCICCaseNumber(page) {
    const cicCaseData = await page.textContent(".govuk-panel__body");
    const caseNumber = cicCaseData.replace(/\D/g, "");
    if (caseNumber.length !== 16) {
      throw new Error(
        `String length should be 16, but it is ${caseNumber.length}`,
      );
    }
  },

  async returnCICCaseNumber(page) {
    let cicCaseData = await page.textContent(".govuk-panel__body");
    cicCaseData = cicCaseData.replace(/\D/g, "");
    cicCaseData = cicCaseData.replace(/(\d{4})/g, '$1-');
    cicCaseData = cicCaseData.slice(0, -1);
    return cicCaseData
    },
};
