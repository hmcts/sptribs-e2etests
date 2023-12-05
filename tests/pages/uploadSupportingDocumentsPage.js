const { expect } = require("@playwright/test");
const path = require("path");
const axeTest = require("../helpers/accessibilityTestHelper.js");
const config = require("../config.js");
const UploadSupportingDocuments = require("../fixtures/content/UploadSupportingDocuments_content");
const UploadAppealForm = require("../fixtures/content/UploadAppealForm_content");

module.exports = {
  fields: {
    dropDown: ".govuk-details__summary-text",
    uploadFileButton: "#file-upload-1",
    fileUploadedOption: 'button[type="upload document"]',
  },

  continueButton: "#main-form-submit",
  backButton: ".govuk-back-link",

  async checkPageLoads(page, accessibilityTest) {
    await expect(page.locator(".govuk-heading-l")).toHaveText(
      UploadSupportingDocuments.pageTitle,
    );
    await expect(page.locator(".govuk-body").nth(4)).toHaveText(
      UploadSupportingDocuments.textOnPage1,
    );
    await expect(page.locator(".govuk-details__summary-text")).toHaveText(
      UploadSupportingDocuments.dropdownlink,
    );
    await page.click(this.fields.dropDown);
    await expect(
      page.locator("details[class='govuk-details'] li:nth-child(1)"),
    ).toHaveText(UploadSupportingDocuments.textOnPage2);
    await expect(
      page.locator("details[class='govuk-details'] li:nth-child(2)"),
    ).toContainText(UploadSupportingDocuments.textOnPage3);
    await expect(
      page.locator("details[class='govuk-details'] li:nth-child(3)"),
    ).toContainText(UploadSupportingDocuments.textOnPage4);
    await expect(page.locator(".govuk-details__text")).toContainText(
      UploadSupportingDocuments.textOnPage5,
    );
    await expect(page.locator(".govuk-label").nth(0)).toHaveText(
      UploadSupportingDocuments.textOnPage6,
    );
    await expect(
      page.locator("form[class='formRow'] p[class='govuk-body']"),
    ).toHaveText(UploadSupportingDocuments.textOnPage7);
    if (accessibilityTest) {
      await axeTest.axeTest(page);
    }
  },

  async uploadDocumentsSection(page) {
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
    ).toContainText(UploadSupportingDocuments.deleteButton);
    await page.click(this.continueButton);
  },

  async triggerErrorMessages(page) {
    await page.click(this.continueButton);
    await expect(page.locator(".govuk-error-summary__title")).toHaveText(
      UploadSupportingDocuments.errorBanner,
    );
    await expect(page.locator("[href='#file-upload-1']")).toHaveText(
      UploadSupportingDocuments.noUploadError,
    );
    await page
      .locator(this.fields.uploadFileButton)
      .setInputFiles(config.testOdtFile);
    await page.click(this.fields.fileUploadedOption);
    await expect(page.locator(".govuk-error-summary__title")).toHaveText(
      UploadSupportingDocuments.errorBanner,
    );
    await expect(page.locator("[href='#file-upload-1']")).toHaveText(
      UploadSupportingDocuments.fileTypeError,
    );
  },

  async pressBackButton(page) {
    await page.click(this.backButton);
  },
};
