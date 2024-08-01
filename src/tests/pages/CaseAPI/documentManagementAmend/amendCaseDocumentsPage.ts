import { expect, Page } from "@playwright/test";
import amendCaseDocuments_content from "../../../fixtures/content/CaseAPI/documentManagementAmend/amendCaseDocuments_content.ts";
import caseSubjectDetailsObject_content from "../../../fixtures/content/CaseAPI/createCase/caseSubjectDetailsObject_content.ts";
import commonHelpers from "../../../helpers/commonHelpers.ts";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";

type AmendCaseDocumentsPage = {
  continue: string;
  previous: string;
  cancel: string;
  dropdown: string;
  message: string;
  checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
  ): Promise<void>;
  fillFields(page: Page): Promise<void>;
  continueOn(page: Page): Promise<void>;
};

const amendDocumentsPage: AmendCaseDocumentsPage = {
  continue: '[type="submit"]',
  previous: ".button-secondary[disabled]",
  cancel: ".cancel",
  dropdown: "#cicCaseSelectedDocument_documentCategory",
  message: "#cicCaseSelectedDocument_documentEmailContent",
  async checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
  ): Promise<void> {
    await Promise.all([
      expect(page.locator(".govuk-caption-l")).toHaveText(
        amendCaseDocuments_content.pageHint,
      ),
      expect(page.locator(".govuk-heading-l")).toHaveText(
        amendCaseDocuments_content.pageTitle,
      ),
      expect(page.locator("markdown > h3")).toContainText(
        caseSubjectDetailsObject_content.name,
      ),
      expect(page.locator("markdown > p").nth(0)).toContainText(
        amendCaseDocuments_content.caseReference + caseNumber,
      ),
      expect(page.locator(".heading-h2")).toContainText(
        amendCaseDocuments_content.subTitle1,
      ),
      expect(
        page.locator(
          'label[for="cicCaseSelectedDocument_documentCategory"] span.form-label.ng-star-inserted',
        ),
      ).toContainText(amendCaseDocuments_content.textOnPage2),
      expect(
        page.locator(
          'label[for="cicCaseSelectedDocument_documentEmailContent"] span.form-label.ng-star-inserted',
        ),
      ).toContainText(amendCaseDocuments_content.textOnPage3),
      expect(
        page.locator("#cicCaseSelectedDocument_documentCategory"),
      ).toBeVisible(),
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
    await page.fill(this.message, amendCaseDocuments_content.message);
  },
  async continueOn(page: Page): Promise<void> {
    await page.click(this.continue);
  },
};

export default amendDocumentsPage;
