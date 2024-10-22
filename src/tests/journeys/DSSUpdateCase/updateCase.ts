import { Page } from "@playwright/test";
import landingPage from "../../pages/DSSUpdateCase/landingPage.ts";
import loginPage from "../../pages/DSSUpdateCase/loginPage.ts";
import caseFinderPage from "../../pages/DSSUpdateCase/caseFinderPage.ts";
import subjectDetailsPage from "../../pages/DSSUpdateCase/subjectDetailsPage.ts";
import uploadDocumentsPage from "../../pages/DSSUpdateCase/uploadDocumentsPage.ts";
import checkYourAnswersPage from "../../pages/DSSUpdateCase/checkYourAnswersPage.ts";
import confirmPage from "../../pages/DSSUpdateCase/confirmPage.ts";

type UpdateCaseJourney = {
  updateCase(
    page: Page,
    cy: boolean,
    accessibilityTest: boolean,
    caseNumber: string | void,
    additionalInformation: boolean,
    uploadDocument: boolean,
    multipleDocuments: boolean,
    backButtonJourney: boolean,
    errorMessaging: boolean,
    subjectName: string,
  ): Promise<void>;
  handleBackButtonJourney(page: Page): Promise<void>;
};

const updateCaseJourney: UpdateCaseJourney = {
  async updateCase(
    page: Page,
    cy: boolean,
    accessibilityTest: boolean,
    caseNumber: string,
    additionalInformation: boolean,
    uploadDocument: boolean,
    multipleDocuments: boolean,
    backButtonJourney: boolean,
    errorMessaging: boolean,
    subjectName: string,
  ): Promise<void> {
    switch (errorMessaging) {
      default:
        await landingPage.seeTheLandingPage(page, cy, accessibilityTest);
        await landingPage.continueOn(page);
        await loginPage.SignInUser(page);
        await caseFinderPage.checkPageLoads(page, cy, accessibilityTest);
        await caseFinderPage.fillInFields(page, caseNumber);
        await caseFinderPage.continueOn(page);
        await subjectDetailsPage.checkPageLoads(page, cy, accessibilityTest);
        await subjectDetailsPage.fillInFields(page, subjectName);
        await subjectDetailsPage.continueOn(page);
        await uploadDocumentsPage.checkPageLoads(page, cy, accessibilityTest);
        await uploadDocumentsPage.fillInFields(page, additionalInformation);
        await uploadDocumentsPage.uploadDocumentsSection(
          page,
          cy,
          uploadDocument,
          multipleDocuments,
        );
        await uploadDocumentsPage.continueOn(page);
        await checkYourAnswersPage.checkPageLoads(
          page,
          cy,
          accessibilityTest,
          multipleDocuments,
          uploadDocument,
        );
        await checkYourAnswersPage.checkValidInfoAllFields(
          page,
          cy,
          multipleDocuments,
          uploadDocument,
          additionalInformation,
        );
        if (backButtonJourney) {
          await this.handleBackButtonJourney(page);
          break;
        }
        await checkYourAnswersPage.continueOn(page);
        await confirmPage.checkPageLoads(page, cy, accessibilityTest);
        await confirmPage.returnCaseNumber(page, caseNumber);
        break;
      case true:
        await landingPage.seeTheLandingPage(page, cy, accessibilityTest);
        await landingPage.continueOn(page);
        await loginPage.SignInUser(page);
        await caseFinderPage.checkPageLoads(page, cy, accessibilityTest);
        await caseFinderPage.triggerErrorMessages(page, cy);
        await caseFinderPage.fillInFields(page, caseNumber);
        await caseFinderPage.continueOn(page);
        await subjectDetailsPage.checkPageLoads(page, cy, accessibilityTest);
        await subjectDetailsPage.triggerErrorMessages(page, cy);
        await subjectDetailsPage.fillInFields(page, subjectName);
        await subjectDetailsPage.continueOn(page);
        await uploadDocumentsPage.triggerErrorMessages(page, cy);
        await uploadDocumentsPage.checkPageLoads(page, cy, accessibilityTest);
        await uploadDocumentsPage.fillInFields(page, additionalInformation);
        await uploadDocumentsPage.uploadDocumentsSection(
          page,
          cy,
          uploadDocument,
          multipleDocuments,
        );
        await uploadDocumentsPage.continueOn(page);
    }
  },

  async handleBackButtonJourney(page: Page): Promise<void> {
    await checkYourAnswersPage.pressBackButton(page);
    await uploadDocumentsPage.pressBackButton(page);
    await subjectDetailsPage.pressBackButton(page);
  },
};

export default updateCaseJourney;
