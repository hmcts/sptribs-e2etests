import { expect, Page } from "@playwright/test";
import path from "path";
import config from "../../config.ts";
import axeTest from "../../helpers/accessibilityTestHelper";
import uploadAppealFormContent from "../../fixtures/content/DSSCreateCase/UploadAppealForm_content.ts";
import commonHelpers from "../../helpers/commonHelpers.ts";

type UploadAppealFormPage = {
  fields: {
    dropDown: string;
    uploadFileButton: string;
    
  };
  checkPageLoads(
    page: Page,
    cy: boolean,
    accessibilityTest: boolean,
  ): Promise<void>;
  uploadDocumentsSection(
    page: Page,
    cy: boolean,
    multipleDocuments: boolean,
  ): Promise<void>;
  triggerErrorMessages(page: Page, cy: boolean): Promise<void>;
  pressBackButton(page: Page): Promise<void>;
};

const uploadAppealFormPage: UploadAppealFormPage = {
  fields: {
    dropDown: ".govuk-details__summary-text",
    uploadFileButton: "#file-upload-1",
    
  },

  async checkPageLoads(
    page: Page,
    cy: boolean,
    accessibilityTest: boolean,
  ): Promise<void> {
    switch (cy) {
      case true:
        await expect(page.locator(".govuk-heading-l")).toHaveText(
          uploadAppealFormContent.pageTitleCy,
        );
        await expect(page.locator(".govuk-body").nth(4)).toHaveText(
          uploadAppealFormContent.textOnPageCy1,
        );
        await expect(page.locator(".govuk-body").nth(5)).toHaveText(
          uploadAppealFormContent.textOnPageCy2,
        );
        await expect(page.locator(".govuk-details__summary-text")).toHaveText(
          uploadAppealFormContent.dropdownLinkCy,
        );
        await page.click(this.fields.dropDown);
        await expect(page.locator(".govuk-details__summary-text")).toHaveText(
          uploadAppealFormContent.dropdownLinkCy,
        );
        await expect(
          page.locator("details[class='govuk-details'] li:nth-child(1)"),
        ).toHaveText(uploadAppealFormContent.textOnPageCy3);
        await expect(
          page.locator("details[class='govuk-details'] li:nth-child(2)"),
        ).toContainText(uploadAppealFormContent.textOnPageCy4);
        await expect(
          page.locator("details[class='govuk-details'] li:nth-child(3)"),
        ).toContainText(uploadAppealFormContent.textOnPageCy5);
        await expect(page.locator(".govuk-details__text")).toContainText(
          uploadAppealFormContent.textOnPageCy6,
        );
        await expect(page.locator(".govuk-label").nth(0)).toHaveText(
          uploadAppealFormContent.textOnPageCy7,
        );
        await expect(
          page.locator("form[class='formRow'] p[class='govuk-body']"),
        ).toHaveText(uploadAppealFormContent.textOnPageCy8);
        break;
      default:
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

  async uploadDocumentsSection(
    page: Page,
    cy: boolean,
    multipleDocuments: boolean,
  ): Promise<void> {
    await page
      .locator(this.fields.uploadFileButton)
      .setInputFiles(config.testPdfFile);
    await commonHelpers.clickUploadButton(page);
    await expect(page.locator(".uploadedFile").first()).toContainText(
      path.basename(config.testPdfFile),
    );
    if (cy) {
      await expect(
        page.locator(
          "main[id='main-content'] li:nth-child(1).govuk-\\!-padding-top-2.govuk-\\!-padding-bottom-3.govuk-section-break.govuk-section-break--visible",
        ),
      ).toContainText(uploadAppealFormContent.deleteButtonCy);
    } else {
      await expect(
        page.locator(
          "main[id='main-content'] li:nth-child(1).govuk-\\!-padding-top-2.govuk-\\!-padding-bottom-3.govuk-section-break.govuk-section-break--visible",
        ),
      ).toContainText(uploadAppealFormContent.deleteButton);
    }
    switch (multipleDocuments) {
      case false:
        await commonHelpers.clickContinueButton(page);
        break;
      case true:
        await page
          .locator(this.fields.uploadFileButton)
          .setInputFiles(config.testPdfFile);
        await commonHelpers.clickUploadButton(page);
        await expect(page.locator(".uploadedFile").nth(1)).toContainText(
          path.basename(config.testPdfFile),
        );
        await expect(page.locator(".uploadedFile").nth(1)).toContainText(
          uploadAppealFormContent.deleteButton,
        );
        await page
          .locator(this.fields.uploadFileButton)
          .setInputFiles(config.testPdfFile);
        await commonHelpers.clickUploadButton(page);
        await expect(page.locator(".uploadedFile").nth(2)).toContainText(
          path.basename(config.testPdfFile),
        );
        await expect(page.locator(".uploadedFile").nth(2)).toContainText(
          uploadAppealFormContent.deleteButton,
        );
        await page
          .locator(this.fields.uploadFileButton)
          .setInputFiles(config.testPdfFile);
        await commonHelpers.clickUploadButton(page);
        await expect(page.locator(".uploadedFile").nth(3)).toContainText(
          path.basename(config.testPdfFile),
        );
        await expect(page.locator(".uploadedFile").nth(3)).toContainText(
          uploadAppealFormContent.deleteButton,
        );
        await commonHelpers.clickContinueButton(page);
        break;
    }
  },

  async triggerErrorMessages(page: Page, cy: boolean): Promise<void> {
    switch (cy) {
      case true:
        await commonHelpers.clickContinueButton(page);
        await expect(page.locator(".govuk-error-summary__title")).toHaveText(
          uploadAppealFormContent.errorBannerCy,
        );
        await expect(page.locator("[href='#file-upload-1']")).toHaveText(
          uploadAppealFormContent.noUploadErrorCy,
        );
        await page
          .locator(this.fields.uploadFileButton)
          .setInputFiles(config.testOdtFile);
        await commonHelpers.clickUploadButton(page);
        await expect(page.locator(".govuk-error-summary__title")).toHaveText(
          uploadAppealFormContent.errorBannerCy,
        );
        await expect(page.locator("[href='#file-upload-1']")).toHaveText(
          uploadAppealFormContent.fileTypeErrorCy,
        );
        break;
      default:
        await commonHelpers.clickContinueButton(page);
        await expect(page.locator(".govuk-error-summary__title")).toHaveText(
          uploadAppealFormContent.errorBanner,
        );
        await expect(page.locator("[href='#file-upload-1']")).toHaveText(
          uploadAppealFormContent.noUploadError,
        );
        await page
          .locator(this.fields.uploadFileButton)
          .setInputFiles(config.testOdtFile);
        await commonHelpers.clickUploadButton(page);
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
    await commonHelpers.clickBackButton(page);
  },
};

export default uploadAppealFormPage;
