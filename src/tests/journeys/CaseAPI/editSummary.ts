import { Page } from "@playwright/test";
import { UserRole } from "../../config.ts";
import createSummary from "./createSummary.ts";
import commonHelpers, {
  hearingType,
  hearingFormat,
  hearingSession,
  hearingAdjournedReasons,
  hearingVenueNames,
  hearingVenues,
  hearingOutcome,
} from "../../helpers/commonHelpers.ts";
import editSummarySelectHearingPage from "../../pages/CaseAPI/editSummary/editSummarySelectHearingPage.ts";
import editSummaryHearingTypeAndFormatPage from "../../pages/CaseAPI/editSummary/editSummaryHearingTypeAndFormatPage.ts";
import editSummaryListingDetailsPage from "../../pages/CaseAPI/editSummary/editSummaryListingDetailsPage.ts";

type EditSummary = {
  editSummary(
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
    errorMessaging: boolean,
  ): Promise<void>;
};

const editSummary: EditSummary = {
  async editSummary(
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
    errorMessaging: boolean,
  ): Promise<void> {
    let caseNumber: string | void;

    caseNumber = await createSummary.createSummary(
      page,
      user,
      false,
      "Case management",
      "Hybrid",
      "Morning",
      false,
      "Fox Court - London (Central) SSCS Tribunal-4th Floor, Fox Court, 30 Brooke Street, London",
      "Fox Court",
      "Allowed",
      null,
      true,
      false,
      false,
    );
    await commonHelpers.chooseEventFromDropdown(page, "Hearings: Edit summary");
    if (caseNumber !== undefined) {
      switch (errorMessaging) {
        default:
          await editSummarySelectHearingPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
          );
          const hearing = await editSummarySelectHearingPage.fillInFields(page);
          await editSummarySelectHearingPage.continueOn(page);
          await editSummaryHearingTypeAndFormatPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
          );
          await editSummaryHearingTypeAndFormatPage.fillInFields(
            page,
            hearingType,
            hearingFormat,
          );
          await editSummaryHearingTypeAndFormatPage.continueOn(page);
          await editSummaryListingDetailsPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
            venue,
          );
          await editSummaryListingDetailsPage.checkFields(page);
          await editSummaryListingDetailsPage.fillFields(
            page,
            venue,
            hearingSession,
            hearingAcrossMultipleDays,
          );
          await editSummaryListingDetailsPage.continueOn(page);

          break;
        case true:
          await editSummarySelectHearingPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
          );
          await editSummarySelectHearingPage.triggerErrorMessages(page);
          await editSummarySelectHearingPage.fillInFields(page);
          await editSummarySelectHearingPage.continueOn(page);
          await editSummaryHearingTypeAndFormatPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
          );
          await editSummaryHearingTypeAndFormatPage.continueOn(page);
          await editSummaryListingDetailsPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
            venue,
          );
          await editSummaryListingDetailsPage.triggerErrorMessages(page);
          await editSummaryListingDetailsPage.continueOn(page);

          break;
      }
    } else {
      throw new Error("Case number is undefined.");
    }
  },
};

export default editSummary;
