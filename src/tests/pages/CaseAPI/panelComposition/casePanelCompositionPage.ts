import { expect, Page } from "@playwright/test";
import commonHelpers from "../../../helpers/commonHelpers.ts";
import submit_content from "../../../fixtures/content/CaseAPI/clearHearingOptions/submit_content.ts";
import caseSubjectDetailsObject_content from "../../../fixtures/content/CaseAPI/createCase/caseSubjectDetailsObject_content.ts";
import casePanelComposition_content from "../../../fixtures/content/CaseAPI/panelComposition/casePanelComposition_content.ts";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";

type CasePanelCompositionPage = {
  checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
  ): Promise<void>;
  fillInFields(
    page: Page,
    panel2: Panel2,
    panel3: Panel3,
    specialisms: boolean,
  ): Promise<void>;
};

export type Panel2 = "Tribunal Judge" | "Medical Member" | "Lay Member" | null;

export type Panel3 = "Medical Member" | "Lay Member" | null;

const casePanelCompositionPage: CasePanelCompositionPage = {
  async checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
  ): Promise<void> {
    await Promise.all([
      commonHelpers.checkVisibleAndPresent(
        page.locator(`h1:text-is("${casePanelComposition_content.pageTitle}")`),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(`h3:text-is("${caseSubjectDetailsObject_content.name}")`),
        1,
      ),
      expect(page.locator("markdown > p").nth(0)).toContainText(
        submit_content.caseReference + caseNumber,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `.case-field__label:text-is("${casePanelComposition_content.pageSubTitle1}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `.text-16:text-is("${casePanelComposition_content.textOnPage1}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `.form-label:text-is("${casePanelComposition_content.pageSubTitle2}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `.form-label:text-is("${casePanelComposition_content.textOnPage2}")`,
        ),
        1,
      ),
    ]);

    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async fillInFields(
    page: Page,
    panel2: Panel2,
    panel3: Panel3,
    specialisms: boolean,
  ): Promise<void> {
    if (panel2 !== null) {
      await page.selectOption(`#panel2`, panel2);
      await commonHelpers.checkVisibleAndPresent(
        page.locator(
          `.form-label:text-is("${casePanelComposition_content.pageSubTitle3}")`,
        ),
        1,
      );
      if (panel3 !== null) {
        await page.selectOption(`#panel3`, panel3);
      }
    }
    if (specialisms) {
      await page
        .locator(`#panelMemberInformation`)
        .fill(`Lorem ipsum ${casePanelComposition_content.textOnPage2}`);
    }
    await page.locator(`.button:text-is("Continue")`).click();
  },
};

export default casePanelCompositionPage;
