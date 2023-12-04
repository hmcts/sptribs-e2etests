const { expect } = require("@playwright/test");
const path = require("path");
const axeTest = require("../helpers/accessibilityTestHelper.js");
const config = require("../config.js");
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
      UploadAppealForm.pageTitle,
    );
    await expect(page.locator(".govuk-body").nth(4)).toHaveText(
      UploadAppealForm.textOnPage1,
    );
    await expect(page.locator(".govuk-body").nth(5)).toHaveText(
      UploadAppealForm.textOnPage2,
    );
    await expect(page.locator(".govuk-details__summary-text")).toHaveText(
      UploadAppealForm.dropdownlink,
    );
    await page.click(this.fields.dropDown);
    await expect(page.locator(".govuk-details__summary-text")).toHaveText(
      UploadAppealForm.dropdownlink,
    );
    await expect(
      page.locator("details[class='govuk-details'] li:nth-child(1)"),
    ).toHaveText(UploadAppealForm.textOnPage3);
    await expect(
      page.locator("details[class='govuk-details'] li:nth-child(2)"),
    ).toContainText(UploadAppealForm.textOnPage4);
    await expect(
      page.locator("details[class='govuk-details'] li:nth-child(3)"),
    ).toContainText(UploadAppealForm.textOnPage5);
    await expect(page.locator(".govuk-details__text")).toContainText(
      UploadAppealForm.textOnPage6,
    );
    await expect(page.locator(".govuk-label").nth(0)).toHaveText(
      UploadAppealForm.textOnPage7,
    );
    await expect(
      page.locator("form[class='formRow'] p[class='govuk-body']"),
    ).toHaveText(UploadAppealForm.textOnPage8);
    if (accessibilityTest) {
      await axeTest.axeTest(page);
    }
  },

  async uploadDocumentsSection(page) {
    await page
      .locator(this.fields.uploadFileButton)
      .setInputFiles(config.testPdfFile);
    await page.click(this.fields.fileUploadedOption);
    await expect(
      page.locator(
        "main[id='main-content'] li:nth-child(1).govuk-\\!-padding-top-2.govuk-\\!-padding-bottom-3.govuk-section-break.govuk-section-break--visible",
      ),
    ).toContainText(path.basename(config.testPdfFile));
    await expect(
      page.locator(
        "main[id='main-content'] li:nth-child(1).govuk-\\!-padding-top-2.govuk-\\!-padding-bottom-3.govuk-section-break.govuk-section-break--visible",
      ),
    ).toContainText(UploadAppealForm.deleteButton);
    await page.click(this.continueButton);
  },

  //  async triggerErrorMessages() {
  //    await I.see(UploadAppealForm.pageTitle);
  //    await I.click(this.continueButton);
  //    await I.see(UploadAppealForm.errorBanner, '.govuk-error-summary__title');
  //    I.see(UploadAppealForm.noUploadError, { xpath: "//a[contains(text(), '" + UploadAppealForm.noUploadError + "')]" });
  //    await I.refreshPage();
  //    await I.attachFile(this.fields.uploadFileButton, config.testFile)
  //    await I.click(this.fields.fileUploadedOption);
  //    await I.see(UploadAppealForm.errorBanner, '.govuk-error-summary__title');
  //    I.see(UploadAppealForm.fileTypeError, { xpath: "//a[contains(text(), '" + UploadAppealForm.fileTypeError + "')]" });
  //  },
  //
  async pressBackButton(page) {
    await page.click(this.backButton);
  },
};
