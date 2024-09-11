import { Page } from "@playwright/test";
import config, { UserRole } from "../../config.ts";
import commonHelpers, { allEvents } from "../../helpers/commonHelpers.ts";
import buildCase from "../../../removedFiles/buildCase.ts";
import createListing from "./createListing.ts";
import createSummary from "./createSummary.ts";
import createEditStay from "./createEditStay.ts";
import closeCase from "./closeCase.ts";
import editCICACaseDetailsEditCaseDetailsPage from "../../pages/CaseAPI/editCICACaseDetails/editCICACaseDetailsEditCaseDetailsPage.ts";
import submitPage from "../../pages/CaseAPI/editCICACaseDetails/submitPage.ts";
import confirmPage from "../../pages/CaseAPI/editCICACaseDetails/confirmPage.ts";
import CICADetailsTabPage from "../../pages/CaseAPI/caseTabs/CICADetailsTabPage.ts";

type initialState =
  | "Case Management"
  | "Awaiting hearing"
  | "Awaiting outcome"
  | "Case stayed"
  | "Case closed";

type EditCICACaseDetails = {
  editCICACaseDetails(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
    initialState: initialState,
  ): Promise<void>;
};

const editCICACaseDetails: EditCICACaseDetails = {
  async editCICACaseDetails(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
    initialState: initialState,
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
        "Case: Edit case details",
      );
      await editCICACaseDetailsEditCaseDetailsPage.checkPageLoads(
        page,
        caseNumber,
        accessibilityTest,
      );
      await editCICACaseDetailsEditCaseDetailsPage.fillFields(page);
      await editCICACaseDetailsEditCaseDetailsPage.continueOn(page);
      await submitPage.checkPageLoads(page, caseNumber, accessibilityTest);
      await submitPage.checkValidInfo(page);
      await submitPage.continueOn(page);
      await confirmPage.checkPageLoads(page, caseNumber, accessibilityTest);
      await confirmPage.continueOn(page);
      await CICADetailsTabPage.changeToCICADetailsTab(page);
      await CICADetailsTabPage.checkPageLoads(
        page,
        accessibilityTest,
        caseNumber,
      );
      await CICADetailsTabPage.checkValidInfo(page);
    } else {
      throw new Error("Case number is undefined.");
    }
  },
};

export default editCICACaseDetails;
