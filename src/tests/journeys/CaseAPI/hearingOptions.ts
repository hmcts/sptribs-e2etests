import { Page } from "@playwright/test";
import { UserRole } from "../../config.ts";
import commonHelpers, {
  allEvents,
  caseRegionCode,
  Category,
  SubCategory,
  ContactPreference,
  Scheme,
  caseRegion,
} from "../../helpers/commonHelpers.ts";
import events_content from "../../fixtures/content/CaseAPI/events_content.ts";
import hearingOptionsRegionDataPage from "../../pages/CaseAPI/hearingOptions/hearingOptionsRegionDataPage.ts";
import hearingOptionsHearingDetailsPage from "../../pages/CaseAPI/hearingOptions/hearingOptionsHearingDetailsPage.ts";
import hearingOptionsHearingDetails from "../../pages/CaseAPI/hearingOptions/hearingOptionsHearingDetailsPage.ts";
import submitPage from "../../pages/CaseAPI/hearingOptions/submitPage.ts";
import createCase from "./createCase.ts";
import buildCase from "./buildCase.ts";

type HearingOptions = {
  hearingOptions(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
    category: Category,
    subCategory: SubCategory,
    representative: boolean,
    applicant: boolean,
    contactPreference: ContactPreference,
    representativeQualified: boolean,
    multipleFiles: boolean,
    schemeSelection: Scheme,
    caseRegionSelection: caseRegion,
    claimsLinked: boolean,
    compensationLinked: boolean,
    tribunalFormsInTime: boolean,
    applicantExplained: boolean,
    needLogin: boolean,
    region: boolean,
    caseRegionCode: caseRegionCode | null,
    venue: boolean,
    venueNotListed: boolean,
    hearingFormat: string,
    shortNoticeHearing: boolean,
    editJourney: boolean,
  ): Promise<void>;
};

const hearingOptions: HearingOptions = {
  async hearingOptions(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
    category: Category,
    subCategory: SubCategory,
    representative: boolean,
    applicant: boolean,
    contactPreference: ContactPreference,
    representativeQualified: boolean,
    multipleFiles: boolean,
    schemeSelection: Scheme,
    caseRegionSelection: caseRegion,
    claimsLinked: boolean,
    compensationLinked: boolean,
    tribunalFormsInTime: boolean,
    applicantExplained: boolean,
    needLogin: boolean,
    region: boolean,
    caseRegionCode: caseRegionCode | null,
    venue: boolean,
    venueNotListed: boolean,
    hearingFormat: string,
    shortNoticeHearing: boolean,
    editJourney: boolean,
  ): Promise<void> {
    let previousEvents: allEvents[] = [];
    let eventTimes: string[] = [];
    const caseNumber: string = await createCase.createCase(
      page,
      user,
      accessibilityTest,
      category,
      subCategory,
      representative,
      applicant,
      contactPreference,
      representativeQualified,
      multipleFiles,
      schemeSelection,
      caseRegionSelection,
      claimsLinked,
      compensationLinked,
      tribunalFormsInTime,
      applicantExplained,
      needLogin,
    );
    await createCase.verifyDetails(
      page,
      user,
      accessibilityTest,
      caseNumber,
      previousEvents,
      eventTimes,
    );
    await buildCase.buildCase(
      page,
      caseNumber,
      previousEvents,
      eventTimes,
      accessibilityTest,
    );
    await commonHelpers.chooseEventFromDropdown(
      page,
      events_content.hearingOptions,
    );
    await hearingOptionsRegionDataPage.checkPageLoads(
      page,
      caseNumber,
      accessibilityTest,
    );
    await hearingOptionsRegionDataPage.fillInFields(
      page,
      region,
      caseRegionCode,
    );
    await hearingOptionsRegionDataPage.continueOn(page);
    await hearingOptionsHearingDetailsPage.checkPageLoads(
      page,
      accessibilityTest,
    );
    await hearingOptionsHearingDetails.fillInFields(
      page,
      venue,
      venueNotListed,
      hearingFormat,
      shortNoticeHearing,
    );
    await hearingOptionsHearingDetailsPage.continueOn(page);
    await submitPage.checkPageLoads(page, region, venue, accessibilityTest);
    await submitPage.checkValidInfo(
      page,
      region,
      caseRegionCode,
      venue,
      venueNotListed,
      hearingFormat,
      shortNoticeHearing,
    );
    await submitPage.continueOn(page);

    if (editJourney) {
      await commonHelpers.chooseEventFromDropdown(
        page,
        events_content.hearingOptions,
      );
      await hearingOptionsRegionDataPage.checkPageLoads(
        page,
        caseNumber,
        accessibilityTest,
      );
      await hearingOptionsRegionDataPage.fillInFields(
        page,
        region,
        caseRegionCode,
      );
      await hearingOptionsRegionDataPage.continueOn(page);
      await hearingOptionsHearingDetailsPage.checkPageLoads(
        page,
        accessibilityTest,
      );
      await hearingOptionsHearingDetails.fillInFields(
        page,
        venue,
        venueNotListed,
        "Hybrid",
        true,
      );
      await hearingOptionsHearingDetailsPage.continueOn(page);
      await submitPage.checkPageLoads(page, region, venue, accessibilityTest);
      await submitPage.checkValidInfo(
        page,
        region,
        caseRegionCode,
        venue,
        venueNotListed,
        "Hybrid",
        true,
      );
      await submitPage.continueOn(page);
    }
  },
};

export default hearingOptions;
