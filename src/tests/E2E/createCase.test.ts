import { Page, test } from "@playwright/test";
import { UserRole } from "../config.ts";
import {
  Category,
  ContactPreference,
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

async function createCase(
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
}

test.describe("Case-API Create case tests.", () => {
  test.only("some test", async ({ page }) => {
    const user = "caseWorker",
      accessibilityTest = true,
      category = "Assessment",
      subCategory = "Other",
      representative = true,
      applicant = true,
      contactPreference = "Post",
      representativeQualified = false,
      multipleFiles = true;
    await createCase(
      page,
      user,
      accessibilityTest,
      category,
      subCategory,
      representative,
      applicant,
      contactPreference,
      representativeQualified,
      multipleFiles,
    );
  });
});
