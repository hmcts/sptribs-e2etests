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

  continueButton: 'button[name="saveAndContinue"]',
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
              `.govuk-heading-l:text-is("${uploadOtherInformationContent.pageTitleCy}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-heading-m:text-is("${uploadOtherInformationContent.subTitleCy1}")`,
            ),
            1,
          ),
          ...Array.from({ length: 3 }, (_, index) => {
            const textOnPage = (uploadOtherInformationContent as any)[
              `textOnPageCy${index + 1}`
            ];
            return commonHelpers.checkVisibleAndPresent(
              page.locator(`.govuk-body:text-is("${textOnPage}")`),
              1,
            );
          }),
          ...Array.from({ length: 4 }, (_, index) => {
            const textOnPage = (uploadOtherInformationContent as any)[
              `textOnPageCy${index + 4}`
            ];
            return commonHelpers.checkVisibleAndPresent(
              page.locator(
                `div[class='govuk-body-m'] li:nth-child(${index + 1}):text-is("${textOnPage}")`,
              ),
              1,
            );
          }),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-body:text-is("${uploadOtherInformationContent.textOnPageCy8}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-details__summary-text:text-is("${uploadOtherInformationContent.dropdownLinkCy}")`,
            ),
            1,
          ),
          ...Array.from({ length: 4 }, (_, index) => {
            const textOnPage = (uploadOtherInformationContent as any)[
              `textOnPageCy${index + 9}`
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
              `.govuk-details__text:has-text("${uploadOtherInformationContent.textOnPageCy13}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-label:text-is("${uploadOtherInformationContent.textOnPageCy14}")`,
            ),
            1,
          ),
          expect(
            page.locator("form[class='formRow'] p[class='govuk-body']"),
          ).toHaveText(uploadOtherInformationContent.textOnPageCy15),
          ...Array.from({ length: 2 }, (_, index) => {
            const textOnPage = (uploadOtherInformationContent as any)[
              `subTitleCy${index + 2}`
            ];
            return commonHelpers.checkVisibleAndPresent(
              page.locator(`.govuk-label:text-is("${textOnPage}")`),
              1,
            );
          }),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `#documentRelevance-hint:text-is("${uploadOtherInformationContent.textOnPageCy16}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `#additionalInformation-hint:text-is("${uploadOtherInformationContent.textOnPageCy17}")`,
            ),
            1,
          ),
        ]);
        break;
      default:
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-heading-l:text-is("${uploadOtherInformationContent.pageTitle}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-heading-m:text-is("${uploadOtherInformationContent.subTitle1}")`,
            ),
            1,
          ),
          ...Array.from({ length: 3 }, (_, index) => {
            const textOnPage = (uploadOtherInformationContent as any)[
              `textOnPage${index + 1}`
            ];
            return commonHelpers.checkVisibleAndPresent(
              page.locator(`.govuk-body:text-is("${textOnPage}")`),
              1,
            );
          }),
          ...Array.from({ length: 4 }, (_, index) => {
            const textOnPage = (uploadOtherInformationContent as any)[
              `textOnPage${index + 4}`
            ];
            return commonHelpers.checkVisibleAndPresent(
              page.locator(
                `div[class='govuk-body-m'] li:nth-child(${index + 1}):text-is("${textOnPage}")`,
              ),
              1,
            );
          }),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-body:text-is("${uploadOtherInformationContent.textOnPage8}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-details__summary-text:text-is("${uploadOtherInformationContent.dropdownLink}")`,
            ),
            1,
          ),
          ...Array.from({ length: 4 }, (_, index) => {
            const textOnPage = (uploadOtherInformationContent as any)[
              `textOnPage${index + 9}`
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
              `.govuk-details__text:has-text("${uploadOtherInformationContent.textOnPage13}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-label:text-is("${uploadOtherInformationContent.textOnPage14}")`,
            ),
            1,
          ),
          expect(
            page.locator("form[class='formRow'] p[class='govuk-body']"),
          ).toHaveText(uploadOtherInformationContent.textOnPage15),
          ...Array.from({ length: 2 }, (_, index) => {
            const textOnPage = (uploadOtherInformationContent as any)[
              `subTitle${index + 2}`
            ];
            return commonHelpers.checkVisibleAndPresent(
              page.locator(`.govuk-label:text-is("${textOnPage}")`),
              1,
            );
          }),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `#documentRelevance-hint:text-is("${uploadOtherInformationContent.textOnPage16}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `#additionalInformation-hint:text-is("${uploadOtherInformationContent.textOnPage17}")`,
            ),
            1,
          ),
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
    uploadInformation: boolean,
    multipleDocuments: boolean,
  ): Promise<void> {
    if (uploadInformation) {
      await page
        .locator(this.fields.uploadFileButton)
        .setInputFiles(config.testWordFile);
      await page.fill(
        this.fields.documentRelevance,
        uploadOtherInformationContent.documentRelevance,
      );
      await page.click(this.fields.fileUploadedOption);
      await Promise.all([
        expect(page.locator(".uploadedFile").first()).toContainText(
          path.basename(config.testWordFile),
        ),
        expect(page.locator(".uploadedFile").first()).toContainText(
          uploadOtherInformationContent.documentRelevance,
        ),
      ]);
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
        for (let i = 1; i <= 3; i++) {
          await page
            .locator(this.fields.uploadFileButton)
            .setInputFiles(config.testWordFile);
          await page.fill(
            this.fields.documentRelevance,
            uploadOtherInformationContent.documentRelevance,
          );
          await page.click(this.fields.fileUploadedOption);
          await Promise.all([
            expect(page.locator(".uploadedFile").nth(i)).toContainText(
              path.basename(config.testWordFile),
            ),
            expect(page.locator(".uploadedFile").nth(i)).toContainText(
              uploadOtherInformationContent.documentRelevance,
            ),
            expect(page.locator(".uploadedFile").nth(i)).toContainText(
              uploadOtherInformationContent.deleteButton,
            ),
          ]);
        }
      }
      await page.fill(
        this.fields.additionalInfo,
        uploadOtherInformationContent.additionalInfo,
      );
    }
    await page.click(this.continueButton);
  },

  async triggerErrorMessages(page: Page, cy: boolean): Promise<void> {
    await page.click(this.fields.fileUploadedOption);
    switch (cy) {
      case true:
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-error-summary__title:text-is("${uploadOtherInformationContent.errorBannerCy}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `[href='#file-upload-1']:text-is("${uploadOtherInformationContent.chooseFileErrorCy}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-error-message:text-is("${uploadOtherInformationContent.chooseFileErrorCy}")`,
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
              `.govuk-error-summary__title:text-is("${uploadOtherInformationContent.errorBannerCy}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `[href='#file-upload-1']:text-is("${uploadOtherInformationContent.fileTypeErrorCy}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-error-message:text-is("${uploadOtherInformationContent.fileTypeErrorCy}")`,
            ),
            1,
          ),
        ]);
        await page.fill(
          this.fields.documentRelevance,
          uploadOtherInformationContent.html,
        );
        await page.fill(
          this.fields.additionalInfo,
          uploadOtherInformationContent.html,
        );
        await page.click(this.continueButton);
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-error-summary__title:text-is("${uploadOtherInformationContent.errorBannerCy}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `[href='#documentRelevance']:text-is("${uploadOtherInformationContent.docRelevanceErrorCy}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `[href='#additionalInformation']:text-is("${uploadOtherInformationContent.addInfoErrorCy}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-error-message:text-is("${uploadOtherInformationContent.docRelevanceErrorCy}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-error-message:text-is("${uploadOtherInformationContent.addInfoErrorCy}")`,
            ),
            1,
          ),
        ]);
        break;
      default:
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-error-summary__title:text-is("${uploadOtherInformationContent.errorBanner}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `[href='#file-upload-1']:text-is("${uploadOtherInformationContent.chooseFileError}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-error-message:text-is("${uploadOtherInformationContent.chooseFileError}")`,
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
              `.govuk-error-summary__title:text-is("${uploadOtherInformationContent.errorBanner}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `[href='#file-upload-1']:text-is("${uploadOtherInformationContent.fileTypeError}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-error-message:text-is("${uploadOtherInformationContent.fileTypeError}")`,
            ),
            1,
          ),
        ]);
        await page.fill(
          this.fields.documentRelevance,
          uploadOtherInformationContent.html,
        );
        await page.fill(
          this.fields.additionalInfo,
          uploadOtherInformationContent.html,
        );
        await page.click(this.continueButton);
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-error-summary__title:text-is("${uploadOtherInformationContent.errorBanner}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `[href='#documentRelevance']:text-is("${uploadOtherInformationContent.docRelevanceError}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `[href='#additionalInformation']:text-is("${uploadOtherInformationContent.addInfoError}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-error-message:text-is("${uploadOtherInformationContent.docRelevanceError}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-error-message:text-is("${uploadOtherInformationContent.addInfoError}")`,
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

export default uploadOtherInformationPage;
