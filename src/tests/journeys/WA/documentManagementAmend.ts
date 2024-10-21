import { Page } from "@playwright/test";
import selectCaseDocumentsPage from "../../pages/CaseAPI/documentManagementAmend/selectCaseDocumentsPage.ts";
import amendDocumentsPage from "../../pages/CaseAPI/documentManagementAmend/amendCaseDocumentsPage.ts";
import submitPage from "../../pages/CaseAPI/documentManagementAmend/submitPage.ts";
import confirmPage from "../../pages/CaseAPI/documentManagementAmend/confirmPage.ts";

type DocumentManagementAmend = {
  documentManagementAmend(
    page: Page,
    accessibilityTest: boolean,
    caseNumber: string,
  ): Promise<void>;
};

const documentManagementAmend: DocumentManagementAmend = {
  async documentManagementAmend(
    page: Page,
    accessibilityTest: boolean,
    caseNumber: string,
  ): Promise<void> {
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
  },
};

export default documentManagementAmend;
