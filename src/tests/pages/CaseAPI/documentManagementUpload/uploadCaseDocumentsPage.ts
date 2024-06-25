import { expect, Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import commonHelpers from "../../../helpers/commonHelpers.ts";
import uploadCaseDocumentsContent from "../../../fixtures/content/CaseAPI/documentManagementUpload/uploadCaseDocuments_content.ts";
import caseSubjectDetailsObject_content from "../../../fixtures/content/CaseAPI/createCase/caseSubjectDetailsObject_content.ts";
import config from "../../../config.ts";

type UploadCaseDocumentsPage = {
  addNew: string;
  addNewBottom: string;
  continue: string;
  previous: string;
  cancel: string;
  checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
  ): Promise<void>;
  fillFields(page: Page, multipleDocuments: boolean): Promise<void>;
  continueOn(page: Page): Promise<void>;
  triggerErrorMessages(page: Page): Promise<void>;
};

const uploadCaseDocumentsPage: UploadCaseDocumentsPage = {
  addNew: ".write-collection-add-item__top",
  addNewBottom: ".write-collection-add-item__bottom",
  continue: '[type="submit"]',
  previous: ".button-secondary[disabled]",
  cancel: ".cancel",

  async checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
  ): Promise<void> {
    await Promise.all([
      expect(page.locator(".govuk-caption-l")).toHaveText(
        uploadCaseDocumentsContent.pageHint,
      ),
      expect(page.locator(".govuk-heading-l")).toHaveText(
        uploadCaseDocumentsContent.pageTitle,
      ),
      expect(page.locator("markdown > h3")).toContainText(
        caseSubjectDetailsObject_content.name,
      ),
      expect(page.locator("markdown > p").nth(0)).toContainText(
        uploadCaseDocumentsContent.caseReference + caseNumber,
      ),
      ...Array.from({ length: 2 }, (_, index) => {
        const textOnPage = (uploadCaseDocumentsContent as any)[
          `textOnPage${index + 1}`
        ];
        return commonHelpers.checkVisibleAndPresent(
          page.locator(`markdown > p:text-is("${textOnPage}")`),
          1,
        );
      }),
      ...Array.from({ length: 3 }, (_, index) => {
        const textOnPage = (uploadCaseDocumentsContent as any)[
          `textOnPage${index + 3}`
        ];
        return commonHelpers.checkVisibleAndPresent(
          page.locator(`ul > li:text-is("${textOnPage}")`),
          1,
        );
      }),
      expect(page.locator("markdown > p").nth(3)).toContainText(
        uploadCaseDocumentsContent.textOnPage6,
      ),
      expect(page.locator("div.panel > h2").nth(0)).toContainText(
        uploadCaseDocumentsContent.subTitle1,
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

  async fillFields(page: Page, multipleDocuments: boolean): Promise<void> {
    await page.click(this.addNew);
    await commonHelpers.uploadFileController(
      page,
      "newCaseworkerCICDocumentUpload",
      0,
      "TG - Other",
      config.testPdfFile,
      true,
    );
    if (multipleDocuments) {
      await page.click(this.addNewBottom);
      await commonHelpers.uploadFileController(
        page,
        "newCaseworkerCICDocumentUpload",
        1,
        "TG - Other",
        config.testWordFile,
        true,
      );
      await page.click(this.addNewBottom);
      await commonHelpers.uploadFileController(
        page,
        "newCaseworkerCICDocumentUpload",
        2,
        "TG - Other",
        config.testFile,
        true,
      );
    }
  },

  async continueOn(page: Page): Promise<void> {
    await page.click(this.continue);
  },

  async triggerErrorMessages(page: Page): Promise<void> {
    await page.click(this.continue);
    await Promise.all([
      expect(page.locator(".govuk-error-summary__title")).toHaveText(
        uploadCaseDocumentsContent.errorBanner,
      ),
      expect(page.locator(".validation-error")).toHaveText(
        uploadCaseDocumentsContent.docError,
      ),
      expect(page.locator(".error-message")).toHaveText(
        uploadCaseDocumentsContent.docError,
      ),
    ]);
    await page.click(this.addNew);
    await page.click(this.continue);
    await page.click(this.continue);
    await Promise.all([
      expect(page.locator(".govuk-error-summary__title")).toHaveText(
        uploadCaseDocumentsContent.errorBanner,
      ),
      expect(page.locator(".validation-error").nth(0)).toHaveText(
        uploadCaseDocumentsContent.categoryError,
      ),
      expect(page.locator(".error-message").nth(0)).toHaveText(
        uploadCaseDocumentsContent.categoryError,
      ),
      expect(page.locator(".validation-error").nth(1)).toHaveText(
        uploadCaseDocumentsContent.descriptionError,
      ),
      expect(page.locator(".error-message").nth(1)).toHaveText(
        uploadCaseDocumentsContent.descriptionError,
      ),
      expect(page.locator(".validation-error").nth(2)).toHaveText(
        uploadCaseDocumentsContent.fieldError,
      ),
    ]);
  },
};

export default uploadCaseDocumentsPage;
