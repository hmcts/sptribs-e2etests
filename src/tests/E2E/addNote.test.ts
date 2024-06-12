import { test } from "@playwright/test";
import addNote from "../journeys/CaseAPI/addNote.ts";

test.describe("Case-API Add note tests. @CaseAPI", () => {
  test("Add a note to a DSS-submitted case as a caseworker.", async ({
    page,
  }): Promise<void> => {
    await addNote.addNote(page, "caseWorker", "DSS-Submitted", false);
  });

  test("Add a note to a Submitted case as a senior caseworker.", async ({
    page,
  }): Promise<void> => {
    await addNote.addNote(page, "seniorCaseworker", "Submitted", false);
  });

  test("Add a note to a Case management case as a hearing centre admin.", async ({
    page,
  }): Promise<void> => {
    await addNote.addNote(page, "hearingCentreAdmin", "Case Management", false);
  });

  test("Add a note to a Ready to list case as a hearing centre team lead.", async ({
    page,
  }): Promise<void> => {
    await addNote.addNote(
      page,
      "hearingCentreTeamLead",
      "Ready to list",
      false,
    );
  });

  test("Add a note to a Awaiting hearing case as a hearing Senior Judge.", async ({
    page,
  }): Promise<void> => {
    await addNote.addNote(page, "seniorJudge", "Awaiting Hearing", false);
  });

  test("Add a note to a awaiting outcome case as a caseworker.", async ({
    page,
  }): Promise<void> => {
    await addNote.addNote(page, "caseWorker", "Awaiting Outcome", false);
  });

  test("Add a note to a case closed case as a caseworker.", async ({
    page,
  }): Promise<void> => {
    await addNote.addNote(page, "caseWorker", "Case closed", false);
  });

  test("Add a note to a case stayed as a caseworker.", async ({
    page,
  }): Promise<void> => {
    await addNote.addNote(page, "caseWorker", "Case Stayed", false);
  });
});
