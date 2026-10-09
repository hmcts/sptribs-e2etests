import { Page } from "@playwright/test";
import commonHelpers, {
  CaseNoticeType,
} from "../../helpers/commonHelpers.ts";
import issueDecisionNotifyPage from "../../pages/CaseAPI/issueDecision/issueDecisionNotifyPage";
import addDocumentFooterPage from "../../pages/CaseAPI/issueDecision/addDocumentFooterPage";
import confirmPage from "../../pages/CaseAPI/issueDecision/confirmPage";
import decisionUploadPage from "../../pages/CaseAPI/issueDecision/decisionUploadPage";
import decisionMainPage from "../../pages/CaseAPI/issueDecision/decisionMainPage";
import noticeOptionPage from "../../pages/CaseAPI/issueDecision/noticeOptionPage";
import previewTemplatePage from "../../pages/CaseAPI/issueDecision/previewTemplatePage";
import selectTemplatePage from "../../pages/CaseAPI/issueDecision/selectTemplatePage";
import submitPage from "../../pages/CaseAPI/issueDecision/submitPage";
import { Template } from "../../pages/CaseAPI/issueDecision/selectTemplatePage.ts";

export type NoticeType = "upload" | "Create";

type IssueDecision = {
  issueDecision(
    page: Page,
    accessibilityTest: boolean,
    errorMessaging: boolean,
    caseNumber: string,
    subjectName: string,
    template: Template,
    noticeType: NoticeType,
  ): Promise<string | void>;
};

const issueDecision: IssueDecision = {
  async issueDecision(
    page: Page,
    accessibilityTest: boolean,
    errorMessaging: boolean,
    caseNumber: string,
    subjectName: string,
    template: Template,
    noticeType: NoticeType,
  ): Promise<string | void> {
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Decision: Issue a decision",
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
    await decisionMainPage.checkPageLoads(
        page,
        caseNumber,
        accessibilityTest,
        template,
        subjectName
    );
    await decisionMainPage.fillInFields(
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
        null,
        subjectName
    );
    await issueDecisionNotifyPage.checkPageLoads(
        page,
        caseNumber,
        accessibilityTest,
        subjectName
    );
    await issueDecisionNotifyPage.continueOn(page);
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

export default issueDecision;