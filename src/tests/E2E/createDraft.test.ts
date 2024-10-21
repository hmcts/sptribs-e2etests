// import { test } from "@playwright/test";
// import createDraft from "./createDraft.ts";

// test.describe("Case-API Create draft tests. @CaseAPI", () => {
// test("As a Caseworker create a CIC3 draft in the Case Management state. @crossbrowserCaseAPI", async ({
//   page,
// }) => {
//   await createDraft.createDraft(
//     page,
//     "caseWorker",
//     "Case Management",
//     false,
//     false,
//     "CIC3 - Rule 27",
//   );
// });

test("As a Senior Caseworker create a CIC6 draft in the Ready to list state. @crossbrowserCaseAPI", async ({
  page,
}) => {
  await createDraft.createDraft(
    page,
    "seniorCaseworker",
    "Ready to list",
    false,
    false,
    "CIC6 - General Directions",
  );
});

// test("As a hearing centre admin create a CIC7 draft in the Awaiting Hearing state.", async ({
//   page,
// }) => {
//   await createDraft.createDraft(
//     page,
//     "hearingCentreAdmin",
//     "Awaiting Hearing",
//     false,
//     false,
//     "CIC7 - ME Dmi Reports",
//   );
// });

  test("As a hearing Centre Team Lead create a CIC8 draft in the Case Stayed state.", async ({
    page,
  }) => {
    await createDraft.createDraft(
      page,
      "hearingCentreTeamLead",
      "Case Stayed",
      false,
      false,
      "CIC8 - ME Joint Instruction",
    );
  });
//
//   test("As a Senior Judge create a CIC10 draft in the Case closed state.", async ({
//     page,
//   }) => {
//     await createDraft.createDraft(
//       page,
//       "seniorJudge",
//       "Case closed",
//       false,
//       false,
//       "CIC10 - Strike Out Warning",
//     );
//   });
//
//   test("As a Judge create a CIC13 draft in the case management state.", async ({
//     page,
//   }) => {
//     await createDraft.createDraft(
//       page,
//       "judge",
//       "Case Management",
//       false,
//       false,
//       "CIC13 - Pro Forma Summons",
//     );
//   });
//
//   test("As a Caseworker create a CIC14 draft in the case management state.", async ({
//     page,
//   }) => {
//     await createDraft.createDraft(
//       page,
//       "caseWorker",
//       "Case Management",
//       false,
//       false,
//       "CIC14 – LO General Directions",
//     );
//   });
//
  test("Error messaging - Create draft @crossbrowserCaseAPI", async ({
    page,
  }) => {
    await createDraft.createDraft(
      page,
      "caseWorker",
      "Case Management",
      false,
      true,
      "CIC14 – LO General Directions",
    );
  });
// });
//
// test("Accessibility test - Create draft @accessibilityCaseAPI", async ({
//   page,
// }): Promise<void> => {
//   await createDraft.createDraft(
//     page,
//     "caseWorker",
//     "Case Management",
//     true,
//     false,
//     "CIC14 – LO General Directions",
//   );
// });
