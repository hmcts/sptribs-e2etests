import { Page } from "@playwright/test";
import landingPage from "../../pages/DSSUpdateCase/landingPage.ts";
import loginPage from "../../pages/DSSUpdateCase/loginPage.ts";
import caseFinderPage from "../../pages/DSSUpdateCase/caseFinderPage.ts";
import subjectDetailsPage from "../../pages/DSSUpdateCase/subjectDetailsPage.ts";
import uploadDocumentsPage from "../../pages/DSSUpdateCase/uploadDocumentsPage.ts";
import checkYourAnswersPage from "../../pages/DSSUpdateCase/checkYourAnswersPage.ts";

type UpdateCaseJourney = {
  updateCase(
    page: Page,
    accessibilityTest: boolean,
    caseNumber: string | void,
    additionalInformation: boolean,
    uploadDocument: boolean,
    multipleDocuments: boolean,
    backButtonJourney: boolean,
    errorMessaging: boolean,
  ): Promise<void>;
  handleBackButtonJourney(page: Page): Promise<void>;
};

const updateCaseJourney: UpdateCaseJourney = {
  async updateCase(
    page: Page,
    accessibilityTest: boolean,
    caseNumber: string | void,
    additionalInformation: boolean,
    uploadDocument: boolean,
    multipleDocuments: boolean,
    backButtonJourney: boolean,
    errorMessaging: boolean,
  ): Promise<void> {
    switch (errorMessaging) {
      default:
        await landingPage.seeTheLandingPage(page, accessibilityTest);
        await landingPage.continueOn(page);
        await loginPage.SignInUser(page);
        await caseFinderPage.checkPageLoads(page, accessibilityTest);
        await caseFinderPage.fillInFields(page, caseNumber);
        await caseFinderPage.continueOn(page);
        await subjectDetailsPage.checkPageLoads(page, accessibilityTest);
        await subjectDetailsPage.fillInFields(page);
        await subjectDetailsPage.continueOn(page);
        await uploadDocumentsPage.checkPageLoads(page, accessibilityTest);
        await uploadDocumentsPage.fillInFields(page, additionalInformation);
        await uploadDocumentsPage.uploadDocumentsSection(
          page,
          uploadDocument,
          multipleDocuments,
        );
        await uploadDocumentsPage.continueOn(page);
        await checkYourAnswersPage.checkPageLoads(
          page,
          accessibilityTest,
          multipleDocuments,
        );
        await checkYourAnswersPage.checkValidInfoAllFields(
          page,
          multipleDocuments,
        );
        await checkYourAnswersPage.continueOn(page);
        if (backButtonJourney) {
          await this.handleBackButtonJourney(page);
        }
        break;
      case true:
        await landingPage.seeTheLandingPage(page, accessibilityTest);
        await landingPage.continueOn(page);
        await loginPage.SignInUser(page);
        await caseFinderPage.checkPageLoads(page, accessibilityTest);
        await caseFinderPage.triggerErrorMessages(page);
        await caseFinderPage.fillInFields(page, caseNumber);
        await caseFinderPage.continueOn(page);
        await subjectDetailsPage.checkPageLoads(page, accessibilityTest);
        await subjectDetailsPage.triggerErrorMessages(page);
        await subjectDetailsPage.fillInFields(page);
        await subjectDetailsPage.continueOn(page);
        await uploadDocumentsPage.triggerErrorMessages(page);
        await uploadDocumentsPage.checkPageLoads(page, accessibilityTest);
        await uploadDocumentsPage.fillInFields(page, additionalInformation);
        await uploadDocumentsPage.uploadDocumentsSection(
          page,
          uploadDocument,
          multipleDocuments,
        );
        await uploadDocumentsPage.continueOn(page);
    }
  },

  async handleBackButtonJourney(page: Page): Promise<void> {
    await caseFinderPage.pressBackButton(page);
    await subjectDetailsPage.pressBackButton(page);
    await uploadDocumentsPage.pressBackButton(page);
  },
};

export default updateCaseJourney;
