import { Page } from "@playwright/test";
import commonHelpers from "../../helpers/commonHelpers.ts";
import addStayPage, {
  StayReason,
} from "../../pages/CaseAPI/createEditStay/addStayPage.ts";
import submitPage from "../../pages/CaseAPI/createEditStay/submitPage.ts";
import confirmPage from "../../pages/CaseAPI/createEditStay/confirmPage.ts";
import summaryTabPage from "../../pages/CaseAPI/caseTabs/summaryTabPage.ts";

type CreateEditStay = {
  createEditStay(
    page: Page,
    accessibilityTest: boolean,
    errorJourney: boolean,
    stayReason: StayReason,
    optionalText: boolean,
    caseNumber: string,
    subjectName: string,
    state: string,
    DSSSubmitted: boolean,
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
    subjectName: string,
    state: string,
    DSSSubmitted: boolean,
  ): Promise<any> {
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Stays: Create/edit stay",
    );
    switch (errorJourney) {
      default:
        await addStayPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          subjectName,
        );
        await addStayPage.continueOn(page, stayReason, optionalText);
        await submitPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          stayReason,
          optionalText,
          subjectName,
        );
        await submitPage.checkValidInfo(page, stayReason, optionalText);
        await submitPage.continueOn(page);
        await confirmPage.checkPageLoads(
          page,
          accessibilityTest,
          caseNumber,
          subjectName,
          DSSSubmitted,
        );
        await confirmPage.closeAndReturnToCase(page);
        await summaryTabPage.changeToSummaryTab(page);
        await summaryTabPage.checkStayDetails(
          page,
          stayReason,
          optionalText,
          state,
        );
        break;
      case true:
        await addStayPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          subjectName,
        );
        await addStayPage.triggerErrorMessages(page);
        await submitPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          stayReason,
          optionalText,
          subjectName,
        );
        await submitPage.checkValidInfo(page, stayReason, optionalText);
        await submitPage.continueOn(page);
        await confirmPage.checkPageLoads(
          page,
          accessibilityTest,
          caseNumber,
          subjectName,
          DSSSubmitted,
        );
        await confirmPage.closeAndReturnToCase(page);
        await summaryTabPage.changeToSummaryTab(page);
        await summaryTabPage.checkStayDetails(
          page,
          stayReason,
          optionalText,
          state,
        );
        break;
    }
  },
};

export default createEditStay;
