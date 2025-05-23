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
    subjectName: string,
  ): Promise<void>;
};

const referCaseToLegalOfficer: ReferCaseToLegalOfficer = {
  async referCaseToLegalOfficer(
    page: Page,
    accessibilityTest: boolean,
    referralReason: referralReason,
    errorMessaging: boolean,
    caseNumber: string,
    subjectName: string,
  ): Promise<void> {
    switch (errorMessaging) {
      default:
        await referCaseToLegalOfficerReasonPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          subjectName,
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
          subjectName,
        );
        await referCaseToLegalOfficerAdditionalInfoPage.fillFields(page);
        await referCaseToLegalOfficerAdditionalInfoPage.continueOn(page);
        await submitPage.checkPageLoads(
          page,
          caseNumber,
          referralReason,
          accessibilityTest,
          subjectName,
        );
        await submitPage.checkAndFillInfo(page, referralReason);
        await submitPage.continueOn(page);
        await confirmPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          subjectName,
        );
        await confirmPage.continueOn(page);
        break;
      case true:
        await referCaseToLegalOfficerReasonPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          subjectName,
        );
        await referCaseToLegalOfficerReasonPage.triggerErrorMessages(page);
        await referCaseToLegalOfficerReasonPage.fillFields(
          page,
          referralReason,
        );
        await referCaseToLegalOfficerReasonPage.continueOn(page);
        await referCaseToLegalOfficerAdditionalInfoPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          subjectName,
        );
        await referCaseToLegalOfficerAdditionalInfoPage.fillFields(page);
        await referCaseToLegalOfficerAdditionalInfoPage.continueOn(page);
        await submitPage.checkPageLoads(
          page,
          caseNumber,
          referralReason,
          accessibilityTest,
          subjectName,
        );
        await submitPage.checkAndFillInfo(page, referralReason);
        await submitPage.continueOn(page);
        await confirmPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          subjectName,
        );
        await confirmPage.continueOn(page);
        break;
    }
  },
};

export default referCaseToLegalOfficer;
