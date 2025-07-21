import { AxeUtils } from "@hmcts/playwright-common";
import { expect, Page } from "@playwright/test";
import path from "path";
import config from "../../config.ts";
import uploadSupportingDocumentsContent from "../../fixtures/content/DSSCreateCase/UploadSupportingDocuments_content.ts";
import commonHelpers from "../../helpers/commonHelpers.ts";

type UploadSupportingDocumentsPage = {
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

const uploadSupportingDocumentsPage: UploadSupportingDocumentsPage = {
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
              `.govuk-heading-l:text-is("${uploadSupportingDocumentsContent.pageTitleCy}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-body:text-is("${uploadSupportingDocumentsContent.textOnPageCy1}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-details__summary-text:text-is("${uploadSupportingDocumentsContent.dropdownLinkCy}")`,
            ),
            1,
          ),
          ...Array.from({ length: 3 }, (_, index) => {
            const textOnPage = (uploadSupportingDocumentsContent as any)[
              `textOnPageCy${index + 2}`
            ];
            return commonHelpers.checkVisibleAndPresent(
              page.locator(
                `details[class='govuk-details'] li:nth-child(${index + 1}):text-is("${textOnPage}")`,
              ),
              1,
            );
          }),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-details__text:has-text("${uploadSupportingDocumentsContent.textOnPageCy5}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-label:text-is("${uploadSupportingDocumentsContent.textOnPageCy6}")`,
            ),
            1,
          ),
          expect(
            page.locator("form[class='formRow'] p[class='govuk-body']"),
          ).toHaveText(uploadSupportingDocumentsContent.textOnPageCy7),
        ]);
        break;
      default:
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-heading-l:text-is("${uploadSupportingDocumentsContent.pageTitle}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-body:text-is("${uploadSupportingDocumentsContent.textOnPage1}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-details__summary-text:text-is("${uploadSupportingDocumentsContent.dropdownLink}")`,
            ),
            1,
          ),
          ...Array.from({ length: 3 }, (_, index) => {
            const textOnPage = (uploadSupportingDocumentsContent as any)[
              `textOnPage${index + 2}`
            ];
            return commonHelpers.checkVisibleAndPresent(
              page.locator(
                `details[class='govuk-details'] li:nth-child(${index + 1}):text-is("${textOnPage}")`,
              ),
              1,
            );
          }),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-details__text:has-text("${uploadSupportingDocumentsContent.textOnPage5}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-label:text-is("${uploadSupportingDocumentsContent.textOnPage6}")`,
            ),
            1,
          ),
          expect(
            page.locator("form[class='formRow'] p[class='govuk-body']"),
          ).toHaveText(uploadSupportingDocumentsContent.textOnPage7),
        ]);
        break;
    }
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
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
    await page.click(this.fields.fileUploadedOption);
    await page.waitForSelector(
      `.uploadedFile:text-is("${path.basename(config.testFile)}")`,
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
        await page.click(this.continueButton);
        break;
      case true:
        await page
          .locator(this.fields.uploadFileButton)
          .setInputFiles(config.testFile);
        await page.click(this.fields.fileUploadedOption);
        await Promise.all([
          expect(page.locator(".uploadedFile").nth(1)).toContainText(
            path.basename(config.testFile),
          ),
          expect(page.locator(".uploadedFile").nth(1)).toContainText(
            uploadSupportingDocumentsContent.deleteButton,
          ),
        ]);
        await page
          .locator(this.fields.uploadFileButton)
          .setInputFiles(config.testFile);
        await page.click(this.fields.fileUploadedOption);
        await Promise.all([
          expect(page.locator(".uploadedFile").nth(2)).toContainText(
            path.basename(config.testFile),
          ),
          expect(page.locator(".uploadedFile").nth(2)).toContainText(
            uploadSupportingDocumentsContent.deleteButton,
          ),
        ]);
        await page
          .locator(this.fields.uploadFileButton)
          .setInputFiles(config.testFile);
        await page.click(this.fields.fileUploadedOption);
        await Promise.all([
          expect(page.locator(".uploadedFile").nth(3)).toContainText(
            path.basename(config.testFile),
          ),
          expect(page.locator(".uploadedFile").nth(3)).toContainText(
            uploadSupportingDocumentsContent.deleteButton,
          ),
        ]);
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
              `.govuk-error-summary__title:text-is("${uploadSupportingDocumentsContent.errorBannerCy}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `[href='#file-upload-1']:text-is("${uploadSupportingDocumentsContent.noUploadErrorCy}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-error-message:text-is("${uploadSupportingDocumentsContent.noUploadErrorCy}")`,
            ),
            1,
          ),
        ]);
        await page.click(this.fields.fileUploadedOption);
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-error-summary__title:text-is("${uploadSupportingDocumentsContent.errorBannerCy}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `[href='#file-upload-1']:text-is("${uploadSupportingDocumentsContent.chooseFileErrorCy}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-error-message:text-is("${uploadSupportingDocumentsContent.chooseFileErrorCy}")`,
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
              `.govuk-error-summary__title:text-is("${uploadSupportingDocumentsContent.errorBannerCy}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `[href='#file-upload-1']:text-is("${uploadSupportingDocumentsContent.fileTypeErrorCy}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-error-message:text-is("${uploadSupportingDocumentsContent.fileTypeErrorCy}")`,
            ),
            1,
          ),
        ]);
        break;
      default:
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-error-summary__title:text-is("${uploadSupportingDocumentsContent.errorBanner}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `[href='#file-upload-1']:text-is("${uploadSupportingDocumentsContent.noUploadError}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-error-message:text-is("${uploadSupportingDocumentsContent.noUploadError}")`,
            ),
            1,
          ),
        ]);
        await page.click(this.fields.fileUploadedOption);
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-error-summary__title:text-is("${uploadSupportingDocumentsContent.errorBanner}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `[href='#file-upload-1']:text-is("${uploadSupportingDocumentsContent.chooseFileError}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-error-message:text-is("${uploadSupportingDocumentsContent.chooseFileError}")`,
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
              `.govuk-error-summary__title:text-is("${uploadSupportingDocumentsContent.errorBanner}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `[href='#file-upload-1']:text-is("${uploadSupportingDocumentsContent.fileTypeError}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-error-message:text-is("${uploadSupportingDocumentsContent.fileTypeError}")`,
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

export default uploadSupportingDocumentsPage;
