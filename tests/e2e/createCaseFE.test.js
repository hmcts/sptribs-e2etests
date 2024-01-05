const { test } = require("@playwright/test");
const landingPage = require("../pages/LandingPage");
const loginPage = require("../pages/loginPage");
const subjectDetailsPage = require("../pages/subjectDetailsPage");
const subjectContactDetailsPage = require("../pages/subjectContactDetailsPage");
const representationPage = require("../pages/representationPage");
const representationQualifiedPage = require("../pages/representationQualifiedPage");
const representativeDetailsPage = require("../pages/representativeDetailsPage");
const uploadAppealFormPage = require("../pages/uploadAppealFormPage");
const uploadSupportingDocumentsPage = require("../pages/uploadSupportingDocumentsPage");
const uploadOtherInformationPage = require("../pages/uploadOtherInformationPage");
const checkYourAnswersPage = require("../pages/checkYourAnswersPage");
const applicationSubmittedPage = require("../pages/applicationSubmittedPage");
const caseAPILoginPage = require("../pages/caseAPILoginPage");
const casesPage = require("../pages/casesPage");
const historyTabPage = require("../pages/caseTabs/historyTabPage");
const summaryTabPage = require("../pages/caseTabs/summaryTabPage");
const stateTabPage = require("../pages/caseTabs/stateTabPage");
const caseDetailsTabPage = require("../pages/caseTabs/caseDetailsTabPage");
const casePartiesTabPage = require("../pages/caseTabs/casePartiesTabPage");
const caseDocumentsTabPage = require("../pages/caseTabs/caseDocumentsTabPage");
const caseFileViewTabPage = require("../pages/caseTabs/caseFileViewTabPage");

async function createFEApplication(
  page,
  representationPresent,
  representationQualified,
  uploadOtherInfo,
  completeApplication,
  backButtonJourney,
  accessibilityTest,
  errorMessaging,
) {
  switch (errorMessaging) {
    case false: // For all non-error message tests
      await normalFEFlow(
        page,
        representationPresent,
        representationQualified,
        uploadOtherInfo,
        completeApplication,
        backButtonJourney,
        accessibilityTest,
        errorMessaging,
      );
      break;
    case true: // If an error message journey is occurring
      await landingPage.seeTheLandingPage(page, accessibilityTest);
      await landingPage.continueOn(page);
      await loginPage.SignInUser(page);
      await subjectDetailsPage.checkPageLoads(page, accessibilityTest);
      await subjectDetailsPage.triggerErrorMessages(page);
      await subjectDetailsPage.fillInFields(page);
      await subjectContactDetailsPage.checkPageLoads(page, accessibilityTest);
      await subjectContactDetailsPage.triggerErrorMessages(page);
      await subjectContactDetailsPage.fillInFields(page);
      await representationPage.checkPageLoads(page, accessibilityTest);
      await representationPage.triggerErrorMessages(page);
      await representationPage.fillInFields(page, representationPresent);
      if (representationPresent) {
        // Extra pages added into the flow for representation information,
        // always going to be true in this journey
        await representationQualifiedPage.checkPageLoads(
          page,
          accessibilityTest,
        );
        await representationQualifiedPage.triggerErrorMessages(page);
        await representationQualifiedPage.fillInFields(
          page,
          representationQualified,
        );
        await representativeDetailsPage.checkPageLoads(page, accessibilityTest);
        await representativeDetailsPage.triggerErrorMessages(page);
        await representativeDetailsPage.fillInFields(page);
      }
      await uploadAppealFormPage.checkPageLoads(page, accessibilityTest);
      await uploadAppealFormPage.triggerErrorMessages(page);
      await uploadAppealFormPage.uploadDocumentsSection(page);
      await uploadSupportingDocumentsPage.checkPageLoads(
        page,
        accessibilityTest,
      );
      await uploadSupportingDocumentsPage.triggerErrorMessages(page);
      await uploadSupportingDocumentsPage.uploadDocumentsSection(page);
      await uploadOtherInformationPage.checkPageLoads(page, accessibilityTest);
      await uploadOtherInformationPage.triggerErrorMessages(page);
      await uploadOtherInformationPage.uploadDocumentsSection(page);
      await page.click('button[name="opt-out-button"]'); // Opt out of PCQ
  }
}

async function normalFEFlow(
  page,
  representationPresent,
  representationQualified,
  uploadOtherInfo,
  completeApplication,
  backButtonJourney,
  accessibilityTest,
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
    // Extra pages added into the flow for representation information
    await handleRepresentationLogic(
      page,
      representationQualified,
      accessibilityTest,
    );
  }
  await uploadAppealFormPage.checkPageLoads(page, accessibilityTest);
  await uploadAppealFormPage.uploadDocumentsSection(page);
  await uploadSupportingDocumentsPage.checkPageLoads(page, accessibilityTest);
  await uploadSupportingDocumentsPage.uploadDocumentsSection(page);
  await uploadOtherInformationPage.checkPageLoads(page, accessibilityTest);
  await uploadOtherInformationPage.uploadDocumentsSection(
    page,
    uploadOtherInfo,
  );
  await page.click('button[name="opt-out-button"]'); // Opt out of PCQ
  await checkYourAnswersPage.checkPageLoads(
    page,
    representationPresent,
    accessibilityTest,
  );
  await checkYourAnswersPage.checkValidInfoAllFields(
    page,
    representationPresent,
    representationQualified,
    uploadOtherInfo,
  );
  if (completeApplication) {
    // Decides whether to submit the application,
    // not applicable to back button journeys and error messaging journeys
    await handleCompleteApplication(page, accessibilityTest, representationPresent,
      representationQualified, uploadOtherInfo);
  }
  if (backButtonJourney) {
    await handleBackButtonJourney(page);
  }
}

