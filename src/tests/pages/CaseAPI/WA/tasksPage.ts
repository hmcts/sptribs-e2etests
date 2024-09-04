import { expect, Page } from "@playwright/test";
import commonHelpers from "../../helpers/commonHelpers.ts";
import axeTest from "../../helpers/accessibilityTestHelper.ts";
import tasks_content from "../../fixtures/content/CaseAPI/myWork/tasks_content.ts";
import subjectDetailsContent from "../../fixtures/content/DSSCreateCase/SubjectDetails_content.ts";


type TasksPage = {
  myTasksTab: string;
  caseTasksTab: string;

  checkPageLoads(page: Page, accessibilityTest: boolean, caseNumber: string, taskName: string, numberOfDays: number, taskPriority: string, assignedUser: string, completedByEvent: string): Promise<void>;
  completedTaskNotVisible(page: Page, caseNumber: string, taskName: string): Promise<void>;
};

const tasksPage: TasksPage = {
  myTasksTab: `a:text-is(" My tasks ")`,
  caseTasksTab: `.mat-tab-label-content:text-is("Tasks")`,


  async checkPageLoads(page: Page, accessibilityTest: boolean, caseNumber: string, taskName: string, numberOfDays: number, taskPriority: string,  assignedUser:string, completedByEvent:string): Promise<void> {
      const dueDate = await commonHelpers.futureDate(numberOfDays);

    await page.waitForSelector(`p.govuk-body > strong:text-is("${taskName}")`);
     await Promise.all([
       commonHelpers.checkVisibleAndPresent(
         page.locator(`h2:text-is("${tasks_content.title}")`),
         1,
       ),
       commonHelpers.checkVisibleAndPresent(
         page.locator(`markdown > h3:text-is("${subjectDetailsContent.name}")`),
         1,
       ),
       expect(page.locator("markdown > p").nth(0)).toContainText(
         tasks_content.caseReference + caseNumber,
       ),
       commonHelpers.checkVisibleAndPresent(
         page.locator(`p.govuk-body > strong:text-is("${taskName}")`),
         1,
       ),
       ...Array.from({ length: 5 }, (_, index: number) => {
         const textOnPage: ArrayConstructor = (tasks_content as any)[
           `textOnPage${index + 1}`
         ];
         return commonHelpers.checkVisibleAndPresent(
           page.locator(
             `span.row-padding:text-is("${textOnPage}")`,
           ),
           1,
         );
       }),
       expect(page.locator("exui-priority-field > strong")).toHaveText(taskPriority),
       expect(page.locator(`dd > span:text-is("${dueDate}")`)).toBeVisible(),
       expect(page.locator(`.govuk-summary-list__value:text-is("${assignedUser}")`)).toBeVisible(),
       expect(page.locator("#action_complete")).toHaveText(tasks_content.link1),
       expect(page.locator("#action_unclaim")).toHaveText(tasks_content.link2),
       expect(page.locator(`a:text-is("${completedByEvent}")`)).toBeVisible(),
     ]);


 


    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async completedTaskNotVisible(page: Page, caseNumber: string, taskName: string): Promise<void> {
    await page.locator(this.caseTasksTab).click()
    await page.waitForURL(/.*\/tasks$/);

    await Promise.all([
      commonHelpers.checkVisibleAndPresent(
        page.locator(`h2:text-is("${tasks_content.title}")`),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(`markdown > h3:text-is("${subjectDetailsContent.name}")`),
        1,
      ),
      expect(page.locator("markdown > p").nth(0)).toContainText(
        tasks_content.caseReference + caseNumber,
      ),
      
    ]);
    expect(page.locator(`p.govuk-body > strong:text-is("${taskName}")`)).not.toBeVisible()
  }

};

export default tasksPage;
