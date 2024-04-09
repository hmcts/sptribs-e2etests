import { expect, Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import selectAdditionalDocuments_content from "../../../fixtures/content/CaseAPI/issueToRespondent/selectAdditionalDocuments_content.ts";
import caseSubjectDetailsObject_content from "../../../fixtures/content/CaseAPI/createCase/caseSubjectDetailsObject_content.ts";
import path from "path";
import config from "../../../config.ts";
import commonHelpers from "../../../helpers/commonHelpers.ts";

type SelectAdditionalDocuments = {
  checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    caseNumber: string,
  ): Promise<void>;
  continueOn(page: Page): Promise<void>;
  triggerErrorMessages(page: Page): Promise<void>;
};

const selectAdditionalDocuments: SelectAdditionalDocuments = {
  async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    caseNumber: string,
  ): Promise<void> {
    await Promise.all([
      expect(page.locator(".govuk-caption-l")).toHaveText(
        selectAdditionalDocuments_content.pageHint,
      ),
      expect(page.locator(".govuk-heading-l")).toHaveText(
        selectAdditionalDocuments_content.pageTitle,
      ),
      expect(page.locator("markdown > h3")).toContainText(
        caseSubjectDetailsObject_content.name,
      ),
      expect(page.locator("markdown > p").nth(0)).toContainText(
        selectAdditionalDocuments_content.caseReference + caseNumber,
      ),
      expect(page.locator(".form-label")).toContainText(
        path.basename(config.testPdfFile) + " A - Application Form",
      ),
    ]);
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async continueOn(page: Page): Promise<void> {
    await page.locator(".form-control").click();
    await page.getByRole("button", { name: "Continue" }).click();
  },

  async triggerErrorMessages(page: Page): Promise<void> {
    await page.getByRole("button", { name: "Continue" }).click();
    await commonHelpers.checkVisibleAndPresent(
      page.locator(
        `.error-summary-heading:has-text("${selectAdditionalDocuments_content.errorTitle}")`,
      ),
      1,
    );
    await commonHelpers.checkVisibleAndPresent(
      page.locator(
        `.error-summary-list:has-text("${selectAdditionalDocuments_content.errorMessage}")`,
      ),
      1,
    );
  },
};

export default selectAdditionalDocuments;