async function handleRepresentationLogic(
  page,
  representationQualified,
  accessibilityTest,
) {
  await representationQualifiedPage.checkPageLoads(page, accessibilityTest);
  await representationQualifiedPage.fillInFields(page, representationQualified);
  await representativeDetailsPage.checkPageLoads(page, accessibilityTest);
  await representativeDetailsPage.fillInFields(page);
}

async function handleCompleteApplication(page, accessibilityTest, representationPresent, representationQualified, uploadOtherInfo) {
  await checkYourAnswersPage.continueOn(page);
  await applicationSubmittedPage.checkPageLoads(page, accessibilityTest);
  await applicationSubmittedPage.checkCICCaseNumber(page);
  const caseNumber = await applicationSubmittedPage.returnCICCaseNumber(page);
  await caseAPILoginPage.SignInUser(page);
  await casesPage.checkPageLoads(page, accessibilityTest);
  await casesPage.changeCaseType(page);
  await casesPage.searchForCaseNumber(page, caseNumber);
  await historyTabPage.checkPageLoads(page, accessibilityTest);
  await stateTabPage.checkStateTab(page);
}

async function handleBackButtonJourney(page) {
  // testing that all back buttons in the flow work as intended
  await checkYourAnswersPage.pressBackButton(page);
  await uploadOtherInformationPage.pressBackButton(page);
  await uploadSupportingDocumentsPage.pressBackButton(page);
  await uploadAppealFormPage.pressBackButton(page);
  await representativeDetailsPage.pressBackButton(page);
  await representationQualifiedPage.pressBackButton(page);
  await representationPage.pressBackButton(page);
  await subjectContactDetailsPage.pressBackButton(page);
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

test("As a Citizen, Create an application with all details, a qualified representative, additional information, no PCQ, and submit - aXe test as it proceeds. @accessibility", async ({
  page,
}) => {
  const representationPresent = true,
    representationQualified = true,
    uploadOtherInfo = true,
    completeApplication = true,
    backButtonJourney = false,
    accessibilityTest = true,
    errorMessaging = false;
  await createFEApplication(
    page,
    representationPresent,
    representationQualified,
    uploadOtherInfo,
    completeApplication,
    backButtonJourney,
    accessibilityTest,
    errorMessaging,
  );
});

test("Create an application with no representative, additional information, no PCQ, and submit.", async ({
  page,
}) => {
  const representationPresent = false,
    representationQualified = null,
    uploadOtherInfo = true,
    completeApplication = true,
    backButtonJourney = false,
    accessibilityTest = false,
    errorMessaging = false;
  await createFEApplication(
    page,
    representationPresent,
    representationQualified,
    uploadOtherInfo,
    completeApplication,
    backButtonJourney,
    accessibilityTest,
    errorMessaging,
  );
});

test.only("Create an application with all details, a qualified representative, no additional information, no PCQ, and submit.", async ({
  page,
}) => {
  const representationPresent = true,
    representationQualified = true,
    uploadOtherInfo = false,
    completeApplication = true,
    backButtonJourney = false,
    accessibilityTest = false,
    errorMessaging = false;
  await createFEApplication(
    page,
    representationPresent,
    representationQualified,
    uploadOtherInfo,
    completeApplication,
    backButtonJourney,
    accessibilityTest,
    errorMessaging,
  );
});

test("Create an application with all details, an unqualified representative, no additional information, no PCQ, and submit.", async ({
  page,
}) => {
  const representationPresent = true,
    representationQualified = false,
    uploadOtherInfo = false,
    completeApplication = true,
    backButtonJourney = false,
    accessibilityTest = false,
    errorMessaging = false;
  await createFEApplication(
    page,
    representationPresent,
    representationQualified,
    uploadOtherInfo,
    completeApplication,
    backButtonJourney,
    accessibilityTest,
    errorMessaging,
  );
});

test("Test all back buttons on the Frontend application", async ({ page }) => {
  const representationPresent = true,
    representationQualified = true,
    uploadOtherInfo = true,
    completeApplication = false,
    backButtonJourney = true,
    accessibilityTest = false,
    errorMessaging = false;
  await createFEApplication(
    page,
    representationPresent,
    representationQualified,
    uploadOtherInfo,
    completeApplication,
    backButtonJourney,
    accessibilityTest,
    errorMessaging,
  );
});

test("Error messaging", async ({ page }) => {
  const representationPresent = true,
    representationQualified = true,
    uploadOtherInfo = true,
    completeApplication = false,
    backButtonJourney = false,
    accessibilityTest = false,
    errorMessaging = true;
  await createFEApplication(
    page,
    representationPresent,
    representationQualified,
    uploadOtherInfo,
    completeApplication,
    backButtonJourney,
    accessibilityTest,
    errorMessaging,
  );
});
