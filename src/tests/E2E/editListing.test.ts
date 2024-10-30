import { test } from "@playwright/test";
import waUsers_content from "../fixtures/content/waUsers_content.ts";
import taskNames_content from "../fixtures/content/taskNames_content.ts";
import editListing from "../journeys/CaseAPI/editListing";
import commonHelpers from "../helpers/commonHelpers";
import createCase from "../journeys/CaseAPI/createCase";
import buildCase from "../journeys/CaseAPI/buildCase";
import events_content from "../fixtures/content/CaseAPI/events_content";
import createListing from "../journeys/CaseAPI/createListing";
import task from "../journeys/CaseAPI/task";
import hearingOptions from "../journeys/CaseAPI/hearingOptions";

test.describe("Edit hearing listing tests @CaseAPI", (): void => {
  test("Edit hearing listing, 1-London, Case management, F2F, Morning, East. @crossbrowserCaseAPI", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber1600 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber1600, subjectName);
    await task.removeTask(
      page,
      taskNames_content.issueCaseToRespondentTask,
      subjectName,
    );
    await hearingOptions.hearingOptions(
      page,
      false,
      true,
      "1-London",
      true,
      false,
      "Hybrid",
      false,
      true,
      caseNumber1600,
      subjectName,
    );
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Hearings: Create listing",
    );
    await createListing.createListing(
      page,
      false,
      true,
      "2-Midlands",
      "Final",
      "Paper",
      "Morning",
      false,
      "Birmingham Civil And Family Justice Centre-Priory Courts, 33 Bull Street",
      false,
      caseNumber1600,
      subjectName,
    );
    await editListing.editListing(
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
      caseNumber1600,
      subjectName,
    );
  });

  test("Edit hearing listing, 11-Scotland, Final, Hybrid, Morning, Aberdeen.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber1601 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber1601, subjectName);
    await task.removeTask(
      page,
      taskNames_content.issueCaseToRespondentTask,
      subjectName,
    );
    await hearingOptions.hearingOptions(
      page,
      false,
      true,
      "1-London",
      true,
      false,
      "Hybrid",
      false,
      true,
      caseNumber1601,
      subjectName,
    );
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Hearings: Create listing",
    );
    await createListing.createListing(
      page,
      false,
      true,
      "2-Midlands",
      "Final",
      "Paper",
      "Morning",
      false,
      "Birmingham Civil And Family Justice Centre-Priory Courts, 33 Bull Street",
      false,
      caseNumber1601,
      subjectName,
    );
    await editListing.editListing(
      page,
      false,
      true,
      "11-Scotland",
      "Final",
      "Hybrid",
      "Morning",
      true,
      "Aberdeen Tribunal Hearing Centre-AB1, 48 Huntly Street, Aberdeen, AB10 1SH",
      false,
      caseNumber1601,
      subjectName,
    );
  });

  test("Edit hearing listing, 2-Midlands, interlocutory, Video, Afternoon, Birmingham.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber1602 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber1602, subjectName);
    await task.removeTask(
      page,
      taskNames_content.issueCaseToRespondentTask,
      subjectName,
    );
    await hearingOptions.hearingOptions(
      page,
      false,
      true,
      "1-London",
      true,
      false,
      "Hybrid",
      false,
      true,
      caseNumber1602,
      subjectName,
    );
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Hearings: Create listing",
    );
    await createListing.createListing(
      page,
      false,
      true,
      "2-Midlands",
      "Final",
      "Paper",
      "Morning",
      false,
      "Birmingham Civil And Family Justice Centre-Priory Courts, 33 Bull Street",
      false,
      caseNumber1602,
      subjectName,
    );
    await editListing.editListing(
      page,
      false,
      true,
      "2-Midlands",
      "Interlocutory",
      "Video",
      "Afternoon",
      false,
      "Birmingham Civil And Family Justice Centre-Priory Courts, 33 Bull Street",
      false,
      caseNumber1602,
      subjectName,
    );
  });

  test("Edit hearing listing, 3-North East, Case Management, Telephone, All Day, Sheffield.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber1603 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber1603, subjectName);
    await task.removeTask(
      page,
      taskNames_content.issueCaseToRespondentTask,
      subjectName,
    );
    await hearingOptions.hearingOptions(
      page,
      false,
      true,
      "1-London",
      true,
      false,
      "Hybrid",
      false,
      true,
      caseNumber1603,
      subjectName,
    );
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Hearings: Create listing",
    );
    await createListing.createListing(
      page,
      false,
      true,
      "2-Midlands",
      "Final",
      "Paper",
      "Morning",
      false,
      "Birmingham Civil And Family Justice Centre-Priory Courts, 33 Bull Street",
      false,
      caseNumber1603,
      subjectName,
    );
    await editListing.editListing(
      page,
      false,
      true,
      "3-North East",
      "Case management",
      "Telephone",
      "All day",
      false,
      "Sheffield Magistrates Court-Castle Street",
      false,
      caseNumber1603,
      subjectName,
    );
  });

  test("Edit hearing listing, 5-South East, Interlocutory, Video, Afternoon, Brighton.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber1604 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber1604, subjectName);
    await task.removeTask(
      page,
      taskNames_content.issueCaseToRespondentTask,
      subjectName,
    );
    await hearingOptions.hearingOptions(
      page,
      false,
      true,
      "1-London",
      true,
      false,
      "Hybrid",
      false,
      true,
      caseNumber1604,
      subjectName,
    );
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Hearings: Create listing",
    );
    await createListing.createListing(
      page,
      false,
      true,
      "2-Midlands",
      "Final",
      "Paper",
      "Morning",
      false,
      "Birmingham Civil And Family Justice Centre-Priory Courts, 33 Bull Street",
      false,
      caseNumber1604,
      subjectName,
    );
    await editListing.editListing(
      page,
      false,
      true,
      "5-South East",
      "Interlocutory",
      "Video",
      "Afternoon",
      true,
      "Brighton Tribunal Hearing Centre-City Gate House, 185 Dyke Road",
      false,
      caseNumber1604,
      subjectName,
    );
  });

  test("Edit hearing listing, No venue, CaseManagement, Face to face, Morning, Venue not listed.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber1605 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber1605, subjectName);
    await task.removeTask(
      page,
      taskNames_content.issueCaseToRespondentTask,
      subjectName,
    );
    await hearingOptions.hearingOptions(
      page,
      false,
      true,
      "1-London",
      true,
      false,
      "Hybrid",
      false,
      true,
      caseNumber1605,
      subjectName,
    );
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Hearings: Create listing",
    );
    await createListing.createListing(
      page,
      false,
      true,
      "2-Midlands",
      "Final",
      "Paper",
      "Morning",
      false,
      "Birmingham Civil And Family Justice Centre-Priory Courts, 33 Bull Street",
      false,
      caseNumber1605,
      subjectName,
    );
    await editListing.editListing(
      page,
      false,
      false,
      null,
      "Case management",
      "Face to Face",
      "Morning",
      false,
      null,
      false,
      caseNumber1605,
      subjectName,
    );
  });

  test("Edit hearing listing, 2-Midlands, CaseManagement, Face to face, Morning, Venue not listed.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber1606 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber1606, subjectName);
    await task.removeTask(
      page,
      taskNames_content.issueCaseToRespondentTask,
      subjectName,
    );
    await hearingOptions.hearingOptions(
      page,
      false,
      true,
      "1-London",
      true,
      false,
      "Hybrid",
      false,
      true,
      caseNumber1606,
      subjectName,
    );
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Hearings: Create listing",
    );
    await createListing.createListing(
      page,
      false,
      true,
      "2-Midlands",
      "Final",
      "Paper",
      "Morning",
      false,
      "Birmingham Civil And Family Justice Centre-Priory Courts, 33 Bull Street",
      false,
      caseNumber1606,
      subjectName,
    );
    await editListing.editListing(
      page,
      false,
      true,
      "2-Midlands",
      "Case management",
      "Face to Face",
      "Morning",
      false,
      null,
      false,
      caseNumber1606,
      subjectName,
    );
  });

  test("Error Messaging. @crossbrowserCaseAPI", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber1607 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber1607, subjectName);
    await task.removeTask(
      page,
      taskNames_content.issueCaseToRespondentTask,
      subjectName,
    );
    await hearingOptions.hearingOptions(
      page,
      false,
      true,
      "1-London",
      true,
      false,
      "Hybrid",
      false,
      true,
      caseNumber1607,
      subjectName,
    );
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Hearings: Create listing",
    );
    await createListing.createListing(
      page,
      false,
      true,
      "2-Midlands",
      "Final",
      "Paper",
      "Morning",
      false,
      "Birmingham Civil And Family Justice Centre-Priory Courts, 33 Bull Street",
      false,
      caseNumber1607,
      subjectName,
    );
    await editListing.editListing(
      page,
      false,
      true,
      "1-London",
      "Case management",
      "Face to Face",
      "Morning",
      false,
      "East London Tribunal Hearing Centre-2 Clove Crescent, East India Dock London",
      true,
      caseNumber1607,
      subjectName,
    );
  });
});

test("Accessibility Test - Edit Listing. @accessibilityCaseAPI", async ({
  page,
}): Promise<void> => {
  const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
  const caseNumber1608 = await createCase.createCase(
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
  await buildCase.buildCase(page, false, caseNumber1608, subjectName);
  await task.removeTask(
    page,
    taskNames_content.issueCaseToRespondentTask,
    subjectName,
  );
  await hearingOptions.hearingOptions(
    page,
    false,
    true,
    "1-London",
    true,
    false,
    "Hybrid",
    false,
    true,
    caseNumber1608,
    subjectName,
  );
  await commonHelpers.chooseEventFromDropdown(page, "Hearings: Create listing");
  await createListing.createListing(
    page,
    false,
    true,
    "2-Midlands",
    "Final",
    "Paper",
    "Morning",
    false,
    "Birmingham Civil And Family Justice Centre-Priory Courts, 33 Bull Street",
    false,
    caseNumber1608,
    subjectName,
  );
  await editListing.editListing(
    page,
    true,
    true,
    "1-London",
    "Case management",
    "Face to Face",
    "Morning",
    false,
    "East London Tribunal Hearing Centre-2 Clove Crescent, East India Dock London",
    false,
    caseNumber1608,
    subjectName,
  );
});
