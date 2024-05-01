import { expect, Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import createSummaryHearingOutcomeContent from "../../../fixtures/content/CaseAPI/createSummary/createSummaryHearingOutcome_content.ts";
import { hearingOutcome } from "../../../helpers/commonHelpers.ts";

type CreateSummaryHearingOutcomePage = {
  previous: string;
  continue: string;
  cancel: string;
  checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
  ): Promise<void>;
  fillFields(page: Page, hearingOutcome: hearingOutcome): Promise<void>;
  triggerErrorMessages(page: Page): Promise<void>;
  continueOn(page: Page): Promise<void>;
};

const createSummaryHearingOutcomePage: CreateSummaryHearingOutcomePage = {
  previous: "button[name='Previous']",
  continue: '[type="submit"]',
  cancel: ".cancel",

  async checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
  ): Promise<void> {},

  async fillFields(
    page: Page,
    hearingOutcome: hearingOutcome,
  ): Promise<void> {},

  async triggerErrorMessages(page: Page): Promise<void> {},

  async continueOn(page: Page): Promise<void> {
    await page.click(this.continue);
  },
};

export default createSummaryHearingOutcomePage;
