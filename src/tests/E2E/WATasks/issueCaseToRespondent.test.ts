import { test } from "@playwright/test";
import createCase from "../../journeys/WA/createCase.ts";
import buildCase from "../../journeys/WA/buildCase.ts";
import task from "../../journeys/WA/task.ts";
import editCase from "../../journeys/WA/editCase.ts";
import issueToRespondent from "../../journeys/WA/issueToRespondent.ts";
import commonHelpers from "../../helpers/commonHelpers.ts";
import events_content from "../../fixtures/content/CaseAPI/events_content.ts";
import closeCase from "../../journeys/WA/closeCase.ts";
import myWorkPage from "../../pages/WA/myWorkPage.ts";
import referCaseToJudge from "../../journeys/WA/referCaseToJudge.ts";
import referCaseToLegalOfficer from "../../journeys/WA/referCaseToLegalOfficer.ts";

const taskName = "Issue Case To Respondent";
const priority = " low ";
const assignedUser = "sptribswa regionalhearingcentreadmin";
const userRole = "waRegionalHearingCentreAdmin";
const numberOfDays = 2;
const event = "Case: Issue to respondent";
const stateBeforeCompletion = "Case Status:  Case management";
const stateAfterCompletion = "Case Status:  Case management";
// const nextTriggeredTaskToCleanUp = "Issue Case To Respondent";

