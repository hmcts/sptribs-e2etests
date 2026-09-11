import { test } from "@playwright/test";
import config from "../config.ts";
import waUsers_content from "../fixtures/content/waUsers_content.ts";
import taskNames_content from "../fixtures/content/taskNames_content.ts";
import events_content from "../fixtures/content/CaseAPI/events_content.ts";
import contactParties from "../journeys/CaseAPI/contactParties.ts";
import commonHelpers from "../helpers/commonHelpers.ts";
import editCaseDSS from "../journeys/CaseAPI/editCaseDSS.ts";
import buildCase from "../journeys/CaseAPI/buildCase.ts";
import task from "../journeys/CaseAPI/task.ts";
import createDraft from "../journeys/CaseAPI/createDraft.ts";
import sendOrder from "../journeys/CaseAPI/sendOrder.ts";
import createFEApplication from "../journeys/DSSCreateCase/createCase.ts";
import createCase from "../journeys/CaseAPI/createCase.ts";
import testDataCleanUp from "../helpers/testDataCleanUp.ts";
import createBundle from "../journeys/CaseAPI/createBundle.ts";

test.describe("Citizen dashboard tests. @CaseAPI", () => {
  test("Check for redundant test data", async ({ page }) => {
    test.setTimeout(10 * 60 * 1000);
    await testDataCleanUp(page, waUsers_content.userRoleAdmin);
  });

  test("Citizen views dashboard with a document, bundle and order", async ({ page }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber732 = await createCase.createCase(
      page,
      waUsers_content.userRoleAdmin,
      false,
      "Assessment",
      "Other",
      true,
      true,
      "Email",
      subjectName,
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
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber732, subjectName);
    await task.removeTask(
      page,
      caseNumber732,
      taskNames_content.issueCaseToRespondentTask,
      subjectName,
      waUsers_content.userRoleAdmin,
    );
    await commonHelpers.chooseEventFromDropdown(page, "Case: Contact parties");
    await contactParties.contactParties(
      page,
      waUsers_content.userRoleAdmin,
      false,
      false,
      caseNumber732,
      subjectName,
      false,
    );
    await commonHelpers.chooseEventFromDropdown(page, "Orders: Create draft");
    await createDraft.createDraft(
      page,
      false,
      false,
      "CIC8 - ME Joint Instruction",
      caseNumber732,
      subjectName,
    );
    await commonHelpers.chooseEventFromDropdown(page, "Orders: Send order");
    await sendOrder.sendOrder(
      page,
      caseNumber732,
      "DraftOrder",
      false,
      false,
      false,
      true,
      "7",
      subjectName,
    );
    await commonHelpers.chooseEventFromDropdown(page, "Bundle: Create a bundle");
    await createBundle.createBundle(
      page,
      caseNumber732,
      subjectName,
    );
  });
});