import { Page } from "@playwright/test";
import axeTest from "../../helpers/accessibilityTestHelper";
import representationQualifiedContent from "../../fixtures/content/DSSCreateCase/RepresentationQualified_content.ts";
import commonHelpers from "../../helpers/commonHelpers.ts";

type RepresentationQualifiedPage = {
  qualifiedYes: string;
  qualifiedNo: string;
  continueButton: string;
  backButton: string;
  checkPageLoads(
    page: Page,
    cy: boolean,
    accessibilityTest: boolean,
  ): Promise<void>;
  fillInFields(page: Page, representationQualified: boolean): Promise<void>;
  triggerErrorMessages(page: Page, cy: boolean): Promise<void>;
  pressBackButton(page: Page): Promise<void>;
};

const representationQualifiedPage: RepresentationQualifiedPage = {
  qualifiedYes: "#representationQualified",
  qualifiedNo: "#representationQualified-2",
  continueButton: "#main-form-submit",
  backButton: ".govuk-back-link",

  async checkPageLoads(page: Page, cy: boolean, accessibilityTest: boolean) {
    switch (cy) {
      case true:
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-heading-l:text-is("${representationQualifiedContent.pageTitleCy}")`,
            ),
            1,
          ),
          ...Array.from({ length: 2 }, (_, index) => {
            const textOnPage = (representationQualifiedContent as any)[
              `textOnPageCy${index + 1}`
            ];
            return commonHelpers.checkVisibleAndPresent(
              page.locator(`.govuk-radios__label:text-is("${textOnPage}")`),
              1,
            );
          }),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-hint:text-is("${representationQualifiedContent.hintMessageCy}")`,
            ),
            1,
          ),
        ]);
        break;
      default:
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-heading-l:text-is("${representationQualifiedContent.pageTitle}")`,
            ),
            1,
          ),
          ...Array.from({ length: 2 }, (_, index) => {
            const textOnPage = (representationQualifiedContent as any)[
              `textOnPage${index + 1}`
            ];
            return commonHelpers.checkVisibleAndPresent(
              page.locator(`.govuk-radios__label:text-is("${textOnPage}")`),
              1,
            );
          }),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-hint:text-is("${representationQualifiedContent.hintMessage}")`,
            ),
            1,
          ),
        ]);
        break;
    }
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async fillInFields(page: Page, representationQualified: boolean) {
    if (representationQualified) {
      await page.click(this.qualifiedYes);
    } else {
      await page.click(this.qualifiedNo);
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
              `.govuk-error-summary__title:text-is("${representationQualifiedContent.errorBannerCy}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `[href='#representationQualified']:text-is("${representationQualifiedContent.selectionErrorCy}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `#representationQualified-error:text-is("${representationQualifiedContent.selectionErrorCy}")`,
            ),
            1,
          ),
        ]);
        break;
      default:
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-error-summary__title:text-is("${representationQualifiedContent.errorBanner}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `[href='#representationQualified']:text-is("${representationQualifiedContent.selectionError}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `#representationQualified-error:text-is("${representationQualifiedContent.selectionError}")`,
            ),
            1,
          ),
        ]);
        break;
    }
  },

  async pressBackButton(page: Page) {
    await page.click(this.backButton);
  },
};

export default representationQualifiedPage;
