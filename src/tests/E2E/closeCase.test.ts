import { test } from "@playwright/test";
import closeCase from "../../removedFiles/closeCase.ts";

test.describe("Case-API Close case tests. @CaseAPI", () => {
  // Case Management initial state tests
  // test("Close a case management case as it is withdrawn as a caseworker with optional information. @crossbrowserCaseAPI", async ({
  //   page,
  // }): Promise<void> => {
  //   await closeCase.closeCase(
  //     page,
  //     "caseWorker",
  //     false,
  //     "Case Management",
  //     false,
  //     "caseWithdrawn",
  //     true,
  //     null,
  //     null,
  //   );
  // });

  // test("Close a case management case as it is rejected created in error as a senior caseworker with no optional information.", async ({
  //   page,
  // }): Promise<void> => {
  //   await closeCase.closeCase(
  //     page,
  //     "seniorCaseworker",
  //     false,
  //     "Case Management",
  //     false,
  //     "caseRejected",
  //     false,
  //     "createdInError",
  //     null,
  //   );
  // });

  // test("Close a case management case as it is rejected deadline missed as a hearing centre admin with optional information.", async ({
  //   page,
  // }): Promise<void> => {
  //   await closeCase.closeCase(
  //     page,
  //     "hearingCentreAdmin",
  //     false,
  //     "Case Management",
  //     false,
  //     "caseRejected",
  //     true,
  //     "deadlineMissed",
  //     null,
  //   );
  // });

  // test("Close a case management case as it is rejected duplicate case as a hearing centre team lead with no optional information.", async ({
  //   page,
  // }): Promise<void> => {
  //   await closeCase.closeCase(
  //     page,
  //     "hearingCentreTeamLead",
  //     false,
  //     "Case Management",
  //     false,
  //     "caseRejected",
  //     false,
  //     "duplicateCase",
  //     null,
  //   );
  // });

  // test("Close a case management case as it is rejected vexatious litigant as a Senior Judge with optional information.", async ({
  //   page,
  // }): Promise<void> => {
  //   await closeCase.closeCase(
  //     page,
  //     "seniorJudge",
  //     false,
  //     "Case Management",
  //     false,
  //     "caseRejected",
  //     true,
  //     "vexatiousLitigant",
  //     null,
  //   );
  // });

  // test("Close a case management case as it is rejected other reason as a caseworker with no optional information.", async ({
  //   page,
  // }): Promise<void> => {
  //   await closeCase.closeCase(
  //     page,
  //     "caseWorker",
  //     false,
  //     "Case Management",
  //     false,
  //     "caseRejected",
  //     false,
  //     "other",
  //     null,
  //   );
  // });

  // test("Close a case management case as it is strikeout noncompliance with directions as a caseworker with optional information.", async ({
  //   page,
  // }): Promise<void> => {
  //   await closeCase.closeCase(
  //     page,
  //     "caseWorker",
  //     false,
  //     "Case Management",
  //     false,
  //     "caseStrikeOut",
  //     true,
  //     null,
  //     "noncomplianceWithDirections",
  //   );
  // });

  // test("Close a case management case as it is strikeout other reason as a caseworker with no optional information.", async ({
  //   page,
  // }): Promise<void> => {
  //   await closeCase.closeCase(
  //     page,
  //     "caseWorker",
  //     false,
  //     "Case Management",
  //     false,
  //     "caseStrikeOut",
  //     false,
  //     null,
  //     "other",
  //   );
  // });

  // test("Close a case management case as it is a concession as a caseworker with optional information.", async ({
  //   page,
  // }): Promise<void> => {
  //   await closeCase.closeCase(
  //     page,
  //     "caseWorker",
  //     false,
  //     "Case Management",
  //     false,
  //     "caseConcession",
  //     true,
  //     null,
  //     null,
  //   );
  // });

  // test("Close a case management case as it is a consent order as a caseworker with no optional information.", async ({
  //   page,
  // }): Promise<void> => {
  //   await closeCase.closeCase(
  //     page,
  //     "caseWorker",
  //     false,
  //     "Case Management",
  //     false,
  //     "consentOrder",
  //     false,
  //     null,
  //     null,
  //   );
  // });

  test("Close a case management case as it is a rule 27 as a caseworker with optional information.", async ({
    page,
  }): Promise<void> => {
    await closeCase.closeCase(
      page,
      "caseWorker",
      false,
      "Case Management",
      false,
      "rule27",
      true,
      null,
      null,
    );
  });

  // test("Close a case management case due to death of appellant as a caseworker with optional information.", async ({
  //   page,
  // }): Promise<void> => {
  //   await closeCase.closeCase(
  //     page,
  //     "caseWorker",
  //     false,
  //     "Case Management",
  //     false,
  //     "deathOfAppellant",
  //     true,
  //     null,
  //     null,
  //   );
  // });

  test("Close a ready to list case as it is withdrawn as a caseworker with no optional information.", async ({
    page,
  }): Promise<void> => {
    await closeCase.closeCase(
      page,
      "caseWorker",
      false,
      "Ready to list",
      false,
      "caseWithdrawn",
      false,
      null,
      null,
    );
  });

  test("Close a ready to list case as it is rejected created in error as a caseworker with optional information.", async ({
    page,
  }): Promise<void> => {
    await closeCase.closeCase(
      page,
      "caseWorker",
      false,
      "Ready to list",
      false,
      "caseRejected",
      true,
      "createdInError",
      null,
    );
  });

  test("Close a ready to list case as it is rejected deadline missed as a caseworker with no optional information.", async ({
    page,
  }): Promise<void> => {
    await closeCase.closeCase(
      page,
      "caseWorker",
      false,
      "Ready to list",
      false,
      "caseRejected",
      false,
      "deadlineMissed",
      null,
    );
  });

  test("Close a ready to list case as it is rejected duplicate case as a caseworker with optional information.", async ({
    page,
  }): Promise<void> => {
    await closeCase.closeCase(
      page,
      "caseWorker",
      false,
      "Ready to list",
      false,
      "caseRejected",
      true,
      "duplicateCase",
      null,
    );
  });

  test("Close a ready to list case as it is rejected vexatious litigant as a caseworker with no optional information.", async ({
    page,
  }): Promise<void> => {
    await closeCase.closeCase(
      page,
      "caseWorker",
      false,
      "Ready to list",
      false,
      "caseRejected",
      false,
      "vexatiousLitigant",
      null,
    );
  });

  test("Close a ready to list case as it is rejected other reason as a caseworker with optional information.", async ({
    page,
  }): Promise<void> => {
    await closeCase.closeCase(
      page,
      "caseWorker",
      false,
      "Ready to list",
      false,
      "caseRejected",
      true,
      "other",
      null,
    );
  });

  test("Close a ready to list case as it is strikeout noncompliance with directions as a caseworker with no optional information.", async ({
    page,
  }): Promise<void> => {
    await closeCase.closeCase(
      page,
      "caseWorker",
      false,
      "Ready to list",
      false,
      "caseStrikeOut",
      false,
      null,
      "noncomplianceWithDirections",
    );
  });

  test("Close a ready to list case as it is strikeout other reason as a caseworker with optional information.", async ({
    page,
  }): Promise<void> => {
    await closeCase.closeCase(
      page,
      "caseWorker",
      false,
      "Ready to list",
      false,
      "caseStrikeOut",
      true,
      null,
      "other",
    );
  });

  test("Close a ready to list case as it is a concession as a caseworker with no optional information.", async ({
    page,
  }): Promise<void> => {
    await closeCase.closeCase(
      page,
      "caseWorker",
      false,
      "Ready to list",
      false,
      "caseConcession",
      false,
      null,
      null,
    );
  });

  test("Close a ready to list case as it is a consent order as a caseworker with optional information.", async ({
    page,
  }): Promise<void> => {
    await closeCase.closeCase(
      page,
      "caseWorker",
      false,
      "Ready to list",
      false,
      "consentOrder",
      true,
      null,
      null,
    );
  });

  test("Close a ready to list case as it is a rule 27 as a caseworker with no optional information. @crossbrowserCaseAPI", async ({
    page,
  }): Promise<void> => {
    await closeCase.closeCase(
      page,
      "caseWorker",
      false,
      "Ready to list",
      false,
      "rule27",
      false,
      null,
      null,
    );
  });

  test("Close a ready to list case due to death of appellant as a caseworker with no optional information.", async ({
    page,
  }): Promise<void> => {
    await closeCase.closeCase(
      page,
      "caseWorker",
      false,
      "Ready to list",
      false,
      "deathOfAppellant",
      false,
      null,
      null,
    );
  });

  test("Error messaging - Close Case. @crossbrowserCaseAPI", async ({
    page,
  }): Promise<void> => {
    await closeCase.closeCase(
      page,
      "caseWorker",
      false,
      "Case Management",
      true,
      "rule27",
      false,
      null,
      null,
    );
  });
});

test("Accessibility test - Close case @accessibilityCaseAPI", async ({
  page,
}): Promise<void> => {
  await closeCase.closeCase(
    page,
    "caseWorker",
    true,
    "Case Management",
    true,
    "rule27",
    false,
    null,
    null,
  );
});
