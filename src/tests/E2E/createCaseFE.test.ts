import { Page, test } from "@playwright/test";
import landingPage from "../pages/DSSCreateCase/landingPage.ts";
import loginPage from "../pages/DSSCreateCase/loginPage.ts";
import subjectDetailsPage from "../pages/DSSCreateCase/subjectDetailsPage.ts";
import subjectContactDetailsPage from "../pages/DSSCreateCase/subjectContactDetailsPage.ts";
import representationPage from "../pages/DSSCreateCase/representationPage.ts";
import representationQualifiedPage from "../pages/DSSCreateCase/representationQualifiedPage.ts";
import representativeDetailsPage from "../pages/DSSCreateCase/representativeDetailsPage.ts";
import uploadAppealFormPage from "../pages/DSSCreateCase/uploadAppealFormPage.ts";
import uploadSupportingDocumentsPage from "../pages/DSSCreateCase/uploadSupportingDocumentsPage.ts";
import uploadOtherInformationPage from "../pages/DSSCreateCase/uploadOtherInformationPage.ts";
import checkYourAnswersPage from "../pages/DSSCreateCase/checkYourAnswersPage.ts";
import applicationSubmittedPage from "../pages/DSSCreateCase/applicationSubmittedPage.ts";
import caseAPILoginPage from "../pages/CaseAPI/caseList/caseAPILoginPage.ts";
import casesPage from "../pages/CaseAPI/caseList/casesPage.ts";
import historyTabPage from "../pages/CaseAPI/caseTabs/historyTabPage.ts";
import summaryTabPage from "../pages/CaseAPI/caseTabs/summaryTabPage.ts";
import stateTabPage from "../pages/CaseAPI/caseTabs/stateTabPage.ts";
import caseDetailsTabPage from "../pages/CaseAPI/caseTabs/caseDetailsTabPage.ts";
import casePartiesTabPage from "../pages/CaseAPI/caseTabs/casePartiesTabPage.ts";
import caseDocumentsTabPage from "../pages/CaseAPI/caseTabs/caseDocumentsTabPage.ts";
import caseFileViewTabPage from "../pages/CaseAPI/caseTabs/caseFileViewTabPage.ts";

async function createFEApplication(
  page: Page,
  cy: boolean,
  representationPresent: boolean,
  representationQualified: boolean,
  uploadOtherInfo: boolean,
  completeApplication: boolean,
  backButtonJourney: boolean,
  accessibilityTest: boolean,
  errorMessaging: boolean,
): Promise<void> {
  switch (errorMessaging) {
    default:
      await normalFEFlow(
        page,
        cy,
        representationPresent,
        representationQualified,
        uploadOtherInfo,
        completeApplication,
        backButtonJourney,
        accessibilityTest,
      );
      break;
    case true:
      await landingPage.seeTheLandingPage(page, cy, accessibilityTest);
      await landingPage.continueOn(page);
      await loginPage.SignInUser(page);
      await subjectDetailsPage.checkPageLoads(page, cy, accessibilityTest);
      await subjectDetailsPage.triggerErrorMessages(page, cy);
      await subjectDetailsPage.fillInFields(page);
      await subjectContactDetailsPage.checkPageLoads(
        page,
        cy,
        accessibilityTest,
      );
      await subjectContactDetailsPage.triggerErrorMessages(page, cy);
      await subjectContactDetailsPage.fillInFields(page);
      await representationPage.checkPageLoads(page, cy, accessibilityTest);
      await representationPage.triggerErrorMessages(page, cy);
      await representationPage.fillInFields(page, representationPresent);
      if (representationPresent) {
        await representationQualifiedPage.checkPageLoads(
          page,
          cy,
          accessibilityTest,
        );
        await representationQualifiedPage.triggerErrorMessages(page, cy);
        await representationQualifiedPage.fillInFields(
          page,
          representationQualified,
        );
        await representativeDetailsPage.checkPageLoads(
          page,
          cy,
          accessibilityTest,
        );
        await representativeDetailsPage.triggerErrorMessages(page, cy);
        await representativeDetailsPage.fillInFields(page);
      }
      await uploadAppealFormPage.checkPageLoads(page, cy, accessibilityTest);
      await uploadAppealFormPage.triggerErrorMessages(page, cy);
      await uploadAppealFormPage.uploadDocumentsSection(page, cy);
      await uploadSupportingDocumentsPage.checkPageLoads(
        page,
        cy,
        accessibilityTest,
      );
      await uploadSupportingDocumentsPage.triggerErrorMessages(page, cy);
      await uploadSupportingDocumentsPage.uploadDocumentsSection(page, cy);
      await uploadOtherInformationPage.checkPageLoads(
        page,
        cy,
        accessibilityTest,
      );
      await uploadOtherInformationPage.triggerErrorMessages(page, cy);
      await uploadOtherInformationPage.uploadDocumentsSection(
        page,
        cy,
        uploadOtherInfo,
      );
      await page.click('button[name="opt-out-button"]');
  }
}

