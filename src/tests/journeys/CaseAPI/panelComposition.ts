import { Page } from "@playwright/test";
import { UserRole } from "../../config.ts";
import commonHelpers, { allEvents } from "../../helpers/commonHelpers.ts";
import events_content from "../../fixtures/content/CaseAPI/events_content.ts";
import buildCase from "../../../removedFiles/buildCase.ts";
import casePanelCompositionPage, {
  Panel2,
  Panel3,
} from "../../pages/CaseAPI/panelComposition/casePanelCompositionPage.ts";
import submitPage from "../../pages/CaseAPI/panelComposition/submitPage.ts";
import hearingsTabPage from "../../pages/CaseAPI/caseTabs/hearingsTabPage.ts";

type PanelComposition = {
  panelComposition(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
    panel2: Panel2,
    panel3: Panel3,
    specialisms: boolean,
  ): Promise<string>;
};

const panelComposition: PanelComposition = {
  async panelComposition(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
    panel2: Panel2,
    panel3: Panel3,
    specialisms: boolean,
  ): Promise<string> {
    let previousEvents: allEvents[] = [];
    let eventTimes: string[] = [];
    const caseNumber: string = await buildCase.buildCase(
      page,
      previousEvents,
      eventTimes,
      accessibilityTest,
      user,
    );
    await commonHelpers.chooseEventFromDropdown(
      page,
      events_content.panelComposition,
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
    return caseNumber;
  },
};

export default panelComposition;
