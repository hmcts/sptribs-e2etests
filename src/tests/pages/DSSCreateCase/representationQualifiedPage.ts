import { expect, Page } from "@playwright/test";
import axeTest from "../../helpers/accessibilityTestHelper";
import representationQualifiedContent from "../../fixtures/content/DSSCreateCase/RepresentationQualified_content.ts";
import commonHelpers from "../../helpers/commonHelpers.ts";

type RepresentationQualifiedPage = {
  qualifiedYes: string;
  qualifiedNo: string;
  continueButton: string;
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

  async checkPageLoads(page: Page, cy: boolean, accessibilityTest: boolean) {
    switch (cy) {
      case true:
        await expect(page.locator(".govuk-fieldset__heading")).toHaveText(
          representationQualifiedContent.pageTitleCy,
        );
        await expect(page.locator(".govuk-hint")).toHaveText(
          representationQualifiedContent.hintMessageCy,
        );
        await expect(page.locator(".govuk-radios__label").nth(0)).toHaveText(
          representationQualifiedContent.textOnPageCy1,
        );
        await expect(page.locator(".govuk-radios__label").nth(1)).toHaveText(
          representationQualifiedContent.textOnPageCy2,
        );
        break;
      default:
        await expect(page.locator(".govuk-fieldset__heading")).toHaveText(
          representationQualifiedContent.pageTitle,
        );
        await expect(page.locator(".govuk-hint")).toHaveText(
          representationQualifiedContent.hintMessage,
        );
        await expect(page.locator(".govuk-radios__label").nth(0)).toHaveText(
          representationQualifiedContent.textOnPage1,
        );
        await expect(page.locator(".govuk-radios__label").nth(1)).toHaveText(
          representationQualifiedContent.textOnPage2,
        );
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
    switch (cy) {
      case true:
        await page.click(this.continueButton);
        await expect(page.locator(".govuk-error-summary__title")).toHaveText(
          representationQualifiedContent.errorBannerCy,
        );
        await expect(
          page.locator("[href='#representationQualified']"),
        ).toHaveText(representationQualifiedContent.selectionErrorCy);
        await expect(
          page.locator("#representationQualified-error"),
        ).toContainText(representationQualifiedContent.selectionErrorCy);
        break;
      default:
        await page.click(this.continueButton);
        await expect(page.locator(".govuk-error-summary__title")).toHaveText(
          representationQualifiedContent.errorBanner,
        );
        await expect(
          page.locator("[href='#representationQualified']"),
        ).toHaveText(representationQualifiedContent.selectionError);
        await expect(
          page.locator("#representationQualified-error"),
        ).toContainText(representationQualifiedContent.selectionError);
        break;
    }
  },

  async pressBackButton(page: Page) {
    await commonHelpers.clickBackButton(page);
  },
};

export default representationQualifiedPage;
