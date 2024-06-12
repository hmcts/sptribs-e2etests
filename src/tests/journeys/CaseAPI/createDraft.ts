import { Page } from "@playwright/test";
import config, { UserRole } from "../../config.ts";
import { Template } from "../../pages/CaseAPI/issueFinalDecision/selectTemplatePage.ts";
import commonHelpers, {
  allEvents,
  State,
} from "../../helpers/commonHelpers.ts";
import buildCase from "./buildCase.ts";
import hearingOptions from "./hearingOptions.ts";
import createListing from "./createListing.ts";
import createEditStay from "./createEditStay.ts";
import closeCase from "./closeCase.ts";
import createDraftOrderPage from "../../pages/CaseAPI/createDraft/createDraftOrderPage.ts";
import orderMainContentPage from "../../pages/CaseAPI/createDraft/orderMainContentPage.ts";
import addDocumentFooterPage from "../../pages/CaseAPI/createDraft/addDocumentFooterPage.ts";
import previewTemplatePage from "../../pages/CaseAPI/createDraft/previewTemplatePage.ts";

type CreateDraft = {
  createDraft(
    page: Page,
    user: UserRole,
    initialState: State,
    accessibilityTest: boolean,
    errorMessaging: boolean,
    template: Template,
  ): Promise<string>;
};

const createDraft: CreateDraft = {
  async createDraft(
    page: Page,
    user: UserRole,
    initialState: State,
    accessibilityTest: boolean,
    errorMessaging: boolean,
    template: Template,
  ): Promise<string> {
    let caseNumber: string | void = "";
    let previousEvents: allEvents[] = [];
    let eventTimes: string[] = [];
    const invalidTemplates: Template[] = [
      "CIC1 - Eligibility",
      "CIC2 - Quantum",
      "CIC4 - Blank Decision Notice",
      "CIC11 - Strike Out Decision Notice",
    ];
    if (invalidTemplates.includes(template)) {
      throw new Error(
        "You cannot use this template type for create draft order.",
      );
    }
    switch (initialState) {
      default:
        throw new Error("The initial state is invalid.");
      case "Case Management":
        caseNumber = await buildCase.buildCase(
          page,
          previousEvents,
          eventTimes,
          false,
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
      case "Case closed":
        caseNumber = await closeCase.closeCase(
          page,
          "caseWorker",
          false,
          "Case Management",
          false,
          "caseWithdrawn",
          true,
          null,
          null,
        );
        break;
    }
    if (typeof caseNumber !== "string") {
      throw new Error("The case number is invalid.");
    }
    await commonHelpers.signOutAndGoToCase(
      page,
      user,
      config.CaseAPIBaseURL,
      caseNumber,
    );
    await commonHelpers.chooseEventFromDropdown(page, "Orders: Create draft");
    await createDraftOrderPage.checkPageLoads(
      page,
      caseNumber,
      accessibilityTest,
    );
    switch (errorMessaging) {
      default:
        await createDraftOrderPage.fillInFields(page, template);
        await orderMainContentPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          template,
        );
        await orderMainContentPage.fillInFields(page);
        await addDocumentFooterPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
        );
        await addDocumentFooterPage.fillInFields(page);
        await previewTemplatePage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
        );
        await previewTemplatePage.fillInFields(
          page,
          template,
          caseNumber,
          null,
        );
        break;
      case true:
        await createDraftOrderPage.triggerErrorMessages(page);
        await orderMainContentPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          template,
        );
        await orderMainContentPage.triggerErrorMessages(page);
        await addDocumentFooterPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
        );
        await addDocumentFooterPage.triggerErrorMessages(page);
        break;
    }
    return caseNumber;
  },
};

export default createDraft;
