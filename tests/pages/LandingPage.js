const config = require('../config');
const LandingpageDetails = require('../fixtures/content/LandingPage_content');

module.exports = {
  startButton: 'a[role="button"]',

  async seeTheLandingPage(page, pa11yHelper) {
    console.log('User using the URL= ' + config.FEbaseUrl);
    await page.goto(config.FEbaseUrl);
    await page.waitForSelector(`.govuk-heading-l:text("${LandingpageDetails.pageTitle}")`);
    page.waitForSelector(`.govuk-body-l:text("${LandingpageDetails.hintMessage}")`);
    page.waitForSelector(`.govuk-body-l:has-text("${LandingpageDetails.subHeading}")`);
    page.waitForSelector(`.govuk-body-l:text("${LandingpageDetails.descriptionL1}")`);
    page.waitForSelector(`.govuk-body-l:text("${LandingpageDetails.descriptionL2}")`);
    page.waitForSelector(`a[role='button']:text("Start now")`)
  },

  async continueOn(page) {
    await page.click(this.startButton);
  },
};
