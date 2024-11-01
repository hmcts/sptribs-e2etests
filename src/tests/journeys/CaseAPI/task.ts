import { Page } from "@playwright/test";
import { UserRole } from "../../config.ts";
import caseAPILoginPage from "../../pages/CaseAPI/caseList/caseAPILoginPage.ts";
import myWorkPage from "../../pages/WA/myWorkPage.ts";
import {
  allEvents,
  taskCompletionMethod,
} from "../../helpers/commonHelpers.ts";
import tasksPage from "../../pages/WA/tasksPage.ts";
import historyPage from "../../pages/WA/historyPage.ts";

type Task = {
  seeTask(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
    taskName: string,
    subjectName: string,
  ): Promise<any>;
  initiateTask(
    page: Page,
    user: UserRole,
    taskCompletionMethod: taskCompletionMethod,
    accessibilityTest: boolean,
    caseNumber: string,
    taskName: string,
    priority: any,
    assignedUser: string,
    numberOfDays: number,
    event: allEvents,
    stateBeforeCompletion: string,
    subjectName: string,
  ): Promise<void>;
  checkCompletedTask(
    page: Page,
    accessibilityTest: boolean,
    taskName: string,
    caseNumber: string,
    stateAfterCompletion: string,
    checkCompletedTask: string,
  ): Promise<any>;
  removeTask(
    page: Page,
    taskRemoved: string,
    subjectName: string,
  ): Promise<void>;
};

const task: Task = {
  async seeTask(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
    taskName: string,
    subjectName: string,
  ): Promise<any> {
    await page.locator(`a:text-is(" Sign out ")`).click();
    await page.waitForLoadState("domcontentloaded");
    await caseAPILoginPage.SignInUser(page, user);
    await myWorkPage.checkPageLoads(page, accessibilityTest, user);
    await myWorkPage.selectAvailableTasks(page);
    await myWorkPage.seeTask(page, taskName, subjectName);
  },

  async initiateTask(
    page: Page,
    user: UserRole,
    taskCompletionMethod: taskCompletionMethod,
    accessibilityTest: boolean,
    caseNumber: string,
    taskName: string,
    priority: any,
    assignedUser: string,
    numberOfDays: number,
    event: any,
    stateBeforeCompletion: string,
    subjectName: string,
  ): Promise<void> {
    switch (taskCompletionMethod) {
      default: //"Link: Assign Task to Me and Go To Task"
        await myWorkPage.clickAssignAndGoToTask(page, subjectName);
        await tasksPage.checkPageLoads(
          page,
          accessibilityTest,
          caseNumber,
          taskName,
          numberOfDays,
          priority,
          assignedUser,
          event,
          user,
          subjectName,
        );
        await historyPage.navigateToHistoryTab(page);
        await historyPage.checkStateBeforeTaskCompletion(
          page,
          accessibilityTest,
          stateBeforeCompletion,
        );
        await tasksPage.navigateToTaskTab(page, event, caseNumber);
        await tasksPage.clickTaskLink(page, event, taskName);
        break;
      case "Link: Assign Task to Me":
        await myWorkPage.clickAssignToMe(page, subjectName);
        await myWorkPage.navigateToTaskPage(page, taskName, subjectName);
        await tasksPage.checkPageLoads(
          page,
          accessibilityTest,
          caseNumber,
          taskName,
          numberOfDays,
          priority,
          assignedUser,
          event,
          user,
          subjectName,
        );
        await historyPage.navigateToHistoryTab(page);
        await historyPage.checkStateBeforeTaskCompletion(
          page,
          accessibilityTest,
          stateBeforeCompletion,
        );
        await tasksPage.navigateToTaskTab(page, event, caseNumber);
        await tasksPage.clickTaskLink(page, event, taskName);
        break;
      case "Event DropDown":
        await myWorkPage.clickAssignAndGoToTask(page, subjectName);
        await tasksPage.checkPageLoads(
          page,
          accessibilityTest,
          caseNumber,
          taskName,
          numberOfDays,
          priority,
          assignedUser,
          event,
          user,
          subjectName,
        );
        await historyPage.navigateToHistoryTab(page);
        await historyPage.checkStateBeforeTaskCompletion(
          page,
          accessibilityTest,
          stateBeforeCompletion,
        );
        await tasksPage.navigateToTaskTab(page, event, caseNumber);
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
    subjectName: string,
  ): Promise<any> {
    await historyPage.navigateToHistoryTab(page);
    await historyPage.checkStateAfterTaskCompletion(page, stateAfterCompletion);
    await tasksPage.completedTaskNotVisible(
      page,
      caseNumber,
      taskName,
      subjectName,
    );
  },

  async removeTask(page, taskRemoved, subjectName): Promise<void> {
    await myWorkPage.navigateToMyWorkPage(page);
    await myWorkPage.selectAvailableTasks(page);
    await myWorkPage.seeTask(page, taskRemoved, subjectName);
    await myWorkPage.clickAssignAndGoToTask(page, subjectName);
    await tasksPage.markAsDone(page, taskRemoved);
  },
};

export default task;
