import { Page } from "@playwright/test";
import config, { UserRole } from "../../config.ts";
import commonHelpers, {
  allEvents,
  State,
} from "../../helpers/commonHelpers.ts";
import createFEApplication from "../DSSCreateCase/createCase.ts";
import createCase from "./createCase.ts";
import buildCase from "./buildCase.ts";
import createListing from "./createListing.ts";
import hearingOptions from "./hearingOptions.ts";
import createSummary from "./createSummary.ts";
import issueFinalDecision from "./issueFinalDecision.ts";
import createEditStay from "./createEditStay.ts";

type AddNote = {
  addNote(page: Page, user: UserRole, state: State): Promise<void>;
};

const addNote: AddNote = {
  async addNote(page: Page, user: UserRole, state: State): Promise<void> {
    let caseNumber: string | void;
    let previousEvents: allEvents[] = [];
    let eventTimes: string[] = [];
    switch (state) {
      default:
        throw new Error("No valid case type selected.");
      case "DSS-Submitted":
        caseNumber = await createFEApplication.createFEApplication(
          page,
          true,
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
          "caseWorker",
          false,
          "Assessment",
          "Fatal",
          true,
          true,
          "Email",
          true,
          true,
          "1996",
          "Scotland",
          true,
          false,
          true,
          false,
          true,
          false,
        );
        break;
      case "Case Management":
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
      case "Awaiting Hearing":
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
      case "Awaiting Outcome":
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
      case "Case closed":
        caseNumber = await issueFinalDecision.issueFinalDecision(
          page,
          "caseWorker",
          false,
          false,
          "upload",
          null,
          "Final",
        );
        break;
      case "Case Stayed":
        caseNumber = await createEditStay.createEditStay(
          page,
          false,
          "Case Management",
          "caseWorker",
          false,
          "waitingOutcomeOfCivilCase",
          true,
        );
        break;
    }
    if (typeof caseNumber !== "string") {
      throw new Error("Case number is invalid.");
    }
    await commonHelpers.signOutAndGoToCase(
      page,
      user,
      config.CaseAPIBaseURL,
      caseNumber,
    );
  },
};

export default addNote;
