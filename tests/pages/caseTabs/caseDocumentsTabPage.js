const { expect } = require("@playwright/test");
const axeTest = require("../../helpers/accessibilityTestHelper.js");
const allTabs = require("../../fixtures/content/caseTabs/allTabTitles_content");
const caseDocumentsTab = require("../../fixtures/content/caseTabs/caseDocumentsTab_content.js")

module.exports = {
  caseDocumentsTab: "#mat-tab-label-0-6",
  textClass: ".text-16",
  firstDocCategory: "DSS Supporting uploaded documents",
  firstDocName: "mockFile.txt",
  secondDocCategory: "DSS Tribunal form uploaded documents",
  secondDocName: "mockFile.pdf",

  async checkPageLoads(page, accessibilityTest) {
    await expect(page.locator(".case-field").first()).toContainText(allTabs.pageTitle);
    await expect(
      page.locator("#mat-tab-label-0-0"),
    ).toHaveText(allTabs.tab1);
    await expect(
      page.locator("#mat-tab-label-0-1"),
    ).toHaveText(allTabs.tab2);
    await expect(
      page.locator("#mat-tab-label-0-2"),
    ).toHaveText(allTabs.tab3);
    await expect(
      page.locator("#mat-tab-label-0-3"),
    ).toHaveText(allTabs.tab4);
    await expect(
      page.locator("#mat-tab-label-0-4"),
    ).toHaveText(allTabs.tab5);
    await expect(
      page.locator("#mat-tab-label-0-5"),
    ).toHaveText(allTabs.tab6);
    await expect(
      page.locator(this.caseDocumentsTab),
    ).toHaveText(allTabs.tab7);
    await expect(
      page.locator("#mat-tab-label-0-7"),
    ).toHaveText(allTabs.tab8);
    await expect(
      page.locator("#mat-tab-label-0-8"),
    ).toHaveText(allTabs.tab9);
    await expect(
      page.locator("#mat-tab-label-0-9"),
    ).toHaveText(allTabs.tab10);
    await expect(
      page.locator("#mat-tab-label-0-10"),
    ).toHaveText(allTabs.tab11);
    await expect(
      page.locator("#mat-tab-label-0-11"),
    ).toHaveText(allTabs.tab12);
    await expect(
      page.locator("#mat-tab-label-0-12"),
    ).toHaveText(allTabs.tab13);
    await expect(
      page.locator("#mat-tab-label-0-13"),
    ).toHaveText(allTabs.tab14);
    await expect(
      page.locator("markdown[class='markdown'] h4"),
    ).toHaveText(caseDocumentsTab.pageTitle);
    await expect(
      page.locator(this.textClass).nth(1),
    ).toHaveText(caseDocumentsTab.subHeading1);
    await expect(
      page.locator(this.textClass).nth(3),
    ).toHaveText(caseDocumentsTab.title1);
    await expect(
      page.locator(this.textClass).nth(4),
    ).toHaveText(caseDocumentsTab.textOnPage1);
    await expect(
      page.locator(this.textClass).nth(7),
    ).toHaveText(caseDocumentsTab.textOnPage2);
    await expect(
      page.locator(this.textClass).nth(9),
    ).toHaveText(caseDocumentsTab.title2);
    await expect(
      page.locator(this.textClass).nth(10),
    ).toHaveText(caseDocumentsTab.textOnPage1);
    await expect(
      page.locator(this.textClass).nth(13),
    ).toHaveText(caseDocumentsTab.textOnPage2);

    if (accessibilityTest) {
      await axeTest.axeTest(page);
    }
  },

  async changeToCaseDocumentsTab(page){
    await page.locator(this.caseDocumentsTab).click();
  },

  async checkPageInfo(page) {
    await expect(
      page.locator(this.textClass).nth(6),
    ).toHaveText(this.firstDocCategory);
    await expect(
      page.locator(this.textClass).nth(8),
    ).toHaveText(this.firstDocName);
    await expect(
      page.locator(this.textClass).nth(12),
    ).toHaveText(this.secondDocCategory);
    await expect(
      page.locator(this.textClass).nth(14),
    ).toHaveText(this.secondDocName);
  }
};
