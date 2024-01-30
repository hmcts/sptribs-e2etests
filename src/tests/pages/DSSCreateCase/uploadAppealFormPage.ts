import { expect, Page } from "@playwright/test";
import path from "path";
import config from "../../config.ts";
import axeTest from "../../helpers/accessibilityTestHelper";
import uploadAppealFormContent from "../../fixtures/content/DSSCreateCase/UploadAppealForm_content.ts";

type UploadAppealFormPage = {
  fields: {
    dropDown: string;
    uploadFileButton: string;
    fileUploadedOption: string;
  };
  continueButton: string;
  backButton: string;
  checkPageLoads(
    page: Page,
    welsh: boolean,
    accessibilityTest: boolean,
  ): Promise<void>;
  uploadDocumentsSection(page: Page, welsh: boolean): Promise<void>;
  triggerErrorMessages(page: Page, welsh: boolean): Promise<void>;
  pressBackButton(page: Page): Promise<void>;
};

const uploadAppealFormPage: UploadAppealFormPage = {
  fields: {
    dropDown: ".govuk-details__summary-text",
    uploadFileButton: "#file-upload-1",
    fileUploadedOption: 'button[type="upload document"]',
  },

  continueButton: "#main-form-submit",
  backButton: ".govuk-back-link",

  async checkPageLoads(
    page: Page,
    welsh: boolean,
    accessibilityTest: boolean,
  ): Promise<void> {
    switch (welsh) {
      case true:
        await expect(page.locator(".govuk-heading-l")).toHaveText(
          uploadAppealFormContent.welshPageTitle,
        );
        await expect(page.locator(".govuk-body").nth(4)).toHaveText(
          uploadAppealFormContent.welshTextOnPage1,
        );
        await expect(page.locator(".govuk-body").nth(5)).toHaveText(
          uploadAppealFormContent.welshTextOnPage2,
        );
        await expect(page.locator(".govuk-details__summary-text")).toHaveText(
          uploadAppealFormContent.welshDropdownLink,
        );
        await page.click(this.fields.dropDown);
        await expect(page.locator(".govuk-details__summary-text")).toHaveText(
          uploadAppealFormContent.welshDropdownLink,
        );
        await expect(
          page.locator("details[class='govuk-details'] li:nth-child(1)"),
        ).toHaveText(uploadAppealFormContent.welshTextOnPage3);
        await expect(
          page.locator("details[class='govuk-details'] li:nth-child(2)"),
        ).toContainText(uploadAppealFormContent.welshTextOnPage4);
        await expect(
          page.locator("details[class='govuk-details'] li:nth-child(3)"),
        ).toContainText(uploadAppealFormContent.welshTextOnPage5);
        await expect(page.locator(".govuk-details__text")).toContainText(
          uploadAppealFormContent.welshTextOnPage6,
        );
        await expect(page.locator(".govuk-label").nth(0)).toHaveText(
          uploadAppealFormContent.welshTextOnPage7,
        );
        await expect(
          page.locator("form[class='formRow'] p[class='govuk-body']"),
        ).toHaveText(uploadAppealFormContent.welshTextOnPage8);
        break;
      case false:
        await expect(page.locator(".govuk-heading-l")).toHaveText(
          uploadAppealFormContent.pageTitle,
        );
        await expect(page.locator(".govuk-body").nth(4)).toHaveText(
          uploadAppealFormContent.textOnPage1,
        );
        await expect(page.locator(".govuk-body").nth(5)).toHaveText(
          uploadAppealFormContent.textOnPage2,
        );
        await expect(page.locator(".govuk-details__summary-text")).toHaveText(
          uploadAppealFormContent.dropdownLink,
        );
        await page.click(this.fields.dropDown);
        await expect(page.locator(".govuk-details__summary-text")).toHaveText(
          uploadAppealFormContent.dropdownLink,
        );
        await expect(
          page.locator("details[class='govuk-details'] li:nth-child(1)"),
        ).toHaveText(uploadAppealFormContent.textOnPage3);
        await expect(
          page.locator("details[class='govuk-details'] li:nth-child(2)"),
        ).toContainText(uploadAppealFormContent.textOnPage4);
        await expect(
          page.locator("details[class='govuk-details'] li:nth-child(3)"),
        ).toContainText(uploadAppealFormContent.textOnPage5);
        await expect(page.locator(".govuk-details__text")).toContainText(
          uploadAppealFormContent.textOnPage6,
        );
        await expect(page.locator(".govuk-label").nth(0)).toHaveText(
          uploadAppealFormContent.textOnPage7,
        );
        await expect(
          page.locator("form[class='formRow'] p[class='govuk-body']"),
        ).toHaveText(uploadAppealFormContent.textOnPage8);
        break;
    }
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async uploadDocumentsSection(page: Page, welsh: boolean): Promise<void> {
    await page
      .locator(this.fields.uploadFileButton)
      .setInputFiles(config.testPdfFile);
    await page.click(this.fields.fileUploadedOption);
    await expect(
      page.locator(
        "main[id='main-content'] li:nth-child(1).govuk-\\!-padding-top-2.govuk-\\!-padding-bottom-3.govuk-section-break.govuk-section-break--visible",
      ),
    ).toContainText(path.basename(config.testPdfFile));
    if (welsh) {
      await expect(
        page.locator(
          "main[id='main-content'] li:nth-child(1).govuk-\\!-padding-top-2.govuk-\\!-padding-bottom-3.govuk-section-break.govuk-section-break--visible",
        ),
      ).toContainText(uploadAppealFormContent.welshDeleteButton);
    } else {
      await expect(
        page.locator(
          "main[id='main-content'] li:nth-child(1).govuk-\\!-padding-top-2.govuk-\\!-padding-bottom-3.govuk-section-break.govuk-section-break--visible",
        ),
      ).toContainText(uploadAppealFormContent.deleteButton);
    }
    await page.click(this.continueButton);
  },

  async triggerErrorMessages(page: Page, welsh: boolean): Promise<void> {
    switch (welsh) {
      case true:
        await page.click(this.continueButton);
        await expect(page.locator(".govuk-error-summary__title")).toHaveText(
          uploadAppealFormContent.welshErrorBanner,
        );
        await expect(page.locator("[href='#file-upload-1']")).toHaveText(
          uploadAppealFormContent.welshNoUploadError,
        );
        await page
          .locator(this.fields.uploadFileButton)
          .setInputFiles(config.testOdtFile);
        await page.click(this.fields.fileUploadedOption);
        await expect(page.locator(".govuk-error-summary__title")).toHaveText(
          uploadAppealFormContent.welshErrorBanner,
        );
        await expect(page.locator("[href='#file-upload-1']")).toHaveText(
          uploadAppealFormContent.welshFileTypeError,
        );
        break;
      case false:
        await page.click(this.continueButton);
        await expect(page.locator(".govuk-error-summary__title")).toHaveText(
          uploadAppealFormContent.errorBanner,
        );
        await expect(page.locator("[href='#file-upload-1']")).toHaveText(
          uploadAppealFormContent.noUploadError,
        );
        await page
          .locator(this.fields.uploadFileButton)
          .setInputFiles(config.testOdtFile);
        await page.click(this.fields.fileUploadedOption);
        await expect(page.locator(".govuk-error-summary__title")).toHaveText(
          uploadAppealFormContent.errorBanner,
        );
        await expect(page.locator("[href='#file-upload-1']")).toHaveText(
          uploadAppealFormContent.fileTypeError,
        );
        break;
    }
  },

  async pressBackButton(page: Page): Promise<void> {
    await page.click(this.backButton);
  },
};

export default uploadAppealFormPage;
