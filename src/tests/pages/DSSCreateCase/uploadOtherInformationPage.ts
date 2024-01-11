import { expect, Page } from "@playwright/test";
import path from "path";
import config from "../../config.ts";
import axeTest from "../../helpers/accessibilityTestHelper";
import uploadOtherInformationContent from "../../fixtures/content/DSSCreateCase/UploadOtherInformation_content.ts";

type UploadOtherInformationPage = {
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
  uploadDocumentsSection(
    page: Page,
    uploadInformation: boolean,
    multipleDocuments: boolean,
  ): Promise<void>;
  triggerErrorMessages(page: Page): Promise<void>;
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

  continueButton: "#main-form-submit",
  backButton: ".govuk-back-link",

  async checkPageLoads(page: Page, accessibilityTest: boolean): Promise<void> {
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
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async uploadDocumentsSection(
    page: Page,
    uploadInformation: boolean,
    multipleDocuments: boolean,
  ): Promise<void> {
    if (uploadInformation) {
      await page
        .locator(this.fields.uploadFileButton)
        .setInputFiles(config.testWordFile);
      await page.click(this.fields.fileUploadedOption);
      await expect(
        page.locator(
          "main[id='main-content'] li:nth-child(1).govuk-\\!-padding-top-2.govuk-\\!-padding-bottom-3.govuk-section-break.govuk-section-break--visible",
        ),
      ).toContainText(path.basename(config.testWordFile));
      await expect(
        page.locator(
          "main[id='main-content'] li:nth-child(1).govuk-\\!-padding-top-2.govuk-\\!-padding-bottom-3.govuk-section-break.govuk-section-break--visible",
        ),
      ).toContainText(uploadOtherInformationContent.deleteButton);
      if (multipleDocuments) {
        await page
          .locator(this.fields.uploadFileButton)
          .setInputFiles(config.testWordFile);
        await page.click(this.fields.fileUploadedOption);
        await expect(
          page.locator(
            "main[id='main-content'] li:nth-child(2).govuk-\\!-padding-top-2.govuk-\\!-padding-bottom-3.govuk-section-break.govuk-section-break--visible",
          ),
        ).toContainText(path.basename(config.testWordFile));
        await expect(
          page.locator(
            "main[id='main-content'] li:nth-child(2).govuk-\\!-padding-top-2.govuk-\\!-padding-bottom-3.govuk-section-break.govuk-section-break--visible",
          ),
        ).toContainText(uploadOtherInformationContent.deleteButton);
        await page
          .locator(this.fields.uploadFileButton)
          .setInputFiles(config.testWordFile);
        await page.click(this.fields.fileUploadedOption);
        await expect(
          page.locator(
            "main[id='main-content'] li:nth-child(3).govuk-\\!-padding-top-2.govuk-\\!-padding-bottom-3.govuk-section-break.govuk-section-break--visible",
          ),
        ).toContainText(path.basename(config.testWordFile));
        await expect(
          page.locator(
            "main[id='main-content'] li:nth-child(3).govuk-\\!-padding-top-2.govuk-\\!-padding-bottom-3.govuk-section-break.govuk-section-break--visible",
          ),
        ).toContainText(uploadOtherInformationContent.deleteButton);
        await page
          .locator(this.fields.uploadFileButton)
          .setInputFiles(config.testWordFile);
        await page.click(this.fields.fileUploadedOption);
        await expect(
          page.locator(
            "main[id='main-content'] li:nth-child(4).govuk-\\!-padding-top-2.govuk-\\!-padding-bottom-3.govuk-section-break.govuk-section-break--visible",
          ),
        ).toContainText(path.basename(config.testWordFile));
        await expect(
          page.locator(
            "main[id='main-content'] li:nth-child(4).govuk-\\!-padding-top-2.govuk-\\!-padding-bottom-3.govuk-section-break.govuk-section-break--visible",
          ),
        ).toContainText(uploadOtherInformationContent.deleteButton);
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
    await page.click(this.continueButton);
  },

  async triggerErrorMessages(page: Page): Promise<void> {
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
  },

  async pressBackButton(page: Page): Promise<void> {
    await page.click(this.backButton);
  },
};

export default uploadOtherInformationPage;
