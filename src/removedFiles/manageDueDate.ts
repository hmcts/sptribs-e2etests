// import { Page, expect } from "@playwright/test";
// import config, { UserRole } from "../tests/config.ts";
// import commonHelpers, { State } from "../tests/helpers/commonHelpers.ts";
// import sendOrder from "./sendOrder.ts";
// import selectOrderPage from "../tests/pages/CaseAPI/manageDueDate/selectOrderPage.ts";
// import editDueDatePage from "../tests/pages/CaseAPI/manageDueDate/editDueDatePage.ts";
// import submitPage from "../tests/pages/CaseAPI/manageDueDate/submitPage.ts";
// import manageDueDateConfirmPage from "../tests/pages/CaseAPI/manageDueDate/confirmPage.ts";
//
// type ManageDueDate = {
//   manageDueDate(
//     page: Page,
//     user: UserRole,
//     initialState: State,
//     accessibilityTest: boolean,
//     errorMessaging: boolean,
//     completed: boolean,
//     completedCheckboxChecked: boolean,
//   ): Promise<any>;
// };
//
// const manageDueDate: ManageDueDate = {
//   async manageDueDate(
//     page: Page,
//     user: UserRole,
//     initialState: State,
//     accessibilityTest: boolean,
//     errorMessaging: boolean,
//     completed: boolean,
//     completedCheckboxChecked: boolean,
//   ): Promise<any> {
//     let caseNumber: string;
//     caseNumber = await sendOrder.sendOrder(
//       page,
//       "caseWorker",
//       initialState,
//       "UploadOrder",
//       false,
//       false,
//       completed,
//       true,
//       "1",
//     );
//     await commonHelpers.signOutAndGoToCase(
//       page,
//       user,
//       config.CaseAPIBaseURL,
//       caseNumber,
//     );
//     await commonHelpers.chooseEventFromDropdown(
//       page,
//       "Orders: Manage due date",
//     );
//     await selectOrderPage.checkPageLoads(page, caseNumber, accessibilityTest);
//
//     switch (errorMessaging) {
//       default: // false
//         await selectOrderPage.selectDropdownOption(page);
//         await editDueDatePage.checkPageLoads(
//           page,
//           caseNumber,
//           accessibilityTest,
//         );
//         await editDueDatePage.checkFields(page, completed);
//         await editDueDatePage.fillInFields(
//           page,
//           completed,
//           completedCheckboxChecked,
//         );
//         await submitPage.checkPageLoads(
//           page,
//           caseNumber,
//           accessibilityTest,
//           completed,
//           completedCheckboxChecked,
//         );
//         await submitPage.checkValidInfo(page, completedCheckboxChecked);
//         await submitPage.checkChangeLink(page, caseNumber, accessibilityTest);
//         await submitPage.saveAndContinue(page);
//         await manageDueDateConfirmPage.checkPageLoads(
//           page,
//           accessibilityTest,
//           caseNumber,
//         );
//         await manageDueDateConfirmPage.closeAndReturnToCase(page);
//         expect(page.locator(".alert-message")).toHaveText(
//           ` Case #${caseNumber} has been updated with event: Orders: Manage due date `,
//         );
//         break;
//       case true:
//         await selectOrderPage.triggerErrorMessages(page);
//         await editDueDatePage.checkPageLoads(
//           page,
//           caseNumber,
//           accessibilityTest,
//         );
//         await editDueDatePage.triggerErrorMessages(
//           page,
//           completed,
//           completedCheckboxChecked,
//         );
//         await submitPage.checkPageLoads(
//           page,
//           caseNumber,
//           accessibilityTest,
//           completed,
//           completedCheckboxChecked,
//         );
//     }
//   },
// };
// export default manageDueDate;
