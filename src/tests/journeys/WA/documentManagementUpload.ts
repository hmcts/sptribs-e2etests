import { Page } from "@playwright/test";
import uploadCaseDocumentsPage from "../../pages/CaseAPI/documentManagementUpload/uploadCaseDocumentsPage.ts";
import submitPage from "../../pages/CaseAPI/documentManagementUpload/submitPage.ts";
import confirmPage from "../../pages/CaseAPI/documentManagementUpload/confirmPage.ts";

type DocumentManagementUpload = {
  documentManagementUpload(
    page: Page,
    accessibilityTest: boolean,
    multipleDocuments: boolean,
    errorMessaging: boolean,
    caseNumber: string,
  ): Promise<void>;
};

const documentManagementUpload: DocumentManagementUpload = {
  async documentManagementUpload(
    page: Page,
    accessibilityTest: boolean,
    multipleDocuments: boolean,
    errorMessaging: boolean,
    caseNumber: string,
  ): Promise<void> {
    await uploadCaseDocumentsPage.checkPageLoads(
      page,
      caseNumber,
      accessibilityTest,
    );
    if (errorMessaging) {
      await uploadCaseDocumentsPage.triggerErrorMessages(page);
    }
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
  },
};

export default documentManagementUpload;
