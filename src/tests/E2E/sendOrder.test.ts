// import { test } from "@playwright/test";
// import sendOrder from "../../removedFiles/sendOrder.ts";

// test.describe("Send order tests @CaseAPI", () => {
//   test("Send a draft order in the Case Management state as a caseworker @crossbrowserCaseAPI", async ({
//     page,
//   }): Promise<void> => {
//     await sendOrder.sendOrder(
//       page,
//       "caseWorker",
//       "Case Management",
//       "DraftOrder",
//       false,
//       false,
//       false,
//       true,
//       "1",
//     );
//   });

test("Send a draft order in the Ready to list state as a seniorCaseworker", async ({
  page,
}): Promise<void> => {
  await sendOrder.sendOrder(
    page,
    "seniorCaseworker",
    "Ready to list",
    "DraftOrder",
    false,
    false,
    true,
    false,
    "3",
  );
});

//   test("Send a draft order in the Awaiting Hearing state as a hearingCentreAdmin", async ({
//     page,
//   }): Promise<void> => {
//     await sendOrder.sendOrder(
//       page,
//       "hearingCentreAdmin",
//       "Awaiting Hearing",
//       "DraftOrder",
//       false,
//       false,
//       true,
//       true,
//       "5",
//     );
//   });

test("Send a draft order in the Case Stayed state as a hearingCentreTeamLead", async ({
  page,
}): Promise<void> => {
  await sendOrder.sendOrder(
    page,
    "hearingCentreTeamLead",
    "Case Stayed",
    "DraftOrder",
    false,
    false,
    false,
    true,
    "7",
  );
});

//   test("Send a draft order in the Case closed state as a seniorJudge", async ({
//     page,
//   }): Promise<void> => {
//     await sendOrder.sendOrder(
//       page,
//       "seniorJudge",
//       "Case closed",
//       "DraftOrder",
//       false,
//       false,
//       true,
//       false,
//       "1",
//     );
//   });

//   test("Send a draft order in the case management state as a judge", async ({
//     page,
//   }): Promise<void> => {
//     await sendOrder.sendOrder(
//       page,
//       "judge",
//       "Case Management",
//       "DraftOrder",
//       false,
//       false,
//       true,
//       true,
//       "3",
//     );
//   });

//   test("Send a upload order in the case management state as a caseworker @crossbrowserCaseAPI", async ({
//     page,
//   }): Promise<void> => {
//     await sendOrder.sendOrder(
//       page,
//       "caseWorker",
//       "Case Management",
//       "UploadOrder",
//       false,
//       false,
//       true,
//       true,
//       "5",
//     );
//   });

test("Send a upload order in the Ready to list state as a seniorCaseworker", async ({
  page,
}): Promise<void> => {
  await sendOrder.sendOrder(
    page,
    "seniorCaseworker",
    "Ready to list",
    "UploadOrder",
    false,
    false,
    true,
    false,
    "7",
  );
});

//   test("Send a upload order in the Awaiting Hearing state as a hearingCentreAdmin", async ({
//     page,
//   }): Promise<void> => {
//     await sendOrder.sendOrder(
//       page,
//       "hearingCentreAdmin",
//       "Awaiting Hearing",
//       "UploadOrder",
//       false,
//       false,
//       true,
//       true,
//       "1",
//     );
//   });

test("Send a upload order in the Case Stayed state as a hearingCentreTeamLead", async ({
  page,
}): Promise<void> => {
  await sendOrder.sendOrder(
    page,
    "hearingCentreTeamLead",
    "Case Stayed",
    "UploadOrder",
    false,
    false,
    false,
    true,
    "3",
  );
});

//   test("Send a upload order in the Case closed state as a seniorJudge", async ({
//     page,
//   }): Promise<void> => {
//     await sendOrder.sendOrder(
//       page,
//       "seniorJudge",
//       "Case closed",
//       "UploadOrder",
//       false,
//       false,
//       true,
//       false,
//       "5",
//     );
//   });

//   test("Send a upload order in the case management state as a judge", async ({
//     page,
//   }): Promise<void> => {
//     await sendOrder.sendOrder(
//       page,
//       "judge",
//       "Case Management",
//       "UploadOrder",
//       false,
//       false,
//       true,
//       true,
//       "7",
//     );
//   });

//   test("Error messaging - Send order @crossbrowserCaseAPI", async ({
//     page,
//   }): Promise<void> => {
//     await sendOrder.sendOrder(
//       page,
//       "caseWorker",
//       "Case Management",
//       "UploadOrder",
//       false,
//       true,
//       true,
//       true,
//       "1",
//     );
//   });
// });

// test("Accessibility test - Send order @accessibilityCaseAPI", async ({
//   page,
// }): Promise<void> => {
//   await sendOrder.sendOrder(
//     page,
//     "caseWorker",
//     "Case Management",
//     "UploadOrder",
//     true,
//     true,
//     true,
//     true,
//     "1",
//   );
// });
