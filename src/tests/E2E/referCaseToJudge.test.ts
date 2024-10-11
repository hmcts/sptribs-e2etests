import { test } from "@playwright/test";
import referCaseToJudge from "../../removedFiles/referCaseToJudge.ts";

test.describe("Case-API Refer case to judge tests. @CaseAPI", () => {
  // test("Refer case to judge as a caseworker - case management, listing directions @crossbrowserCaseAPI", async ({
  //   page,
  // }): Promise<void> => {
  //   await referCaseToJudge.referCaseToJudge(
  //     page,
  //     "caseWorker",
  //     false,
  //     "Case Management",
  //     "Listing directions",
  //     false,
  //   );
  // });

  // test("Refer case to judge as a senior caseworker - case management, new case", async ({
  //   page,
  // }): Promise<void> => {
  //   await referCaseToJudge.referCaseToJudge(
  //     page,
  //     "seniorCaseworker",
  //     false,
  //     "Case Management",
  //     "New case",
  //     false,
  //   );
  // });

  // test("Refer case to judge as a hearing centre team lead - case management, rule 27 request", async ({
  //   page,
  // }): Promise<void> => {
  //   await referCaseToJudge.referCaseToJudge(
  //     page,
  //     "hearingCentreTeamLead",
  //     false,
  //     "Case Management",
  //     "Rule 27 request",
  //     false,
  //   );
  // });

  // test("Refer case to judge as a hearing centre admin - case management, stay request", async ({
  //   page,
  // }): Promise<void> => {
  //   await referCaseToJudge.referCaseToJudge(
  //     page,
  //     "hearingCentreAdmin",
  //     false,
  //     "Case Management",
  //     "Stay request",
  //     false,
  //   );
  // });

  // test("Refer case to judge as a caseworker - case management, strike out request", async ({
  //   page,
  // }): Promise<void> => {
  //   await referCaseToJudge.referCaseToJudge(
  //     page,
  //     "caseWorker",
  //     false,
  //     "Case Management",
  //     "Strike out request",
  //     false,
  //   );
  // });

  // test("Refer case to judge as a caseworker - case management, time extension request", async ({
  //   page,
  // }): Promise<void> => {
  //   await referCaseToJudge.referCaseToJudge(
  //     page,
  //     "caseWorker",
  //     false,
  //     "Case Management",
  //     "Time extension request",
  //     false,
  //   );
  // });

  // test("Refer case to judge as a caseworker - case management, withdrawal request", async ({
  //   page,
  // }): Promise<void> => {
  //   await referCaseToJudge.referCaseToJudge(
  //     page,
  //     "caseWorker",
  //     false,
  //     "Case Management",
  //     "Withdrawal request",
  //     false,
  //   );
  // });

  // test("Refer case to judge as a caseworker - case management, other reason", async ({
  //   page,
  // }): Promise<void> => {
  //   await referCaseToJudge.referCaseToJudge(
  //     page,
  //     "caseWorker",
  //     false,
  //     "Case Management",
  //     "Other",
  //     false,
  //   );
  // });

  // test("Refer case to judge as a caseworker - ready to list, listing directions", async ({
  //   page,
  // }): Promise<void> => {
  //   await referCaseToJudge.referCaseToJudge(
  //     page,
  //     "caseWorker",
  //     false,
  //     "Ready to list",
  //     "Listing directions",
  //     false,
  //   );
  // });

  test("Refer case to judge as a hearing centre team lead - ready to list, rule 27 request", async ({
    page,
  }): Promise<void> => {
    await referCaseToJudge.referCaseToJudge(
      page,
      "hearingCentreTeamLead",
      false,
      "Ready to list",
      "Rule 27 request",
      false,
    );
  });

  test("Refer case to judge as a hearing centre admin - ready to list, stay request", async ({
    page,
  }): Promise<void> => {
    await referCaseToJudge.referCaseToJudge(
      page,
      "hearingCentreAdmin",
      false,
      "Ready to list",
      "Stay request",
      false,
    );
  });

  test("Refer case to judge as a caseworker - ready to list, strike out request", async ({
    page,
  }): Promise<void> => {
    await referCaseToJudge.referCaseToJudge(
      page,
      "caseWorker",
      false,
      "Ready to list",
      "Strike out request",
      false,
    );
  });

  test("Refer case to judge as a caseworker - ready to list, time extension request", async ({
    page,
  }): Promise<void> => {
    await referCaseToJudge.referCaseToJudge(
      page,
      "caseWorker",
      false,
      "Ready to list",
      "Time extension request",
      false,
    );
  });

  test("Refer case to judge as a caseworker - ready to list, withdrawal request", async ({
    page,
  }): Promise<void> => {
    await referCaseToJudge.referCaseToJudge(
      page,
      "caseWorker",
      false,
      "Ready to list",
      "Withdrawal request",
      false,
    );
  });

  test("Refer case to judge as a caseworker - ready to list, other reason", async ({
    page,
  }): Promise<void> => {
    await referCaseToJudge.referCaseToJudge(
      page,
      "caseWorker",
      false,
      "Ready to list",
      "Other",
      false,
    );
  });

  test("Refer case to judge as a caseworker - awaiting hearing, listed case", async ({
    page,
  }): Promise<void> => {
    await referCaseToJudge.referCaseToJudge(
      page,
      "caseWorker",
      false,
      "Awaiting hearing",
      "Listed case",
      false,
    );
  });

  test("Refer case to judge as a caseworker - awaiting hearing, listed case (within 5 days)", async ({
    page,
  }): Promise<void> => {
    await referCaseToJudge.referCaseToJudge(
      page,
      "caseWorker",
      false,
      "Awaiting hearing",
      "Listed case (within 5 days)",
      false,
    );
  });

  test("Refer case to judge as a caseworker - awaiting hearing, postponement request", async ({
    page,
  }): Promise<void> => {
    await referCaseToJudge.referCaseToJudge(
      page,
      "caseWorker",
      false,
      "Awaiting hearing",
      "Postponement request",
      false,
    );
  });

  test("Refer case to judge as a hearing centre team lead - awaiting hearing, rule 27 request", async ({
    page,
  }): Promise<void> => {
    await referCaseToJudge.referCaseToJudge(
      page,
      "hearingCentreTeamLead",
      false,
      "Awaiting hearing",
      "Rule 27 request",
      false,
    );
  });

  test("Refer case to judge as a hearing centre admin - awaiting hearing, stay request", async ({
    page,
  }): Promise<void> => {
    await referCaseToJudge.referCaseToJudge(
      page,
      "hearingCentreAdmin",
      false,
      "Awaiting hearing",
      "Stay request",
      false,
    );
  });

  test("Refer case to judge as a caseworker - awaiting hearing, strike out request", async ({
    page,
  }): Promise<void> => {
    await referCaseToJudge.referCaseToJudge(
      page,
      "caseWorker",
      false,
      "Awaiting hearing",
      "Strike out request",
      false,
    );
  });

  test("Refer case to judge as a caseworker - awaiting hearing, time extension request", async ({
    page,
  }): Promise<void> => {
    await referCaseToJudge.referCaseToJudge(
      page,
      "caseWorker",
      false,
      "Awaiting hearing",
      "Time extension request",
      false,
    );
  });

  test("Refer case to judge as a caseworker - awaiting hearing, withdrawal request", async ({
    page,
  }): Promise<void> => {
    await referCaseToJudge.referCaseToJudge(
      page,
      "caseWorker",
      false,
      "Awaiting hearing",
      "Withdrawal request",
      false,
    );
  });

  // test("Refer case to judge as a caseworker - awaiting hearing, other reason", async ({
  //   page,
  // }): Promise<void> => {
  //   await referCaseToJudge.referCaseToJudge(
  //     page,
  //     "caseWorker",
  //     false,
  //     "Awaiting hearing",
  //     "Other",
  //     false,
  //   );
  // });

  test("Refer case to judge as a caseworker - awaiting outcome, listing directions", async ({
    page,
  }): Promise<void> => {
    await referCaseToJudge.referCaseToJudge(
      page,
      "caseWorker",
      false,
      "Awaiting outcome",
      "Listing directions",
      false,
    );
  });

  test("Refer case to judge as a hearing centre team lead - awaiting outcome, rule 27 request @crossbrowserCaseAPI", async ({
    page,
  }): Promise<void> => {
    await referCaseToJudge.referCaseToJudge(
      page,
      "hearingCentreTeamLead",
      false,
      "Awaiting outcome",
      "Rule 27 request",
      false,
    );
  });

  test("Refer case to judge as a hearing centre admin - awaiting outcome, stay request", async ({
    page,
  }): Promise<void> => {
    await referCaseToJudge.referCaseToJudge(
      page,
      "hearingCentreAdmin",
      false,
      "Awaiting outcome",
      "Stay request",
      false,
    );
  });

  test("Refer case to judge as a caseworker - awaiting outcome, strike out request", async ({
    page,
  }): Promise<void> => {
    await referCaseToJudge.referCaseToJudge(
      page,
      "caseWorker",
      false,
      "Awaiting outcome",
      "Strike out request",
      false,
    );
  });

  test("Refer case to judge as a caseworker - awaiting outcome, time extension request", async ({
    page,
  }): Promise<void> => {
    await referCaseToJudge.referCaseToJudge(
      page,
      "caseWorker",
      false,
      "Awaiting outcome",
      "Time extension request",
      false,
    );
  });

  test("Refer case to judge as a caseworker - awaiting outcome, withdrawal request", async ({
    page,
  }): Promise<void> => {
    await referCaseToJudge.referCaseToJudge(
      page,
      "caseWorker",
      false,
      "Awaiting outcome",
      "Withdrawal request",
      false,
    );
  });

  test("Refer case to judge as a caseworker - awaiting outcome, other reason", async ({
    page,
  }): Promise<void> => {
    await referCaseToJudge.referCaseToJudge(
      page,
      "caseWorker",
      false,
      "Awaiting outcome",
      "Other",
      false,
    );
  });

  test("Refer case to judge as a caseworker - case stayed, listing directions", async ({
    page,
  }): Promise<void> => {
    await referCaseToJudge.referCaseToJudge(
      page,
      "caseWorker",
      false,
      "Case stayed",
      "Listing directions",
      false,
    );
  });

  test("Refer case to judge as a hearing centre team lead - case stayed, rule 27 request", async ({
    page,
  }): Promise<void> => {
    await referCaseToJudge.referCaseToJudge(
      page,
      "hearingCentreTeamLead",
      false,
      "Case stayed",
      "Rule 27 request",
      false,
    );
  });

  test("Refer case to judge as a hearing centre admin - case stayed, stay request", async ({
    page,
  }): Promise<void> => {
    await referCaseToJudge.referCaseToJudge(
      page,
      "hearingCentreAdmin",
      false,
      "Case stayed",
      "Stay request",
      false,
    );
  });

  test("Refer case to judge as a caseworker - case stayed, strike out request", async ({
    page,
  }): Promise<void> => {
    await referCaseToJudge.referCaseToJudge(
      page,
      "caseWorker",
      false,
      "Case stayed",
      "Strike out request",
      false,
    );
  });

  test("Refer case to judge as a caseworker - case stayed, time extension request", async ({
    page,
  }): Promise<void> => {
    await referCaseToJudge.referCaseToJudge(
      page,
      "caseWorker",
      false,
      "Case stayed",
      "Time extension request",
      false,
    );
  });

  test("Refer case to judge as a caseworker - case stayed, withdrawal request", async ({
    page,
  }): Promise<void> => {
    await referCaseToJudge.referCaseToJudge(
      page,
      "caseWorker",
      false,
      "Case stayed",
      "Withdrawal request",
      false,
    );
  });

  test("Refer case to judge as a caseworker - case stayed, other reason", async ({
    page,
  }): Promise<void> => {
    await referCaseToJudge.referCaseToJudge(
      page,
      "caseWorker",
      false,
      "Case stayed",
      "Other",
      false,
    );
  });

  test("Refer case to judge as a hearing centre team lead - case closed, corrections", async ({
    page,
  }): Promise<void> => {
    await referCaseToJudge.referCaseToJudge(
      page,
      "hearingCentreTeamLead",
      false,
      "Case closed",
      "Corrections",
      false,
    );
  });

  test("Refer case to judge as a hearing centre admin - case closed, listing directions", async ({
    page,
  }): Promise<void> => {
    await referCaseToJudge.referCaseToJudge(
      page,
      "hearingCentreAdmin",
      false,
      "Case closed",
      "Listing directions",
      false,
    );
  });

  test("Refer case to judge as a caseworker - case closed, reinstatement request", async ({
    page,
  }): Promise<void> => {
    await referCaseToJudge.referCaseToJudge(
      page,
      "caseWorker",
      false,
      "Case closed",
      "Reinstatement request",
      false,
    );
  });

  test("Refer case to judge as a caseworker - case closed, set aside request", async ({
    page,
  }): Promise<void> => {
    await referCaseToJudge.referCaseToJudge(
      page,
      "caseWorker",
      false,
      "Case closed",
      "Set aside request",
      false,
    );
  });

  test("Refer case to judge as a caseworker - case closed, written reasons request", async ({
    page,
  }): Promise<void> => {
    await referCaseToJudge.referCaseToJudge(
      page,
      "caseWorker",
      false,
      "Case closed",
      "Written reasons request",
      false,
    );
  });
  //
  // test("Refer case to judge as a caseworker - case closed, other reason", async ({
  //   page,
  // }): Promise<void> => {
  //   await referCaseToJudge.referCaseToJudge(
  //     page,
  //     "caseWorker",
  //     false,
  //     "Case closed",
  //     "Other",
  //     false,
  //   );
  // });

  // test("Error messaging. @crossbrowserCaseAPI", async ({
  //   page,
  // }): Promise<void> => {
  //   await referCaseToJudge.referCaseToJudge(
  //     page,
  //     "caseWorker",
  //     false,
  //     "Case Management",
  //     "Listing directions",
  //     true,
  //   );
  // });
});

// test("Accessibility test - refer case to judge @accessibilityCaseAPI", async ({
//   page,
// }): Promise<void> => {
//   await referCaseToJudge.referCaseToJudge(
//     page,
//     "caseWorker",
//     true,
//     "Case Management",
//     "Listing directions",
//     false,
//   );
// });