async function normalFEFlow(
  page: Page,
  cy: boolean,
  representationPresent: boolean,
  representationQualified: boolean,
  uploadOtherInfo: boolean,
  completeApplication: boolean,
  backButtonJourney: boolean,
  accessibilityTest: boolean,
) {
  await landingPage.seeTheLandingPage(page, cy, accessibilityTest);
  await landingPage.continueOn(page);
  await loginPage.SignInUser(page);
  await subjectDetailsPage.checkPageLoads(page, cy, accessibilityTest);
  await subjectDetailsPage.fillInFields(page);
  await subjectContactDetailsPage.checkPageLoads(page, cy, accessibilityTest);
  await subjectContactDetailsPage.fillInFields(page);
  await representationPage.checkPageLoads(page, cy, accessibilityTest);
  await representationPage.fillInFields(page, representationPresent);
  if (representationPresent) {
    await handleRepresentationLogic(
      page,
      cy,
      representationQualified,
      accessibilityTest,
    );
  }
  await uploadAppealFormPage.checkPageLoads(page, cy, accessibilityTest);
  await uploadAppealFormPage.uploadDocumentsSection(page, cy);
  await uploadSupportingDocumentsPage.checkPageLoads(
    page,
    cy,
    accessibilityTest,
  );
  await uploadSupportingDocumentsPage.uploadDocumentsSection(page, cy);
  await uploadOtherInformationPage.checkPageLoads(page, cy, accessibilityTest);
  await uploadOtherInformationPage.uploadDocumentsSection(
    page,
    cy,
    uploadOtherInfo,
  );
  await page.click('button[name="opt-out-button"]');
  await checkYourAnswersPage.checkPageLoads(
    page,
    cy,
    representationPresent,
    accessibilityTest,
  );
  await checkYourAnswersPage.checkValidInfoAllFields(
    page,
    cy,
    representationPresent,
    representationQualified,
    uploadOtherInfo,
  );
  if (completeApplication) {
    await handleCompleteApplication(
      page,
      cy,
      accessibilityTest,
      representationPresent,
      representationQualified,
      uploadOtherInfo,
    );
  }
  if (backButtonJourney) {
    await handleBackButtonJourney(page);
  }
}

async function handleRepresentationLogic(
  page: Page,
  cy: boolean,
  representationQualified: boolean,
  accessibilityTest: boolean,
) {
  await representationQualifiedPage.checkPageLoads(page, cy, accessibilityTest);
  await representationQualifiedPage.fillInFields(page, representationQualified);
  await representativeDetailsPage.checkPageLoads(page, cy, accessibilityTest);
  await representativeDetailsPage.fillInFields(page);
}

