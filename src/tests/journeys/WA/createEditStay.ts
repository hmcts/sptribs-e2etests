import { Page } from "@playwright/test";
import commonHelpers, { allEvents } from "../../helpers/commonHelpers.ts";
import addStayPage, {
  StayReason,
} from "../../pages/CaseAPI/createEditStay/addStayPage.ts";
import submitPage from "../../pages/CaseAPI/createEditStay/submitPage.ts";
import confirmPage from "../../pages/CaseAPI/createEditStay/confirmPage.ts";
import summaryTabPage from "../../pages/CaseAPI/caseTabs/summaryTabPage.ts";
import stateTabPage from "../../pages/CaseAPI/caseTabs/stateTabPage.ts";

type CreateEditStay = {
  createEditStay(
    page: Page,
    accessibilityTest: boolean,
    errorJourney: boolean,
    stayReason: StayReason,
    optionalText: boolean,
    caseNumber: string,
  ): Promise<any>;
};

const createEditStay: CreateEditStay = {
  async createEditStay(
    page: Page,
    accessibilityTest: boolean,
    errorJourney: boolean,
    stayReason: StayReason,
    optionalText: boolean,
    caseNumber: string,
  ): Promise<any> {
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Stays: Create/edit stay",
    );
    switch (errorJourney) {
      default:
        await addStayPage.checkPageLoads(page, caseNumber, accessibilityTest);
        await addStayPage.continueOn(page, stayReason, optionalText);
        await submitPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          stayReason,
          optionalText,
        );
        await submitPage.checkValidInfo(page, stayReason, optionalText);
        await submitPage.continueOn(page);
        await confirmPage.checkPageLoads(page, accessibilityTest);
        await confirmPage.closeAndReturnToCase(page);
        await summaryTabPage.changeToSummaryTab(page);
        await summaryTabPage.checkStayDetails(page, stayReason, optionalText);
        await stateTabPage.changeToStateTab(page);
        await stateTabPage.checkStateTab(page, "Case stayed");
        break;
      case true:
        await addStayPage.checkPageLoads(page, caseNumber, accessibilityTest);
        await addStayPage.triggerErrorMessages(page);
        break;
    }
  },
};

export default createEditStay;
