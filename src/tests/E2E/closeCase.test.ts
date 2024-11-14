import { test } from "@playwright/test";
import waUsers_content from "../fixtures/content/waUsers_content.ts";
import closeCase from "../journeys/CaseAPI/closeCase.ts";
import commonHelpers from "../helpers/commonHelpers.ts";
import createCase from "../journeys/CaseAPI/createCase.ts";
import events_content from "../fixtures/content/CaseAPI/events_content.ts";
import buildCase from "../journeys/CaseAPI/buildCase.ts";
import hearingOptions from "../journeys/CaseAPI/hearingOptions.ts";

test.describe("Case-API Close case tests. @CaseAPI @CaseAPI1", () => {
  test("Close a ready to list case as it is withdrawn with no optional information.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber500 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber500, subjectName);
    await hearingOptions.hearingOptions(
      page,
      false,
      false,
      null,
      false,
      false,
      "Face to Face",
      false,
      false,
      caseNumber500,
      subjectName,
    );
    await commonHelpers.chooseEventFromDropdown(page, events_content.closeCase);
    await closeCase.closeCase(
      page,
      false,
      false,
      "caseWithdrawn",
      false,
      null,
      null,
      caseNumber500,
      subjectName,
      false,
    );
  });

  test("Close a ready to list case as it is rejected created in error with optional information.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber501 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber501, subjectName);
    await hearingOptions.hearingOptions(
      page,
      false,
      false,
      null,
      false,
      false,
      "Face to Face",
      false,
      false,
      caseNumber501,
      subjectName,
    );
    await commonHelpers.chooseEventFromDropdown(page, events_content.closeCase);
    await closeCase.closeCase(
      page,
      false,
      false,
      "caseRejected",
      true,
      "createdInError",
      null,
      caseNumber501,
      subjectName,
      false,
    );
  });

  test("Close a ready to list case as it is rejected deadline missed with no optional information.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber502 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber502, subjectName);
    await hearingOptions.hearingOptions(
      page,
      false,
      false,
      null,
      false,
      false,
      "Face to Face",
      false,
      false,
      caseNumber502,
      subjectName,
    );
    await commonHelpers.chooseEventFromDropdown(page, events_content.closeCase);
    await closeCase.closeCase(
      page,
      false,
      false,
      "caseRejected",
      false,
      "deadlineMissed",
      null,
      caseNumber502,
      subjectName,
      false,
    );
  });

  test("Close a ready to list case as it is rejected duplicate case with optional information.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber503 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber503, subjectName);
    await hearingOptions.hearingOptions(
      page,
      false,
      false,
      null,
      false,
      false,
      "Face to Face",
      false,
      false,
      caseNumber503,
      subjectName,
    );
    await commonHelpers.chooseEventFromDropdown(page, events_content.closeCase);
    await closeCase.closeCase(
      page,
      false,
      false,
      "caseRejected",
      true,
      "duplicateCase",
      null,
      caseNumber503,
      subjectName,
      false,
    );
  });

  test("Close a ready to list case as it is rejected vexatious litigant with no optional information.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber504 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber504, subjectName);
    await hearingOptions.hearingOptions(
      page,
      false,
      false,
      null,
      false,
      false,
      "Face to Face",
      false,
      false,
      caseNumber504,
      subjectName,
    );
    await commonHelpers.chooseEventFromDropdown(page, events_content.closeCase);
    await closeCase.closeCase(
      page,
      false,
      false,
      "caseRejected",
      false,
      "vexatiousLitigant",
      null,
      caseNumber504,
      subjectName,
      false,
    );
  });

  test("Close a ready to list case as it is rejected other reason with optional information.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber505 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber505, subjectName);
    await hearingOptions.hearingOptions(
      page,
      false,
      false,
      null,
      false,
      false,
      "Face to Face",
      false,
      false,
      caseNumber505,
      subjectName,
    );
    await commonHelpers.chooseEventFromDropdown(page, events_content.closeCase);
    await closeCase.closeCase(
      page,
      false,
      false,
      "caseRejected",
      true,
      "other",
      null,
      caseNumber505,
      subjectName,
      false,
    );
  });

  test("Close a ready to list case as it is strikeout noncompliance with directions with no optional information.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber506 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber506, subjectName);
    await hearingOptions.hearingOptions(
      page,
      false,
      false,
      null,
      false,
      false,
      "Face to Face",
      false,
      false,
      caseNumber506,
      subjectName,
    );
    await commonHelpers.chooseEventFromDropdown(page, events_content.closeCase);
    await closeCase.closeCase(
      page,
      false,
      false,
      "caseStrikeOut",
      false,
      null,
      "noncomplianceWithDirections",
      caseNumber506,
      subjectName,
      false,
    );
  });

  test("Close a ready to list case as it is strikeout other reason with optional information.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber507 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber507, subjectName);
    await hearingOptions.hearingOptions(
      page,
      false,
      false,
      null,
      false,
      false,
      "Face to Face",
      false,
      false,
      caseNumber507,
      subjectName,
    );
    await commonHelpers.chooseEventFromDropdown(page, events_content.closeCase);
    await closeCase.closeCase(
      page,
      false,
      false,
      "caseStrikeOut",
      true,
      null,
      "other",
      caseNumber507,
      subjectName,
      false,
    );
  });

  test("Close a ready to list case as it is a concession with no optional information.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber508 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber508, subjectName);
    await hearingOptions.hearingOptions(
      page,
      false,
      false,
      null,
      false,
      false,
      "Face to Face",
      false,
      false,
      caseNumber508,
      subjectName,
    );
    await commonHelpers.chooseEventFromDropdown(page, events_content.closeCase);
    await closeCase.closeCase(
      page,
      false,
      false,
      "caseConcession",
      false,
      null,
      null,
      caseNumber508,
      subjectName,
      false,
    );
  });

  test("Close a ready to list case as it is a consent order with optional information.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber509 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber509, subjectName);
    await hearingOptions.hearingOptions(
      page,
      false,
      false,
      null,
      false,
      false,
      "Face to Face",
      false,
      false,
      caseNumber509,
      subjectName,
    );
    await commonHelpers.chooseEventFromDropdown(page, events_content.closeCase);
    await closeCase.closeCase(
      page,
      false,
      false,
      "consentOrder",
      true,
      null,
      null,
      caseNumber509,
      subjectName,
      false,
    );
  });

  test("Close a ready to list case as it is a rule 27 with no optional information.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber510 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber510, subjectName);
    await hearingOptions.hearingOptions(
      page,
      false,
      false,
      null,
      false,
      false,
      "Face to Face",
      false,
      false,
      caseNumber510,
      subjectName,
    );
    await commonHelpers.chooseEventFromDropdown(page, events_content.closeCase);
    await closeCase.closeCase(
      page,
      false,
      false,
      "rule27",
      false,
      null,
      null,
      caseNumber510,
      subjectName,
      false,
    );
  });

  test("Close a ready to list case due to death of appellant with no optional information.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber511 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber511, subjectName);
    await hearingOptions.hearingOptions(
      page,
      false,
      false,
      null,
      false,
      false,
      "Face to Face",
      false,
      false,
      caseNumber511,
      subjectName,
    );
    await commonHelpers.chooseEventFromDropdown(page, events_content.closeCase);
    await closeCase.closeCase(
      page,
      false,
      false,
      "deathOfAppellant",
      false,
      null,
      null,
      caseNumber511,
      subjectName,
      false,
    );
  });

  test("Error messaging - Close Case. @crossbrowserCaseAPI", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber512 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber512, subjectName);
    await commonHelpers.chooseEventFromDropdown(page, events_content.closeCase);
    await closeCase.closeCase(
      page,
      false,
      true,
      "rule27",
      false,
      null,
      null,
      caseNumber512,
      subjectName,
      false,
    );
  });
});

test("Accessibility test - Close case @accessibilityCaseAPI", async ({
  page,
}): Promise<void> => {
  const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
  const caseNumber513 = await createCase.createCase(
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
  await buildCase.buildCase(page, false, caseNumber513, subjectName);
  await commonHelpers.chooseEventFromDropdown(page, events_content.closeCase);
  await closeCase.closeCase(
    page,
    true,
    true,
    "rule27",
    false,
    null,
    null,
    caseNumber513,
    subjectName,
    false,
  );
});
