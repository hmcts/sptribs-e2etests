import { Page } from "@playwright/test";
import config, { UserRole } from "../../config.ts";
import closeCase from "./closeCase.ts";
import commonHelpers from "../../helpers/commonHelpers.ts";
import events_content from "../../fixtures/content/CaseAPI/events_content.ts";

type ReinstateCase = {
  reinstateCase(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
    errorMessaging: boolean,
  ): Promise<void>;
};

const reinstateCase: ReinstateCase = {
  async reinstateCase(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
    errorMessaging: boolean,
  ): Promise<void> {
    const caseNumber = await closeCase.closeCase(
      page,
      "caseWorker",
      false,
      "Case Management",
      false,
      "caseWithdrawn",
      true,
      null,
      null,
    );
    await commonHelpers.signOutAndGoToCase(
      page,
      user,
      config.CaseAPIBaseURL,
      caseNumber,
    );
    await commonHelpers.chooseEventFromDropdown(
      page,
      events_content.reinstateCase,
    );
  },
};

export default reinstateCase;
