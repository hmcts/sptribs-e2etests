import { Page } from "@playwright/test";
import commonHelpers from "../../helpers/commonHelpers.ts";
import events_content from "../../fixtures/content/CaseAPI/events_content.ts";
import removeStayPage, {
  RemoveReason,
} from "../../pages/CaseAPI/removeStay/removeStayPage.ts";
import submitPage from "../../pages/CaseAPI/removeStay/submitPage.ts";
import confirmPage from "../../pages/CaseAPI/removeStay/confirmPage.ts";
import summaryTabPage from "../../pages/CaseAPI/caseTabs/summaryTabPage.ts";

type RemoveStay = {
  removeStay(
    page: Page,
    accessibilityTest: boolean,
    removeReason: RemoveReason,
    optionalText: boolean,
    errorJourney: boolean,
    caseNumber: string,
    subjectName: string,
    state: string,
  ): Promise<void>;
};

const removeStay: RemoveStay = {
  async removeStay(
    page: Page,
    accessibilityTest: boolean,
    removeReason: RemoveReason,
    optionalText: boolean,
    errorJourney: boolean,
    caseNumber: string,
    subjectName: string,
    state: string,
  ): Promise<void> {
    await commonHelpers.chooseEventFromDropdown(
      page,
      events_content.removeStay,
    );
    switch (errorJourney) {
      default:
        await removeStayPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          subjectName,
        );
        await removeStayPage.continueOn(page, removeReason, optionalText);
        await submitPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          removeReason,
          optionalText,
          subjectName,
        );
        await submitPage.continueOn(page);
        await confirmPage.checkPageLoads(
          page,
          accessibilityTest,
          caseNumber,
          subjectName,
        );
        await confirmPage.closeAndReturnToCase(page);
        await summaryTabPage.changeToSummaryTab(page);
        await summaryTabPage.checkRemoveStayDetails(
          page,
          removeReason,
          optionalText,
          state,
        );
        break;
      case true:
        await removeStayPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          subjectName,
        );
        await removeStayPage.triggerErrorMessages(page);
    }
  },
};

export default removeStay;
