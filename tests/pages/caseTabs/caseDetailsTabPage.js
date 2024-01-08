const { expect } = require("@playwright/test");
const axeTest = require("../../helpers/accessibilityTestHelper.js");
const allTabs = require("../../fixtures/content/caseTabs/allTabTitles_content");
const caseDetailsTab = require("../../fixtures/content/caseTabs/caseDetailsTab_content");
const subjectDetails = require("../../fixtures/content/SubjectDetails_content");
const subjectContactDetails = require("../../fixtures/content/SubjectContactDetails_content");
const representativeDetails = require("../../fixtures/content/RepresentativeDetails_content");
const commonHelpers = require("../../helpers/commonHelpers.js")

module.exports = {
  caseDetailsTab: ".mat-tab-label",

  async checkPageLoads(page, accessibilityTest, representationPresent, caseNumber) {
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
      page.locator(this.caseDetailsTab).nth(3),
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
      page.locator("dl[id='case-details'] h3"),
    ).toHaveText(caseDetailsTab.pageTitle);
    await expect(
      page.locator(".case-viewer-label").nth(0),
    ).toHaveText(caseDetailsTab.textOnPage1);
    await expect(
      page.locator("dl[id='objectSubjects'] h3"),
    ).toHaveText(caseDetailsTab.subHeading1);
    await expect(
      page.locator(".case-viewer-label").nth(1),
    ).toHaveText(caseDetailsTab.textOnPage2);
    await expect(
      page.locator(".case-viewer-label").nth(2),
    ).toHaveText(caseDetailsTab.textOnPage3);
    await expect(
      page.locator(".case-viewer-label").nth(3),
    ).toHaveText(caseDetailsTab.textOnPage4);
    await expect(
      page.locator(".case-viewer-label").nth(4),
    ).toHaveText(caseDetailsTab.textOnPage5);
    await expect(
      page.locator(".case-viewer-label").nth(5),
    ).toHaveText(caseDetailsTab.textOnPage6);

    if (representationPresent) {
      await expect(
        page.locator("dl[id='applicantDetails'] h3"),
      ).toHaveText(caseDetailsTab.subHeading2);
      await expect(
        page.locator(".case-viewer-label").nth(6),
      ).toHaveText(caseDetailsTab.textOnPage6);
      await expect(
        page.locator(".case-viewer-label").nth(7),
      ).toHaveText(caseDetailsTab.textOnPage7);
      await expect(
        page.locator(".case-viewer-label").nth(8),
      ).toHaveText(caseDetailsTab.textOnPage8);
      await expect(
        page.locator(".case-viewer-label").nth(9),
      ).toHaveText(caseDetailsTab.textOnPage9);
      await expect(
        page.locator(".case-viewer-label").nth(10),
      ).toHaveText(caseDetailsTab.textOnPage10);
      await expect(
        page.locator(".case-viewer-label").nth(11),
      ).toHaveText(caseDetailsTab.textOnPage11);
      await expect(
        page.locator(".case-viewer-label").nth(12),
      ).toHaveText(caseDetailsTab.textOnPage12);
    }
    if (accessibilityTest) {
      await axeTest.axeTest(page);
    }
  },

  async changeToCaseDetailsTab(page){
    await page.locator(this.caseDetailsTab).nth(3).click();
  },

  async checkPageInfo(page, representationPresent, representationQualified){
    await expect(
      page.locator("td[id='case-viewer-field-read--cicCaseFullName']"),
    ).toHaveText(subjectDetails.name);
    await expect(
      page.locator("td[id='case-viewer-field-read--cicCaseDateOfBirth']"),
    ).toHaveText(commonHelpers.convertDate(true));
    await expect(
      page.locator("ccd-read-email-field[class='ng-star-inserted']").nth(0),
    ).toHaveText(subjectContactDetails.emailAddress);
    await expect(
      page.locator("td[id='case-viewer-field-read--cicCasePhoneNumber']"),
    ).toHaveText(subjectContactDetails.contactNumber);
    await expect(
      page.locator("ccd-read-multi-select-list-field[class='ng-star-inserted']").nth(0),
    ).toHaveText("Subject");

    if (representationPresent) {
      await expect(
        page.locator("ccd-read-multi-select-list-field[class='ng-star-inserted']").nth(1),
      ).toHaveText("Representative");
      await expect(
        page.locator("td[id='case-viewer-field-read--cicCaseRepresentativeFullName']"),
      ).toHaveText(representativeDetails.fullName);
      await expect(
        page.locator("td[id='case-viewer-field-read--cicCaseRepresentativeOrgName']"),
      ).toHaveText(representativeDetails.Organisation);
      await expect(
        page.locator("td[id='case-viewer-field-read--cicCaseRepresentativePhoneNumber']"),
      ).toHaveText(representativeDetails.contactNumber);
      await expect(
        page.locator("ccd-read-email-field[class='ng-star-inserted']").nth(1),
      ).toHaveText(representativeDetails.emailAddress);
      await expect(
        page.locator("ccd-read-fixed-radio-list-field[class='ng-star-inserted']"),
      ).toHaveText("Email");

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
