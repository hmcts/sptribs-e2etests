import { expect, Page } from "@playwright/test";
import axeTest from "../../helpers/accessibilityTestHelper";
import representationQualifiedContent from "../../fixtures/content/DSSCreateCase/RepresentationQualified_content.ts";

type RepresentationQualifiedPage = {
  qualifiedYes: string;
  qualifiedNo: string;
  continueButton: string;
  backButton: string;
  checkPageLoads(
    page: Page,
    welsh: boolean,
    accessibilityTest: boolean,
  ): Promise<void>;
  fillInFields(page: Page, representationQualified: boolean): Promise<void>;
  triggerErrorMessages(page: Page, welsh: boolean): Promise<void>;
  pressBackButton(page: Page): Promise<void>;
};

const representationQualifiedPage: RepresentationQualifiedPage = {
  qualifiedYes: "#representationQualified",
  qualifiedNo: "#representationQualified-2",
  continueButton: "#main-form-submit",
  backButton: ".govuk-back-link",

  async checkPageLoads(page: Page, welsh: boolean, accessibilityTest: boolean) {
    switch (welsh) {
      case true:
        await expect(page.locator(".govuk-fieldset__heading")).toHaveText(
          representationQualifiedContent.welshPageTitle,
        );
        await expect(page.locator(".govuk-hint")).toHaveText(
          representationQualifiedContent.welshHintMessage,
        );
        await expect(page.locator(".govuk-radios__label").nth(0)).toHaveText(
          representationQualifiedContent.welshTextOnPage1,
        );
        await expect(page.locator(".govuk-radios__label").nth(1)).toHaveText(
          representationQualifiedContent.welshTextOnPage2,
        );
        break;
      case false:
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

  async triggerErrorMessages(page: Page, welsh: boolean) {
    switch (welsh) {
      case true:
        await page.click(this.continueButton);
        await expect(page.locator(".govuk-error-summary__title")).toHaveText(
          representationQualifiedContent.welshErrorBanner,
        );
        await expect(
          page.locator("[href='#representationQualified']"),
        ).toHaveText(representationQualifiedContent.welshSelectionError);
        await expect(
          page.locator("#representationQualified-error"),
        ).toContainText(representationQualifiedContent.welshSelectionError);
        break;
      case false:
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
    await page.click(this.backButton);
  },
};

export default representationQualifiedPage;
