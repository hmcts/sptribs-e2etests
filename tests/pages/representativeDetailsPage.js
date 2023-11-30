const { expect } = require('@playwright/test');
const representativeDetails = require('../fixtures/content/RepresentativeDetails_content');

module.exports = {
  fields: {
    fullName: '#representativeFullName',
    representativeOrgName: '#representativeOrganisationName',
    representativeContactNumber: '#representativeContactNumber',
    representativeEmailAddress: '#representativeEmailAddress',
  },

  continueButton: '#main-form-submit',
  backButton: '.govuk-back-link',

  async checkPageLoads(page) {
    await expect(page.locator('.govuk-heading-l')).toHaveText(representativeDetails.pageTitle);
    await expect(page.locator('.govuk-body').nth(4)).toHaveText(representativeDetails.textOnPage1);
    await expect(page.locator('.govuk-body').nth(5)).toHaveText(representativeDetails.textOnPage2);
    await expect(page.locator('.govuk-label').nth(0)).toHaveText(representativeDetails.subHeading1);
    await expect(page.locator('.govuk-label').nth(1)).toHaveText(representativeDetails.subHeading2);
    await expect(page.locator('.govuk-label').nth(2)).toHaveText(representativeDetails.subHeading3);
    await expect(page.locator('.govuk-label').nth(3)).toHaveText(representativeDetails.subHeading4);
  },

  async fillInFields(page) {
    await page.fill(this.fields.fullName, representativeDetails.fullName);
    await page.fill(this.fields.representativeOrgName, representativeDetails.Organisation);
    await page.fill(this.fields.representativeContactNumber, representativeDetails.contactNumber);
    await page.fill(this.fields.representativeEmailAddress, representativeDetails.emailAddress);
    await page.click(this.continueButton);
  },

//  async triggerErrorMessages() {
//    await I.see(representativeDetails.pageTitle);
//    await I.click(this.continueButton);
//    await I.see(representativeDetails.errorBanner, '.govuk-error-summary__title');
//    I.see(representativeDetails.fullNameError, { xpath: "//a[contains(text(), '" + representativeDetails.fullNameError + "')]" });
//    I.see(representativeDetails.fullNameError, { xpath: "//p[@id='representativeFullName-error' and contains(., '" + representativeDetails.fullNameError + "')]" });
//    I.see(representativeDetails.organisationNameError, { xpath: "//a[contains(text(), '" + representativeDetails.organisationNameError + "')]" });
//    I.see(representativeDetails.organisationNameError, { xpath: "//p[@id='representativeOrganisationName-error' and contains(., '" + representativeDetails.organisationNameError + "')]" });
//    I.see(representativeDetails.validContactNumberError, { xpath: "//a[contains(text(), '" + representativeDetails.validContactNumberError + "')]" });
//    I.see(representativeDetails.validContactNumberError, { xpath: "//p[@id='representativeContactNumber-error' and contains(., '" + representativeDetails.validContactNumberError + "')]" });
//    I.see(representativeDetails.validEmailError, { xpath: "//a[contains(text(), '" + representativeDetails.validEmailError + "')]" });
//    I.see(representativeDetails.validEmailError, { xpath: "//p[@id='representativeEmailAddress-error' and contains(., '" + representativeDetails.validEmailError + "')]" });
//    I.fillField(this.fields.representativeEmailAddress, representativeDetails.partEmailEntry);
//    await I.click(this.continueButton);
//    await I.see(representativeDetails.partEmailError, { xpath: "//a[contains(text(), '" + representativeDetails.partEmailError + "')]" });
//    I.see(representativeDetails.partEmailError, { xpath: "//p[@id='representativeEmailAddress-error' and contains(., '" + representativeDetails.partEmailError + "')]" });
//    I.clearField(this.fields.representativeEmailAddress)
//  },

  async pressBackButton(page) {
    await page.click(this.backButton);
  },
};
