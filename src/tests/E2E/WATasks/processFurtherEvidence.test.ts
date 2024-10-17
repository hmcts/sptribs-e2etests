import { test } from "@playwright/test";
import createCase from "../../journeys/WA/createCase.ts";
import buildCase from "../../journeys/WA/buildCase.ts";
import task from "../../journeys/WA/task.ts";
import commonHelpers from "../../helpers/commonHelpers.ts";
import events_content from "../../fixtures/content/CaseAPI/events_content.ts";
import documentManagementUpload from "../../journeys/WA/documentManagementUpload.ts";
import contactParties from "../../journeys/WA/contactParties.ts";
import createFEApplication from "../../journeys/WA/DSSCreateCase/createCase.ts";
import editCase from "../../journeys/WA/editCase.ts";
import updateCaseJourney from "../../journeys/DSSUpdateCase/updateCase.ts";
import config from "../../config.ts";
import closeCase from "../../journeys/WA/closeCase.ts";
import referCaseToJudge from "../../journeys/WA/referCaseToJudge.ts";
import referCaseToLegalOfficer from "../../journeys/WA/referCaseToLegalOfficer.ts";
import documentManagementAmend from "../../journeys/WA/documentManagementAmend.ts";
import myWorkPage from "../../pages/WA/myWorkPage.ts";

const taskName = "Process further evidence";
const priority = " low ";
const assignedUserAdmin = "sptribswa hearingcentreadmin";
const userRoleAdmin = "waHearingCentreAdmin";
const numberOfDays = 7;
const eventContactParties = "Case: Contact parties";
const eventEditCase = "Case: Edit case";
const eventUploadDoc = "Document management: Upload";
const eventRefer = "Refer case to judge";
const eventReferLO = "Refer case to legal officer";
const eventAmendDoc = "Document management: Amend";
const DSSSubmittedState = "DSS-Submitted";
const submittedState = "Submitted";
const caseManagementState = "Case management";
const caseClosedState = "Case closed";
const taskRemoved = " Issue Case To Respondent ";

