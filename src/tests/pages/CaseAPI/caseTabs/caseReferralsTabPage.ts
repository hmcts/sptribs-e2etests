import { expect, Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import commonHelpers from "../../../helpers/commonHelpers.ts";
import { referralReason } from "../referCaseToJudge/referCaseToJudgeReasonPage.ts";
import caseReferralsTabContent from "../../../fixtures/content/CaseAPI/caseTabs/caseReferralsTab_content.ts";
import referCaseToJudgeAdditionalInfoContent from "../../../fixtures/content/CaseAPI/referCaseToJudge/referCaseToJudgeAdditionalInfo_content.ts";
import referCaseToJudgeReasonContent from "../../../fixtures/content/CaseAPI/referCaseToJudge/referCaseToJudgeReason_content.ts";

type CaseReferralsTabPage = {
  caseReferralsTab: string;
  checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    caseNumber: string,
    referralReason: referralReason,
  ): Promise<void>;
  changeToCaseReferralsTab(page: Page): Promise<void>;
  checkValidInfo(page: Page, referralReason: referralReason): Promise<void>;
};

const caseReferralsTabPage: CaseReferralsTabPage = {
  caseReferralsTab: ".mat-tab-label",

  async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    caseNumber: string,
    referralReason: referralReason,
  ): Promise<void> {
    await Promise.all([
      commonHelpers.checkAllCaseTabs(page, caseNumber),
      expect(page.locator("#referral-to-judge")).toHaveText(
        caseReferralsTabContent.title1,
      ),
      expect(page.locator("#referral-to-legal-officer")).toHaveText(
        caseReferralsTabContent.title2,
      ),
      ...Array.from({ length: 3 }, (_, index: number) => {
        const textOnPage = (caseReferralsTabContent as any)[
          `textOnPage${index + 1}`
        ];
        return commonHelpers.checkVisibleAndPresent(
          page.locator(`.case-viewer-label:text-is("${textOnPage}")`),
          1,
        );
      }),
    ]);
    if (referralReason === "Other") {
      await commonHelpers.checkVisibleAndPresent(
        page.locator(
          `.case-viewer-label:text-is("${caseReferralsTabContent.reason}")`,
        ),
        1,
      );
    }
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async changeToCaseReferralsTab(page: Page): Promise<void> {
    await page.locator(this.caseReferralsTab).nth(12).click();
  },

  async checkValidInfo(
    page: Page,
    referralReason: referralReason,
  ): Promise<void> {
    const currentDate = new Date();
    await Promise.all([
      commonHelpers.checkVisibleAndPresent(
        page.locator(`.text-16:text-is("${referralReason}")`),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `span:text-is("${referCaseToJudgeAdditionalInfoContent.additionalInfo}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `.text-16:text-is("${currentDate.getDate()} ${commonHelpers.months[currentDate.getMonth()].slice(0, 3)} ${currentDate.getFullYear()}")`,
        ),
        1,
      ),
    ]);
    if (referralReason === "Other") {
      await Promise.all([
        commonHelpers.checkVisibleAndPresent(
          page.locator(
            `.case-viewer-label:text-is("${caseReferralsTabContent.reason}")`,
          ),
          1,
        ),
        commonHelpers.checkVisibleAndPresent(
          page.locator(
            `.text-16:text-is("${referCaseToJudgeReasonContent.reason}")`,
          ),
          1,
        ),
      ]);
    }
  },
};

export default caseReferralsTabPage;
