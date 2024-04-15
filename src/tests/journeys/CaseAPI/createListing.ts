import { Page } from "@playwright/test";
import { UserRole } from "../../config.ts";
import buildCase from "./buildCase.ts";
import commonHelpers, {
  allEvents,
  hearingFormat,
  hearingType,
} from "../../helpers/commonHelpers.ts";
import hearingOptions from "./hearingOptions.ts";
import createListingHearingTypeAndFormatPage from "../../pages/CaseAPI/createListing/createListingHearingTypeAndFormatPage.ts";

type CreateListing = {
  createListing(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
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

    }
  },
};

export default createListing;
