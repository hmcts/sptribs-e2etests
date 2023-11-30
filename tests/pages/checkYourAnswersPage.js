const { expect } = require('@playwright/test');
const path = require('path');
const config = require('../config.js');
const CheckYourAnswersPage = require('../fixtures/content/CheckYourAnswers_content');
const subjectDetailsPage = require('../fixtures/content/SubjectDetails_content');
const subjectContactDetailsPage = require('../fixtures/content/SubjectContactDetails_content');
const representativeDetailsPage = require('../fixtures/content/RepresentativeDetails_content');
const UploadOtherInfoPage = require('../fixtures/content/UploadOtherInformation_content');

function convertDate() {
    const dayOfBirth = subjectDetailsPage.dayOfBirth;
    const monthOfBirth = subjectDetailsPage.monthOfBirth;
    const yearOfBirth = subjectDetailsPage.yearOfBirth;
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const monthName = months[Number(monthOfBirth) - 1];
    const formattedDate = `${dayOfBirth} ${monthName} ${yearOfBirth}`;
    return formattedDate;
}

module.exports = {

  continueButton: '#main-form-submit',
  backButton: '.govuk-back-link',

  async checkPageLoads(page, representationPresent) {
    await expect(page.locator('.govuk-heading-l').nth(0)).toHaveText(CheckYourAnswersPage.pagetitle);
    await expect(page.locator('.govuk-heading-m').nth(1)).toHaveText(CheckYourAnswersPage.subtitle1);
    await expect(page.locator('.govuk-summary-list__key').nth(0)).toHaveText(CheckYourAnswersPage.textonpage1);
    await expect(page.locator('.govuk-summary-list__key').nth(1)).toHaveText(CheckYourAnswersPage.textonpage2);
    await expect(page.locator('.govuk-summary-list__key').nth(2)).toHaveText(CheckYourAnswersPage.textonpage3);
    await expect(page.locator('.govuk-summary-list__key').nth(3)).toHaveText(CheckYourAnswersPage.textonpage4);
    await expect(page.locator('.govuk-heading-m').nth(2)).toHaveText(CheckYourAnswersPage.subtitle2);
    await expect(page.locator('.govuk-summary-list__key').nth(4)).toHaveText(CheckYourAnswersPage.textonpage5);
    if (representationPresent) {
        await expect(page.locator('.govuk-summary-list__key').nth(5)).toHaveText(CheckYourAnswersPage.textonpage6);
        await expect(page.locator('.govuk-summary-list__key').nth(6)).toHaveText(CheckYourAnswersPage.textonpage7);
        await expect(page.locator('.govuk-heading-m').nth(3)).toHaveText(CheckYourAnswersPage.subtitle3);
        await expect(page.locator('.govuk-summary-list__key').nth(7)).toHaveText(CheckYourAnswersPage.textonpage8);
        await expect(page.locator('.govuk-summary-list__key').nth(8)).toHaveText(CheckYourAnswersPage.textonpage9);
        await expect(page.locator('.govuk-summary-list__key').nth(9)).toHaveText(CheckYourAnswersPage.textonpage10);
        await expect(page.locator('.govuk-heading-m').nth(4)).toHaveText(CheckYourAnswersPage.subtitle4);
        await expect(page.locator('.govuk-summary-list__key').nth(10)).toHaveText(CheckYourAnswersPage.textonpage11);
        await expect(page.locator('.govuk-heading-m').nth(5)).toHaveText(CheckYourAnswersPage.subtitle5);
        await expect(page.locator('.govuk-summary-list__key').nth(11)).toHaveText(CheckYourAnswersPage.textonpage12);
        await expect(page.locator('.govuk-heading-m').nth(6)).toHaveText(CheckYourAnswersPage.subtitle6);
        await expect(page.locator('.govuk-summary-list__key').nth(12)).toHaveText(CheckYourAnswersPage.textonpage13);
        await expect(page.locator('.govuk-summary-list__key').nth(13)).toHaveText(CheckYourAnswersPage.textonpage14);
        await expect(page.locator('.govuk-summary-list__key').nth(14)).toHaveText(CheckYourAnswersPage.textonpage15);
    } else {
        await expect(page.locator('.govuk-heading-m').nth(3)).toHaveText(CheckYourAnswersPage.subtitle4);
        await expect(page.locator('.govuk-summary-list__key').nth(5)).toHaveText(CheckYourAnswersPage.textonpage11);
        await expect(page.locator('.govuk-heading-m').nth(4)).toHaveText(CheckYourAnswersPage.subtitle5);
        await expect(page.locator('.govuk-summary-list__key').nth(6)).toHaveText(CheckYourAnswersPage.textonpage12);
        await expect(page.locator('.govuk-heading-m').nth(5)).toHaveText(CheckYourAnswersPage.subtitle6);
        await expect(page.locator('.govuk-summary-list__key').nth(7)).toHaveText(CheckYourAnswersPage.textonpage13);
        await expect(page.locator('.govuk-summary-list__key').nth(8)).toHaveText(CheckYourAnswersPage.textonpage14);
        await expect(page.locator('.govuk-summary-list__key').nth(9)).toHaveText(CheckYourAnswersPage.textonpage15);
    }
    await expect(page.locator('.govuk-heading-l').nth(1)).toHaveText(CheckYourAnswersPage.subtitle7);
    await expect(page.locator('.govuk-body-l')).toHaveText(CheckYourAnswersPage.textonpage16);
  },

  async checkValidInfoAllFields(page, representationPresent, representationQualified, uploadOtherInfo) {
    const yes = 'Yes';
    const no = 'No';
    await expect(page.locator('.govuk-summary-list__value').nth(0)).toHaveText(subjectDetailsPage.name);
    await expect(page.locator('.govuk-summary-list__value').nth(1)).toHaveText(convertDate());
    await expect(page.locator('.govuk-summary-list__value').nth(2)).toHaveText(subjectContactDetailsPage.emailAddress);
    await expect(page.locator('.govuk-summary-list__value').nth(3)).toHaveText(subjectContactDetailsPage.contactNumber);
    if (representationPresent) {
        await expect(page.locator('.govuk-summary-list__value').nth(4)).toHaveText(yes);
        if (representationQualified) {
            await expect(page.locator('.govuk-summary-list__value').nth(5)).toHaveText(yes);
        } else if (representationQualified === false) {
            await expect(page.locator('.govuk-summary-list__value').nth(5)).toHaveText(no);
        }
        await expect(page.locator('.govuk-summary-list__value').nth(6)).toHaveText(representativeDetailsPage.fullName);
        await expect(page.locator('.govuk-summary-list__value').nth(7)).toHaveText(representativeDetailsPage.Organisation);
        await expect(page.locator('.govuk-summary-list__value').nth(8)).toHaveText(representativeDetailsPage.contactNumber);
        await expect(page.locator('.govuk-summary-list__value').nth(9)).toHaveText(representativeDetailsPage.emailAddress);
        await expect(page.locator('.govuk-summary-list__value').nth(10)).toHaveText(path.basename(config.testPdfFile));
        await expect(page.locator('.govuk-summary-list__value').nth(11)).toHaveText(path.basename(config.testFile));
        if (uploadOtherInfo) {
            await expect(page.locator('.govuk-summary-list__value').nth(12)).toHaveText(path.basename(config.testWordFile));
            await expect(page.locator('.govuk-summary-list__value').nth(13)).toHaveText(path.basename(UploadOtherInfoPage.documentRelevance));
            await expect(page.locator('.govuk-summary-list__value').nth(14)).toHaveText(path.basename(UploadOtherInfoPage.additionalInfo));
        }
    } else {
        await expect(page.locator('.govuk-summary-list__value').nth(4)).toHaveText(no);
        await expect(page.locator('.govuk-summary-list__value').nth(5)).toHaveText(path.basename(config.testPdfFile));
        await expect(page.locator('.govuk-summary-list__value').nth(6)).toHaveText(path.basename(config.testFile));
        if (uploadOtherInfo) {
            await expect(page.locator('.govuk-summary-list__value').nth(7)).toHaveText(path.basename(config.testWordFile));
            await expect(page.locator('.govuk-summary-list__value').nth(8)).toHaveText(path.basename(UploadOtherInfoPage.documentRelevance));
            await expect(page.locator('.govuk-summary-list__value').nth(9)).toHaveText(path.basename(UploadOtherInfoPage.additionalInfo));
        }
    }
  },

  async continueOn(page) {
      await page.click(this.continueButton);
  },

  async pressBackButton(page) {
      await page.click(this.backButton);
  },


};
