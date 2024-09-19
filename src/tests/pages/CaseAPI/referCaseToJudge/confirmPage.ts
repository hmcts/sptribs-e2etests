import { expect, Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import confirmContent from "../../../fixtures/content/CaseAPI/referCaseToJudge/confirm_content.ts";
import caseSubjectDetailsObject_content from "../../../fixtures/content/CaseAPI/createCase/caseSubjectDetailsObject_content.ts";

type ConfirmPage = {
  checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
  ): Promise<void>;
  continueOn(page: Page): Promise<void>;
};

const confirmPage: ConfirmPage = {
  async checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page.waitForSelector(
      `markdown > h1:text-is("${confirmContent.pageTitle}")`,
    );
    await Promise.all([
      expect(page.locator(".heading-h1")).toHaveText(confirmContent.pageHint),
      expect(page.locator("markdown > h3")).toContainText(
        caseSubjectDetailsObject_content.name,
      ),
      expect(page.locator("markdown > p").nth(0)).toContainText(
        confirmContent.caseReference + caseNumber,
      ),
    ]);
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async continueOn(page: Page): Promise<void> {
    await page
      .getByRole("button", { name: "Close and Return to case details" })
      .click();
    await page.waitForSelector(`h2:text-is("History")`);
  },
};

export default confirmPage;
