import { Page } from "@playwright/test";
import { UserRole } from "../../config.ts";
import buildCase from "./buildCase.ts";
import commonHelpers, {
  allEvents,
  caseRegionCode,
  hearingFormat,
  hearingType,
} from "../../helpers/commonHelpers.ts";
import hearingOptions from "./hearingOptions.ts";
import createListingHearingTypeAndFormatPage from "../../pages/CaseAPI/createListing/createListingHearingTypeAndFormatPage.ts";
import createListingRegionInfoPage from "../../pages/CaseAPI/createListing/createListingRegionInfoPage.ts";
import createListingListingDetailsPage from "../../pages/CaseAPI/createListing/createListingListingDetailsPage.ts";
import createListingRemoteHearingInformationPage from "../../pages/CaseAPI/createListing/createListingRemoteHearingInformationPage.ts";
import createListingOtherInformationPage from "../../pages/CaseAPI/createListing/createListingOtherInformationPage.ts";
import createListingNotifyPage from "../../pages/CaseAPI/createListing/createListingNotifyPage.ts";

type CreateListing = {
  createListing(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
    region: boolean,
    caseRegionCode: caseRegionCode | null,
    hearingType: hearingType,
    hearingFormat: hearingFormat,
    hearingSession: string,
    hearingAcrossMultipleDays: boolean,
    readyToList: boolean,
    errorMessaging: boolean,
  ): Promise<void>;
};

const createListing: CreateListing = {
  async createListing(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
    region: boolean,
    caseRegionCode: caseRegionCode | null,
    hearingType: hearingType,
    hearingFormat: hearingFormat,
    hearingSession: string,
    hearingAcrossMultipleDays: boolean,
    readyToList: boolean,
    errorMessaging: boolean,
  ): Promise<void> {
    let caseNumber: string | undefined;
    let previousEvents: allEvents[] = [];
    let eventTimes: string[] = [];

    if (readyToList) {
      caseNumber = await hearingOptions.hearingOptions(
        page,
        user,
        accessibilityTest,
        true,
        "1-London",
        true,
        false,
        "Hybrid",
        false,
        false,
      );
    } else {
      caseNumber = await buildCase.buildCase(
        page,
        previousEvents,
        eventTimes,
        accessibilityTest,
        user,
      );
    }
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Hearings: Create listing",
    );
    if (caseNumber !== undefined) {
      await createListingHearingTypeAndFormatPage.checkPageLoads(
        page,
        caseNumber,
        accessibilityTest,
      );
      await createListingHearingTypeAndFormatPage.fillInFields(
        page,
        hearingType,
        hearingFormat,
      );
      await createListingHearingTypeAndFormatPage.continueOn(page);
      await page.waitForTimeout(1000);
      await createListingRegionInfoPage.checkPageLoads(
        page,
        caseNumber,
        accessibilityTest,
      );
      await createListingRegionInfoPage.fillInFields(
        page,
        region,
        caseRegionCode,
      );
      await createListingRegionInfoPage.continueOn(page);
      await createListingListingDetailsPage.checkPageLoads(
        page,
        caseNumber,
        accessibilityTest,
      );
      await createListingListingDetailsPage.fillInFields(
        page,
        true,
        false,
        hearingSession,
        hearingAcrossMultipleDays,
      );
      await createListingListingDetailsPage.continueOn(page);
      await createListingRemoteHearingInformationPage.checkPageLoads(
        page,
        caseNumber,
        accessibilityTest,
      );
      await createListingRemoteHearingInformationPage.fillInFields(page);
      await createListingRemoteHearingInformationPage.continueOn(page);
      await page.waitForTimeout(1000);
      await createListingOtherInformationPage.checkPageLoads(
        page,
        caseNumber,
        accessibilityTest,
      );
      await createListingOtherInformationPage.fillInFields(page);
      await createListingOtherInformationPage.continueOn(page);
      await createListingNotifyPage.checkPageLoads(
        page,
        caseNumber,
        accessibilityTest,
      );
      await createListingNotifyPage.continueOn(page);
    }
  },
};

export default createListing;
