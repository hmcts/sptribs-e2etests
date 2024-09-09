import { Page } from "@playwright/test";
import { UserRole } from "../../config.ts";
import caseAPILoginPage from "../../pages/CaseAPI/caseList/caseAPILoginPage.ts";
import myWorkPage from "../../pages/WA/myWorkPage.ts";
import commonHelpers, {
  taskCompletionMethod,
} from "../../helpers/commonHelpers.ts";
import tasksPage from "../../pages/WA/tasksPage.ts";
import statePage from "../../pages/WA/statePage.ts";

type Task = {
  seeTask(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
    taskName: string,
  ): Promise<any>;
  initiateTask(
    page: Page,
    user: UserRole,
    taskCompletionMethod: taskCompletionMethod,
    accessibilityTest: boolean,
    caseNumber: string,
    taskName: string,
    priority: string,
    assignedUser: string,
    numberOfDays: number,
    event: any,
    stateBeforeCompletion: string,
  ): Promise<void>;
  checkCompletedTask(
    page: Page,
    accessibilityTest: boolean,
    taskName: string,
    caseNumber: string,
    stateAfterCompletion: string,
  ): Promise<any>;
  cleanUpTestData(
    page: Page,
    tabName: string,
    nextTriggeredTaskToCleanUp: string,
    taskName: string,
  ): Promise<void>;
};

const task: Task = {
  async seeTask(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
    taskName: string,
  ): Promise<any> {
    await page.locator(`a:text-is(" Sign out ")`).click();
    await page.waitForLoadState("domcontentloaded");
    await caseAPILoginPage.SignInUser(page, user);
    await myWorkPage.checkPageLoads(page, accessibilityTest);
    await myWorkPage.selectAvailableTasks(page);
    await myWorkPage.seeTask(page, taskName);
  },

  async initiateTask(
    page: Page,
    user: UserRole,
    taskCompletionMethod: taskCompletionMethod,
    accessibilityTest: boolean,
    caseNumber: string,
    taskName: string,
    priority: string,
    assignedUser: string,
    numberOfDays: number,
    event: any,
    stateBeforeCompletion: string,
  ): Promise<void> {
    switch (taskCompletionMethod) {
      default: //"Link: Assign Task to Me and Go To Task"
        await myWorkPage.clickAssignAndGoToTask(page);
        await tasksPage.checkPageLoads(
          page,
          accessibilityTest,
          caseNumber,
          taskName,
          numberOfDays,
          priority,
          assignedUser,
          event,
        );
        await statePage.checkStateBeforeTaskCompletion(
          page,
          accessibilityTest,
          caseNumber,
          stateBeforeCompletion,
        );
        await tasksPage.navigateToTaskTab(page, event);
        await tasksPage.clickTaskLink(page, event);
        break;
      case "Link: Assign Task to Me":
        await myWorkPage.clickAssignToMe(page);
        await myWorkPage.navigateToTaskPage(page, taskName);
        await tasksPage.checkPageLoads(
          page,
          accessibilityTest,
          caseNumber,
          taskName,
          numberOfDays,
          priority,
          assignedUser,
          event,
        );
        await statePage.checkStateBeforeTaskCompletion(
          page,
          accessibilityTest,
          caseNumber,
          stateBeforeCompletion,
        );
        await tasksPage.navigateToTaskTab(page, event);
        await tasksPage.clickTaskLink(page, event);
        break;
      case "Event DropDown":
        await myWorkPage.clickAssignAndGoToTask(page);
        await tasksPage.checkPageLoads(
          page,
          accessibilityTest,
          caseNumber,
          taskName,
          numberOfDays,
          priority,
          assignedUser,
          event,
        );
        await statePage.checkStateBeforeTaskCompletion(
          page,
          accessibilityTest,
          caseNumber,
          stateBeforeCompletion,
        );
        await tasksPage.navigateToTaskTab(page, event);
        await tasksPage.chooseEventFromDropdown(page, event);
        break;
    }
  },
  async checkCompletedTask(
    page: Page,
    accessibilityTest: boolean,
    taskName: string,
    caseNumber: string,
    stateAfterCompletion: string,
  ): Promise<any> {
    await statePage.checkStateAfterTaskCompletion(page, stateAfterCompletion);
    await tasksPage.completedTaskNotVisible(page, caseNumber, taskName);
    console.log("task completion successful");
  },

  async cleanUpTestData(
    page,
    tabName,
    nextTriggeredTaskToCleanUp,
    taskName,
  ): Promise<void> {
    type tabName = "Available tasks" | "My tasks";
    switch (tabName) {
      default: //available tasks
        await myWorkPage.navigateToMyWorkPage(page);
        await myWorkPage.selectAvailableTasks(page);
        await myWorkPage.seeTask(page, nextTriggeredTaskToCleanUp);
        await myWorkPage.clickAssignAndGoToTask(page);
        await tasksPage.markAsDone(page, nextTriggeredTaskToCleanUp);
        break;
      case "My tasks":
        await myWorkPage.navigateToMyWorkPage(page);
        await myWorkPage.navigateToTaskPage(page, taskName);
        await tasksPage.markAsDone(page, taskName);
        break;
    }
  },
};

export default task;
