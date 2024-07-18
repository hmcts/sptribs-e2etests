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
    let caseNumber: string = "";
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
        break;
      case "Awaiting Hearing":
        break;
      case "Awaiting Outcome":
        break;
      case "Case closed":
        break;
      case "Case Stayed":
        break;
    }
    // await commonHelpers.signOutAndGoToCase(
    //   page,
    //   user,
    //   config.CaseAPIBaseURL,
    //   caseNumber,
    // );
    await commonHelpers.chooseEventFromDropdown(page, "Case: Contact parties");
    await selectDocumentsPage.checkPageLoads(page, caseNumber, false);
    await selectDocumentsPage.tickCheckbox(page);
    await selectDocumentsPage.continueOn(page);

    await partiesToContactPage.checkPageLoads(page, false);
    await partiesToContactPage.tickCheckBoxes(page);
    await partiesToContactPage.fillInFields(page);

    await submitPage.checkPageLoads(page, caseNumber, false);
    await submitPage.checkValidInfo(page);
  },
};
export default contactParties;
