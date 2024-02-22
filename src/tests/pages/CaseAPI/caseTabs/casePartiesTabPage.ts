import { expect, Page } from "@playwright/test";
import commonHelpers from "../../../helpers/commonHelpers.ts";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import allTabTitlesContent from "../../../fixtures/content/CaseAPI/caseTabs/allTabTitles_content.ts";
import casePartiesTabContent from "../../../fixtures/content/CaseAPI/caseTabs/casePartiesTab_content.ts";
import subjectDetailsContent from "../../../fixtures/content/DSSCreateCase/SubjectDetails_content.ts";
import subjectContactDetailsContent from "../../../fixtures/content/DSSCreateCase/SubjectContactDetails_content.ts";
import representativeDetailsContent from "../../../fixtures/content/DSSCreateCase/RepresentativeDetails_content.ts";
import respondentDetailsContent from "../../../fixtures/content/RespondentDetails_content.ts";

type CasePartiesTabPage = {
  casePartiesTab: string;
  checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    representationPresent: boolean,
    caseNumber: string,
  ): Promise<void>;
  changeToCasePartiesTab(page: Page): Promise<void>;
  checkPageInfo(
    page: Page,
    representationPresent: boolean,
    representationQualified: boolean,
  ): Promise<void>;
};

const casePartiesTabPage: CasePartiesTabPage = {
  casePartiesTab: ".mat-tab-label",

  async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    representationPresent: boolean,
    caseNumber: string,
  ): Promise<void> {
    await commonHelpers.checkAllCaseTabs(page, caseNumber);
    await expect(page.locator(".case-field").nth(1)).toHaveText(
      casePartiesTabContent.subHeading1,
    );
    await expect(page.locator(".case-viewer-label").nth(0)).toHaveText(
      casePartiesTabContent.textOnPage1,
    );
    await expect(page.locator(".case-viewer-label").nth(1)).toHaveText(
      casePartiesTabContent.textOnPage2,
    );
    await expect(page.locator(".case-viewer-label").nth(2)).toHaveText(
      casePartiesTabContent.textOnPage3,
    );
    await expect(page.locator(".case-viewer-label").nth(3)).toHaveText(
      casePartiesTabContent.textOnPage4,
    );
    await expect(page.locator(".case-viewer-label").nth(4)).toHaveText(
      casePartiesTabContent.textOnPage5,
    );
    await expect(page.locator(".case-field").nth(4)).toHaveText(
      casePartiesTabContent.subHeading3,
    );

    if (representationPresent) {
      await expect(page.locator(".case-field").nth(3)).toHaveText(
        casePartiesTabContent.subHeading2,
      );
      await expect(page.locator(".case-viewer-label").nth(5)).toHaveText(
        casePartiesTabContent.textOnPage6,
      );
      await expect(page.locator(".case-viewer-label").nth(6)).toHaveText(
        casePartiesTabContent.textOnPage7,
      );
      await expect(page.locator(".case-viewer-label").nth(7)).toHaveText(
        casePartiesTabContent.textOnPage8,
      );
      await expect(page.locator(".case-viewer-label").nth(8)).toHaveText(
        casePartiesTabContent.textOnPage9,
      );
      await expect(page.locator(".case-viewer-label").nth(9)).toHaveText(
        casePartiesTabContent.textOnPage10,
      );
      await expect(page.locator(".case-viewer-label").nth(10)).toHaveText(
        casePartiesTabContent.textOnPage11,
      );
      await expect(page.locator(".case-viewer-label").nth(11)).toHaveText(
        casePartiesTabContent.textOnPage12,
      );
      await expect(page.locator(".case-viewer-label").nth(12)).toHaveText(
        casePartiesTabContent.textOnPage13,
      );
      await expect(page.locator(".case-viewer-label").nth(13)).toHaveText(
        casePartiesTabContent.textOnPage14,
      );
    } else {
      await expect(page.locator(".case-viewer-label").nth(5)).toHaveText(
        casePartiesTabContent.textOnPage12,
      );
      await expect(page.locator(".case-viewer-label").nth(6)).toHaveText(
        casePartiesTabContent.textOnPage13,
      );
      await expect(page.locator(".case-viewer-label").nth(7)).toHaveText(
        casePartiesTabContent.textOnPage14,
      );
    }
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async changeToCasePartiesTab(page: Page): Promise<void> {
    await page.locator(this.casePartiesTab).nth(4).click();
  },

  async checkPageInfo(
    page: Page,
    representationPresent: boolean,
    representationQualified: boolean,
  ): Promise<void> {
    await expect(
      page.locator("td[id='case-viewer-field-read--cicCaseFullName']"),
    ).toHaveText(subjectDetailsContent.name);
    await expect(
      page.locator("ccd-read-email-field[class='ng-star-inserted']").nth(0),
    ).toHaveText(subjectContactDetailsContent.emailAddress);
    await expect(
      page.locator("td[id='case-viewer-field-read--cicCasePhoneNumber']"),
    ).toHaveText(subjectContactDetailsContent.contactNumber);
    await expect(
      page.locator("td[id='case-viewer-field-read--cicCaseDateOfBirth']"),
    ).toHaveText(await commonHelpers.convertDate(true));
    await expect(
      page
        .locator("ccd-read-fixed-radio-list-field[class='ng-star-inserted']")
        .first(),
    ).toHaveText(allTabTitlesContent.contactPreference);
    await expect(
      page.locator("td[id='case-viewer-field-read--cicCaseRespondentName']"),
    ).toHaveText(respondentDetailsContent.fullName);
    await expect(
      page.locator(
        "td[id='case-viewer-field-read--cicCaseRespondentOrganisation']",
      ),
    ).toHaveText(respondentDetailsContent.Organisation);
    await expect(
      page.locator("td[id='case-viewer-field-read--cicCaseRespondentEmail']"),
    ).toHaveText(respondentDetailsContent.emailAddress);

    if (representationPresent) {
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
        page.locator(
          "td[id='case-viewer-field-read--cicCaseRepresentativeEmailAddress']",
        ),
      ).toHaveText(representativeDetailsContent.emailAddress);
      await expect(
        page.locator(
          "td[id='case-viewer-field-read--cicCaseRepresentativeContactDetailsPreference']",
        ),
      ).toHaveText(allTabTitlesContent.contactPreference);

      if (representationQualified) {
        await expect(page.locator("ccd-read-yes-no-field")).toHaveText("Yes");
      } else {
        await expect(page.locator("ccd-read-yes-no-field")).toHaveText("No");
      }
    }
  },
};

export default casePartiesTabPage;
