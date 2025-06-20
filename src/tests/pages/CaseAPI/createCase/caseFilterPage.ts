import { AxeUtils } from "@hmcts/playwright-common";
import { Page } from "@playwright/test";
import caseFilter_content from "../../../fixtures/content/CaseAPI/createCase/caseFilter_content.ts";
import commonHelpers from "../../../helpers/commonHelpers.ts";

type CaseFilterPage = {
  submit: string;
  jurisdiction: string;
  caseType: string;
  event: string;
  checkPageLoads(page: Page, accessibilityTest: boolean): Promise<void>;
  fillInFields(page: Page): Promise<void>;
};

const caseFilterPage: CaseFilterPage = {
  submit: ".button",
  jurisdiction: "#cc-jurisdiction",
  caseType: "#cc-case-type",
  event: "#cc-event",

  async checkPageLoads(page: Page, accessibilityTest: boolean): Promise<void> {
    await page.waitForSelector(
      `.govuk-heading-xl:text-is("${caseFilter_content.pageTitle}")`,
    );
    await Promise.all([
      ...Array.from({ length: 3 }, (_, index) => {
        const textOnPage = (caseFilter_content as any)[
          `textOnPage${index + 1}`
        ];
        return commonHelpers.checkVisibleAndPresent(
          page.locator(`.form-label:text-is("${textOnPage}")`),
          1,
        );
      }),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  },

  async fillInFields(page: Page): Promise<void> {
    await page.waitForSelector("#cc-jurisdiction");
    await page.selectOption(this.jurisdiction, caseFilter_content.dropdown1);
    await page.selectOption(this.caseType, caseFilter_content.dropdown2);
    await page.selectOption(this.event, caseFilter_content.dropdown3);
    await page.click(this.submit);
  },
};

export default caseFilterPage;
