import { expect, Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import submit_content from "../../../fixtures/content/CaseAPI/contactParties/submit_content.ts";
import caseSubjectDetailsObject_content from "../../../fixtures/content/CaseAPI/createCase/caseSubjectDetailsObject_content.ts";
import commonHelpers from "../../../helpers/commonHelpers.ts";
import partiesToContact_content from "../../../fixtures/content/CaseAPI/contactParties/partiesToContact_content.ts";

type SubmitPage = {
  saveAndContinue: string;
  previous: string;
  cancel: string;
  change: string;
  checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
  ): Promise<void>;
  checkValidInfo(page: Page): Promise<void>;
  continueOn(page: Page): Promise<void>;
};

const submitPage: SubmitPage = {
  saveAndContinue: '[type="submit"]',
  previous: ".button-secondary",
  cancel: ".cancel",
  change: 'span.text-16[aria-label^="Change"]',

  async checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
  ): Promise<void> {
    await Promise.all([
      expect(page.locator(".govuk-heading-l")).toHaveText(submit_content.title),
      expect(page.locator("markdown > h3")).toContainText(
        caseSubjectDetailsObject_content.name,
      ),
      expect(page.locator("markdown > p").nth(0)).toContainText(
        submit_content.caseReference + caseNumber,
      ),
      expect(page.locator(".heading-h2").nth(0)).toHaveText(
        submit_content.subTitle,
      ),
      expect(page.locator("span.text-16").nth(0)).toHaveText(
        submit_content.textOnPage1,
      ),
      ...Array.from({ length: 4 }, (_, index) => {
        return expect(
          page.locator(`text="${submit_content.textOnPage2}"`).nth(index),
        ).toBeVisible();
      }),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `xpath=//tr[contains(@class, 'ng-touched ng-dirty ng-valid ng-star-inserted')]//th[contains(@class, 'valign-top case-field-label ng-star-inserted')]//span[@class='text-16' and text()="${partiesToContact_content.textOnPage6}"]`,
        ),
        1,
      ),
      commonHelpers.checkForButtons(
        page,
        this.saveAndContinue,
        this.previous,
        this.cancel,
      ),
    ]);
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async checkValidInfo(page: Page): Promise<void> {
    await Promise.all([
      ...Array.from({ length: 4 }, (_, index) => {
        const textOnPage = (partiesToContact_content as any)[
          `textOnPage${index + 1}`
        ];
        return commonHelpers.checkVisibleAndPresent(
          page.locator(`span.text-16:text-is("${textOnPage}")`),
          1,
        );
      }),
    ]);
  },

  async continueOn(page: Page): Promise<void> {
    await page.click(this.saveAndContinue);
  },
};

export default submitPage;
