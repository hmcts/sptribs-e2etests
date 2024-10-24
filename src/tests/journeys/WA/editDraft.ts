import { Page } from "@playwright/test";
import commonHelpers from "../../helpers/commonHelpers.ts";
import { Template } from "../../pages/CaseAPI/issueFinalDecision/selectTemplatePage.ts";
import editDraftOrderPage from "../../pages/CaseAPI/editDraft/editDraftOrderPage.ts";
import editDraftOrderMainContentPage from "../../pages/CaseAPI/editDraft/editDraftOrderMainContentPage.ts";
import editDraftAddDocumentFooterPage from "../../pages/CaseAPI/editDraft/editDraftAddDocumentFooterPage.ts";
import editDraftPreviewTemplatePage from "../../pages/CaseAPI/editDraft/editDraftPreviewTemplatePage.ts";
import submitPage from "../../pages/CaseAPI/editDraft/submitPage.ts";
import confirmPage from "../../pages/CaseAPI/editDraft/confirmPage.ts";
import ordersAndDecisionsTabPage from "../../pages/CaseAPI/caseTabs/ordersAndDecisionsTabPage.ts";

type EditDraft = {
  editDraft(
    page: Page,
    accessibilityTest: boolean,
    errorMessaging: boolean,
    template: Template,
    caseNumber: string,
    subjectName: string,
  ): Promise<void>;
};

const editDraft: EditDraft = {
  async editDraft(
    page: Page,
    accessibilityTest: boolean,
    errorMessaging: boolean,
    template: Template,
    caseNumber: string,
    subjectName: string,
  ): Promise<void> {
    await commonHelpers.chooseEventFromDropdown(page, "Orders: Edit draft");
    await editDraftOrderPage.checkPageLoads(
      page,
      caseNumber,
      accessibilityTest,
      subjectName,
    );
    switch (errorMessaging) {
      default:
        const editedTemplate = await editDraftOrderPage.fillInFields(page);
        await editDraftOrderPage.continueOn(page);
        await editDraftOrderMainContentPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          subjectName,
        );
        await editDraftOrderMainContentPage.fillInFields(page);
        await editDraftAddDocumentFooterPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          subjectName,
        );
        await editDraftAddDocumentFooterPage.fillInFields(page);
        await editDraftPreviewTemplatePage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          subjectName,
        );
        await editDraftPreviewTemplatePage.fillInFields(
          page,
          template,
          caseNumber,
          null,
          subjectName,
        );
        await submitPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          subjectName,
        );
        await submitPage.checkAllInfo(page, editedTemplate);
        await submitPage.continueOn(page);
        await confirmPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          subjectName,
        );
        await confirmPage.closeAndReturnToCase(page);
        await page.click(
          `.mat-tab-label-content:text-is("Orders & Decisions")`,
        );
        await ordersAndDecisionsTabPage.checkDraftOrder(page, template, true);
        break;
      case true:
        await editDraftOrderPage.triggerErrorMessages(page);
        await editDraftOrderPage.fillInFields(page);
        await editDraftOrderPage.continueOn(page);
        await editDraftOrderMainContentPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          subjectName,
        );
        await editDraftOrderMainContentPage.triggerErrorMessages(page);
        await editDraftAddDocumentFooterPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          subjectName,
        );
        await editDraftAddDocumentFooterPage.triggerErrorMessages(page);
        break;
    }
  },
};

export default editDraft;
