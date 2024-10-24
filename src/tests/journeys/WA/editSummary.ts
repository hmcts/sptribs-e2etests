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
import editSummaryHearingAttendeesPage from "../../pages/CaseAPI/editSummary/editSummaryHearingAttendeesPage.ts";
import editSummaryHearingAttendeesRolePage from "../../pages/CaseAPI/editSummary/editSummaryHearingAttendeesRolePage.ts";
import editSummaryHearingOutcomePage from "../../pages/CaseAPI/editSummary/editSummaryHearingOutcomePage.ts";
import editSummaryHearingRecordingUploadPage from "../../pages/CaseAPI/editSummary/editSummaryHearingRecordingUploadPage.ts";
import submitPage from "../../pages/CaseAPI/editSummary/submitPage.ts";
import confirmPage from "../../pages/CaseAPI/editSummary/confirmPage.ts";
import hearingsTabPage from "../../pages/CaseAPI/caseTabs/hearingsTabPage.ts";

type EditSummary = {
  editSummary(
    page: Page,
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
    caseNumber: string,
    subjectName: string,
  ): Promise<void>;
};

const editSummary: EditSummary = {
  async editSummary(
    page: Page,
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
    caseNumber: string,
    subjectName: string,
  ): Promise<void> {
    await commonHelpers.chooseEventFromDropdown(page, "Hearings: Edit summary");
    if (caseNumber !== undefined) {
      switch (errorMessaging) {
        default:
          await editSummarySelectHearingPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
            subjectName,
          );
          const hearing = await editSummarySelectHearingPage.fillInFields(page);
          await editSummarySelectHearingPage.continueOn(page);
          await editSummaryHearingTypeAndFormatPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
            subjectName,
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
            subjectName,
          );
          await editSummaryListingDetailsPage.checkFields(page);
          await editSummaryListingDetailsPage.fillFields(
            page,
            venue,
            hearingSession,
            hearingAcrossMultipleDays,
          );
          await editSummaryListingDetailsPage.continueOn(page);
          await editSummaryHearingAttendeesPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
            subjectName,
          );
          const panel = await editSummaryHearingAttendeesPage.fillFields(
            page,
            fullPanelHearing,
          );
          await editSummaryHearingAttendeesPage.continueOn(page);
          await editSummaryHearingAttendeesRolePage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
            subjectName,
          );
          await editSummaryHearingAttendeesRolePage.checkFields(page);
          await editSummaryHearingAttendeesRolePage.continueOn(page);
          await editSummaryHearingOutcomePage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
            errorMessaging,
            subjectName,
          );
          await editSummaryHearingOutcomePage.fillFields(
            page,
            hearingOutcome,
            hearingAdjournedReason,
          );
          await editSummaryHearingOutcomePage.continueOn(page);
          await editSummaryHearingRecordingUploadPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
            subjectName,
          );
          await editSummaryHearingRecordingUploadPage.checkFields(page);
          await editSummaryHearingRecordingUploadPage.continueOn(page);
          await submitPage.checkPageLoads(
            page,
            caseNumber,
            hearingAcrossMultipleDays,
            fullPanelHearing,
            hearingOutcome,
            hearingAdjournedReason,
            venue,
            accessibilityTest,
            subjectName,
          );
          await submitPage.checkValidInfo(
            page,
            panel,
            fullPanelHearing,
            hearing,
            hearingType,
            hearingFormat,
            hearingSession,
            hearingAcrossMultipleDays,
            hearingOutcome,
            hearingAdjournedReason,
            venue,
            venueName,
          );
          await submitPage.continueOn(page);
          await confirmPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
            subjectName,
          );
          await confirmPage.continueOn(page);
          await hearingsTabPage.changeToHearingsTab(page);
          await hearingsTabPage.checkPageLoads(
            page,
            true,
            hearingAcrossMultipleDays,
            false,
            venue,
            false,
            true,
            hearingOutcome,
            fullPanelHearing,
            false,
            false,
            false,
            false,
            accessibilityTest,
          );
          await hearingsTabPage.checkValidInfoCreateSummary(
            page,
            hearingType,
            hearingFormat,
            hearingSession,
            hearingAcrossMultipleDays,
            venue,
            venueName,
            hearingOutcome,
            hearingAdjournedReason,
            panel,
            fullPanelHearing,
            false,
            subjectName,
          );
          break;
        case true:
          await editSummarySelectHearingPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
            subjectName,
          );
          await editSummarySelectHearingPage.triggerErrorMessages(page);
          await editSummarySelectHearingPage.fillInFields(page);
          await editSummarySelectHearingPage.continueOn(page);
          await editSummaryHearingTypeAndFormatPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
            subjectName,
          );
          await editSummaryHearingTypeAndFormatPage.continueOn(page);
          await editSummaryListingDetailsPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
            venue,
            subjectName,
          );
          await editSummaryListingDetailsPage.triggerErrorMessages(page);
          await editSummaryListingDetailsPage.fillFields(
            page,
            venue,
            hearingSession,
            hearingAcrossMultipleDays,
          );
          await editSummaryListingDetailsPage.continueOn(page);
          await editSummaryHearingAttendeesPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
            subjectName,
          );
          await editSummaryHearingAttendeesPage.triggerErrorMessages(page);
          await editSummaryHearingAttendeesPage.fillFields(
            page,
            fullPanelHearing,
          );
          await editSummaryHearingAttendeesPage.continueOn(page);
          await editSummaryHearingAttendeesRolePage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
            subjectName,
          );
          await editSummaryHearingAttendeesRolePage.triggerErrorMessages(page);
          await editSummaryHearingAttendeesRolePage.checkFields(page);
          await editSummaryHearingAttendeesRolePage.continueOn(page);
          await editSummaryHearingOutcomePage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
            errorMessaging,
            subjectName,
          );
          await editSummaryHearingOutcomePage.triggerErrorMessages(page);
          break;
      }
    } else {
      throw new Error("Case number is undefined.");
    }
  },
};

export default editSummary;
