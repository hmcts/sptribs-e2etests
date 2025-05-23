import { Page } from "@playwright/test";
import commonHelpers, { allEvents } from "../../helpers/commonHelpers.ts";
import config from "../../config.ts";
import events_content from "../../fixtures/content/CaseAPI/events_content.ts";
import createCaseLinkCreateCaseLink from "../../pages/CaseAPI/linkCase/createCaseLinkCreateCaseLinkPage.ts";
import createCaseLinkCreateCaseLink2 from "../../pages/CaseAPI/linkCase/createCaseLinkCreateCaseLink2Page.ts";
import createCaseLinkCreateCaseLink3 from "../../pages/CaseAPI/linkCase/createCaseLinkCreateCaseLink3Page.ts";
import confirmPage from "../../pages/CaseAPI/linkCase/confirmPage.ts";

type LinkCases = {
  linkCase(
    page: Page,
    caseNumber1: string,
    caseNumber2: string,
    previousEvents: allEvents[],
    eventTimes: string[],
    accessibilityTest: boolean,
    journeyType: string,
  ): Promise<void>;
  startJourney(
    page: Page,
    caseNumber1: string,
    accessibilityTest: boolean,
  ): Promise<void>;
};

const linkCases: LinkCases = {
  async linkCase(
    page: Page,
    caseNumber1: string,
    caseNumber2: string,
    previousEvents: allEvents[],
    eventTimes: string[],
    accessibilityTest: boolean,
    journeyType: string,
  ): Promise<void> {
    switch (journeyType) {
      default:
        await this.startJourney(page, caseNumber1, accessibilityTest);
        await createCaseLinkCreateCaseLink.fillInFields(page);
        await createCaseLinkCreateCaseLink2.checkPageLoads(
          page,
          accessibilityTest,
        );
        await createCaseLinkCreateCaseLink2.fillInFields(
          page,
          caseNumber1,
          caseNumber2,
        );
        await createCaseLinkCreateCaseLink3.checkPageLoads(
          page,
          accessibilityTest,
        );
        await createCaseLinkCreateCaseLink3.fillInFields(page);
        await confirmPage.checkPageLoads(page, accessibilityTest);
        await confirmPage.fillInFields(page);
        break;
      case "errorMessaging":
        await this.startJourney(page, caseNumber1, accessibilityTest);
        await createCaseLinkCreateCaseLink.triggerErrorMessage(page);
        await createCaseLinkCreateCaseLink.fillInFields(page);
        await createCaseLinkCreateCaseLink2.triggerErrorMessage(page);
        break;
    }
  },

  async startJourney(
    page: Page,
    caseNumber1: string,
    accessibilityTest: boolean,
  ): Promise<void> {
    let caseURL = await commonHelpers.generateUrl(
      config.CaseAPIBaseURL,
      caseNumber1,
    );
    await page.goto(caseURL);
    await commonHelpers.chooseEventFromDropdown(page, events_content.linkCases);
    await createCaseLinkCreateCaseLink.checkPageLoads(
      page,
      caseNumber1,
      accessibilityTest,
    );
  },
};

export default linkCases;
