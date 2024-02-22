import { expect, Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import commonHelpers from "../../../helpers/commonHelpers.ts";
import summaryTabContent from "../../../fixtures/content/CaseAPI/caseTabs/summaryTab_content.ts";
import subjectDetailsContent from "../../../fixtures/content/DSSCreateCase/SubjectDetails_content.ts";
import subjectContactDetailsContent from "../../../fixtures/content/DSSCreateCase/SubjectContactDetails_content.ts";
import representativeDetailsContent from "../../../fixtures/content/DSSCreateCase/RepresentativeDetails_content.ts";

type SummaryTabPage = {
  summaryTab: string;
  checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    representationPresent: boolean,
    caseNumber: string,
  ): Promise<void>;
  changeToSummaryTab(page: Page): Promise<void>;
  checkPageInfo(
    page: Page,
    caseNumber: string,
    representationPresent: boolean,
    representationQualified: boolean,
  ): Promise<void>;
};

const summaryTabPage: SummaryTabPage = {
  summaryTab: ".mat-tab-label",

  async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    representationPresent: boolean,
    caseNumber: string,
  ): Promise<void> {
    await commonHelpers.checkAllCaseTabs(page, caseNumber);
    await expect(page.locator("markdown[class='markdown'] h4")).toHaveText(
      summaryTabContent.caseState,
    );
    await expect(page.locator("dl[id='case-details'] h3")).toHaveText(
      summaryTabContent.subHeading1,
    );
    await expect(page.locator(".case-viewer-label").nth(0)).toHaveText(
      summaryTabContent.textOnPage1,
    );
    await expect(page.locator(".case-viewer-label").nth(1)).toHaveText(
      summaryTabContent.textOnPage2,
    );
    await expect(page.locator(".case-viewer-label").nth(2)).toHaveText(
      summaryTabContent.textOnPage3,
    );
    await expect(page.locator(".case-viewer-label").nth(3)).toHaveText(
      summaryTabContent.textOnPage4,
    );

    if (representationPresent) {
      // await expect( TODO: Fix selector
      //   page.locator("dl[id='representativeDetailsContent'] h3"),
      // ).toHaveText(summaryTabContent.subHeading2);
      await expect(page.locator(".case-viewer-label").nth(4)).toHaveText(
        summaryTabContent.textOnPage5,
      );
      await expect(page.locator(".case-viewer-label").nth(5)).toHaveText(
        summaryTabContent.textOnPage6,
      );
      await expect(page.locator(".case-viewer-label").nth(6)).toHaveText(
        summaryTabContent.textOnPage7,
      );
      await expect(page.locator(".case-viewer-label").nth(7)).toHaveText(
        summaryTabContent.textOnPage8,
      );
      await expect(page.locator(".case-viewer-label").nth(8)).toHaveText(
        summaryTabContent.textOnPage9,
      );
    }

    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async changeToSummaryTab(page: Page): Promise<void> {
    await page.locator(this.summaryTab).nth(1).click();
  },

  async checkPageInfo(
    page: Page,
    caseNumber: string,
    representationPresent: boolean,
    representationQualified: boolean,
  ): Promise<void> {
    await expect(
      page.locator("td[id='case-viewer-field-read--cicCaseFullName']"),
    ).toHaveText(subjectDetailsContent.name);
    await expect(
      page.locator("ccd-read-date-field[class='ng-star-inserted']"),
    ).toHaveText(await commonHelpers.convertDate(true));
    await expect(
      page.locator("ccd-read-email-field[class='ng-star-inserted']").nth(0),
    ).toHaveText(subjectContactDetailsContent.emailAddress);
    await expect(
      page.locator("ccd-read-text-field[class='ng-star-inserted']").nth(1),
    ).toHaveText(caseNumber);

    if (representationPresent) {
      await expect(
        page.locator("ccd-read-text-field[class='ng-star-inserted']").nth(2),
      ).toHaveText(representativeDetailsContent.Organisation);
      await expect(
        page.locator("ccd-read-text-field[class='ng-star-inserted']").nth(3),
      ).toHaveText(representativeDetailsContent.fullName);
      await expect(
        page.locator("ccd-read-text-field[class='ng-star-inserted']").nth(4),
      ).toHaveText(representativeDetailsContent.contactNumber);
      await expect(
        page.locator("ccd-read-email-field[class='ng-star-inserted']").nth(1),
      ).toHaveText(representativeDetailsContent.emailAddress);

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

export default summaryTabPage;
