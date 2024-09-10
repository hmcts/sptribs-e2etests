import { Page } from "@playwright/test";
import builtCasePage from "../../pages/CaseAPI/buildCase/buildCasePage.ts";
import buildCaseConfirmPage from "../../pages/CaseAPI/buildCase/confirmPage.ts";

type BuildCase = {
  buildCase(
    page: Page,
    accessibilityTest: boolean,
    caseNumber: string,
  ): Promise<void>;
};

const buildCase: BuildCase = {
  async buildCase(
    page: Page,
    accessibilityTest: boolean,
    caseNumber: string,
  ): Promise<void> {
    await builtCasePage.checkPageLoads(page, accessibilityTest, caseNumber);
    await builtCasePage.continueOn(page);
    await buildCaseConfirmPage.checkPageLoads(
      page,
      accessibilityTest,
      caseNumber,
    );
    await buildCaseConfirmPage.continueOn(page);
  },
};

export default buildCase;
