import { expect, Page } from "@playwright/test";
import selectCaseDocuments_content from "../../../fixtures/content/CaseAPI/documentManagementAmend/selectCaseDocuments_content.ts";
import caseSubjectDetailsObject_content from "../../../fixtures/content/CaseAPI/createCase/caseSubjectDetailsObject_content.ts";
import commonHelpers from "../../../helpers/commonHelpers.ts";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";

type SelectCaseDocumentsPage = {
  continue: string;
  previous: string;
  cancel: string;
  dropdown: string;
  checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
  ): Promise<void>;
  fillFields(page: Page): Promise<void>;
  continueOn(page: Page): Promise<void>;
};

const selectDocumentsPage: SelectCaseDocumentsPage = {
  continue: '[type="submit"]',
  previous: ".button-secondary[disabled]",
  cancel: ".cancel",
  dropdown: "#cicCaseAmendDocumentList",
  async checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
  ): Promise<void> {
    await Promise.all([
      expect(page.locator(".govuk-caption-l")).toHaveText(
        selectCaseDocuments_content.pageHint,
      ),
      expect(page.locator(".govuk-heading-l")).toHaveText(
        selectCaseDocuments_content.pageTitle,
      ),
      expect(page.locator("markdown > h3")).toContainText(
        caseSubjectDetailsObject_content.name,
      ),
      expect(page.locator("markdown > p").nth(0)).toContainText(
        selectCaseDocuments_content.caseReference + caseNumber,
      ),
      expect(page.locator(".form-label")).toContainText(
        selectCaseDocuments_content.textOnPage1,
      ),
      commonHelpers.checkForButtons(
        page,
        this.continue,
        this.previous,
        this.cancel,
      ),
    ]);
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async fillFields(page: Page): Promise<void> {
    await page.selectOption(
      this.dropdown,
      "DOC-MGMT--mockFile.pdf--TG - Other",
    );
  },

  async continueOn(page: Page): Promise<void> {
    await page.click(this.continue);
  },
};

export default selectDocumentsPage;
