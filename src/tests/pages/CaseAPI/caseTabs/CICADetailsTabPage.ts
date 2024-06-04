import { expect, Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import commonHelpers from "../../../helpers/commonHelpers.ts";
import CICADetailsTabContent from "../../../fixtures/content/CaseAPI/caseTabs/CICADetailsTab_content.ts";
import editCICACaseDetailsEditCaseDetailsContent from "../../../fixtures/content/CaseAPI/editCICACaseDetails/editCICACaseDetailsEditCaseDetails_content.ts";

type CICADetailsTabPage = {
  CICADetailsTab: string;
  checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    caseNumber: string,
  ): Promise<void>;
  changeToCICADetailsTab(page: Page): Promise<void>;
  checkValidInfo(page: Page): Promise<void>;
};

const cicaDetailsTabPage: CICADetailsTabPage = {
  CICADetailsTab: ".mat-tab-label",

  async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    caseNumber: string,
  ): Promise<void> {
    await Promise.all([
      commonHelpers.checkAllCaseTabs(page, caseNumber, true),
      expect(page.locator("h4")).toHaveText(CICADetailsTabContent.title),
      ...Array.from({ length: 3 }, (_, index) => {
        const textOnPage = (CICADetailsTabContent as any)[
          `textOnPage${index + 1}`
        ];
        return commonHelpers.checkVisibleAndPresent(
          page.locator(
            `#complex-panel-simple-field-label > span.text-16:text-is("${textOnPage}")`,
          ),
          1,
        );
      }),
    ]);
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async changeToCICADetailsTab(page: Page): Promise<void> {
    await page.locator(this.CICADetailsTab).nth(9).click();
  },

  async checkValidInfo(page: Page): Promise<void> {
    await Promise.all([
      expect(page.locator("ccd-read-text-field").nth(0)).toHaveText(
        editCICACaseDetailsEditCaseDetailsContent.referenceNumber,
      ),
      expect(page.locator("ccd-read-text-field").nth(1)).toHaveText(
        editCICACaseDetailsEditCaseDetailsContent.caseWorker,
      ),
      expect(page.locator("ccd-read-text-field").nth(2)).toHaveText(
        editCICACaseDetailsEditCaseDetailsContent.presentingOfficer,
      ),
    ]);
  },
};

export default cicaDetailsTabPage;
