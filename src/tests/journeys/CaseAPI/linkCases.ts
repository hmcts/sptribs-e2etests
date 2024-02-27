import { Page } from "@playwright/test";
import commonHelpers, { allEvents } from "../../helpers/commonHelpers.ts";
import config from "../../config.ts";
import events_content from "../../fixtures/content/CaseAPI/events_content.ts";

type LinkCases = {
  linkCase(
    page: Page,
    caseNumber1: string,
    caseNumber2: string,
    previousEvents: allEvents[],
    eventTimes: string[],
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
  ): Promise<void> {
    const caseURL = await commonHelpers.generateUrl(config.CaseAPIBaseURL, caseNumber1);
    await page.goto(caseURL);
    await commonHelpers.chooseEventFromDropdown(page, events_content.linkCases);

  },
};

export default linkCases;