test.describe("Process further evidence task tests @CaseAPI", (): void => {
  test("Task is completable via next steps link - assign to me and go to task", async ({
    page,
  }) => {
    let caseNumber01: any;
    caseNumber01 = await createFEApplication.createFEApplication(
      page,
      false,
      "demoCitizen",
      false,
      false,
      true,
      false,
      true,
      false,
      false,
      false,
    );
    console.log(`Case Number : ${caseNumber01}`);
    await commonHelpers.signOutAndGoToCase(
      page,
      userRoleAdmin,
      config.CaseAPIBaseURL,
      caseNumber01,
    );
    await task.removeTask(page, "Register New Case");
    await page.goto(
      await commonHelpers.generateUrl(config.CaseAPIBaseURL, caseNumber01),
    );
    await commonHelpers.chooseEventFromDropdown(page, eventEditCase);
    await editCase.editCase(
      page,
      false,
      "DSS Submitted",
      "Assessment",
      "Medical Re-opening",
      false,
      false,
      "Email",
      true,
      "2001",
      "London",
      true,
      false,
      true,
      false,
      false,
      caseNumber01,
    );
    await task.removeTask(page, "Vet New Case Documents");
    await page.goto(
      await commonHelpers.generateUrl(config.CaseAPIBaseURL, caseNumber01),
    );
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber01);
    await task.removeTask(page, " Issue Case To Respondent ");
    await page.locator(`a:text-is(" Sign out ")`).click();
    await page.waitForLoadState("domcontentloaded");
    await updateCaseJourney.updateCase(
      page,
      false,
      false,
      caseNumber01,
      true,
      false,
      false,
      false,
      false,
    );
    await task.seeTask(page, userRoleAdmin, false, taskName);
    await task.initiateTask(
      page,
      userRoleAdmin,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber01,
      taskName,
      priority,
      assignedUserAdmin,
      numberOfDays,
      eventContactParties,
      caseManagementState,
    );
    await contactParties.contactParties(
      page,
      userRoleAdmin,
      false,
      false,
      caseNumber01,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber01,
      caseManagementState,
    );
  });

  test.only("Task is completable via next steps link - assign to me", async ({
    page,
  }) => {
    let caseNumber02: any;
    caseNumber02 = await createFEApplication.createFEApplication(
      page,
      false,
      "demoCitizen",
      false,
      false,
      true,
      false,
      true,
      false,
      false,
      false,
    );
    console.log(`Case Number : ${caseNumber02}`);
    await commonHelpers.signOutAndGoToCase(
      page,
      userRoleAdmin,
      config.CaseAPIBaseURL,
      caseNumber02,
    );
    // await task.removeTask(page, "Register New Case");
    // await page.goto(
    //   await commonHelpers.generateUrl(config.CaseAPIBaseURL, caseNumber02),
    // );
    await commonHelpers.chooseEventFromDropdown(page, eventEditCase);
    await editCase.editCase(
      page,
      false,
      "DSS Submitted",
      "Assessment",
      "Medical Re-opening",
      false,
      false,
      "Email",
      true,
      "2001",
      "London",
      true,
      false,
      true,
      false,
      false,
      caseNumber02,
    );
    // await task.removeTask(page, "Vet New Case Documents");
    // await page.goto(
    //   await commonHelpers.generateUrl(config.CaseAPIBaseURL, caseNumber02),
    // );
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber02);
    // await task.removeTask(page, " Issue Case To Respondent ");
    await page.pause();
    const caseNumberDigits = caseNumber02.replace(/\D/g, "");
    await page.goto(
      `${config.CaseAPIBaseURL}/case-details/${caseNumberDigits}/tasks`,
    );
    while (true) {
      const assignToMe = page.locator(`a:text-is("Assign to me")`);
      let visibleCount = 0;
      for (let i = 0; i < (await assignToMe.count()); i++) {
        if (await assignToMe.nth(i).isVisible()) {
          visibleCount++;
        }
      }
      if (visibleCount === 3) {
        break;
      }
      await page.waitForTimeout(5000);
      await page.goto(
        `${config.CaseAPIBaseURL}/case-details/${caseNumberDigits}/tasks`,
      );
    }
    while (await page.locator(`a:text-is("Assign to me")`).isVisible()) {
      await page.locator(`a:text-is("Assign to me")`).first().click();
      await page.waitForSelector(`a:text-is("Mark as done")`);
      await page.locator(`a:text-is("Mark as done")`).first().click();
      await page.waitForSelector(`h1:text-is("Mark the task as done")`);
      await page.locator("#submit-button").click();
    }

    await page.locator(`a:text-is(" Sign out ")`).click();
    await page.waitForLoadState("domcontentloaded");
    await updateCaseJourney.updateCase(
      page,
      false,
      false,
      caseNumber02,
      true,
      true,
      false,
      false,
      false,
    );
    await task.seeTask(page, userRoleAdmin, false, taskName);
    await task.initiateTask(
      page,
      userRoleAdmin,
      "Link: Assign Task to Me",
      false,
      caseNumber02,
      taskName,
      priority,
      assignedUserAdmin,
      numberOfDays,
      eventEditCase,
      caseManagementState,
    );
    await editCase.editCase(
      page,
      false,
      "Case Management",
      "Eligibility",
      "Paragraph 26",
      false,
      false,
      "Email",
      false,
      "1996",
      "Scotland",
      false,
      false,
      true,
      false,
      false,
      caseNumber02,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber02,
      caseManagementState,
    );
  });

  test("Task is completed via event dropdown", async ({ page }) => {
    let caseNumber03: any;
    caseNumber03 = await createFEApplication.createFEApplication(
      page,
      false,
      "demoCitizen",
      false,
      false,
      true,
      false,
      true,
      false,
      false,
      false,
    );
    console.log(`Case Number : ${caseNumber03}`);
    await commonHelpers.signOutAndGoToCase(
      page,
      userRoleAdmin,
      config.CaseAPIBaseURL,
      caseNumber03,
    );
    await task.removeTask(page, "Register New Case");
    await page.goto(
      await commonHelpers.generateUrl(config.CaseAPIBaseURL, caseNumber03),
    );
    await commonHelpers.chooseEventFromDropdown(page, eventEditCase);
    await editCase.editCase(
      page,
      false,
      "DSS Submitted",
      "Assessment",
      "Medical Re-opening",
      false,
      false,
      "Email",
      true,
      "2001",
      "London",
      true,
      false,
      true,
      false,
      false,
      caseNumber03,
    );
    await task.removeTask(page, "Vet New Case Documents");
    await page.goto(
      await commonHelpers.generateUrl(config.CaseAPIBaseURL, caseNumber03),
    );
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber03);
    await task.removeTask(page, " Issue Case To Respondent ");
    await page.locator(`a:text-is(" Sign out ")`).click();
    await page.waitForLoadState("domcontentloaded");
    await updateCaseJourney.updateCase(
      page,
      true,
      false,
      caseNumber03,
      true,
      true,
      false,
      false,
      false,
    );
    await task.seeTask(page, userRoleAdmin, false, taskName);
    await task.initiateTask(
      page,
      userRoleAdmin,
      "Event DropDown",
      false,
      caseNumber03,
      taskName,
      priority,
      assignedUserAdmin,
      numberOfDays,
      eventRefer,
      caseManagementState,
    );
    await referCaseToJudge.referCaseToJudge(
      page,
      false,
      "Other",
      false,
      caseNumber03,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber03,
      caseManagementState,
    );
  });

  test("Update case - Refer to legal officer", async ({ page }) => {
    let caseNumber04: any;
    caseNumber04 = await createFEApplication.createFEApplication(
      page,
      false,
      "demoCitizen",
      false,
      false,
      true,
      false,
      true,
      false,
      false,
      false,
    );
    console.log(`Case Number : ${caseNumber04}`);
    await commonHelpers.signOutAndGoToCase(
      page,
      userRoleAdmin,
      config.CaseAPIBaseURL,
      caseNumber04,
    );
    await task.removeTask(page, "Register New Case");
    await page.goto(
      await commonHelpers.generateUrl(config.CaseAPIBaseURL, caseNumber04),
    );
    await commonHelpers.chooseEventFromDropdown(page, eventEditCase);
    await editCase.editCase(
      page,
      false,
      "DSS Submitted",
      "Assessment",
      "Medical Re-opening",
      false,
      false,
      "Email",
      true,
      "2001",
      "London",
      true,
      false,
      true,
      false,
      false,
      caseNumber04,
    );
    await task.removeTask(page, "Vet New Case Documents");
    await page.goto(
      await commonHelpers.generateUrl(config.CaseAPIBaseURL, caseNumber04),
    );
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber04);
    await task.removeTask(page, " Issue Case To Respondent ");
    await page.locator(`a:text-is(" Sign out ")`).click();
    await page.waitForLoadState("domcontentloaded");
    await updateCaseJourney.updateCase(
      page,
      false,
      false,
      caseNumber04,
      true,
      true,
      true,
      false,
      false,
    );
    await task.seeTask(page, userRoleAdmin, false, taskName);
    await task.initiateTask(
      page,
      userRoleAdmin,
      "Link: Assign Task to Me and Go To Task",
      false,
      caseNumber04,
      taskName,
      priority,
      assignedUserAdmin,
      numberOfDays,
      eventReferLO,
      caseManagementState,
    );
    await referCaseToLegalOfficer.referCaseToLegalOfficer(
      page,
      false,
      "Other",
      false,
      caseNumber04,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber04,
      caseManagementState,
    );
  });

  test("Task is cancellable through close case ", async ({ page }) => {
    let caseNumber05: any;
    caseNumber05 = await createFEApplication.createFEApplication(
      page,
      false,
      "demoCitizen",
      false,
      false,
      true,
      false,
      true,
      false,
      false,
      false,
    );
    console.log(`Case Number : ${caseNumber05}`);
    await commonHelpers.signOutAndGoToCase(
      page,
      userRoleAdmin,
      config.CaseAPIBaseURL,
      caseNumber05,
    );
    await task.removeTask(page, "Register New Case");
    await page.goto(
      await commonHelpers.generateUrl(config.CaseAPIBaseURL, caseNumber05),
    );
    await commonHelpers.chooseEventFromDropdown(page, eventEditCase);
    await editCase.editCase(
      page,
      false,
      "DSS Submitted",
      "Assessment",
      "Medical Re-opening",
      false,
      false,
      "Email",
      true,
      "2001",
      "London",
      true,
      false,
      true,
      false,
      false,
      caseNumber05,
    );
    await task.removeTask(page, "Vet New Case Documents");
    await page.goto(
      await commonHelpers.generateUrl(config.CaseAPIBaseURL, caseNumber05),
    );
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber05);
    await task.removeTask(page, " Issue Case To Respondent ");
    await page.locator(`a:text-is(" Sign out ")`).click();
    await page.waitForLoadState("domcontentloaded");
    await updateCaseJourney.updateCase(
      page,
      false,
      false,
      caseNumber05,
      false,
      true,
      false,
      false,
      false,
    );
    await task.seeTask(page, userRoleAdmin, false, taskName);
    await myWorkPage.clickAssignAndGoToTask(page);
    await commonHelpers.chooseEventFromDropdown(page, events_content.closeCase);
    await closeCase.closeCase(
      page,
      false,
      false,
      "deathOfAppellant",
      true,
      null,
      null,
      caseNumber05,
    );
    await task.checkCompletedTask(
      page,
      false,
      taskName,
      caseNumber05,
      caseClosedState,
    );
  });
});

test("Task completion: Accessibility test @accessibilityCaseAPI", async ({
  page,
}) => {
  let caseNumber06: any;
  caseNumber06 = await createCase.createCase(
    page,
    userRoleAdmin,
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
  await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
  await buildCase.buildCase(page, false, caseNumber06);
  await task.removeTask(page, taskRemoved);
  await commonHelpers.chooseEventFromDropdown(page, eventUploadDoc);
  await documentManagementUpload.documentManagementUpload(
    page,
    false,
    false,
    false,
    caseNumber06,
  );
  await task.seeTask(page, userRoleAdmin, true, taskName);
  await task.initiateTask(
    page,
    userRoleAdmin,
    "Link: Assign Task to Me and Go To Task",
    true,
    caseNumber06,
    taskName,
    priority,
    assignedUserAdmin,
    numberOfDays,
    eventAmendDoc,
    caseManagementState,
  );
  await documentManagementAmend.documentManagementAmend(
    page,
    true,
    caseNumber06,
  );
  await task.checkCompletedTask(
    page,
    true,
    taskName,
    caseNumber06,
    caseManagementState,
  );
});
