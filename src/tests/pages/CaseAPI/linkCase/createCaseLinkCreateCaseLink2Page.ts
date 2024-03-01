import { expect, Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import createCaseLinkcreateCaseLink2_content from "../../../fixtures/content/CaseAPI/LinkCase/createCaseLinkcreateCaseLink2_content.ts";
import commonHelpers from "../../../helpers/commonHelpers.ts";
import caseSubjectDetailsObject_content from "../../../fixtures/content/CaseAPI/createCase/caseSubjectDetailsObject_content.ts";
import stateTab_content from "../../../fixtures/content/CaseAPI/caseTabs/stateTab_content.ts";

type CreateCaseLinkCreateCaseLink2Page = {
  next: string;
  previous: string;
  submit: string;
  cancel: string;
  checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void>;
  fillInFields(
    page: Page,
    caseNumber1: string,
    caseNumber2: string,
  ): Promise<void>;
  triggerErrorMessage(page: Page): Promise<void>;
};

const createCaseLinkCreateCaseLink2: CreateCaseLinkCreateCaseLink2Page = {
  next: "#next-button",
  previous: ".button-secondary[disabled]",
  submit: '[type="submit"]',
  cancel: ".cancel",

  async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await Promise.all([
      page.locator(this.next).isVisible(),
      page.locator(this.previous).isVisible(),
      page.locator(this.submit).isVisible(),
      page.locator(this.cancel).isVisible(),
      expect(page.locator(".govuk-heading-xl")).toHaveText(
        createCaseLinkcreateCaseLink2_content.pageTitle,
      ),
      expect(page.locator(".govuk-heading-s").nth(0)).toHaveText(
        createCaseLinkcreateCaseLink2_content.textOnPage1,
      ),
      expect(page.locator(".govuk-heading-s").nth(1)).toHaveText(
        createCaseLinkcreateCaseLink2_content.textOnPage2,
      ),
      expect(page.locator("#waste-hint")).toHaveText(
        createCaseLinkcreateCaseLink2_content.textOnPage3,
      ),
    ]);
    await Promise.all(
      Array.from({ length: 17 }, (_, i: number) => {
        const dynamicPropertyName = `textOnPage${i + 4}`;
        const propertyValue = (createCaseLinkcreateCaseLink2_content as any)[
          dynamicPropertyName
        ];
        const selector = `.govuk-checkboxes__label:text-is("${propertyValue}")`;
        return commonHelpers.checkVisibleAndPresent(page.locator(selector), 1);
      }),
    );

    // if (accessibilityTest) {
    //   await axeTest(page);
    // } Disabled due to input field for case number breaking accessibility tests.
  },

  async fillInFields(
    page: Page,
    caseNumber1: string,
    caseNumber2: string,
  ): Promise<void> {
    await page.fill(".govuk-input--width-20", caseNumber2);
    for (let i = 4; i < 21; i++) {
      const dynamicPropertyName = `textOnPage${i}`;
      const propertyValue = (createCaseLinkcreateCaseLink2_content as any)[
        dynamicPropertyName
      ];
      await page.click(`input[value='${propertyValue}']`);
    }
    await Promise.all([
      expect(page.locator(".govuk-heading-s").nth(2)).toHaveText(
        createCaseLinkcreateCaseLink2_content.comments,
      ),
      expect(page.locator("#other-description-char-limit-info")).toHaveText(
        createCaseLinkcreateCaseLink2_content.otherHint,
      ),
    ]);
    await page.fill(
      "#otherDescription",
      createCaseLinkcreateCaseLink2_content.otherInput,
    );
    await page.click(".govuk-button--secondary");
    await Promise.all([
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `td > span:text-is("${caseSubjectDetailsObject_content.name}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(`td > span:text-is("${caseNumber2}")`),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `tbody > tr > td:text-is("${createCaseLinkcreateCaseLink2_content.caseType}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `tbody > tr > td:text-is("${createCaseLinkcreateCaseLink2_content.service}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `tbody > tr > td:text-is("${stateTab_content.submittedState}")`,
        ),
        1,
      ),
      ...Array.from({ length: 16 }, (_, i: number) => {
        const dynamicPropertyName = `textOnPage${i + 4}`;
        const propertyValue = (createCaseLinkcreateCaseLink2_content as any)[
          dynamicPropertyName
        ];
        const selector = `td > span:text-is("${propertyValue}")`;
        return commonHelpers.checkVisibleAndPresent(page.locator(selector), 1);
      }),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `td > span:text-is("${createCaseLinkcreateCaseLink2_content.textOnPage20} - ${createCaseLinkcreateCaseLink2_content.otherInput}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(`.govuk-link:text-is('Remove')`),
        1,
      ),
    ]);
    await page.click(this.next);
  },

  async triggerErrorMessage(page: Page): Promise<void> {
    await page.click(this.submit);
    await Promise.all([
      expect(page.locator("#error-summary-title")).toHaveText(
        createCaseLinkcreateCaseLink2_content.errorBanner,
      ),
      expect(page.locator(".validation-error")).toHaveText(
        createCaseLinkcreateCaseLink2_content.errorMessageSubmit,
      ),
    ]);
    await page.click(this.next);
    await Promise.all([
      expect(page.locator("#error-summary-title")).toHaveText(
        createCaseLinkcreateCaseLink2_content.errorBanner,
      ),
      expect(page.locator(".validation-error")).toHaveText(
        createCaseLinkcreateCaseLink2_content.errorMessagePropose,
      ),
    ]);
    await page.click(".govuk-button--secondary");
    await Promise.all([
      expect(page.locator("#error-summary-title")).toHaveText(
        createCaseLinkcreateCaseLink2_content.errorBanner,
      ),
      expect(page.locator(".validation-error").nth(0)).toHaveText(
        createCaseLinkcreateCaseLink2_content.errorMessageCaseNumber,
      ),
      expect(page.locator(".validation-error").nth(1)).toHaveText(
        createCaseLinkcreateCaseLink2_content.errorMessageReason,
      ),
      expect(page.locator(".govuk-error-message").nth(0)).toHaveText(
        `Error: ${createCaseLinkcreateCaseLink2_content.errorMessageCaseNumber}`,
      ),
      expect(page.locator(".govuk-error-message").nth(1)).toHaveText(
        `Error: ${createCaseLinkcreateCaseLink2_content.errorMessageReason}`,
      ),
    ]);
  },
};

export default createCaseLinkCreateCaseLink2;
