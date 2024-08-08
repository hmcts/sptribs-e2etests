import { Page } from "@playwright/test";
import config, { UserRole } from "../../config.ts";
import commonHelpers, { allEvents } from "../../helpers/commonHelpers.ts";
import buildCase from "./buildCase.ts";
import hearingOptions from "./hearingOptions.ts";
import createListing from "./createListing.ts";
import createSummary from "./createSummary.ts";
import createEditStay from "./createEditStay.ts";
import closeCase from "./closeCase.ts";
import createCase from "./createCase.ts";
import uploadCaseDocumentsPage from "../../pages/CaseAPI/documentManagementUpload/uploadCaseDocumentsPage.ts";
import submitPage from "../../pages/CaseAPI/documentManagementUpload/submitPage.ts";
import confirmPage from "../../pages/CaseAPI/documentManagementUpload/confirmPage.ts";
import caseDocumentsTabPage from "../../pages/CaseAPI/caseTabs/caseDocumentsTabPage.ts";
import submit_content from "../../fixtures/content/CaseAPI/documentManagementUpload/submit_content.ts";

type initialState =
  | "Submitted"
  | "Case Management"
  | "Ready to list"
  | "Awaiting hearing"
  | "Awaiting outcome"
  | "Case stayed"
  | "Case closed";

type DocumentManagementUpload = {
  documentManagementUpload(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
    initialState: initialState,
    multipleDocuments: boolean,
    errorMessaging: boolean,
  ): Promise<void | string>;
};

const documentManagementUpload: DocumentManagementUpload = {
  async documentManagementUpload(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
    initialState: initialState,
    multipleDocuments: boolean,
    errorMessaging: boolean,
  ): Promise<void | string> {
    let caseNumber: string | void;
    switch (initialState) {
      default: // Defaults to Submitted
        caseNumber = await createCase.createCase(
          page,
          user,
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
      case "Case Management":
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
        "Document management: Upload",
      );
      await uploadCaseDocumentsPage.checkPageLoads(
        page,
        caseNumber,
        accessibilityTest,
      );
      switch (errorMessaging) {
        default:
          await uploadCaseDocumentsPage.fillFields(page, multipleDocuments);
          await uploadCaseDocumentsPage.continueOn(page);
          await submitPage.checkPageLoads(
            page,
            caseNumber,
            multipleDocuments,
            accessibilityTest,
          );
          await submitPage.checkValidInfo(page, multipleDocuments);
          await submitPage.continueOn(page);
          await confirmPage.checkPageLoads(page, caseNumber, accessibilityTest);
          await confirmPage.continueOn(page);
          await caseDocumentsTabPage.changeToCaseDocumentsTab(page);
          await caseDocumentsTabPage.checkPageLoads(
            page,
            accessibilityTest,
            caseNumber,
            multipleDocuments,
            false,
            true,
            user,
          );
          await caseDocumentsTabPage.docManagementUploadCheckInfo(
            page,
            multipleDocuments,
            user,
            submit_content.category,
            submit_content.message
          );
          break;
        case true:
          await uploadCaseDocumentsPage.triggerErrorMessages(page);
          break;
      }
    }
    return caseNumber;
  },
};

export default documentManagementUpload;
