import { expect, Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import createCaseLinkcreateCaseLink3_content from "../../../fixtures/content/CaseAPI/LinkCase/createCaseLinkcreateCaseLink3_content.ts";
import commonHelpers from "../../../helpers/commonHelpers.ts";
import createCaseLinkcreateCaseLink2_content from "../../../fixtures/content/CaseAPI/LinkCase/createCaseLinkcreateCaseLink2_content.ts";

type CreateCaseLinkCreateCaseLink3Page = {
  previous: string;
  submit: string;
  cancel: string;
  checkPageLoads(page: Page, accessibilityTest: boolean): Promise<void>;
  fillInFields(page: Page): Promise<void>;
};

const createCaseLinkCreateCaseLink3: CreateCaseLinkCreateCaseLink3Page = {
  previous: ".button-secondary[disabled]",
  submit: '[type="submit"]',
  cancel: ".cancel",

  async checkPageLoads(page: Page, accessibilityTest: boolean): Promise<void> {
    await Promise.all([
      commonHelpers.checkForButtons(
        page,
        this.submit,
        this.previous,
        this.cancel,
      ),
      expect(page.locator(".govuk-heading-xl")).toHaveText(
        createCaseLinkcreateCaseLink3_content.pageTitle,
      ),
    ]);
    await Promise.all([
      ...Array.from({ length: 16 }, (_, i: number) => {
        const dynamicPropertyName = `textOnPage${i + 1}`;
        const propertyValue = (createCaseLinkcreateCaseLink3_content as any)[
          dynamicPropertyName
        ];
        const selector = `span > span:text-is("${propertyValue}")`;
        return commonHelpers.checkVisibleAndPresent(page.locator(selector), 1);
      }),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `span > span:text-is("${createCaseLinkcreateCaseLink2_content.textOnPage20} - ${createCaseLinkcreateCaseLink2_content.otherInput}")`,
        ),
        1,
      ),
    ]);
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async fillInFields(page: Page): Promise<void> {
    await page.click(this.submit);
  },
};

export default createCaseLinkCreateCaseLink3;
