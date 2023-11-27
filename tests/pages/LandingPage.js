const config = require('../config');
const LandingpageDetails = require('../fixtures/content/LandingPage_content');

module.exports = {
  startButton: 'a[role="button"]',

  async seeTheLandingPage(page, pa11yHelper) {
    console.log('User using the URL= ' + config.FEbaseUrl);
    await page.goto(config.FEbaseUrl);
    await page.waitForSelector(`.govuk-heading-l:text("${LandingpageDetails.pageTitle}")`);
    await page.waitForSelector(`.govuk-body-l:text("${LandingpageDetails.hintMessage}")`);
    await page.waitForSelector(`.govuk-body-l:has-text("${LandingpageDetails.subHeading}")`);
    await page.waitForSelector(`.govuk-body-l:text("${LandingpageDetails.descriptionL1}")`);
    await page.waitForSelector(`.govuk-body-l:text("${LandingpageDetails.descriptionL2}")`);
    await page.waitForSelector(this.startButton + ':text("Start now")');

  },

  async continueOn(page) {
    await page.click(this.startButton);
  },
};
