import { expect, Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import commonHelpers from "../../../helpers/commonHelpers.ts";
import submit_content from "../../../fixtures/content/CaseAPI/createCase/submit_content.ts";

type SubmitPage = {
  saveAndContinue: string;
  checkPageLoads(page: Page, accessibilityTest: boolean): Promise<void>;
};

const submitPage: SubmitPage = {
  saveAndContinue: '[type="submit"]',

  async checkPageLoads(page: Page, accessibilityTest: boolean): Promise<void> {
    await expect(page.locator(".govuk-heading-l")).toHaveText(
      submit_content.title,
    );
    await expect(page.locator(".heading-h2")).toHaveText(
      submit_content.subTitle1,
    );
    await expect(page.locator(".text-16").nth(0)).toHaveText(
      submit_content.textOnPage1,
    );
    await commonHelpers.checkVisibleAndPresent(
      page.locator(
        `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage2}")`,
      ),
      1,
    );
    await commonHelpers.checkVisibleAndPresent(
      page.locator(
        `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage3}")`,
      ),
      1,
    );
    await commonHelpers.checkVisibleAndPresent(
      page.locator(
        `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage4}")`,
      ),
      1,
    );
    await commonHelpers.checkVisibleAndPresent(
      page.locator(
        `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage5}")`,
      ),
      1,
    );
    await commonHelpers.checkVisibleAndPresent(
      page.locator(
        `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage6}")`,
      ),
      1,
    );
    await commonHelpers.checkVisibleAndPresent(
      page.locator(
        `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage7}")`,
      ),
      1,
    );
    await commonHelpers.checkVisibleAndPresent(
      page.locator(
        `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage8}")`,
      ),
      1,
    );
    await commonHelpers.checkVisibleAndPresent(
      page.locator(
        `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage9}")`,
      ),
      1,
    );
    await commonHelpers.checkVisibleAndPresent(
      page.locator(
        `th#complex-panel-simple-field-label > span.text-16:text-is("${submit_content.textOnPage10}")`,
      ),
      1,
    );
    await commonHelpers.checkVisibleAndPresent(
      page.locator(
        `th#complex-panel-simple-field-label > span.text-16:text-is("${submit_content.textOnPage11}")`,
      ),
      1,
    );
    await commonHelpers.checkVisibleAndPresent(
      page.locator(
        `th#complex-panel-simple-field-label > span.text-16:text-is("${submit_content.textOnPage12}")`,
      ),
      1,
    );
    await commonHelpers.checkVisibleAndPresent(
      page.locator(
        `th#complex-panel-simple-field-label > span.text-16:text-is("${submit_content.textOnPage13}")`,
      ),
      1,
    );
    await commonHelpers.checkVisibleAndPresent(
      page.locator(
        `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage14}")`,
      ),
      1,
    );

    if (accessibilityTest) {
      await axeTest(page);
    }
  },
};

export default submitPage;
