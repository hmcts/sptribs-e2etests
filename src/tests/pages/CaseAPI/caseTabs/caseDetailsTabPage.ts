import { expect, Page } from "@playwright/test";
import commonHelpers from "../../../helpers/commonHelpers.ts";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import allTabTitlesContent from "../../../fixtures/content/CaseAPI/caseTabs/allTabTitles_content.ts";
import caseDetailsTabContent from "../../../fixtures/content/CaseAPI/caseTabs/caseDetailsTab_content.ts";
import subjectDetailsContent from "../../../fixtures/content/DSSCreateCase/SubjectDetails_content.ts";
import subjectContactDetailsContent from "../../../fixtures/content/DSSCreateCase/SubjectContactDetails_content.ts";
import representativeDetailsContent from "../../../fixtures/content/DSSCreateCase/RepresentativeDetails_content.ts";

type CaseDetailsTabPage = {
  caseDetailsTab: string;
  checkPageLoads(
    page : Page,
    accessibilityTest: boolean,
    representationPresent: boolean,
    caseNumber: string,
  ): Promise<void>;
  changeToCaseDetailsTab(page: Page): Promise<void>;
  checkPageInfo(page: Page, representationPresent: boolean, representationQualified: boolean): Promise<void>;
}

const caseDetailsTabPage: CaseDetailsTabPage = {
  caseDetailsTab: ".mat-tab-label",

  async checkPageLoads(
    page : Page,
    accessibilityTest: boolean,
    representationPresent: boolean,
    caseNumber: string,
  ): Promise<void> {
    await expect(page.locator(".case-field").first()).toContainText(
      allTabTitlesContent.pageTitle + caseNumber,
    );
    await expect(page.locator(".mat-tab-label").nth(0)).toHaveText(
      allTabTitlesContent.tab1,
    );
    await expect(page.locator(".mat-tab-label").nth(1)).toHaveText(
      allTabTitlesContent.tab2,
    );
    await expect(page.locator(".mat-tab-label").nth(2)).toHaveText(
      allTabTitlesContent.tab3,
    );
    await expect(page.locator(this.caseDetailsTab).nth(3)).toHaveText(
      allTabTitlesContent.tab4,
    );
    await expect(page.locator(".mat-tab-label").nth(4)).toHaveText(
      allTabTitlesContent.tab5,
    );
    await expect(page.locator(".mat-tab-label").nth(5)).toHaveText(
      allTabTitlesContent.tab6,
    );
    await expect(page.locator(".mat-tab-label").nth(6)).toHaveText(
      allTabTitlesContent.tab7,
    );
    await expect(page.locator(".mat-tab-label").nth(7)).toHaveText(
      allTabTitlesContent.tab8,
    );
    await expect(page.locator(".mat-tab-label").nth(8)).toHaveText(
      allTabTitlesContent.tab9,
    );
    await expect(page.locator(".mat-tab-label").nth(9)).toHaveText(
      allTabTitlesContent.tab10,
    );
    await expect(page.locator(".mat-tab-label").nth(10)).toHaveText(
      allTabTitlesContent.tab11,
    );
    await expect(page.locator(".mat-tab-label").nth(11)).toHaveText(
      allTabTitlesContent.tab12,
    );
    await expect(page.locator(".mat-tab-label").nth(12)).toHaveText(
      allTabTitlesContent.tab13,
    );
    await expect(page.locator(".mat-tab-label").nth(13)).toHaveText(
      allTabTitlesContent.tab14,
    );
    await expect(page.locator("dl[id='case-details'] h3")).toHaveText(
      caseDetailsTabContent.pageTitle,
    );
    await expect(page.locator(".case-viewer-label").nth(0)).toHaveText(
      caseDetailsTabContent.textOnPage1,
    );
    await expect(page.locator("dl[id='objectSubjects'] h3")).toHaveText(
      caseDetailsTabContent.subHeading1,
    );
    await expect(page.locator(".case-viewer-label").nth(1)).toHaveText(
      caseDetailsTabContent.textOnPage2,
    );
    await expect(page.locator(".case-viewer-label").nth(2)).toHaveText(
      caseDetailsTabContent.textOnPage3,
    );
    await expect(page.locator(".case-viewer-label").nth(3)).toHaveText(
      caseDetailsTabContent.textOnPage4,
    );
    await expect(page.locator(".case-viewer-label").nth(4)).toHaveText(
      caseDetailsTabContent.textOnPage5,
    );
    await expect(page.locator(".case-viewer-label").nth(5)).toHaveText(
      caseDetailsTabContent.textOnPage6,
    );

    if (representationPresent) {
      await expect(page.locator("dl[id='applicantDetails'] h3")).toHaveText(
        caseDetailsTabContent.subHeading2,
      );
      await expect(page.locator(".case-viewer-label").nth(6)).toHaveText(
        caseDetailsTabContent.textOnPage6,
      );
      await expect(page.locator(".case-viewer-label").nth(7)).toHaveText(
        caseDetailsTabContent.textOnPage7,
      );
      await expect(page.locator(".case-viewer-label").nth(8)).toHaveText(
        caseDetailsTabContent.textOnPage8,
      );
      await expect(page.locator(".case-viewer-label").nth(9)).toHaveText(
        caseDetailsTabContent.textOnPage9,
      );
      await expect(page.locator(".case-viewer-label").nth(10)).toHaveText(
        caseDetailsTabContent.textOnPage10,
      );
      await expect(page.locator(".case-viewer-label").nth(11)).toHaveText(
        caseDetailsTabContent.textOnPage11,
      );
      await expect(page.locator(".case-viewer-label").nth(12)).toHaveText(
        caseDetailsTabContent.textOnPage12,
      );
    }
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async changeToCaseDetailsTab(page: Page): Promise<void> {
    await page.locator(this.caseDetailsTab).nth(3).click();
  },

  async checkPageInfo(page: Page, representationPresent: boolean, representationQualified: boolean): Promise<void> {
    await expect(
      page.locator("td[id='case-viewer-field-read--cicCaseFullName']"),
    ).toHaveText(subjectDetailsContent.name);
    await expect(
      page.locator("td[id='case-viewer-field-read--cicCaseDateOfBirth']"),
    ).toHaveText( await commonHelpers.convertDate(true));
    await expect(
      page.locator("ccd-read-email-field[class='ng-star-inserted']").nth(0),
    ).toHaveText(subjectContactDetailsContent.emailAddress);
    await expect(
      page.locator("td[id='case-viewer-field-read--cicCasePhoneNumber']"),
    ).toHaveText(subjectContactDetailsContent.contactNumber);
    await expect(
      page
        .locator("ccd-read-multi-select-list-field[class='ng-star-inserted']")
        .nth(0),
    ).toHaveText("Subject");

    if (representationPresent) {
      await expect(
        page
          .locator("ccd-read-multi-select-list-field[class='ng-star-inserted']")
          .nth(1),
      ).toHaveText("Representative");
      await expect(
        page.locator(
          "td[id='case-viewer-field-read--cicCaseRepresentativeFullName']",
        ),
      ).toHaveText(representativeDetailsContent.fullName);
      await expect(
        page.locator(
          "td[id='case-viewer-field-read--cicCaseRepresentativeOrgName']",
        ),
      ).toHaveText(representativeDetailsContent.Organisation);
      await expect(
        page.locator(
          "td[id='case-viewer-field-read--cicCaseRepresentativePhoneNumber']",
        ),
      ).toHaveText(representativeDetailsContent.contactNumber);
      await expect(
        page.locator("ccd-read-email-field[class='ng-star-inserted']").nth(1),
      ).toHaveText(representativeDetailsContent.emailAddress);
      await expect(
        page.locator(
          "ccd-read-fixed-radio-list-field[class='ng-star-inserted']",
        ),
      ).toHaveText("Email");

      if (representationQualified) {
        await expect(page.locator("ccd-read-yes-no-field")).toHaveText("Yes");
      } else {
        await expect(page.locator("ccd-read-yes-no-field")).toHaveText("No");
      }
    }
  },
};

export default caseDetailsTabPage;
