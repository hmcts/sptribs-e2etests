import { Page } from "@playwright/test";
import hearingOptions from "./hearingOptions.ts";
import commonHelpers, { allEvents } from "../../helpers/commonHelpers.ts";
import buildCase from "./buildCase.ts";
import config, { UserRole } from "../../config.ts";
import addStayPage, {
  StayReason,
} from "../../pages/CaseAPI/createEditStay/addStayPage.ts";

type InitialState = "Case Management" | "Ready to list";

type CreateEditStay = {
  createEditStay(
    page: Page,
    accessibilityTest: boolean,
    initialState: InitialState,
    user: UserRole,
    errorJourney: boolean,
    stayReason: StayReason,
    optionalText: boolean,
  ): Promise<string>;
};

const createEditStay: CreateEditStay = {
  async createEditStay(
    page: Page,
    accessibilityTest: boolean,
    initialState: InitialState,
    user: UserRole,
    errorJourney: boolean,
    stayReason: StayReason,
    optionalText: boolean,
  ): Promise<string> {
    let caseNumber: string = "";
    switch (initialState) {
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
      default: // Case management
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
    }
    await commonHelpers.signOutAndGoToCase(
      page,
      user,
      config.CaseAPIBaseURL,
      caseNumber,
    );
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Stays: Create/edit stay",
    );
    switch (errorJourney) {
      default:
        await addStayPage.checkPageLoads(page, caseNumber, accessibilityTest);
        await addStayPage.continueOn(page, stayReason, optionalText);
        break;
      case true:
        await addStayPage.checkPageLoads(page, caseNumber, accessibilityTest);
        await addStayPage.triggerErrorMessages(page);
        break;
    }
    return caseNumber;
  },
};

export default createEditStay;
