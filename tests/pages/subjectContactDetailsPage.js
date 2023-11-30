const { expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;
const subjectContactDetails = require('../fixtures/content/SubjectContactDetails_content');

module.exports = {
  fields: {
    email: '#subjectEmailAddress',
    mobileNumber: '#subjectContactNumber',
  },

  contactAgreeBox: '#subjectAgreeContact',
  continueButton: '#main-form-submit',
  backButton: '.govuk-back-link',

  async checkPageLoads(page) {
    await expect(page.locator('.govuk-heading-l')).toHaveText(subjectContactDetails.pageTitle);
    await expect(page.locator("main[id='main-content'] p[class='govuk-body']")).toHaveText(subjectContactDetails.textOnPage1);
    await expect(page.locator('.govuk-label').nth(0)).toHaveText(subjectContactDetails.subHeading1);
    await expect(page.locator('.govuk-label').nth(1)).toHaveText(subjectContactDetails.subHeading2);
    await expect(page.locator("label[for='subjectAgreeContact']")).toHaveText(subjectContactDetails.textOnPage2);
  },

  async fillInFields(page, accessibilityTest) {
    await page.fill(this.fields.email, subjectContactDetails.emailAddress);
    await page.fill(this.fields.mobileNumber, subjectContactDetails.contactNumber);
    await page.click(this.contactAgreeBox);
    await page.click(this.continueButton);
    if (accessibilityTest) {
        const accessibilityScanResults = await new AxeBuilder({ page })
              .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
              .analyze();
        expect(accessibilityScanResults.violations).toEqual([]);
    }
  },

  async triggerErrorMessages() {
//    await I.see(subjectDetails.pageTitle);
//    await I.click(this.continueButton);
//    await I.see(subjectDetails.errorBanner, '.govuk-error-summary__title');
//    I.see(subjectDetails.validEmailError, { xpath: "//a[contains(text(), '" + subjectDetails.validEmailError + "')]" });
//    I.see(subjectDetails.validEmailError, { xpath: "//p[@id='subjectEmailAddress-error' and contains(., '" + subjectDetails.validEmailError + "')]" });
//    I.see(subjectDetails.validContactNumberError, { xpath: "//a[contains(text(), '" + subjectDetails.validContactNumberError + "')]" });
//    I.see(subjectDetails.validContactNumberError, { xpath: "//p[@id='subjectContactNumber-error' and contains(., '" + subjectDetails.validContactNumberError + "')]" });
//    I.see(subjectDetails.agreeError, { xpath: "//a[contains(text(), '" + subjectDetails.agreeError + "')]" });
//    I.fillField(this.fields.email, subjectDetails.partEmailEntry);
//    await I.click(this.continueButton);
//    await I.see(subjectDetails.partEmailError, { xpath: "//a[contains(text(), '" + subjectDetails.partEmailError + "')]" });
//    I.see(subjectDetails.partEmailError, { xpath: "//p[@id='subjectEmailAddress-error' and contains(., '" + subjectDetails.partEmailError + "')]" });
//    I.clearField(this.fields.email)
  },

  async pressBackButton(page) {
    await page.click(this.backButton);
  },
};
