const { expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;
const representation = require('../fixtures/content/Representation_content');

module.exports = {
  representationYes: '#representation',
  representationNo: '#representation-2',
  continueButton: '#main-form-submit',
  backButton: '.govuk-back-link',

  async checkPageLoads(page, accessibilityTest) {
    await expect(page.locator('.govuk-fieldset__heading')).toHaveText(representation.pageTitle);
    await expect(page.locator('.govuk-label').nth(0)).toHaveText(representation.textOnPage1);
    await expect(page.locator('.govuk-label').nth(1)).toHaveText(representation.textOnPage2);
    if (accessibilityTest) {
        const accessibilityScanResults = await new AxeBuilder({ page })
              .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
              .analyze();
        expect(accessibilityScanResults.violations).toEqual([]);
    }
  },

  async fillInFields(page, representationPresent) {
    if (representationPresent) {
      await page.click(this.representationYes);
    } else {
      await page.click(this.representationNo);
    }
    await page.click(this.continueButton);
  },

//  async triggerErrorMessages() {
//    await I.see(representation.pageTitle);
//    await I.click(this.continueButton);
//    await I.see(representation.errorBanner, '.govuk-error-summary__title');
//    I.see(representation.selectionError, { xpath: "//a[contains(text(), '" + representation.selectionError + "')]" });
//    I.see(representation.selectionError, { xpath: "//p[@id='representation-error' and contains(., '" + representation.selectionError + "')]" });
//  },

  async pressBackButton(page) {
    await page.click(this.backButton);
  },
};
