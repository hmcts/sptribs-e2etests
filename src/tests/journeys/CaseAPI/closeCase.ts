import { Page } from "@playwright/test";
import config, { UserRole } from "../../config.ts";
import hearingOptions from "./hearingOptions.ts";
import commonHelpers, { allEvents } from "../../helpers/commonHelpers.ts";
import buildCase from "./buildCase.ts";
import events_content from "../../fixtures/content/CaseAPI/events_content.ts";
import caseWarningPage from "../../pages/CaseAPI/closeCase/caseWarningPage.ts";
import selectReasonPage, {
  CaseCloseReason,
} from "../../pages/CaseAPI/closeCase/selectReasonPage.ts";
import withdrawalDetailsPage from "../../pages/CaseAPI/closeCase/withdrawalDetailsPage.ts";
import rejectionDetailsPage, {
  RejectionReason,
} from "../../pages/CaseAPI/closeCase/rejectionDetailsPage.ts";
import strikeoutDetailsPage, {
  StrikeoutReason,
} from "../../pages/CaseAPI/closeCase/strikeoutDetailsPage.ts";
import concessionDetailsPage from "../../pages/CaseAPI/closeCase/concessionDetailsPage.ts";
import consentOrderPage from "../../pages/CaseAPI/closeCase/consentOrderPage.ts";
import rule27Page from "../../pages/CaseAPI/closeCase/rule27Page.ts";
import uploadDocumentsPage from "../../pages/CaseAPI/closeCase/uploadDocumentsPage.ts";
import closeCaseNotifyPage from "../../pages/CaseAPI/closeCase/closeCaseNotifyPage.ts";
import submitPage from "../../pages/CaseAPI/closeCase/submitPage.ts";
import confirmPage from "../../pages/CaseAPI/closeCase/confirmPage.ts";
import stateTabPage from "../../pages/CaseAPI/caseTabs/stateTabPage.ts";

type initialState = "Case Management" | "Ready to list";

type CloseCase = {
  closeCase(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
    initialState: initialState,
    errorMessaging: boolean,
    closeReason: CaseCloseReason,
    optionalText: boolean,
    rejectionReason: RejectionReason | null,
    strikeoutReason: StrikeoutReason | null,
  ): Promise<void>;
};

const closeCase: CloseCase = {
  async closeCase(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
    initialState: initialState,
    errorMessaging: boolean,
    closeReason: CaseCloseReason,
    optionalText: boolean,
    rejectionReason: RejectionReason | null,
    strikeoutReason: StrikeoutReason | null,
  ): Promise<void> {
    let caseNumber: string = "";
    switch (initialState) {
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
      default: // Defaults to Case management.
        let previousEvents: allEvents[] = [];
        let eventTimes: string[] = [];
        caseNumber = await buildCase.buildCase(
          page,
          previousEvents,
          eventTimes,
          true,
          "caseWorker",
        );
        break;
    }
    await commonHelpers.signOutAndGoToCase(
      page,
      user,
      config.CaseAPIBaseURL,
      caseNumber,
    );
    await commonHelpers.chooseEventFromDropdown(page, events_content.closeCase);
    await caseWarningPage.checkPageLoads(page, caseNumber, accessibilityTest);
    await caseWarningPage.continueOn(page);
    await selectReasonPage.checkPageLoads(page, caseNumber, accessibilityTest);
    switch (errorMessaging) {
      default:
        await selectReasonPage.continueOn(page, closeReason, optionalText);
        switch (closeReason) {
          default: // Case withdrawn
            await withdrawalDetailsPage.checkPageLoads(
              page,
              caseNumber,
              accessibilityTest,
            );
            await withdrawalDetailsPage.continueOn(page);
            break;
          case "caseRejected":
            await rejectionDetailsPage.checkPageLoads(
              page,
              caseNumber,
              accessibilityTest,
            );
            if (rejectionReason !== null) {
              await rejectionDetailsPage.continueOn(page, rejectionReason);
            }
            break;
          case "caseStrikeOut":
            await strikeoutDetailsPage.checkPageLoads(
              page,
              caseNumber,
              accessibilityTest,
            );
            if (strikeoutReason !== null) {
              await strikeoutDetailsPage.continueOn(page, strikeoutReason);
            }
            break;
          case "caseConcession":
            await concessionDetailsPage.checkPageLoads(
              page,
              caseNumber,
              accessibilityTest,
            );
            await concessionDetailsPage.continueOn(page);
            break;
          case "consentOrder":
            await consentOrderPage.checkPageLoads(
              page,
              caseNumber,
              accessibilityTest,
            );
            await consentOrderPage.continueOn(page);
            break;
          case "rule27":
            await rule27Page.checkPageLoads(
              page,
              caseNumber,
              accessibilityTest,
            );
            await rule27Page.continueOn(page);
            break;
        }
        await uploadDocumentsPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
        );
        await uploadDocumentsPage.continueOn(page);
        await closeCaseNotifyPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
        );
        await closeCaseNotifyPage.continueOn(page);
        await submitPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          closeReason,
          optionalText,
        );
        await submitPage.checkAllInfo(
          page,
          closeReason,
          optionalText,
          rejectionReason,
          strikeoutReason,
        );
        await submitPage.continueOn(page);
        await confirmPage.checkPageLoads(page, accessibilityTest);
        await confirmPage.closeAndReturnToCase(page);
        await stateTabPage.changeToStateTab(page);
        await stateTabPage.checkStateTab(page, "Case closed");
        break;
      case true:
        await selectReasonPage.triggerErrorMessages(page);
        await selectReasonPage.continueOn(page, "caseWithdrawn", false);
        await withdrawalDetailsPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
        );
        await withdrawalDetailsPage.triggerErrorMessages(page);
        await selectReasonPage.continueOn(page, "caseRejected", false);
        await rejectionDetailsPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
        );
        await rejectionDetailsPage.triggerErrorMessages(page);
        await selectReasonPage.continueOn(page, "caseStrikeOut", false);
        await strikeoutDetailsPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
        );
        await strikeoutDetailsPage.triggerErrorMessages(page);
        await selectReasonPage.continueOn(page, "caseConcession", false);
        await concessionDetailsPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
        );
        await concessionDetailsPage.triggerErrorMessages(page);
        await selectReasonPage.continueOn(page, "consentOrder", false);
        await consentOrderPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
        );
        await consentOrderPage.triggerErrorMessages(page);
        await selectReasonPage.continueOn(page, "rule27", false);
        await rule27Page.checkPageLoads(page, caseNumber, accessibilityTest);
        await rule27Page.triggerErrorMessages(page);
        await uploadDocumentsPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
        );
        await uploadDocumentsPage.triggerErrorMessages(page);
        await closeCaseNotifyPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
        );
        await closeCaseNotifyPage.triggerErrorMessages(page);
        break;
    }
  },
};

export default closeCase;
