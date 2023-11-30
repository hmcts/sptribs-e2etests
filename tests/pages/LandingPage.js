const config = require('../config');
const { expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;
const LandingpageDetails = require('../fixtures/content/LandingPage_content');

module.exports = {
    startButton: 'a[role="button"]',

    async seeTheLandingPage(page, accessibilityTest) {
        console.log('User using the URL= ' + config.FEbaseUrl);
        await page.goto(config.FEbaseUrl);
        await expect(page.locator('.govuk-heading-l')).toHaveText(LandingpageDetails.pageTitle);
        await expect(page.locator('.govuk-body-l').nth(1)).toContainText(LandingpageDetails.hintMessage);
        await expect(page.locator('.govuk-body-l').nth(1)).toContainText(LandingpageDetails.subHeading);
        await expect(page.locator('.govuk-body-l').nth(2)).toHaveText(LandingpageDetails.descriptionL1);
        await expect(page.locator('.govuk-body-l').nth(3)).toHaveText(LandingpageDetails.descriptionL2);
        await expect(page.locator(this.startButton)).toHaveText('Start now');
        if (accessibilityTest) {
            const accessibilityScanResults = await new AxeBuilder({ page })
                  .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
                  .analyze();
            expect(accessibilityScanResults.violations).toEqual([]);
        }
    },


    async continueOn(page) {
        await page.click(this.startButton);
    },
};
