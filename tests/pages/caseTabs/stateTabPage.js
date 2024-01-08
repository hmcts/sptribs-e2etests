const { expect } = require("@playwright/test");
const axeTest = require("../../helpers/accessibilityTestHelper.js");
const stateTab = require("../../fixtures/content/caseTabs/stateTab_content.js")
const allTabs = require("../../fixtures/content/caseTabs/allTabTitles_content");

module.exports = {
  caseStateTab: ".mat-tab-label",

  async checkPageLoads(page, accessibilityTest) {
    await expect(page.locator(".case-field").first()).toContainText(allTabs.pageTitle);
    await expect(
      page.locator(".mat-tab-label").nth(0),
    ).toHaveText(allTabs.tab1);
    await expect(
      page.locator(".mat-tab-label").nth(1),
    ).toHaveText(allTabs.tab2);
    await expect(
      page.locator(this.caseStateTab).nth(2),
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
    if (accessibilityTest) {
      await axeTest.axeTest(page);
    }
  },

  async changeToStateTab(page){
    await page.locator(this.caseStateTab).nth(2).click();
  },

  async checkStateTab(page) {
    await expect(
      page.locator("markdown[class=\'markdown\'] h4"),
    ).toHaveText(stateTab.caseState);
  },
};
