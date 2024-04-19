import { Page } from "@playwright/test";
import config, { UserRole } from "../../config.ts";
import buildCase from "./buildCase.ts";
import commonHelpers, {
  allEvents,
  caseRegionCode,
  hearingFormat,
  hearingSession,
  hearingType,
  hearingVenues,
} from "../../helpers/commonHelpers.ts";
import hearingOptions from "./hearingOptions.ts";
import createListingHearingTypeAndFormatPage from "../../pages/CaseAPI/createListing/createListingHearingTypeAndFormatPage.ts";
import createListingRegionInfoPage from "../../pages/CaseAPI/createListing/createListingRegionInfoPage.ts";
import createListingListingDetailsPage from "../../pages/CaseAPI/createListing/createListingListingDetailsPage.ts";
import createListingRemoteHearingInformationPage from "../../pages/CaseAPI/createListing/createListingRemoteHearingInformationPage.ts";
import createListingOtherInformationPage from "../../pages/CaseAPI/createListing/createListingOtherInformationPage.ts";
import createListingNotifyPage from "../../pages/CaseAPI/createListing/createListingNotifyPage.ts";
import submitPage from "../../pages/CaseAPI/createListing/submitPage.ts";
import idamLoginHelper from "../../helpers/idamLoginHelper.ts";
import confirmPage from "../../pages/CaseAPI/createListing/confirmPage.ts";

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
    venue: hearingVenues | null,
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
    hearingSession: hearingSession,
    hearingAcrossMultipleDays: boolean,
    readyToList: boolean,
    venue: hearingVenues | null,
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
      if (user === "seniorJudge") {
        caseNumber = await buildCase.buildCase(
          page,
          previousEvents,
          eventTimes,
          accessibilityTest,
          "caseWorker",
        );
        await page.getByText("Sign out").click();
        await idamLoginHelper.signInUser(page, user, config.CaseAPIBaseURL);
        await page.goto(
          config.CaseAPIBaseURL +
            `/case-details/${caseNumber.replace(/-/g, "")}#History`,
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
      switch (errorMessaging) {
        default:
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
          await createListingListingDetailsPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
            errorMessaging,
          );
          await createListingListingDetailsPage.fillInFields(
            page,
            venue,
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
            hearingType,
            hearingFormat,
            hearingSession,
            hearingAcrossMultipleDays,
            venue,
          );
          await submitPage.continueOn(page);
          await confirmPage.checkPageLoads(page, caseNumber, accessibilityTest);
          await confirmPage.continueOn(page);
          // check hearings tab
          break;
        case true:
          await createListingHearingTypeAndFormatPage.triggerErrorMessage(page);
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
          await createListingListingDetailsPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
            errorMessaging,
          );
          await createListingListingDetailsPage.triggerErrorMessages(page);
          await createListingListingDetailsPage.fillInFields(
            page,
            venue,
            hearingSession,
            hearingAcrossMultipleDays,
          );
          await createListingListingDetailsPage.continueOn(page);
          await createListingRemoteHearingInformationPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
          );
          await createListingRemoteHearingInformationPage.continueOn(page);
          await createListingOtherInformationPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
          );
          await createListingOtherInformationPage.continueOn(page);
          await createListingNotifyPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
          );
          await createListingNotifyPage.triggerErrorMessages(page);
          break;
      }
    }
  },
};

export default createListing;
