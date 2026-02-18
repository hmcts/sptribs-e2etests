import { Page } from "@playwright/test";
import {
  caseRegion,
  Category,
  ContactPreference,
  Scheme,
  SubCategory,
} from "../../helpers/commonHelpers.ts";
import editCaseCategorisationDetailsPage from "../../pages/CaseAPI/editCase/editCaseCategorisationDetailsPage.ts";
import editCicaCaseDetailsPage from "../../pages/CaseAPI/editCase/editCICACaseDetailsPage.ts";
import caseCICADecisionDatePage from "../../pages/CaseAPI/editCase/caseCICADecisionDatePage.ts";
import editCaseDateObjectsPage from "../../pages/CaseAPI/editCase/editCaseDateObjectsPage.ts";
import editCaseObjectsSubjectsPage from "../../pages/CaseAPI/editCase/editCaseObjectsSubjectsPage.ts";
import editCaseSubjectDetailsObjectPage from "../../pages/CaseAPI/editCase/editCaseSubjectDetailsObjectPage.ts";
import editCaseApplicantDetailsObjectPage from "../../pages/CaseAPI/editCase/editCaseApplicantDetailsObjectPage.ts";
import editCaseRepresentativeDetailsObjectPage from "../../pages/CaseAPI/editCase/editCaseRepresentativeDetailsObjectPage.ts";
import editCaseObjectsContactsPage from "../../pages/CaseAPI/editCase/editCaseObjectsContactsPage.ts";
import editCaseFurtherDetailsObjectPage from "../../pages/CaseAPI/editCase/editCaseFurtherDetailsObjectPage.ts";
import editCaseDSSFurtherDetailsObjectPage from "../../pages/CaseAPI/editCase/editCaseDSSFurtherDetailsObjectPage.ts";
import submitPage from "../../pages/CaseAPI/editCase/submitPage.ts";
import confirmPage from "../../pages/CaseAPI/editCase/confirmPage.ts";

export type initialState =
  | "DSS Submitted"
  | "Submitted"
  | "Case Management"
  | "Ready to list"
  | "Awaiting hearing"
  | "Awaiting outcome";

type editCaseDSS = {
  editCaseDSS(
    page: Page,
    accessibilityTest: boolean,
    initialState: initialState,
    category: Category,
    subCategory: SubCategory,
    referenceNumber: string,
    caseWorker: string,
    presentingOfficer: string,
    representative: boolean,
    applicant: boolean,
    contactPreference: ContactPreference,
    representativeQualified: boolean,
    schemeSelection: Scheme,
    caseRegionSelection: caseRegion,
    claimsLinked: boolean,
    compensationLinked: boolean,
    tribunalFormsInTime: boolean,
    applicantExplained: boolean,
    errorMessaging: boolean,
    caseNumber: string,
    subjectName: string,
  ): Promise<void>;
};

