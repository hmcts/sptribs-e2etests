const { expect } = require("@playwright/test");
const commonHelpers = require("../../helpers/commonHelpers.js");
const axeTest = require("../../helpers/accessibilityTestHelper.js");
const allTabs = require("../../fixtures/content/caseTabs/allTabTitles_content");
const casePartiesTab = require("../../fixtures/content/caseTabs/casePartiesTab_content");
const subjectDetails = require("../../fixtures/content/SubjectDetails_content");
const subjectContactDetails = require("../../fixtures/content/SubjectContactDetails_content");
const representativeDetails = require("../../fixtures/content/RepresentativeDetails_content");
const respondentDetails = require("../../fixtures/content/RespondentDetails_content.js");

module.exports = {
  casePartiesTab: ".mat-tab-label",

  async checkPageLoads(
    page,
    accessibilityTest,
    representationPresent,
    caseNumber,
  ) {
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
    await expect(page.locator(this.casePartiesTab).nth(4)).toHaveText(
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
    await expect(page.locator(".case-field").nth(1)).toHaveText(
      casePartiesTab.subHeading1,
    );
    await expect(page.locator(".case-viewer-label").nth(0)).toHaveText(
      casePartiesTab.textOnPage1,
    );
    await expect(page.locator(".case-viewer-label").nth(1)).toHaveText(
      casePartiesTab.textOnPage2,
    );
    await expect(page.locator(".case-viewer-label").nth(2)).toHaveText(
      casePartiesTab.textOnPage3,
    );
    await expect(page.locator(".case-viewer-label").nth(3)).toHaveText(
      casePartiesTab.textOnPage4,
    );
    await expect(page.locator(".case-viewer-label").nth(4)).toHaveText(
      casePartiesTab.textOnPage5,
    );
    await expect(page.locator(".case-field").nth(4)).toHaveText(
      casePartiesTab.subHeading3,
    );

    if (representationPresent) {
      await expect(page.locator(".case-field").nth(3)).toHaveText(
        casePartiesTab.subHeading2,
      );
      await expect(page.locator(".case-viewer-label").nth(5)).toHaveText(
        casePartiesTab.textOnPage6,
      );
      await expect(page.locator(".case-viewer-label").nth(6)).toHaveText(
        casePartiesTab.textOnPage7,
      );
      await expect(page.locator(".case-viewer-label").nth(7)).toHaveText(
        casePartiesTab.textOnPage8,
      );
      await expect(page.locator(".case-viewer-label").nth(8)).toHaveText(
        casePartiesTab.textOnPage9,
      );
      await expect(page.locator(".case-viewer-label").nth(9)).toHaveText(
        casePartiesTab.textOnPage10,
      );
      await expect(page.locator(".case-viewer-label").nth(10)).toHaveText(
        casePartiesTab.textOnPage11,
      );
      await expect(page.locator(".case-viewer-label").nth(11)).toHaveText(
        casePartiesTab.textOnPage12,
      );
      await expect(page.locator(".case-viewer-label").nth(12)).toHaveText(
        casePartiesTab.textOnPage13,
      );
      await expect(page.locator(".case-viewer-label").nth(13)).toHaveText(
        casePartiesTab.textOnPage14,
      );
    } else {
      await expect(page.locator(".case-viewer-label").nth(5)).toHaveText(
        casePartiesTab.textOnPage12,
      );
      await expect(page.locator(".case-viewer-label").nth(6)).toHaveText(
        casePartiesTab.textOnPage13,
      );
      await expect(page.locator(".case-viewer-label").nth(7)).toHaveText(
        casePartiesTab.textOnPage14,
      );
    }
    if (accessibilityTest) {
      await axeTest.axeTest(page);
    }
  },

  async changeToCasePartiesTab(page) {
    await page.locator(this.casePartiesTab).nth(4).click();
  },

  async checkPageInfo(page, representationPresent, representationQualified) {
    await expect(
      page.locator("td[id='case-viewer-field-read--cicCaseFullName']"),
    ).toHaveText(subjectDetails.name);
    await expect(
      page.locator("ccd-read-email-field[class='ng-star-inserted']").nth(0),
    ).toHaveText(subjectContactDetails.emailAddress);
    await expect(
      page.locator("td[id='case-viewer-field-read--cicCasePhoneNumber']"),
    ).toHaveText(subjectContactDetails.contactNumber);
    await expect(
      page.locator("td[id='case-viewer-field-read--cicCaseDateOfBirth']"),
    ).toHaveText(commonHelpers.convertDate(true));
    await expect(
      page
        .locator("ccd-read-fixed-radio-list-field[class='ng-star-inserted']")
        .first(),
    ).toHaveText(allTabs.contactPreference);
    await expect(
      page.locator("td[id='case-viewer-field-read--cicCaseRespondentName']"),
    ).toHaveText(respondentDetails.fullName);
    await expect(
      page.locator(
        "td[id='case-viewer-field-read--cicCaseRespondentOrganisation']",
      ),
    ).toHaveText(respondentDetails.Organisation);
    await expect(
      page.locator("td[id='case-viewer-field-read--cicCaseRespondentEmail']"),
    ).toHaveText(respondentDetails.emailAddress);

    if (representationPresent) {
      await expect(
        page.locator(
          "td[id='case-viewer-field-read--cicCaseRepresentativeFullName']",
        ),
      ).toHaveText(representativeDetails.fullName);
      await expect(
        page.locator(
          "td[id='case-viewer-field-read--cicCaseRepresentativeOrgName']",
        ),
      ).toHaveText(representativeDetails.Organisation);
      await expect(
        page.locator(
          "td[id='case-viewer-field-read--cicCaseRepresentativePhoneNumber']",
        ),
      ).toHaveText(representativeDetails.contactNumber);
      await expect(
        page.locator(
          "td[id='case-viewer-field-read--cicCaseRepresentativeEmailAddress']",
        ),
      ).toHaveText(representativeDetails.emailAddress);
      await expect(
        page.locator(
          "td[id='case-viewer-field-read--cicCaseRepresentativeContactDetailsPreference']",
        ),
      ).toHaveText(allTabs.contactPreference);

      if (representationQualified) {
        await expect(page.locator("ccd-read-yes-no-field")).toHaveText("Yes");
      } else {
        await expect(page.locator("ccd-read-yes-no-field")).toHaveText("No");
      }
    }
  },
};
