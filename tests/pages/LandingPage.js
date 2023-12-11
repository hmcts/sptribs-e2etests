const config = require("../config");
const { expect } = require("@playwright/test");
const axeTest = require("../helpers/accessibilityTestHelper.js");
const LandingPageDetails = require("../fixtures/content/LandingPage_content");

module.exports = {
  startButton: 'a[role="button"]',

  async seeTheLandingPage(page, accessibilityTest) {
    await page.goto(config.FEBaseURL);
    await expect(page.locator(".govuk-heading-l")).toHaveText(
      LandingPageDetails.pageTitle,
    );
    await expect(page.locator(".govuk-body-l").nth(1)).toContainText(
      LandingPageDetails.hintMessage,
    );
    await expect(page.locator(".govuk-body-l").nth(1)).toContainText(
      LandingPageDetails.subHeading,
    );
    await expect(page.locator(".govuk-body-l").nth(2)).toHaveText(
      LandingPageDetails.textOnPage1,
    );
    await expect(page.locator(".govuk-body-l").nth(3)).toHaveText(
      LandingPageDetails.textOnPage2,
    );
    await expect(page.locator(this.startButton)).toHaveText("Start now");
    if (accessibilityTest) {
      await axeTest.axeTest(page);
    }
  },

  async continueOn(page) {
    await page.click(this.startButton);
  },
};
