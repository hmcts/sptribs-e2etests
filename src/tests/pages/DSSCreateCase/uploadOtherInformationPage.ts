import { expect, Page } from "@playwright/test";
import path from "path";
import config from "../../config.ts";
import axeTest from "../../helpers/accessibilityTestHelper";
import uploadOtherInformationContent from "../../fixtures/content/DSSCreateCase/UploadOtherInformation_content.ts";
import commonHelpers from "../../helpers/commonHelpers.ts";

type UploadOtherInformationPage = {
  fields: {
    dropDown: string;
    uploadFileButton: string;
    fileUploadedOption: string;
    documentRelevance: string;
    additionalInfo: string;
  };
  checkPageLoads(
    page: Page,
    cy: boolean,
    accessibilityTest: boolean,
  ): Promise<void>;
  uploadDocumentsSection(
    page: Page,
    cy: boolean,
    uploadInformation: boolean,
    multipleDocuments: boolean,
  ): Promise<void>;
  triggerErrorMessages(page: Page, cy: boolean): Promise<void>;
  pressBackButton(page: Page): Promise<void>;
};

const uploadOtherInformationPage: UploadOtherInformationPage = {
  fields: {
    dropDown: ".govuk-details__summary-text",
    uploadFileButton: "#file-upload-1",
    fileUploadedOption: 'button[type="upload document"]',
    documentRelevance: "#documentRelevance",
    additionalInfo: "#additionalInformation",
  },

  async checkPageLoads(
    page: Page,
    cy: boolean,
    accessibilityTest: boolean,
  ): Promise<void> {
    switch (cy) {
      case true:
        await expect(page.locator(".govuk-heading-l")).toHaveText(
          uploadOtherInformationContent.pageTitleCy,
        );
        await expect(page.locator(".govuk-heading-m").nth(1)).toHaveText(
          uploadOtherInformationContent.subTitleCy1,
        );
        await expect(page.locator(".govuk-body").nth(4)).toHaveText(
          uploadOtherInformationContent.textOnPageCy1,
        );
        await expect(page.locator(".govuk-body").nth(5)).toHaveText(
          uploadOtherInformationContent.textOnPageCy2,
        );
        await expect(page.locator(".govuk-body").nth(6)).toHaveText(
          uploadOtherInformationContent.textOnPageCy3,
        );
        await expect(
          page.locator("div[class='govuk-body-m'] li:nth-child(1)"),
        ).toHaveText(uploadOtherInformationContent.textOnPageCy4);
        await expect(
          page.locator("div[class='govuk-body-m'] li:nth-child(2)"),
        ).toHaveText(uploadOtherInformationContent.textOnPageCy5);
        await expect(
          page.locator("div[class='govuk-body-m'] li:nth-child(3)"),
        ).toHaveText(uploadOtherInformationContent.textOnPageCy6);
        await expect(
          page.locator("div[class='govuk-body-m'] li:nth-child(4)"),
        ).toHaveText(uploadOtherInformationContent.textOnPageCy7);
        await expect(page.locator(".govuk-body").nth(7)).toHaveText(
          uploadOtherInformationContent.textOnPageCy8,
        );
        await expect(page.locator(".govuk-details__summary-text")).toHaveText(
          uploadOtherInformationContent.dropdownLinkCy,
        );
        await page.click(this.fields.dropDown);
        await expect(
          page.locator("details[class='govuk-details'] li:nth-child(1)"),
        ).toHaveText(uploadOtherInformationContent.textOnPageCy9);
        await expect(
          page.locator("details[class='govuk-details'] li:nth-child(2)"),
        ).toContainText(uploadOtherInformationContent.textOnPageCy10);
        await expect(
          page.locator("details[class='govuk-details'] li:nth-child(3)"),
        ).toContainText(uploadOtherInformationContent.textOnPageCy11);
        await expect(
          page.locator("details[class='govuk-details'] li:nth-child(4)"),
        ).toContainText(uploadOtherInformationContent.textOnPageCy12);
        await expect(page.locator(".govuk-details__text")).toContainText(
          uploadOtherInformationContent.textOnPageCy13,
        );
        await expect(page.locator(".govuk-label").nth(0)).toHaveText(
          uploadOtherInformationContent.textOnPageCy14,
        );
        await expect(
          page.locator("form[class='formRow'] p[class='govuk-body']"),
        ).toHaveText(uploadOtherInformationContent.textOnPageCy15);
        await expect(page.locator(".govuk-label").nth(1)).toHaveText(
          uploadOtherInformationContent.subTitleCy2,
        );
        await expect(page.locator("#documentRelevance-hint")).toHaveText(
          uploadOtherInformationContent.textOnPageCy16,
        );
        await expect(page.locator(".govuk-label").nth(2)).toHaveText(
          uploadOtherInformationContent.subTitleCy3,
        );
        await expect(page.locator("#additionalInformation-hint")).toHaveText(
          uploadOtherInformationContent.textOnPageCy17,
        );
        break;
      default:
        await expect(page.locator(".govuk-heading-l")).toHaveText(
          uploadOtherInformationContent.pageTitle,
        );
        await expect(page.locator(".govuk-heading-m").nth(1)).toHaveText(
          uploadOtherInformationContent.subTitle1,
        );
        await expect(page.locator(".govuk-body").nth(4)).toHaveText(
          uploadOtherInformationContent.textOnPage1,
        );
        await expect(page.locator(".govuk-body").nth(5)).toHaveText(
          uploadOtherInformationContent.textOnPage2,
        );
        await expect(page.locator(".govuk-body").nth(6)).toHaveText(
          uploadOtherInformationContent.textOnPage3,
        );
        await expect(
          page.locator("div[class='govuk-body-m'] li:nth-child(1)"),
        ).toHaveText(uploadOtherInformationContent.textOnPage4);
        await expect(
          page.locator("div[class='govuk-body-m'] li:nth-child(2)"),
        ).toHaveText(uploadOtherInformationContent.textOnPage5);
        await expect(
          page.locator("div[class='govuk-body-m'] li:nth-child(3)"),
        ).toHaveText(uploadOtherInformationContent.textOnPage6);
        await expect(
          page.locator("div[class='govuk-body-m'] li:nth-child(4)"),
        ).toHaveText(uploadOtherInformationContent.textOnPage7);
        await expect(page.locator(".govuk-body").nth(7)).toHaveText(
          uploadOtherInformationContent.textOnPage8,
        );
        await expect(page.locator(".govuk-details__summary-text")).toHaveText(
          uploadOtherInformationContent.dropdownLink,
        );
        await page.click(this.fields.dropDown);
        await expect(
          page.locator("details[class='govuk-details'] li:nth-child(1)"),
        ).toHaveText(uploadOtherInformationContent.textOnPage9);
        await expect(
          page.locator("details[class='govuk-details'] li:nth-child(2)"),
        ).toContainText(uploadOtherInformationContent.textOnPage10);
        await expect(
          page.locator("details[class='govuk-details'] li:nth-child(3)"),
        ).toContainText(uploadOtherInformationContent.textOnPage11);
        await expect(
          page.locator("details[class='govuk-details'] li:nth-child(4)"),
        ).toContainText(uploadOtherInformationContent.textOnPage12);
        await expect(page.locator(".govuk-details__text")).toContainText(
          uploadOtherInformationContent.textOnPage13,
        );
        await expect(page.locator(".govuk-label").nth(0)).toHaveText(
          uploadOtherInformationContent.textOnPage14,
        );
        await expect(
          page.locator("form[class='formRow'] p[class='govuk-body']"),
        ).toHaveText(uploadOtherInformationContent.textOnPage15);
        await expect(page.locator(".govuk-label").nth(1)).toHaveText(
          uploadOtherInformationContent.subTitle2,
        );
        await expect(page.locator("#documentRelevance-hint")).toHaveText(
          uploadOtherInformationContent.textOnPage16,
        );
        await expect(page.locator(".govuk-label").nth(2)).toHaveText(
          uploadOtherInformationContent.subTitle3,
        );
        await expect(page.locator("#additionalInformation-hint")).toHaveText(
          uploadOtherInformationContent.textOnPage17,
        );
        break;
    }
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async uploadDocumentsSection(
    page: Page,
    cy: boolean,
    uploadInformation: boolean,
    multipleDocuments: boolean,
  ): Promise<void> {
    if (uploadInformation) {
      await page
        .locator(this.fields.uploadFileButton)
        .setInputFiles(config.testWordFile);
      await page.click(this.fields.fileUploadedOption);
      await expect(page.locator(".uploadedFile").first()).toContainText(
        path.basename(config.testWordFile),
      );
      if (cy) {
        await expect(
          page.locator(
            "main[id='main-content'] li:nth-child(1).govuk-\\!-padding-top-2.govuk-\\!-padding-bottom-3.govuk-section-break.govuk-section-break--visible",
          ),
        ).toContainText(uploadOtherInformationContent.deleteButtonCy);
      } else {
        await expect(
          page.locator(
            "main[id='main-content'] li:nth-child(1).govuk-\\!-padding-top-2.govuk-\\!-padding-bottom-3.govuk-section-break.govuk-section-break--visible",
          ),
        ).toContainText(uploadOtherInformationContent.deleteButton);
      }
      if (multipleDocuments) {
        await page
          .locator(this.fields.uploadFileButton)
          .setInputFiles(config.testWordFile);
        await page.click(this.fields.fileUploadedOption);
        await expect(page.locator(".uploadedFile").nth(1)).toContainText(
          path.basename(config.testWordFile),
        );
        await expect(page.locator(".uploadedFile").nth(1)).toContainText(
          uploadOtherInformationContent.deleteButton,
        );
        await page
          .locator(this.fields.uploadFileButton)
          .setInputFiles(config.testWordFile);
        await page.click(this.fields.fileUploadedOption);
        await expect(page.locator(".uploadedFile").nth(2)).toContainText(
          path.basename(config.testWordFile),
        );
        await expect(page.locator(".uploadedFile").nth(2)).toContainText(
          uploadOtherInformationContent.deleteButton,
        );
        await page
          .locator(this.fields.uploadFileButton)
          .setInputFiles(config.testWordFile);
        await page.click(this.fields.fileUploadedOption);
        await expect(page.locator(".uploadedFile").nth(3)).toContainText(
          path.basename(config.testWordFile),
        );
        await expect(page.locator(".uploadedFile").nth(3)).toContainText(
          uploadOtherInformationContent.deleteButton,
        );
      }
      await page.fill(
        this.fields.documentRelevance,
        uploadOtherInformationContent.documentRelevance,
      );
      await page.fill(
        this.fields.additionalInfo,
        uploadOtherInformationContent.additionalInfo,
      );
    }
    await commonHelpers.clickContinueButton(page);
  },

  async triggerErrorMessages(page: Page, cy: boolean): Promise<void> {
    switch (cy) {
      case true:
        await page
          .locator(this.fields.uploadFileButton)
          .setInputFiles(config.testOdtFile);
        await page.click(this.fields.fileUploadedOption);
        await expect(page.locator(".govuk-error-summary__title")).toHaveText(
          uploadOtherInformationContent.errorBannerCy,
        );
        await expect(page.locator("[href='#file-upload-1']")).toHaveText(
          uploadOtherInformationContent.fileTypeErrorCy,
        );
        break;
      default:
        await page
          .locator(this.fields.uploadFileButton)
          .setInputFiles(config.testOdtFile);
        await page.click(this.fields.fileUploadedOption);
        await expect(page.locator(".govuk-error-summary__title")).toHaveText(
          uploadOtherInformationContent.errorBanner,
        );
        await expect(page.locator("[href='#file-upload-1']")).toHaveText(
          uploadOtherInformationContent.fileTypeError,
        );
        break;
    }
  },

  async pressBackButton(page: Page): Promise<void> {
    await commonHelpers.clickBackButton(page);
  },
};

export default uploadOtherInformationPage;
