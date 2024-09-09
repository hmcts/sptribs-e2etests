// import { Page } from "@playwright/test";
// import config, { UserRole } from "../tests/config.ts";
// import commonHelpers, {
//   allEvents,
//   caseRegion,
//   Category,
//   ContactPreference,
//   Scheme,
//   SubCategory,
// } from "../tests/helpers/commonHelpers.ts";
// import buildCase from "../tests/journeys/CaseAPI/buildCase.ts";
// import hearingOptions from "../tests/journeys/CaseAPI/hearingOptions.ts";
// import createListing from "../tests/journeys/CaseAPI/createListing.ts";
// import createSummary from "../tests/journeys/CaseAPI/createSummary.ts";
// import DSSCreateCase from "../tests/journeys/DSSCreateCase/createCase.ts";
// import createCase from "../tests/journeys/CaseAPI/createCase.ts";
// import editCaseCategorisationDetailsPage from "../tests/pages/CaseAPI/editCase/editCaseCategorisationDetailsPage.ts";
// import editCaseDateObjectsPage from "../tests/pages/CaseAPI/editCase/editCaseDateObjectsPage.ts";
// import editCaseObjectsSubjectsPage from "../tests/pages/CaseAPI/editCase/editCaseObjectsSubjectsPage.ts";
// import editCaseSubjectDetailsObjectPage from "../tests/pages/CaseAPI/editCase/editCaseSubjectDetailsObjectPage.ts";
// import editCaseApplicantDetailsObjectPage from "../tests/pages/CaseAPI/editCase/editCaseApplicantDetailsObjectPage.ts";
// import editCaseRepresentativeDetailsObjectPage from "../tests/pages/CaseAPI/editCase/editCaseRepresentativeDetailsObjectPage.ts";
// import editCaseObjectsContactsPage from "../tests/pages/CaseAPI/editCase/editCaseObjectsContactsPage.ts";
// import editCaseFurtherDetailsObjectPage from "../tests/pages/CaseAPI/editCase/editCaseFurtherDetailsObjectPage.ts";
// import submitPage from "../tests/pages/CaseAPI/editCase/submitPage.ts";
// import confirmPage from "../tests/pages/CaseAPI/editCase/confirmPage.ts";

// export type initialState =
//   | "DSS Submitted"
//   | "Submitted"
//   | "Case Management"
//   | "Ready to list"
//   | "Awaiting hearing"
//   | "Awaiting outcome";

// type EditCase = {
//   editCase(
//     page: Page,
//     user: UserRole,
//     accessibilityTest: boolean,
//     initialState: initialState,
//     category: Category,
//     subCategory: SubCategory,
//     representative: boolean,
//     applicant: boolean,
//     contactPreference: ContactPreference,
//     representativeQualified: boolean,
//     schemeSelection: Scheme,
//     caseRegionSelection: caseRegion,
//     claimsLinked: boolean,
//     compensationLinked: boolean,
//     tribunalFormsInTime: boolean,
//     applicantExplained: boolean,
//     errorMessaging: boolean,
//   ): Promise<void>;
// };

