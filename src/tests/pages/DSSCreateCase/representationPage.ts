import { AxeUtils } from "@hmcts/playwright-common";
import { Page } from "@playwright/test";
import representationContent from "../../fixtures/content/DSSCreateCase/Representation_content.ts";
import commonHelpers from "../../helpers/commonHelpers.ts";

type RepresentationPage = {
  representationYes: string;
  representationNo: string;
  continueButton: string;
  backButton: string;
  checkPageLoads(
    page: Page,
    cy: boolean,
    accessibilityTest: boolean,
  ): Promise<void>;
  fillInFields(page: Page, representationPresent: boolean): Promise<void>;
  triggerErrorMessages(page: Page, cy: boolean): Promise<void>;
  pressBackButton(page: Page): Promise<void>;
};

const representationPage: RepresentationPage = {
  representationYes: "#representation",
  representationNo: "#representation-2",
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
              `.govuk-heading-l:text-is("${representationContent.pageTitleCy}")`,
            ),
            1,
          ),
          ...Array.from({ length: 2 }, (_, index) => {
            const textOnPage = (representationContent as any)[
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
              `.govuk-heading-l:text-is("${representationContent.pageTitle}")`,
            ),
            1,
          ),
          ...Array.from({ length: 2 }, (_, index) => {
            const textOnPage = (representationContent as any)[
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

  async fillInFields(
    page: Page,
    representationPresent: boolean,
  ): Promise<void> {
    if (representationPresent) {
      await page.click(this.representationYes);
    } else {
      await page.click(this.representationNo);
    }
    await page.click(this.continueButton);
  },

  async triggerErrorMessages(page: Page, cy: boolean) {
    await page.click(this.continueButton);
    switch (cy) {
      case true:
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-error-summary__title:text-is("${representationContent.errorBannerCy}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `[href='#representation']:text-is("${representationContent.selectionErrorCy}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `#representation-error:text-is("${representationContent.selectionErrorCy}")`,
            ),
            1,
          ),
        ]);
        break;
      default:
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-error-summary__title:text-is("${representationContent.errorBanner}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `[href='#representation']:text-is("${representationContent.selectionError}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `#representation-error:text-is("${representationContent.selectionError}")`,
            ),
            1,
          ),
        ]);
        break;
    }
  },

  async pressBackButton(page: Page): Promise<void> {
    await page.click(this.backButton);
  },
};

export default representationPage;
