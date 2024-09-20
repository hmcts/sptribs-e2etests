import { Page } from "@playwright/test";
import commonHelpers, { State } from "../../helpers/commonHelpers.ts";
import config, { UserRole } from "../../config.ts";
import { Template } from "../../pages/CaseAPI/issueFinalDecision/selectTemplatePage.ts";
import createDraft from "../../../removedFiles/createDraft.ts";
import editDraftOrderPage from "../../pages/CaseAPI/editDraft/editDraftOrderPage.ts";
import editDraftOrderMainContentPage from "../../pages/CaseAPI/editDraft/editDraftOrderMainContentPage.ts";
import editDraftAddDocumentFooterPage from "../../pages/CaseAPI/editDraft/editDraftAddDocumentFooterPage.ts";
import editDraftPreviewTemplatePage from "../../pages/CaseAPI/editDraft/editDraftPreviewTemplatePage.ts";
import submitPage from "../../pages/CaseAPI/editDraft/submitPage.ts";
import confirmPage from "../../pages/CaseAPI/editDraft/confirmPage.ts";
import ordersAndDecisionsTabPage from "../../pages/CaseAPI/caseTabs/ordersAndDecisionsTabPage.ts";

type EditDraft = {
  editDraft(
    page: Page,
    user: UserRole,
    initialState: State,
    accessibilityTest: boolean,
    errorMessaging: boolean,
    template: Template,
  ): Promise<void>;
};

const editDraft: EditDraft = {
  async editDraft(
    page: Page,
    user: UserRole,
    initialState: State,
    accessibilityTest: boolean,
    errorMessaging: boolean,
    template: Template,
  ): Promise<void> {
    let caseNumber: string | void = "";
    switch (initialState) {
      default:
        throw new Error("The initial state is invalid.");
      case "Case Management":
        caseNumber = await createDraft.createDraft(
          page,
          "caseWorker",
          "Case Management",
          false,
          false,
          template,
        );
        break;
      case "Ready to list":
        caseNumber = await createDraft.createDraft(
          page,
          "caseWorker",
          "Ready to list",
          false,
          false,
          template,
        );
        break;
      case "Awaiting Hearing":
        caseNumber = await createDraft.createDraft(
          page,
          "caseWorker",
          "Awaiting Hearing",
          false,
          false,
          template,
        );
        break;
      case "Case Stayed":
        caseNumber = await createDraft.createDraft(
          page,
          "caseWorker",
          "Case Stayed",
          false,
          false,
          template,
        );
        break;
      case "Case closed":
        caseNumber = await createDraft.createDraft(
          page,
          "caseWorker",
          "Case closed",
          false,
          false,
          template,
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
    await commonHelpers.chooseEventFromDropdown(page, "Orders: Edit draft");
    await editDraftOrderPage.checkPageLoads(
      page,
      caseNumber,
      accessibilityTest,
    );
    switch (errorMessaging) {
      default:
        const editedTemplate = await editDraftOrderPage.fillInFields(page);
        await editDraftOrderPage.continueOn(page);
        await editDraftOrderMainContentPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
        );
        await editDraftOrderMainContentPage.fillInFields(page);
        await editDraftAddDocumentFooterPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
        );
        await editDraftAddDocumentFooterPage.fillInFields(page);
        await editDraftPreviewTemplatePage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
        );
        await editDraftPreviewTemplatePage.fillInFields(
          page,
          template,
          caseNumber,
          null,
        );
        await submitPage.checkPageLoads(page, caseNumber, accessibilityTest);
        await submitPage.checkAllInfo(page, editedTemplate);
        await submitPage.continueOn(page);
        await confirmPage.checkPageLoads(page, caseNumber, accessibilityTest);
        await confirmPage.closeAndReturnToCase(page);
        await page.click(
          `.mat-tab-label-content:text-is("Orders & Decisions")`,
        );
        await ordersAndDecisionsTabPage.checkDraftOrder(page, template, true);

        break;
      case true:
        await editDraftOrderPage.triggerErrorMessages(page);
        await editDraftOrderPage.fillInFields(page);
        await editDraftOrderPage.continueOn(page);
        await editDraftOrderMainContentPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
        );
        await editDraftOrderMainContentPage.triggerErrorMessages(page);
        await editDraftAddDocumentFooterPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
        );
        await editDraftAddDocumentFooterPage.triggerErrorMessages(page);
        break;
    }
  },
};

export default editDraft;