// const editCase: EditCase = {
//   async editCase(
//     page: Page,
//     user: UserRole,
//     accessibilityTest: boolean,
//     initialState: initialState,
//     category: Category,
//     subCategory: SubCategory,
//     representative: boolean,
//     applicant: boolean,
//     contactPreference: ContactPreference,
//     representativeQualified: boolean,
//     schemeSelection: Scheme,
//     caseRegionSelection: caseRegion,
//     claimsLinked: boolean,
//     compensationLinked: boolean,
//     tribunalFormsInTime: boolean,
//     applicantExplained: boolean,
//     errorMessaging: boolean,
//   ): Promise<void> {
//     let caseNumber: string | void;
//     switch (initialState) {
//       default: // Defaults to Case management
//         let previousEvents: allEvents[] = [];
//         let eventTimes: string[] = [];
//         caseNumber = await buildCase.buildCase(
//           page,
//           previousEvents,
//           eventTimes,
//           true,
//           "caseWorker",
//         );
//         break;
//       case "Ready to list":
//         caseNumber = await hearingOptions.hearingOptions(
//           page,
//           "caseWorker",
//           false,
//           true,
//           "1-London",
//           true,
//           false,
//           "Face to Face",
//           false,
//           false,
//         );
//         break;
//       case "Awaiting hearing":
//         caseNumber = await createListing.createListing(
//           page,
//           "caseWorker",
//           false,
//           true,
//           "1-London",
//           "Case management",
//           "Face to Face",
//           "Morning",
//           false,
//           false,
//           "East London Tribunal Hearing Centre-2 Clove Crescent, East India Dock London",
//           false,
//         );
//         break;
//       case "Awaiting outcome":
//         caseNumber = await createSummary.createSummary(
//           page,
//           "caseWorker",
//           false,
//           "Case management",
//           "Hybrid",
//           "Morning",
//           false,
//           "Fox Court - London (Central) SSCS Tribunal-4th Floor, Fox Court, 30 Brooke Street, London",
//           "Fox Court",
//           "Allowed",
//           null,
//           true,
//           false,
//           false,
//         );
//         break;
//       case "DSS Submitted":
//         caseNumber = await DSSCreateCase.createFEApplication(
//           page,
//           false,
//           "citizen",
//           true,
//           true,
//           true,
//           false,
//           true,
//           false,
//           false,
//           false,
//         );
//         break;
//       case "Submitted":
//         caseNumber = await createCase.createCase(
//           page,
//           "caseWorker",
//           false,
//           "Assessment",
//           "Other",
//           true,
//           true,
//           "Email",
//           true,
//           false,
//           "1996",
//           "Scotland",
//           true,
//           true,
//           true,
//           true,
//           true,
//           false,
//         );
//         break;
//     }
//     if (caseNumber !== undefined) {
//       await commonHelpers.signOutAndGoToCase(
//         page,
//         user,
//         config.CaseAPIBaseURL,
//         caseNumber,
//       );
//       await commonHelpers.chooseEventFromDropdown(page, "Case: Edit case");
//       switch (errorMessaging) {
//         default:
//           await editCaseCategorisationDetailsPage.checkPageLoads(
//             page,
//             caseNumber,
//             accessibilityTest,
//           );
//           await editCaseCategorisationDetailsPage.checkAndFillInFields(
//             page,
//             initialState,
//             category,
//             subCategory,
//           );
//           await editCaseDateObjectsPage.checkPageLoads(
//             page,
//             caseNumber,
//             accessibilityTest,
//           );
//           await editCaseDateObjectsPage.checkAndFillInFields(
//             page,
//             initialState,
//           );
//           await editCaseObjectsSubjectsPage.checkPageLoads(
//             page,
//             caseNumber,
//             accessibilityTest,
//           );
//           await editCaseObjectsSubjectsPage.checkAndFillInFields(
//             page,
//             initialState,
//             representative,
//             applicant,
//             subCategory,
//           );
//           await editCaseSubjectDetailsObjectPage.checkPageLoads(
//             page,
//             caseNumber,
//             accessibilityTest,
//           );
//           await editCaseSubjectDetailsObjectPage.checkFields(
//             page,
//             initialState,
//           );
//           await editCaseSubjectDetailsObjectPage.fillInFields(
//             page,
//             contactPreference,
//             initialState,
//           );
//           if (applicant) {
//             await editCaseApplicantDetailsObjectPage.checkPageLoads(
//               page,
//               caseNumber,
//               accessibilityTest,
//             );
//             await editCaseApplicantDetailsObjectPage.checkFields(
//               page,
//               initialState,
//             );
//             await editCaseApplicantDetailsObjectPage.fillInFields(
//               page,
//               contactPreference,
//             );
//           }
//           if (representative) {
//             await editCaseRepresentativeDetailsObjectPage.checkPageLoads(
//               page,
//               caseNumber,
//               accessibilityTest,
//             );
//             await editCaseRepresentativeDetailsObjectPage.checkFields(
//               page,
//               initialState,
//             );
//             await editCaseRepresentativeDetailsObjectPage.fillInFields(
//               page,
//               contactPreference,
//               representativeQualified,
//             );
//           }
//           await editCaseObjectsContactsPage.checkPageLoads(
//             page,
//             caseNumber,
//             accessibilityTest,
//           );
//           await editCaseObjectsContactsPage.checkAndFillInFields(
//             page,
//             initialState,
//             subCategory,
//             representative,
//             applicant,
//           );
//           await editCaseFurtherDetailsObjectPage.checkPageLoads(
//             page,
//             caseNumber,
//             accessibilityTest,
//           );
//           await editCaseFurtherDetailsObjectPage.checkFields(
//             page,
//             initialState,
//           );
//           await editCaseFurtherDetailsObjectPage.fillInFields(
//             page,
//             schemeSelection,
//             caseRegionSelection,
//             claimsLinked,
//             compensationLinked,
//             tribunalFormsInTime,
//             applicantExplained,
//           );
//           await submitPage.checkPageLoads(
//             page,
//             caseNumber,
//             accessibilityTest,
//             contactPreference,
//             applicant,
//             representative,
//             tribunalFormsInTime,
//           );
//           await submitPage.checkValidInfo(
//             page,
//             contactPreference,
//             applicant,
//             representative,
//             category,
//             subCategory,
//             schemeSelection,
//             caseRegionSelection,
//             representativeQualified,
//             claimsLinked,
//             compensationLinked,
//             tribunalFormsInTime,
//             applicantExplained,
//           );
//           await confirmPage.checkPageLoads(page, caseNumber, accessibilityTest);
//           await confirmPage.continueOn(page);
//           break;
//         case true:
//           await editCaseCategorisationDetailsPage.checkPageLoads(
//             page,
//             caseNumber,
//             accessibilityTest,
//           );
//           await editCaseCategorisationDetailsPage.triggerErrorMessages(page);
//           await editCaseCategorisationDetailsPage.checkAndFillInFields(
//             page,
//             initialState,
//             category,
//             subCategory,
//           );
//           await editCaseDateObjectsPage.checkPageLoads(
//             page,
//             caseNumber,
//             accessibilityTest,
//           );
//           await editCaseDateObjectsPage.triggerErrorMessages(page);
//           await editCaseDateObjectsPage.checkAndFillInFields(
//             page,
//             initialState,
//           );
//           await editCaseObjectsSubjectsPage.checkPageLoads(
//             page,
//             caseNumber,
//             accessibilityTest,
//           );
//           await editCaseObjectsSubjectsPage.triggerErrorMessages(page);
//           await editCaseObjectsSubjectsPage.checkAndFillInFields(
//             page,
//             initialState,
//             representative,
//             applicant,
//             subCategory,
//           );
//           await editCaseSubjectDetailsObjectPage.checkPageLoads(
//             page,
//             caseNumber,
//             accessibilityTest,
//           );
//           await editCaseSubjectDetailsObjectPage.triggerErrorMessages(page);
//           await editCaseSubjectDetailsObjectPage.fillInFields(
//             page,
//             contactPreference,
//             initialState,
//           );
//           await editCaseApplicantDetailsObjectPage.checkPageLoads(
//             page,
//             caseNumber,
//             accessibilityTest,
//           );
//           await editCaseApplicantDetailsObjectPage.triggerErrorMessages(page);
//           await editCaseApplicantDetailsObjectPage.fillInFields(
//             page,
//             contactPreference,
//           );
//           await editCaseRepresentativeDetailsObjectPage.checkPageLoads(
//             page,
//             caseNumber,
//             accessibilityTest,
//           );
//           await editCaseRepresentativeDetailsObjectPage.triggerErrorMessages(
//             page,
//           );
//           await editCaseRepresentativeDetailsObjectPage.fillInFields(
//             page,
//             contactPreference,
//             representativeQualified,
//           );
//           await editCaseObjectsContactsPage.checkPageLoads(
//             page,
//             caseNumber,
//             accessibilityTest,
//           );
//           await editCaseObjectsContactsPage.triggerErrorMessages(page);
//           await editCaseObjectsContactsPage.checkAndFillInFields(
//             page,
//             initialState,
//             subCategory,
//             representative,
//             applicant,
//           );
//           await editCaseFurtherDetailsObjectPage.checkPageLoads(
//             page,
//             caseNumber,
//             accessibilityTest,
//           );
//           await editCaseFurtherDetailsObjectPage.triggerErrorMessages(page);
//           break;
//       }
//     } else {
//       throw new Error("Case number is undefined.");
//     }
//   },
// };

// export default editCase;
