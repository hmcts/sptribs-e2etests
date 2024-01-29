import { expect, Page } from "@playwright/test";
import axeTest from "../../helpers/accessibilityTestHelper";
import representationContent from "../../fixtures/content/DSSCreateCase/Representation_content.ts";

type RepresentationPage = {
  representationYes: string;
  representationNo: string;
  continueButton: string;
  backButton: string;
  checkPageLoads(page: Page, welsh: boolean, accessibilityTest: boolean): Promise<void>;
  fillInFields(page: Page, representationPresent: boolean): Promise<void>;
  triggerErrorMessages(page: Page, welsh: boolean): Promise<void>;
  pressBackButton(page: Page): Promise<void>;
};

const representationPage: RepresentationPage = {
  representationYes: "#representation",
  representationNo: "#representation-2",
  continueButton: "#main-form-submit",
  backButton: ".govuk-back-link",

  async checkPageLoads(page: Page, welsh: boolean, accessibilityTest: boolean) {
    switch (welsh) {
      case true:
        await expect(page.locator(".govuk-fieldset__heading")).toHaveText(
          representationContent.welshPageTitle,
        );
        await expect(page.locator(".govuk-label").nth(0)).toHaveText(
          representationContent.welshTextOnPage1,
        );
        await expect(page.locator(".govuk-label").nth(1)).toHaveText(
          representationContent.welshTextOnPage2,
        );
        break;
      case false:
        await expect(page.locator(".govuk-fieldset__heading")).toHaveText(
          representationContent.pageTitle,
        );
        await expect(page.locator(".govuk-label").nth(0)).toHaveText(
          representationContent.textOnPage1,
        );
        await expect(page.locator(".govuk-label").nth(1)).toHaveText(
          representationContent.textOnPage2,
        );
        break;
    }
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async fillInFields(page: Page, representationPresent: boolean) {
    if (representationPresent) {
      await page.click(this.representationYes);
    } else {
      await page.click(this.representationNo);
    }
    await page.click(this.continueButton);
  },

  async triggerErrorMessages(page: Page, welsh: boolean) {
    switch (welsh) {
      case true:
        await page.click(this.continueButton);
        await expect(page.locator(".govuk-error-summary__title")).toHaveText(
          representationContent.welshErrorBanner,
        );
        await expect(page.locator("[href='#representation']")).toHaveText(
          representationContent.welshSelectionError,
        );
        await expect(page.locator("#representation-error")).toContainText(
          representationContent.welshSelectionError,
        );
        break;
      case false:
        await page.click(this.continueButton);
        await expect(page.locator(".govuk-error-summary__title")).toHaveText(
          representationContent.errorBanner,
        );
        await expect(page.locator("[href='#representation']")).toHaveText(
          representationContent.selectionError,
        );
        await expect(page.locator("#representation-error")).toContainText(
          representationContent.selectionError,
        );
        break;
    }
  },

  async pressBackButton(page: Page) {
    await page.click(this.backButton);
  },
};

export default representationPage;
