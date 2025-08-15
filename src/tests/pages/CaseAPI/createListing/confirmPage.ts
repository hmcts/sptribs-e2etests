import { AxeUtils } from "@hmcts/playwright-common";
import { expect, Page } from "@playwright/test";
import confirmContent from "../../../fixtures/content/CaseAPI/createListing/confirm_content.ts";
import commonHelpers from "../../../helpers/commonHelpers.ts";

type ConfirmPage = {
  checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
    subjectName: string,
    DSSSubmitted: boolean,
  ): Promise<void>;
  continueOn(page: Page): Promise<void>;
};

const confirmPage: ConfirmPage = {
  async checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
    subjectName: string,
    DSSSubmitted: boolean,
  ): Promise<void> {
    await page.waitForSelector(
      `.heading-h1:text-is("${confirmContent.pageHint}")`,
    );
    await Promise.all([
      expect(page.locator("markdown > h2")).toContainText(`${subjectName}`),
      expect(page.locator("markdown > p").nth(0)).toContainText(
        confirmContent.caseReference + caseNumber,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(`markdown > h1:text-is("${confirmContent.pageTitle}")`),
        1,
      ),
    ]);

    if (DSSSubmitted) {
      await commonHelpers.checkVisibleAndPresent(
        page.locator(`markdown > h2:has-text("${confirmContent.textOnPage2}")`),
        1,
      );
    } else {
      await commonHelpers.checkVisibleAndPresent(
        page.locator(`markdown > h2:has-text("${confirmContent.textOnPage}")`),
        1,
      );
    }

    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  },

  async continueOn(page: Page): Promise<void> {
    await page
      .getByRole("button", { name: "Close and Return to case details" })
      .click();
    await page.waitForSelector(`h2:text-is("History")`);
    await page.waitForSelector(`.mat-tab-label-content:text-is("Tasks")`);
  },
};

export default confirmPage;
