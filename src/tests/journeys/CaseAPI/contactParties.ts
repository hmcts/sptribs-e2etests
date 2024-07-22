import { Page } from "@playwright/test";
import config, { UserRole } from "../../config.ts";
import commonHelpers, {
  allEvents,
  State,
} from "../../helpers/commonHelpers.ts";
import createDraft from "./createDraft.ts";
import closeCase from "./closeCase.ts";
import buildCase from "./buildCase.ts";
import selectDocumentsPage from "../../pages/CaseAPI/contactParties/selectDocumentsPage.ts";
import partiesToContactPage from "../../pages/CaseAPI/contactParties/partiesToContactPage.ts";
import submitPage from "../../pages/CaseAPI/contactParties/submitPage.ts";
import hearingOptions from "./hearingOptions.ts";
import createListing from "./createListing.ts";
import createSummary from "./createSummary.ts";
import createEditStay from "./createEditStay.ts";

type ContactParties = {
  contactParties(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
    initialState: State,
  ): Promise<void>;
};

const contactParties: ContactParties = {
  async contactParties(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
    initialState: State,
  ): Promise<void> {
    let caseNumber: string | void = "";
    switch (initialState) {
      default: // Defaults to Case Management
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
      case "Draft":
        caseNumber = await createDraft.createDraft(
          page,
          "caseWorker",
          "Case Management",
          false,
          false,
          "CIC3 - Rule 27",
        );
        break;
      case "Withdrawn":
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
      case "Rejected":
        caseNumber = await closeCase.closeCase(
          page,
          "seniorCaseworker",
          false,
          "Case Management",
          false,
          "caseRejected",
          false,
          "createdInError",
          null,
        );
        break;
      case "New case received":
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
      case "Awaiting Hearing":
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
      case "Awaiting Outcome":
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
      case "Case Stayed":
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
    }
    if (typeof caseNumber !== "string") {
      throw new Error(
        "Initial state creation failed: caseNumber cannot be null.",
      );
    }
    await commonHelpers.signOutAndGoToCase(
      page,
      user,
      config.CaseAPIBaseURL,
      caseNumber,
    );
    await commonHelpers.chooseEventFromDropdown(page, "Case: Contact parties");
    await selectDocumentsPage.checkPageLoads(page, caseNumber, false);
    await selectDocumentsPage.tickCheckbox(page);
    await selectDocumentsPage.continueOn(page);

    await partiesToContactPage.checkPageLoads(page, caseNumber, false);
    await partiesToContactPage.tickCheckBoxes(page, false);
    await partiesToContactPage.triggerErrorMessages(page);
    await partiesToContactPage.tickCheckBoxes(page, true);

    await submitPage.checkPageLoads(page, caseNumber, false);
    await submitPage.checkValidInfo(page);
    await submitPage.continueOn(page);
  },
};
export default contactParties;
