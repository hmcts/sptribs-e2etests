import { Page } from "@playwright/test";
import { UserRole } from "../../config.ts";
import commonHelpers, {
  allEvents,
  caseRegionCode,
  hearingFormat,
} from "../../helpers/commonHelpers.ts";
import events_content from "../../fixtures/content/CaseAPI/events_content.ts";
import hearingOptionsRegionDataPage from "../../pages/CaseAPI/hearingOptions/hearingOptionsRegionDataPage.ts";
import hearingOptionsHearingDetailsPage from "../../pages/CaseAPI/hearingOptions/hearingOptionsHearingDetailsPage.ts";
import submitPage from "../../pages/CaseAPI/hearingOptions/submitPage.ts";
import buildCase from "../../../removedFiles/buildCase.ts";

type HearingOptions = {
  hearingOptions(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
    region: boolean,
    caseRegionCode: caseRegionCode | null,
    venue: boolean,
    venueNotListed: boolean,
    hearingFormat: hearingFormat,
    shortNoticeHearing: boolean,
    editJourney: boolean,
  ): Promise<string>;
};

const hearingOptions: HearingOptions = {
  async hearingOptions(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
    region: boolean,
    caseRegionCode: caseRegionCode | null,
    venue: boolean,
    venueNotListed: boolean,
    hearingFormat: hearingFormat,
    shortNoticeHearing: boolean,
    editJourney: boolean,
  ): Promise<string> {
    let previousEvents: allEvents[] = [];
    let eventTimes: string[] = [];
    const caseNumber = await buildCase.buildCase(
      page,
      previousEvents,
      eventTimes,
      accessibilityTest,
      user,
    );
    await commonHelpers.chooseEventFromDropdown(
      page,
      events_content.hearingOptions,
    );
    await hearingOptionsRegionDataPage.checkPageLoads(
      page,
      caseNumber,
      accessibilityTest,
    );
    await hearingOptionsRegionDataPage.fillInFields(
      page,
      region,
      caseRegionCode,
    );
    await hearingOptionsRegionDataPage.continueOn(page);
    await hearingOptionsHearingDetailsPage.checkPageLoads(
      page,
      accessibilityTest,
    );
    await hearingOptionsHearingDetailsPage.fillInFields(
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
      caseRegionCode,
      venue,
      venueNotListed,
      hearingFormat,
      shortNoticeHearing,
    );
    await submitPage.continueOn(page);

    if (editJourney) {
      await commonHelpers.chooseEventFromDropdown(
        page,
        events_content.hearingOptions,
      );
      await hearingOptionsRegionDataPage.checkPageLoads(
        page,
        caseNumber,
        accessibilityTest,
      );
      await hearingOptionsRegionDataPage.fillInFields(
        page,
        region,
        caseRegionCode,
      );
      await hearingOptionsRegionDataPage.continueOn(page);
      await hearingOptionsHearingDetailsPage.checkPageLoads(
        page,
        accessibilityTest,
      );
      await hearingOptionsHearingDetailsPage.fillInFields(
        page,
        venue,
        venueNotListed,
        "Hybrid",
        true,
      );
      await hearingOptionsHearingDetailsPage.continueOn(page);
      await submitPage.checkPageLoads(page, region, venue, accessibilityTest);
      await submitPage.checkValidInfo(
        page,
        region,
        caseRegionCode,
        venue,
        venueNotListed,
        "Hybrid",
        true,
      );
      await submitPage.continueOn(page);
    }
    return caseNumber;
  },
};

export default hearingOptions;
