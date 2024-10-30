import { Page } from "@playwright/test";
import { Template } from "../../pages/CaseAPI/issueFinalDecision/selectTemplatePage.ts";
import createDraftOrderPage from "../../pages/CaseAPI/createDraft/createDraftOrderPage.ts";
import orderMainContentPage from "../../pages/CaseAPI/createDraft/orderMainContentPage.ts";
import addDocumentFooterPage from "../../pages/CaseAPI/createDraft/addDocumentFooterPage.ts";
import previewTemplatePage from "../../pages/CaseAPI/createDraft/previewTemplatePage.ts";
import submitPage from "../../pages/CaseAPI/createDraft/submitPage.ts";
import confirmPage from "../../pages/CaseAPI/createDraft/confirmPage.ts";

type CreateDraft = {
  createDraft(
    page: Page,
    accessibilityTest: boolean,
    errorMessaging: boolean,
    template: Template,
    caseNumber: string,
    subjectName: string,
  ): Promise<void>;
};

const createDraft: CreateDraft = {
  async createDraft(
    page: Page,
    accessibilityTest: boolean,
    errorMessaging: boolean,
    template: Template,
    caseNumber: string,
    subjectName: string,
  ): Promise<void> {
    const invalidTemplates: Template[] = [
      "CIC1 - Eligibility",
      "CIC2 - Quantum",
      "CIC4 - Blank Decision Notice",
      "CIC11 - Strike Out Decision Notice",
    ];
    if (invalidTemplates.includes(template)) {
      throw new Error(
        "You cannot use this template type for create draft order.",
      );
    }

    await createDraftOrderPage.checkPageLoads(
      page,
      caseNumber,
      accessibilityTest,
      subjectName,
    );
    switch (errorMessaging) {
      default:
        await createDraftOrderPage.fillInFields(page, template);
        await orderMainContentPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          template,
          subjectName,
        );
        await orderMainContentPage.fillInFields(page);
        await addDocumentFooterPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          subjectName,
        );
        await addDocumentFooterPage.fillInFields(page);
        await previewTemplatePage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          subjectName,
        );
        await previewTemplatePage.fillInFields(
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
        await submitPage.continueOn(page);
        await confirmPage.checkPageLoads(page, accessibilityTest);
        await confirmPage.closeAndReturnToCase(page);
        break;
      case true:
        await createDraftOrderPage.triggerErrorMessages(page);
        await orderMainContentPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          template,
          subjectName,
        );
        await orderMainContentPage.triggerErrorMessages(page);
        await addDocumentFooterPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          subjectName,
        );
        await addDocumentFooterPage.triggerErrorMessages(page);
        await previewTemplatePage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          subjectName,
        );
        await page.click('[type="submit"]');
        await submitPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          subjectName,
        );
        await submitPage.continueOn(page);
        await confirmPage.checkPageLoads(page, accessibilityTest);
        await confirmPage.closeAndReturnToCase(page);
        break;
    }
  },
};

export default createDraft;
