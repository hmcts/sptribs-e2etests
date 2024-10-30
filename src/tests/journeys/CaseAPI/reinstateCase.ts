import { Page } from "@playwright/test";
import commonHelpers from "../../helpers/commonHelpers.ts";
import events_content from "../../fixtures/content/CaseAPI/events_content.ts";
import reinstateWarningPage from "../../pages/CaseAPI/reinstateCase/reinstateWarningPage.ts";
import reinstateReasonPage, {
  ReinstateReason,
} from "../../pages/CaseAPI/reinstateCase/reinstateReasonPage.ts";
import reinstateUploadDocumentPage from "../../pages/CaseAPI/reinstateCase/reinstateUploadDocumentPage.ts";
import reinstateCaseNotifyPage from "../../pages/CaseAPI/reinstateCase/reinstateCaseNotifyPage.ts";
import submitPage from "../../pages/CaseAPI/reinstateCase/submitPage.ts";
import confirmPage from "../../pages/CaseAPI/reinstateCase/confirmPage.ts";
import stateTabPage from "../../pages/CaseAPI/caseTabs/stateTabPage.ts";

type ReinstateCase = {
  reinstateCase(
    page: Page,
    accessibilityTest: boolean,
    errorMessaging: boolean,
    reinstateReason: ReinstateReason,
    optionalText: boolean,
    caseNumber: string,
    subjectName: string,
  ): Promise<void>;
};

const reinstateCase: ReinstateCase = {
  async reinstateCase(
    page: Page,
    accessibilityTest: boolean,
    errorMessaging: boolean,
    reinstateReason: ReinstateReason,
    optionalText: boolean,
    caseNumber: string,
    subjectName: string,
  ): Promise<void> {
    await commonHelpers.chooseEventFromDropdown(
      page,
      events_content.reinstateCase,
    );
    await reinstateWarningPage.checkPageLoads(
      page,
      caseNumber,
      accessibilityTest,
      subjectName,
    );
    await reinstateWarningPage.continueOn(page);
    switch (errorMessaging) {
      default:
        await reinstateReasonPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          subjectName,
        );
        await reinstateReasonPage.continueOn(
          page,
          reinstateReason,
          optionalText,
        );
        await reinstateUploadDocumentPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          subjectName,
        );
        await reinstateUploadDocumentPage.continueOn(page);
        await reinstateCaseNotifyPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          subjectName,
        );
        await reinstateCaseNotifyPage.continueOn(page);
        await submitPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          optionalText,
          subjectName,
        );
        await submitPage.checkValidInfo(page, reinstateReason, optionalText);
        await submitPage.continueOn(page);
        await confirmPage.checkPageLoads(
          page,
          accessibilityTest,
          caseNumber,
          subjectName,
        );
        await confirmPage.closeAndReturnToCase(page);
        await stateTabPage.changeToStateTab(page);
        await stateTabPage.checkStateTab(page, "Case management");
        break;
      case true:
        await reinstateReasonPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          subjectName,
        );
        await reinstateReasonPage.triggerErrorMessages(page);
        await reinstateUploadDocumentPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          subjectName,
        );
        await reinstateUploadDocumentPage.triggerErrorMessages(page);
        await reinstateCaseNotifyPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          subjectName,
        );
        await reinstateCaseNotifyPage.triggerErrorMessages(page);
        break;
    }
  },
};

export default reinstateCase;
