const { expect } = require('@playwright/test');
const path = require('path');
const config = require('../config.js');
const UploadOtherInformation = require('../fixtures/content/UploadOtherInformation_content');

module.exports = {
  fields: {
    dropDown: '.govuk-details__summary-text',
    uploadFileButton: '#file-upload-1',
    fileUploadedOption: 'button[type="upload document"]',
    documentRelevance: '#documentRelevance',
    additionalInfo: '#additionalInformation',
  },

  continueButton: '#main-form-submit',
  backButton: '.govuk-back-link',

  async checkPageLoads(page) {
    await expect(page.locator('.govuk-heading-l')).toHaveText(UploadOtherInformation.pageTitle);
    await expect(page.locator('.govuk-heading-m').nth(1)).toHaveText(UploadOtherInformation.subTitle1);
    await expect(page.locator('.govuk-body').nth(4)).toHaveText(UploadOtherInformation.textonpage1);
    await expect(page.locator('.govuk-body').nth(5)).toHaveText(UploadOtherInformation.textonpage2);
    await expect(page.locator('.govuk-body').nth(6)).toHaveText(UploadOtherInformation.textonpage3);
    await expect(page.locator('div[class=\'govuk-body-m\'] li:nth-child(1)')).toHaveText(UploadOtherInformation.textonpage4);
    await expect(page.locator('div[class=\'govuk-body-m\'] li:nth-child(2)')).toHaveText(UploadOtherInformation.textonpage5);
    await expect(page.locator('div[class=\'govuk-body-m\'] li:nth-child(3)')).toHaveText(UploadOtherInformation.textonpage6);
    await expect(page.locator('div[class=\'govuk-body-m\'] li:nth-child(4)')).toHaveText(UploadOtherInformation.textonpage7);
    await expect(page.locator('.govuk-body').nth(7)).toHaveText(UploadOtherInformation.textonpage8);
    await expect(page.locator('.govuk-details__summary-text')).toHaveText(UploadOtherInformation.dropdownlink);
    await page.click(this.fields.dropDown);
    await expect(page.locator('details[class=\'govuk-details\'] li:nth-child(1)')).toHaveText(UploadOtherInformation.textonpage9);
    await expect(page.locator('details[class=\'govuk-details\'] li:nth-child(2)')).toContainText(UploadOtherInformation.textonpage10);
    await expect(page.locator('details[class=\'govuk-details\'] li:nth-child(3)')).toContainText(UploadOtherInformation.textonpage11);
    await expect(page.locator('details[class=\'govuk-details\'] li:nth-child(4)')).toContainText(UploadOtherInformation.textonpage12);
    await expect(page.locator('.govuk-details__text')).toContainText(UploadOtherInformation.textonpage13);
    await expect(page.locator('.govuk-label').nth(0)).toHaveText(UploadOtherInformation.textonpage14)
    await expect(page.locator('form[class=\'formRow\'] p[class=\'govuk-body\']')).toHaveText(UploadOtherInformation.textonpage15);
    await expect(page.locator('.govuk-label').nth(1)).toHaveText(UploadOtherInformation.subTitle2)
    await expect(page.locator('#documentRelevance-hint')).toHaveText(UploadOtherInformation.textonpage16)
    await expect(page.locator('.govuk-label').nth(2)).toHaveText(UploadOtherInformation.subTitle3)
    await expect(page.locator('#additionalInformation-hint')).toHaveText(UploadOtherInformation.textonpage17)
  },

  async uploadDocumentsSection(page, uploadInformation) {
    if (uploadInformation) {
      await page.locator(this.fields.uploadFileButton).setInputFiles(config.testWordFile);
      await page.click(this.fields.fileUploadedOption);
      await expect(page.locator('main[id=\'main-content\'] li:nth-child(1).govuk-\\!-padding-top-2.govuk-\\!-padding-bottom-3.govuk-section-break.govuk-section-break--visible')).toContainText(path.basename(config.testWordFile));
      await expect(page.locator('main[id=\'main-content\'] li:nth-child(1).govuk-\\!-padding-top-2.govuk-\\!-padding-bottom-3.govuk-section-break.govuk-section-break--visible')).toContainText(UploadOtherInformation.deleteButton);
      await page.fill(this.fields.documentRelevance, UploadOtherInformation.documentRelevance);
      await page.fill(this.fields.additionalInfo, UploadOtherInformation.additionalInfo);
    }
    await page.click(this.continueButton);
  },

  async triggerErrorMessages() {
    await I.see(UploadOtherInfo.pageTitle);
    await I.attachFile(this.fields.uploadFileButton, config.testOdtFile)
    await I.click(this.fields.fileUploadedOption);
    await I.see(UploadOtherInfo.errorBanner, '.govuk-error-summary__title');
    I.see(UploadOtherInfo.fileTypeError, { xpath: "//a[contains(text(), '" + UploadOtherInfo.fileTypeError + "')]" });
  },

  async pressBackButton() {
    await page.click(this.backButton);
  },
};
