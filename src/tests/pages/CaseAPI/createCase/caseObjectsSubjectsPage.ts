import { expect, Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import { SubCategory } from "../../../helpers/commonHelpers.ts";
import caseObjectsSubjectsPage_content from "../../../fixtures/content/CaseAPI/createCase/caseObjectsSubjectsPage_content.ts";

type CaseObjectsSubjectsPage = {
  continue: string;
  subjectSelectBox: string;
  representativeSelectBox: string;
  applicantSelectBox: string;
  checkPageLoads(page: Page, accessibilityTest: boolean): Promise<void>;
  fillInFields(page: Page, caseType: SubCategory): Promise<void>;
};

const caseObjectsSubjectsPage: CaseObjectsSubjectsPage = {
  continue: '[type="submit"]',
  subjectSelectBox: "#cicCasePartiesCIC-SubjectCIC",
  representativeSelectBox: "#cicCasePartiesCIC-RepresentativeCIC",
  applicantSelectBox: "#cicCasePartiesCIC-ApplicantCIC",

  async checkPageLoads(page: Page, accessibilityTest: boolean): Promise<void> {
    await expect(page.locator(".govuk-caption-l")).toHaveText(
      caseObjectsSubjectsPage_content.pageHint,
    );
    await expect(page.locator(".govuk-heading-l")).toHaveText(
      caseObjectsSubjectsPage_content.pageTitle,
    );
    await expect(page.locator(".form-label").nth(0)).toHaveText(
      caseObjectsSubjectsPage_content.textOnPage1,
    );
    await expect(page.locator(".form-label").nth(1)).toHaveText(
      caseObjectsSubjectsPage_content.textOnPage2,
    );
    await expect(page.locator(".form-label").nth(2)).toHaveText(
      caseObjectsSubjectsPage_content.textOnPage3,
    );
    await expect(page.locator(".form-label").nth(3)).toHaveText(
      caseObjectsSubjectsPage_content.textOnPage4,
    );
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async fillInFields(page: Page, caseType: SubCategory): Promise<void> {
    if (!(caseType === "Fatal" || caseType === "Minor")) {
      await page.click(this.subjectSelectBox);
    }
    await page.click(this.representativeSelectBox);
    await page.click(this.applicantSelectBox);
    await page.click(this.continue);
  },
};

export default caseObjectsSubjectsPage;
