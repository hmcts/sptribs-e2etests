import { Page } from "@playwright/test";
import createListing from "./createListing.ts";
import { UserRole } from "../../config.ts";
import commonHelpers, {
  hearingAdjournedReasons,
  hearingOutcome,
} from "../../helpers/commonHelpers.ts";
import createSummarySelectHearingPage from "../../pages/CaseAPI/createSummary/createSummarySelectHearingPage.ts";

type CreateSummary = {
  createSummary(
    page: Page,
    user: UserRole,
    hearingOutcome: hearingOutcome,
    hearingAdjournedReason: hearingAdjournedReasons | null,
    accessibilityTest: boolean,
    errorMessaging: boolean,
  ): Promise<string | void>;
};

const createSummary: CreateSummary = {
  async createSummary(
    page: Page,
    user: UserRole,
    hearingOutcome: hearingOutcome,
    hearingAdjournedReason: hearingAdjournedReasons | null,
    accessibilityTest: boolean,
    errorMessaging: boolean,
  ): Promise<string | void> {
    let caseNumber: string | void;

    caseNumber = await createListing.createListing(
      page,
      user,
      false,
      true,
      "1-London",
      "Case management",
      "Face to Face",
      "Morning",
      false,
      false,
      "East London Tribunal Hearing Centre-2 Clove Crescent, East India Dock London",
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
          await page.pause();
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
