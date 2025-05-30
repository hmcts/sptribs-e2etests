import { test } from "@playwright/test";
import waUsers_content from "../fixtures/content/waUsers_content.ts";
import postponeHearing from "../journeys/CaseAPI/postponeHearing.ts";
import commonHelpers from "../helpers/commonHelpers.ts";
import createCase from "../journeys/CaseAPI/createCase.ts";
import events_content from "../fixtures/content/CaseAPI/events_content.ts";
import buildCase from "../journeys/CaseAPI/buildCase.ts";
import createListing from "../journeys/CaseAPI/createListing.ts";
import testDataCleanUp from "../helpers/testDataCleanUp.ts";
import task from "../journeys/CaseAPI/task.ts";
import taskNames_content from "../fixtures/content/taskNames_content.ts";

test.describe("Postpone hearing tests @CaseAPI", (): void => {
  test("Check for redundant test data @CaseAPI2", async ({ page }) => {
    test.setTimeout(10 * 60 * 1000);
    await testDataCleanUp(page, waUsers_content.userRoleAdmin);
  });

  test("Postpone hearing as a caseworker - Appellant is out of country. @CaseAPI2", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2000 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber2000, subjectName);
    await task.removeTask(
      page,
      taskNames_content.issueCaseToRespondentTask,
      subjectName,
      waUsers_content.userRoleAdmin,
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
      caseNumber2000,
      subjectName,
      false,
    );
    await postponeHearing.postponeHearing(
      page,
      false,
      "Appellant is out of country",
      false,
      caseNumber2000,
      subjectName,
    );
  });

  test("Postpone hearing as a senior caseworker - Appellant seeking legal advice.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2001 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber2001, subjectName);
    await task.removeTask(
      page,
      taskNames_content.issueCaseToRespondentTask,
      subjectName,
      waUsers_content.userRoleAdmin,
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
      caseNumber2001,
      subjectName,
      false,
    );
    await postponeHearing.postponeHearing(
      page,
      false,
      "Appellant seeking legal advice",
      false,
      caseNumber2001,
      subjectName,
    );
  });

  test("Postpone hearing as a hearing centre admin - Appellant unable to attend face to face.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2002 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber2002, subjectName);
    await task.removeTask(
      page,
      taskNames_content.issueCaseToRespondentTask,
      subjectName,
      waUsers_content.userRoleAdmin,
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
      caseNumber2002,
      subjectName,
      false,
    );
    await postponeHearing.postponeHearing(
      page,
      false,
      "Appellant unable to attend face to face, change of hearing format requested",
      false,
      caseNumber2002,
      subjectName,
    );
  });

  test("Postpone hearing as a hearing centre team lead - Appellant unavailable.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2003 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber2003, subjectName);
    await task.removeTask(
      page,
      taskNames_content.issueCaseToRespondentTask,
      subjectName,
      waUsers_content.userRoleAdmin,
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
      caseNumber2003,
      subjectName,
      false,
    );
    await postponeHearing.postponeHearing(
      page,
      false,
      "Appellant unavailable (holiday/work/appointment/unwell)",
      false,
      caseNumber2003,
      subjectName,
    );
  });

  test("Postpone hearing as a senior judge - Bereavement.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2004 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber2004, subjectName);
    await task.removeTask(
      page,
      taskNames_content.issueCaseToRespondentTask,
      subjectName,
      waUsers_content.userRoleAdmin,
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
      caseNumber2004,
      subjectName,
      false,
    );
    await postponeHearing.postponeHearing(
      page,
      false,
      "Bereavement",
      false,
      caseNumber2004,
      subjectName,
    );
  });

  test("Postpone hearing as a caseworker - Case stayed due to Civil proceedings.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2005 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber2005, subjectName);
    await task.removeTask(
      page,
      taskNames_content.issueCaseToRespondentTask,
      subjectName,
      waUsers_content.userRoleAdmin,
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
      caseNumber2005,
      subjectName,
      false,
    );
    await postponeHearing.postponeHearing(
      page,
      false,
      "Case stayed due to Civil proceedings",
      false,
      caseNumber2005,
      subjectName,
    );
  });

  test("Postpone hearing as a caseworker - CICA requests case be heard by a single Judge.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2006 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber2006, subjectName);
    await task.removeTask(
      page,
      taskNames_content.issueCaseToRespondentTask,
      subjectName,
      waUsers_content.userRoleAdmin,
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
      caseNumber2006,
      subjectName,
      false,
    );
    await postponeHearing.postponeHearing(
      page,
      false,
      "CICA requests case be heard by a single Judge as a Rule 27 decision",
      false,
      caseNumber2006,
      subjectName,
    );
  });

  test("Postpone hearing as a caseworker - CICA seeking Counsel.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2007 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber2007, subjectName);
    await task.removeTask(
      page,
      taskNames_content.issueCaseToRespondentTask,
      subjectName,
      waUsers_content.userRoleAdmin,
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
      caseNumber2007,
      subjectName,
      false,
    );
    await postponeHearing.postponeHearing(
      page,
      false,
      "CICA seeking Counsel",
      false,
      caseNumber2007,
      subjectName,
    );
  });

  test("Postpone hearing as a caseworker - extension granted.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2008 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber2008, subjectName);
    await task.removeTask(
      page,
      taskNames_content.issueCaseToRespondentTask,
      subjectName,
      waUsers_content.userRoleAdmin,
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
      caseNumber2008,
      subjectName,
      false,
    );
    await postponeHearing.postponeHearing(
      page,
      false,
      "Extension granted",
      false,
      caseNumber2008,
      subjectName,
    );
  });

  test("Postpone hearing as a caseworker - Face to face hearing required.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2009 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber2009, subjectName);
    await task.removeTask(
      page,
      taskNames_content.issueCaseToRespondentTask,
      subjectName,
      waUsers_content.userRoleAdmin,
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
      caseNumber2009,
      subjectName,
      false,
    );
    await postponeHearing.postponeHearing(
      page,
      false,
      "Face to face hearing required",
      false,
      caseNumber2009,
      subjectName,
    );
  });

  test("Postpone hearing as a caseworker - Last minute submissions. @CaseAPI2", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2010 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber2010, subjectName);
    await task.removeTask(
      page,
      taskNames_content.issueCaseToRespondentTask,
      subjectName,
      waUsers_content.userRoleAdmin,
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
      caseNumber2010,
      subjectName,
      false,
    );
    await postponeHearing.postponeHearing(
      page,
      false,
      "Last minute submissions i.e. 1-2 weeks prior to hearing",
      false,
      caseNumber2010,
      subjectName,
    );
  });

  test("Postpone hearing as a caseworker - linked cases.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2011 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber2011, subjectName);
    await task.removeTask(
      page,
      taskNames_content.issueCaseToRespondentTask,
      subjectName,
      waUsers_content.userRoleAdmin,
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
      caseNumber2011,
      subjectName,
      false,
    );
    await postponeHearing.postponeHearing(
      page,
      false,
      "Linked cases - to be heard together",
      false,
      caseNumber2011,
      subjectName,
    );
  });

  test("Postpone hearing as a caseworker - Member excluded.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2012 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber2012, subjectName);
    await task.removeTask(
      page,
      taskNames_content.issueCaseToRespondentTask,
      subjectName,
      waUsers_content.userRoleAdmin,
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
      caseNumber2012,
      subjectName,
      false,
    );
    await postponeHearing.postponeHearing(
      page,
      false,
      "Member excluded - listed in error",
      false,
      caseNumber2012,
      subjectName,
    );
  });

  test("Postpone hearing as a caseworker - Representative/Solicitor cannot make contact with Appellant.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2013 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber2013, subjectName);
    await task.removeTask(
      page,
      taskNames_content.issueCaseToRespondentTask,
      subjectName,
      waUsers_content.userRoleAdmin,
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
      caseNumber2013,
      subjectName,
      false,
    );
    await postponeHearing.postponeHearing(
      page,
      false,
      "Representative/Solicitor cannot make contact with Appellant",
      false,
      caseNumber2013,
      subjectName,
    );
  });

  test("Postpone hearing as a caseworker - Representative/Solicitor seeking further evidence.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2014 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber2014, subjectName);
    await task.removeTask(
      page,
      taskNames_content.issueCaseToRespondentTask,
      subjectName,
      waUsers_content.userRoleAdmin,
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
      caseNumber2014,
      subjectName,
      false,
    );
    await postponeHearing.postponeHearing(
      page,
      false,
      "Representative/Solicitor seeking further evidence",
      false,
      caseNumber2014,
      subjectName,
    );
  });

  test("Postpone hearing as a caseworker - Representative/Solicitor unavailable.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2015 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber2015, subjectName);
    await task.removeTask(
      page,
      taskNames_content.issueCaseToRespondentTask,
      subjectName,
      waUsers_content.userRoleAdmin,
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
      caseNumber2015,
      subjectName,
      false,
    );
    await postponeHearing.postponeHearing(
      page,
      false,
      "Representative/Solicitor unavailable (holiday/work/appointment/unwell)",
      false,
      caseNumber2015,
      subjectName,
    );
  });

  test("Postpone hearing as a caseworker - Tribunal members unavailable.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2016 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber2016, subjectName);
    await task.removeTask(
      page,
      taskNames_content.issueCaseToRespondentTask,
      subjectName,
      waUsers_content.userRoleAdmin,
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
      caseNumber2016,
      subjectName,
      false,
    );
    await postponeHearing.postponeHearing(
      page,
      false,
      "Tribunal members unavailable (holiday/work/appointment/unwell)",
      false,
      caseNumber2016,
      subjectName,
    );
  });

  test("Postpone hearing as a caseworker - Tribunal members deemed listing time directed inadequate.", async ({
    page,
  }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2017 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber2017, subjectName);
    await task.removeTask(
      page,
      taskNames_content.issueCaseToRespondentTask,
      subjectName,
      waUsers_content.userRoleAdmin,
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
      caseNumber2017,
      subjectName,
      false,
    );
    await postponeHearing.postponeHearing(
      page,
      false,
      "Tribunal members deemed listing time directed inadequate",
      false,
      caseNumber2017,
      subjectName,
    );
  });

  test("Error messaging. @ErrorMessaging", async ({ page }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber2018 = await createCase.createCase(
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
    await buildCase.buildCase(page, false, caseNumber2018, subjectName);
    await task.removeTask(
      page,
      taskNames_content.issueCaseToRespondentTask,
      subjectName,
      waUsers_content.userRoleAdmin,
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
      caseNumber2018,
      subjectName,
      false,
    );
    await postponeHearing.postponeHearing(
      page,
      false,
      "Other",
      true,
      caseNumber2018,
      subjectName,
    );
  });
});

test("Accessibility test - postpone hearing @accessibility.", async ({
  page,
}): Promise<void> => {
  const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
  const caseNumber2019 = await createCase.createCase(
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
  await buildCase.buildCase(page, false, caseNumber2019, subjectName);
  await task.removeTask(
    page,
    taskNames_content.issueCaseToRespondentTask,
    subjectName,
    waUsers_content.userRoleAdmin,
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
    caseNumber2019,
    subjectName,
    false,
  );
  await postponeHearing.postponeHearing(
    page,
    true,
    "Other",
    false,
    caseNumber2019,
    subjectName,
  );
});
