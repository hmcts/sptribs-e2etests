// LandingPage.js
const config = require('../config');
const LandingpageDetails = require('../fixtures/content/LandingPage_content');

module.exports = {
  startButton: 'a[role="button"]',

  async seeTheLandingPage(page, pa11yHelper) {
    console.log('User using the URL= ' + config.FEbaseUrl);
    await page.goto(config.FEbaseUrl);
//    await page.waitForSelector(`your-css-selector:has-text("${LandingpageDetails.pageTitle}")`);
//    await page.waitForSelector(`your-hintmessage-css-selector:has-text("${LandingpageDetails.hintMessage}")`);
//    await page.waitForSelector(`your-descriptionl1-css-selector:has-text("${LandingpageDetails.descriptionL1}")`);
//    await page.waitForSelector(`your-descriptionl2-css-selector:has-text("${LandingpageDetails.descriptionL2}")`);
  },

  async continueOn() {
    await page.click(this.startButton);
  },
};
