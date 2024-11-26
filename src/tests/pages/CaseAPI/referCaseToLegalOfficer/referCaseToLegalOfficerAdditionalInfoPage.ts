import { expect, Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import commonHelpers from "../../../helpers/commonHelpers.ts";
import referCaseToLegalOfficerAdditionalInfoContent from "../../../fixtures/content/CaseAPI/referCaseToLegalOfficer/referCaseToLegalOfficerAdditionalInfo_content.ts";

type ReferCaseToLegalOfficerAdditionalInfoPage = {
  continue: string;
  previous: string;
  cancel: string;
  checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
    subjectName: string,
  ): Promise<void>;
  fillFields(page: Page): Promise<void>;
  continueOn(page: Page): Promise<void>;
};

const referCaseToLegalOfficerAdditionalInfoPage: ReferCaseToLegalOfficerAdditionalInfoPage =
  {
    continue: '[type="submit"]',
    previous: ".button-secondary",
    cancel: ".cancel",

    async checkPageLoads(
      page: Page,
      caseNumber: string,
      accessibilityTest: boolean,
      subjectName: string,
    ): Promise<void> {
      await page.waitForURL(
        `**/case-details/${caseNumber.replace(/-/g, "")}/trigger/refer-to-legal-officer/refer-to-legal-officerreferToLegalOfficerAdditionalInfo`,
      );
      await Promise.all([
        expect(page.locator(".govuk-heading-l")).toHaveText(
          referCaseToLegalOfficerAdditionalInfoContent.pageHint,
        ),
        expect(page.locator("markdown > h3")).toContainText(subjectName),
        expect(page.locator("markdown > p").nth(0)).toContainText(
          referCaseToLegalOfficerAdditionalInfoContent.caseReference +
            caseNumber,
        ),
        expect(page.locator(".form-label")).toHaveText(
          referCaseToLegalOfficerAdditionalInfoContent.textOnPage,
        ),
        commonHelpers.checkForButtons(
          page,
          this.continue,
          this.previous,
          this.cancel,
        ),
      ]);
      if (accessibilityTest) {
        await axeTest(page);
      }
    },

    async fillFields(page: Page): Promise<void> {
      await page.fill(
        "#referToLegalOfficerAdditionalInformation",
        referCaseToLegalOfficerAdditionalInfoContent.additionalInfo,
      );
    },

    async continueOn(page: Page): Promise<void> {
      await page.click(this.continue);
    },
  };

export default referCaseToLegalOfficerAdditionalInfoPage;
