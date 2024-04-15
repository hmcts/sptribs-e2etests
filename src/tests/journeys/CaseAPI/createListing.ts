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

type CreateListing = {
  createListing(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
    region: boolean,
    caseRegionCode: caseRegionCode | null,
    hearingType: hearingType,
    hearingFormat: hearingFormat,
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
      await page.pause();
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
    }
  },
};

export default createListing;
