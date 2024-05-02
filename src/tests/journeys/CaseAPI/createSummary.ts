import { Page } from "@playwright/test";
import createListing from "./createListing.ts";
import { UserRole } from "../../config.ts";
import commonHelpers, {
  hearingAdjournedReasons,
  hearingOutcome,
  hearingVenues,
  caseRegionCode,
  hearingType,
  hearingFormat,
  hearingSession,
  hearingVenueNames,
} from "../../helpers/commonHelpers.ts";
import createSummarySelectHearingPage from "../../pages/CaseAPI/createSummary/createSummarySelectHearingPage.ts";
import createSummaryHearingTypeAndFormatPage from "../../pages/CaseAPI/createSummary/createSummaryHearingTypeAndFormatPage.ts";
import createSummaryListingDetailsPage from "../../pages/CaseAPI/createSummary/createSummaryListingDetailsPage.ts";
import createSummaryHearingAttendeesPage from "../../pages/CaseAPI/createSummary/createSummaryHearingAttendeesPage.ts";
import createSummaryHearingAttendeesRolePage from "../../pages/CaseAPI/createSummary/createSummaryHearingAttendeesRolePage.ts";
import createSummaryHearingOutcomePage from "../../pages/CaseAPI/createSummary/createSummaryHearingOutcomePage.ts";
import createSummaryHearingRecordingUploadPage from "../../pages/CaseAPI/createSummary/createSummaryHearingRecordingUploadPage.ts";

type CreateSummary = {
  createSummary(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
    hearingType: hearingType,
    hearingFormat: hearingFormat,
    hearingSession: string,
    hearingAcrossMultipleDays: boolean,
    venue: hearingVenues | null,
    venueName: hearingVenueNames | null,
    hearingOutcome: hearingOutcome,
    hearingAdjournedReason: hearingAdjournedReasons | null,
    fullPanelHearing: boolean,
    editJourney: boolean,
    errorMessaging: boolean,
  ): Promise<string | void>;
};

const createSummary: CreateSummary = {
  async createSummary(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
    hearingType: hearingType,
    hearingFormat: hearingFormat,
    hearingSession: hearingSession,
    hearingAcrossMultipleDays: boolean,
    venue: hearingVenues | null,
    venueName: hearingVenueNames | null,
    hearingOutcome: hearingOutcome,
    hearingAdjournedReason: hearingAdjournedReasons | null,
    fullPanelHearing: boolean,
    editJourney: boolean,
    errorMessaging: boolean,
  ): Promise<string | void> {
    let caseNumber: string | void;

    caseNumber = await createListing.createListing(
      page,
      user,
      false,
      true,
      "1-London",
      hearingType,
      hearingFormat,
      hearingSession,
      hearingAcrossMultipleDays,
      false,
      venue,
      false,
    );
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Hearings:Create summary",
    );
    if (caseNumber !== undefined) {
      switch (errorMessaging) {
        default:
          await createSummarySelectHearingPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
          );
          await createSummarySelectHearingPage.fillInFields(page);
          await createSummarySelectHearingPage.continueOn(page);
          await createSummaryHearingTypeAndFormatPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
          );
          await createSummaryHearingTypeAndFormatPage.checkFields(
            page,
            hearingType,
            hearingFormat,
            editJourney,
          );
          await createSummaryHearingTypeAndFormatPage.continueOn(page);
          await createSummaryListingDetailsPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
            hearingAcrossMultipleDays,
            venue,
          );
          await createSummaryListingDetailsPage.checkFields(
            page,
            venue,
            venueName,
            hearingSession,
            hearingAcrossMultipleDays,
            editJourney,
          );
          await createSummaryListingDetailsPage.continueOn(page);
          await createSummaryHearingAttendeesPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
            errorMessaging,
          );
          await createSummaryHearingAttendeesPage.fillFields(
            page,
            fullPanelHearing,
          );
          await createSummaryHearingAttendeesPage.continueOn(page);
          await createSummaryHearingAttendeesRolePage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
          );
          await createSummaryHearingAttendeesRolePage.fillFields(page);
          await createSummaryHearingAttendeesRolePage.continueOn(page);
          await createSummaryHearingOutcomePage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
            errorMessaging,
          );
          await createSummaryHearingOutcomePage.fillFields(
            page,
            hearingOutcome,
            hearingAdjournedReason,
          );
          await createSummaryHearingOutcomePage.continueOn(page);
          await createSummaryHearingRecordingUploadPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
          );
          await createSummaryHearingRecordingUploadPage.fillFields(page);
          await createSummaryHearingRecordingUploadPage.continueOn(page);
          // submit page
          // confirm page

          break;
        case true:
          await createSummarySelectHearingPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
          );
          await createSummarySelectHearingPage.triggerErrorMessages(page);
          await createSummarySelectHearingPage.fillInFields(page);
          await createSummarySelectHearingPage.continueOn(page);
          break;
      }
    }
  },
};

export default createSummary;
