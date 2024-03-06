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
  continueButton: string;
  backButton: string;
  checkPageLoads(page: Page, accessibilityTest: boolean): Promise<void>;
  fillInFields(page: Page): Promise<void>;
  uploadDocumentsSection(page: Page, multipleDocuments: boolean): Promise<void>;
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
  continueButton: "button[name='continue']",
  backButton: ".govuk-back-link",

  async checkPageLoads(page: Page, accessibilityTest: boolean): Promise<void> {
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
        const textOnPage = (UploadDocumentsContent as any)[`textOnPage${index + 1}`];
        return expect(page.locator(".govuk-body").nth(index + 4)).toHaveText(
          textOnPage,
        );
      }),
      ...Array.from({ length: 4 }, (_, index) => {
        const textOnPage = (UploadDocumentsContent as any)[`textOnPage${index + 4}`];
        return expect(page.locator(`div[class='govuk-body'] li:nth-child(${index+1})`)).toHaveText(
          textOnPage,
        );
      }),
      expect(page.locator(".govuk-body").nth(8)).toHaveText(
        UploadDocumentsContent.textOnPage8,
      ),
      expect(page.locator(".govuk-details__summary-text")).toHaveText(
        UploadDocumentsContent.dropdownLink,
      ),
    ]);
    await page.click(this.fields.dropDown);
    await Promise.all([
      ...Array.from({ length: 4 }, (_, index) => {
        const textOnPage = (UploadDocumentsContent as any)[`textOnPage${index + 9}`];
        return expect(page.locator(`details[class='govuk-details'] li:nth-child(${index+1})`)).toHaveText(
          textOnPage,
        );
      }),
      expect(page.locator("details[class='govuk-details'] p")).toContainText(
        UploadDocumentsContent.textOnPage13,
      ),
      ...Array.from({ length: 2 }, (_, index) => {
        const textOnPage = (UploadDocumentsContent as any)[`textOnPage${index + 14}`];
        return expect(page.locator(".govuk-label").nth(index)).toHaveText(
          textOnPage,
        );
      }),
      expect(page.locator(".govuk-body").nth(11)).toHaveText(
        UploadDocumentsContent.textOnPage16,
      ),
      expect(page.locator(this.continueButton)).toHaveText("Continue"),
    ]);
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async fillInFields(page: Page): Promise<void> {
    await page.fill(
      this.fields.additionalInfo,
      UploadDocumentsContent.additionalInfo,
    );
  },

  async uploadDocumentsSection(
    page: Page,
    multipleDocuments: boolean,
  ): Promise<void> {
    // await page
    //   .locator(this.fields.uploadFileButton)
    //   .setInputFiles(config.testWordFile);
    // await page.click(this.fields.fileUploadedOption);
    // await expect(page.locator(".uploadedFile").first()).toContainText(
    //   path.basename(config.testWordFile),
    // );
    // To be completed with upload document fix
  },

  async triggerErrorMessages(page: Page): Promise<void> {
    await page.click(this.continueButton);
    await expect(page.locator(".govuk-error-summary__title")).toHaveText(
      UploadDocumentsContent.errorBanner,
    );
    await expect(page.locator("[href='#file-upload-1']")).toHaveText(
      UploadDocumentsContent.continueError,
    );
    await page
      .locator(this.fields.uploadFileButton)
      .setInputFiles(config.testOdtFile);
    await page.click(this.fields.fileUploadedOption);
    await expect(page.locator(".govuk-error-summary__title")).toHaveText(
      UploadDocumentsContent.errorBanner,
    );
    await expect(page.locator("[href='#file-upload-1']")).toHaveText(
      UploadDocumentsContent.fileTypeError,
    );
  },

  async continueOn(page: Page): Promise<void> {
    await page.click(this.continueButton);
  },

  async pressBackButton(page: Page): Promise<void> {
    await page.click(this.backButton);
  },
};

export default uploadDocumentsPage;
