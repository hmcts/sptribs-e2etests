import { expect, Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import caseSubjectDetailsObject_content from "../../../fixtures/content/CaseAPI/createCase/caseSubjectDetailsObject_content.ts";
import commonHelpers, { parties } from "../../../helpers/commonHelpers.ts";
import submit_content from "../../../fixtures/content/CaseAPI/issueToRespondent/submit_content.ts";
import confirm_content from "../../../fixtures/content/CaseAPI/issueToRespondent/confirm_content.ts";
import notifyOtherParties_content from "../../../fixtures/content/CaseAPI/issueToRespondent/notifyOtherParties_content.ts";

type ConfirmPage = {
  checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    caseNumber: string,
    recipients: parties[],
  ): Promise<void>;
  continueOn(page: Page): Promise<void>;
};

const confirmPage: ConfirmPage = {
  async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    caseNumber: string,
    recipients: parties[],
  ): Promise<void> {
    await Promise.all([
      expect(page.locator(".heading-h1")).toHaveText(submit_content.pageHint),
      expect(page.locator("markdown > h3")).toContainText(
        caseSubjectDetailsObject_content.name,
      ),
      expect(page.locator("markdown > p").nth(0)).toContainText(
        notifyOtherParties_content.caseReference + caseNumber,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(`markdown > h2:text-is("${confirm_content.textOnPage1}")`),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `markdown > h2:has-text("${confirm_content.textOnPage2}")`,
        ),
        1,
      ),
      ...Array.from({ length: recipients.length }, (_, index) => {
        return commonHelpers.checkVisibleAndPresent(
          page.locator(`markdown > h2:has-text("${recipients[index]}")`),
          1,
        );
      }),
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
