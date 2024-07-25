import { expect, Page } from "@playwright/test";
import commonHelpers from "../../../helpers/commonHelpers.ts";
import selectDocument_content from "../../../fixtures/content/CaseAPI/contactParties/selectDocument_content.ts";
import caseSubjectDetailsObject_content from "../../../fixtures/content/CaseAPI/createCase/caseSubjectDetailsObject_content.ts";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import partiesToContact_content from "../../../fixtures/content/CaseAPI/contactParties/partiesToContact_content.ts";

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
    const pageHintRegex = new RegExp(
      `${selectDocument_content.pageHint}|${partiesToContact_content.pageHintCICA}`,
    );
    await Promise.all([
      expect(page.locator(".govuk-caption-l")).toHaveText(pageHintRegex),
      expect(page.locator(".govuk-heading-l")).toHaveText(
        selectDocument_content.pageTitle,
      ),
      expect(page.locator("markdown > h3").nth(0)).toHaveText(
        caseSubjectDetailsObject_content.name,
      ),
      expect(page.locator("markdown > p").nth(0)).toHaveText(
        partiesToContact_content.caseReference + caseNumber,
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
      expect(page.locator(".form-label").nth(0)).toHaveText(
        selectDocument_content.textOnPage3,
      ),
      commonHelpers.checkVisibleAndPresent(
        page
          .locator(
            `markdown > p:text-is("${selectDocument_content.mockFileName}")`,
          )
          .first(),
        1,
      ),
      commonHelpers.checkForButtons(
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
