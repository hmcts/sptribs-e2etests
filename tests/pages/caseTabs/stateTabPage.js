const { expect } = require("@playwright/test");
const axeTest = require("../../helpers/accessibilityTestHelper.js");
const caseDetails = require("../../fixtures/content/caseDetails_content");
const stateTab = require("../../fixtures/content/caseTabs/stateTab_content.js")

module.exports = {
  caseStateTab: "#mat-tab-label-0-2",
  caseDetailsTab: "#mat-tab-label-0-3",
  casePartiesTab: "#mat-tab-label-0-4",
  caseDocumentsTab: "#mat-tab-label-0-6",

  async checkPageLoads(page, accessibilityTest) {
    await expect(page.locator(".case-field").first()).toContainText(caseDetails.pageTitle);
    await expect(
      page.locator("#mat-tab-label-0-0"),
    ).toHaveText(caseDetails.textOnPage1);
    await expect(
      page.locator("#mat-tab-label-0-1"),
    ).toHaveText(caseDetails.textOnPage2);
    await expect(
      page.locator(this.caseStateTab),
    ).toHaveText(caseDetails.textOnPage3);
    await expect(
      page.locator(this.caseDetailsTab),
    ).toHaveText(caseDetails.textOnPage4);
    await expect(
      page.locator(this.casePartiesTab),
    ).toHaveText(caseDetails.textOnPage5);
    await expect(
      page.locator("#mat-tab-label-0-5"),
    ).toHaveText(caseDetails.textOnPage6);
    await expect(
      page.locator(this.caseDocumentsTab),
    ).toHaveText(caseDetails.textOnPage7);
    await expect(
      page.locator("#mat-tab-label-0-7"),
    ).toHaveText(caseDetails.textOnPage8);
    await expect(
      page.locator("#mat-tab-label-0-8"),
    ).toHaveText(caseDetails.textOnPage9);
    await expect(
      page.locator("#mat-tab-label-0-9"),
    ).toHaveText(caseDetails.textOnPage10);
    await expect(
      page.locator("#mat-tab-label-0-10"),
    ).toHaveText(caseDetails.textOnPage11);
    await expect(
      page.locator("#mat-tab-label-0-11"),
    ).toHaveText(caseDetails.textOnPage12);
    await expect(
      page.locator("#mat-tab-label-0-12"),
    ).toHaveText(caseDetails.textOnPage13);
    await expect(
      page.locator("#mat-tab-label-0-13"),
    ).toHaveText(caseDetails.textOnPage14);
    if (accessibilityTest) {
      await axeTest.axeTest(page);
    }
  },

  async checkStateTab(page) {
    await page.locator(this.caseStateTab).click();
    await expect(
      page.locator("markdown[class=\'markdown\'] h4"),
    ).toHaveText(stateTab.caseState);
  },
};
