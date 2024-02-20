import { Page, test } from "@playwright/test";
import { UserRole } from "../config.ts";
import {
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
import confirmPage from "../pages/CaseAPI/createCase/confirmPage.ts";

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
  await confirmPage.checkPageLoads(page, accessibilityTest);
}

test.describe("Case-API Create case tests. @CaseAPI", () => {
  test("Caseworker - Assessment - Fatal Category, Email Contact", async ({
    page,
  }) => {
    await createCase(
      page,
      "caseWorker",
      false,
      "Assessment",
      "Fatal",
      true,
      true,
      "Email",
      true,
      true,
      "1996",
      "Scotland",
      true,
      false,
      true,
      false,
    );
  });

  test("Caseworker - Assessment - Medical Re-opening Category, Email Contact", async ({
    page,
  }) => {
    await createCase(
      page,
      "caseWorker",
      false,
      "Assessment",
      "Medical Re-opening",
      true,
      true,
      "Email",
      true,
      true,
      "2001",
      "London",
      true,
      false,
      true,
      false,
    );
  });

  test("Caseworker - Assessment - Minor Category, Post Contact", async ({
    page,
  }) => {
    await createCase(
      page,
      "caseWorker",
      false,
      "Assessment",
      "Minor",
      true,
      true,
      "Post",
      true,
      true,
      "2008",
      "Midlands",
      true,
      false,
      true,
      false,
    );
  });

  test("Caseworker - Assessment - Paragraph 26 Category, Post Contact", async ({
    page,
  }) => {
    await createCase(
      page,
      "caseWorker",
      true,
      "Assessment",
      "Paragraph 26",
      false,
      true,
      "Post",
      true,
      true,
      "2012",
      "North East",
      true,
      false,
      true,
      false,
    );
  });

  test("Caseworker - Assessment - Sexual Abuse Category, Email Contact", async ({
    page,
  }) => {
    await createCase(
      page,
      "caseWorker",
      false,
      "Assessment",
      "Sexual Abuse",
      true,
      true,
      "Email",
      true,
      true,
      "1996",
      "North West",
      true,
      false,
      true,
      false,
    );
  });

  test("Caseworker - Assessment - Special Jurisdiction Category, Email Contact", async ({
    page,
  }) => {
    await createCase(
      page,
      "caseWorker",
      false,
      "Assessment",
      "Special Jurisdiction",
      true,
      true,
      "Email",
      true,
      true,
      "2001",
      "Wales & South West",
      true,
      false,
      true,
      false,
    );
  });

  test("Caseworker - Eligibility - Other Category, Email Contact", async ({
    page,
  }) => {
    await createCase(
      page,
      "caseWorker",
      false,
      "Eligibility",
      "Other",
      true,
      true,
      "Email",
      true,
      true,
      "2008",
      "Scotland",
      true,
      false,
      true,
      false,
    );
  });

  test("Caseworker - Eligibility - Fatal Category, Post Contact", async ({
    page,
  }) => {
    await createCase(
      page,
      "caseWorker",
      false,
      "Eligibility",
      "Fatal",
      true,
      true,
      "Post",
      true,
      true,
      "1996",
      "London",
      true,
      false,
      true,
      false,
    );
  });

  test("Caseworker - Eligibility - Medical Re-opening Category, Email Contact", async ({
    page,
  }) => {
    await createCase(
      page,
      "caseWorker",
      false,
      "Eligibility",
      "Medical Re-opening",
      true,
      true,
      "Email",
      true,
      true,
      "2012",
      "Midlands",
      true,
      false,
      true,
      false,
    );
  });

  test("Caseworker - Eligibility - Minor Category, Post Contact", async ({
    page,
  }) => {
    await createCase(
      page,
      "caseWorker",
      false,
      "Eligibility",
      "Minor",
      true,
      true,
      "Post",
      true,
      true,
      "2001",
      "North East",
      true,
      false,
      true,
      false,
    );
  });

  test("Caseworker - Eligibility - Paragraph 26 Category, Post Contact", async ({
    page,
  }) => {
    await createCase(
      page,
      "caseWorker",
      false,
      "Eligibility",
      "Paragraph 26",
      true,
      true,
      "Post",
      true,
      true,
      "1996",
      "North West",
      true,
      false,
      true,
      false,
    );
  });

  test("Caseworker - Eligibility - Sexual Abuse Category, Email Contact", async ({
    page,
  }) => {
    await createCase(
      page,
      "caseWorker",
      false,
      "Eligibility",
      "Sexual Abuse",
      true,
      true,
      "Email",
      true,
      true,
      "2008",
      "Wales & South West",
      true,
      false,
      true,
      false,
    );
  });

  test("Caseworker - Assessment - Other Category, Email Contact", async ({
    page,
  }) => {
    await createCase(
      page,
      "caseWorker",
      false,
      "Assessment",
      "Other",
      true,
      true,
      "Email",
      true,
      true,
      "2012",
      "Scotland",
      true,
      false,
      true,
      false,
    );
  });

  test("Caseworker - Eligibility - Other Category, Post Contact", async ({
    page,
  }) => {
    await createCase(
      page,
      "caseWorker",
      false,
      "Eligibility",
      "Other",
      true,
      true,
      "Post",
      true,
      true,
      "2001",
      "London",
      true,
      false,
      true,
      false,
    );
  });

  test("Caseworker - Assessment - Other Category, Post Contact", async ({
    page,
  }) => {
    await createCase(
      page,
      "caseWorker",
      false,
      "Assessment",
      "Other",
      true,
      true,
      "Post",
      true,
      true,
      "1996",
      "Midlands",
      true,
      false,
      true,
      false,
    );
  });

  test("Senior Caseworker - Assessment - Other Category, Post Contact", async ({
    page,
  }) => {
    await createCase(
      page,
      "seniorCaseworker",
      false,
      "Assessment",
      "Other",
      true,
      true,
      "Post",
      true,
      true,
      "1996",
      "Midlands",
      true,
      true,
      true,
      true,
    );
  });

  test("Hearing centre admin - Eligibility - Other Category, Email Contact", async ({
    page,
  }) => {
    await createCase(
      page,
      "hearingCentreAdmin",
      false,
      "Eligibility",
      "Other",
      true,
      true,
      "Post",
      true,
      true,
      "1996",
      "Midlands",
      true,
      true,
      true,
      true,
    );
  });

  test("hearing Centre Team Lead - Assessment - Other Category, Email Contact", async ({
    page,
  }) => {
    await createCase(
      page,
      "hearingCentreTeamLead",
      false,
      "Assessment",
      "Other",
      true,
      true,
      "Email",
      true,
      true,
      "1996",
      "Midlands",
      true,
      true,
      true,
      true,
    );
  });
});

test("Accessibility test every page. @accessibilityCaseAPI", async ({ page }) => {
  await createCase(
    page,
    "caseWorker",
    true,
    "Assessment",
    "Other",
    true,
    true,
    "Email",
    true,
    true,
    "1996",
    "Scotland",
    true,
    true,
    true,
    true,
  );
});
