const { expect } = require("@playwright/test");
const axeTest = require("../../helpers/accessibilityTestHelper.js");
const allTabs = require("../../fixtures/content/caseTabs/allTabTitles_content");
const summaryTab = require("../../fixtures/content/caseTabs/summaryTab_content");
const subjectDetails = require("../../fixtures/content/SubjectDetails_content");
const subjectContactDetails = require("../../fixtures/content/SubjectContactDetails_content");
const representativeDetails = require("../../fixtures/content/RepresentativeDetails_content");


module.exports = {
  summaryTab: "#mat-tab-label-0-1",

  async checkPageLoads(page, accessibilityTest, representationPresent) {
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
      page.locator("markdown[class='markdown'] h4"),
    ).toHaveText(summaryTab.caseState);
    await expect(
      page.locator("dl[id='case-details'] h3"),
    ).toHaveText(summaryTab.subHeading1);
    await expect(
      page.locator(".case-viewer-label").nth(0),
    ).toHaveText(summaryTab.textOnPage1);
    await expect(
      page.locator(".case-viewer-label").nth(1),
    ).toHaveText(summaryTab.textOnPage2);
    await expect(
      page.locator(".case-viewer-label").nth(2),
    ).toHaveText(summaryTab.textOnPage3);
    await expect(
      page.locator(".case-viewer-label").nth(3),
    ).toHaveText(summaryTab.textOnPage4);

    if (representationPresent) {
      await expect(
        page.locator("dl[id='representativeDetails'] h3"),
      ).toHaveText(summaryTab.subHeading2);
      await expect(
        page.locator(".case-viewer-label").nth(4),
      ).toHaveText(summaryTab.textOnPage5);
      await expect(
        page.locator(".case-viewer-label").nth(5),
      ).toHaveText(summaryTab.textOnPage6);
      await expect(
        page.locator(".case-viewer-label").nth(6),
      ).toHaveText(summaryTab.textOnPage7);
      await expect(
        page.locator(".case-viewer-label").nth(7),
      ).toHaveText(summaryTab.textOnPage8);
      await expect(
        page.locator(".case-viewer-label").nth(8),
      ).toHaveText(summaryTab.textOnPage9);
    }

    if (accessibilityTest) {
      await axeTest.axeTest(page);
    }
  },

  async changeToSummaryTab(page){
    await page.locator(this.summaryTab).click();
  },

  async checkPageInfo(page, caseNumber, representationPresent, representationQualified){
    await expect(
      page.locator("td[id='case-viewer-field-read--cicCaseFullName']"),
    ).toHaveText(subjectDetails.name);
    await expect(
      page.locator("ccd-read-date-field[class='ng-star-inserted']"),
    ).toHaveText(subjectDetails.dateOfBirth);
    await expect(
      page.locator("ccd-read-email-field[class='ng-star-inserted']").nth(0),
    ).toHaveText(subjectContactDetails.emailAddress);
    await expect(
      page.locator("ccd-read-text-field[class='ng-star-inserted']").nth(1),
    ).toHaveText(caseNumber);

    if (representationPresent) {
      await expect(
        page.locator("ccd-read-text-field[class='ng-star-inserted']").nth(2),
      ).toHaveText(representativeDetails.Organisation);
      await expect(
        page.locator("ccd-read-text-field[class='ng-star-inserted']").nth(3),
      ).toHaveText(representativeDetails.fullName);
      await expect(
        page.locator("ccd-read-text-field[class='ng-star-inserted']").nth(4),
      ).toHaveText(representativeDetails.contactNumber);
      await expect(
        page.locator("ccd-read-email-field[class='ng-star-inserted']").nth(1),
      ).toHaveText(representativeDetails.emailAddress);

      if (representationQualified) {
        await expect(
          page.getByRole('cell', { name: 'Yes' }).locator('ccd-read-yes-no-field'),
        ).toHaveText("Yes");
      } else {
        await expect(
          page.getByRole('cell', { name: 'No' }).locator('ccd-read-yes-no-field'),
        ).toHaveText("No");
      }
    }
  }

};

