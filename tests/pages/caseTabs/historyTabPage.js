const { expect } = require("@playwright/test");
const axeTest = require("../../helpers/accessibilityTestHelper.js");
const allTabs = require("../../fixtures/content/caseTabs/allTabTitles_content.js")
const historyTab = require("../../fixtures/content/caseTabs/historyTab_content");

module.exports = {
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
      page.locator("#mat-tab-label-0-6"),
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
      page.locator(".heading-h2").nth(0),
    ).toHaveText(historyTab.heading1);
    await expect(
      page.locator(".heading-h2").nth(1),
    ).toHaveText(historyTab.heading2);

    if (accessibilityTest) {
      await axeTest.axeTest(page);
    }
  },

  async checkPageInfo(page){

  }

};
