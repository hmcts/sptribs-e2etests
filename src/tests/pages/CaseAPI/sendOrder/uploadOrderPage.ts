import { expect, Page } from "@playwright/test";
import commonHelpers from "../../../helpers/commonHelpers.ts";
import caseSubjectDetailsObject_content from "../../../fixtures/content/CaseAPI/createCase/caseSubjectDetailsObject_content.ts";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import uploadOrder_Content from "../../../fixtures/content/CaseAPI/sendOrder/uploadOrder_Content.ts";
import config from "../../../config.ts";

type UploadOrderPage = {
  previous: string;
  continue: string;
  cancel: string;
  addNew: string;
  checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
  ): Promise<void>;
  fillInFields(page: Page): Promise<void>;
  triggerErrorMessages(page: Page): Promise<void>;
};

const uploadOrderPage: UploadOrderPage = {
  previous: `.button-secondary:text-is("Previous")`,
  continue: '[type="submit"]',
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
          `.govuk-caption-l:text-is("${uploadOrder_Content.pageHint}")`,
        ),
        1,
      ),
      expect(page.locator("markdown > h3")).toContainText(
        caseSubjectDetailsObject_content.name,
      ),
      expect(page.locator("markdown > p").nth(0)).toContainText(
        uploadOrder_Content.caseReference + caseNumber,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(`p:text-is("${uploadOrder_Content.textOnPage1}")`),
        1,
      ),
      ...Array.from({ length: 2 }, (_, index: number) => {
        const textOnPage: ArrayConstructor = (uploadOrder_Content as any)[
          `textOnPage${index + 1}`
        ];
        return commonHelpers.checkVisibleAndPresent(
          page.locator(`markdown > p:text-is("${textOnPage}")`),
          1,
        );
      }),
      ...Array.from({ length: 3 }, (_, index: number) => {
        const textOnPage: ArrayConstructor = (uploadOrder_Content as any)[
          `textOnPage${index + 3}`
        ];
        return commonHelpers.checkVisibleAndPresent(
          page.locator(`ul > li:text-is("${textOnPage}")`),
          1,
        );
      }),
      commonHelpers.checkVisibleAndPresent(
        page.locator(`p:text-is("${uploadOrder_Content.textOnPage6}")`),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(`h2:text-is("${uploadOrder_Content.subTitle1}")`),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(`h3:text-is("${uploadOrder_Content.subTitle1}")`),
        1,
      ),
      ...Array.from({ length: 2 }, (_, index: number) => {
        const textOnPage: ArrayConstructor = (uploadOrder_Content as any)[
          `textOnPage${index + 7}`
        ];
        return commonHelpers.checkVisibleAndPresent(
          page.locator(`span:text-is("${textOnPage}")`),
          1,
        );
      }),
      commonHelpers.checkForButtons(
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

  async fillInFields(page: Page): Promise<void> {
    await page.fill(
      `#cicCaseOrderFile_0_documentEmailContent`,
      uploadOrder_Content.description,
    );
    await page
      .locator(`#cicCaseOrderFile_0_documentLink`)
      .setInputFiles(config.testPdfFile);
    await expect(
      page.locator(
        `.error-message:text-is("${uploadOrder_Content.errorUploading}")`,
      ),
    ).toHaveCount(0);
    await page.click(this.continue);
  },

  async triggerErrorMessages(page: Page): Promise<void> {
    await page.click(this.continue);
    await page.click(this.continue);
    await Promise.all([
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `#error-summary-title:text-is("${uploadOrder_Content.errorBanner}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `.validation-error:has-text("${uploadOrder_Content.errorDescription}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `.error-message:has-text("${uploadOrder_Content.errorDescription}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `.validation-error:has-text("${uploadOrder_Content.errorFile}")`,
        ),
        1,
      ),
    ]);
    await this.fillInFields(page);
  },
};

export default uploadOrderPage;
