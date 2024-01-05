const { expect } = require("@playwright/test");
const path = require("path");
const axeTest = require("../helpers/accessibilityTestHelper.js");
const config = require("../config.js");
const UploadOtherInformation = require("../fixtures/content/UploadOtherInformation_content");

module.exports = {
  fields: {
    dropDown: ".govuk-details__summary-text",
    uploadFileButton: "#file-upload-1",
    fileUploadedOption: 'button[type="upload document"]',
    documentRelevance: "#documentRelevance",
    additionalInfo: "#additionalInformation",
  },

  continueButton: "#main-form-submit",
  backButton: ".govuk-back-link",

  async checkPageLoads(page, accessibilityTest) {
    await expect(page.locator(".govuk-heading-l")).toHaveText(
      UploadOtherInformation.pageTitle,
    );
    await expect(page.locator(".govuk-heading-m").nth(1)).toHaveText(
      UploadOtherInformation.subTitle1,
    );
    await expect(page.locator(".govuk-body").nth(4)).toHaveText(
      UploadOtherInformation.textOnPage1,
    );
    await expect(page.locator(".govuk-body").nth(5)).toHaveText(
      UploadOtherInformation.textOnPage2,
    );
    await expect(page.locator(".govuk-body").nth(6)).toHaveText(
      UploadOtherInformation.textOnPage3,
    );
    await expect(
      page.locator("div[class='govuk-body-m'] li:nth-child(1)"),
    ).toHaveText(UploadOtherInformation.textOnPage4);
    await expect(
      page.locator("div[class='govuk-body-m'] li:nth-child(2)"),
    ).toHaveText(UploadOtherInformation.textOnPage5);
    await expect(
      page.locator("div[class='govuk-body-m'] li:nth-child(3)"),
    ).toHaveText(UploadOtherInformation.textOnPage6);
    await expect(
      page.locator("div[class='govuk-body-m'] li:nth-child(4)"),
    ).toHaveText(UploadOtherInformation.textOnPage7);
    await expect(page.locator(".govuk-body").nth(7)).toHaveText(
      UploadOtherInformation.textOnPage8,
    );
    await expect(page.locator(".govuk-details__summary-text")).toHaveText(
      UploadOtherInformation.dropdownLink,
    );
    await page.click(this.fields.dropDown);
    await expect(
      page.locator("details[class='govuk-details'] li:nth-child(1)"),
    ).toHaveText(UploadOtherInformation.textOnPage9);
    await expect(
      page.locator("details[class='govuk-details'] li:nth-child(2)"),
    ).toContainText(UploadOtherInformation.textOnPage10);
    await expect(
      page.locator("details[class='govuk-details'] li:nth-child(3)"),
    ).toContainText(UploadOtherInformation.textOnPage11);
    await expect(
      page.locator("details[class='govuk-details'] li:nth-child(4)"),
    ).toContainText(UploadOtherInformation.textOnPage12);
    await expect(page.locator(".govuk-details__text")).toContainText(
      UploadOtherInformation.textOnPage13,
    );
    await expect(page.locator(".govuk-label").nth(0)).toHaveText(
      UploadOtherInformation.textOnPage14,
    );
    await expect(
      page.locator("form[class='formRow'] p[class='govuk-body']"),
    ).toHaveText(UploadOtherInformation.textOnPage15);
    await expect(page.locator(".govuk-label").nth(1)).toHaveText(
      UploadOtherInformation.subTitle2,
    );
    await expect(page.locator("#documentRelevance-hint")).toHaveText(
      UploadOtherInformation.textOnPage16,
    );
    await expect(page.locator(".govuk-label").nth(2)).toHaveText(
      UploadOtherInformation.subTitle3,
    );
    await expect(page.locator("#additionalInformation-hint")).toHaveText(
      UploadOtherInformation.textOnPage17,
    );
    if (accessibilityTest) {
      await axeTest.axeTest(page);
    }
  },

  async uploadDocumentsSection(page, uploadInformation) {
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
      ).toContainText(UploadOtherInformation.deleteButton);
      await page.fill(
        this.fields.documentRelevance,
        UploadOtherInformation.documentRelevance,
      );
      await page.fill(
        this.fields.additionalInfo,
        UploadOtherInformation.additionalInfo,
      );
    }
    await page.click(this.continueButton);
  },

  async triggerErrorMessages(page) {
    await page
      .locator(this.fields.uploadFileButton)
      .setInputFiles(config.testOdtFile);
    await page.click(this.fields.fileUploadedOption);
    await expect(page.locator(".govuk-error-summary__title")).toHaveText(
      UploadOtherInformation.errorBanner,
    );
    await expect(page.locator("[href='#file-upload-1']")).toHaveText(
      UploadOtherInformation.fileTypeError,
    );
  },

  async pressBackButton(page) {
    await page.click(this.backButton);
  },
};
