import { Page } from "@playwright/test";
import createListing from "./createListing.ts";
import { UserRole } from "../../config.ts";
import commonHelpers, {
  caseRegionCode,
  hearingType,
  hearingFormat,
  hearingSession,
  hearingVenues,
} from "../../helpers/commonHelpers.ts";
import editListingSelectHearingPage from "../../pages/CaseAPI/editListing/editListingSelectHearingPage.ts";

type EditListing = {
  editListing(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
    region: boolean,
    caseRegionCode: caseRegionCode | null,
    hearingType: hearingType,
    hearingFormat: hearingFormat,
    hearingSession: hearingSession,
    hearingAcrossMultipleDays: boolean,
    venue: hearingVenues | null,
    errorMessaging: boolean,
  ): Promise<void>;
};

const editListing: EditListing = {
  async editListing(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
    region: boolean,
    caseRegionCode: caseRegionCode | null,
    hearingType: hearingType,
    hearingFormat: hearingFormat,
    hearingSession: hearingSession,
    hearingAcrossMultipleDays: boolean,
    venue: hearingVenues | null,
    errorMessaging: boolean,
  ): Promise<void> {
    let caseNumber: string | void;
    caseNumber = await createListing.createListing(
      page,
      user,
      false,
      true,
      "2-Midlands",
      "Final",
      "Paper",
      "Morning",
      false,
      false,
      "Birmingham Civil And Family Justice Centre-Priory Courts, 33 Bull Street",
      false,
    );
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Hearings: Edit listing",
    );
    if (caseNumber !== undefined) {
      switch (errorMessaging) {
        default:
          await editListingSelectHearingPage.checkPageLoads(page, caseNumber, accessibilityTest);
          const hearing = await editListingSelectHearingPage.fillInFields(page);
          await editListingSelectHearingPage.continueOn(page);


          break;
        case true:
          await editListingSelectHearingPage.checkPageLoads(page, caseNumber, accessibilityTest);
          await editListingSelectHearingPage.triggerErrorMessages(page);
          await editListingSelectHearingPage.fillInFields(page);
          await editListingSelectHearingPage.continueOn(page);

          break;
      }
    } else {
      throw new Error("Case number is undefined.")
    }
  },
};

export default editListing;
