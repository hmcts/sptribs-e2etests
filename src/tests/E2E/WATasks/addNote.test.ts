import { test } from "@playwright/test";
import createFEApplication from "../../journeys/WA/DSSCreateCase/createCase.ts";
import createCase from "../../journeys/WA/createCase.ts";
import buildCase from "../../journeys/WA/buildCase.ts";
import events_content from "../../fixtures/content/CaseAPI/events_content.ts";
import commonHelpers from "../../helpers/commonHelpers.ts";
import addNote from "../../journeys/WA/addNote.ts";
import config from "../../config.ts";
import task from "../../journeys/WA/task.ts";
import hearingOptions from "../../journeys/WA/hearingOptions.ts";
import createListing from "../../journeys/WA/createListing.ts";
import createSummary from "../../journeys/WA/createSummary.ts";
import closeCase from "../../journeys/WA/closeCase.ts";
import createEditStay from "../../journeys/WA/createEditStay.ts";

const userRoleAdmin = "waHearingCentreAdmin";
const taskRemovedNewCase = "Register New Case";
const taskRemovedIssueCase = " Issue Case To Respondent ";

test.describe("Case-API Add note tests. @CaseAPI", () => {
  if (!config.skipDSSCreateTests) {
    test("Add a note to a DSS-submitted case. @crossbrowserCaseAPI", async ({
      page,
    }): Promise<void> => {
      let caseNumber01: any;
      caseNumber01 = await createFEApplication.createFEApplication(
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
      console.log(`Case Number : ${caseNumber01}`);
      await commonHelpers.signOutAndGoToCase(
        page,
        userRoleAdmin,
        config.CaseAPIBaseURL,
        caseNumber01,
      );
      await addNote.addNote(page, false, caseNumber01);
      await task.removeTask(page, taskRemovedNewCase);
    });
  }

  test("Add a note to a Submitted case case. @crossbrowserCaseAPI", async ({
    page,
  }): Promise<void> => {
    let caseNumber01: any;
    caseNumber01 = await createCase.createCase(
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
    console.log(`Case Number : ${caseNumber01}`);
    await addNote.addNote(page, false, caseNumber01);
  });

  test("Add a note to a Case management case case. @crossbrowserCaseAPI", async ({
    page,
  }): Promise<void> => {
    let caseNumber03: any;
    caseNumber03 = await createCase.createCase(
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
    console.log(`Case Number : ${caseNumber03}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber03);
    await task.removeTask(page, taskRemovedIssueCase);
    await addNote.addNote(page, false, caseNumber03);
  });

  test.only("Add a note to a Ready to list case case. @crossbrowserCaseAPI", async ({
    page,
  }): Promise<void> => {
    let casenumber04: any;
    casenumber04 = await createCase.createCase(
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
    console.log(`Case Number : ${casenumber04}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, casenumber04);
    await task.removeTask(page, taskRemovedIssueCase);
    await hearingOptions.hearingOptions(
      page,
      false,
      true,
      null,
      false,
      false,
      "Face to Face",
      false,
      false,
      casenumber04,
    );
    await addNote.addNote(page, false, casenumber04);
  });

  test("Add a note to a awaiting hearing case case. @crossbrowserCaseAPI", async ({
    page,
  }): Promise<void> => {
    const caseNumber05 = await createCase.createCase(
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
    console.log(`Case Number : ${caseNumber05}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber05);
    await task.removeTask(page, taskRemovedIssueCase);
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Hearings: Create listing",
    );
    await createListing.createListing(
      page,
      false,
      true,
      "1-London",
      "Case management",
      "Face to Face",
      "Morning",
      false,
      "East London Tribunal Hearing Centre-2 Clove Crescent, East India Dock London",
      false,
      caseNumber05,
    );
    await addNote.addNote(page, false, caseNumber05);
  });

  test.skip("Add a note to a awaiting outcome case. @crossbrowserCaseAPI", async ({
    page,
  }): Promise<void> => {
    const caseNumber06 = await createCase.createCase(
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
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Hearings: Create listing",
    );
    await createListing.createListing(
      page,
      false,
      true,
      "1-London",
      "Case management",
      "Face to Face",
      "Morning",
      false,
      "East London Tribunal Hearing Centre-2 Clove Crescent, East India Dock London",
      false,
      caseNumber06,
    );
    await createSummary.createSummary(
      page,
      false,
      "Case management",
      "Face to Face",
      "Morning",
      false,
      "East London Tribunal Hearing Centre-2 Clove Crescent, East India Dock London",
      "East London Tribunal Hearing Centre",
      "Allowed",
      null,
      true,
      false,
      false,
      caseNumber06,
    );
    await addNote.addNote(page, false, caseNumber06);
    await task.removeTask(page, taskRemovedIssueCase);
  });

  test("Add a note to a case closed case. @crossbrowserCaseAPI", async ({
    page,
  }): Promise<void> => {
    const caseNumber07 = await createCase.createCase(
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
    console.log(`Case Number : ${caseNumber07}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber07);
    await commonHelpers.chooseEventFromDropdown(page, events_content.closeCase);
    await closeCase.closeCase(
      page,
      false,
      false,
      "caseWithdrawn",
      false,
      null,
      null,
      caseNumber07,
    );
    await addNote.addNote(page, false, caseNumber07);
  });
});

test("Accessibility test - Add a note to a case stayed case. @crossbrowserCaseAPI", async ({
  page,
}): Promise<void> => {
  const caseNumber08 = await createCase.createCase(
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
  console.log(`Case Number : ${caseNumber08}`);
  await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
  await buildCase.buildCase(page, false, caseNumber08);
  await createEditStay.createEditStay(
    page,
    true,
    false,
    "awaitingACourtJudgement",
    false,
    caseNumber08,
  );
  await addNote.addNote(page, true, caseNumber08);
  await task.removeTask(page, taskRemovedIssueCase);
});
