const { chromium } = require('playwright');
const subjectDetails = require('../fixtures/content/SubjectDetails_content');

module.exports = {
  fields: {
    fullName: '#subjectFullName',
    dayOfBirth: '#subjectDateOfBirth-day',
    monthOfBirth: '#subjectDateOfBirth-month',
    yearOfBirth: '#subjectDateOfBirth-year',
  },
  continueButton: '#main-form-submit',

  async checkPageLoads(page) {
    await page.waitForSelector(`.govuk-heading-l:text("${subjectDetails.pageTitle}")`);
    await page.waitForSelector(`.govuk-hint:text("${subjectDetails.hintText1}")`);
    await page.waitForSelector(`.govuk-hint:text("${subjectDetails.hintText1}")`);
    await page.waitForSelector(`.govuk-label:text("${subjectDetails.subHeading1}")`);
    await page.waitForSelector(`.govuk-label:text("${subjectDetails.subHeading1}")`);
    await page.waitForSelector(`.govuk-fieldset__legend:text("${subjectDetails.subHeading2}")`);
    await page.waitForSelector(`.govuk-hint:text("${subjectDetails.hintText2}")`);
    await page.waitForSelector(`.govuk-date-input__label:text("${subjectDetails.textOnPage1}")`);
    await page.waitForSelector(`.govuk-date-input__label:text("${subjectDetails.textOnPage2}")`);
    await page.waitForSelector(`.govuk-date-input__label:text("${subjectDetails.textOnPage3}")`);
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

  async fillInFields(page) {
    await page.fill(this.fields.fullName, subjectDetails.name);
    await page.fill(this.fields.dayOfBirth, subjectDetails.dayOfBirth);
    await page.fill(this.fields.monthOfBirth, subjectDetails.monthOfBirth);
    await page.fill(this.fields.yearOfBirth, subjectDetails.yearOfBirth);
    await page.click(this.continueButton);
  },
};
