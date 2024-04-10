import { test } from "@playwright/test";
import createCase from "../journeys/CaseAPI/createCase.ts";
import { allEvents } from "../helpers/commonHelpers.ts";
import buildCase from "../journeys/CaseAPI/buildCase.ts";
import hearingOptions from "../journeys/CaseAPI/hearingOptions.ts";

test.describe.only("Create hearing options tests @CaseAPI", (): void => {
  test("Create hearing options in the 'Case management' state. @CaseAPI", async ({
    page,
  }): Promise<void> => {
    let previousEvents: allEvents[] = [];
    let eventTimes: string[] = [];
    const caseNumber: string = await createCase.createCase(
      page,
      "caseWorker",
      false,
      "Assessment",
      "Other",
      true,
      true,
      "Email",
      true,
      true,
      "1996",
      "Scotland",
      true,
      true,
      true,
      true,
      true,
    );
    await createCase.verifyDetails(
      page,
      "caseWorker",
      false,
      caseNumber,
      previousEvents,
      eventTimes,
    );
    await buildCase.buildCase(
      page,
      caseNumber,
      previousEvents,
      eventTimes,
      false,
    );
    await hearingOptions.hearingOptions(
      page,
      caseNumber,
      true,
      "1-London",
      true,
      false,
      "Face to Face",
      false,
      false,
    );
  });

  test("Create hearing options with no region and no venue in the 'Case management' state. @CaseAPI", async ({
    page,
  }): Promise<void> => {
    let previousEvents: allEvents[] = [];
    let eventTimes: string[] = [];
    const caseNumber: string = await createCase.createCase(
      page,
      "caseWorker",
      false,
      "Assessment",
      "Other",
      true,
      true,
      "Email",
      true,
      true,
      "1996",
      "Scotland",
      true,
      true,
      true,
      true,
      true,
    );
    await createCase.verifyDetails(
      page,
      "caseWorker",
      false,
      caseNumber,
      previousEvents,
      eventTimes,
    );
    await buildCase.buildCase(
      page,
      caseNumber,
      previousEvents,
      eventTimes,
      false,
    );
    await hearingOptions.hearingOptions(
      page,
      caseNumber,
      false,
      null,
      false,
      false,
      "Face to Face",
      false,
      false,
    );
  });

  test("Create hearing options with no region and venue not listed in the 'Case management' state. @CaseAPI", async ({
    page,
  }): Promise<void> => {
    let previousEvents: allEvents[] = [];
    let eventTimes: string[] = [];
    const caseNumber: string = await createCase.createCase(
      page,
      "caseWorker",
      false,
      "Assessment",
      "Other",
      true,
      true,
      "Email",
      true,
      true,
      "1996",
      "Scotland",
      true,
      true,
      true,
      true,
      true,
    );
    await createCase.verifyDetails(
      page,
      "caseWorker",
      false,
      caseNumber,
      previousEvents,
      eventTimes,
    );
    await buildCase.buildCase(
      page,
      caseNumber,
      previousEvents,
      eventTimes,
      false,
    );
    await hearingOptions.hearingOptions(
      page,
      caseNumber,
      false,
      null,
      false,
      true,
      "Face to Face",
      false,
      false,
    );
  });

  test("Create hearing options with a region but venue not listed in the 'Case management' state. @CaseAPI", async ({
    page,
  }): Promise<void> => {
    let previousEvents: allEvents[] = [];
    let eventTimes: string[] = [];
    const caseNumber: string = await createCase.createCase(
      page,
      "caseWorker",
      false,
      "Assessment",
      "Other",
      true,
      true,
      "Email",
      true,
      true,
      "1996",
      "Scotland",
      true,
      true,
      true,
      true,
      true,
    );
    await createCase.verifyDetails(
      page,
      "caseWorker",
      false,
      caseNumber,
      previousEvents,
      eventTimes,
    );
    await buildCase.buildCase(
      page,
      caseNumber,
      previousEvents,
      eventTimes,
      false,
    );
    await hearingOptions.hearingOptions(
      page,
      caseNumber,
      true,
      "1-London",
      false,
      true,
      "Face to Face",
      false,
      false,
    );
  });

  test("Edit hearing options in the 'Ready to list' state - change hearing format to 'Hybrid' and eligible for a short hearing. @CaseAPI", async ({
    page,
  }): Promise<void> => {
    let previousEvents: allEvents[] = [];
    let eventTimes: string[] = [];
    const caseNumber: string = await createCase.createCase(
      page,
      "caseWorker",
      false,
      "Assessment",
      "Other",
      true,
      true,
      "Email",
      true,
      true,
      "1996",
      "Scotland",
      true,
      true,
      true,
      true,
      true,
    );
    await createCase.verifyDetails(
      page,
      "caseWorker",
      false,
      caseNumber,
      previousEvents,
      eventTimes,
    );
    await buildCase.buildCase(
      page,
      caseNumber,
      previousEvents,
      eventTimes,
      false,
    );
    await hearingOptions.hearingOptions(
      page,
      caseNumber,
      true,
      "1-London",
      true,
      false,
      "Face to Face",
      false,
      false,
    );
    await hearingOptions.hearingOptions(
      page,
      caseNumber,
      true,
      "1-London",
      true,
      false,
      "Hybrid",
      true,
      false,
    );
  });
});

test("Accessibility test @accessibilityCaseAPI", async ({
  page,
}): Promise<void> => {
  let previousEvents: allEvents[] = [];
  let eventTimes: string[] = [];
  const caseNumber: string = await createCase.createCase(
    page,
    "caseWorker",
    true,
    "Assessment",
    "Other",
    true,
    true,
    "Email",
    true,
    true,
    "1996",
    "Scotland",
    true,
    true,
    true,
    true,
    true,
  );
  await createCase.verifyDetails(
    page,
    "caseWorker",
    true,
    caseNumber,
    previousEvents,
    eventTimes,
  );
  await buildCase.buildCase(page, caseNumber, previousEvents, eventTimes, true);
  await hearingOptions.hearingOptions(
    page,
    caseNumber,
    true,
    true,
    false,
    "Face to Face",
    false,
    true,
  );
});
