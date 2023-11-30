const { test } = require('@playwright/test');
const landingPage = require('../pages/LandingPage');
const loginPage = require('../pages/loginPage');
const subjectDetailsPage = require('../pages/subjectDetailsPage');
const subjectContactDetailsPage = require('../pages/subjectContactDetailsPage')
const representationPage = require('../pages/representationPage')
const representationQualifiedPage = require('../pages/representationQualifiedPage')
const representativeDetailsPage = require('../pages/representativeDetailsPage')
const uploadAppealFormPage = require('../pages/uploadAppealFormPage')
const uploadSupportingDocumentsPage = require('../pages/uploadSupportingDocumentsPage')


test('As a Citizen, Create an application with all details, a qualified representative, additional information, no PCQ, and submit', async ({ page }) => {
  const representationPresent = true;
  const representationQualified = true;
  const uploadOtherInfo = true;
  await landingPage.seeTheLandingPage(page);
  await landingPage.continueOn(page);
  await loginPage.SignInUser(page);
  await subjectDetailsPage.checkPageLoads(page);
  await subjectDetailsPage.fillInFields(page);
  await subjectContactDetailsPage.checkPageLoads(page);
  await subjectContactDetailsPage.fillInFields(page);
  await representationPage.checkPageLoads(page);
  await representationPage.fillInFields(page, representationPresent);
  await representationQualifiedPage.checkPageLoads(page);
  await representationQualifiedPage.fillInFields(page, representationQualified);
  await representativeDetailsPage.checkPageLoads(page);
  await representativeDetailsPage.fillInFields(page);
  await uploadAppealFormPage.checkPageLoads(page);
  await uploadAppealFormPage.uploadDocumentsSection(page);
  await uploadSupportingDocumentsPage.checkPageLoads(page);
  await uploadSupportingDocumentsPage.uploadDocumentsSection(page);
});