test.describe("Issue case to respondent task tests @CaseAPI", (): void => {
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
    await commonHelpers.chooseEventFromDropdown(page, events_content.editCase);
    await editCase.editCase(
      page,
      false,
      "Submitted",
      "Assessment",
      "Other",
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
      caseNumber01,
    );
    await task.seeTask(page, userRole, false, "Vet New Case Documents");
    await task.initiateTask(
      page,
      userRole,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber01,
      "Vet New Case Documents",
      " low ",
      assignedUser,
      5,
      "Case: Build case",
      "Case Status:  Submitted",
    );
    await buildCase.buildCase(page, false, caseNumber01);
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber01,
      "Case Status:  Case management",
    );
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

  test("Task is completable via next steps link - assign to me", async ({
    page,
  }) => {
    let caseNumber02: any;
    caseNumber02 = await createCase.createCase(
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
    console.log(`Case Number : ${caseNumber02}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.editCase);
    await editCase.editCase(
      page,
      false,
      "Submitted",
      "Assessment",
      "Other",
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
      caseNumber02,
    );
    await task.seeTask(page, userRole, false, "Vet New Case Documents");
    await task.initiateTask(
      page,
      userRole,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber02,
      "Vet New Case Documents",
      " low ",
      assignedUser,
      5,
      "Case: Build case",
      "Case Status:  Submitted",
    );
    await buildCase.buildCase(page, false, caseNumber02);
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber02,
      "Case Status:  Case management",
    );
    await task.seeTask(page, userRole, false, taskName);
    await task.initiateTask(
      page,
      userRole,
      "Link: Assign Task to Me",
      false,
      caseNumber02,
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
      ["Subject"],
      caseNumber02,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber02,
      stateAfterCompletion,
    );
  });

  test("Task is completed via event dropdown", async ({ page }) => {
    let caseNumber03: any;
    caseNumber03 = await createCase.createCase(
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
    console.log(`Case Number : ${caseNumber03}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.editCase);
    await editCase.editCase(
      page,
      false,
      "Submitted",
      "Assessment",
      "Other",
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
      caseNumber03,
    );
    await task.seeTask(page, userRole, false, "Vet New Case Documents");
    await task.initiateTask(
      page,
      userRole,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber03,
      "Vet New Case Documents",
      " low ",
      assignedUser,
      5,
      "Case: Build case",
      "Case Status:  Submitted",
    );
    await buildCase.buildCase(page, false, caseNumber03);
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber03,
      "Case Status:  Case management",
    );
    await task.seeTask(page, userRole, false, taskName);
    await task.initiateTask(
      page,
      userRole,
      "Event DropDown",
      false,
      caseNumber03,
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
      ["Representative"],
      caseNumber03,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber03,
      stateAfterCompletion,
    );
  });

  test("Task is completable via next steps link - Issue a case to a respondent", async ({
    page,
  }) => {
    let caseNumber04: any;
    caseNumber04 = await createCase.createCase(
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
    console.log(`Case Number : ${caseNumber04}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.editCase);
    await editCase.editCase(
      page,
      false,
      "Submitted",
      "Assessment",
      "Other",
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
      caseNumber04,
    );
    await task.seeTask(page, userRole, false, "Vet New Case Documents");
    await task.initiateTask(
      page,
      userRole,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber04,
      "Vet New Case Documents",
      " low ",
      assignedUser,
      5,
      "Case: Build case",
      "Case Status:  Submitted",
    );
    await buildCase.buildCase(page, false, caseNumber04);
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber04,
      "Case Status:  Case management",
    );
    await task.seeTask(page, userRole, false, taskName);
    await task.initiateTask(
      page,
      userRole,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber04,
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
      ["Respondent"],
      caseNumber04,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber04,
      stateAfterCompletion,
    );
  });

  test("Task is completable via next steps link - Issue a case to an applicant", async ({
    page,
  }) => {
    let caseNumber05: any;
    caseNumber05 = await createCase.createCase(
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
    console.log(`Case Number : ${caseNumber05}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.editCase);
    await editCase.editCase(
      page,
      false,
      "Submitted",
      "Assessment",
      "Other",
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
      caseNumber05,
    );
    await task.seeTask(page, userRole, false, "Vet New Case Documents");
    await task.initiateTask(
      page,
      userRole,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber05,
      "Vet New Case Documents",
      " low ",
      assignedUser,
      5,
      "Case: Build case",
      "Case Status:  Submitted",
    );
    await buildCase.buildCase(page, false, caseNumber05);
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber05,
      "Case Status:  Case management",
    );
    await task.seeTask(page, userRole, false, taskName);
    await task.initiateTask(
      page,
      userRole,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber05,
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
      ["Applicant"],
      caseNumber05,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber05,
      stateAfterCompletion,
    );
  });

  test("Task is cancellable through close case", async ({ page }) => {
    let caseNumber06: any;
    caseNumber06 = await createCase.createCase(
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
    console.log(`Case Number : ${caseNumber06}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.editCase);
    await editCase.editCase(
      page,
      false,
      "Submitted",
      "Assessment",
      "Other",
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
      caseNumber06,
    );
    await task.seeTask(page, userRole, false, "Vet New Case Documents");
    await task.initiateTask(
      page,
      userRole,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber06,
      "Vet New Case Documents",
      " low ",
      assignedUser,
      5,
      "Case: Build case",
      "Case Status:  Submitted",
    );
    await buildCase.buildCase(page, false, caseNumber06);
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber06,
      "Case Status:  Case management",
    );
    await task.seeTask(page, userRole, false, taskName);
    await myWorkPage.clickAssignAndGoToTask(page);
    await commonHelpers.chooseEventFromDropdown(page, events_content.closeCase);
    await closeCase.closeCase(
      page,
      false,
      false,
      "caseWithdrawn",
      true,
      null,
      null,
      caseNumber06,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber06,
      "Case Status:  Case closed",
    );
  });

  test("Task is cancellable through refer to judge", async ({ page }) => {
    let caseNumber07: any;
    caseNumber07 = await createCase.createCase(
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
    console.log(`Case Number : ${caseNumber07}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.editCase);
    await editCase.editCase(
      page,
      false,
      "Submitted",
      "Assessment",
      "Other",
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
      caseNumber07,
    );
    await task.seeTask(page, userRole, false, "Vet New Case Documents");
    await task.initiateTask(
      page,
      userRole,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber07,
      "Vet New Case Documents",
      " low ",
      assignedUser,
      5,
      "Case: Build case",
      "Case Status:  Submitted",
    );
    await buildCase.buildCase(page, false, caseNumber07);
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber07,
      "Case Status:  Case management",
    );
    await task.seeTask(page, userRole, false, taskName);
    await myWorkPage.clickAssignAndGoToTask(page);
    await commonHelpers.chooseEventFromDropdown(page, "Refer case to judge");
    await referCaseToJudge.referCaseToJudge(
      page,
      false,
      "Listing directions",
      false,
      caseNumber07,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber07,
      stateAfterCompletion,
    );
  });

  test("Task is cancellable through refer to legal officer", async ({
    page,
  }) => {
    let caseNumber08: any;
    caseNumber08 = await createCase.createCase(
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
    console.log(`Case Number : ${caseNumber08}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.editCase);
    await editCase.editCase(
      page,
      false,
      "Submitted",
      "Assessment",
      "Other",
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
      caseNumber08,
    );
    await task.seeTask(page, userRole, false, "Vet New Case Documents");
    await task.initiateTask(
      page,
      userRole,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber08,
      "Vet New Case Documents",
      " low ",
      assignedUser,
      5,
      "Case: Build case",
      "Case Status:  Submitted",
    );
    await buildCase.buildCase(page, false, caseNumber08);
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber08,
      "Case Status:  Case management",
    );
    await task.seeTask(page, userRole, false, taskName);
    await myWorkPage.clickAssignAndGoToTask(page);
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Refer case to legal officer",
    );
    await referCaseToLegalOfficer.referCaseToLegalOfficer(
      page,
      false,
      "Listing directions",
      false,
      caseNumber08,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber08,
      stateAfterCompletion,
    );
  });
  test("Issue to respondent : Error messaging", async ({ page }) => {
    let caseNumber09: any;
    caseNumber09 = await createCase.createCase(
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
    console.log(`Case Number : ${caseNumber09}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.editCase);
    await editCase.editCase(
      page,
      false,
      "Submitted",
      "Assessment",
      "Other",
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
      caseNumber09,
    );
    await task.seeTask(page, userRole, false, "Vet New Case Documents");
    await task.initiateTask(
      page,
      userRole,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber09,
      "Vet New Case Documents",
      " low ",
      assignedUser,
      5,
      "Case: Build case",
      "Case Status:  Submitted",
    );
    await buildCase.buildCase(page, false, caseNumber09);
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber09,
      "Case Status:  Case management",
    );
    await task.seeTask(page, userRole, false, taskName);
    await task.initiateTask(
      page,
      userRole,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber09,
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
      true,
      ["Subject"],
      caseNumber09,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber09,
      stateAfterCompletion,
    );
  });
});

