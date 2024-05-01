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
      "Allowed",
      null,
      false,
      false,
    );
  });

  test("Create and edit hearing summary as a caseworker - hearing outcome is allowed.", async ({
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
      "Allowed",
      null,
      true,
      false,
    );
  });

  test("Create hearing summary as a caseworker - hearing over multiple days.", async ({
    page,
  }): Promise<void> => {
    await createSummary.createSummary(
      page,
      "caseWorker",
      false,
      "Case management",
      "Hybrid",
      "Morning",
      true,
      "Fox Court - London (Central) SSCS Tribunal-4th Floor, Fox Court, 30 Brooke Street, London",
      "Allowed",
      null,
      true,
      false,
    );
  });

  test("Create hearing summary as a caseworker - hearing outcome is refused.", async ({
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
      "Refused",
      null,
      false,
      false,
    );
  });

  test("Create hearing summary as a caseworker - hearing outcome is withdrawn at hearing.", async ({
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
      "Withdrawn at Hearing",
      null,
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
      "Adjourned",
      "Adjourned to face to face",
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
      "Adjourned",
      "Adjourned to Video",
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
      "Adjourned",
      "Admin error",
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
      "Adjourned",
      "Appellant did not attend",
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
      "Adjourned",
      "Appellant did not have bundle",
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
      "Adjourned",
      "Appellant not ready to proceed",
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
      "Adjourned",
      "Complex case",
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
      "Adjourned",
      "Failure to comply with directions",
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
      "Adjourned",
      "For Legal Rep/No Sol",
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
      "Adjourned",
      "For Other Parties to Attend",
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
      "Adjourned",
      "Further evidence received at hearing",
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
      "Adjourned",
      "Further evidence supplied but not before Tribunal at hearing",
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
      "Adjourned",
      "Further Loss of Earnings information required - Appellant",
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
      "Adjourned",
      "Further Loss of Earnings information required - Respondent",
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
      "Adjourned",
      "Further medical evidence required - Appellant",
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
      "Adjourned",
      "Further medical evidence required - Respondent",
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
      "Adjourned",
      "Further police evidence required - Respondent",
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
      "Adjourned",
      "Further police evidence required - Appellant",
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
      "Adjourned",
      "Further police evidence required - HMCTS (Summons)",
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
      "Adjourned",
      "Insufficient time",
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
      "Adjourned",
      "Interpreter required",
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
      "Adjourned",
      "Member Unable to Attend",
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
      "Adjourned",
      "PO did not attend",
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
      "Adjourned",
      "Poor Evidence",
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
      "Adjourned",
      "Venue not suitable",
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
      "Adjourned",
      "Witness did not attend",
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
      "Adjourned",
      "Other",
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
      "Allowed",
      null,
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
    "Allowed",
    null,
    false,
    false,
  );
});
