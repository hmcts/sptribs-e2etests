const { expect } = require('@playwright/test');
const representationQualified = require('../fixtures/content/RepresentationQualified_content');

module.exports = {

  qualifiedYes: '#representationQualified',
  qualifiedNo: '#representationQualified-2',
  continueButton: '#main-form-submit',
  backButton: '.govuk-back-link',

  async checkPageLoads(page) {
    await expect(page.locator('.govuk-fieldset__heading')).toHaveText(representationQualified.pageTitle);
    await expect(page.locator('.govuk-hint')).toHaveText(representationQualified.hintMessage);
    await expect(page.locator('.govuk-radios__label').nth(0)).toHaveText(representationQualified.textOnPage1);
    await expect(page.locator('.govuk-radios__label').nth(1)).toHaveText(representationQualified.textOnPage2);
  },

  async fillInFields(page, representationQualified) {
    if (representationQualified) {
      await page.click(this.qualifiedYes);
    } else {
      await page.click(this.qualifiedNo);
    }
    await page.click(this.continueButton);
  },

//  async triggerErrorMessages() {
//    await I.see(representationQualified.pageTitle);
//    await I.click(this.continueButton);
//    await I.see(representationQualified.errorBanner, '.govuk-error-summary__title');
//    I.see(representationQualified.selectionError, { xpath: "//a[contains(text(), '" + representationQualified.selectionError + "')]" });
//    I.see(representationQualified.selectionError, { xpath: "//p[@id='representationQualified-error' and contains(., '" + representationQualified.selectionError + "')]" });
//  },
//
  async pressBackButton() {
    await page.click(this.backButton);
  },
};
