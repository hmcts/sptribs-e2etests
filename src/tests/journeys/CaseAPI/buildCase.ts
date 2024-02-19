import { Page } from "@playwright/test";
import commonHelpers from "../../helpers/commonHelpers.ts";
import events_content from "../../fixtures/content/CaseAPI/events_content.ts";
import builtCasePage from "../../pages/CaseAPI/buildCase/buildCasePage.ts";
import buildCaseConfirmPage from "../../pages/CaseAPI/buildCase/confirmPage.ts";

export async function buildCase(
  page: Page,
  caseNumber: string,
  accessibilityTest: boolean,
) {
  await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
  await builtCasePage.checkPageLoads(page, accessibilityTest, caseNumber);
  await builtCasePage.continueOn(page);
  await buildCaseConfirmPage.checkPageLoads(
    page,
    accessibilityTest,
    caseNumber,
  );
}
