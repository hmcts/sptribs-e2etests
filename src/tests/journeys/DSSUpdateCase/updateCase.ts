import landingPage from "../../pages/DSSUpdateCase/landingPage.ts";
import caseFinderPage from "../../pages/DSSUpdateCase/caseFinderPage.ts";
import { Page } from "@playwright/test";

export async function updateCase(
  page: Page,
  accessibilityTest: boolean,
  caseNumber: string | void ,
) {
  await landingPage.seeTheLandingPage(page, accessibilityTest);
  await landingPage.continueOn(page);
  await caseFinderPage.checkPageLoads(page, accessibilityTest);
  await caseFinderPage.fillInFields(page, caseNumber);
  await caseFinderPage.continueOn(page);
}
