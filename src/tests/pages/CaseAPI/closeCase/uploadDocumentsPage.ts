import { expect, Page } from "@playwright/test";
import commonHelpers from "../../../helpers/commonHelpers.ts";
import caseSubjectDetailsObject_content from "../../../fixtures/content/CaseAPI/createCase/caseSubjectDetailsObject_content.ts";
import createListingListingDetailsContent from "../../../fixtures/content/CaseAPI/createListing/createListingListingDetails_content.ts";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import uploadDocuments_content from "../../../fixtures/content/CaseAPI/closeCase/uploadDocuments_content.ts";
import config from "../../../config.ts";

type UploadDocumentsPage = {
  continue: string;
  previous: string;
  cancel: string;
  addNew: string;
  checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
  ): Promise<void>;
  continueOn(page: Page): Promise<void>;
  triggerErrorMessages(page: Page): Promise<void>;
};

const uploadDocumentsPage: UploadDocumentsPage = {
  continue: '[type="submit"]',
  previous: ".button-secondary",
  cancel: ".cancel",
  addNew: ".write-collection-add-item__top",

  async checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page.click(this.addNew);
    await Promise.all([
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `.govuk-caption-l:text-is("${uploadDocuments_content.pageHint}")`,
        ),
        1,
      ),
      expect(page.locator("markdown > h3")).toContainText(
        caseSubjectDetailsObject_content.name,
      ),
      expect(page.locator("markdown > p").nth(0)).toContainText(
        createListingListingDetailsContent.caseReference + caseNumber,
      ),
      ...Array.from({ length: 7 }, (_, index: number) => {
        const textOnPage = (uploadDocuments_content as any)[
          `textOnPage${index + 1}`
        ];
        return commonHelpers.checkVisibleAndPresent(
          page.locator(`.form-label:text-is("${textOnPage}")`),
          1,
        );
      }),
      ...Array.from({ length: 3 }, (_, index: number) => {
        const subtitle = (uploadDocuments_content as any)[
          `subTitle${index + 1}`
        ];
        return commonHelpers.checkVisibleAndPresent(
          page.locator(`.form-label:text-is("${subtitle}")`),
          1,
        );
      }),
      await commonHelpers.checkForButtons(
        page,
        this.continue,
        this.previous,
        this.cancel,
      ),
    ]);
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async continueOn(page: Page): Promise<void> {
    await page.selectOption(`.ccd-dropdown`, "A - Application Form");
    await page.fill(
      `#closeDocuments_0_documentEmailContent`,
      `Lorem ipsum text A - Application Form`,
    );
    await page
      .locator(`#closeDocuments_0_documentLink`)
      .setInputFiles(config.testPdfFile);
    await expect(page.locator(".error-message")).toHaveCount(0);
    await page.click(this.continue);
  },

  async triggerErrorMessages(page: Page): Promise<void> {
    await page
      .locator(`#closeDocuments_0_documentLink`)
      .setInputFiles(config.testOdtFile);
    await expect(page.locator(".error-message")).toHaveText(
      uploadDocuments_content.errorMessage,
    );
    await this.continueOn(page);
  },
};

export default uploadDocumentsPage;
