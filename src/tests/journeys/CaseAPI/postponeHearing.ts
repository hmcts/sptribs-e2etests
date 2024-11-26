import { Page } from "@playwright/test";
import commonHelpers, {
  hearingPostponedReasons,
} from "../../helpers/commonHelpers.ts";
import postponeHearingSelectHearingPage from "../../pages/CaseAPI/postponeHearing/postponeHearingSelectHearingPage.ts";
import postponeHearingReasonPage from "../../pages/CaseAPI/postponeHearing/postponeHearingReasonPage.ts";
import postponeHearingNotifyPage from "../../pages/CaseAPI/postponeHearing/postponeHearingNotifyPage.ts";
import submitPage from "../../pages/CaseAPI/postponeHearing/submitPage.ts";
import confirmPage from "../../pages/CaseAPI/postponeHearing/confirmPage.ts";
import hearingsTabPage from "../../pages/CaseAPI/caseTabs/hearingsTabPage.ts";
import hearingTabPage from "../../pages/CaseAPI/caseTabs/hearingsTabPage.ts";

type PostponeHearing = {
  postponeHearing(
    page: Page,
    accessibilityTest: boolean,
    reasonPostponed: hearingPostponedReasons,
    errorMessaging: boolean,
    caseNumber: string,
    subjectName: string,
  ): Promise<void>;
};

const postponeHearing: PostponeHearing = {
  async postponeHearing(
    page: Page,
    accessibilityTest: boolean,
    reasonPostponed: hearingPostponedReasons,
    errorMessaging: boolean,
    caseNumber: string,
    subjectName: string,
  ): Promise<void> {
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Hearings: Postpone hearing",
    );
    switch (errorMessaging) {
      default:
        await postponeHearingSelectHearingPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          subjectName,
        );
        const hearing =
          await postponeHearingSelectHearingPage.fillInFields(page);
        await postponeHearingSelectHearingPage.continueOn(page);
        await postponeHearingReasonPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          subjectName,
        );
        await postponeHearingReasonPage.fillInFields(page, reasonPostponed);
        await postponeHearingReasonPage.continueOn(page);
        await postponeHearingNotifyPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          subjectName,
        );
        await postponeHearingNotifyPage.continueOn(page);
        await submitPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          subjectName,
        );
        await submitPage.checkValidInfo(page, hearing, reasonPostponed);
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
        //   false,
        //   true,
        //   false,
        //   accessibilityTest,
        // );
        // await hearingTabPage.checkValidInfoPostponeHearing(
        //   page,
        //   reasonPostponed,
        //   "2-Midlands",
        //   "Final",
        //   "Paper",
        //   "Morning",
        //   "Birmingham Civil And Family Justice Centre-Priory Courts, 33 Bull Street",
        // );
        break;
      case true:
        await postponeHearingSelectHearingPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          subjectName,
        );
        await postponeHearingSelectHearingPage.triggerErrorMessages(page);
        await postponeHearingSelectHearingPage.fillInFields(page);
        await postponeHearingSelectHearingPage.continueOn(page);
        await postponeHearingReasonPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          subjectName,
        );
        await postponeHearingReasonPage.triggerErrorMessages(page);
        await postponeHearingReasonPage.fillInFields(page, reasonPostponed);
        await postponeHearingReasonPage.continueOn(page);
        break;
    }
  },
};

export default postponeHearing;
