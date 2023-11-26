// createCaseFE.test.js
const { test } = require('@playwright/test');
const landingPage = require('../pages/LandingPage');


test('As a Citizen, create an application...', async ({ page }) => {
  const pa11yTests = true;
  const representationPresent = true;
  const representationQualified = true;
  const uploadOtherInfo = true;
  await landingPage.seeTheLandingPage(page);
});
