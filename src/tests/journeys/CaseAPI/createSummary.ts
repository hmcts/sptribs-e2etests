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
} from "../../helpers/commonHelpers.ts";
import createSummarySelectHearingPage from "../../pages/CaseAPI/createSummary/createSummarySelectHearingPage.ts";
import createSummaryHearingTypeAndFormatPage from "../../pages/CaseAPI/createSummary/createSummaryHearingTypeAndFormatPage.ts";

type CreateSummary = {
  createSummary(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
    region: boolean,
    caseRegionCode: caseRegionCode | null,
    hearingType: hearingType,
    hearingFormat: hearingFormat,
    hearingSession: string,
    hearingAcrossMultipleDays: boolean,
    venue: hearingVenues | null,
    hearingOutcome: hearingOutcome,
    hearingAdjournedReason: hearingAdjournedReasons | null,
    editJourney: boolean,
    errorMessaging: boolean,
  ): Promise<string | void>;
};

const createSummary: CreateSummary = {
  async createSummary(
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
    hearingOutcome: hearingOutcome,
    hearingAdjournedReason: hearingAdjournedReasons | null,
    editJourney: boolean,
    errorMessaging: boolean,
  ): Promise<string | void> {
    let caseNumber: string | void;

    caseNumber = await createListing.createListing(
      page,
      user,
      false,
      region,
      caseRegionCode,
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