async function handleCompleteApplication(
  page: Page,
  cy: boolean,
  accessibilityTest: boolean,
  representationPresent: boolean,
  representationQualified: boolean,
  uploadOtherInfo: boolean,
) {
  const time = await checkYourAnswersPage.continueOn(page);
  await applicationSubmittedPage.checkPageLoads(page, cy, accessibilityTest);
  await applicationSubmittedPage.checkCICCaseNumber(page);
  const caseNumber = await applicationSubmittedPage.returnCICCaseNumber(page);
  await caseAPILoginPage.SignInUser(page, "caseWorker");
  await casesPage.checkPageLoads(page, accessibilityTest);
  await casesPage.changeCaseType(page);
  await casesPage.searchForCaseNumber(page, caseNumber);
  await historyTabPage.checkPageLoads(page, accessibilityTest, caseNumber);
  await historyTabPage.checkPageInfo(page, time);
  await summaryTabPage.changeToSummaryTab(page);
  await summaryTabPage.checkPageLoads(
    page,
    accessibilityTest,
    representationPresent,
    caseNumber,
  );
  await summaryTabPage.checkPageInfo(
    page,
    caseNumber,
    representationPresent,
    representationQualified,
  );
  await stateTabPage.changeToStateTab(page);
  await stateTabPage.checkPageLoads(page, accessibilityTest, caseNumber);
  await stateTabPage.checkStateTab(page);
  await caseDetailsTabPage.changeToCaseDetailsTab(page);
  await caseDetailsTabPage.checkPageLoads(
    page,
    accessibilityTest,
    representationPresent,
    caseNumber,
  );
  await caseDetailsTabPage.checkPageInfo(
    page,
    representationPresent,
    representationQualified,
  );
  await casePartiesTabPage.changeToCasePartiesTab(page);
  await casePartiesTabPage.checkPageLoads(
    page,
    accessibilityTest,
    representationPresent,
    caseNumber,
  );
  await casePartiesTabPage.checkPageInfo(
    page,
    representationPresent,
    representationQualified,
  );
  await caseDocumentsTabPage.changeToCaseDocumentsTab(page);
  await caseDocumentsTabPage.checkPageLoads(
    page,
    accessibilityTest,
    caseNumber,
  );
  await caseDocumentsTabPage.checkPageInfo(page);
  await caseFileViewTabPage.changeToCaseFileViewTab(page);
  await caseFileViewTabPage.checkPageLoads(page, accessibilityTest, caseNumber);
  await caseFileViewTabPage.checkPageInfo(page, uploadOtherInfo);
}

async function handleBackButtonJourney(page: Page) {
  await checkYourAnswersPage.pressBackButton(page);
  await uploadOtherInformationPage.pressBackButton(page);
  await uploadSupportingDocumentsPage.pressBackButton(page);
  await uploadAppealFormPage.pressBackButton(page);
  await representativeDetailsPage.pressBackButton(page);
  await representationQualifiedPage.pressBackButton(page);
  await representationPage.pressBackButton(page);
  await subjectContactDetailsPage.pressBackButton(page);
}

export {
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
  const cy = false,
    representationPresent = true,
    representationQualified = true,
    uploadOtherInfo = true,
    completeApplication = true,
    backButtonJourney = false,
    accessibilityTest = true,
    errorMessaging = false;
  await createFEApplication(
    page,
    cy,
    representationPresent,
    representationQualified,
    uploadOtherInfo,
    completeApplication,
    backButtonJourney,
    accessibilityTest,
    errorMessaging,
  );
});

