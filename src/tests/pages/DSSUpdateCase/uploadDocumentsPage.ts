import { expect, Page } from "@playwright/test";
import path from "path";
import config from "../../config.ts";
import axeTest from "../../helpers/accessibilityTestHelper";
import UploadDocumentsContent from "../../fixtures/content/DSSUpdateCase/UploadDocuments_content.ts";

type UploadDocumentsPage = {
  fields: {
    dropDown: string;
    uploadFileButton: string;
    fileUploadedOption: string;
    documentRelevance: string;
    additionalInfo: string;
  };
  deleteButton: string;
  continueButton: string;
  backButton: string;
  checkPageLoads(page: Page, accessibilityTest: boolean): Promise<void>;
  fillInFields(page: Page, additionalInformation: boolean): Promise<void>;
  uploadDocumentsSection(
    page: Page,
    uploadDocument: boolean,
    multipleDocuments: boolean,
  ): Promise<void>;
  continueOn(page: Page): Promise<void>;
  triggerErrorMessages(page: Page): Promise<void>;
  pressBackButton(page: Page): Promise<void>;
};

const uploadDocumentsPage: UploadDocumentsPage = {
  fields: {
    additionalInfo: "#documentDetail",
    dropDown: ".govuk-details__summary-text",
    uploadFileButton: "#file-upload-1",
    fileUploadedOption: 'button[type="upload document"]',
    documentRelevance: "#eventName",
  },
  deleteButton: ".govuk-link--no-visited-state",
  continueButton: "button[name='continue']",
  backButton: ".govuk-back-link",

  async checkPageLoads(page: Page, accessibilityTest: boolean): Promise<void> {
    await page.click(this.fields.dropDown);
    await Promise.all([
      expect(page.locator(".govuk-header__service-name")).toHaveText(
        UploadDocumentsContent.header,
      ),
      expect(page.locator(".govuk-heading-l")).toHaveText(
        UploadDocumentsContent.pageTitle,
      ),
      expect(page.locator(".govuk-hint")).toHaveText(
        UploadDocumentsContent.hintText,
      ),
      expect(page.locator(".govuk-heading-m").nth(1)).toHaveText(
        UploadDocumentsContent.subTitle1,
      ),
      ...Array.from({ length: 3 }, (_, index) => {
        const textOnPage = (UploadDocumentsContent as any)[
          `textOnPage${index + 1}`
        ];
        return expect(page.locator(".govuk-body").nth(index + 4)).toHaveText(
          textOnPage,
        );
      }),
      ...Array.from({ length: 4 }, (_, index) => {
        const textOnPage = (UploadDocumentsContent as any)[
          `textOnPage${index + 4}`
        ];
        return expect(
          page.locator(`div[class='govuk-body'] li:nth-child(${index + 1})`),
        ).toHaveText(textOnPage);
      }),
      expect(page.locator(".govuk-body").nth(8)).toHaveText(
        UploadDocumentsContent.textOnPage8,
      ),
      expect(page.locator(".govuk-details__summary-text")).toHaveText(
        UploadDocumentsContent.dropdownLink,
      ),
      ...Array.from({ length: 4 }, (_, index) => {
        const textOnPage = (UploadDocumentsContent as any)[
          `textOnPage${index + 9}`
        ];
        return expect(
          page.locator(
            `details[class='govuk-details'] li:nth-child(${index + 1})`,
          ),
        ).toHaveText(textOnPage);
      }),
      expect(page.locator("details[class='govuk-details'] p")).toContainText(
        UploadDocumentsContent.textOnPage13,
      ),
      ...Array.from({ length: 2 }, (_, index) => {
        const textOnPage = (UploadDocumentsContent as any)[
          `textOnPage${index + 14}`
        ];
        return expect(page.locator(".govuk-label").nth(index)).toHaveText(
          textOnPage,
        );
      }),
      expect(page.locator(".govuk-body").nth(11)).toHaveText(
        UploadDocumentsContent.textOnPage16,
      ),
      expect(page.locator(this.continueButton)).toHaveText(
        UploadDocumentsContent.continueButton,
      ),
    ]);
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async fillInFields(
    page: Page,
    additionalInformation: boolean,
  ): Promise<void> {
    if (additionalInformation) {
      await page.fill(
        this.fields.additionalInfo,
        UploadDocumentsContent.additionalInfo,
      );
    }
  },

  async uploadDocumentsSection(
    page: Page,
    uploadDocument: boolean,
    multipleDocuments: boolean,
  ): Promise<void> {
    if (uploadDocument) {
      await page
        .locator(this.fields.uploadFileButton)
        .setInputFiles(config.testWordFile);
      await page.click(this.fields.fileUploadedOption);
      await expect(page.locator(".uploadedFile").first()).toContainText(
        path.basename(config.testWordFile),
      );
      await expect(page.locator(".uploadedFile").first()).toContainText(
        UploadDocumentsContent.deleteButton,
      );
      await page.click(this.deleteButton);
      await expect(page.locator(".uploadedFile")).toHaveCount(0);
      await page
        .locator(this.fields.uploadFileButton)
        .setInputFiles(config.testWordFile);
      await page.click(this.fields.fileUploadedOption);
      await expect(page.locator(".uploadedFile").first()).toContainText(
        path.basename(config.testWordFile),
      );
      await expect(page.locator(".uploadedFile").first()).toContainText(
        UploadDocumentsContent.deleteButton,
      );
      if (multipleDocuments) {
        for (let i = 0; i < 4; i++) {
          await page
            .locator(this.fields.uploadFileButton)
            .setInputFiles(config.testPdfFile);
          await page.click(this.fields.fileUploadedOption);
          await expect(page.locator(".uploadedFile").nth(i + 1)).toContainText(
            path.basename(config.testPdfFile),
          );
          await expect(page.locator(".uploadedFile").nth(i + 1)).toContainText(
            UploadDocumentsContent.deleteButton,
          );
        }
        for (let i = 0; i < 5; i++) {
          await page
            .locator(this.fields.uploadFileButton)
            .setInputFiles(config.testFile);
          await page.click(this.fields.fileUploadedOption);
          await expect(page.locator(".uploadedFile").nth(i + 5)).toContainText(
            path.basename(config.testFile),
          );
          await expect(page.locator(".uploadedFile").nth(i + 5)).toContainText(
            UploadDocumentsContent.deleteButton,
          );
        }
      }
    }
  },

  async triggerErrorMessages(page: Page): Promise<void> {
    await page.click(this.continueButton);
    await Promise.all([
      expect(page.locator(".govuk-error-summary__title")).toHaveText(
        UploadDocumentsContent.errorBanner,
      ),
      expect(page.locator("[href='#file-upload-1']")).toHaveText(
        UploadDocumentsContent.continueError,
      ),
    ]);
    await page
      .locator(this.fields.uploadFileButton)
      .setInputFiles(config.testOdtFile);
    await page.click(this.fields.fileUploadedOption);
    await Promise.all([
      expect(page.locator(".govuk-error-summary__title")).toHaveText(
        UploadDocumentsContent.errorBanner,
      ),
      expect(page.locator("[href='#file-upload-1']")).toHaveText(
        UploadDocumentsContent.fileTypeError,
      ),
    ]);
  },

  async continueOn(page: Page): Promise<void> {
    await page.click(this.continueButton);
  },

  async pressBackButton(page: Page): Promise<void> {
    await page.click(this.backButton);
  },
};

export default uploadDocumentsPage;
