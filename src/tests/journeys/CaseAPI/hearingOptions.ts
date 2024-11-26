import { Page } from "@playwright/test";
import commonHelpers, {
  caseRegionCode,
  hearingFormat,
} from "../../helpers/commonHelpers.ts";
import events_content from "../../fixtures/content/CaseAPI/events_content.ts";
import hearingOptionsRegionDataPage from "../../pages/CaseAPI/hearingOptions/hearingOptionsRegionDataPage.ts";
import hearingOptionsHearingDetailsPage from "../../pages/CaseAPI/hearingOptions/hearingOptionsHearingDetailsPage.ts";
import submitPage from "../../pages/CaseAPI/hearingOptions/submitPage.ts";

type HearingOptions = {
  hearingOptions(
    page: Page,
    accessibilityTest: boolean,
    region: boolean,
    caseRegionCode: caseRegionCode | null,
    venue: boolean,
    venueNotListed: boolean,
    hearingFormat: hearingFormat,
    shortNoticeHearing: boolean,
    editJourney: boolean,
    caseNumber: string,
    subjectName: string,
  ): Promise<any>;
};

const hearingOptions: HearingOptions = {
  async hearingOptions(
    page: Page,
    accessibilityTest: boolean,
    region: boolean,
    caseRegionCode: caseRegionCode | null,
    venue: boolean,
    venueNotListed: boolean,
    hearingFormat: hearingFormat,
    shortNoticeHearing: boolean,
    editJourney: boolean,
    caseNumber: string,
    subjectName: string,
  ): Promise<any> {
    await commonHelpers.chooseEventFromDropdown(
      page,
      events_content.hearingOptions,
    );
    await hearingOptionsRegionDataPage.checkPageLoads(
      page,
      caseNumber,
      accessibilityTest,
      subjectName,
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
      caseNumber,
      subjectName,
    );
    await hearingOptionsHearingDetailsPage.fillInFields(
      page,
      venue,
      venueNotListed,
      hearingFormat,
      shortNoticeHearing,
    );
    await hearingOptionsHearingDetailsPage.continueOn(page);
    await submitPage.checkPageLoads(
      page,
      region,
      venue,
      accessibilityTest,
      caseNumber,
      subjectName,
    );
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
        subjectName,
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
        caseNumber,
        subjectName,
      );
      await hearingOptionsHearingDetailsPage.fillInFields(
        page,
        venue,
        venueNotListed,
        "Hybrid",
        true,
      );
      await hearingOptionsHearingDetailsPage.continueOn(page);
      await submitPage.checkPageLoads(
        page,
        region,
        venue,
        accessibilityTest,
        caseNumber,
        subjectName,
      );
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
  },
};

export default hearingOptions;
