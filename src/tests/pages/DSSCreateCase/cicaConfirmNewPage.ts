import { AxeUtils } from "@hmcts/playwright-common";
import { Page } from "@playwright/test";
import cicaConfirmNewContent from "../../fixtures/content/DSSCreateCase/cicaConfirmNew_content.ts";
import commonHelpers from "../../helpers/commonHelpers.ts";

type CicaConfirmNewPage = {
  startNewAppealYes: string;
  startNewAppealNo: string;
  continueButton: string;
  backButton: string;
  checkPageLoads(
    page: Page,
    cy: boolean,
    accessibilityTest: boolean,
  ): Promise<void>;
  fillInFields(page: Page, newAppeal: boolean): Promise<void>;
  pressBackButton(page: Page): Promise<void>;
};

const cicaConfirmNewPage: CicaConfirmNewPage = {
  startNewAppealYes: "#startNewAppeal",
  startNewAppealNo: "#startNewAppeal-2",
  continueButton: "#main-form-submit",
  backButton: ".govuk-back-link",

  async checkPageLoads(
    page: Page,
    cy: boolean,
    accessibilityTest: boolean,
  ): Promise<void> {
    switch (cy) {
      case true:
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-heading-l:text-is("${cicaConfirmNewContent.pageTitleCy}")`,
            ),
            1,
          ),
          ...Array.from({ length: 2 }, (_, index) => {
            const textOnPage = (cicaConfirmNewContent as any)[
              `textOnPageCy${index + 1}`
            ];
            return commonHelpers.checkVisibleAndPresent(
              page.locator(`.govuk-label:text-is("${textOnPage}")`),
              1,
            );
          }),
        ]);
        break;
      default:
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-heading-l:text-is("${cicaConfirmNewContent.pageTitle}")`,
            ),
            1,
          ),
          ...Array.from({ length: 2 }, (_, index) => {
            const textOnPage = (cicaConfirmNewContent as any)[
              `textOnPage${index + 1}`
            ];
            return commonHelpers.checkVisibleAndPresent(
              page.locator(`.govuk-label:text-is("${textOnPage}")`),
              1,
            );
          }),
        ]);
        break;
    }
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  },

  async fillInFields(page: Page, newAppeal: boolean): Promise<void> {
    if (newAppeal) {
      await page.click(this.startNewAppealYes);
    } else {
      await page.click(this.startNewAppealNo);
    }
    await page.click(this.continueButton);
  },

  async pressBackButton(page: Page): Promise<void> {
    await page.click(this.backButton);
  },
};

export default cicaConfirmNewPage;
