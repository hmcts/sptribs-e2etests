import { test } from "@playwright/test";
import postponeHearing from "../journeys/CaseAPI/postponeHearing.ts";

test.describe("Postpone hearing tests @CaseAPI", (): void => {
  test("Postpone hearing as a caseworker - Appellant is out of country.", async ({
    page,
  }): Promise<void> => {
    await postponeHearing.postponeHearing(
      page,
      "caseWorker",
      false,
      "Appellant is out of country",
      false,
    );
  });

  test("Postpone hearing as a senior caseworker - Appellant seeking legal advice.", async ({
    page,
  }): Promise<void> => {
    await postponeHearing.postponeHearing(
      page,
      "seniorCaseworker",
      false,
      "Appellant seeking legal advice",
      false,
    );
  });

  test("Postpone hearing as a hearing centre admin - Appellant unable to attend face to face.", async ({
    page,
  }): Promise<void> => {
    await postponeHearing.postponeHearing(
      page,
      "hearingCentreAdmin",
      false,
      "Appellant unable to attend face to face,change of hearing format requested",
      false,
    );
  });

  test("Postpone hearing as a hearing centre team lead - Appellant unavailable.", async ({
    page,
  }): Promise<void> => {
    await postponeHearing.postponeHearing(
      page,
      "hearingCentreTeamLead",
      false,
      "Appellant unavailable (holiday/work/appointmaent/unwell)",
      false,
    );
  });

  test("Postpone hearing as a senior judge - Bereavement.", async ({
    page,
  }): Promise<void> => {
    await postponeHearing.postponeHearing(
      page,
      "seniorJudge",
      false,
      "Bereavement",
      false,
    );
  });

  test("Postpone hearing as a caseworker - Case stayed due to Civil proceedings.", async ({
    page,
  }): Promise<void> => {
    await postponeHearing.postponeHearing(
      page,
      "caseWorker",
      false,
      "Case stayed due to Civil proceedings",
      false,
    );
  });

  test("Postpone hearing as a caseworker - CICA requests case be heard by a single Judge.", async ({
    page,
  }): Promise<void> => {
    await postponeHearing.postponeHearing(
      page,
      "caseWorker",
      false,
      "CICA requests case be heard by a single Judge as a Rule 27 decision",
      false,
    );
  });

  test("Postpone hearing as a caseworker - CICA seeking Counsel.", async ({
    page,
  }): Promise<void> => {
    await postponeHearing.postponeHearing(
      page,
      "caseWorker",
      false,
      "CICA seeking Counsel",
      false,
    );
  });

  test("Postpone hearing as a caseworker - extension granted.", async ({
    page,
  }): Promise<void> => {
    await postponeHearing.postponeHearing(
      page,
      "caseWorker",
      false,
      "Extension granted",
      false,
    );
  });

  test("Postpone hearing as a caseworker - Face to face hearing required.", async ({
    page,
  }): Promise<void> => {
    await postponeHearing.postponeHearing(
      page,
      "caseWorker",
      false,
      "Face to face hearing required",
      false,
    );
  });

  // test("Postpone hearing as a caseworker - Last minute submissions.", async ({
  //   page,
  // }): Promise<void> => {
  //   await postponeHearing.postponeHearing(
  //     page,
  //     "caseWorker",
  //     false,
  //     "Last minute submissions i.e. 1-2 weeks prior to hearing",
  //     false,
  //   );
  // });

  test("Postpone hearing as a caseworker - linked cases.", async ({
    page,
  }): Promise<void> => {
    await postponeHearing.postponeHearing(
      page,
      "caseWorker",
      false,
      "Linked cases - to be heard together",
      false,
    );
  });

  test("Postpone hearing as a caseworker - Member excluded.", async ({
    page,
  }): Promise<void> => {
    await postponeHearing.postponeHearing(
      page,
      "caseWorker",
      false,
      "Member excluded - listed in error",
      false,
    );
  });

  // test("Postpone hearing as a caseworker - Representative/Solicitor cannot make contact with Appellant.", async ({
  //   page,
  // }): Promise<void> => {
  //   await postponeHearing.postponeHearing(
  //     page,
  //     "caseWorker",
  //     false,
  //     "Representative/Solicitor cannot make contact with Appellant",
  //     false,
  //   );
  // });

  // test("Postpone hearing as a caseworker - Representative/Solicitor seeking further evidence.", async ({
  //   page,
  // }): Promise<void> => {
  //   await postponeHearing.postponeHearing(
  //     page,
  //     "caseWorker",
  //     false,
  //     "Representative/Solicitor seeking further evidence",
  //     false,
  //   );
  // });

  // test("Postpone hearing as a caseworker - Representative/Solicitor unavailable.", async ({
  //   page,
  // }): Promise<void> => {
  //   await postponeHearing.postponeHearing(
  //     page,
  //     "caseWorker",
  //     false,
  //     "Representative/Solicitor unavailable (holiday/work/appointment/unwell)",
  //     false,
  //   );
  // });

  // test("Postpone hearing as a caseworker - Tribunal members unavailable.", async ({
  //   page,
  // }): Promise<void> => {
  //   await postponeHearing.postponeHearing(
  //     page,
  //     "caseWorker",
  //     false,
  //     "Tribunal members unavailable (holiday/work/appointment/unwell)",
  //     false,
  //   );
  // });

  test("Postpone hearing as a caseworker - Tribunal members deemed listing time directed inadequate.", async ({
    page,
  }): Promise<void> => {
    await postponeHearing.postponeHearing(
      page,
      "caseWorker",
      false,
      "Tribunal members deemed listing time directed inadequate",
      false,
    );
  });

  test("Postpone hearing as a caseworker - other reason.", async ({
    page,
  }): Promise<void> => {
    await postponeHearing.postponeHearing(
      page,
      "caseWorker",
      false,
      "Other",
      false,
    );
  });

  test("Error messaging.", async ({ page }): Promise<void> => {
    await postponeHearing.postponeHearing(
      page,
      "caseWorker",
      false,
      "Other",
      true,
    );
  });
});

test("Accessibility test - postpone hearing @accessibilityCaseAPI.", async ({
  page,
}): Promise<void> => {
  await postponeHearing.postponeHearing(
    page,
    "caseWorker",
    true,
    "Other",
    false,
  );
});
