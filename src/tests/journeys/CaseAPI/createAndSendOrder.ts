import { Page } from "@playwright/test";
import { Template } from "../../pages/CaseAPI/issueFinalDecision/selectTemplatePage.ts";
import applyAnonymityPage from "../../pages/CaseAPI/createAndSendOrder/applyAnonymityPage.ts";
import selectOrderIssuingTypePage, {
  OrderType,
} from "../../pages/CaseAPI/createAndSendOrder/selectOrderIssuingTypePage.ts";
import createOrderPage from "../../pages/CaseAPI/createAndSendOrder/createOrderPage.ts";
import orderMainContentPage from "../../pages/CaseAPI/createAndSendOrder/orderMainContentPage.ts";
import addDocumentFooterPage from "../../pages/CaseAPI/createAndSendOrder/addDocumentFooterPage.ts";
import orderDueDatePage from "../../pages/CaseAPI/createAndSendOrder/orderDueDatePage.ts";
import orderNotifyPage from "../../pages/CaseAPI/createAndSendOrder/orderNotifyPage.ts";
import previewOrderPage from "../../pages/CaseAPI/createAndSendOrder/previewOrderPage.ts";

import submitPage from "../../pages/CaseAPI/createAndSendOrder/submitPage.ts";
import confirmPage from "../../pages/CaseAPI/createAndSendOrder/confirmPage.ts";

type CreateAndSendOrder = {
  createAndSendOrder(
    page: Page,
    accessibilityTest: boolean,
    errorMessaging: boolean,
    completed: boolean,
    template: Template,
    caseNumber: string,
    orderType: OrderType,
    subjectName: string,
  ): Promise<void>;
};

const createAndSendOrder: CreateAndSendOrder = {
  async createAndSendOrder(
    page: Page,
    accessibilityTest: boolean,
    errorMessaging: boolean,
    completed: boolean,
    template: Template,
    caseNumber: string,
    orderType: OrderType,
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

    await applyAnonymityPage.checkPageLoads(
      page,
      caseNumber,
      accessibilityTest,
      subjectName,
    );
    switch (errorMessaging) {
      default: //False
        await applyAnonymityPage.fillInFields(page);
        await selectOrderIssuingTypePage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          subjectName,
        );
        await selectOrderIssuingTypePage.fillInFields(page, orderType);
        await createOrderPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          subjectName,
        );
        await createOrderPage.fillInFields(page, template);
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
        await orderDueDatePage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          subjectName,
        );
        await orderDueDatePage.fillInFields(page, completed);
        await orderNotifyPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          subjectName,
        );
        await orderNotifyPage.continueOn(page);
        await previewOrderPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          subjectName,
        );
        await previewOrderPage.fillInFields(
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
        await page.waitForSelector(`h2:text-is("History")`);
        await page.waitForSelector(`.mat-tab-label-content:text-is("Tasks")`);
        break;
      case true:
        await applyAnonymityPage.fillInFields(page);
        await selectOrderIssuingTypePage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          subjectName,
        );
        await selectOrderIssuingTypePage.fillInFields(page, orderType);
        await createOrderPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          subjectName,
        );
        await createOrderPage.fillInFields(page, template);
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
        await orderDueDatePage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          subjectName,
        );
        await orderDueDatePage.fillInFields(page, completed);
        await orderNotifyPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          subjectName,
        );
        await orderNotifyPage.continueOn(page);
        await previewOrderPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          subjectName,
        );
        await previewOrderPage.fillInFields(
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
    }
  },
};

export default createAndSendOrder;
