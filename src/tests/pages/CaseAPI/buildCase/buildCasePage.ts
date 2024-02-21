import { expect, Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import buildCase_content from "../../../fixtures/content/CaseAPI/buildCase/buildCase_content.ts";

type BuildCasePage = {
  checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    caseNumber: string,
  ): Promise<void>;
  continueOn(page: Page): Promise<void>;
};

const builtCasePage: BuildCasePage = {
  async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    caseNumber: string,
  ): Promise<void> {
    await expect(page.locator(".govuk-caption-l")).toHaveText(
      buildCase_content.pageHint,
    );
    await expect(page.locator(".govuk-heading-l")).toHaveText(
      buildCase_content.pageTitle,
    );
    await expect(page.locator("markdown > h3")).toContainText(
      buildCase_content.caseReference + caseNumber,
    );
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async continueOn(page: Page): Promise<void> {
    await page.getByRole("button", { name: "Submit" }).click();
  },
};

export default builtCasePage;
