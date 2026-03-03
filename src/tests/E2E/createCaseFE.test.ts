import { test } from "@playwright/test";
import config from "../config.ts";
import taskNames_content from "../fixtures/content/taskNames_content.ts";
import waUsers_content from "../fixtures/content/waUsers_content.ts";
import commonHelpers from "../helpers/commonHelpers.ts";
import task from "../journeys/CaseAPI/task.ts";
import createFEApplication from "../journeys/DSSCreateCase/createCase.ts";

test.describe("DSS Create case tests.", (): void => {
  test("Create an application with all details, a qualified representative, additional information, no PCQ, Out of time @DSSCreate", async ({
    page,
  }) => {
    const outOfTimeDate = new Date();
    outOfTimeDate.setDate(outOfTimeDate.getDate() - 91);
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber701 = await createFEApplication.createFEApplication(
      page,
      false,
      waUsers_content.userRoleCitizen,
      true,
      true,
      "X1234567889",
      true,
      false,
      true,
      false,
      false,
      false,
      subjectName,
      outOfTimeDate,
    );
    await commonHelpers.signOutAndGoToCase(
      page,
      waUsers_content.userRoleAdmin,
      config.CaseAPIBaseURL,
      caseNumber701,
    );
    await task.removeTask(
      page,
      taskNames_content.registerNewCaseTask,
      subjectName,
      waUsers_content.userRoleAdmin,
    );
  });

  test("Create an application with all details, a qualified representative, additional information, no PCQ, and submit - Cy @DSSCreate", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber702 = await createFEApplication.createFEApplication(
      page,
      true,
      waUsers_content.userRoleCitizen,
      true,
      true,
      "X1234567890",
      true,
      false,
      true,
      false,
      false,
      false,
      subjectName,
    );
    await commonHelpers.signOutAndGoToCase(
      page,
      waUsers_content.userRoleAdmin,
      config.CaseAPIBaseURL,
      caseNumber702,
    );
    await task.removeTask(
      page,
      taskNames_content.registerNewCaseTask,
      subjectName,
      waUsers_content.userRoleAdmin,
    );
  });

  test("Create an application with no representative, additional information, no PCQ, and submit. @DSSCreate", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber703 = await createFEApplication.createFEApplication(
      page,
      false,
      waUsers_content.userRoleCitizen,
      false,
      false,
      "X1234567890",
      true,
      false,
      true,
      false,
      false,
      false,
      subjectName,
    );
    await commonHelpers.signOutAndGoToCase(
      page,
      waUsers_content.userRoleAdmin,
      config.CaseAPIBaseURL,
      caseNumber703,
    );
    await task.removeTask(
      page,
      taskNames_content.registerNewCaseTask,
      subjectName,
      waUsers_content.userRoleAdmin,
    );
  });

  test("Create an application with no representative, additional information, no PCQ, and submit - Cy ", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber704 = await createFEApplication.createFEApplication(
      page,
      true,
      waUsers_content.userRoleCitizen,
      false,
      false,
      "X1234567890",
      true,
      false,
      true,
      false,
      false,
      false,
      subjectName,
    );
    await commonHelpers.signOutAndGoToCase(
      page,
      waUsers_content.userRoleAdmin,
      config.CaseAPIBaseURL,
      caseNumber704,
    );
    await task.removeTask(
      page,
      taskNames_content.registerNewCaseTask,
      subjectName,
      waUsers_content.userRoleAdmin,
    );
  });

  test("Create an application with all details, a qualified representative, no additional information, no PCQ, and submit. @createDSSWebkit", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber705 = await createFEApplication.createFEApplication(
      page,
      false,
      waUsers_content.userRoleCitizen,
      true,
      true,
      "X1234567890",
      false,
      false,
      true,
      false,
      false,
      false,
      subjectName,
    );
    await commonHelpers.signOutAndGoToCase(
      page,
      waUsers_content.userRoleAdmin,
      config.CaseAPIBaseURL,
      caseNumber705,
    );
    await task.removeTask(
      page,
      taskNames_content.registerNewCaseTask,
      subjectName,
      waUsers_content.userRoleAdmin,
    );
  });

  test("Create an application with all details, a qualified representative, no additional information, no PCQ, and submit - Cy. ", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber706 = await createFEApplication.createFEApplication(
      page,
      true,
      waUsers_content.userRoleCitizen,
      true,
      true,
      "X1234567890",
      false,
      false,
      true,
      false,
      false,
      false,
      subjectName,
    );
    await commonHelpers.signOutAndGoToCase(
      page,
      waUsers_content.userRoleAdmin,
      config.CaseAPIBaseURL,
      caseNumber706,
    );
    await task.removeTask(
      page,
      taskNames_content.registerNewCaseTask,
      subjectName,
      waUsers_content.userRoleAdmin,
    );
  });

  test("Create an application with all details, an unqualified representative, no additional information, no PCQ, and submit. @createDSSFirefox", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber707 = await createFEApplication.createFEApplication(
      page,
      false,
      waUsers_content.userRoleCitizen,
      true,
      false,
      "X1234567890",
      false,
      false,
      true,
      false,
      false,
      false,
      subjectName,
    );
    await commonHelpers.signOutAndGoToCase(
      page,
      waUsers_content.userRoleAdmin,
      config.CaseAPIBaseURL,
      caseNumber707,
    );
    await task.removeTask(
      page,
      taskNames_content.registerNewCaseTask,
      subjectName,
      waUsers_content.userRoleAdmin,
    );
  });

  test("Create an application with all details, no representative, uploading multiple documents, and submitting. ", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber708 = await createFEApplication.createFEApplication(
      page,
      false,
      waUsers_content.userRoleCitizen,
      false,
      false,
      "X1234567890",
      true,
      true,
      true,
      false,
      false,
      false,
      subjectName,
    );
    await commonHelpers.signOutAndGoToCase(
      page,
      waUsers_content.userRoleAdmin,
      config.CaseAPIBaseURL,
      caseNumber708,
    );
    await task.removeTask(
      page,
      taskNames_content.registerNewCaseTask,
      subjectName,
      waUsers_content.userRoleAdmin,
    );
  });

  test("Create an application with all details, an unqualified representative, no additional information, no PCQ, and submit - Cy. ", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber709 = await createFEApplication.createFEApplication(
      page,
      true,
      waUsers_content.userRoleCitizen,
      true,
      false,
      "X1234567890",
      false,
      false,
      true,
      false,
      false,
      false,
      subjectName,
    );
    await commonHelpers.signOutAndGoToCase(
      page,
      waUsers_content.userRoleAdmin,
      config.CaseAPIBaseURL,
      caseNumber709,
    );
    await task.removeTask(
      page,
      taskNames_content.registerNewCaseTask,
      subjectName,
      waUsers_content.userRoleAdmin,
    );
  });

  test("Test all back buttons on the Frontend application @DSSCreate", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    await createFEApplication.createFEApplication(
      page,
      false,
      waUsers_content.userRoleCitizen,
      true,
      true,
      "X1234567890",
      true,
      false,
      false,
      true,
      false,
      false,
      subjectName,
    );
  });
});

test("Accessibility test every page on DSS submit. @accessibility", async ({
  page,
}) => {
  const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
  await createFEApplication.createFEApplication(
    page,
    false,
    waUsers_content.userRoleCitizen,
    true,
    true,
    "X1234567890",
    true,
    false,
    false,
    false,
    true,
    false,
    subjectName,
  );
});
