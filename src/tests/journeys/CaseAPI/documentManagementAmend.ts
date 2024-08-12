import { Page } from "@playwright/test";
import config, { UserRole } from "../../config.ts";
import commonHelpers, { State } from "../../helpers/commonHelpers.ts";
import documentManagementUpload from "./documentManagementUpload.ts";
import selectCaseDocumentsPage from "../../pages/CaseAPI/documentManagementAmend/selectCaseDocumentsPage.ts";
import amendDocumentsPage from "../../pages/CaseAPI/documentManagementAmend/amendCaseDocumentsPage.ts";
import submitPage from "../../pages/CaseAPI/documentManagementAmend/submitPage.ts";
import confirmPage from "../../pages/CaseAPI/documentManagementAmend/confirmPage.ts";
import caseDocumentsTabPage from "../../pages/CaseAPI/caseTabs/caseDocumentsTabPage.ts";
import amendCaseDocuments_content from "../../fixtures/content/CaseAPI/documentManagementAmend/amendCaseDocuments_content.ts";

type DocumentManagementAmend = {
  documentManagementAmend(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
    initialState: State,
    multipleDocuments: boolean,
  ): Promise<void>;
};

const documentManagementAmend: DocumentManagementAmend = {
  async documentManagementAmend(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
    initialState: State,
    multipleDocuments: boolean,
  ): Promise<void> {
    let caseNumber: string | void;
    switch (initialState) {
      default: // Defaults to Submitted
        caseNumber = await documentManagementUpload.documentManagementUpload(
          page,
          user,
          false,
          "Submitted",
          multipleDocuments,
          false,
        );
        break;
      case "Case Management":
        caseNumber = await documentManagementUpload.documentManagementUpload(
          page,
          user,
          false,
          "Case Management",
          multipleDocuments,
          false,
        );
        break;
      case "Ready to list":
        caseNumber = await documentManagementUpload.documentManagementUpload(
          page,
          user,
          false,
          "Ready to list",
          multipleDocuments,
          false,
        );
        break;
      case "Awaiting Hearing":
        caseNumber = await documentManagementUpload.documentManagementUpload(
          page,
          user,
          false,
          "Awaiting hearing",
          multipleDocuments,
          false,
        );
        break;
      case "Awaiting Outcome":
        caseNumber = await documentManagementUpload.documentManagementUpload(
          page,
          user,
          false,
          "Awaiting outcome",
          multipleDocuments,
          false,
        );
        break;
      case "Case closed":
        caseNumber = await documentManagementUpload.documentManagementUpload(
          page,
          user,
          false,
          "Case closed",
          multipleDocuments,
          false,
        );
        break;
      case "Case Stayed":
        caseNumber = await documentManagementUpload.documentManagementUpload(
          page,
          user,
          false,
          "Case stayed",
          multipleDocuments,
          false,
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
        "Document management: Amend",
      );
      await selectCaseDocumentsPage.checkPageLoads(
        page,
        caseNumber,
        accessibilityTest,
      );
      await selectCaseDocumentsPage.fillFields(page);
      await selectCaseDocumentsPage.continueOn(page);

      await amendDocumentsPage.checkPageLoads(
        page,
        caseNumber,
        accessibilityTest,
      );
      await amendDocumentsPage.fillFields(page);
      await amendDocumentsPage.continueOn(page);
      await submitPage.checkPageLoads(page, caseNumber, accessibilityTest);
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
        amendCaseDocuments_content.category,
        amendCaseDocuments_content.message,
        true,
      );
    }
  },
};

export default documentManagementAmend;
