import { Page } from "@playwright/test";
import config, { UserRole } from "../../config.ts";
import commonHelpers, {
  allEvents,
  caseRegion,
  Category,
  ContactPreference,
  Scheme,
  SubCategory,
} from "../../helpers/commonHelpers.ts";
import buildCase from "./buildCase.ts";
import hearingOptions from "./hearingOptions.ts";
import createListing from "./createListing.ts";
import createSummary from "./createSummary.ts";
import DSSCreateCase from "../DSSCreateCase/createCase.ts";
import createCase from "./createCase.ts";
import editCaseCategorisationDetailsPage from "../../pages/CaseAPI/editCase/editCaseCategorisationDetailsPage.ts";
import editCaseDateObjectsPage from "../../pages/CaseAPI/editCase/editCaseDateObjectsPage.ts";

export type initialState =
  | "DSS Submitted"
  | "Submitted"
  | "Case Management"
  | "Ready to list"
  | "Awaiting hearing"
  | "Awaiting outcome";

type EditCase = {
  editCase(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
    initialState: initialState,
    category: Category,
    subCategory: SubCategory,
    representative: boolean,
    applicant: boolean,
    contactPreference: ContactPreference,
    representativeQualified: boolean,
    multipleFiles: boolean,
    schemeSelection: Scheme,
    caseRegionSelection: caseRegion,
    claimsLinked: boolean,
    compensationLinked: boolean,
    tribunalFormsInTime: boolean,
    applicantExplained: boolean,
    errorMessaging: boolean,
  ): Promise<void>;
};

const editCase: EditCase = {
  async editCase(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
    initialState: initialState,
    category: Category,
    subCategory: SubCategory,
    representative: boolean,
    applicant: boolean,
    contactPreference: ContactPreference,
    representativeQualified: boolean,
    multipleFiles: boolean,
    schemeSelection: Scheme,
    caseRegionSelection: caseRegion,
    claimsLinked: boolean,
    compensationLinked: boolean,
    tribunalFormsInTime: boolean,
    applicantExplained: boolean,
    errorMessaging: boolean,
  ): Promise<void> {
    let caseNumber: string | void;
    switch (initialState) {
      default: // Defaults to Case management
        let previousEvents: allEvents[] = [];
        let eventTimes: string[] = [];
        caseNumber = await buildCase.buildCase(
          page,
          previousEvents,
          eventTimes,
          true,
          "caseWorker",
        );
        break;
      case "Ready to list":
        caseNumber = await hearingOptions.hearingOptions(
          page,
          "caseWorker",
          false,
          true,
          "1-London",
          true,
          false,
          "Face to Face",
          false,
          false,
        );
        break;
      case "Awaiting hearing":
        caseNumber = await createListing.createListing(
          page,
          "caseWorker",
          false,
          true,
          "1-London",
          "Case management",
          "Face to Face",
          "Morning",
          false,
          false,
          "East London Tribunal Hearing Centre-2 Clove Crescent, East India Dock London",
          false,
        );
        break;
      case "Awaiting outcome":
        caseNumber = await createSummary.createSummary(
          page,
          "caseWorker",
          false,
          "Case management",
          "Hybrid",
          "Morning",
          false,
          "Fox Court - London (Central) SSCS Tribunal-4th Floor, Fox Court, 30 Brooke Street, London",
          "Fox Court",
          "Allowed",
          null,
          true,
          false,
          false,
        );
        break;
      case "DSS Submitted":
        caseNumber = await DSSCreateCase.createFEApplication(
          page,
          false,
          true,
          true,
          true,
          false,
          true,
          false,
          false,
          false,
        );
        break;
      case "Submitted":
        caseNumber = await createCase.createCase(
          page,
          user,
          false,
          "Assessment",
          "Other",
          true,
          true,
          "Email",
          true,
          false,
          "1996",
          "Scotland",
          true,
          true,
          true,
          true,
          true,
          false,
        );
        break;
    }
    if (caseNumber !== undefined) {
      await commonHelpers.signOutAndGoToCase(
        page,
        user,
        config.CaseAPIBaseURL,
        caseNumber,
      );
      await commonHelpers.chooseEventFromDropdown(page, "Case: Edit case");
      switch (errorMessaging) {
        default:
          await editCaseCategorisationDetailsPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
          );
          await editCaseCategorisationDetailsPage.checkAndFillInFields(
            page,
            initialState,
            category,
            subCategory,
          );
          await editCaseDateObjectsPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
          );
          await editCaseDateObjectsPage.checkAndFillInFields(
            page,
            initialState,
          );

          break;
        case true:
          await editCaseCategorisationDetailsPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
          );
          await editCaseCategorisationDetailsPage.triggerErrorMessages(page);
          await editCaseCategorisationDetailsPage.checkAndFillInFields(
            page,
            initialState,
            category,
            subCategory,
          );
          await editCaseDateObjectsPage.checkPageLoads(
            page,
            caseNumber,
            accessibilityTest,
          );
          await editCaseDateObjectsPage.triggerErrorMessages(page);
          await editCaseDateObjectsPage.checkAndFillInFields(
            page,
            initialState,
          );

          break;
      }
    } else {
      throw new Error("Case number is undefined.");
    }
  },
};

export default editCase;
