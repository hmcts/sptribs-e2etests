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
const uploadOtherInformationPage = require('../pages/uploadOtherInformationPage')
const checkYourAnswersPage = require('../pages/checkYourAnswersPage')
const applicationSubmittedPage = require('../pages/applicationSubmittedPage')


async function createFEApplication(
  page,
  representationPresent,
  representationQualified,
  uploadOtherInfo,
  completeApplication,
  backButtonJourney,
  accessibilityTest
  ) {
  await landingPage.seeTheLandingPage(page, accessibilityTest);
  await landingPage.continueOn(page);
  await loginPage.SignInUser(page);
  await subjectDetailsPage.checkPageLoads(page, accessibilityTest);
  await subjectDetailsPage.fillInFields(page);
  await subjectContactDetailsPage.checkPageLoads(page, accessibilityTest);
  await subjectContactDetailsPage.fillInFields(page);
  await representationPage.checkPageLoads(page, accessibilityTest);
  await representationPage.fillInFields(page, representationPresent);
  if (representationPresent) {
    await representationQualifiedPage.checkPageLoads(page, accessibilityTest);
    await representationQualifiedPage.fillInFields(page, representationQualified);
    await representativeDetailsPage.checkPageLoads(page, accessibilityTest);
    await representativeDetailsPage.fillInFields(page);
  }
  await uploadAppealFormPage.checkPageLoads(page, accessibilityTest);
  await uploadAppealFormPage.uploadDocumentsSection(page);
  await uploadSupportingDocumentsPage.checkPageLoads(page, accessibilityTest);
  await uploadSupportingDocumentsPage.uploadDocumentsSection(page);
  await uploadOtherInformationPage.checkPageLoads(page, accessibilityTest);
  await uploadOtherInformationPage.uploadDocumentsSection(page, uploadOtherInfo);
  await page.click('button[name="opt-out-button"]'); // Opt out of PCQ
  await checkYourAnswersPage.checkPageLoads(page, representationPresent, accessibilityTest);
  await checkYourAnswersPage.checkValidInfoAllFields(page, representationPresent, representationQualified, uploadOtherInfo);
  if (completeApplication) {
    await checkYourAnswersPage.continueOn(page);
    await applicationSubmittedPage.checkPageLoads(page, accessibilityTest);
    await applicationSubmittedPage.checkCICCaseNumber(page);
  }
  if (backButtonJourney) {
    await checkYourAnswersPage.pressBackButton(page);
    await uploadOtherInformationPage.checkPageLoads(page, accessibilityTest);
    await uploadOtherInformationPage.pressBackButton(page);
    await uploadSupportingDocumentsPage.checkPageLoads(page, accessibilityTest);
    await uploadSupportingDocumentsPage.pressBackButton(page);
    await uploadAppealFormPage.checkPageLoads(page, accessibilityTest);
    await uploadAppealFormPage.pressBackButton(page);
    await representativeDetailsPage.checkPageLoads(page, accessibilityTest);
    await representativeDetailsPage.pressBackButton(page);
    await representationQualifiedPage.checkPageLoads(page, accessibilityTest);
    await representationQualifiedPage.pressBackButton(page);
    await representationPage.checkPageLoads(page, accessibilityTest);
    await representationPage.pressBackButton(page);
    await subjectContactDetailsPage.checkPageLoads(page, accessibilityTest);
    await subjectContactDetailsPage.pressBackButton(page);
    await subjectDetailsPage.checkPageLoads(page, accessibilityTest);
  }
}

module.exports = {
  createFEApplication,
  landingPage,
  loginPage,
  subjectDetailsPage,
  subjectContactDetailsPage,
  representationPage,
  representationQualifiedPage,
  representativeDetailsPage,
  uploadAppealFormPage,
  uploadSupportingDocumentsPage,
  uploadOtherInformationPage,
  checkYourAnswersPage,
  applicationSubmittedPage,
};

test('As a Citizen, Create an application with all details, a qualified representative, additional information, no PCQ, and submit - aXe test as it proceeds.', async ({ page }) => {
  const representationPresent = true,
  representationQualified = true,
  uploadOtherInfo = true,
  completeApplication = true,
  backButtonJourney = false,
  accessibilityTest = true
  await createFEApplication(page,
    representationPresent,
    representationQualified,
    uploadOtherInfo,
    completeApplication,
    backButtonJourney,
    accessibilityTest);
});

test('Create an application with no representative, additional information, no PCQ, and submit.', async ({ page }) => {
  const representationPresent = false,
  representationQualified = null,
  uploadOtherInfo = true,
  completeApplication = true,
  backButtonJourney = false,
  accessibilityTest = false
  await createFEApplication(page,
    representationPresent,
    representationQualified,
    uploadOtherInfo,
    completeApplication,
    backButtonJourney,
    accessibilityTest);
});

test('Create an application with all details, a qualified representative, no additional information, no PCQ, and submit.', async ({ page }) => {
  const representationPresent = true,
  representationQualified = true,
  uploadOtherInfo = false,
  completeApplication = true,
  backButtonJourney = false,
  accessibilityTest = false
  await createFEApplication(page,
    representationPresent,
    representationQualified,
    uploadOtherInfo,
    completeApplication,
    backButtonJourney,
    accessibilityTest);
});

test('Create an application with all details, an unqualified representative, no additional information, no PCQ, and submit.', async ({ page }) => {
  const representationPresent = true,
  representationQualified = false,
  uploadOtherInfo = false,
  completeApplication = true,
  backButtonJourney = false,
  accessibilityTest = false
  await createFEApplication(page,
    representationPresent,
    representationQualified,
    uploadOtherInfo,
    completeApplication,
    backButtonJourney,
    accessibilityTest);
});

test('Test all back buttons on the Frontend application', async ({ page }) => {
  const representationPresent = true,
  representationQualified = true,
  uploadOtherInfo = true,
  completeApplication = false,
  backButtonJourney = true,
  accessibilityTest = false
  await createFEApplication(page,
    representationPresent,
    representationQualified,
    uploadOtherInfo,
    completeApplication,
    backButtonJourney,
    accessibilityTest);
});