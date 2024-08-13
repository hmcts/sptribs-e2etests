import { expect, Page } from "@playwright/test";
import caseSubjectDetailsObject_content from "../../../fixtures/content/CaseAPI/createCase/caseSubjectDetailsObject_content.ts";
import commonHelpers from "../../../helpers/commonHelpers.ts";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import editDraftOrderContent from "../../../fixtures/content/CaseAPI/editDraft/editDraftOrder_content.ts";

type EditDraftOrderPage = {
  previous: string;
  continue: string;
  cancel: string;
  checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
  ): Promise<void>;
  fillInFields(page: Page): Promise<string | null>;
  triggerErrorMessages(page: Page): Promise<void>;
  continueOn(page: Page): Promise<void>;
};

const editDraftOrderPage: EditDraftOrderPage = {
  previous: ".button-secondary[disabled]",
  continue: '[type="submit"]',
  cancel: ".cancel",

  async checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page.waitForSelector(
      `.govuk-heading-l:text-is("${editDraftOrderContent.pageTitle}")`,
    );
    await Promise.all([
      expect(page.locator(".govuk-caption-l")).toHaveText(
        editDraftOrderContent.pageHint,
      ),
      expect(page.locator("markdown > h3")).toContainText(
        caseSubjectDetailsObject_content.name,
      ),
      expect(page.locator("markdown > p").nth(0)).toContainText(
        editDraftOrderContent.caseReference + caseNumber,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(`p:text-is("${editDraftOrderContent.textOnPage1}")`),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `.form-label:text-is("${editDraftOrderContent.textOnPage2}")`,
        ),
        1,
      ),
      commonHelpers.checkForButtons(
        page,
        this.continue,
        this.previous,
        this.cancel,
      ),
    ]);
    // if (accessibilityTest) {
    //   await axeTest(page);
    // }
  },

  async fillInFields(page: Page): Promise<string | null> {
    await page.selectOption(`#cicCaseDraftOrderDynamicList`, { index: 1 });
    return await page.textContent(
      "#cicCaseDraftOrderDynamicList > option:nth-child(2)",
    );
  },

  async triggerErrorMessages(page: Page): Promise<void> {
    await page.click(this.continue);
    await Promise.all([
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `#error-summary-title:text-is("${editDraftOrderContent.errorBanner}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `.validation-error:has-text("${editDraftOrderContent.errorMessage}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `.error-message:has-text("${editDraftOrderContent.errorMessage}")`,
        ),
        1,
      ),
    ]);
  },

  async continueOn(page: Page): Promise<void> {
    await page.click(this.continue);
  },
};

export default editDraftOrderPage;
