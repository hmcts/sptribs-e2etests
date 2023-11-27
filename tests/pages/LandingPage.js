const config = require('../config');
const { expect } = require('@playwright/test');
const LandingpageDetails = require('../fixtures/content/LandingPage_content');

module.exports = {
    startButton: 'a[role="button"]',

    async seeTheLandingPage(page) {
        console.log('User using the URL= ' + config.FEbaseUrl);
        await page.goto(config.FEbaseUrl);

        await expect(page.locator('.govuk-heading-l')).toHaveText(LandingpageDetails.pageTitle);
        await expect(page.locator('.govuk-body-l').nth(1)).toContainText(LandingpageDetails.hintMessage);
        await expect(page.locator('.govuk-body-l').nth(1)).toContainText(LandingpageDetails.subHeading);
        await expect(page.locator('.govuk-body-l').nth(2)).toHaveText(LandingpageDetails.descriptionL1);
        await expect(page.locator('.govuk-body-l').nth(3)).toHaveText(LandingpageDetails.descriptionL2);
        await expect(page.locator(this.startButton)).toHaveText('Start now');
    },


    async continueOn(page) {
        await page.click(this.startButton);
    },
};