test("Task completion: Accessibility test / Issue Case to Respondent : Accessibility test @accessibilityCaseAPI", async ({
  page,
}) => {
  let caseNumber010: any;
  caseNumber010 = await createCase.createCase(
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
  console.log(`Case Number : ${caseNumber010}`);
  await commonHelpers.chooseEventFromDropdown(page, events_content.editCase);
  await editCase.editCase(
    page,
    false,
    "Submitted",
    "Assessment",
    "Other",
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
    caseNumber010,
  );
  await task.seeTask(page, userRole, false, "Vet New Case Documents");
  await task.initiateTask(
    page,
    userRole,
    "Link: Assign Task to Me and Go To Task",
    false,
    caseNumber010,
    "Vet New Case Documents",
    " low ",
    assignedUser,
    5,
    "Case: Build case",
    "Case Status:  Submitted",
  );
  await buildCase.buildCase(page, false, caseNumber010);
  await task.checkCompletedTask(
    page,
    false,
    taskName,
    caseNumber010,
    "Case Status:  Case management",
  );
  await task.seeTask(page, userRole, true, taskName);
  await task.initiateTask(
    page,
    userRole,
    "Link: Assign Task to Me and Go To Task",
    true,
    caseNumber010,
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
    true,
    false,
    ["Subject", "Representative", "Respondent", "Applicant"],
    caseNumber010,
  );
  await task.checkCompletedTask(
    page,
    true,
    taskName,
    caseNumber010,
    stateAfterCompletion,
  );
});
