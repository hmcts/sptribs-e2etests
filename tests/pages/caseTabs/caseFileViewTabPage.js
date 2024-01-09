const { expect } = require("@playwright/test");
const path = require("path");
const config = require("../../config");
const axeTest = require("../../helpers/accessibilityTestHelper.js");
const allTabs = require("../../fixtures/content/caseTabs/allTabTitles_content");
const caseFileViewTab = require("../../fixtures/content/caseTabs/caseFileViewTab_content");
const uploadedDocuments = require("../../fixtures/content/uploadedDocuments_content.js");

module.exports = {
  caseFileViewTab: ".mat-tab-label",

  async checkPageLoads(page, accessibilityTest, caseNumber) {
    await expect(page.locator(".case-field").first()).toContainText(allTabs.pageTitle + caseNumber);
    await expect(
      page.locator(".mat-tab-label").nth(0),
    ).toHaveText(allTabs.tab1);
    await expect(
      page.locator(".mat-tab-label").nth(1),
    ).toHaveText(allTabs.tab2);
    await expect(
      page.locator(".mat-tab-label").nth(2),
    ).toHaveText(allTabs.tab3);
    await expect(
      page.locator(".mat-tab-label").nth(3),
    ).toHaveText(allTabs.tab4);
    await expect(
      page.locator(".mat-tab-label").nth(4),
    ).toHaveText(allTabs.tab5);
    await expect(
      page.locator(".mat-tab-label").nth(5),
    ).toHaveText(allTabs.tab6);
    await expect(
      page.locator(".mat-tab-label").nth(6),
    ).toHaveText(allTabs.tab7);
    await expect(
      page.locator(".mat-tab-label").nth(7),
    ).toHaveText(allTabs.tab8);
    await expect(
      page.locator(".mat-tab-label").nth(8),
    ).toHaveText(allTabs.tab9);
    await expect(
      page.locator(".mat-tab-label").nth(9),
    ).toHaveText(allTabs.tab10);
    await expect(
      page.locator(".mat-tab-label").nth(10),
    ).toHaveText(allTabs.tab11);
    await expect(
      page.locator(".mat-tab-label").nth(11),
    ).toHaveText(allTabs.tab12);
    await expect(
      page.locator(".mat-tab-label").nth(12),
    ).toHaveText(allTabs.tab13);
    await expect(
      page.locator(".mat-tab-label").nth(13),
    ).toHaveText(allTabs.tab14);
    await expect(
      page.locator(".govuk-heading-l"),
    ).toHaveText(caseFileViewTab.pageTitle);
    await expect(
      page.locator(".node__name").nth(0),
    ).toHaveText(caseFileViewTab.textOnPage1);
    await expect(
      page.locator(".node__name").nth(1),
    ).toHaveText(caseFileViewTab.textOnPage2);
    await expect(
      page.locator(".node__name").nth(2),
    ).toHaveText(caseFileViewTab.textOnPage3);
    await expect(
      page.locator(".node__name").nth(3),
    ).toHaveText(caseFileViewTab.textOnPage4);
    await expect(
      page.locator(".node__name").nth(4),
    ).toHaveText(caseFileViewTab.textOnPage5);
    await expect(
      page.locator(".node__name").nth(7),
    ).toHaveText(caseFileViewTab.textOnPage6);
    await expect(
      page.locator(".node__name").nth(8),
    ).toHaveText(caseFileViewTab.textOnPage7);
    await expect(
      page.locator(".node__name").nth(9),
    ).toHaveText(caseFileViewTab.textOnPage8);
    await expect(
      page.locator(".node__name").nth(10),
    ).toHaveText(caseFileViewTab.textOnPage9);
    await expect(
      page.locator(".node__name").nth(11),
    ).toHaveText(caseFileViewTab.textOnPage10);

    if (accessibilityTest) {
      await axeTest.axeTest(page);
    }
  },

  async changeToCaseFileViewTab(page){
    await page.locator(this.caseFileViewTab).nth(9).click();
    await page.locator(this.caseFileViewTab).nth(9).click();
  },

  async checkPageInfo(page) {
    await expect(
      page.locator(".node__count").nth(4)
    ).toHaveText(uploadedDocuments.totalDocuments);
    await expect(
      page.locator(".node__name").nth(5),
    ).toHaveText(path.basename(config.testFile));
    await expect(
      page.locator(".node__name").nth(6),
    ).toHaveText(path.basename(config.testPdfFile));
  }
};