test.skip("As a Citizen, Create an application with all details, a qualified representative, additional information, no PCQ, and submit - Cy", async ({
  page,
}) => {
  const cy = true,
    representationPresent = true,
    representationQualified = true,
    uploadOtherInfo = true,
    completeApplication = true,
    backButtonJourney = false,
    accessibilityTest = false,
    errorMessaging = false;
  await createFEApplication(
    page,
    cy,
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
  const cy = false,
    representationPresent = false,
    representationQualified = false,
    uploadOtherInfo = true,
    completeApplication = true,
    backButtonJourney = false,
    accessibilityTest = false,
    errorMessaging = false;
  await createFEApplication(
    page,
    cy,
    representationPresent,
    representationQualified,
    uploadOtherInfo,
    completeApplication,
    backButtonJourney,
    accessibilityTest,
    errorMessaging,
  );
});

test.skip("Create an application with no representative, additional information, no PCQ, and submit - Cy", async ({
  page,
}) => {
  const cy = true,
    representationPresent = false,
    representationQualified = false,
    uploadOtherInfo = true,
    completeApplication = true,
    backButtonJourney = false,
    accessibilityTest = false,
    errorMessaging = false;
  await createFEApplication(
    page,
    cy,
    representationPresent,
    representationQualified,
    uploadOtherInfo,
    completeApplication,
    backButtonJourney,
    accessibilityTest,
    errorMessaging,
  );
});

test("Create an application with all details, a qualified representative, no additional information, no PCQ, and submit.", async ({
  page,
}) => {
  const cy = false,
    representationPresent = true,
    representationQualified = true,
    uploadOtherInfo = false,
    completeApplication = true,
    backButtonJourney = false,
    accessibilityTest = false,
    errorMessaging = false;
  await createFEApplication(
    page,
    cy,
    representationPresent,
    representationQualified,
    uploadOtherInfo,
    completeApplication,
    backButtonJourney,
    accessibilityTest,
    errorMessaging,
  );
});

test.skip("Create an application with all details, a qualified representative, no additional information, no PCQ, and submit - Cy.", async ({
  page,
}) => {
  const cy = true,
    representationPresent = true,
    representationQualified = true,
    uploadOtherInfo = false,
    completeApplication = true,
    backButtonJourney = false,
    accessibilityTest = false,
    errorMessaging = false;
  await createFEApplication(
    page,
    cy,
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
  const cy = false,
    representationPresent = true,
    representationQualified = false,
    uploadOtherInfo = false,
    completeApplication = true,
    backButtonJourney = false,
    accessibilityTest = false,
    errorMessaging = false;
  await createFEApplication(
    page,
    cy,
    representationPresent,
    representationQualified,
    uploadOtherInfo,
    completeApplication,
    backButtonJourney,
    accessibilityTest,
    errorMessaging,
  );
});

test.skip("Create an application with all details, an unqualified representative, no additional information, no PCQ, and submit - Cy.", async ({
  page,
}) => {
  const cy = true,
    representationPresent = true,
    representationQualified = false,
    uploadOtherInfo = false,
    completeApplication = true,
    backButtonJourney = false,
    accessibilityTest = false,
    errorMessaging = false;
  await createFEApplication(
    page,
    cy,
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
  const cy = false,
    representationPresent = true,
    representationQualified = true,
    uploadOtherInfo = true,
    completeApplication = false,
    backButtonJourney = true,
    accessibilityTest = false,
    errorMessaging = false;
  await createFEApplication(
    page,
    cy,
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
  const cy = false,
    representationPresent = true,
    representationQualified = true,
    uploadOtherInfo = true,
    completeApplication = false,
    backButtonJourney = false,
    accessibilityTest = false,
    errorMessaging = true;
  await createFEApplication(
    page,
    cy,
    representationPresent,
    representationQualified,
    uploadOtherInfo,
    completeApplication,
    backButtonJourney,
    accessibilityTest,
    errorMessaging,
  );
});

test.skip("Error messaging - Cy", async ({ page }) => {
  const cy = true,
    representationPresent = true,
    representationQualified = true,
    uploadOtherInfo = true,
    completeApplication = false,
    backButtonJourney = false,
    accessibilityTest = false,
    errorMessaging = true;
  await createFEApplication(
    page,
    cy,
    representationPresent,
    representationQualified,
    uploadOtherInfo,
    completeApplication,
    backButtonJourney,
    accessibilityTest,
    errorMessaging,
  );
});
