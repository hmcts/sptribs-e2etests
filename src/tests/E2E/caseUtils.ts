import { Page } from "@playwright/test";
import { UserRole } from "../config.ts";
import commonHelpers, {
  caseRegion,
  Category,
  ContactPreference,
  Scheme,
  SubCategory,
} from "../helpers/commonHelpers.ts";
import caseAPILoginPage from "../pages/CaseAPI/caseList/caseAPILoginPage.ts";
import casesPage from "../pages/CaseAPI/caseList/casesPage.ts";
import caseFilterPage from "../pages/CaseAPI/createCase/caseFilterPage.ts";
import caseCategorisationDetailsPage from "../pages/CaseAPI/createCase/caseCategorisationDetailsPage.ts";
import caseDateObjectsPage from "../pages/CaseAPI/createCase/caseDateObjectsPage.ts";
import caseObjectsSubjectsPage from "../pages/CaseAPI/createCase/caseObjectsSubjectsPage.ts";
import caseSubjectDetailsObjectPage from "../pages/CaseAPI/createCase/caseSubjectDetailsObjectPage.ts";
import caseApplicantDetailsObjectPage from "../pages/CaseAPI/createCase/caseApplicantDetailsObjectPage.ts";
import caseRepresentativeDetailsObjectPage from "../pages/CaseAPI/createCase/caseRepresentativeDetailsObjectPage.ts";
import caseObjectsContactsPage from "../pages/CaseAPI/createCase/caseObjectsContactsPage.ts";
import caseDocumentsUploadObjectPage from "../pages/CaseAPI/createCase/caseDocumentsUploadObjectPage.ts";
import caseFurtherDetailsObjectPage from "../pages/CaseAPI/createCase/caseFurtherDetailsObjectPage.ts";
import submitPage from "../pages/CaseAPI/createCase/submitPage.ts";
import createCaseConfirmPage from "../pages/CaseAPI/createCase/confirmPage.ts";
import stateTab_content from "../fixtures/content/CaseAPI/caseTabs/stateTab_content.ts";
import events_content from "../fixtures/content/CaseAPI/events_content.ts";
import historyTabPage from "../pages/CaseAPI/caseTabs/historyTabPage.ts";
import builtCasePage from "../pages/CaseAPI/buildCase/buildCasePage.ts";
import buildCaseConfirmPage from "../pages/CaseAPI/buildCase/confirmPage.ts";
import summaryTabPage from "../pages/CaseAPI/caseTabs/summaryTabPage.ts";
import stateTabPage from "../pages/CaseAPI/caseTabs/stateTabPage.ts";
import caseDetailsTabPage from "../pages/CaseAPI/caseTabs/caseDetailsTabPage.ts";
import casePartiesTabPage from "../pages/CaseAPI/caseTabs/casePartiesTabPage.ts";
import caseDocumentsTabPage from "../pages/CaseAPI/caseTabs/caseDocumentsTabPage.ts";
import caseFileViewTabPage from "../pages/CaseAPI/caseTabs/caseFileViewTabPage.ts";