const editCaseDSS: editCaseDSS = {
  async editCaseDSS(
    page: Page,
    accessibilityTest: boolean,
    initialState: initialState,
    category: Category,
    subCategory: SubCategory,
    referenceNumber: string,
    caseWorker: string,
    presentingOfficer: string,
    representative: boolean,
    applicant: boolean,
    contactPreference: ContactPreference,
    representativeQualified: boolean,
    schemeSelection: Scheme,
    caseRegionSelection: caseRegion,
    claimsLinked: boolean,
    compensationLinked: boolean,
    tribunalFormsInTime: boolean,
    applicantExplained: boolean,
    errorMessaging: boolean,
    caseNumber: string,
    subjectName: string,
  ): Promise<void> {
    switch (errorMessaging) {
      default:
        await editCaseCategorisationDetailsPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          subjectName,
        );
        await editCaseCategorisationDetailsPage.checkAndFillInFields(
          page,
          initialState,
          category,
          subCategory,
        );
        await editCicaCaseDetailsPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          subjectName,
        );
        await editCicaCaseDetailsPage.fillFields(page);
        await editCicaCaseDetailsPage.continueOn(page);
        await caseCICADecisionDatePage.checkPageLoads(page, accessibilityTest);
        await caseCICADecisionDatePage.fillInFields(page);
        await editCaseDateObjectsPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          subjectName,
        );
        await editCaseDateObjectsPage.checkAndFillInFields(page, initialState);
        await editCaseObjectsSubjectsPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          subjectName,
        );
        await editCaseObjectsSubjectsPage.checkAndFillInFields(
          page,
          initialState,
          representative,
          applicant,
          subCategory,
        );
        await editCaseSubjectDetailsObjectPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          subjectName,
        );
        await editCaseSubjectDetailsObjectPage.checkFields(
          page,
          initialState,
          subjectName,
        );
        await editCaseSubjectDetailsObjectPage.fillInFields(
          page,
          contactPreference,
          initialState,
          subjectName,
        );
        if (applicant) {
          await editCaseApplicantDetailsObjectPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
            subjectName,
          );
          await editCaseApplicantDetailsObjectPage.checkFields(
            page,
            initialState,
          );
          await editCaseApplicantDetailsObjectPage.fillInFields(
            page,
            contactPreference,
          );
        }
        if (representative) {
          await editCaseRepresentativeDetailsObjectPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
            subjectName,
          );
          await editCaseRepresentativeDetailsObjectPage.checkFields(
            page,
            initialState,
          );
          await editCaseRepresentativeDetailsObjectPage.fillInFields(
            page,
            contactPreference,
            representativeQualified,
          );
        }
        await editCaseObjectsContactsPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          subjectName,
        );
        await editCaseObjectsContactsPage.checkAndFillInFields(
          page,
          initialState,
          subCategory,
          representative,
          applicant,
        );
        await editCaseDSSFurtherDetailsObjectPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          subjectName,
        );
        await editCaseDSSFurtherDetailsObjectPage.checkFields(
          page,
          initialState,
        );
        await editCaseDSSFurtherDetailsObjectPage.fillInFields(
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
          caseNumber,
          accessibilityTest,
          contactPreference,
          applicant,
          representative,
          tribunalFormsInTime,
          subjectName,
        );
        await submitPage.checkValidInfo(
          page,
          contactPreference,
          applicant,
          representative,
          category,
          subCategory,
          schemeSelection,
          caseRegionSelection,
          representativeQualified,
          claimsLinked,
          compensationLinked,
          tribunalFormsInTime,
          applicantExplained,
          subjectName,
        );
        await confirmPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          subjectName,
        );
        await confirmPage.continueOn(page);
        break;
      case true:
        await editCaseCategorisationDetailsPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          subjectName,
        );
        await editCaseCategorisationDetailsPage.triggerErrorMessages(page);
        await editCaseCategorisationDetailsPage.checkAndFillInFields(
          page,
          initialState,
          category,
          subCategory,
        );
        await editCicaCaseDetailsPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          subjectName,
        );
        await editCicaCaseDetailsPage.fillFields(page);
        await editCicaCaseDetailsPage.continueOn(page);
        await caseCICADecisionDatePage.checkPageLoads(page, accessibilityTest);
        await caseCICADecisionDatePage.triggerErrorMessages(page);
        await caseCICADecisionDatePage.fillInFields(page);
        await editCaseDateObjectsPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          subjectName,
        );
        await editCaseDateObjectsPage.triggerErrorMessages(page);
        await editCaseDateObjectsPage.checkAndFillInFields(page, initialState);
        await editCaseObjectsSubjectsPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          subjectName,
        );
        await editCaseObjectsSubjectsPage.triggerErrorMessages(page);
        await editCaseObjectsSubjectsPage.checkAndFillInFields(
          page,
          initialState,
          representative,
          applicant,
          subCategory,
        );
        await editCaseSubjectDetailsObjectPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          subjectName,
        );
        await editCaseSubjectDetailsObjectPage.triggerErrorMessages(page);
        await editCaseSubjectDetailsObjectPage.fillInFields(
          page,
          contactPreference,
          initialState,
          subjectName,
        );
        await editCaseApplicantDetailsObjectPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          subjectName,
        );
        await editCaseApplicantDetailsObjectPage.triggerErrorMessages(page);
        await editCaseApplicantDetailsObjectPage.fillInFields(
          page,
          contactPreference,
        );
        await editCaseRepresentativeDetailsObjectPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          subjectName,
        );
        await editCaseRepresentativeDetailsObjectPage.triggerErrorMessages(
          page,
        );
        await editCaseRepresentativeDetailsObjectPage.fillInFields(
          page,
          contactPreference,
          representativeQualified,
        );
        await editCaseObjectsContactsPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          subjectName,
        );
        await editCaseObjectsContactsPage.triggerErrorMessages(page);
        await editCaseObjectsContactsPage.checkAndFillInFields(
          page,
          initialState,
          subCategory,
          representative,
          applicant,
        );
        await editCaseDSSFurtherDetailsObjectPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          subjectName,
        );
        await editCaseDSSFurtherDetailsObjectPage.triggerErrorMessages(page);
        break;
    }
  },
};

export default editCaseDSS;
