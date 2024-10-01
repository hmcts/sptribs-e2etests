import { Page } from "@playwright/test";
import { Template } from "../../pages/CaseAPI/issueFinalDecision/selectTemplatePage.ts";
import createDraftOrderPage from "../../pages/CaseAPI/createDraft/createDraftOrderPage.ts";
import orderMainContentPage from "../../pages/CaseAPI/createDraft/orderMainContentPage.ts";
import addDocumentFooterPage from "../../pages/CaseAPI/createDraft/addDocumentFooterPage.ts";
import previewTemplatePage from "../../pages/CaseAPI/createDraft/previewTemplatePage.ts";
import submitPage from "../../pages/CaseAPI/createDraft/submitPage.ts";
import confirmPage from "../../pages/CaseAPI/createDraft/confirmPage.ts";
import ordersAndDecisionsTabPage from "../../pages/CaseAPI/caseTabs/ordersAndDecisionsTabPage.ts";

type CreateDraft = {
  createDraft(
    page: Page,
    accessibilityTest: boolean,
    errorMessaging: boolean,
    template: Template,
    caseNumber: string,
  ): Promise<void>;
};

const createDraft: CreateDraft = {
  async createDraft(
    page: Page,
    accessibilityTest: boolean,
    errorMessaging: boolean,
    template: Template,
    caseNumber: string,
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
    );
    switch (errorMessaging) {
      default:
        await createDraftOrderPage.fillInFields(page, template);
        await orderMainContentPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          template,
        );
        await orderMainContentPage.fillInFields(page);
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
          template,
          caseNumber,
          null,
        );
        await submitPage.checkPageLoads(page, caseNumber, accessibilityTest);
        await submitPage.continueOn(page);
        await confirmPage.checkPageLoads(page, accessibilityTest);
        await confirmPage.closeAndReturnToCase(page);
        await page.click(
          `.mat-tab-label-content:text-is("Orders & Decisions")`,
        );
        await ordersAndDecisionsTabPage.checkDraftOrder(page, template, false);
        break;
      case true:
        await createDraftOrderPage.triggerErrorMessages(page);
        await orderMainContentPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          template,
        );
        await orderMainContentPage.triggerErrorMessages(page);
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
        await page.click('[type="submit"]');
        await submitPage.checkPageLoads(page, caseNumber, accessibilityTest);
        await submitPage.continueOn(page);
        await confirmPage.checkPageLoads(page, accessibilityTest);
        await confirmPage.closeAndReturnToCase(page);
        break;
    }
  },
};

export default createDraft;