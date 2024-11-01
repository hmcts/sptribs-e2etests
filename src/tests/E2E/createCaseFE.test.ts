import { test } from "@playwright/test";
import waUsers_content from "../fixtures/content/waUsers_content.ts";
import taskNames_content from "../fixtures/content/taskNames_content.ts";
import createFEApplication from "../journeys/DSSCreateCase/createCase.ts";
import commonHelpers from "../helpers/commonHelpers.ts";
import config from "../config.ts";
import task from "../journeys/CaseAPI/task.ts";

test.describe("DSS Create case tests. @DSSCreate", (): void => {
  test("Create an application with all details, a qualified representative, additional information, no PCQ, and submit.", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber701 = await createFEApplication.createFEApplication(
      page,
      false,
      waUsers_content.userRoleCitizen,
      true,
      true,
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
      caseNumber701,
    );
  });

  test("Create an application with all details, a qualified representative, additional information, no PCQ, and submit - Cy", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber702 = await createFEApplication.createFEApplication(
      page,
      true,
      waUsers_content.userRoleCitizen,
      true,
      true,
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
  });

  test("Create an application with no representative, additional information, no PCQ, and submit.", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber703 = await createFEApplication.createFEApplication(
      page,
      false,
      waUsers_content.userRoleCitizen,
      false,
      false,
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
  });

  test("Create an application with no representative, additional information, no PCQ, and submit - Cy", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber704 = await createFEApplication.createFEApplication(
      page,
      true,
      waUsers_content.userRoleCitizen,
      false,
      false,
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
  });

  test("Create an application with all details, a qualified representative, no additional information, no PCQ, and submit.", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber705 = await createFEApplication.createFEApplication(
      page,
      false,
      waUsers_content.userRoleCitizen,
      true,
      true,
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
  });

  test("Create an application with all details, a qualified representative, no additional information, no PCQ, and submit - Cy.", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber706 = await createFEApplication.createFEApplication(
      page,
      true,
      waUsers_content.userRoleCitizen,
      true,
      true,
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
  });

  test("Create an application with all details, an unqualified representative, no additional information, no PCQ, and submit.", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber707 = await createFEApplication.createFEApplication(
      page,
      false,
      waUsers_content.userRoleCitizen,
      true,
      false,
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
  });

  test("Create an application with all details, no representative, uploading multiple documents, and submitting.", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber708 = await createFEApplication.createFEApplication(
      page,
      false,
      waUsers_content.userRoleCitizen,
      false,
      false,
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
  });

  test("Create an application with all details, an unqualified representative, no additional information, no PCQ, and submit - Cy.", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber709 = await createFEApplication.createFEApplication(
      page,
      true,
      waUsers_content.userRoleCitizen,
      true,
      false,
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
  });

  test("Test all back buttons on the Frontend application", async ({
    page,
  }) => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    await createFEApplication.createFEApplication(
      page,
      false,
      waUsers_content.userRoleCitizen,
      true,
      true,
      true,
      false,
      false,
      true,
      false,
      false,
      subjectName,
    );
  });

  // Unresolved bug with error messaging

  // test("Error messaging", async ({ page }) => {
  //   const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
  //   await createFEApplication.createFEApplication(
  //     page,
  //     false,
  //     waUsers_content.userRoleCitizen,
  //     true,
  //     true,
  //     true,
  //     false,
  //     false,
  //     false,
  //     false,
  //     true,
  //     subjectName
  //   );
  // });
  //
  // test("Error messaging - Cy", async ({ page }) => {
  //   const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
  //   await createFEApplication.createFEApplication(
  //     page,
  //     true,
  //     waUsers_content.userRoleCitizen,
  //     true,
  //     true,
  //     true,
  //     false,
  //     false,
  //     false,
  //     false,
  //     true,
  //     subjectName
  //   );
  // });
});

test("Accessibility test every page on DSS submit. @DSSAccessibility", async ({
  page,
}) => {
  const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
  await createFEApplication.createFEApplication(
    page,
    false,
    waUsers_content.userRoleCitizen,
    true,
    true,
    true,
    false,
    false,
    false,
    true,
    false,
    subjectName,
  );
});
