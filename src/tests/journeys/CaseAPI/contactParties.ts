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
import confirmPage from "../../pages/CaseAPI/contactParties/confirmPage.ts";
import createCase from "./createCase.ts";

type ContactParties = {
  contactParties(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
    initialState: State,
    errorMessaging: boolean,
  ): Promise<void>;
};

const contactParties: ContactParties = {
  async contactParties(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
    initialState: State,
    errorMessaging,
  ): Promise<void> {
    let caseNumber: string | void = "";
    switch (initialState) {
      default: // Case Management
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
      case "Submitted":
        caseNumber = await createCase.createCase(
          page,
          "caseWorker",
          false,
          "Assessment",
          "Other",
          true,
          true,
          "Email",
          true,
          false,
          "1996",
          "Scotland",
          true,
          true,
          true,
          true,
          true,
          false,
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
    if (user == "respondent") {
      await commonHelpers.chooseEventFromDropdown(
        page,
        "Case: CICA Contact parties",
      );
    } else {
      await commonHelpers.chooseEventFromDropdown(
        page,
        "Case: Contact parties",
      );
    }
    await selectDocumentsPage.checkPageLoads(
      page,
      caseNumber,
      accessibilityTest,
    );
    await selectDocumentsPage.tickCheckbox(page);
    await selectDocumentsPage.continueOn(page);
    await partiesToContactPage.checkPageLoads(
      page,
      caseNumber,
      user,
      accessibilityTest,
    );
    switch (errorMessaging) {
      default:
        await partiesToContactPage.tickCheckBoxes(page, true, user);
        await partiesToContactPage.fillInFields(page);
        await partiesToContactPage.continueOn(page);
        await submitPage.checkPageLoads(page, caseNumber, accessibilityTest);
        await submitPage.checkValidInfo(page, user);
        await submitPage.continueOn(page);
        await confirmPage.checkPageLoads(page, caseNumber, accessibilityTest);
        await confirmPage.continueOn(page);
        break;
      case true:
        await partiesToContactPage.tickCheckBoxes(page, false, user);
        await partiesToContactPage.triggerErrorMessages(page);
        break;
    }
  },
};
export default contactParties;
