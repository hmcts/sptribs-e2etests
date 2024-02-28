import { expect, Page } from "@playwright/test";
import axeTest from "../../helpers/accessibilityTestHelper";
import CheckYourAnswersContent from "../../fixtures/content/DSSUpdateCase/CheckYourAnswers_content.ts";

type CheckYourAnswersPage = {
  continueButton: string;
  backButton: string;
  checkPageLoads(page: Page, accessibilityTest: boolean): Promise<void>;
  checkValidInfoAllFields(
    page: Page,
    multipleDocuments: boolean,
  ): Promise<void>;
  continueOn(page: Page): Promise<void>;
  pressBackButton(page: Page): Promise<void>;
};

const checkYourAnswersPage: CheckYourAnswersPage = {
  continueButton: "#main-form-submit",
  backButton: ".govuk-back-link",

  async checkPageLoads(page: Page, accessibilityTest: boolean): Promise<void> {
    await expect(page.locator(".govuk-header__service-name")).toHaveText(
      CheckYourAnswersContent.header,
    );
    await expect(page.locator(".govuk-heading-l")).toHaveText(
      CheckYourAnswersContent.pageTitle,
    );
    await expect(page.locator(".govuk-summary-list__key").nth(0)).toHaveText(
      CheckYourAnswersContent.textOnPage1,
    );
    await expect(page.locator(".govuk-summary-list__key").nth(1)).toHaveText(
      CheckYourAnswersContent.textOnPage2,
    );
    await expect(page.locator(".govuk-summary-list__key").nth(2)).toHaveText(
      CheckYourAnswersContent.textOnPage3,
    );

    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async checkValidInfoAllFields(
    page: Page,
    multipleDocuments: boolean,
  ): Promise<void> {},

  async continueOn(page: Page): Promise<void> {
    await page.click(this.continueButton);
  },

  async pressBackButton(page: Page): Promise<void> {
    await page.click(this.backButton);
  },
};

export default checkYourAnswersPage;
