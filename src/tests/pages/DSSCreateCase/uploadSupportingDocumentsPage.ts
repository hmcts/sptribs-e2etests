import { expect, Page } from "@playwright/test";
import path from "path";
import config from "../../config.ts";
import axeTest from "../../helpers/accessibilityTestHelper";
import uploadSupportingDocumentsContent from "../../fixtures/content/DSSCreateCase/UploadSupportingDocuments_content.ts";
import commonHelpers from "../../helpers/commonHelpers.ts";

type UploadSupportingDocumentsPage = {
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

const uploadSupportingDocumentsPage: UploadSupportingDocumentsPage = {
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
          uploadSupportingDocumentsContent.pageTitleCy,
        );
        await expect(page.locator(".govuk-body").nth(4)).toHaveText(
          uploadSupportingDocumentsContent.textOnPageCy1,
        );
        await expect(page.locator(".govuk-details__summary-text")).toHaveText(
          uploadSupportingDocumentsContent.dropdownLinkCy,
        );
        await page.click(this.fields.dropDown);
        await expect(
          page.locator("details[class='govuk-details'] li:nth-child(1)"),
        ).toHaveText(uploadSupportingDocumentsContent.textOnPageCy2);
        await expect(
          page.locator("details[class='govuk-details'] li:nth-child(2)"),
        ).toContainText(uploadSupportingDocumentsContent.textOnPageCy3);
        await expect(
          page.locator("details[class='govuk-details'] li:nth-child(3)"),
        ).toContainText(uploadSupportingDocumentsContent.textOnPageCy4);
        await expect(page.locator(".govuk-details__text")).toContainText(
          uploadSupportingDocumentsContent.textOnPageCy5,
        );
        await expect(page.locator(".govuk-label").nth(0)).toHaveText(
          uploadSupportingDocumentsContent.textOnPageCy6,
        );
        await expect(
          page.locator("form[class='formRow'] p[class='govuk-body']"),
        ).toHaveText(uploadSupportingDocumentsContent.textOnPageCy7);
        break;
      default:
        await expect(page.locator(".govuk-heading-l")).toHaveText(
          uploadSupportingDocumentsContent.pageTitle,
        );
        await expect(page.locator(".govuk-body").nth(4)).toHaveText(
          uploadSupportingDocumentsContent.textOnPage1,
        );
        await expect(page.locator(".govuk-details__summary-text")).toHaveText(
          uploadSupportingDocumentsContent.dropdownLink,
        );
        await page.click(this.fields.dropDown);
        await expect(
          page.locator("details[class='govuk-details'] li:nth-child(1)"),
        ).toHaveText(uploadSupportingDocumentsContent.textOnPage2);
        await expect(
          page.locator("details[class='govuk-details'] li:nth-child(2)"),
        ).toContainText(uploadSupportingDocumentsContent.textOnPage3);
        await expect(
          page.locator("details[class='govuk-details'] li:nth-child(3)"),
        ).toContainText(uploadSupportingDocumentsContent.textOnPage4);
        await expect(page.locator(".govuk-details__text")).toContainText(
          uploadSupportingDocumentsContent.textOnPage5,
        );
        await expect(page.locator(".govuk-label").nth(0)).toHaveText(
          uploadSupportingDocumentsContent.textOnPage6,
        );
        await expect(
          page.locator("form[class='formRow'] p[class='govuk-body']"),
        ).toHaveText(uploadSupportingDocumentsContent.textOnPage7);
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
      .setInputFiles(config.testFile);
    await commonHelpers.clickUploadButton(page);
    await expect(page.locator(".uploadedFile").first()).toContainText(
      path.basename(config.testFile),
    );
    if (cy) {
      await expect(
        page.locator(
          "main[id='main-content'] li:nth-child(1).govuk-\\!-padding-top-2.govuk-\\!-padding-bottom-3.govuk-section-break.govuk-section-break--visible",
        ),
      ).toContainText(uploadSupportingDocumentsContent.deleteButtonCy);
    } else {
      await expect(
        page.locator(
          "main[id='main-content'] li:nth-child(1).govuk-\\!-padding-top-2.govuk-\\!-padding-bottom-3.govuk-section-break.govuk-section-break--visible",
        ),
      ).toContainText(uploadSupportingDocumentsContent.deleteButton);
    }
    switch (multipleDocuments) {
      case false:
        await commonHelpers.clickContinueButton(page);
        break;
      case true:
        await page
          .locator(this.fields.uploadFileButton)
          .setInputFiles(config.testFile);
        await commonHelpers.clickUploadButton(page);
        await expect(page.locator(".uploadedFile").nth(1)).toContainText(
          path.basename(config.testFile),
        );
        await expect(page.locator(".uploadedFile").nth(1)).toContainText(
          uploadSupportingDocumentsContent.deleteButton,
        );
        await page
          .locator(this.fields.uploadFileButton)
          .setInputFiles(config.testFile);
        await commonHelpers.clickUploadButton(page);
        await expect(page.locator(".uploadedFile").nth(2)).toContainText(
          path.basename(config.testFile),
        );
        await expect(page.locator(".uploadedFile").nth(2)).toContainText(
          uploadSupportingDocumentsContent.deleteButton,
        );
        await page
          .locator(this.fields.uploadFileButton)
          .setInputFiles(config.testFile);
        await commonHelpers.clickUploadButton(page);
        await expect(page.locator(".uploadedFile").nth(3)).toContainText(
          path.basename(config.testFile),
        );
        await expect(page.locator(".uploadedFile").nth(3)).toContainText(
          uploadSupportingDocumentsContent.deleteButton,
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
          uploadSupportingDocumentsContent.errorBannerCy,
        );
        await expect(page.locator("[href='#file-upload-1']")).toHaveText(
          uploadSupportingDocumentsContent.noUploadErrorCy,
        );
        await page
          .locator(this.fields.uploadFileButton)
          .setInputFiles(config.testOdtFile);
        await commonHelpers.clickUploadButton(page);
        await expect(page.locator(".govuk-error-summary__title")).toHaveText(
          uploadSupportingDocumentsContent.errorBannerCy,
        );
        await expect(page.locator("[href='#file-upload-1']")).toHaveText(
          uploadSupportingDocumentsContent.fileTypeErrorCy,
        );
        break;
      default:
        await commonHelpers.clickContinueButton(page);
        await expect(page.locator(".govuk-error-summary__title")).toHaveText(
          uploadSupportingDocumentsContent.errorBanner,
        );
        await expect(page.locator("[href='#file-upload-1']")).toHaveText(
          uploadSupportingDocumentsContent.noUploadError,
        );
        await page
          .locator(this.fields.uploadFileButton)
          .setInputFiles(config.testOdtFile);
        await commonHelpers.clickUploadButton(page);
        await expect(page.locator(".govuk-error-summary__title")).toHaveText(
          uploadSupportingDocumentsContent.errorBanner,
        );
        await expect(page.locator("[href='#file-upload-1']")).toHaveText(
          uploadSupportingDocumentsContent.fileTypeError,
        );
        break;
    }
  },

  async pressBackButton(page: Page): Promise<void> {
    await commonHelpers.clickBackButton(page);
  },
};

export default uploadSupportingDocumentsPage;
