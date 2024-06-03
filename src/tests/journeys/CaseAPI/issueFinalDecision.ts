import { Page } from "@playwright/test";
import config, { UserRole } from "../../config.ts";
import createSummary from "./createSummary.ts";
import commonHelpers from "../../helpers/commonHelpers.ts";
import noticeOptionPage, {
  NoticeType,
} from "../../pages/CaseAPI/issueFinalDecision/noticeOptionPage.ts";

type IssueFinalDecision = {
  issueFinalDecision(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
    errorMessaging: boolean,
    noticeType: NoticeType,
  ): Promise<string | void>;
};

const issueFinalDecision: IssueFinalDecision = {
  async issueFinalDecision(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
    errorMessaging: boolean,
    noticeType: NoticeType,
  ): Promise<string | void> {
    let caseNumber: string | void;
    caseNumber = await createSummary.createSummary(
      page,
      "caseWorker",
      false,
      "Case management",
      "Hybrid",
      "Morning",
      false,
      "Fox Court - London (Central) SSCS Tribunal-4th Floor, Fox Court, 30 Brooke Street, London",
      "Fox Court",
      "Allowed",
      null,
      true,
      false,
      false,
    );
    if (typeof caseNumber === "undefined") {
      return "Error accessing case.";
    } else {
      await commonHelpers.signOutAndGoToCase(
        page,
        user,
        config.CaseAPIBaseURL,
        caseNumber,
      );
      await commonHelpers.chooseEventFromDropdown(
        page,
        "Decision: Issue final decision",
      );
      switch (errorMessaging) {
        default:
          await noticeOptionPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
          );
          await noticeOptionPage.fillInFields(page, noticeType);
          break;

        case true:
          await noticeOptionPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
          );
          await noticeOptionPage.triggerErrorMessages(page);
          break;
      }

      return caseNumber;
    }
  },
};

export default issueFinalDecision;
