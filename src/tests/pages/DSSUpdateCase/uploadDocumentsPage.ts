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
    await expect(page.locator(".govuk-header__service-name")).toHaveText(
      UploadDocumentsContent.header,
    );
    await expect(page.locator(".govuk-heading-l")).toHaveText(
      UploadDocumentsContent.pageTitle,
    );
    await expect(page.locator(".govuk-hint")).toHaveText(
      UploadDocumentsContent.hintText,
    );
    await expect(page.locator(".govuk-heading-m").nth(1)).toHaveText(
      UploadDocumentsContent.subTitle1,
    );
    await expect(page.locator(".govuk-body").nth(0)).toHaveText(
      UploadDocumentsContent.textOnPage1,
    );
    await expect(page.locator(".govuk-body").nth(1)).toHaveText(
      UploadDocumentsContent.textOnPage2,
    );
    await expect(page.locator(".govuk-body").nth(2)).toHaveText(
      UploadDocumentsContent.textOnPage3,
    );
    await expect(
      page.locator("div[class='govuk-body'] li:nth-child(1)"),
    ).toHaveText(UploadDocumentsContent.textOnPage4);
    await expect(
      page.locator("div[class='govuk-body'] li:nth-child(2)"),
    ).toHaveText(UploadDocumentsContent.textOnPage5);
    await expect(
      page.locator("div[class='govuk-body'] li:nth-child(3)"),
    ).toHaveText(UploadDocumentsContent.textOnPage6);
    await expect(
      page.locator("div[class='govuk-body'] li:nth-child(4)"),
    ).toHaveText(UploadDocumentsContent.textOnPage7);
    await expect(page.locator(".govuk-body").nth(4)).toHaveText(
      UploadDocumentsContent.textOnPage8,
    );
    await expect(page.locator(".govuk-details__summary-text")).toHaveText(
      UploadDocumentsContent.dropdownLink,
    );
    await page.click(this.fields.dropDown);
    await expect(
      page.locator("details[class='govuk-details'] li:nth-child(1)"),
    ).toHaveText(UploadDocumentsContent.textOnPage9);
    await expect(
      page.locator("details[class='govuk-details'] li:nth-child(2)"),
    ).toContainText(UploadDocumentsContent.textOnPage10);
    await expect(
      page.locator("details[class='govuk-details'] li:nth-child(3)"),
    ).toContainText(UploadDocumentsContent.textOnPage11);
    await expect(
      page.locator("details[class='govuk-details'] li:nth-child(4)"),
    ).toContainText(UploadDocumentsContent.textOnPage12);
    await expect(
      page.locator("details[class='govuk-details'] p"),
    ).toContainText(UploadDocumentsContent.textOnPage13);
    await expect(page.locator(".govuk-label").nth(0)).toHaveText(
      UploadDocumentsContent.textOnPage14,
    );
    await expect(page.locator(".govuk-label").nth(1)).toHaveText(
      UploadDocumentsContent.textOnPage15,
    );
    await expect(page.locator(".govuk-body").nth(7)).toHaveText(
      UploadDocumentsContent.textOnPage16,
    );
    await expect(page.locator(this.continueButton)).toHaveText("Continue");
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
