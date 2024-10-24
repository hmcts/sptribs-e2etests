// import { Page } from "@playwright/test";
// import config, { UserRole } from "../tests/config.ts";
// import closeCase from "./closeCase.ts";
// import commonHelpers from "../tests/helpers/commonHelpers.ts";
// import events_content from "../tests/fixtures/content/CaseAPI/events_content.ts";
// import reinstateWarningPage from "../tests/pages/CaseAPI/reinstateCase/reinstateWarningPage.ts";
// import reinstateReasonPage, {
//   ReinstateReason,
// } from "../tests/pages/CaseAPI/reinstateCase/reinstateReasonPage.ts";
// import reinstateUploadDocumentPage from "../tests/pages/CaseAPI/reinstateCase/reinstateUploadDocumentPage.ts";
// import reinstateCaseNotifyPage from "../tests/pages/CaseAPI/reinstateCase/reinstateCaseNotifyPage.ts";
// import submitPage from "../tests/pages/CaseAPI/reinstateCase/submitPage.ts";
// import confirmPage from "../tests/pages/CaseAPI/reinstateCase/confirmPage.ts";
// import stateTabPage from "../tests/pages/CaseAPI/caseTabs/stateTabPage.ts";
//
// type ReinstateCase = {
//   reinstateCase(
//     page: Page,
//     user: UserRole,
//     accessibilityTest: boolean,
//     errorMessaging: boolean,
//     reinstateReason: ReinstateReason,
//     optionalText: boolean,
//   ): Promise<void>;
// };
//
// const reinstateCase: ReinstateCase = {
//   async reinstateCase(
//     page: Page,
//     user: UserRole,
//     accessibilityTest: boolean,
//     errorMessaging: boolean,
//     reinstateReason: ReinstateReason,
//     optionalText: boolean,
//   ): Promise<void> {
//     const caseNumber = await closeCase.closeCase(
//       page,
//       "caseWorker",
//       false,
//       "Case Management",
//       false,
//       "caseWithdrawn",
//       true,
//       null,
//       null,
//     );
//     await commonHelpers.signOutAndGoToCase(
//       page,
//       user,
//       config.CaseAPIBaseURL,
//       caseNumber,
//     );
//     await commonHelpers.chooseEventFromDropdown(
//       page,
//       events_content.reinstateCase,
//     );
//     await reinstateWarningPage.checkPageLoads(
//       page,
//       caseNumber,
//       accessibilityTest,
//     );
//     await reinstateWarningPage.continueOn(page);
//     switch (errorMessaging) {
//       default:
//         await reinstateReasonPage.checkPageLoads(
//           page,
//           caseNumber,
//           accessibilityTest,
//         );
//         await reinstateReasonPage.continueOn(
//           page,
//           reinstateReason,
//           optionalText,
//         );
//         await reinstateUploadDocumentPage.checkPageLoads(
//           page,
//           caseNumber,
//           accessibilityTest,
//         );
//         await reinstateUploadDocumentPage.continueOn(page);
//         await reinstateCaseNotifyPage.checkPageLoads(
//           page,
//           caseNumber,
//           accessibilityTest,
//         );
//         await reinstateCaseNotifyPage.continueOn(page);
//         await submitPage.checkPageLoads(
//           page,
//           caseNumber,
//           accessibilityTest,
//           optionalText,
//         );
//         await submitPage.checkValidInfo(page, reinstateReason, optionalText);
//         await submitPage.continueOn(page);
//         await confirmPage.checkPageLoads(page, accessibilityTest);
//         await confirmPage.closeAndReturnToCase(page);
//         await stateTabPage.changeToStateTab(page);
//         await stateTabPage.checkStateTab(page, "Case management");
//         break;
//       case true:
//         await reinstateReasonPage.checkPageLoads(
//           page,
//           caseNumber,
//           accessibilityTest,
//         );
//         await reinstateReasonPage.triggerErrorMessages(page);
//         await reinstateUploadDocumentPage.checkPageLoads(
//           page,
//           caseNumber,
//           accessibilityTest,
//         );
//         await reinstateUploadDocumentPage.triggerErrorMessages(page);
//         await reinstateCaseNotifyPage.checkPageLoads(
//           page,
//           caseNumber,
//           accessibilityTest,
//         );
//         await reinstateCaseNotifyPage.triggerErrorMessages(page);
//         break;
//     }
//   },
// };
//
// export default reinstateCase;
