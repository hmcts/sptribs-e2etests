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
    fileUploadedOption: string;
  };
  continueButton: string;
  backButton: string;
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
    fileUploadedOption: 'button[type="upload document"]',
  },

  continueButton: "#main-form-submit",
  backButton: ".govuk-back-link",

  async checkPageLoads(
    page: Page,
    cy: boolean,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page.click(this.fields.dropDown);
    switch (cy) {
      case true:
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-heading-l:text-is("${uploadAppealFormContent.pageTitleCy}")`,
            ),
            1,
          ),
          ...Array.from({ length: 2 }, (_, index) => {
            const textOnPage = (uploadAppealFormContent as any)[
              `textOnPageCy${index + 1}`
            ];
            return commonHelpers.checkVisibleAndPresent(
              page.locator(`.govuk-body:text-is("${textOnPage}")`),
              1,
            );
          }),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-details__summary-text:text-is("${uploadAppealFormContent.dropdownLinkCy}")`,
            ),
            1,
          ),
          ...Array.from({ length: 3 }, (_, index) => {
            const textOnPage = (uploadAppealFormContent as any)[
              `textOnPageCy${index + 3}`
            ];
            return commonHelpers.checkVisibleAndPresent(
              page.locator(
                `details[class='govuk-details'] li:text-is("${textOnPage}")`,
              ),
              1,
            );
          }),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-details__text:has-text("${uploadAppealFormContent.textOnPageCy6}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-label:text-is("${uploadAppealFormContent.textOnPageCy7}")`,
            ),
            1,
          ),
          expect(
            page.locator("form[class='formRow'] p[class='govuk-body']"),
          ).toHaveText(uploadAppealFormContent.textOnPageCy8),
        ]);
        break;
      default:
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-heading-l:text-is("${uploadAppealFormContent.pageTitle}")`,
            ),
            1,
          ),
          ...Array.from({ length: 2 }, (_, index) => {
            const textOnPage = (uploadAppealFormContent as any)[
              `textOnPage${index + 1}`
            ];
            return commonHelpers.checkVisibleAndPresent(
              page.locator(`.govuk-body:text-is("${textOnPage}")`),
              1,
            );
          }),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-details__summary-text:text-is("${uploadAppealFormContent.dropdownLink}")`,
            ),
            1,
          ),
          ...Array.from({ length: 3 }, (_, index) => {
            const textOnPage = (uploadAppealFormContent as any)[
              `textOnPage${index + 3}`
            ];
            return commonHelpers.checkVisibleAndPresent(
              page.locator(
                `details[class='govuk-details'] li:text-is("${textOnPage}")`,
              ),
              1,
            );
          }),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-details__text:has-text("${uploadAppealFormContent.textOnPage6}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-label:text-is("${uploadAppealFormContent.textOnPage7}")`,
            ),
            1,
          ),
          expect(
            page.locator("form[class='formRow'] p[class='govuk-body']"),
          ).toHaveText(uploadAppealFormContent.textOnPage8),
        ]);
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
    await page.click(this.fields.fileUploadedOption);
    await new Promise((resolve) => setTimeout(resolve, 5000));
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
        await page.click(this.continueButton);
        break;
      case true:
        await page
          .locator(this.fields.uploadFileButton)
          .setInputFiles(config.testPdfFile);
        await page.click(this.fields.fileUploadedOption);
        await expect(page.locator(".uploadedFile").nth(1)).toContainText(
          path.basename(config.testPdfFile),
        );
        await expect(page.locator(".uploadedFile").nth(1)).toContainText(
          uploadAppealFormContent.deleteButton,
        );
        await page
          .locator(this.fields.uploadFileButton)
          .setInputFiles(config.testPdfFile);
        await page.click(this.fields.fileUploadedOption);
        await expect(page.locator(".uploadedFile").nth(2)).toContainText(
          path.basename(config.testPdfFile),
        );
        await expect(page.locator(".uploadedFile").nth(2)).toContainText(
          uploadAppealFormContent.deleteButton,
        );
        await page
          .locator(this.fields.uploadFileButton)
          .setInputFiles(config.testPdfFile);
        await page.click(this.fields.fileUploadedOption);
        await expect(page.locator(".uploadedFile").nth(3)).toContainText(
          path.basename(config.testPdfFile),
        );
        await expect(page.locator(".uploadedFile").nth(3)).toContainText(
          uploadAppealFormContent.deleteButton,
        );
        await page.click(this.continueButton);
        break;
    }
  },

  async triggerErrorMessages(page: Page, cy: boolean): Promise<void> {
    await page.click(this.continueButton);
    switch (cy) {
      case true:
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-error-summary__title:text-is("${uploadAppealFormContent.errorBannerCy}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `[href='#file-upload-1']:text-is("${uploadAppealFormContent.noUploadErrorCy}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-error-message:text-is("${uploadAppealFormContent.noUploadErrorCy}")`,
            ),
            1,
          ),
        ]);
        await page.click(this.fields.fileUploadedOption);
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-error-summary__title:text-is("${uploadAppealFormContent.errorBannerCy}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `[href='#file-upload-1']:text-is("${uploadAppealFormContent.chooseFileErrorCy}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-error-message:text-is("${uploadAppealFormContent.chooseFileErrorCy}")`,
            ),
            1,
          ),
        ]);
        await page
          .locator(this.fields.uploadFileButton)
          .setInputFiles(config.testOdtFile);
        await page.click(this.fields.fileUploadedOption);
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-error-summary__title:text-is("${uploadAppealFormContent.errorBannerCy}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `[href='#file-upload-1']:text-is("${uploadAppealFormContent.fileTypeErrorCy}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-error-message:text-is("${uploadAppealFormContent.fileTypeErrorCy}")`,
            ),
            1,
          ),
        ]);
        break;
      default:
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-error-summary__title:text-is("${uploadAppealFormContent.errorBanner}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `[href='#file-upload-1']:text-is("${uploadAppealFormContent.noUploadError}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-error-message:text-is("${uploadAppealFormContent.noUploadError}")`,
            ),
            1,
          ),
        ]);
        await page.click(this.fields.fileUploadedOption);
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-error-summary__title:text-is("${uploadAppealFormContent.errorBanner}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `[href='#file-upload-1']:text-is("${uploadAppealFormContent.chooseFileError}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-error-message:text-is("${uploadAppealFormContent.chooseFileError}")`,
            ),
            1,
          ),
        ]);
        await page
          .locator(this.fields.uploadFileButton)
          .setInputFiles(config.testOdtFile);
        await page.click(this.fields.fileUploadedOption);
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-error-summary__title:text-is("${uploadAppealFormContent.errorBanner}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `[href='#file-upload-1']:text-is("${uploadAppealFormContent.fileTypeError}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-error-message:text-is("${uploadAppealFormContent.fileTypeError}")`,
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

export default uploadAppealFormPage;
