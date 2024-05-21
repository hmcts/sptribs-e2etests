import { Page } from "@playwright/test";
import config, { UserRole } from "../../config.ts";
import closeCase from "./closeCase.ts";
import commonHelpers from "../../helpers/commonHelpers.ts";
import events_content from "../../fixtures/content/CaseAPI/events_content.ts";
import reinstateWarningPage from "../../pages/CaseAPI/reinstateCase/reinstateWarningPage.ts";
import reinstateReasonPage, {
  ReinstateReason,
} from "../../pages/CaseAPI/reinstateCase/reinstateReasonPage.ts";
import reinstateUploadDocumentPage from "../../pages/CaseAPI/reinstateCase/reinstateUploadDocumentPage.ts";

type ReinstateCase = {
  reinstateCase(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
    errorMessaging: boolean,
    reinstateReason: ReinstateReason,
    optionalText: boolean,
  ): Promise<void>;
};

const reinstateCase: ReinstateCase = {
  async reinstateCase(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
    errorMessaging: boolean,
    reinstateReason: ReinstateReason,
    optionalText: boolean,
  ): Promise<void> {
    const caseNumber = await closeCase.closeCase(
      page,
      "caseWorker",
      false,
      "Case Management",
      false,
      "caseWithdrawn",
      true,
      null,
      null,
    );
    await commonHelpers.signOutAndGoToCase(
      page,
      user,
      config.CaseAPIBaseURL,
      caseNumber,
    );
    await commonHelpers.chooseEventFromDropdown(
      page,
      events_content.reinstateCase,
    );
    await reinstateWarningPage.checkPageLoads(
      page,
      caseNumber,
      accessibilityTest,
    );
    await reinstateWarningPage.continueOn(page);
    switch (errorMessaging) {
      default:
        await reinstateReasonPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
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
        );
        await reinstateUploadDocumentPage.continueOn(page);
        break;
      case true:
        await reinstateReasonPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
        );
        await reinstateReasonPage.triggerErrorMessages(page);
        await reinstateUploadDocumentPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
        );
        await reinstateUploadDocumentPage.triggerErrorMessages(page);
        break;
    }
  },
};

export default reinstateCase;
