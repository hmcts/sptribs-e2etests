// createCaseFE.test.js
const { test } = require('@playwright/test');
const landingPage = require('../pages/LandingPage');
const loginPage = require('../pages/loginPage');
const subjectDetailsPage = require('../pages/subjectDetailsPage');


test('As a Citizen, Create an application with all details, a qualified representative, additional information, no PCQ, and submit', async ({ page }) => {
  const representationPresent = true;
  const representationQualified = true;
  const uploadOtherInfo = true;
  await landingPage.seeTheLandingPage(page);
  await landingPage.continueOn(page);
  await loginPage.SignInUser(page);
  await subjectDetailsPage.checkPageLoads(page);
  await subjectDetailsPage.fillInFields(page);
});
