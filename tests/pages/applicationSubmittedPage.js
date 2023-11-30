const { expect } = require('@playwright/test');
const path = require('path');
const AxeBuilder = require('@axe-core/playwright').default
const config = require('../config.js');
const applicationSubmittedDetailsPage = require('../fixtures/content/applicationSubmitted_content.js')

module.exports = {

  closeAndExitButton: 'a[role=\'button\']',

  async checkPageLoads(page, accessibilityTest) {
    await expect(page.locator('.govuk-panel__title')).toHaveText(applicationSubmittedDetailsPage.pagetitle);
    await expect(page.locator('div[class=\'govuk-panel__body\'] strong')).toContainText(applicationSubmittedDetailsPage.subtitle1);
    await expect(page.locator('.govuk-body').nth(4)).toHaveText(applicationSubmittedDetailsPage.textonpage1);
    await expect(page.locator('.govuk-body').nth(5)).toHaveText(applicationSubmittedDetailsPage.textonpage2);
    await expect(page.locator('.govuk-notification-banner__title')).toHaveText(applicationSubmittedDetailsPage.subtitle2);
    await expect(page.locator('.govuk-notification-banner__content')).toContainText(applicationSubmittedDetailsPage.textonpage3);
    await expect(page.locator('.govuk-notification-banner__content')).toContainText(applicationSubmittedDetailsPage.textonpage4);
    await expect(page.locator('.govuk-notification-banner__content')).toContainText(applicationSubmittedDetailsPage.textonpage5);
    if (accessibilityTest) {
        const accessibilityScanResults = await new AxeBuilder({ page })
              .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
              .analyze();
        expect(accessibilityScanResults.violations).toEqual([]);
    }
  },

  async checkCICCaseNumber(page) {
    const cicCaseData = await page.textContent('.govuk-panel__body');
    const caseNumber = cicCaseData.replace(/\D/g, '');
    if (caseNumber.length !== 16) {
      throw new Error(`String length should be 16, but it is ${caseNumber.length}`);
    }
  }
};
