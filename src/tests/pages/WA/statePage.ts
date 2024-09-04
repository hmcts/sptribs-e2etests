import { expect, Page } from "@playwright/test";
import commonHelpers from "../../helpers/commonHelpers.ts";
import axeTest from "../../helpers/accessibilityTestHelper.ts";
import state_content from "../../fixtures/content/CaseAPI/myWork/state_content.ts";
import subjectDetailsContent from "../../fixtures/content/DSSCreateCase/SubjectDetails_content.ts";

type StatePage = {
  caseStateTab: string;
  caseTasksTab: string;
  checkStateBeforeTaskCompletion(
    page: Page,
    accessibilityTest: boolean,
    caseNumber: string,
    stateBeforeCompletion: string,
  ): Promise<void>;
  checkStateAfterTaskCompletion(
    page: Page,
    stateAfterCompletion: string,
  ): Promise<void>;
};

const statePage: StatePage = {
  caseStateTab: `.mat-tab-label-content:text-is("State")`,
  caseTasksTab: `.mat-tab-label-content:text-is("Tasks")`,

  async checkStateBeforeTaskCompletion(
    page: Page,
    accessibilityTest: boolean,
    caseNumber: string,
    stateBeforeCompletion: string,
  ): Promise<void> {
    await page.locator(this.caseStateTab).click();
    await page.waitForURL(/.*\#State$/);

    await Promise.all([
      commonHelpers.checkVisibleAndPresent(
        page.locator(`markdown > h3:text-is("${subjectDetailsContent.name}")`),
        1,
      ),
      expect(page.locator("markdown > p").nth(0)).toContainText(
        state_content.caseReference + caseNumber,
      ),
    ]);

    expect(page.locator("h4")).toHaveText(stateBeforeCompletion);
    await page.locator(this.caseTasksTab).click();
    await page.waitForURL(/.*\/tasks$/);

    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async checkStateAfterTaskCompletion(
    page: Page,
    stateAfterCompletion: string,
  ): Promise<void> {
    await page.locator(this.caseStateTab).click();
    await page.waitForURL(/.*\#State$/);
    expect(page.locator("h4")).toHaveText(stateAfterCompletion);
  },
};

export default statePage;
