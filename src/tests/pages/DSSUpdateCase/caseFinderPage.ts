import { expect, Page } from "@playwright/test";
import axeTest from "../../helpers/accessibilityTestHelper";
import CaseFinderDetails from "../../fixtures/content/DSSUpdateCase/CaseFinder_content.ts";

type CaseFinderPage = {
  caseReferenceNumber: string;
  continueButton: string;
  checkPageLoads(page: Page, accessibilityTest: boolean): Promise<void>;
  fillInFields(page: Page, caseNumber: string): Promise<void>;
  continueOn(page: Page): Promise<void>;
};

const caseFinderPage: CaseFinderPage = {
  caseReferenceNumber: "#applicantCaseId",
  continueButton: "button[name='saveAndContinue']",

  async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await expect(page.locator(".govuk-header__service-name")).toHaveText(
      CaseFinderDetails.header,
    );
    await expect(page.locator(".govuk-heading-l")).toHaveText(
      CaseFinderDetails.pageTitle,
    );
    await expect(page.locator(".govuk-hint").nth(0)).toContainText(
      CaseFinderDetails.hintMessage,
    );
    await expect(page.locator(".govuk-label")).toHaveText(
      CaseFinderDetails.subTitle,
    );
    await expect(page.locator(".govuk-hint").nth(1)).toHaveText(
      CaseFinderDetails.textOnPage1,
    );
    await expect(page.locator(caseFinderPage.continueButton)).toHaveText("Continue");
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async fillInFields(page: Page, caseNumber: string) {
    await page.fill(this.caseReferenceNumber, caseNumber);
  },

  async continueOn(page: Page): Promise<void> {
    await page.click(caseFinderPage.continueButton);
  },
};

export default caseFinderPage;
