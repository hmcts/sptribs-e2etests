import { expect, Page } from "@playwright/test";
import axeTest from "../../helpers/accessibilityTestHelper";
import UploadDocumentsContent from "../../fixtures/content/DSSUpdateCase/UploadDocuments_content.ts";
import commonHelpers from "../../helpers/commonHelpers.ts";

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
  continueButton: "#main-form-submit",
  backButton: ".govuk-back-link",

  async checkPageLoads(page: Page, accessibilityTest: boolean): Promise<void> {
    await expect(page.locator(".govuk-header__service-name")).toHaveText(
      UploadDocumentsContent.header,
    );
    await expect(page.locator(".govuk-heading-l")).toHaveText(
      UploadDocumentsContent.pageTitle,
    );
    await expect(page.locator(".govuk-heading-m")).toHaveText(
      UploadDocumentsContent.subTitle1,
    );
    await expect(page.locator(this.continueButton)).toHaveText("Continue");
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async uploadDocumentsSection(
    page: Page,
    multipleDocuments: boolean,
  ): Promise<void> {
    commonHelpers.uploadFileController(page);
    if (multipleDocuments) {
    }
  },

  async triggerErrorMessages(page: Page): Promise<void> {
    await page.click(this.continueButton);
  },

  async continueOn(page: Page): Promise<void> {
    await page.click(this.continueButton);
  },

  async pressBackButton(page: Page): Promise<void> {
    await page.click(this.backButton);
  },
};

export default uploadDocumentsPage;
