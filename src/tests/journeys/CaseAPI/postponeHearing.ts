import { Page } from "@playwright/test";
import { UserRole } from "../../config.ts";
import createListing from "./createListing.ts";
import commonHelpers, {
  hearingPostponedReasons,
} from "../../helpers/commonHelpers.ts";
import postponeHearingSelectHearingPage from "../../pages/CaseAPI/postponeHearing/postponeHearingSelectHearingPage.ts";
import postponeHearingReasonPage from "../../pages/CaseAPI/postponeHearing/postponeHearingReasonPage.ts";
import postponeHearingNotifyPage from "../../pages/CaseAPI/postponeHearing/postponeHearingNotifyPage.ts";
import submitPage from "../../pages/CaseAPI/postponeHearing/submitPage.ts";
import confirmPage from "../../pages/CaseAPI/postponeHearing/confirmPage.ts";

type PostponeHearing = {
  postponeHearing(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
    reasonPostponed: hearingPostponedReasons,
    errorMessaging: boolean,
  ): Promise<void>;
};

const postponeHearing: PostponeHearing = {
  async postponeHearing(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
    reasonPostponed: hearingPostponedReasons,
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
      "Hearings: Postpone hearing",
    );
    if (caseNumber !== undefined) {
      switch (errorMessaging) {
        default:
          await postponeHearingSelectHearingPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
          );
          const hearing =
            await postponeHearingSelectHearingPage.fillInFields(page);
          await postponeHearingSelectHearingPage.continueOn(page);
          await postponeHearingReasonPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
          );
          await postponeHearingReasonPage.fillInFields(page, reasonPostponed);
          await postponeHearingReasonPage.continueOn(page);
          await postponeHearingNotifyPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
          );
          await postponeHearingNotifyPage.continueOn(page);
          await submitPage.checkPageLoads(page, caseNumber, accessibilityTest);
          await submitPage.checkValidInfo(page, hearing, reasonPostponed);
          await submitPage.continueOn(page);
          await confirmPage.checkPageLoads(page, caseNumber, accessibilityTest);
          await confirmPage.continueOn(page);

          break;
        case true:
          await postponeHearingSelectHearingPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
          );
          await postponeHearingSelectHearingPage.triggerErrorMessages(page);
          await postponeHearingSelectHearingPage.fillInFields(page);
          await postponeHearingSelectHearingPage.continueOn(page);
          await postponeHearingReasonPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
          );
          await postponeHearingReasonPage.triggerErrorMessages(page);
          await postponeHearingReasonPage.fillInFields(page, reasonPostponed);
          await postponeHearingReasonPage.continueOn(page);
          break;
      }
    }
  },
};

export default postponeHearing;
