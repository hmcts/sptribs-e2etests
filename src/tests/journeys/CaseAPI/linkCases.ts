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
    const caseNumberDigits = caseNumber1.replace(/\D/g, "");
    const caseURL = `${config.CaseAPIBaseURL}/case-details/${caseNumberDigits}#History`;
    await page.goto(caseURL);
    await commonHelpers.chooseEventFromDropdown(page, events_content.linkCases);
  },
};

export default linkCases;
