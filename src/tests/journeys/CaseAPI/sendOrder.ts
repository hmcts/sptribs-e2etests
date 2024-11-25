import { Page } from "@playwright/test";
import selectOrderIssuingTypePage, {
  OrderType,
} from "../../pages/CaseAPI/sendOrder/selectOrderIssuingTypePage.ts";
import selectDraftOrderPage from "../../pages/CaseAPI/sendOrder/selectDraftOrderPage.ts";
import uploadOrderPage from "../../pages/CaseAPI/sendOrder/uploadOrderPage.ts";
import orderDueDatesPage from "../../pages/CaseAPI/sendOrder/orderDueDatesPage.ts";
import sendOrderNotifyPage from "../../pages/CaseAPI/sendOrder/sendOrderNotifyPage.ts";
import sendReminderPage, {
  ReminderDays,
} from "../../pages/CaseAPI/sendOrder/sendReminderPage.ts";
import submitPage from "../../pages/CaseAPI/sendOrder/submitPage.ts";
import confirmPage from "../../pages/CaseAPI/sendOrder/confirmPage.ts";

type SendOrder = {
  sendOrder(
    page: Page,
    caseNumber: string,
    orderType: OrderType,
    accessibilityTest: boolean,
    errorMessaging: boolean,
    completed: boolean,
    reminder: boolean,
    reminderDays: ReminderDays,
    subjectName: string,
  ): Promise<void>;
};

const sendOrder: SendOrder = {
  async sendOrder(
    page: Page,
    caseNumber: string,
    orderType: OrderType,
    accessibilityTest: boolean,
    errorMessaging: boolean,
    completed: boolean,
    reminder: boolean,
    reminderDays: ReminderDays,
    subjectName: string,
  ): Promise<void> {
    await selectOrderIssuingTypePage.checkPageLoads(
      page,
      caseNumber,
      accessibilityTest,
      subjectName,
    );
    switch (errorMessaging) {
      default: // false
        await selectOrderIssuingTypePage.fillInFields(page, orderType);
        switch (orderType) {
          default: // Draft
            await selectDraftOrderPage.checkPageLoads(
              page,
              caseNumber,
              accessibilityTest,
              subjectName,
            );
            await selectDraftOrderPage.fillInFields(page);
            break;
          case "UploadOrder":
            await uploadOrderPage.checkPageLoads(
              page,
              caseNumber,
              accessibilityTest,
              subjectName,
            );
            await uploadOrderPage.fillInFields(page);
            break;
        }
        await orderDueDatesPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          subjectName,
        );
        await orderDueDatesPage.fillInFields(page, completed);
        await sendOrderNotifyPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          subjectName,
        );
        await sendOrderNotifyPage.continueOn(page);
        await sendReminderPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          subjectName,
        );
        await sendReminderPage.fillInFields(page, reminder, reminderDays);
        await submitPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          orderType,
          completed,
          reminder,
          subjectName,
        );
        await submitPage.checkValidInfo(
          page,
          orderType,
          completed,
          reminder,
          reminderDays,
        );
        await submitPage.continueOn(page);
        await confirmPage.checkPageLoads(page, accessibilityTest);
        await confirmPage.closeAndReturnToCase(page);
        await page.waitForSelector(`h2:text-is("History")`);
        await page.waitForSelector(`.mat-tab-label-content:text-is("Tasks")`);
        break;
      case true:
        await selectOrderIssuingTypePage.triggerErrorMessages(page);
        await selectDraftOrderPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          subjectName,
        );
        await selectDraftOrderPage.triggerErrorMessages(page);
        await selectOrderIssuingTypePage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          subjectName,
        );
        await selectOrderIssuingTypePage.fillInFields(page, "UploadOrder");
        await uploadOrderPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          subjectName,
        );
        await uploadOrderPage.triggerErrorMessages(page);
        await orderDueDatesPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          subjectName,
        );
        await orderDueDatesPage.fillInFields(page, false);
        await sendOrderNotifyPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          subjectName,
        );
        await sendOrderNotifyPage.continueOn(page);
        await sendReminderPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          subjectName,
        );
        await sendReminderPage.triggerErrorMessages(page);
        await sendReminderPage.fillInFields(page, reminder, reminderDays);
        await page.locator(`h2:has-text("Check your answers")`);
        await submitPage.continueOn(page);
        await confirmPage.checkPageLoads(page, accessibilityTest);
        await confirmPage.closeAndReturnToCase(page);
        break;
    }
  },
};

export default sendOrder;
