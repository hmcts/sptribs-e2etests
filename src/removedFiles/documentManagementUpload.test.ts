// import { test } from "@playwright/test";
// import documentManagementUpload from "../../removedFiles/documentManagementUpload.ts";
//
// test.describe("Case-API Upload document tests. @CaseAPI", () => {
//   test("Upload a document to a submitted case as a caseworker. @crossbrowserCaseAPI", async ({
//     page,
//   }): Promise<void> => {
//     await documentManagementUpload.documentManagementUpload(
//       page,
//       "caseWorker",
//       false,
//       "Submitted",
//       false,
//       false,
//     );
//   });
//
//   test("Upload multiple documents to a case management case as a senior caseworker.", async ({
//     page,
//   }): Promise<void> => {
//     await documentManagementUpload.documentManagementUpload(
//       page,
//       "seniorCaseworker",
//       false,
//       "Case Management",
//       true,
//       false,
//     );
//   });
//
//   test("Upload a document to a ready to list case as a hearing centre admin.", async ({
//     page,
//   }): Promise<void> => {
//     await documentManagementUpload.documentManagementUpload(
//       page,
//       "hearingCentreAdmin",
//       false,
//       "Ready to list",
//       false,
//       false,
//     );
//   });
//
//   test("Upload multiple documents to an awaiting hearing case as a hearing centre team lead.", async ({
//     page,
//   }): Promise<void> => {
//     await documentManagementUpload.documentManagementUpload(
//       page,
//       "hearingCentreTeamLead",
//       false,
//       "Awaiting hearing",
//       true,
//       false,
//     );
//   });
//
//   test("Upload a document to an awaiting outcome case as a senior judge.", async ({
//     page,
//   }): Promise<void> => {
//     await documentManagementUpload.documentManagementUpload(
//       page,
//       "seniorJudge",
//       false,
//       "Awaiting outcome",
//       false,
//       false,
//     );
//   });
//
//   test("Upload multiple documents to a closed case as a respondent.", async ({
//     page,
//   }): Promise<void> => {
//     await documentManagementUpload.documentManagementUpload(
//       page,
//       "respondent",
//       false,
//       "Case closed",
//       true,
//       false,
//     );
//   });
//
//   test("Upload a document to a stayed case as a caseworker. @crossbrowserCaseAPI", async ({
//     page,
//   }): Promise<void> => {
//     await documentManagementUpload.documentManagementUpload(
//       page,
//       "caseWorker",
//       false,
//       "Case stayed",
//       false,
//       false,
//     );
//   });
//
//   test("Error messaging. @crossbrowserCaseAPI", async ({
//     page,
//   }): Promise<void> => {
//     await documentManagementUpload.documentManagementUpload(
//       page,
//       "caseWorker",
//       false,
//       "Submitted",
//       false,
//       true,
//     );
//   });
// });
//
// test("Accessibility tests - Document management: Upload @accessibilityCaseAPI", async ({
//   page,
// }): Promise<void> => {
//   await documentManagementUpload.documentManagementUpload(
//     page,
//     "caseWorker",
//     true,
//     "Submitted",
//     false,
//     false,
//   );
// });
