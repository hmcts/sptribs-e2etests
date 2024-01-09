import { expect, Page } from "@playwright/test";
import path from "path";
import config from "../../config.ts";
import axeTest from "../../helpers/accessibilityTestHelper";
import uploadSupportingDocumentsContent from "../../fixtures/content/DSSCreateCase/UploadSupportingDocuments_content.ts"

type UploadSupportingDocumentsPage = {
  fields: {
    dropDown: string;
    uploadFileButton: string;
    fileUploadedOption: string;
  };
  continueButton: string;
  backButton: string;
  checkPageLoads(page: Page, accessibilityTest: boolean): Promise<void>;
  uploadDocumentsSection(page: Page): Promise<void>;
  triggerErrorMessages(page: Page): Promise<void>;
  pressBackButton(page: Page): Promise<void>;
};

const uploadSupportingDocumentsPage: UploadSupportingDocumentsPage = {
  fields: {
    dropDown: ".govuk-details__summary-text",
    uploadFileButton: "#file-upload-1",
    fileUploadedOption: 'button[type="upload document"]',
  },

  continueButton: "#main-form-submit",
  backButton: ".govuk-back-link",

  async checkPageLoads(page: Page, accessibilityTest: boolean): Promise<void> {
    await expect(page.locator(".govuk-heading-l")).toHaveText(
      uploadSupportingDocumentsContent.pageTitle,
    );
    await expect(page.locator(".govuk-body").nth(4)).toHaveText(
      uploadSupportingDocumentsContent.textOnPage1,
    );
    await expect(page.locator(".govuk-details__summary-text")).toHaveText(
      uploadSupportingDocumentsContent.dropdownLink,
    );
    await page.click(this.fields.dropDown);
    await expect(
      page.locator("details[class='govuk-details'] li:nth-child(1)"),
    ).toHaveText(uploadSupportingDocumentsContent.textOnPage2);
    await expect(
      page.locator("details[class='govuk-details'] li:nth-child(2)"),
    ).toContainText(uploadSupportingDocumentsContent.textOnPage3);
    await expect(
      page.locator("details[class='govuk-details'] li:nth-child(3)"),
    ).toContainText(uploadSupportingDocumentsContent.textOnPage4);
    await expect(page.locator(".govuk-details__text")).toContainText(
      uploadSupportingDocumentsContent.textOnPage5,
    );
    await expect(page.locator(".govuk-label").nth(0)).toHaveText(
      uploadSupportingDocumentsContent.textOnPage6,
    );
    await expect(
      page.locator("form[class='formRow'] p[class='govuk-body']"),
    ).toHaveText(uploadSupportingDocumentsContent.textOnPage7);
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async uploadDocumentsSection(page: Page): Promise<void> {
    await page
      .locator(this.fields.uploadFileButton)
      .setInputFiles(config.testFile);
    await page.click(this.fields.fileUploadedOption);
    await expect(
      page.locator(
        "main[id='main-content'] li:nth-child(1).govuk-\\!-padding-top-2.govuk-\\!-padding-bottom-3.govuk-section-break.govuk-section-break--visible",
      ),
    ).toContainText(path.basename(config.testFile));
    await expect(
      page.locator(
        "main[id='main-content'] li:nth-child(1).govuk-\\!-padding-top-2.govuk-\\!-padding-bottom-3.govuk-section-break.govuk-section-break--visible",
      ),
    ).toContainText(uploadSupportingDocumentsContent.deleteButton);
    await page.click(this.continueButton);
  },

  async triggerErrorMessages(page: Page): Promise<void> {
    await page.click(this.continueButton);
    await expect(page.locator(".govuk-error-summary__title")).toHaveText(
      uploadSupportingDocumentsContent.errorBanner,
    );
    await expect(page.locator("[href='#file-upload-1']")).toHaveText(
      uploadSupportingDocumentsContent.noUploadError,
    );
    await page
      .locator(this.fields.uploadFileButton)
      .setInputFiles(config.testOdtFile);
    await page.click(this.fields.fileUploadedOption);
    await expect(page.locator(".govuk-error-summary__title")).toHaveText(
      uploadSupportingDocumentsContent.errorBanner,
    );
    await expect(page.locator("[href='#file-upload-1']")).toHaveText(
      uploadSupportingDocumentsContent.fileTypeError,
    );
  },

  async pressBackButton(page: Page): Promise<void> {
    await page.click(this.backButton);
  },
};

export default uploadSupportingDocumentsPage;
