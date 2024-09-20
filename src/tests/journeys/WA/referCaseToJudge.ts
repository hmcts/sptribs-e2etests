import { Page } from "@playwright/test";
import referCaseToJudgeReasonPage, {
  referralReason,
} from "../../pages/CaseAPI/referCaseToJudge/referCaseToJudgeReasonPage.ts";
import referCaseToJudgeAdditionalInfoPage from "../../pages/CaseAPI/referCaseToJudge/referCaseToJudgeAdditionalInfoPage.ts";
import submitPage from "../../pages/CaseAPI/referCaseToJudge/submitPage.ts";
import confirmPage from "../../pages/CaseAPI/referCaseToJudge/confirmPage.ts";

type ReferCaseToJudge = {
  referCaseToJudge(
    page: Page,
    accessibilityTest: boolean,
    referralReason: referralReason,
    errorMessaging: boolean,
    caseNumber: string,
  ): Promise<void>;
};

const referCaseToJudge: ReferCaseToJudge = {
  async referCaseToJudge(
    page: Page,
    accessibilityTest: boolean,
    referralReason: referralReason,
    errorMessaging: boolean,
    caseNumber: string,
  ): Promise<void> {
    switch (errorMessaging) {
      default:
        await referCaseToJudgeReasonPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
        );
        await referCaseToJudgeReasonPage.fillFields(page, referralReason);
        await referCaseToJudgeReasonPage.continueOn(page);
        await referCaseToJudgeAdditionalInfoPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
        );
        await referCaseToJudgeAdditionalInfoPage.fillFields(page);
        await referCaseToJudgeAdditionalInfoPage.continueOn(page);
        await submitPage.checkPageLoads(
          page,
          caseNumber,
          referralReason,
          accessibilityTest,
        );
        await submitPage.checkAndFillInfo(page, referralReason);
        await submitPage.continueOn(page);
        await confirmPage.checkPageLoads(page, caseNumber, accessibilityTest);
        await confirmPage.continueOn(page);
        await page.waitForTimeout(60001); //waiting for Cronjob to cancel previous task
        break;
      case true:
        await referCaseToJudgeReasonPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
        );
        await referCaseToJudgeReasonPage.triggerErrorMessages(page);
        await referCaseToJudgeReasonPage.fillFields(page, referralReason);
        await referCaseToJudgeReasonPage.continueOn(page);
        await referCaseToJudgeAdditionalInfoPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
        );
        await referCaseToJudgeAdditionalInfoPage.fillFields(page);
        await referCaseToJudgeAdditionalInfoPage.continueOn(page);
        await submitPage.checkPageLoads(
          page,
          caseNumber,
          referralReason,
          accessibilityTest,
        );
        await submitPage.checkAndFillInfo(page, referralReason);
        await submitPage.continueOn(page);
        await confirmPage.checkPageLoads(page, caseNumber, accessibilityTest);
        await confirmPage.continueOn(page);
        break;
    }
  },
};

export default referCaseToJudge;
