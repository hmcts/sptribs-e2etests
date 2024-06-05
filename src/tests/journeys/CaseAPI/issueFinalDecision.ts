import { Page } from "@playwright/test";
import config, { UserRole } from "../../config.ts";
import createSummary from "./createSummary.ts";
import commonHelpers, { CaseNoticeType } from "../../helpers/commonHelpers.ts";
import noticeOptionPage, {
  NoticeType,
} from "../../pages/CaseAPI/issueFinalDecision/noticeOptionPage.ts";
import decisionUploadPage from "../../pages/CaseAPI/issueFinalDecision/decisionUploadPage.ts";
import selectTemplatePage, {
  DecisionTemplate,
} from "../../pages/CaseAPI/issueFinalDecision/selectTemplatePage.ts";
import finalDecisionMainPage from "../../pages/CaseAPI/issueFinalDecision/finalDecisionMainPage.ts";
import addDocumentFooterPage from "../../pages/CaseAPI/issueFinalDecision/addDocumentFooterPage.ts";
import previewTemplatePage from "../../pages/CaseAPI/issueFinalDecision/previewTemplatePage.ts";
import issueFinalDecisionNotifyPage from "../../pages/CaseAPI/issueFinalDecision/issueFinalDecisionNotifyPage.ts";
import submitPage from "../../pages/CaseAPI/issueFinalDecision/submitPage.ts";

type IssueFinalDecision = {
  issueFinalDecision(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
    errorMessaging: boolean,
    noticeType: NoticeType,
    decisionTemplate: DecisionTemplate,
    caseNoticeType: CaseNoticeType,
  ): Promise<string | void>;
};

const issueFinalDecision: IssueFinalDecision = {
  async issueFinalDecision(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
    errorMessaging: boolean,
    noticeType: NoticeType,
    decisionTemplate: DecisionTemplate,
    caseNoticeType: CaseNoticeType,
  ): Promise<string | void> {
    let caseNumber: string | void;
    caseNumber = await createSummary.createSummary(
      page,
      "caseWorker",
      false,
      "Final",
      "Hybrid",
      "Morning",
      false,
      "Fox Court - London (Central) SSCS Tribunal-4th Floor, Fox Court, 30 Brooke Street, London",
      "Fox Court",
      "Allowed",
      null,
      true,
      false,
      false,
    );
    if (typeof caseNumber === "undefined") {
      return "Error accessing case.";
    } else {
      await commonHelpers.signOutAndGoToCase(
        page,
        user,
        config.CaseAPIBaseURL,
        caseNumber,
      );
      await commonHelpers.chooseEventFromDropdown(
        page,
        "Decision: Issue final decision",
      );
      switch (errorMessaging) {
        default:
          await noticeOptionPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
          );
          await noticeOptionPage.fillInFields(page, noticeType);
          switch (noticeType) {
            default: //Upload
              await decisionUploadPage.checkPageLoads(
                page,
                caseNumber,
                accessibilityTest,
              );
              await decisionUploadPage.fillInFields(page);
              await issueFinalDecisionNotifyPage.checkPageLoads(
                page,
                caseNumber,
                accessibilityTest,
              );
              await issueFinalDecisionNotifyPage.continueOn(page);
              break;
            case "Create":
              await selectTemplatePage.checkPageLoads(
                page,
                caseNumber,
                accessibilityTest,
              );
              await selectTemplatePage.fillInFields(page, decisionTemplate);
              await finalDecisionMainPage.checkPageLoads(
                page,
                caseNumber,
                accessibilityTest,
                decisionTemplate,
              );
              await finalDecisionMainPage.fillInFields(page);
              await addDocumentFooterPage.checkPageLoads(
                page,
                caseNumber,
                accessibilityTest,
              );
              await addDocumentFooterPage.fillInFields(page);
              await previewTemplatePage.checkPageLoads(
                page,
                caseNumber,
                accessibilityTest,
              );
              await previewTemplatePage.fillInFields(
                page,
                decisionTemplate,
                caseNumber,
                caseNoticeType,
              );
              await issueFinalDecisionNotifyPage.checkPageLoads(
                page,
                caseNumber,
                accessibilityTest,
              );
              await issueFinalDecisionNotifyPage.continueOn(page);
              await submitPage.checkPageLoads(
                page,
                caseNumber,
                accessibilityTest,
                noticeType,
              );
              await submitPage.checkAllInfo(page, noticeType, decisionTemplate);
              await submitPage.continueOn(page);
              break;
          }
          break;
        case true:
          await noticeOptionPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
          );
          await noticeOptionPage.triggerErrorMessages(page);
          await decisionUploadPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
          );
          await decisionUploadPage.triggerErrorMessages(page);
          await noticeOptionPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
          );
          await noticeOptionPage.fillInFields(page, "Create");
          await selectTemplatePage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
          );
          await selectTemplatePage.triggerErrorMessages(page);
          await finalDecisionMainPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
            decisionTemplate,
          );
          await finalDecisionMainPage.triggerErrorMessages(page);
          await addDocumentFooterPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
          );
          await addDocumentFooterPage.triggerErrorMessages(page);
          await previewTemplatePage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
          );
          await previewTemplatePage.fillInFields(
            page,
            decisionTemplate,
            caseNumber,
            caseNoticeType,
          );
          await issueFinalDecisionNotifyPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
          );
          await issueFinalDecisionNotifyPage.triggerErrorMessages(page);
          await submitPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
            noticeType,
          );
          break;
      }
      return caseNumber;
    }
  },
};

export default issueFinalDecision;
