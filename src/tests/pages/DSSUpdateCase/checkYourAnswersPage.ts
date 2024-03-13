import { expect, Page } from "@playwright/test";
import axeTest from "../../helpers/accessibilityTestHelper";
import CheckYourAnswersContent from "../../fixtures/content/DSSUpdateCase/CheckYourAnswers_content.ts";
import commonHelpers from "../../helpers/commonHelpers.ts";
import uploadDocuments_content from "../../fixtures/content/DSSUpdateCase/UploadDocuments_content.ts";
import path from "path";
import config from "../../config.ts";

type CheckYourAnswersPage = {
  continueButton: string;
  backButton: string;
  checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    multipleDocuments: boolean,
    uploadDocument: boolean,
  ): Promise<void>;
  checkValidInfoAllFields(
    page: Page,
    multipleDocuments: boolean,
    uploadDocument: boolean,
    additionalInformation: boolean,
  ): Promise<void>;
  continueOn(page: Page): Promise<void>;
  pressBackButton(page: Page): Promise<void>;
};

const checkYourAnswersPage: CheckYourAnswersPage = {
  continueButton: "#main-form-submit",
  backButton: ".govuk-back-link",

  async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    multipleDocuments: boolean,
    uploadDocument: boolean,
  ): Promise<void> {
    if (!multipleDocuments) {
      await Promise.all([
        expect(page.locator(".govuk-header__service-name")).toHaveText(
          CheckYourAnswersContent.header,
        ),
        expect(page.locator(".govuk-heading-l").nth(0)).toHaveText(
          CheckYourAnswersContent.pageTitle,
        ),
        commonHelpers.checkVisibleAndPresent(
          page.locator(
            `.govuk-summary-list__key:text-is("${CheckYourAnswersContent.textOnPage1}")`,
          ),
          1,
        ),
      ]);
      if (uploadDocument) {
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-summary-list__key:text-is("${CheckYourAnswersContent.textOnPage2}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-summary-list__key:text-is("${CheckYourAnswersContent.textOnPage3}")`,
            ),
            1,
          ),
          expect(page.locator(".govuk-heading-l").nth(1)).toHaveText(
            CheckYourAnswersContent.subTitle,
          ),
          expect(page.locator(".govuk-body-l")).toHaveText(
            CheckYourAnswersContent.textOnPage4,
          ),
        ]);
      }
    } else {
      await Promise.all([
        expect(page.locator(".govuk-header__service-name")).toHaveText(
          CheckYourAnswersContent.header,
        ),
        expect(page.locator(".govuk-heading-l").nth(0)).toHaveText(
          CheckYourAnswersContent.pageTitle,
        ),
        commonHelpers.checkVisibleAndPresent(
          page.locator(
            `.govuk-summary-list__key:text-is("${CheckYourAnswersContent.textOnPage1}")`,
          ),
          1,
        ),
        commonHelpers.checkVisibleAndPresent(
          page.locator(
            `.govuk-summary-list__key:text-is("${CheckYourAnswersContent.textOnPage2}")`,
          ),
          10,
        ),
        commonHelpers.checkVisibleAndPresent(
          page.locator(
            `.govuk-summary-list__key:text-is("${CheckYourAnswersContent.textOnPage3}")`,
          ),
          10,
        ),
        expect(page.locator(".govuk-heading-l").nth(1)).toHaveText(
          CheckYourAnswersContent.subTitle,
        ),
        expect(page.locator(".govuk-body-l")).toHaveText(
          CheckYourAnswersContent.textOnPage4,
        ),
      ]);
    }
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async checkValidInfoAllFields(
    page: Page,
    multipleDocuments: boolean,
    uploadDocument: boolean,
    additionalInformation: boolean,
  ): Promise<void> {
    if (additionalInformation) {
      await commonHelpers.checkVisibleAndPresent(
        page.locator(
          `.govuk-summary-list__value:text-is("${uploadDocuments_content.additionalInfo}")`,
        ),
        1,
      );
    }
    if (!multipleDocuments) {
      if (uploadDocument) {
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-summary-list__value:text-is("${path.basename(config.testWordFile)}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-summary-list__value:text-is("${uploadDocuments_content.documentRelevance}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `a.govuk-link[href="/upload-documents"]:text-is("change")`,
            ),
            2,
          ),
        ]);
      } else {
        await commonHelpers.checkVisibleAndPresent(
          page.locator(
            `a.govuk-link[href="/upload-documents"]:text-is("change"):nth-child(1)`,
          ),
          1,
        );
      }
    } else {
      await Promise.all([
        commonHelpers.checkVisibleAndPresent(
          page.locator(
            `.govuk-summary-list__value:text-is("${path.basename(config.testWordFile)}")`,
          ),
          1,
        ),
        commonHelpers.checkVisibleAndPresent(
          page.locator(
            `.govuk-summary-list__value:text-is("${path.basename(config.testPdfFile)}")`,
          ),
          4,
        ),
        commonHelpers.checkVisibleAndPresent(
          page.locator(
            `.govuk-summary-list__value:text-is("${path.basename(config.testPdfFile)}")`,
          ),
          4,
        ),
        commonHelpers.checkVisibleAndPresent(
          page.locator(
            `.govuk-summary-list__value:text-is("${uploadDocuments_content.documentRelevance}")`,
          ),
          10,
        ),
        commonHelpers.checkVisibleAndPresent(
          page.locator(
            `a.govuk-link[href="/upload-documents"]:text-is("change")`,
          ),
          11,
        ),
      ]);
    }
  },

  async continueOn(page: Page): Promise<void> {
    await page.click(this.continueButton);
  },

  async pressBackButton(page: Page): Promise<void> {
    await page.click(this.backButton);
  },
};

export default checkYourAnswersPage;
