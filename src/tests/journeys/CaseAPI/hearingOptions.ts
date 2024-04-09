import { Page } from "@playwright/test";
import commonHelpers from "../../helpers/commonHelpers.ts";
import events_content from "../../fixtures/content/CaseAPI/events_content.ts";
import hearingOptionsRegionDataPage from "../../pages/CaseAPI/hearingOptions/hearingOptionsRegionDataPage.ts";
import hearingOptionsHearingDetailsPage from "../../pages/CaseAPI/hearingOptions/hearingOptionsHearingDetailsPage.ts";
import hearingOptionsHearingDetails from "../../pages/CaseAPI/hearingOptions/hearingOptionsHearingDetailsPage.ts";
import submitPage from "../../pages/CaseAPI/hearingOptions/submitPage.ts";

type HearingOptions = {
  hearingOptions(
    page: Page,
    caseNumber: string,
    region: boolean,
    venue: boolean,
    venueNotListed: boolean,
    hearingFormat: string,
    shortNoticeHearing: boolean,
    accessibilityTest: boolean,
  ): Promise<void>;
};

const hearingOptions: HearingOptions = {
  async hearingOptions(
    page: Page,
    caseNumber: string,
    region: boolean,
    venue: boolean,
    venueNotListed: boolean,
    hearingFormat: string,
    shortNoticeHearing: boolean,
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
    await hearingOptionsRegionDataPage.fillInFields(page, region);
    await hearingOptionsRegionDataPage.continueOn(page);
    await hearingOptionsHearingDetailsPage.checkPageLoads(
      page,
      accessibilityTest,
    );
    await hearingOptionsHearingDetails.fillInFields(
      page,
      venue,
      venueNotListed,
      hearingFormat,
      shortNoticeHearing,
    );
    await hearingOptionsHearingDetailsPage.continueOn(page);
    await submitPage.checkPageLoads(page, region, venue, accessibilityTest);
    await submitPage.checkValidInfo(
      page,
      region,
      venue,
      venueNotListed,
      hearingFormat,
      shortNoticeHearing,
    );
    await submitPage.continueOn(page);
  },
};

export default hearingOptions;
