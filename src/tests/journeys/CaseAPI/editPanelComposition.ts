import { Page } from "@playwright/test";
import { UserRole } from "../../config.ts";
import panelComposition from "./panelComposition.ts";
import commonHelpers from "../../helpers/commonHelpers.ts";
import casePanelCompositionPage, {
  Panel2,
  Panel3,
} from "../../pages/CaseAPI/editPanelComposition/casePanelCompositionPage.ts";
import submitPage from "../../pages/CaseAPI/editPanelComposition/submitPage.ts";
import hearingsTabPage from "../../pages/CaseAPI/caseTabs/hearingsTabPage.ts";

type EditPanelComposition = {
  editPanelComposition(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
    panel2: Panel2,
    panel3: Panel3,
    specialisms: boolean,
  ): Promise<void>;
};

const editPanelComposition: EditPanelComposition = {
  async editPanelComposition(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
    panel2: Panel2,
    panel3: Panel3,
    specialisms: boolean,
  ): Promise<void> {
    const caseNumber: string = await panelComposition.panelComposition(
      page,
      user,
      accessibilityTest,
      "Medical Member",
      "Lay Member",
      false,
    );
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Case: Edit Panel Composition",
    );
    await casePanelCompositionPage.checkPageLoads(
      page,
      caseNumber,
      accessibilityTest,
    );
    await casePanelCompositionPage.fillInFields(
      page,
      panel2,
      panel3,
      specialisms,
    );
    await submitPage.checkPageLoads(
      page,
      caseNumber,
      accessibilityTest,
      panel2,
      panel3,
      specialisms,
    );
    await submitPage.continueOn(page);
    await page.locator(`.mat-tab-label-content:text-is("Hearings")`).click();
    await hearingsTabPage.checkPanelComposition(
      page,
      panel2,
      panel3,
      specialisms,
    );
  },
};

export default editPanelComposition;
