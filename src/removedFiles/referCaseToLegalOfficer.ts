import { Page } from "@playwright/test";
import config, { UserRole } from "../tests/config.ts";
import hearingOptions from "../tests/journeys/CaseAPI/hearingOptions.ts";
import commonHelpers, { allEvents } from "../tests/helpers/commonHelpers.ts";
import buildCase from "./buildCase.ts";
import closeCase from "./closeCase.ts";
import createEditStay from "../tests/journeys/CaseAPI/createEditStay.ts";
import createListing from "./createListing.ts";
import createSummary from "../tests/journeys/CaseAPI/createSummary.ts";
import { initialState } from "./referCaseToJudge.ts";
import { referralReason } from "../tests/pages/CaseAPI/referCaseToJudge/referCaseToJudgeReasonPage.ts";
import referCaseToLegalOfficerReasonPage from "../tests/pages/CaseAPI/referCaseToLegalOfficer/referCaseToLegalOfficerReasonPage.ts";
import referCaseToLegalOfficerAdditionalInfoPage from "../tests/pages/CaseAPI/referCaseToLegalOfficer/referCaseToLegalOfficerAdditionalInfoPage.ts";
import submitPage from "../tests/pages/CaseAPI/referCaseToLegalOfficer/submitPage.ts";
import historyTabPage from "../tests/pages/CaseAPI/caseTabs/historyTabPage.ts";
import caseReferralsTabPage from "../tests/pages/CaseAPI/caseTabs/caseReferralsTabPage.ts";
import confirmPage from "../tests/pages/CaseAPI/referCaseToLegalOfficer/confirmPage.ts";

type ReferCaseToLegalOfficer = {
  referCaseToLegalOfficer(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
    initialState: initialState,
    referralReason: referralReason,
    errorMessaging: boolean,
  ): Promise<void>;
};

const referCaseToLegalOfficer: ReferCaseToLegalOfficer = {
  async referCaseToLegalOfficer(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
    initialState: initialState,
    referralReason: referralReason,
    errorMessaging: boolean,
  ): Promise<void> {
    let caseNumber: string | void;
    switch (initialState) {
      default: // Defaults to Case management
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
      case "Awaiting hearing":
        caseNumber = await createListing.createListing(
          page,
          "caseWorker",
          false,
          true,
          "1-London",
          "Case management",
          "Face to Face",
          "Morning",
          false,
          false,
          "East London Tribunal Hearing Centre-2 Clove Crescent, East India Dock London",
          false,
        );
        break;
      case "Awaiting outcome":
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
        break;
      case "Case stayed":
        caseNumber = await createEditStay.createEditStay(
          page,
          false,
          "Case Management",
          "caseWorker",
          false,
          "waitingOutcomeOfCivilCase",
          true,
        );
        break;
      case "Case closed":
        caseNumber = await closeCase.closeCase(
          page,
          "caseWorker",
          false,
          "Case Management",
          false,
          "caseWithdrawn",
          true,
          null,
          null,
        );
        break;
    }
    if (caseNumber !== undefined) {
      await commonHelpers.signOutAndGoToCase(
        page,
        user,
        config.CaseAPIBaseURL,
        caseNumber,
      );
      await commonHelpers.chooseEventFromDropdown(
        page,
        "Refer case to legal officer",
      );
      switch (errorMessaging) {
        default:
          await referCaseToLegalOfficerReasonPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
          );
          await referCaseToLegalOfficerReasonPage.fillFields(
            page,
            referralReason,
          );
          await referCaseToLegalOfficerReasonPage.continueOn(page);
          await referCaseToLegalOfficerAdditionalInfoPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
          );
          await referCaseToLegalOfficerAdditionalInfoPage.fillFields(page);
          await referCaseToLegalOfficerAdditionalInfoPage.continueOn(page);
          await submitPage.checkPageLoads(
            page,
            caseNumber,
            referralReason,
            accessibilityTest,
          );
          await submitPage.checkAndFillInfo(page, referralReason);
          await submitPage.continueOn(page);
          await confirmPage.checkPageLoads(page, caseNumber, accessibilityTest);
          await confirmPage.continueOn(page);
          await historyTabPage.checkPageLoads(
            page,
            accessibilityTest,
            caseNumber,
            initialState,
          );
          await historyTabPage.checkReferral(page);
          await caseReferralsTabPage.changeToCaseReferralsTab(page);
          await caseReferralsTabPage.checkPageLoads(
            page,
            accessibilityTest,
            caseNumber,
            referralReason,
          );
          await caseReferralsTabPage.checkValidInfo(page, referralReason);
          break;
        case true:
          await referCaseToLegalOfficerReasonPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
          );
          await referCaseToLegalOfficerReasonPage.triggerErrorMessages(page);
          break;
      }
    } else {
      throw new Error("Case number is undefined.");
    }
  },
};

export default referCaseToLegalOfficer;
