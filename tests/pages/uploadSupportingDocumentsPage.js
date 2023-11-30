const { expect } = require('@playwright/test');
const path = require('path');
const config = require('../config.js');
const UploadSupportingDocuments = require('../fixtures/content/UploadSupportingDocuments_content');

module.exports = {
  fields: {
    dropDown: '.govuk-details__summary-text',
    uploadFileButton: '#file-upload-1',
    fileUploadedOption: 'button[type="upload document"]',
  },

  continueButton: '#main-form-submit',
  backButton: '.govuk-back-link',

  async checkPageLoads(page) {
    await expect(page.locator('.govuk-heading-l')).toHaveText(UploadSupportingDocuments.pageTitle);
    await expect(page.locator('.govuk-body').nth(4)).toHaveText(UploadSupportingDocuments.textonpage1);
    await expect(page.locator('.govuk-details__summary-text')).toHaveText(UploadSupportingDocuments.dropdownlink);
    await page.click(this.fields.dropDown);
    await expect(page.locator('main[id=\'main-content\'] li:nth-child(1)')).toHaveText(UploadSupportingDocuments.textonpage2);
    await expect(page.locator('main[id=\'main-content\'] li:nth-child(2)')).toContainText(UploadSupportingDocuments.textonpage3);
    await expect(page.locator('main[id=\'main-content\'] li:nth-child(3)')).toContainText(UploadSupportingDocuments.textonpage4);
    await expect(page.locator('.govuk-details__text')).toContainText(UploadSupportingDocuments.textonpage5);
    await expect(page.locator('.govuk-label').nth(0)).toHaveText(UploadSupportingDocuments.textonpage6)
    await expect(page.locator('form[class=\'formRow\'] p[class=\'govuk-body\']')).toHaveText(UploadSupportingDocuments.textonpage7);
  },

  async uploadDocumentsSection(page) {
    await page.locator(this.fields.uploadFileButton).setInputFiles(config.testFile);
    await page.click(this.fields.fileUploadedOption);
    await expect(page.locator('main[id=\'main-content\'] li:nth-child(1).govuk-\\!-padding-top-2.govuk-\\!-padding-bottom-3.govuk-section-break.govuk-section-break--visible')).toContainText(path.basename(config.testFile));
    await expect(page.locator('main[id=\'main-content\'] li:nth-child(1).govuk-\\!-padding-top-2.govuk-\\!-padding-bottom-3.govuk-section-break.govuk-section-break--visible')).toContainText(UploadSupportingDocuments.deleteButton);
    await page.click(this.continueButton);
  },

  async triggerErrorMessages() {
    await I.see(UploadSupportingDocuments.pageTitle);
    await I.click(this.continueButton);
    await I.see(UploadSupportingDocuments.errorBanner, '.govuk-error-summary__title');
    I.see(UploadSupportingDocuments.noUploadError, { xpath: "//a[contains(text(), '" + UploadSupportingDocuments.noUploadError + "')]" });
    await I.refreshPage();
    await I.attachFile(this.fields.uploadFileButton, config.testOdtFile)
    await I.click(this.fields.fileUploadedOption);
    await I.see(UploadSupportingDocuments.errorBanner, '.govuk-error-summary__title');
    I.see(UploadSupportingDocuments.fileTypeError, { xpath: "//a[contains(text(), '" + UploadSupportingDocuments.fileTypeError + "')]" });
  },

  async pressBackButton() {
    await page.click(this.backButton);
  },
};
