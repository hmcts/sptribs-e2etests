import { expect, Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import confirmContent from "../../../fixtures/content/CaseAPI/createListing/confirm_content.ts";
import commonHelpers from "../../../helpers/commonHelpers.ts";
import caseSubjectDetailsObject_content from "../../../fixtures/content/CaseAPI/createCase/caseSubjectDetailsObject_content.ts";

type ConfirmPage = {
  checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
    subjectName: string,
  ): Promise<void>;
  continueOn(page: Page): Promise<void>;
};

const confirmPage: ConfirmPage = {
  async checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
    subjectName: string,
  ): Promise<void> {
    await page.waitForSelector(
      `.heading-h1:text-is("${confirmContent.pageHint}")`,
    );
    await Promise.all([
      expect(page.locator("markdown > h3")).toContainText(`${subjectName}`),
      expect(page.locator("markdown > p").nth(0)).toContainText(
        confirmContent.caseReference + caseNumber,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(`markdown > h1:text-is("${confirmContent.pageTitle}")`),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(`markdown > h2:has-text("${confirmContent.textOnPage}")`),
        1,
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
  },
};

export default confirmPage;
