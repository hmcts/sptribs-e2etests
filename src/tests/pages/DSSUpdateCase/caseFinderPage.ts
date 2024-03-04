import { expect, Page } from "@playwright/test";
import axeTest from "../../helpers/accessibilityTestHelper";
import CaseFinderDetails from "../../fixtures/content/DSSUpdateCase/CaseFinder_content.ts";
import CommonHelpers from "../../helpers/commonHelpers.ts";

type CaseFinderPage = {
  caseReferenceNumber: string;
  continueButton: string;
  backButton: string;
  checkPageLoads(page: Page, accessibilityTest: boolean): Promise<void>;
  fillInFields(page: Page, caseNumber: string | void): Promise<void>;
  continueOn(page: Page): Promise<void>;
  triggerErrorMessages(page: Page): Promise<void>;
  pressBackButton(page: Page): Promise<void>;
};

const caseFinderPage: CaseFinderPage = {
  caseReferenceNumber: "#applicantCaseId",
  continueButton: "button[name='saveAndContinue']",
  backButton: ".govuk-back-link",

  async checkPageLoads(page: Page, accessibilityTest: boolean): Promise<void> {
    await CommonHelpers.checkAndAcceptCookies(page);
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
    await expect(page.locator(this.continueButton)).toHaveText("Continue");
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async triggerErrorMessages(page: Page) {
    await page.click(this.continueButton);
    await expect(page.locator(".govuk-error-summary__title")).toHaveText(
      CaseFinderDetails.errorBanner,
    );
    await expect(page.locator("#applicantCaseId-error")).toContainText(
      CaseFinderDetails.referenceNumberError,
    );
    await page.fill(this.caseReferenceNumber, "111111111111111");
    await page.click(this.continueButton);
    await expect(page.locator("#applicantCaseId-error")).toContainText(
      CaseFinderDetails.validReferenceNumberError,
    );
    await page.fill(this.caseReferenceNumber, "asdfghjkl;'-");
    await page.click(this.continueButton);
    await expect(page.locator("#applicantCaseId-error")).toContainText(
      CaseFinderDetails.characterError,
    );
  },

  async fillInFields(page: Page, caseNumber: string) {
    try {
      await page.fill(this.caseReferenceNumber, caseNumber.replace(/\D/g, ""));
    } catch (error) {
      console.error(
        "Error occurred with inputting the case reference number as it is void.",
        error,
      );
      throw error;
    }
  },

  async continueOn(page: Page): Promise<void> {
    await page.click(this.continueButton);
  },

  async pressBackButton(page: Page): Promise<void> {
    await page.click(this.backButton);
  },
};

export default caseFinderPage;
