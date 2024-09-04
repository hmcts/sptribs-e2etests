import { Page } from "@playwright/test";
import { UserRole } from "../../config.ts";
import createFEApplication from "../DSSCreateCase/createCase.ts";
import caseAPILoginPage from "../../pages/CaseAPI/caseList/caseAPILoginPage.ts";
import myWorkPage from "../../pages/WA/myWorkPage.ts";
import commonHelpers, {taskCompletionMethod} from "../../helpers/commonHelpers.ts";
import tasksPage from "../../pages/WA/tasksPage.ts";
import statePage from "../../pages/WA/statePage.ts";
import editCase from "./editCase.ts";

type RegisterNewCase = {
  seeTask(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
  ): Promise<void>;
  completeTask(
    page: Page,
    user: UserRole,
    taskCompletionMethod: taskCompletionMethod,
    accessibilityTest: boolean,
  ): Promise<void>;
};
const taskName = "Register New Case"
const priority = " low "
const assignedUser = "sptribswa regionalhearingcentreadmin"
const numberOfDays = 5
const completedByEvent = "Case: Edit Case"
const stateBeforeCompletion = "Case Status:  DSS-Submitted"
const stateAfterCompletion = "Case Status:  Submitted"


const registerNewCase: RegisterNewCase = {
  
  async seeTask(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
  ): Promise<void> {
    let caseNumber: any;
    caseNumber = await createFEApplication.createFEApplication(
      page,
      false,
      "demoCitizen",
      true,
      true,
      false,
      false,
      true,
      false,
      false,
      false,
    );
    console.log(`Case Number : ${caseNumber}`);
    await page.locator(`a:text-is(" Sign out ")`).click();
    await page.waitForLoadState("domcontentloaded");
    await caseAPILoginPage.SignInUser(page, user);
    await myWorkPage.checkPageLoads(page, accessibilityTest);
    await myWorkPage.selectAvailableTasks(page);
    await myWorkPage.seeTask(page, taskName);
    //handle task if task list spills over onto page 2 
    return caseNumber;
  },

  async completeTask(
    page: Page,
    user: UserRole,
    taskCompletionMethod: taskCompletionMethod,
    accessibilityTest: boolean,
  ): Promise<void> {

    let caseNumber: any;
    caseNumber = await this.seeTask(page, user, accessibilityTest);

    switch (taskCompletionMethod) {
      default: //"Link: Assign Task to Me and Go To Task"
      await myWorkPage.clickAssignAndGoToTask(page);
      await tasksPage.checkPageLoads(page, accessibilityTest, caseNumber, taskName, numberOfDays, priority,  assignedUser, completedByEvent);
      await statePage.checkStateBeforeTaskCompletion(page, accessibilityTest, caseNumber, stateBeforeCompletion);

      
        break;
    case "Link: Assign Task to Me":
      await myWorkPage.clickAssignToMe(page);
      await myWorkPage.navigateToTaskPage(page, taskName);
      await tasksPage.checkPageLoads(page, accessibilityTest, caseNumber, taskName, numberOfDays, priority,  assignedUser, completedByEvent);
      await statePage.checkStateBeforeTaskCompletion(page, accessibilityTest, caseNumber, stateBeforeCompletion);


        break;
    case "Event DropDown":
      await myWorkPage.clickAssignAndGoToTask(page);
      await tasksPage.checkPageLoads(page, accessibilityTest, caseNumber, taskName, numberOfDays, priority,  assignedUser, completedByEvent);
      await statePage.checkStateBeforeTaskCompletion(page, accessibilityTest, caseNumber, stateBeforeCompletion);
      await commonHelpers.chooseEventFromDropdown(
        page,
        "Case: Edit case",
      );
        break;

    };

    await editCase.editCase(
      page,
      //user,
      false,
      "DSS Submitted",
      "Assessment",
      "Fatal",
        true,
        true,
        "Email",
        true,
        "1996",
        "Scotland",
        true,
        false,
        true,
        false,
        false,
        caseNumber,
    );
    await statePage.checkStateAfterTaskCompletion(page, stateAfterCompletion);
    await tasksPage.completedTaskNotVisible(page, caseNumber, taskName)
    console.log("task completion successful")

  },
};

export default registerNewCase;
