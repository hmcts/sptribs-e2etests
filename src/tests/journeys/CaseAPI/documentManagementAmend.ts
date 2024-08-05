import { Page } from "@playwright/test";
import config, { UserRole } from "../../config.ts";
import commonHelpers, { State } from "../../helpers/commonHelpers.ts";
import documentManagementUpload from "./documentManagementUpload.ts";
import selectCaseDocumentsPage from "../../pages/CaseAPI/documentManagementAmend/selectCaseDocumentsPage.ts";
import amendDocumentsPage from "../../pages/CaseAPI/documentManagementAmend/amendCaseDocumentsPage.ts";
import submitPage from "../../pages/CaseAPI/documentManagementAmend/submitPage.ts";
import confirmPage from "../../pages/CaseAPI/documentManagementAmend/confirmPage.ts";

type DocumentManagementAmend = {
  documentManagementAmend(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
    initialState: State,
  ): Promise<void>;
};

const documentManagementAmend: DocumentManagementAmend = {
  async documentManagementAmend(page, user, accessibilityTest, initialState) {
    let caseNumber: string | void;
    switch (initialState) {
      default: // Defaults to Submitted
        caseNumber = await documentManagementUpload.documentManagementUpload(
          page,
          "caseWorker",
          false,
          "Submitted",
          false,
          false,
        );
        break;
      case "Case Management":
        caseNumber = await documentManagementUpload.documentManagementUpload(
          page,
          "seniorCaseworker",
          false,
          "Case Management",
          true,
          false,
        );
        break;
      case "Ready to list":
        caseNumber = await documentManagementUpload.documentManagementUpload(
          page,
          "hearingCentreAdmin",
          false,
          "Ready to list",
          false,
          false,
        );
        break;
      case "Awaiting Hearing":
        caseNumber = await documentManagementUpload.documentManagementUpload(
          page,
          "hearingCentreTeamLead",
          false,
          "Awaiting hearing",
          true,
          false,
        );
        break;
      case "Awaiting Outcome":
        caseNumber = await documentManagementUpload.documentManagementUpload(
          page,
          "seniorJudge",
          false,
          "Awaiting outcome",
          false,
          false,
        );
        break;
      case "Case closed":
        caseNumber = await documentManagementUpload.documentManagementUpload(
          page,
          "respondent",
          false,
          "Case closed",
          true,
          false,
        );
        break;
      case "Case Stayed":
        caseNumber = await documentManagementUpload.documentManagementUpload(
          page,
          "caseWorker",
          false,
          "Case stayed",
          false,
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
    }
  },
};

export default documentManagementAmend;
