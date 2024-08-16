import { expect, Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import commonHelpers from "../../../helpers/commonHelpers.ts";
import caseSubjectDetailsObject_content from "../../../fixtures/content/CaseAPI/createCase/caseSubjectDetailsObject_content.ts";
import referCaseToJudgeAdditionalInfoContent from "../../../fixtures/content/CaseAPI/referCaseToJudge/referCaseToJudgeAdditionalInfo_content.ts";

type ReferCaseToJudgeAdditionalInfoPage = {
  continue: string;
  previous: string;
  cancel: string;
  checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
  ): Promise<void>;
  fillFields(page: Page): Promise<void>;
  continueOn(page: Page): Promise<void>;
};

const referCaseToJudgeAdditionalInfoPage: ReferCaseToJudgeAdditionalInfoPage = {
  continue: '[type="submit"]',
  previous: ".button-secondary",
  cancel: ".cancel",

  async checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page.waitForURL(
      `**/case-details/${caseNumber.replace(/-/g, "")}/trigger/refer-to-judge/refer-to-judgereferToJudgeAdditionalInfo`,
    );
    await Promise.all([
      expect(page.locator(".govuk-heading-l")).toHaveText(
        referCaseToJudgeAdditionalInfoContent.pageHint,
      ),
      expect(page.locator("markdown > h3")).toContainText(
        caseSubjectDetailsObject_content.name,
      ),
      expect(page.locator("markdown > p").nth(0)).toContainText(
        referCaseToJudgeAdditionalInfoContent.caseReference + caseNumber,
      ),
      expect(page.locator(".form-label")).toHaveText(
        referCaseToJudgeAdditionalInfoContent.textOnPage,
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
      "#referToJudgeAdditionalInformation",
      referCaseToJudgeAdditionalInfoContent.additionalInfo,
    );
  },

  async continueOn(page: Page): Promise<void> {
    await page.click(this.continue);
  },
};

export default referCaseToJudgeAdditionalInfoPage;
