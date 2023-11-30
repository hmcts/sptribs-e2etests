const { expect } = require('@playwright/test');
const subjectDetails = require('../fixtures/content/SubjectDetails_content');

module.exports = {
  fields: {
    fullName: '#subjectFullName',
    dayOfBirth: '#subjectDateOfBirth-day',
    monthOfBirth: '#subjectDateOfBirth-month',
    yearOfBirth: '#subjectDateOfBirth-year',
  },
  continueButton: '#main-form-submit',
  rejectCookiesButton: '.cookie-banner-reject-button',

  async checkPageLoads(page) {
    await expect(page.locator('.govuk-heading-l')).toHaveText(subjectDetails.pageTitle);
    await expect(page.locator('.govuk-hint').nth(0)).toHaveText(subjectDetails.hintText1);
    await expect(page.locator('.govuk-hint').nth(1)).toHaveText(subjectDetails.hintText2);
    await expect(page.locator('.govuk-label').nth(0)).toHaveText(subjectDetails.subHeading1);
    await expect(page.locator('.govuk-fieldset__legend')).toHaveText(subjectDetails.subHeading2);
    await expect(page.locator('#subjectDateOfBirth-hint')).toHaveText(subjectDetails.hintText2);
    await expect(page.locator('.govuk-label').nth(1)).toHaveText(subjectDetails.textOnPage1);
    await expect(page.locator('.govuk-label').nth(2)).toHaveText(subjectDetails.textOnPage2);
    await expect(page.locator('.govuk-label').nth(3)).toHaveText(subjectDetails.textOnPage3);
  },

  async fillInFields(page) {
    await page.click(this.rejectCookiesButton);
    await page.fill(this.fields.fullName, subjectDetails.name);
    await page.fill(this.fields.dayOfBirth, subjectDetails.dayOfBirth);
    await page.fill(this.fields.monthOfBirth, subjectDetails.monthOfBirth);
    await page.fill(this.fields.yearOfBirth, subjectDetails.yearOfBirth);
    await page.click(this.continueButton);
  },


  async triggerErrorMessages(page) {
//    await page.waitForSelector(`text=${subjectDetails.pageTitle}`);
//    await page.click(this.continueButton);
//    await page.waitForSelector(`.govuk-error-summary__title:has-text("${subjectDetails.errorBanner}")`);
//    await page.waitForSelector(`"//a:has-text("${subjectDetails.fullNameError}")`);
//    await page.waitForSelector(`"//p[@id='subjectFullName-error' and contains(., "${subjectDetails.fullNameError}")]`);
//    await page.waitForSelector(`"//a:has-text("${subjectDetails.dateOfBirthError}")`);
//    await page.waitForSelector(`"//p[@id='subjectDateOfBirth-error' and contains(., "${subjectDetails.dateOfBirthError}")]`);
  },
};
