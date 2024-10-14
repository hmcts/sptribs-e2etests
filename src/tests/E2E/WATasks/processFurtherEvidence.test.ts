import { test } from "@playwright/test";
import createCase from "../../journeys/WA/createCase.ts";
import buildCase from "../../journeys/WA/buildCase.ts";
import task from "../../journeys/WA/task.ts";
import commonHelpers from "../../helpers/commonHelpers.ts";
import events_content from "../../fixtures/content/CaseAPI/events_content.ts";
import issueToRespondent from "../../journeys/WA/issueToRespondent.ts";

const taskName = "";
const priority = " low ";
const assignedUser = "sptribswa hearingcentreadmin";
const userRole = "waHearingCentreAdmin";
const numberOfDays = 2;
const event = "Case: Issue to respondent";
const stateBeforeCompletion = "Case management";
const stateAfterCompletion = "Case management";
const caseClosedState = "Case closed";

test.describe("Process further evidence task tests @CaseAPI", (): void => {
  test("Task is completable via next steps link - assign to me and go to task", async ({
    page,
  }) => {
    let caseNumber01: any;
    caseNumber01 = await createCase.createCase(
      page,
      userRole,
      false,
      "Assessment",
      "Other",
      true,
      true,
      "Email",
      true,
      false,
      "1996",
      "Scotland",
      true,
      true,
      true,
      false,
      true,
      false,
    );
    console.log(`Case Number : ${caseNumber01}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber01);
    await task.seeTask(page, userRole, false, taskName);
    await task.initiateTask(
      page,
      userRole,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber01,
      taskName,
      priority,
      assignedUser,
      numberOfDays,
      event,
      stateBeforeCompletion,
    );
    await issueToRespondent.issueToRespondent(
      page,
      userRole,
      false,
      false,
      ["Subject", "Representative", "Respondent", "Applicant"],
      caseNumber01,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber01,
      stateAfterCompletion,
    );
  });
});
