import { expect, Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import caseObjectsSubjects_content from "../../../fixtures/content/CaseAPI/createCase/caseObjectsSubjects_content.ts";
import commonHelpers, { SubCategory } from "../../../helpers/commonHelpers.ts";

type CaseObjectsSubjectsPage = {
  subjectSelectBox: string;
  representativeSelectBox: string;
  applicantSelectBox: string;
  checkPageLoads(page: Page, accessibilityTest: boolean): Promise<void>;
  fillInFields(
    page: Page,
    representative: boolean,
    applicant: boolean,
    subcategory: SubCategory,
  ): Promise<void>;
};

const caseObjectsSubjectsPage: CaseObjectsSubjectsPage = {
  subjectSelectBox: "#cicCasePartiesCIC-SubjectCIC",
  representativeSelectBox: "#cicCasePartiesCIC-RepresentativeCIC",
  applicantSelectBox: "#cicCasePartiesCIC-ApplicantCIC",

  async checkPageLoads(page: Page, accessibilityTest: boolean): Promise<void> {
    await expect(page.locator(".govuk-caption-l")).toHaveText(
      caseObjectsSubjects_content.pageHint,
    );
    await expect(page.locator(".govuk-heading-l")).toHaveText(
      caseObjectsSubjects_content.pageTitle,
    );
    await expect(page.locator(".form-label").nth(0)).toHaveText(
      caseObjectsSubjects_content.textOnPage1,
    );
    await expect(page.locator(".form-label").nth(1)).toHaveText(
      caseObjectsSubjects_content.textOnPage2,
    );
    await expect(page.locator(".form-label").nth(2)).toHaveText(
      caseObjectsSubjects_content.textOnPage3,
    );
    await expect(page.locator(".form-label").nth(3)).toHaveText(
      caseObjectsSubjects_content.textOnPage4,
    );
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async fillInFields(
    page: Page,
    representative: boolean,
    applicant: boolean,
    subCategory: SubCategory,
  ): Promise<void> {
    if (
      (!applicant && subCategory === "Minor") ||
      (!applicant && subCategory === "Fatal")
    ) {
      throw new Error("Cannot have a Minor or Fatal case with no applicant.");
    }
    await page.click(this.subjectSelectBox);
    if (representative) {
      await page.click(this.representativeSelectBox);
    }
    if (applicant) {
      await page.click(this.applicantSelectBox);
    }
    await commonHelpers.clickContinueButton(page);
  },
};

export default caseObjectsSubjectsPage;
