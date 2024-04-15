import { Page } from "@playwright/test";
import { UserRole } from "../../config.ts";
import hearingOptions from "./hearingOptions.ts";
import commonHelpers from "../../helpers/commonHelpers.ts";
import submitPage from "../../pages/CaseAPI/clearHearingOptions/submitPage.ts";

type ClearHearingOptions = {
  clearHearingOptions(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
  ): Promise<void>;
};

const clearHearingOptions: ClearHearingOptions = {
  async clearHearingOptions(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
  ): Promise<void> {
    const caseNumber = await hearingOptions.hearingOptions(
      page,
      user,
      accessibilityTest,
      true,
      "1-London",
      true,
      false,
      "Face to Face",
      false,
      false,
    );
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Case: Clear Hearing Options",
    );
    await submitPage.checkPageLoads(page, accessibilityTest, caseNumber);
    await submitPage.continueOn(page);
  },
};

export default clearHearingOptions;
