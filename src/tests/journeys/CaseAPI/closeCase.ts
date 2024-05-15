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
    rejectionReason: RejectionReason,
    strikeoutReason: StrikeoutReason,
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
    rejectionReason: RejectionReason,
    strikeoutReason: StrikeoutReason,
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
            await rejectionDetailsPage.continueOn(page, rejectionReason);
            break;
          case "caseStrikeOut":
            await strikeoutDetailsPage.checkPageLoads(
              page,
              caseNumber,
              accessibilityTest,
            );
            await strikeoutDetailsPage.continueOn(page, strikeoutReason);
            break;
          case "caseConcession":
            break;
          case "consentOrder":
            break;
          case "rule27":
            break;
        }
        break;
      case true:
        await selectReasonPage.triggerErrorMessages(page);
        await selectReasonPage.continueOn(page, closeReason, false);
        switch (closeReason) {
          default:
            await withdrawalDetailsPage.checkPageLoads(
              page,
              caseNumber,
              accessibilityTest,
            );
            await withdrawalDetailsPage.triggerErrorMessages(page);
            break;
          case "caseRejected":
            await rejectionDetailsPage.checkPageLoads(
              page,
              caseNumber,
              accessibilityTest,
            );
            await rejectionDetailsPage.triggerErrorMessages(page);
            break;
          case "caseStrikeOut":
            await strikeoutDetailsPage.checkPageLoads(
              page,
              caseNumber,
              accessibilityTest,
            );
            await strikeoutDetailsPage.triggerErrorMessages(page);
            break;
          case "caseConcession":
            break;
          case "consentOrder":
            break;
          case "rule27":
            break;
        }
        break;
    }
  },
};

export default closeCase;
