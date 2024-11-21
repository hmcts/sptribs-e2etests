import { Page } from "@playwright/test";
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
    accessibilityTest: boolean,
    reasonCancelled: hearingCancelledReasons,
    errorMessaging: boolean,
    caseNumber: string,
    subjectName: string,
  ): Promise<void>;
};

const cancelHearing: CancelHearing = {
  async cancelHearing(
    page: Page,
    accessibilityTest: boolean,
    reasonCancelled: hearingCancelledReasons,
    errorMessaging: boolean,
    caseNumber: string,
    subjectName: string,
  ): Promise<void> {
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
            subjectName,
          );
          const hearing =
            await cancelHearingSelectHearingPage.fillInFields(page);
          await cancelHearingSelectHearingPage.continueOn(page);
          await cancelHearingReasonPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
            subjectName,
          );
          await cancelHearingReasonPage.fillInFields(page, reasonCancelled);
          await cancelHearingReasonPage.continueOn(page);
          await cancelHearingNotifyPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
            subjectName,
          );
          await cancelHearingNotifyPage.continueOn(page);
          await submitPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
            subjectName,
          );
          await submitPage.checkValidInfo(page, hearing, reasonCancelled);
          await submitPage.continueOn(page);
          await confirmPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
            subjectName,
          );
          await confirmPage.continueOn(page);
          // await hearingsTabPage.changeToHearingsTab(page);
          // await hearingsTabPage.checkPageLoads(
          //   page,
          //   true,
          //   false,
          //   false,
          //   "Birmingham Civil And Family Justice Centre-Priory Courts, 33 Bull Street",
          //   false,
          //   false,
          //   null,
          //   false,
          //   false,
          //   true,
          //   false,
          //   false,
          //   accessibilityTest,
          // );
          // await hearingTabPage.checkValidInfoCancelHearing(
          //   page,
          //   reasonCancelled,
          //   "2-Midlands",
          //   "Final",
          //   "Paper",
          //   "Morning",
          //   "Birmingham Civil And Family Justice Centre-Priory Courts, 33 Bull Street",
          // );
          break;
        case true:
          await cancelHearingSelectHearingPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
            subjectName,
          );
          await cancelHearingSelectHearingPage.triggerErrorMessages(page);
          await cancelHearingSelectHearingPage.fillInFields(page);
          await cancelHearingSelectHearingPage.continueOn(page);
          await cancelHearingReasonPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
            subjectName,
          );
          await cancelHearingReasonPage.triggerErrorMessages(page);
          await cancelHearingReasonPage.fillInFields(page, reasonCancelled);
          await cancelHearingReasonPage.continueOn(page);
          await cancelHearingNotifyPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
            subjectName,
          );
          await cancelHearingNotifyPage.triggerErrorMessages(page);
          break;
      }
    } else {
      throw new Error("Case number is undefined.");
    }
  },
};

export default cancelHearing;
