import { Page } from "@playwright/test";
import commonHelpers from "../../helpers/commonHelpers.ts";
import submitPage from "../../pages/CaseAPI/clearHearingOptions/submitPage.ts";

type ClearHearingOptions = {
  clearHearingOptions(
    page: Page,
    accessibilityTest: boolean,
    caseNumber: string,
    subjectName: string,
  ): Promise<void>;
};

const clearHearingOptions: ClearHearingOptions = {
  async clearHearingOptions(
    page: Page,
    accessibilityTest: boolean,
    caseNumber: string,
    subjectName: string,
  ): Promise<void> {
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Case: Clear Hearing Options",
    );
    await submitPage.checkPageLoads(
      page,
      accessibilityTest,
      caseNumber,
      subjectName,
    );
    await submitPage.continueOn(page);
  },
};

export default clearHearingOptions;
