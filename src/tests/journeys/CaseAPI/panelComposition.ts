import { Page } from "@playwright/test";
import commonHelpers from "../../helpers/commonHelpers.ts";
import events_content from "../../fixtures/content/CaseAPI/events_content.ts";
import casePanelCompositionPage, {
  Panel2,
  Panel3,
} from "../../pages/CaseAPI/panelComposition/casePanelCompositionPage.ts";
import submitPage from "../../pages/CaseAPI/panelComposition/submitPage.ts";
import hearingsTabPage from "../../pages/CaseAPI/caseTabs/hearingsTabPage.ts";

type PanelComposition = {
  panelComposition(
    page: Page,
    accessibilityTest: boolean,
    panel2: Panel2,
    panel3: Panel3,
    specialisms: boolean,
    caseNumber: string,
    subjectName: string,
  ): Promise<void>;
};

const panelComposition: PanelComposition = {
  async panelComposition(
    page: Page,
    accessibilityTest: boolean,
    panel2: Panel2,
    panel3: Panel3,
    specialisms: boolean,
    caseNumber: string,
    subjectName: string,
  ): Promise<void> {
    await commonHelpers.chooseEventFromDropdown(
      page,
      events_content.panelComposition,
    );
    await casePanelCompositionPage.checkPageLoads(
      page,
      caseNumber,
      accessibilityTest,
      subjectName,
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
      subjectName,
    );
    await submitPage.continueOn(page);
    // await hearingsTabPage.changeToHearingsTab(page);
    // await hearingsTabPage.checkPanelComposition(
    //   page,
    //   panel2,
    //   panel3,
    //   specialisms,
    // );
  },
};

export default panelComposition;
