import { expect, Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import confirm_content from "../../../fixtures/content/CaseAPI/buildCase/confirm_content.ts";
import commonHelpers from "../../../helpers/commonHelpers.ts";

type ConfirmPage = {
  checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    caseNumber: string,
  ): Promise<void>;
  continueOn(page: Page): Promise<string>;
};

const buildCaseConfirmPage: ConfirmPage = {
  async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    caseNumber: string,
  ): Promise<void> {
    await expect(page.locator(".heading-h1")).toHaveText(
      confirm_content.pageTitle,
    );
    await expect(page.locator("markdown > h1")).toContainText(
      confirm_content.subTitle1
    );
    await expect(page.locator("markdown > h3")).toContainText(
      confirm_content.caseReference + caseNumber
    );
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async continueOn(page: Page): Promise<string> {
    await page
      .getByRole("button", { name: "Close and Return to case details" }).click();
    return commonHelpers.getTimestamp();
  },
};

export default buildCaseConfirmPage;
