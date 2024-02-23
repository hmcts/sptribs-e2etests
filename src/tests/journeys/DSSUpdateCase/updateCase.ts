import landingPage from "../../pages/DSSUpdateCase/landingPage.ts";
import caseFinderPage from "../../pages/DSSUpdateCase/caseFinderPage.ts";
import { Page } from "@playwright/test";

type UpdateCaseJourney = {
  updateCase(
    page: Page,
    accessibilityTest: boolean,
    caseNumber: string | void,
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
    backButtonJourney: boolean,
    errorMessaging: boolean,
  ) {
    switch (errorMessaging) {
      default:
        await landingPage.seeTheLandingPage(page, accessibilityTest);
        await landingPage.continueOn(page);
        await caseFinderPage.checkPageLoads(page, accessibilityTest);
        await caseFinderPage.fillInFields(page, caseNumber);
        await caseFinderPage.continueOn(page);
        if (backButtonJourney) {
          await this.handleBackButtonJourney(page);
        }
        break;
      case true:
        await landingPage.seeTheLandingPage(page, accessibilityTest);
        await landingPage.continueOn(page);
        await caseFinderPage.checkPageLoads(page, accessibilityTest);
        await caseFinderPage.triggerErrorMessages(page);
        await caseFinderPage.fillInFields(page, caseNumber);
        await caseFinderPage.continueOn(page);
    }
  },

  async handleBackButtonJourney(page: Page) {
    await caseFinderPage.pressBackButton(page);
  },
};

export default updateCaseJourney;
