import { Page } from "@playwright/test";
import commonHelpers, {
  CaseNoticeType,
} from "../../helpers/commonHelpers.ts";
import issueFinalDecisionNotifyPage from "../../pages/CaseAPI/issueFinalDecision/issueFinalDecisionNotifyPage";
import addDocumentFooterPage from "../../pages/CaseAPI/issueFinalDecision/addDocumentFooterPage";
import confirmPage from "../../pages/CaseAPI/issueFinalDecision/confirmPage";
import decisionUploadPage from "../../pages/CaseAPI/issueFinalDecision/decisionUploadPage";
import finalDecisionMainPage from "../../pages/CaseAPI/issueFinalDecision/finalDecisionMainPage";
import noticeOptionPage from "../../pages/CaseAPI/issueFinalDecision/noticeOptionPage";
import previewTemplatePage from "../../pages/CaseAPI/issueFinalDecision/previewTemplatePage";
import selectTemplatePage from "../../pages/CaseAPI/issueFinalDecision/selectTemplatePage";
import submitPage from "../../pages/CaseAPI/issueFinalDecision/submitPage";
import { Template } from "../../pages/CaseAPI/issueFinalDecision/selectTemplatePage.ts";

export type NoticeType = "upload" | "Create";

type IssueFinalDecision = {
  issueFinalDecision(
    page: Page,
    accessibilityTest: boolean,
    errorMessaging: boolean,
    caseNumber: string,
    subjectName: string,
    template: Template,
    noticeType: NoticeType,
    caseNoticeType: CaseNoticeType,
  ): Promise<string | void>;
};

const issueFinalDecision: IssueFinalDecision = {
  async issueFinalDecision(
    page: Page,
    accessibilityTest: boolean,
    errorMessaging: boolean,
    caseNumber: string,
    subjectName: string,
    template: Template,
    noticeType: NoticeType,
    caseNoticeType: CaseNoticeType,
  ): Promise<string | void> {
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Decision: Issue final decision",
    );
    await noticeOptionPage.checkPageLoads(
        page, 
        caseNumber, 
        accessibilityTest,
        subjectName
    );
    await noticeOptionPage.fillInFields(page, noticeType);
    await selectTemplatePage.checkPageLoads(
        page,
        caseNumber,
        accessibilityTest,
        subjectName
    );
    await selectTemplatePage.fillInFields(page, template);
    await finalDecisionMainPage.checkPageLoads(
        page,
        caseNumber,
        accessibilityTest,
        template,
        subjectName
    );
    await finalDecisionMainPage.fillInFields(
        page
    );
    await addDocumentFooterPage.checkPageLoads(
        page,
        caseNumber,
        accessibilityTest,
        subjectName
    );
    await addDocumentFooterPage.fillInFields(
        page
    );
    await previewTemplatePage.checkPageLoads(
        page,
        caseNumber,
        accessibilityTest,
        subjectName
    );
    await previewTemplatePage.fillInFields(
        page,
        template,
        caseNumber,
        caseNoticeType,
        subjectName
    );
    await issueFinalDecisionNotifyPage.checkPageLoads(
        page,
        caseNumber,
        accessibilityTest,
        subjectName
    );
    await issueFinalDecisionNotifyPage.continueOn(page);
    await submitPage.checkPageLoads(
        page,
        caseNumber,
        accessibilityTest,
        noticeType,
        subjectName
    );
    await submitPage.checkAllInfo(
        page,
        noticeType,
        template
    );
    await submitPage.continueOn(page);
    await confirmPage.checkPageLoads(
        page,
        accessibilityTest
    );
    await confirmPage.closeAndReturnToCase(page);
  },
};

export default issueFinalDecision;