import { AxeUtils } from "@hmcts/playwright-common";
import { expect, Page } from "@playwright/test";
import cicaDecisionDateContent from "../../fixtures/content/DSSCreateCase/cicaDecisionDate_content";
import commonHelpers from "../../helpers/commonHelpers.ts";

type CicaDecisionDatePage = {
  continue: string;
  day: string;
  month: string;
  year: string;
  checkPageLoads(
    page: Page,
    cy: boolean,
    accessibilityTest: boolean,
  ): Promise<void>;
  fillInFields(page: Page): Promise<void>;
  triggerErrorMessages(page: Page): Promise<void>;
};

const cicaDecisionDatePage: CicaDecisionDatePage = {
  continue: '[type="submit"]',
  day: "#initialCicaDecisionDate-day",
  month: "#initialCicaDecisionDate-month",
  year: "#initialCicaDecisionDate-year",

  async checkPageLoads(page: Page, cy: boolean, accessibilityTest: boolean) {
    switch (cy) {
      case true:
        await page.waitForSelector(
          `.govuk-heading-l:text-is("${cicaDecisionDateContent.pageTitleCy}")`,
        );
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(`.govuk-link.language:text-is("English")`),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-heading-l:text-is("${cicaDecisionDateContent.pageTitleCy}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-hint:text-is("${cicaDecisionDateContent.hintTextCy1}")`,
            ),
            1,
          ),
        ]);
        break;
      default:
        await page.waitForSelector(
          `.govuk-heading-l:text-is("${cicaDecisionDateContent.pageTitle}")`,
        );
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-heading-l:text-is("${cicaDecisionDateContent.pageTitle}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-label:text-is("${cicaDecisionDateContent.subHeading1}")`,
            ),
            1,
          ),
        ]);
        break;
    }
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  },

  async fillInFields(page: Page): Promise<void> {
    const currentDate = new Date();
    await page.fill(this.day, `${currentDate.getDate() - 1}`);
    await page.fill(this.month, `${currentDate.getMonth() + 1}`);
    await page.fill(this.year, `${currentDate.getFullYear()}`);
    await Promise.all([
      page.waitForLoadState("domcontentloaded"),
      page.click(this.continue),
    ]);
  },

  async triggerErrorMessages(page: Page): Promise<void> {
    await page.click(this.continue);
    await Promise.all([
      expect(page.locator("#error-summary-title")).toHaveText(
        cicaDecisionDateContent.errorBanner,
      ),
      expect(page.locator(".validation-error")).toHaveText(
        cicaDecisionDateContent.dateError,
      ),
      expect(page.locator(".error-message")).toHaveText(
        cicaDecisionDateContent.dateError,
      ),
    ]);
    await page.fill(this.day, "90");
    await page.click(this.continue);
    await Promise.all([
      expect(page.locator("#error-summary-title")).toHaveText(
        cicaDecisionDateContent.errorBanner,
      ),
      expect(page.locator(".validation-error")).toHaveText(
        cicaDecisionDateContent.validDateError,
      ),
      expect(page.locator(".error-message")).toHaveText(
        cicaDecisionDateContent.inlineValidDateError,
      ),
    ]);
    await page.locator(this.day).clear();
  },
};

export default cicaDecisionDatePage;
