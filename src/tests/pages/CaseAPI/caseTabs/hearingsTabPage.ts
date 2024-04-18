import { Page } from "@playwright/test";
import { Panel2, Panel3 } from "../panelComposition/casePanelCompositionPage.ts";
import commonHelpers from "../../../helpers/commonHelpers.ts";
import hearingsTab_content from "../../../fixtures/content/CaseAPI/caseTabs/hearingsTab_content.ts";
import casePanelComposition_content
  from "../../../fixtures/content/CaseAPI/panelComposition/casePanelComposition_content.ts";


type HearingsTabPage = {
  checkPanelComposition(
    page: Page,
    panel2: Panel2,
    panel3: Panel3,
    specialisms: boolean,
  ): Promise<void>;
}

const hearingTabPage: HearingsTabPage = {
  async checkPanelComposition(page: Page, panel2: Panel2, panel3: Panel3, specialisms: boolean): Promise<void> {
    await Promise.all([
      commonHelpers.checkVisibleAndPresent(page.locator(`h4:text-is("${hearingsTab_content.subtitle1}")`), 1),
      commonHelpers.checkVisibleAndPresent(page.locator(`.text-16:text-is("${hearingsTab_content.textOnPage1}")`), 1),
      commonHelpers.checkVisibleAndPresent(page.locator(`.text-16:text-is("Tribunal Judge")`), 1)
    ]);
    if (panel2 !== null) {
      await Promise.all([
        commonHelpers.checkVisibleAndPresent(page.locator(`.text-16:text-is("${hearingsTab_content.textOnPage2}")`), 1),
        commonHelpers.checkVisibleAndPresent(page.locator(`.text-16:text-is("${panel2}")`), 1)
      ]);
    }
    if (panel3 !== null) {
      await Promise.all([
        commonHelpers.checkVisibleAndPresent(page.locator(`.text-16:text-is("${hearingsTab_content.textOnPage3}")`), 1),
        commonHelpers.checkVisibleAndPresent(page.locator(`.text-16:text-is("${panel3}")`), 1)
      ]);
    }
    if (specialisms) {
      await Promise.all([
        commonHelpers.checkVisibleAndPresent(page.locator(`.text-16:text-is("${hearingsTab_content.textOnPage4}")`), 1),
        commonHelpers.checkVisibleAndPresent(page.locator(`span:text-is("Lorem ipsum ${casePanelComposition_content.textOnPage2}")`), 1)
      ]);
    }
  }
}

export default hearingTabPage;
