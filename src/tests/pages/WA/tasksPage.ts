import { expect, Page } from "@playwright/test";
import config from "../../config.ts";
import commonHelpers from "../../helpers/commonHelpers.ts";
import axeTest from "../../helpers/accessibilityTestHelper.ts";
import tasks_content from "../../fixtures/content/CaseAPI/myWork/tasks_content.ts";
import subjectDetailsContent from "../../fixtures/content/DSSCreateCase/SubjectDetails_content.ts";

type TasksPage = {
  myTasksTab: string;
  caseTasksTab: string;

  checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    caseNumber: string,
    taskName: string,
    numberOfDays: number,
    taskPriority: string,
    assignedUser: string,
    event: any,
    user: string,
  ): Promise<any>;
  completedTaskNotVisible(
    page: Page,
    caseNumber: string,
    taskName: string,
  ): Promise<void>;
  clickTaskLink(page: Page, event: any): Promise<void>;
  markAsDone(page: Page, nextTriggeredTaskCleanUp: string): Promise<void>;
  navigateToTaskTab(page: Page, event: any): Promise<void>;
  chooseEventFromDropdown(page: Page, event: any): Promise<void>;
};

const tasksPage: TasksPage = {
  myTasksTab: `a:text-is(" My tasks ")`,
  caseTasksTab: `.mat-tab-label-content:text-is("Tasks")`,

  async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    caseNumber: string,
    taskName: string,
    numberOfDays: number,
    taskPriority: string,
    assignedUser: string,
    event: any,
    user: string,
  ): Promise<any> {
    const dueDate = await commonHelpers.futureDate(numberOfDays);
    await page.waitForSelector(`p.govuk-body > strong:text-is("${taskName}")`);

    //check for more than one task if cron job hasn't cleared previous task
    const assignedToElements = await page.locator(`span:text-is("Assigned to")`).count();
    while (assignedToElements > 1) {
      console.log(`Found more than 1 task. Reloading page...`);
      await page.reload();
      const assignedToElements = await page.locator(`span:text-is("Assigned to")`).count();
      if (assignedToElements <=1) {
        break;
      }
    }

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
      ...Array.from({ length: 3 }, (_, index: number) => {
        const textOnPage: ArrayConstructor = (tasks_content as any)[
          `textOnPage${index + 1}`
        ];
        return commonHelpers.checkVisibleAndPresent(
          page.locator(`span.row-padding:text-is("${textOnPage}")`),
          1,
        );
      }),
      expect(
        page.locator(`.govuk-summary-list__value:text-is("${assignedUser}")`),
      ).toBeVisible(),
      expect(page.locator("#action_complete")).toHaveText(tasks_content.link1),
      expect(page.locator("#action_unclaim")).toHaveText(tasks_content.link2),
      expect(page.locator(`p > a:text-is("${event}")`)).toBeVisible(),
    ]);
    if (user !== "waPrincipalJudge") {
      expect(
        page.locator(`span.row-padding:text-is("${tasks_content.priority}")`),
      );
      expect(page.locator("exui-priority-field > strong")).toHaveText(
        taskPriority,
      );
      expect(
        page.locator(`span.row-padding:text-is("${tasks_content.dueDate}")`),
      );
      expect(page.locator(`dd > span:text-is("${dueDate}")`)).toBeVisible();
    } else {
      expect(
        page.locator(
          `span.row-padding:text-is("${tasks_content.taskCreated}")`,
        ),
      );
      expect(
        page.locator(
          `dd > span:text-is("${await commonHelpers.todayDateFull()}")`,
        ),
      ).toBeVisible();
      expect(page.locator("#action_cancel")).toHaveText(tasks_content.link3);
      expect(page.locator("#action_reassign")).toHaveText(tasks_content.link4);
    }

    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async completedTaskNotVisible(
    page: Page,
    caseNumber: string,
    taskName: string,
  ): Promise<void> {
    const caseNumberDigits = caseNumber.replace(/\D/g, "");
    await page.goto(
      `${config.CaseAPIBaseURL}/case-details/${caseNumberDigits}/tasks`,
    );
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
    expect(
      page.locator(`p.govuk-body > strong:text-is("${taskName}")`),
    ).not.toBeVisible();
  },

  async navigateToTaskTab(page: Page, event: any): Promise<void> {
    await page.locator(this.caseTasksTab).click();
    await page.waitForSelector(`a:text-is("${event}")`, { state: "attached" });
  },

  async clickTaskLink(page: Page, event: any): Promise<void> {
    await page.locator(`a:text-is("${event}")`).click();
  },

  async chooseEventFromDropdown(page: Page, event: any): Promise<void> {
    await page.selectOption("#next-step", event);
    await expect(page.getByRole("button", { name: "Go" })).toBeEnabled();
    await page.getByRole("button", { name: "Go" }).click();
  },

  async markAsDone(page, nextTriggeredTaskCleanUp): Promise<void> {
    await page.waitForSelector(
      `p strong:text-is("${nextTriggeredTaskCleanUp}")`,
    );
    await page.locator("#action_complete").click();
    await page.waitForSelector(`h1:text-is("Mark the task as done")`);
    await page.locator("#submit-button").click();
    await page.waitForSelector(`h2:text-is("Active tasks")`);
    expect(
      page.locator(`p strong:text-is("${nextTriggeredTaskCleanUp}")`),
    ).not.toBeVisible();
    console.log("test data cleaned up");
  },
};

export default tasksPage;
