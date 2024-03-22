import { Page } from "@playwright/test";
import commonHelpers, { allEvents } from "../../helpers/commonHelpers.ts";
import events_content from "../../fixtures/content/CaseAPI/events_content.ts";
import hearingOptionsRegionDataPage from "../../pages/CaseAPI/hearingOptions/hearingOptionsRegionDataPage.ts";

type HearingOptions = {
  hearingOptions(
    page: Page,
    caseNumber: string,
    previousEvents: allEvents[],
    eventTimes: string[],
    accessibilityTest: boolean,
  ): Promise<void>;
};

const hearingOptions: HearingOptions = {
  async hearingOptions(
    page: Page,
    caseNumber: string,
    previousEvents: allEvents[],
    eventTimes: string[],
    accessibilityTest: boolean,
  ): Promise<void> {
    await commonHelpers.chooseEventFromDropdown(
      page,
      events_content.hearingOptions,
    );
    await hearingOptionsRegionDataPage.checkPageLoads(
      page,
      caseNumber,
      accessibilityTest,
    );
    await hearingOptionsRegionDataPage.fillInFields(page);
    await hearingOptionsRegionDataPage.continueOn(page);
  },
};

export default hearingOptions;
