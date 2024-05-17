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
import editListingChangeReasonPage from "../../pages/CaseAPI/editListing/editListingChangeReasonPage.ts";
import editListingNotifyPage from "../../pages/CaseAPI/editListing/editListingNotifyPage.ts";
import submitPage from "../../pages/CaseAPI/editListing/submitPage.ts";
import confirmPage from "../../pages/CaseAPI/editListing/confirmPage.ts";
import hearingsTabPage from "../../pages/CaseAPI/caseTabs/hearingsTabPage.ts";

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
          await editListingChangeReasonPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
          );
          await editListingChangeReasonPage.fillFields(page);
          await editListingChangeReasonPage.continueOn(page);
          await editListingNotifyPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
          );
          await editListingNotifyPage.continueOn(page);
          await submitPage.checkPageLoads(
            page,
            caseNumber,
            region,
            hearingAcrossMultipleDays,
            venue,
            accessibilityTest,
          );
          await submitPage.checkValidInfo(
            page,
            region,
            caseRegionCode,
            hearing,
            hearingType,
            hearingFormat,
            hearingSession,
            hearingAcrossMultipleDays,
            venue,
          );
          await submitPage.continueOn(page);
          await confirmPage.checkPageLoads(page, caseNumber, accessibilityTest);
          await confirmPage.continueOn(page);
          await hearingsTabPage.changeToHearingsTab(page);
          await hearingsTabPage.checkPageLoads(
            page,
            region,
            hearingAcrossMultipleDays,
            false,
            venue,
            false,
            null,
            false,
            false,
            false,
            false,
            true,
            accessibilityTest,
          );
          await hearingsTabPage.checkValidInfoCreateListing(
            page,
            region,
            caseRegionCode,
            hearingType,
            hearingFormat,
            hearingSession,
            hearingAcrossMultipleDays,
            false,
            venue,
            true
          );
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
          await editListingRegionInfoPage.fillInFields(page, region, caseRegionCode);
          await editListingRegionInfoPage.continueOn(page);
          await editListingListingDetailsPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
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
          await editListingChangeReasonPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
          );
          await editListingChangeReasonPage.triggerErrorMessages(page);
          await editListingChangeReasonPage.fillFields(page);
          await editListingChangeReasonPage.continueOn(page);
          await editListingNotifyPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
          );
          await editListingNotifyPage.triggerErrorMessages(page);
          break;
      }
    } else {
      throw new Error("Case number is undefined.");
    }
  },
};

export default editListing;
