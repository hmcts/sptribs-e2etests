import { Page } from "@playwright/test";
import config, { UserRole } from "../../config.ts";
import commonHelpers, {
  allEvents,
  State,
} from "../../helpers/commonHelpers.ts";
import buildCase from "./buildCase.ts";
import hearingOptions from "./hearingOptions.ts";
import createListing from "./createListing.ts";
import createEditStay from "./createEditStay.ts";
import closeCase from "./closeCase.ts";
import createDraft from "./createDraft.ts";
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

type SendOrder = {
  sendOrder(
    page: Page,
    user: UserRole,
    initialState: State,
    orderType: OrderType,
    accessibilityTest: boolean,
    errorMessaging: boolean,
    completed: boolean,
    reminder: boolean,
    reminderDays: ReminderDays,
  ): Promise<void>;
};

const sendOrder: SendOrder = {
  async sendOrder(
    page: Page,
    user: UserRole,
    initialState: State,
    orderType: OrderType,
    accessibilityTest: boolean,
    errorMessaging: boolean,
    completed: boolean,
    reminder: boolean,
    reminderDays: ReminderDays,
  ): Promise<void> {
    let caseNumber: string | void = "";
    let previousEvents: allEvents[] = [];
    let eventTimes: string[] = [];
    if (orderType === "DraftOrder") {
      caseNumber = await createDraft.createDraft(
        page,
        "caseWorker",
        initialState,
        false,
        false,
        "CIC3 - Rule 27",
      );
    } else {
      switch (initialState) {
        default:
          throw new Error(
            "Invalid state, you cannot send an order from this state.",
          );
        case "Case Management":
          caseNumber = await buildCase.buildCase(
            page,
            previousEvents,
            eventTimes,
            true,
            "caseWorker",
          );
          break;
        case "Ready to list":
          caseNumber = await hearingOptions.hearingOptions(
            page,
            "caseWorker",
            false,
            true,
            "1-London",
            true,
            false,
            "Face to Face",
            false,
            false,
          );
          break;
        case "Awaiting Hearing":
          caseNumber = await createListing.createListing(
            page,
            "caseWorker",
            false,
            true,
            "1-London",
            "Case management",
            "Face to Face",
            "Morning",
            false,
            false,
            "East London Tribunal Hearing Centre-2 Clove Crescent, East India Dock London",
            false,
          );
          break;
        case "Case Stayed":
          caseNumber = await createEditStay.createEditStay(
            page,
            false,
            "Case Management",
            "caseWorker",
            false,
            "waitingOutcomeOfCivilCase",
            true,
          );
          break;
        case "Case closed":
          caseNumber = await closeCase.closeCase(
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
          break;
      }
    }
    if (typeof caseNumber !== "string") {
      throw new Error("Invalid case number.");
    }
    await commonHelpers.signOutAndGoToCase(
      page,
      user,
      config.CaseAPIBaseURL,
      caseNumber,
    );
    await commonHelpers.chooseEventFromDropdown(page, "Orders: Send order");
    await selectOrderIssuingTypePage.checkPageLoads(
      page,
      caseNumber,
      accessibilityTest,
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
            );
            await selectDraftOrderPage.fillInFields(page);
            break;
          case "UploadOrder":
            await uploadOrderPage.checkPageLoads(
              page,
              caseNumber,
              accessibilityTest,
            );
            await uploadOrderPage.fillInFields(page);
            break;
        }
        await orderDueDatesPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
        );
        await orderDueDatesPage.fillInFields(page, completed);
        await sendOrderNotifyPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
        );
        await sendOrderNotifyPage.continueOn(page);
        await sendReminderPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
        );
        await sendReminderPage.fillInFields(page, reminder, reminderDays);
        break;
      case true:
        await selectOrderIssuingTypePage.triggerErrorMessages(page);
        await selectDraftOrderPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
        );
        await selectDraftOrderPage.triggerErrorMessages(page);
        await selectOrderIssuingTypePage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
        );
        await selectOrderIssuingTypePage.fillInFields(page, "UploadOrder");
        await uploadOrderPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
        );
        await uploadOrderPage.triggerErrorMessages(page);
        await orderDueDatesPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
        );
        await orderDueDatesPage.fillInFields(page, false);
        await sendOrderNotifyPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
        );
        await sendOrderNotifyPage.triggerErrorMessages(page);
        await sendReminderPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
        );
        await sendReminderPage.triggerErrorMessages(page);
    }
  },
};

export default sendOrder;
