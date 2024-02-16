import { Page } from "@playwright/test";
import createCaseConfirmPage from "../../pages/CaseAPI/createCase/confirmPage.ts";
import historyTabPage from "../../pages/CaseAPI/caseTabs/historyTabPage.ts";
import commonHelpers from "../../helpers/commonHelpers.ts";
import events_content from "../../fixtures/content/CaseAPI/events_content.ts";
import builtCasePage from "../../pages/CaseAPI/buildCase/buildCasePage.ts";
import buildCaseConfirmPage from "../../pages/CaseAPI/buildCase/confirmPage.ts";
import stateTabPage from "../../pages/CaseAPI/caseTabs/stateTabPage.ts";
import stateTab_content from "../../fixtures/content/CaseAPI/caseTabs/stateTab_content.ts";

export async function buildCase(page: Page, state: string) {
  const caseNumber = await createCaseConfirmPage.returnCaseNumber(page);
  let time = await createCaseConfirmPage.closeAndReturnToCase(page);
  await historyTabPage.checkPageLoads(page, true, caseNumber, state);
  await historyTabPage.checkPageInfo(page, time, state);
  await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
  await builtCasePage.checkPageLoads(page, true, caseNumber);
  await builtCasePage.continueOn(page);
  await buildCaseConfirmPage.checkPageLoads(page, true, caseNumber);
  await buildCaseConfirmPage.continueOn(page);
  await stateTabPage.changeToStateTab(page);
  await stateTabPage.checkStateTab(page, stateTab_content.caseManagementState);
}