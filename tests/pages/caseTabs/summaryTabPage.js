const { expect } = require("@playwright/test");
const commonHelpers = require("../../helpers/commonHelpers.js");
const axeTest = require("../../helpers/accessibilityTestHelper.js");
const allTabs = require("../../fixtures/content/caseTabs/allTabTitles_content");
const summaryTab = require("../../fixtures/content/caseTabs/summaryTab_content");
const subjectDetails = require("../../fixtures/content/SubjectDetails_content");
const subjectContactDetails = require("../../fixtures/content/SubjectContactDetails_content");
const representativeDetails = require("../../fixtures/content/RepresentativeDetails_content");

module.exports = {
  summaryTab: ".mat-tab-label",

  async checkPageLoads(
    page,
    accessibilityTest,
    representationPresent,
    caseNumber,
  ) {
    await expect(page.locator(".case-field").first()).toContainText(
      allTabs.pageTitle + caseNumber,
    );
    await expect(page.locator(this.summaryTab).nth(0)).toHaveText(allTabs.tab1);
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
    await expect(page.locator(".mat-tab-label").nth(6)).toHaveText(
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
      summaryTab.caseState,
    );
    await expect(page.locator("dl[id='case-details'] h3")).toHaveText(
      summaryTab.subHeading1,
    );
    await expect(page.locator(".case-viewer-label").nth(0)).toHaveText(
      summaryTab.textOnPage1,
    );
    await expect(page.locator(".case-viewer-label").nth(1)).toHaveText(
      summaryTab.textOnPage2,
    );
    await expect(page.locator(".case-viewer-label").nth(2)).toHaveText(
      summaryTab.textOnPage3,
    );
    await expect(page.locator(".case-viewer-label").nth(3)).toHaveText(
      summaryTab.textOnPage4,
    );

    if (representationPresent) {
      await expect(
        page.locator("dl[id='representativeDetails'] h3"),
      ).toHaveText(summaryTab.subHeading2);
      await expect(page.locator(".case-viewer-label").nth(4)).toHaveText(
        summaryTab.textOnPage5,
      );
      await expect(page.locator(".case-viewer-label").nth(5)).toHaveText(
        summaryTab.textOnPage6,
      );
      await expect(page.locator(".case-viewer-label").nth(6)).toHaveText(
        summaryTab.textOnPage7,
      );
      await expect(page.locator(".case-viewer-label").nth(7)).toHaveText(
        summaryTab.textOnPage8,
      );
      await expect(page.locator(".case-viewer-label").nth(8)).toHaveText(
        summaryTab.textOnPage9,
      );
    }

    if (accessibilityTest) {
      await axeTest.axeTest(page);
    }
  },

  async changeToSummaryTab(page) {
    await page.locator(this.summaryTab).nth(1).click();
  },

  async checkPageInfo(
    page,
    caseNumber,
    representationPresent,
    representationQualified,
  ) {
    await expect(
      page.locator("td[id='case-viewer-field-read--cicCaseFullName']"),
    ).toHaveText(subjectDetails.name);
    await expect(
      page.locator("ccd-read-date-field[class='ng-star-inserted']"),
    ).toHaveText(commonHelpers.convertDate(true));
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
        await expect(page.locator("ccd-read-yes-no-field").nth(0)).toHaveText(
          "Yes",
        );
      } else {
        await expect(page.locator("ccd-read-yes-no-field").nth(0)).toHaveText(
          "No",
        );
      }
    }
  },
};
