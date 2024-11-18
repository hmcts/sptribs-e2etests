import { expect, Page } from "@playwright/test";
import config from "../../config.ts";
import commonHelpers from "../../helpers/commonHelpers.ts";
import axeTest from "../../helpers/accessibilityTestHelper.ts";
import tasks_content from "../../fixtures/content/CaseAPI/myWork/tasks_content.ts";
import waUsers_content from "../../fixtures/content/waUsers_content.ts";

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
    subjectName: string,
  ): Promise<any>;
  completedTaskNotVisible(
    page: Page,
    caseNumber: string,
    taskName: string,
    subjectName: string,
  ): Promise<void>;
  clickTaskLink(page: Page, event: any, taskName: string): Promise<void>;
  cancelTask(page: Page, nextTriggeredTaskCleanUp: string): Promise<void>;
  markTasksAsDone(
    page: Page,
    caseNumber: string,
    numberOfTasks: number,
    taskNames: string[],
  ): Promise<void>;
  navigateToTaskTab(page: Page, event: any, caseNumber: string): Promise<void>;
  chooseEventFromDropdown(page: Page, event: any): Promise<void>;
  dataCleanUpMarkAsDone(page: Page, selector: any): Promise<void>;
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
    subjectName: string,
  ): Promise<any> {
    const dueDate = await commonHelpers.futureDate(numberOfDays);
    const specificTask = page.locator("exui-case-task", {
      hasText: `${taskName}`,
    });
    await page.waitForSelector(`p.govuk-body > strong:text-is("${taskName}")`);
    await Promise.all([
      commonHelpers.checkVisibleAndPresent(
        page.locator(`h2:text-is("${tasks_content.title}")`),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(`markdown > h3:text-is("${subjectName}")`),
        1,
      ),
      expect(page.locator("markdown > p").nth(0)).toContainText(
        tasks_content.caseReference + caseNumber,
      ),
      commonHelpers.checkVisibleAndPresent(specificTask, 1),
      ...Array.from({ length: 3 }, (_, index: number) => {
        const textOnPage: ArrayConstructor = (tasks_content as any)[
          `textOnPage${index + 1}`
        ];
        return commonHelpers.checkVisibleAndPresent(
          specificTask.locator(`span.row-padding:text-is("${textOnPage}")`),
          1,
        );
      }),
      expect(
        specificTask.locator(
          `.govuk-summary-list__value:text-is("${assignedUser}")`,
        ),
      ).toBeVisible(),
      expect(specificTask.locator("#action_complete")).toHaveText(
        tasks_content.link1,
      ),
      expect(specificTask.locator("#action_unclaim")).toHaveText(
        tasks_content.link2,
      ),
      expect(specificTask.locator(`p > a:text-is("${event}")`)).toBeVisible(),
    ]);
    if (user !== waUsers_content.userRoleJudge) {
      expect(
        specificTask.locator(
          `span.row-padding:text-is("${tasks_content.dueDate}")`,
        ),
      );
      await expect(
        specificTask.locator(`dd > span:text-is("${dueDate}")`),
      ).toBeVisible();
    } else {
      expect(
        specificTask.locator(
          `span.row-padding:text-is("${tasks_content.taskCreated}")`,
        ),
      );
      await expect(
        specificTask.locator(
          `dd > span:text-is("${await commonHelpers.todayDateFull()}")`,
        ),
      ).toBeVisible();
      await expect(specificTask.locator("#action_cancel")).toHaveText(
        tasks_content.link3,
      );
      await expect(specificTask.locator("#action_reassign")).toHaveText(
        tasks_content.link4,
      );
    }

    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async completedTaskNotVisible(
    page: Page,
    caseNumber: string,
    taskName: string,
    subjectName: string,

    maxRetries: number = 3,
    delay: number = 30000,
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
        page.locator(`markdown > h3:text-is("${subjectName}")`),
        1,
      ),
      expect(page.locator("markdown > p").nth(0)).toContainText(
        tasks_content.caseReference + caseNumber,
      ),
    ]);
    // Initial visibility check before starting the loop
    let isTaskVisible = await page
      .locator(`p.govuk-body > strong:text-is("${taskName}")`)
      .isVisible();

    if (!isTaskVisible) {
      return;
    }

    // Retry if the task is still visible, up to maxRetries
    for (let i = 0; i < maxRetries; i++) {
      await page.goto(
        `${config.CaseAPIBaseURL}/case-details/${caseNumberDigits}/tasks`,
      );
      await page.waitForURL(/.*\/tasks$/);
      isTaskVisible = await page
        .locator(`p.govuk-body > strong:text-is("${taskName}")`)
        .isVisible();
      if (!isTaskVisible) {
        return;
      }
      await page.waitForTimeout(delay);
    }
  },

  async navigateToTaskTab(
    page: Page,
    event: any,
    caseNumber: string,
  ): Promise<void> {
    const caseNumberDigits = caseNumber.replace(/\D/g, "");
    await page.goto(
      `${config.CaseAPIBaseURL}/case-details/${caseNumberDigits}/tasks`,
    );
    await page.waitForSelector(`a:text-is("${event}")`, { state: "attached" });
  },

  async clickTaskLink(page: Page, event: any, taskName: string): Promise<void> {
    const specificTask = page.locator("exui-case-task", {
      hasText: `${taskName}`,
    });
    await specificTask.locator(`a:text-is("${event}")`).click();
  },

  async chooseEventFromDropdown(page: Page, event: any): Promise<void> {
    await page.selectOption("#next-step", event);
    await expect(page.getByRole("button", { name: "Go" })).toBeEnabled();
    await page.getByRole("button", { name: "Go" }).click();
  },

  async cancelTask(page, nextTriggeredTaskCleanUp): Promise<void> {
    const specificTask = page.locator("exui-case-task", {
      hasText: `${nextTriggeredTaskCleanUp}`,
    });

    await page.waitForSelector(
      `p strong:text-is("${nextTriggeredTaskCleanUp}")`,
    );
    await specificTask.locator("#action_cancel").click();
    await page.waitForSelector(`h1:text-is("Cancel a task")`);
    await page.locator("#submit-button").click();
    await page.waitForSelector(`h2:text-is("Active tasks")`);
    await expect(
      page.locator(`p strong:text-is("${nextTriggeredTaskCleanUp}")`),
    ).not.toBeVisible();
  },

  async markTasksAsDone(
    page: Page,
    caseNumber: string,
    numberOfTasks: number,
    taskNames: string[],
  ): Promise<void> {
    const caseNumberDigits = caseNumber.replace(/\D/g, "");
    await page.goto(
      `${config.CaseAPIBaseURL}/case-details/${caseNumberDigits}/tasks`,
    );
    while (true) {
      await page.waitForSelector('h2:text-is("Active tasks")');
      let allTasksVisible = true;
      for (const taskName of taskNames) {
        const isTaskVisible = await page
          .locator(`p > strong:text-is("${taskName}")`)
          .isVisible();
        if (!isTaskVisible) {
          allTasksVisible = false;
          break;
        }
      }
      if (allTasksVisible) {
        break;
      } else {
        await page.waitForTimeout(10000);
        await page.goto(
          `${config.CaseAPIBaseURL}/case-details/${caseNumberDigits}/tasks`,
        );
        await page.waitForLoadState("domcontentloaded");
      }
    }
    for (let i = 0; i < numberOfTasks; i++) {
      await page.waitForSelector('h2:text-is("Active tasks")');
      await page.locator(`a:text-is("Assign to me")`).first().isVisible();
      await page.locator(`a:text-is("Assign to me")`).first().click();
      await page.waitForSelector(`a:text-is("Mark as done")`);
      await page.locator(`a:text-is("Mark as done")`).first().click();
      await page.waitForSelector(`h1:text-is("Mark the task as done")`);
      await page.locator("#submit-button").click();
    }
  },

  async dataCleanUpMarkAsDone(page: Page, selector: any): Promise<void> {
    await selector.first().locator(`button:has-text("Manage")`).click();
    await page.waitForSelector("#action_cancel");
    await page.locator("#action_complete").click();
    await page.waitForSelector(`button:text-is("Cancel task")`);
    await page.locator("#submit-button").click();
    await page.waitForTimeout(5000);
  },
};

export default tasksPage;
