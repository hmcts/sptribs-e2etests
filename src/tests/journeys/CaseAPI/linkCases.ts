import { Page } from "@playwright/test";
import commonHelpers, { allEvents } from "../../helpers/commonHelpers.ts";
import buildCase from "./buildCase.ts";
import config from "../../config.ts";

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
    const caseNumberDigits = caseNumber1.replace(/\D/g, '');
    const caseURL = `${config.CaseAPIBaseURL}/case-details/${caseNumberDigits}#History`;
    await page.goto(caseURL);
    await commonHelpers.checkAllCaseTabs(page, caseNumber1);
    
    console.log('here')
  },
};

export default linkCases;
