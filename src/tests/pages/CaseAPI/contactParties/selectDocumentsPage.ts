import { expect, Page } from "@playwright/test";
import commonHelpers from "../../../helpers/commonHelpers.ts";
import selectDocument_content from "../../../fixtures/content/CaseAPI/contactParties/selectDocument_content.ts";
import caseSubjectDetailsObject_content from "../../../fixtures/content/CaseAPI/createCase/caseSubjectDetailsObject_content.ts";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";

type SelectDocumentsPage = {
  continue: string;
  previous: string;
  cancel: string;
  checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
  ): Promise<void>;
  tickCheckbox(page: Page): Promise<void>;
  continueOn(page: Page): Promise<void>;
};

const selectDocumentsPage: SelectDocumentsPage = {
  continue: '[type="submit"]',
  previous: ".button-secondary[disabled]",
  cancel: ".cancel",
  async checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
  ): Promise<void> {
    await Promise.all([
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `.govuk-caption-l:text-is("${selectDocument_content.pageHint}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `.govuk-heading-l:text-is("${selectDocument_content.pageTitle}")`,
        ),
        1,
      ),
      expect(page.locator("markdown > h3").nth(0)).toContainText(
        caseSubjectDetailsObject_content.name,
      ),
      ...Array.from({ length: 2 }, (_, index: number) => {
        const textOnPage = (selectDocument_content as any)[
          `textOnPage${index + 1}`
        ];
        return commonHelpers.checkVisibleAndPresent(
          page.locator(`markdown > p:text-is("${textOnPage}")`),
          1,
        );
      }),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `.form-label:text-is("${selectDocument_content.textOnPage3}")`,
        ),
        1,
      ),
      // TEMP FIX FOR DUPLICATE CHECKBOX
      commonHelpers.checkVisibleAndPresent(
        page
          .locator(
            `markdown > p:text-is("${selectDocument_content.mockFileName}")`,
          )
          .first(),
        1,
      ),
      await commonHelpers.checkForButtons(
        page,
        this.continue,
        this.previous,
        this.cancel,
      ),
    ]);
    if (accessibilityTest) {
      await axeTest(page);
    }
  },
  async continueOn(page: Page): Promise<void> {
    await page.click(this.continue);
  },
  async tickCheckbox(page: Page): Promise<void> {
    // TEMP FIX FOR DUPLICATE CHECKBOX
    await page
      .locator(
        'input[type="checkbox"][name="contactPartiesDocumentsDocumentList"][id^="contactPartiesDocumentsDocumentList_"]',
      )
      .first()
      .check();
    const isChecked = await page
      .locator(
        'input[type="checkbox"][id^="contactPartiesDocumentsDocumentList_"]',
      )
      .first()
      .isChecked();
  },
};

export default selectDocumentsPage;
