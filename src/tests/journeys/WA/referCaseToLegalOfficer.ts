import { Page } from "@playwright/test";
import { referralReason } from "../../pages/CaseAPI/referCaseToJudge/referCaseToJudgeReasonPage.ts";
import referCaseToLegalOfficerReasonPage from "../../pages/CaseAPI/referCaseToLegalOfficer/referCaseToLegalOfficerReasonPage.ts";
import referCaseToLegalOfficerAdditionalInfoPage from "../../pages/CaseAPI/referCaseToLegalOfficer/referCaseToLegalOfficerAdditionalInfoPage.ts";
import submitPage from "../../pages/CaseAPI/referCaseToLegalOfficer/submitPage.ts";
import confirmPage from "../../pages/CaseAPI/referCaseToLegalOfficer/confirmPage.ts";

type ReferCaseToLegalOfficer = {
  referCaseToLegalOfficer(
    page: Page,
    accessibilityTest: boolean,
    referralReason: referralReason,
    errorMessaging: boolean,
    caseNumber: string,
  ): Promise<void>;
};

const referCaseToLegalOfficer: ReferCaseToLegalOfficer = {
  async referCaseToLegalOfficer(
    page: Page,
    accessibilityTest: boolean,
    referralReason: referralReason,
    errorMessaging: boolean,
    caseNumber: string,
  ): Promise<void> {
    switch (errorMessaging) {
      default:
        await referCaseToLegalOfficerReasonPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
        );
        await referCaseToLegalOfficerReasonPage.fillFields(
          page,
          referralReason,
        );
        await referCaseToLegalOfficerReasonPage.continueOn(page);
        await referCaseToLegalOfficerAdditionalInfoPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
        );
        await referCaseToLegalOfficerAdditionalInfoPage.fillFields(page);
        await referCaseToLegalOfficerAdditionalInfoPage.continueOn(page);
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
        await referCaseToLegalOfficerReasonPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
        );
        await referCaseToLegalOfficerReasonPage.triggerErrorMessages(page);
        break;
    }
  },
};

export default referCaseToLegalOfficer;
