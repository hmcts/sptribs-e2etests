import { Page } from "@playwright/test";
import { UserRole } from "../../config.ts";
import historyTabPage from "../../pages/CaseAPI/caseTabs/historyTabPage.ts";
import summaryTabPage from "../../pages/CaseAPI/caseTabs/summaryTabPage.ts";
import stateTabPage from "../../pages/CaseAPI/caseTabs/stateTabPage.ts";
import caseDetailsTabPage from "../../pages/CaseAPI/caseTabs/caseDetailsTabPage.ts";
import casePartiesTabPage from "../../pages/CaseAPI/caseTabs/casePartiesTabPage.ts";
import caseDocumentsTabPage from "../../pages/CaseAPI/caseTabs/caseDocumentsTabPage.ts";
import caseFileViewTabPage from "../../pages/CaseAPI/caseTabs/caseFileViewTabPage.ts";

type DSSVerifyDetails = {
  verifyCaseDetails(
    page: Page,
    accessibilityTest: boolean,
    caseNumber: string,
    state: string,
    representationPresent: boolean,
    representationQualified: boolean,
    uploadOtherInfo: boolean,
    multipleDocuments: boolean,
    user: UserRole,
    subjectName: string,
  ): Promise<any>;
};

const DSSVerifyCaseDetails: DSSVerifyDetails = {
  async verifyCaseDetails(
    page: Page,
    accessibilityTest: boolean,
    caseNumber: string,
    state: string,
    representationPresent: boolean,
    representationQualified: boolean,
    uploadOtherInfo: boolean,
    multipleDocuments: boolean,
    user: UserRole,
    subjectName: string,
  ): Promise<any> {
    await historyTabPage.checkPageLoads(
      page,
      accessibilityTest,
      caseNumber,
      state,
      subjectName,
    );
    await historyTabPage.checkPageInfo(
      page,
      ["Submit case (cic)"],
      user,
      state,
    );
    await summaryTabPage.changeToSummaryTab(page);
    await summaryTabPage.checkPageLoads(
      page,
      accessibilityTest,
      representationPresent,
      caseNumber,
      subjectName,
    );
    await summaryTabPage.checkPageInfo(
      page,
      caseNumber,
      representationPresent,
      representationQualified,
      subjectName,
    );
    await stateTabPage.changeToStateTab(page);
    await stateTabPage.checkPageLoads(
      page,
      accessibilityTest,
      caseNumber,
      subjectName,
    );
    await stateTabPage.checkStateTab(page, state);
    await caseDetailsTabPage.changeToCaseDetailsTab(page);
    await caseDetailsTabPage.checkPageLoads(
      page,
      accessibilityTest,
      representationPresent,
      caseNumber,
      subjectName,
    );
    await caseDetailsTabPage.checkPageInfo(
      page,
      representationPresent,
      representationQualified,
      subjectName,
    );
    await casePartiesTabPage.changeToCasePartiesTab(page);
    await casePartiesTabPage.checkPageLoads(
      page,
      accessibilityTest,
      representationPresent,
      caseNumber,
      subjectName,
    );
    await casePartiesTabPage.checkPageInfo(
      page,
      representationPresent,
      representationQualified,
      subjectName,
    );
    await caseDocumentsTabPage.changeToCaseDocumentsTab(page);
    await caseDocumentsTabPage.checkPageLoads(
      page,
      accessibilityTest,
      caseNumber,
      multipleDocuments,
      uploadOtherInfo,
      false,
      user,
      subjectName,
    );
    await caseDocumentsTabPage.checkPageInfo(
      page,
      multipleDocuments,
      uploadOtherInfo,
    );
    await caseFileViewTabPage.changeToCaseFileViewTab(page);
    await caseFileViewTabPage.checkPageLoads(
      page,
      accessibilityTest,
      caseNumber,
      subjectName,
    );
    await caseFileViewTabPage.checkPageInfo(
      page,
      multipleDocuments,
      uploadOtherInfo,
    );
  },
};

export default DSSVerifyCaseDetails;
