const { expect } = require("@playwright/test");
const path = require("path");
const config = require("../../config.js");
const axeTest = require("../../helpers/accessibilityTestHelper.js");
const allTabs = require("../../fixtures/content/caseTabs/allTabTitles_content");
const caseDocumentsTab = require("../../fixtures/content/caseTabs/caseDocumentsTab_content.js");

module.exports = {
  caseDocumentsTab: ".mat-tab-label",
  textClass: ".text-16",

  async checkPageLoads(page, accessibilityTest, caseNumber) {
    await expect(page.locator(".case-field").first()).toContainText(
      allTabs.pageTitle + caseNumber,
    );
    await expect(page.locator(".mat-tab-label").nth(0)).toHaveText(
      allTabs.tab1,
    );
    await expect(page.locator(".mat-tab-label").nth(1)).toHaveText(
      allTabs.tab2,
    );
    await expect(page.locator(".mat-tab-label").nth(2)).toHaveText(
      allTabs.tab3,
    );
    await expect(page.locator(".mat-tab-label").nth(3)).toHaveText(
      allTabs.tab4,
    );
    await expect(page.locator(".mat-tab-label").nth(4)).toHaveText(
      allTabs.tab5,
    );
    await expect(page.locator(".mat-tab-label").nth(5)).toHaveText(
      allTabs.tab6,
    );
    await expect(page.locator(this.caseDocumentsTab).nth(6)).toHaveText(
      allTabs.tab7,
    );
    await expect(page.locator(".mat-tab-label").nth(7)).toHaveText(
      allTabs.tab8,
    );
    await expect(page.locator(".mat-tab-label").nth(8)).toHaveText(
      allTabs.tab9,
    );
    await expect(page.locator(".mat-tab-label").nth(9)).toHaveText(
      allTabs.tab10,
    );
    await expect(page.locator(".mat-tab-label").nth(10)).toHaveText(
      allTabs.tab11,
    );
    await expect(page.locator(".mat-tab-label").nth(11)).toHaveText(
      allTabs.tab12,
    );
    await expect(page.locator(".mat-tab-label").nth(12)).toHaveText(
      allTabs.tab13,
    );
    await expect(page.locator(".mat-tab-label").nth(13)).toHaveText(
      allTabs.tab14,
    );
    await expect(page.locator("markdown[class='markdown'] h4")).toHaveText(
      caseDocumentsTab.pageTitle,
    );
    await expect(page.locator(this.textClass).nth(1)).toHaveText(
      caseDocumentsTab.subHeading1,
    );
    await expect(page.locator(this.textClass).nth(3)).toHaveText(
      caseDocumentsTab.title1,
    );
    await expect(page.locator(this.textClass).nth(4)).toHaveText(
      caseDocumentsTab.textOnPage1,
    );
    await expect(page.locator(this.textClass).nth(7)).toHaveText(
      caseDocumentsTab.textOnPage2,
    );
    await expect(page.locator(this.textClass).nth(9)).toHaveText(
      caseDocumentsTab.title2,
    );
    await expect(page.locator(this.textClass).nth(10)).toHaveText(
      caseDocumentsTab.textOnPage1,
    );
    await expect(page.locator(this.textClass).nth(13)).toHaveText(
      caseDocumentsTab.textOnPage2,
    );

    if (accessibilityTest) {
      await axeTest.axeTest(page);
    }
  },

  async changeToCaseDocumentsTab(page) {
    await page.locator(this.caseDocumentsTab).nth(6).click();
  },

  async checkPageInfo(page) {
    await expect(page.locator(this.textClass).nth(6)).toHaveText(
      caseDocumentsTab.firstDocCategory,
    );
    await expect(page.locator(this.textClass).nth(8)).toHaveText(
      path.basename(config.testFile),
    );
    await expect(page.locator(this.textClass).nth(12)).toHaveText(
      caseDocumentsTab.secondDocCategory,
    );
    await expect(page.locator(this.textClass).nth(14)).toHaveText(
      path.basename(config.testPdfFile),
    );
  },
};
