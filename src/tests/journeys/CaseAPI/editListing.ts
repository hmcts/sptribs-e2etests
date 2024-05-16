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
import editListingHearingTypeAndFormatPage from "../../pages/CaseAPI/editListing/editListingHearingTypeAndFormatPage.ts";
import editListingRegionInfoPage from "../../pages/CaseAPI/editListing/editListingRegionInfoPage.ts";
import editListingListingDetailsPage from "../../pages/CaseAPI/editListing/editListingListingDetailsPage.ts";
import editListingRemoteHearingInformationPage from "../../pages/CaseAPI/editListing/editListingRemoteHearingInformationPage.ts";
import editListingOtherInformationPage from "../../pages/CaseAPI/editListing/editListingOtherInformationPage.ts";

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
    await commonHelpers.chooseEventFromDropdown(page, "Hearings: Edit listing");
    if (caseNumber !== undefined) {
      switch (errorMessaging) {
        default:
          await editListingSelectHearingPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
          );
          const hearing = await editListingSelectHearingPage.fillInFields(page);
          await editListingSelectHearingPage.continueOn(page);
          await editListingHearingTypeAndFormatPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
          );
          await editListingHearingTypeAndFormatPage.fillInFields(
            page,
            hearingType,
            hearingFormat,
          );
          await editListingHearingTypeAndFormatPage.continueOn(page);
          await editListingRegionInfoPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
          );
          await editListingRegionInfoPage.fillInFields(
            page,
            region,
            caseRegionCode,
          );
          await editListingRegionInfoPage.continueOn(page);
          await editListingListingDetailsPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
            hearingAcrossMultipleDays,
            venue,
          );
          await editListingListingDetailsPage.checkFields(page);
          await editListingListingDetailsPage.fillFields(
            page,
            venue,
            hearingSession,
            hearingAcrossMultipleDays,
          );
          await editListingListingDetailsPage.continueOn(page);
          await editListingRemoteHearingInformationPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
          );
          await editListingRemoteHearingInformationPage.checkFields(page);
          await editListingRemoteHearingInformationPage.continueOn(page);
          await editListingOtherInformationPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
          );
          await editListingOtherInformationPage.checkFields(page);
          await editListingOtherInformationPage.continueOn(page);

          break;
        case true:
          await editListingSelectHearingPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
          );
          await editListingSelectHearingPage.triggerErrorMessages(page);
          await editListingSelectHearingPage.fillInFields(page);
          await editListingSelectHearingPage.continueOn(page);
          await editListingHearingTypeAndFormatPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
          );
          await editListingHearingTypeAndFormatPage.continueOn(page);
          await editListingRegionInfoPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
          );
          await editListingRegionInfoPage.continueOn(page);
          await editListingListingDetailsPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
            hearingAcrossMultipleDays,
            venue,
          );
          await editListingListingDetailsPage.triggerErrorMessages(page);
          await editListingListingDetailsPage.fillFields(
            page,
            venue,
            hearingSession,
            hearingAcrossMultipleDays,
          );
          await editListingListingDetailsPage.continueOn(page);
          await editListingRemoteHearingInformationPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
          );
          await editListingRemoteHearingInformationPage.continueOn(page);
          await editListingOtherInformationPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
          );
          await editListingOtherInformationPage.continueOn(page);

          break;
      }
    } else {
      throw new Error("Case number is undefined.");
    }
  },
};

export default editListing;
