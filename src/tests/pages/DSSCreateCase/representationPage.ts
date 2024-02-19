import { expect, Page } from "@playwright/test";
import axeTest from "../../helpers/accessibilityTestHelper";
import representationContent from "../../fixtures/content/DSSCreateCase/Representation_content.ts";
import commonHelpers from "../../helpers/commonHelpers.ts";

type RepresentationPage = {
  representationYes: string;
  representationNo: string;
  continueButton: string;
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

  async checkPageLoads(
    page: Page,
    cy: boolean,
    accessibilityTest: boolean,
  ): Promise<void> {
    switch (cy) {
      case true:
        await expect(page.locator(".govuk-fieldset__heading")).toHaveText(
          representationContent.pageTitleCy,
        );
        await expect(page.locator(".govuk-label").nth(0)).toHaveText(
          representationContent.textOnPageCy1,
        );
        await expect(page.locator(".govuk-label").nth(1)).toHaveText(
          representationContent.textOnPageCy2,
        );
        break;
      default:
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
    switch (cy) {
      case true:
        await page.click(this.continueButton);
        await expect(page.locator(".govuk-error-summary__title")).toHaveText(
          representationContent.errorBannerCy,
        );
        await expect(page.locator("[href='#representation']")).toHaveText(
          representationContent.selectionErrorCy,
        );
        await expect(page.locator("#representation-error")).toContainText(
          representationContent.selectionErrorCy,
        );
        break;
      default:
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

  async pressBackButton(page: Page): Promise<void> {
    await commonHelpers.clickBackButton(page);
  },
};

export default representationPage;
