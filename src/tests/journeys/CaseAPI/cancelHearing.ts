import { Page } from "@playwright/test";
import { UserRole } from "../../config.ts";
import createListing from "./createListing.ts";
import commonHelpers, {
  hearingCancelledReasons,
} from "../../helpers/commonHelpers.ts";
import cancelHearingSelectHearingPage from "../../pages/CaseAPI/cancelHearing/cancelHearingSelectHearingPage.ts";
import cancelHearingReasonPage from "../../pages/CaseAPI/cancelHearing/cancelHearingReasonPage.ts";
import cancelHearingNotifyPage from "../../pages/CaseAPI/cancelHearing/cancelHearingNotifyPage.ts";
import submitPage from "../../pages/CaseAPI/cancelHearing/submitPage.ts";
import confirmPage from "../../pages/CaseAPI/cancelHearing/confirmPage.ts";
import hearingsTabPage from "../../pages/CaseAPI/caseTabs/hearingsTabPage.ts";
import hearingTabPage from "../../pages/CaseAPI/caseTabs/hearingsTabPage.ts";

type CancelHearing = {
  cancelHearing(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
    reasonCancelled: hearingCancelledReasons,
    errorMessaging: boolean,
  ): Promise<void>;
};

const cancelHearing: CancelHearing = {
  async cancelHearing(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
    reasonCancelled: hearingCancelledReasons,
    errorMessaging: boolean,
  ): Promise<void> {
    let caseNumber: string | void;
    caseNumber = await createListing.createListing(
      page,
      user,
      false,
      true,
      "2-Midlands",
      "Final",
      "Paper",
      "Morning",
      false,
      false,
      "Birmingham Civil And Family Justice Centre-Priory Courts, 33 Bull Street",
      false,
    );
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Hearings: Cancel hearing",
    );
    if (caseNumber !== undefined) {
      switch (errorMessaging) {
        default:
          await cancelHearingSelectHearingPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
          );
          const hearing =
            await cancelHearingSelectHearingPage.fillInFields(page);
          await cancelHearingSelectHearingPage.continueOn(page);
          await cancelHearingReasonPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
          );
          await cancelHearingReasonPage.fillInFields(page, reasonCancelled);
          await cancelHearingReasonPage.continueOn(page);
          await cancelHearingNotifyPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
          );
          await cancelHearingNotifyPage.continueOn(page);
          await submitPage.checkPageLoads(page, caseNumber, accessibilityTest);
          await submitPage.checkValidInfo(page, hearing, reasonCancelled);
          await submitPage.continueOn(page);
          await confirmPage.checkPageLoads(page, caseNumber, accessibilityTest);
          await confirmPage.continueOn(page);
          await hearingsTabPage.changeToHearingsTab(page);
          await hearingsTabPage.checkPageLoads(
            page,
            true,
            false,
            false,
            "Birmingham Civil And Family Justice Centre-Priory Courts, 33 Bull Street",
            false,
            null,
            false,
            false,
            true,
            accessibilityTest,
          );
          await hearingTabPage.checkValidInfoCancelHearing(
            page,
            reasonCancelled,
            true,
            "2-Midlands",
            "Final",
            "Paper",
            "Morning",
            false,
            false,
            "Birmingham Civil And Family Justice Centre-Priory Courts, 33 Bull Street",
          );
          break;
        case true:
          await cancelHearingSelectHearingPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
          );
          await cancelHearingSelectHearingPage.triggerErrorMessages(page);
          await cancelHearingSelectHearingPage.fillInFields(page);
          await cancelHearingSelectHearingPage.continueOn(page);
          await cancelHearingReasonPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
          );
          await cancelHearingReasonPage.triggerErrorMessages(page);
          await cancelHearingReasonPage.fillInFields(page, reasonCancelled);
          await cancelHearingReasonPage.continueOn(page);
          await cancelHearingNotifyPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
          );
          await cancelHearingNotifyPage.triggerErrorMessages(page);
          break;
      }
    }
  },
};

export default cancelHearing;
