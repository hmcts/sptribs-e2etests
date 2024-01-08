const { expect } = require("@playwright/test");
const axeTest = require("../../helpers/accessibilityTestHelper.js");
const allTabs = require("../../fixtures/content/caseTabs/allTabTitles_content.js")
const historyTab = require("../../fixtures/content/caseTabs/historyTab_content");

module.exports = {
  author: "Automated CITIZEN",
  event: "Submit case (cic)",
  state: "DSS-Submitted",

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
      page.locator(".heading-h2").nth(0),
    ).toHaveText(historyTab.heading1);
    await expect(
      page.locator(".heading-h2").nth(1),
    ).toHaveText(historyTab.heading2);
    await expect(
      page.locator(".text-16").nth(1),
    ).toHaveText(historyTab.textOnPage4);
    await expect(
      page.locator(".text-16").nth(2),
    ).toHaveText(historyTab.textOnPage1);
    await expect(
      page.locator(".text-16").nth(3),
    ).toHaveText(historyTab.textOnPage2);
    await expect(
      page.locator(".text-16").nth(7),
    ).toHaveText(historyTab.textOnPage1);
    await expect(
      page.locator(".text-16").nth(9),
    ).toHaveText(historyTab.textOnPage2);
    await expect(
      page.locator(".text-16").nth(11),
    ).toHaveText(historyTab.textOnPage3);
    await expect(
      page.locator(".text-16").nth(13),
    ).toHaveText(historyTab.textOnPage4);
    await expect(
      page.locator(".text-16").nth(15),
    ).toHaveText(historyTab.textOnPage5);
    await expect(
      page.locator(".text-16").nth(17),
    ).toHaveText(historyTab.textOnPage6);

    if (accessibilityTest) {
      await axeTest.axeTest(page);
    }
  },

  async checkPageInfo(page, time){
    await expect(page.locator(".text-16").nth(4),
      ).toHaveText(this.event);
    await expect(page.locator(".text-16").nth(5),
    ).toContainText(time);
    await expect(page.locator(".text-16").nth(6),
    ).toHaveText(this.author);
    await expect(page.locator(".text-16").nth(8),
    ).toContainText(time);
    await expect(page.locator(".text-16").nth(10),
    ).toHaveText(this.author);
    await expect(page.locator(".text-16").nth(12),
    ).toHaveText(this.state);
    await expect(page.locator(".text-16").nth(14),
    ).toHaveText(this.event);
  }
};
