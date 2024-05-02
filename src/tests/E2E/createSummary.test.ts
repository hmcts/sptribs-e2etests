import { test } from "@playwright/test";
import createSummary from "../journeys/CaseAPI/createSummary.ts";

test.describe("Create hearing summary tests @CaseAPI", (): void => {
  test.only("Create hearing summary as a caseworker - hearing outcome is allowed.", async ({
    page,
  }): Promise<void> => {
    await createSummary.createSummary(
      page,
      "caseWorker",
      false,
      "Case management",
      "Hybrid",
      "Morning",
      false,
      "Fox Court - London (Central) SSCS Tribunal-4th Floor, Fox Court, 30 Brooke Street, London",
      "Fox Court",
      "Allowed",
      null,
      true,
      false,
      false,
    );
  });

  test("Create and edit hearing summary as a senior caseworker - hearing outcome is allowed.", async ({
    page,
  }): Promise<void> => {
    await createSummary.createSummary(
      page,
      "seniorCaseworker",
      false,
      "Interlocutory",
      "Video",
      "Morning",
      false,
      "Fox Court - London (Central) SSCS Tribunal-4th Floor, Fox Court, 30 Brooke Street, London",
      "Fox Court",
      "Allowed",
      null,
      true,
      true,
      false,
    );
  });

  test("Create hearing summary as a hearing centre admin - hearing over multiple days.", async ({
    page,
  }): Promise<void> => {
    await createSummary.createSummary(
      page,
      "hearingCentreAdmin",
      false,
      "Final",
      "Face to Face",
      "All day",
      true,
      "Fox Court - London (Central) SSCS Tribunal-4th Floor, Fox Court, 30 Brooke Street, London",
      "Fox Court",
      "Allowed",
      null,
      true,
      false,
      false,
    );
  });

  test("Create hearing summary as a hearing centre team lead - hearing outcome is refused.", async ({
    page,
  }): Promise<void> => {
    await createSummary.createSummary(
      page,
      "hearingCentreTeamLead",
      false,
      "Case management",
      "Telephone",
      "Afternoon",
      false,
      "Fox Court - London (Central) SSCS Tribunal-4th Floor, Fox Court, 30 Brooke Street, London",
      "Fox Court",
      "Refused",
      null,
      true,
      false,
      false,
    );
  });

  test("Create hearing summary as a senior judge - hearing outcome is withdrawn at hearing.", async ({
    page,
  }): Promise<void> => {
    await createSummary.createSummary(
      page,
      "seniorJudge",
      false,
      "Case management",
      "Paper",
      "Morning",
      false,
      "Fox Court - London (Central) SSCS Tribunal-4th Floor, Fox Court, 30 Brooke Street, London",
      "Fox Court",
      "Withdrawn at Hearing",
      null,
      true,
      false,
      false,
    );
  });

  test("Create hearing summary as a caseworker - hearing outcome is adjourned to face to face.", async ({
    page,
  }): Promise<void> => {
    await createSummary.createSummary(
      page,
      "caseWorker",
      false,
      "Case management",
      "Hybrid",
      "Morning",
      false,
      "Fox Court - London (Central) SSCS Tribunal-4th Floor, Fox Court, 30 Brooke Street, London",
      "Fox Court",
      "Adjourned",
      "Adjourned to face to face",
      true,
      false,
      false,
    );
  });

  test("Create hearing summary as a caseworker - hearing outcome is adjourned to video.", async ({
    page,
  }): Promise<void> => {
    await createSummary.createSummary(
      page,
      "caseWorker",
      false,
      "Case management",
      "Hybrid",
      "Morning",
      false,
      "Fox Court - London (Central) SSCS Tribunal-4th Floor, Fox Court, 30 Brooke Street, London",
      "Fox Court",
      "Adjourned",
      "Adjourned to Video",
      true,
      false,
      false,
    );
  });

  test("Create hearing summary as a caseworker - hearing outcome is adjourned due to admin error.", async ({
    page,
  }): Promise<void> => {
    await createSummary.createSummary(
      page,
      "caseWorker",
      false,
      "Case management",
      "Hybrid",
      "Morning",
      false,
      "Fox Court - London (Central) SSCS Tribunal-4th Floor, Fox Court, 30 Brooke Street, London",
      "Fox Court",
      "Adjourned",
      "Admin error",
      true,
      false,
      false,
    );
  });

  test("Create hearing summary as a caseworker - hearing outcome is adjourned as appellant did not attend.", async ({
    page,
  }): Promise<void> => {
    await createSummary.createSummary(
      page,
      "caseWorker",
      false,
      "Case management",
      "Hybrid",
      "Morning",
      false,
      "Fox Court - London (Central) SSCS Tribunal-4th Floor, Fox Court, 30 Brooke Street, London",
      "Fox Court",
      "Adjourned",
      "Appellant did not attend",
      true,
      false,
      false,
    );
  });

  test("Create hearing summary as a caseworker - hearing outcome is adjourned as appellant did not have bundle.", async ({
    page,
  }): Promise<void> => {
    await createSummary.createSummary(
      page,
      "caseWorker",
      false,
      "Case management",
      "Hybrid",
      "Morning",
      false,
      "Fox Court - London (Central) SSCS Tribunal-4th Floor, Fox Court, 30 Brooke Street, London",
      "Fox Court",
      "Adjourned",
      "Appellant did not have bundle",
      true,
      false,
      false,
    );
  });

  test("Create hearing summary as a caseworker - hearing outcome is adjourned as appellant not ready to proceed.", async ({
    page,
  }): Promise<void> => {
    await createSummary.createSummary(
      page,
      "caseWorker",
      false,
      "Case management",
      "Hybrid",
      "Morning",
      false,
      "Fox Court - London (Central) SSCS Tribunal-4th Floor, Fox Court, 30 Brooke Street, London",
      "Fox Court",
      "Adjourned",
      "Appellant not ready to proceed",
      true,
      false,
      false,
    );
  });

  test("Create hearing summary as a caseworker - hearing outcome is adjourned due to complex case.", async ({
    page,
  }): Promise<void> => {
    await createSummary.createSummary(
      page,
      "caseWorker",
      false,
      "Case management",
      "Hybrid",
      "Morning",
      false,
      "Fox Court - London (Central) SSCS Tribunal-4th Floor, Fox Court, 30 Brooke Street, London",
      "Fox Court",
      "Adjourned",
      "Complex case",
      true,
      false,
      false,
    );
  });

  test("Create hearing summary as a caseworker - hearing outcome is adjourned due to failure to comply with directions.", async ({
    page,
  }): Promise<void> => {
    await createSummary.createSummary(
      page,
      "caseWorker",
      false,
      "Case management",
      "Hybrid",
      "Morning",
      false,
      "Fox Court - London (Central) SSCS Tribunal-4th Floor, Fox Court, 30 Brooke Street, London",
      "Fox Court",
      "Adjourned",
      "Failure to comply with directions",
      true,
      false,
      false,
    );
  });

  test("Create hearing summary as a caseworker - hearing outcome is adjourned for Legal Rep/No Sol.", async ({
    page,
  }): Promise<void> => {
    await createSummary.createSummary(
      page,
      "caseWorker",
      false,
      "Case management",
      "Hybrid",
      "Morning",
      false,
      "Fox Court - London (Central) SSCS Tribunal-4th Floor, Fox Court, 30 Brooke Street, London",
      "Fox Court",
      "Adjourned",
      "For Legal Rep/No Sol",
      true,
      false,
      false,
    );
  });

  test("Create hearing summary as a caseworker - hearing outcome is adjourned for Other Parties to Attend.", async ({
    page,
  }): Promise<void> => {
    await createSummary.createSummary(
      page,
      "caseWorker",
      false,
      "Case management",
      "Hybrid",
      "Morning",
      false,
      "Fox Court - London (Central) SSCS Tribunal-4th Floor, Fox Court, 30 Brooke Street, London",
      "Fox Court",
      "Adjourned",
      "For Other Parties to Attend",
      true,
      false,
      false,
    );
  });

  test("Create hearing summary as a caseworker - hearing outcome is adjourned as further evidence received at hearing.", async ({
    page,
  }): Promise<void> => {
    await createSummary.createSummary(
      page,
      "caseWorker",
      false,
      "Case management",
      "Hybrid",
      "Morning",
      false,
      "Fox Court - London (Central) SSCS Tribunal-4th Floor, Fox Court, 30 Brooke Street, London",
      "Fox Court",
      "Adjourned",
      "Further evidence received at hearing",
      true,
      false,
      false,
    );
  });

  test("Create hearing summary as a caseworker - hearing outcome is adjourned as further evidence supplied but not before Tribunal at hearing.", async ({
    page,
  }): Promise<void> => {
    await createSummary.createSummary(
      page,
      "caseWorker",
      false,
      "Case management",
      "Hybrid",
      "Morning",
      false,
      "Fox Court - London (Central) SSCS Tribunal-4th Floor, Fox Court, 30 Brooke Street, London",
      "Fox Court",
      "Adjourned",
      "Further evidence supplied but not before Tribunal at hearing",
      true,
      false,
      false,
    );
  });

  test("Create hearing summary as a caseworker - hearing outcome is adjourned as further Loss of Earnings information required - Appellant.", async ({
    page,
  }): Promise<void> => {
    await createSummary.createSummary(
      page,
      "caseWorker",
      false,
      "Case management",
      "Hybrid",
      "Morning",
      false,
      "Fox Court - London (Central) SSCS Tribunal-4th Floor, Fox Court, 30 Brooke Street, London",
      "Fox Court",
      "Adjourned",
      "Further Loss of Earnings information required - Appellant",
      true,
      false,
      false,
    );
  });

  test("Create hearing summary as a caseworker - hearing outcome is adjourned as further Loss of Earnings information required - Respondent.", async ({
    page,
  }): Promise<void> => {
    await createSummary.createSummary(
      page,
      "caseWorker",
      false,
      "Case management",
      "Hybrid",
      "Morning",
      false,
      "Fox Court - London (Central) SSCS Tribunal-4th Floor, Fox Court, 30 Brooke Street, London",
      "Fox Court",
      "Adjourned",
      "Further Loss of Earnings information required - Respondent",
      true,
      false,
      false,
    );
  });

  test("Create hearing summary as a caseworker - hearing outcome is adjourned as further medical evidence required - Appellant.", async ({
    page,
  }): Promise<void> => {
    await createSummary.createSummary(
      page,
      "caseWorker",
      false,
      "Case management",
      "Hybrid",
      "Morning",
      false,
      "Fox Court - London (Central) SSCS Tribunal-4th Floor, Fox Court, 30 Brooke Street, London",
      "Fox Court",
      "Adjourned",
      "Further medical evidence required - Appellant",
      true,
      false,
      false,
    );
  });

  test("Create hearing summary as a caseworker - hearing outcome is adjourned as further medical evidence required - Respondent.", async ({
    page,
  }): Promise<void> => {
    await createSummary.createSummary(
      page,
      "caseWorker",
      false,
      "Case management",
      "Hybrid",
      "Morning",
      false,
      "Fox Court - London (Central) SSCS Tribunal-4th Floor, Fox Court, 30 Brooke Street, London",
      "Fox Court",
      "Adjourned",
      "Further medical evidence required - Respondent",
      true,
      false,
      false,
    );
  });

  test("Create hearing summary as a caseworker - hearing outcome is adjourned as further police evidence required - Respondent.", async ({
    page,
  }): Promise<void> => {
    await createSummary.createSummary(
      page,
      "caseWorker",
      false,
      "Case management",
      "Hybrid",
      "Morning",
      false,
      "Fox Court - London (Central) SSCS Tribunal-4th Floor, Fox Court, 30 Brooke Street, London",
      "Fox Court",
      "Adjourned",
      "Further police evidence required - Respondent",
      true,
      false,
      false,
    );
  });

  test("Create hearing summary as a caseworker - hearing outcome is adjourned as further police evidence required - Appellant.", async ({
    page,
  }): Promise<void> => {
    await createSummary.createSummary(
      page,
      "caseWorker",
      false,
      "Case management",
      "Hybrid",
      "Morning",
      false,
      "Fox Court - London (Central) SSCS Tribunal-4th Floor, Fox Court, 30 Brooke Street, London",
      "Fox Court",
      "Adjourned",
      "Further police evidence required - Appellant",
      true,
      false,
      false,
    );
  });

  test("Create hearing summary as a caseworker - hearing outcome is adjourned as further police evidence required - HMCTS (Summons).", async ({
    page,
  }): Promise<void> => {
    await createSummary.createSummary(
      page,
      "caseWorker",
      false,
      "Case management",
      "Hybrid",
      "Morning",
      false,
      "Fox Court - London (Central) SSCS Tribunal-4th Floor, Fox Court, 30 Brooke Street, London",
      "Fox Court",
      "Adjourned",
      "Further police evidence required - HMCTS (Summons)",
      true,
      false,
      false,
    );
  });

  test("Create hearing summary as a caseworker - hearing outcome is adjourned due to insufficient time.", async ({
    page,
  }): Promise<void> => {
    await createSummary.createSummary(
      page,
      "caseWorker",
      false,
      "Case management",
      "Hybrid",
      "Morning",
      false,
      "Fox Court - London (Central) SSCS Tribunal-4th Floor, Fox Court, 30 Brooke Street, London",
      "Fox Court",
      "Adjourned",
      "Insufficient time",
      true,
      false,
      false,
    );
  });

  test("Create hearing summary as a caseworker - hearing outcome is adjourned as interpreter required.", async ({
    page,
  }): Promise<void> => {
    await createSummary.createSummary(
      page,
      "caseWorker",
      false,
      "Case management",
      "Hybrid",
      "Morning",
      false,
      "Fox Court - London (Central) SSCS Tribunal-4th Floor, Fox Court, 30 Brooke Street, London",
      "Fox Court",
      "Adjourned",
      "Interpreter required",
      true,
      false,
      false,
    );
  });

  test("Create hearing summary as a caseworker - hearing outcome is adjourned as Member Unable to Attend.", async ({
    page,
  }): Promise<void> => {
    await createSummary.createSummary(
      page,
      "caseWorker",
      false,
      "Case management",
      "Hybrid",
      "Morning",
      false,
      "Fox Court - London (Central) SSCS Tribunal-4th Floor, Fox Court, 30 Brooke Street, London",
      "Fox Court",
      "Adjourned",
      "Member Unable to Attend",
      true,
      false,
      false,
    );
  });

  test("Create hearing summary as a caseworker - hearing outcome is adjourned as PO did not attend.", async ({
    page,
  }): Promise<void> => {
    await createSummary.createSummary(
      page,
      "caseWorker",
      false,
      "Case management",
      "Hybrid",
      "Morning",
      false,
      "Fox Court - London (Central) SSCS Tribunal-4th Floor, Fox Court, 30 Brooke Street, London",
      "Fox Court",
      "Adjourned",
      "PO did not attend",
      true,
      false,
      false,
    );
  });

  test("Create hearing summary as a caseworker - hearing outcome is adjourned due to Poor Evidence.", async ({
    page,
  }): Promise<void> => {
    await createSummary.createSummary(
      page,
      "caseWorker",
      false,
      "Case management",
      "Hybrid",
      "Morning",
      false,
      "Fox Court - London (Central) SSCS Tribunal-4th Floor, Fox Court, 30 Brooke Street, London",
      "Fox Court",
      "Adjourned",
      "Poor Evidence",
      true,
      false,
      false,
    );
  });

  test("Create hearing summary as a caseworker - hearing outcome is adjourned as venue not suitable.", async ({
    page,
  }): Promise<void> => {
    await createSummary.createSummary(
      page,
      "caseWorker",
      false,
      "Case management",
      "Hybrid",
      "Morning",
      false,
      "Fox Court - London (Central) SSCS Tribunal-4th Floor, Fox Court, 30 Brooke Street, London",
      "Fox Court",
      "Adjourned",
      "Venue not suitable",
      true,
      false,
      false,
    );
  });

  test("Create hearing summary as a caseworker - hearing outcome is adjourned as witness did not attend.", async ({
    page,
  }): Promise<void> => {
    await createSummary.createSummary(
      page,
      "caseWorker",
      false,
      "Case management",
      "Hybrid",
      "Morning",
      false,
      "Fox Court - London (Central) SSCS Tribunal-4th Floor, Fox Court, 30 Brooke Street, London",
      "Fox Court",
      "Adjourned",
      "Witness did not attend",
      true,
      false,
      false,
    );
  });

  test("Create hearing summary as a caseworker - hearing outcome is adjourned for other reason.", async ({
    page,
  }): Promise<void> => {
    await createSummary.createSummary(
      page,
      "caseWorker",
      false,
      "Case management",
      "Hybrid",
      "Morning",
      false,
      "Fox Court - London (Central) SSCS Tribunal-4th Floor, Fox Court, 30 Brooke Street, London",
      "Fox Court",
      "Adjourned",
      "Other",
      true,
      false,
      false,
    );
  });

  test("Error messaging.", async ({ page }): Promise<void> => {
    await createSummary.createSummary(
      page,
      "caseWorker",
      false,
      "Case management",
      "Hybrid",
      "Morning",
      false,
      "Fox Court - London (Central) SSCS Tribunal-4th Floor, Fox Court, 30 Brooke Street, London",
      "Fox Court",
      "Allowed",
      null,
      true,
      false,
      true,
    );
  });
});

test("Accessibility test - create summary @accessibilityCaseAPI.", async ({
  page,
}): Promise<void> => {
  await createSummary.createSummary(
    page,
    "caseWorker",
    true,
    "Case management",
    "Hybrid",
    "Morning",
    false,
    "Fox Court - London (Central) SSCS Tribunal-4th Floor, Fox Court, 30 Brooke Street, London",
    "Fox Court",
    "Allowed",
    null,
    true,
    false,
    false,
  );
});
