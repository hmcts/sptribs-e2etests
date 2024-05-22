import { Page } from "@playwright/test";
import createEditStay from "./createEditStay.ts";
import commonHelpers from "../../helpers/commonHelpers.ts";
import config, { UserRole } from "../../config.ts";
import events_content from "../../fixtures/content/CaseAPI/events_content.ts";
import removeStayPage, {
  RemoveReason,
} from "../../pages/CaseAPI/removeStay/removeStayPage.ts";

type RemoveStay = {
  removeStay(
    page: Page,
    accessibilityTest: boolean,
    user: UserRole,
    removeReason: RemoveReason,
    optionalText: boolean,
    errorJourney: boolean,
  ): Promise<void>;
};

const removeStay: RemoveStay = {
  async removeStay(
    page: Page,
    accessibilityTest: boolean,
    user: UserRole,
    removeReason: RemoveReason,
    optionalText: boolean,
    errorJourney: boolean,
  ): Promise<void> {
    const caseNumber = await createEditStay.createEditStay(
      page,
      false,
      "Case Management",
      "caseWorker",
      false,
      "waitingOutcomeOfCivilCase",
      true,
    );
    await commonHelpers.signOutAndGoToCase(
      page,
      user,
      config.CaseAPIBaseURL,
      caseNumber,
    );
    await commonHelpers.chooseEventFromDropdown(
      page,
      events_content.removeStay,
    );
    switch (errorJourney) {
      default:
        await removeStayPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
        );
        await removeStayPage.continueOn(page, removeReason, optionalText);
        break;
      case true:
        await removeStayPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
        );
        await removeStayPage.triggerErrorMessages(page);
    }
  },
};

export default removeStay;