export async function createCase(
  page: Page,
  user: UserRole,
  accessibilityTest: boolean,
  category: Category,
  subCategory: SubCategory,
  representative: boolean,
  applicant: boolean,
  contactPreference: ContactPreference,
  representativeQualified: boolean,
  multipleFiles: boolean,
  schemeSelection: Scheme,
  caseRegionSelection: caseRegion,
  claimsLinked: boolean,
  compensationLinked: boolean,
  tribunalFormsInTime: boolean,
  applicantExplained: boolean,
): Promise<void> {
  await caseAPILoginPage.SignInUser(page, user);
  await casesPage.checkPageLoads(page, accessibilityTest);
  await casesPage.createCase(page);
  await caseFilterPage.checkPageLoads(page, accessibilityTest);
  await caseFilterPage.fillInFields(page);
  await caseCategorisationDetailsPage.checkPageLoads(page, accessibilityTest);
  await caseCategorisationDetailsPage.fillInFields(page, category, subCategory);
  await caseDateObjectsPage.checkPageLoads(page, accessibilityTest);
  await caseDateObjectsPage.fillInFields(page);
  await caseObjectsSubjectsPage.checkPageLoads(page, accessibilityTest);
  await caseObjectsSubjectsPage.fillInFields(
    page,
    representative,
    applicant,
    subCategory,
  );
  await caseSubjectDetailsObjectPage.checkPageLoads(page, accessibilityTest);
  await caseSubjectDetailsObjectPage.fillInFields(page, contactPreference);
  if (applicant) {
    await caseApplicantDetailsObjectPage.checkPageLoads(
      page,
      accessibilityTest,
    );
    await caseApplicantDetailsObjectPage.fillInFields(page, contactPreference);
  }
  if (representative) {
    await caseRepresentativeDetailsObjectPage.checkPageLoads(
      page,
      accessibilityTest,
    );
    await caseRepresentativeDetailsObjectPage.fillInFields(
      page,
      contactPreference,
      representativeQualified,
    );
  }
  await caseObjectsContactsPage.checkPageLoads(page, accessibilityTest);
  await caseObjectsContactsPage.fillInFields(
    page,
    subCategory,
    representative,
    applicant,
  );
  await caseDocumentsUploadObjectPage.checkPageLoads(page, accessibilityTest);
  await caseDocumentsUploadObjectPage.fillInFields(page, multipleFiles);
  await caseFurtherDetailsObjectPage.checkPageLoads(page, accessibilityTest);
  await caseFurtherDetailsObjectPage.fillInFields(
    page,
    schemeSelection,
    caseRegionSelection,
    claimsLinked,
    compensationLinked,
    tribunalFormsInTime,
    applicantExplained,
  );
  await submitPage.checkPageLoads(
    page,
    accessibilityTest,
    contactPreference,
    applicant,
    representative,
    multipleFiles,
    tribunalFormsInTime,
  );
  await submitPage.checkValidInfo(
    page,
    contactPreference,
    applicant,
    representative,
    multipleFiles,
    category,
    subCategory,
    schemeSelection,
    caseRegionSelection,
    representativeQualified,
    claimsLinked,
    compensationLinked,
    tribunalFormsInTime,
    applicantExplained,
  );
  await createCaseConfirmPage.checkPageLoads(page, accessibilityTest);
}

export async function verifyCaseDetails(
  page: Page,
  accessibilityTest: boolean,
  caseNumber: string,
  state: string,
  representationPresent: boolean,
  representationQualified: boolean,
  time: string,
  uploadOtherInfo: boolean,
  multipleDocuments: boolean,
) {
  await historyTabPage.checkPageLoads(
    page,
    accessibilityTest,
    caseNumber,
    state,
  );
  await historyTabPage.checkPageInfo(page, time, state);
  await summaryTabPage.changeToSummaryTab(page);
  await summaryTabPage.checkPageLoads(
    page,
    accessibilityTest,
    representationPresent,
    caseNumber,
  );
  await summaryTabPage.checkPageInfo(
    page,
    caseNumber,
    representationPresent,
    representationQualified,
  );
  await stateTabPage.changeToStateTab(page);
  await stateTabPage.checkPageLoads(page, accessibilityTest, caseNumber);
  await stateTabPage.checkStateTab(page, state);
  await caseDetailsTabPage.changeToCaseDetailsTab(page);
  await caseDetailsTabPage.checkPageLoads(
    page,
    accessibilityTest,
    representationPresent,
    caseNumber,
  );
  await caseDetailsTabPage.checkPageInfo(
    page,
    representationPresent,
    representationQualified,
  );
  await casePartiesTabPage.changeToCasePartiesTab(page);
  await casePartiesTabPage.checkPageLoads(
    page,
    accessibilityTest,
    representationPresent,
    caseNumber,
  );
  await casePartiesTabPage.checkPageInfo(
    page,
    representationPresent,
    representationQualified,
  );
  await caseDocumentsTabPage.changeToCaseDocumentsTab(page);
  await caseDocumentsTabPage.checkPageLoads(
    page,
    accessibilityTest,
    caseNumber,
    multipleDocuments,
  );
  await caseDocumentsTabPage.checkPageInfo(page, multipleDocuments);
  await caseFileViewTabPage.changeToCaseFileViewTab(page);
  await caseFileViewTabPage.checkPageLoads(page, accessibilityTest, caseNumber);
  await caseFileViewTabPage.checkPageInfo(
    page,
    multipleDocuments,
    uploadOtherInfo,
  );
}

export async function buildCase(page: Page, state: string) {
  const caseNumber = await createCaseConfirmPage.returnCaseNumber(page);
  let time = await createCaseConfirmPage.closeAndReturnToCase(page);
  await historyTabPage.checkPageLoads(page, true, caseNumber, state);
  await historyTabPage.checkPageInfo(page, time, state);
  await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
  await builtCasePage.checkPageLoads(page, true, caseNumber);
  await builtCasePage.continueOn(page);
  await buildCaseConfirmPage.checkPageLoads(page, true, caseNumber);
  await buildCaseConfirmPage.continueOn(page);
  await stateTabPage.changeToStateTab(page);
  await stateTabPage.checkStateTab(page, stateTab_content.caseManagementState);
}
