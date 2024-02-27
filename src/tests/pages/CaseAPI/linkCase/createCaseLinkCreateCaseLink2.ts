import { expect, Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import createCaseLinkcreateCaseLink2_content from "../../../fixtures/content/CaseAPI/LinkCase/createCaseLinkcreateCaseLink2_content.ts";
import commonHelpers from "../../../helpers/commonHelpers.ts";

type CreateCaseLinkCreateCaseLink = {
  next: string;
  previous: string;
  submit: string;
  cancel: string;
  checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
  ): Promise<void>;
  fillInFields(page: Page): Promise<void>;
  triggerErrorMessage(page: Page): Promise<void>;
};

const createCaseLinkCreateCaseLink: CreateCaseLinkCreateCaseLink = {
  next: "#next-button",
  previous: ".button-secondary[disabled]",
  submit: '[type="submit"]',
  cancel: ".cancel",

  async checkPageLoads(
    page: Page,
    caseNumber: string,
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
      Array.from({ length: 14 }, (_, i: number) => {
        const dynamicPropertyName = `textOnPage${i + 4}`;
        const propertyValue = (createCaseLinkcreateCaseLink2_content as any)[
          dynamicPropertyName
        ];
        const selector = `.govuk-checkboxes__label:text-is("${propertyValue}")`;
        return commonHelpers.checkVisibleAndPresent(page.locator(selector), 1);
      }),
    );

    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async fillInFields(page: Page): Promise<void> {},

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
  },
};

export default createCaseLinkCreateCaseLink;
