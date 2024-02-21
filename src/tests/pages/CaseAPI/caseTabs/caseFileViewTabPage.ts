import { expect, Page } from "@playwright/test";
import path from "path";
import config from "../../../config.ts";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import allTabTitlesContent from "../../../fixtures/content/CaseAPI/caseTabs/allTabTitles_content.ts";
import caseFileViewTabContent from "../../../fixtures/content/CaseAPI/caseTabs/caseFileViewTab_content.ts";
import uploadedDocumentsContent from "../../../fixtures/content/CaseAPI/caseTabs/uploadedDocuments_content.ts";
import commonHelpers from "../../../helpers/commonHelpers.ts";

type CaseFileViewTabPage = {
  caseFileViewTab: string;
  checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    caseNumber: string,
  ): Promise<void>;
  changeToCaseFileViewTab(page: Page): Promise<void>;
  checkPageInfo(
    page: Page,
    uploadAdditionalInfo: boolean,
    multipleDocuments: boolean,
  ): Promise<void>;
};

const caseFileViewTabPage: CaseFileViewTabPage = {
  caseFileViewTab: ".mat-tab-label",

  async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    caseNumber: string,
  ): Promise<void> {
    await expect(page.locator(".case-field").first()).toContainText(
      allTabTitlesContent.pageTitle + caseNumber,
    );
    await expect(page.locator(".mat-tab-label").nth(0)).toHaveText(
      allTabTitlesContent.tab1,
    );
    await expect(page.locator(".mat-tab-label").nth(1)).toHaveText(
      allTabTitlesContent.tab2,
    );
    await expect(page.locator(".mat-tab-label").nth(2)).toHaveText(
      allTabTitlesContent.tab3,
    );
    await expect(page.locator(".mat-tab-label").nth(3)).toHaveText(
      allTabTitlesContent.tab4,
    );
    await expect(page.locator(".mat-tab-label").nth(4)).toHaveText(
      allTabTitlesContent.tab5,
    );
    await expect(page.locator(".mat-tab-label").nth(5)).toHaveText(
      allTabTitlesContent.tab6,
    );
    await expect(page.locator(".mat-tab-label").nth(6)).toHaveText(
      allTabTitlesContent.tab7,
    );
    await expect(page.locator(".mat-tab-label").nth(7)).toHaveText(
      allTabTitlesContent.tab8,
    );
    await expect(page.locator(".mat-tab-label").nth(8)).toHaveText(
      allTabTitlesContent.tab9,
    );
    await expect(page.locator(".mat-tab-label").nth(9)).toHaveText(
      allTabTitlesContent.tab10,
    );
    await expect(page.locator(".mat-tab-label").nth(10)).toHaveText(
      allTabTitlesContent.tab11,
    );
    await expect(page.locator(".mat-tab-label").nth(11)).toHaveText(
      allTabTitlesContent.tab12,
    );
    await expect(page.locator(".mat-tab-label").nth(12)).toHaveText(
      allTabTitlesContent.tab13,
    );
    await expect(page.locator(".mat-tab-label").nth(13)).toHaveText(
      allTabTitlesContent.tab14,
    );
    await expect(page.locator(".mat-tab-label").nth(14)).toHaveText(
      allTabTitlesContent.tab15,
    );
    await expect(page.locator(".govuk-heading-l")).toHaveText(
      caseFileViewTabContent.pageTitle,
    );
    await commonHelpers.checkVisibleAndPresent(
      page.locator(
        `.node__name--folder:text-is("${caseFileViewTabContent.textOnPage1}")`,
      ),
      1,
    );
    await commonHelpers.checkVisibleAndPresent(
      page.locator(
        `.node__name--folder:text-is("${caseFileViewTabContent.textOnPage2}")`,
      ),
      1,
    );
    await commonHelpers.checkVisibleAndPresent(
      page.locator(
        `.node__name--folder:text-is("${caseFileViewTabContent.textOnPage3}")`,
      ),
      1,
    );
    await commonHelpers.checkVisibleAndPresent(
      page.locator(
        `.node__name--folder:text-is("${caseFileViewTabContent.textOnPage4}")`,
      ),
      1,
    );
    await commonHelpers.checkVisibleAndPresent(
      page.locator(
        `.node__name--folder:text-is("${caseFileViewTabContent.textOnPage5}")`,
      ),
      1,
    );
    await commonHelpers.checkVisibleAndPresent(
      page.locator(
        `.node__name--folder:text-is("${caseFileViewTabContent.textOnPage6}")`,
      ),
      1,
    );
    await commonHelpers.checkVisibleAndPresent(
      page.locator(
        `.node__name--folder:text-is("${caseFileViewTabContent.textOnPage7}")`,
      ),
      1,
    );
    await commonHelpers.checkVisibleAndPresent(
      page.locator(
        `.node__name--folder:text-is("${caseFileViewTabContent.textOnPage8}")`,
      ),
      1,
    );
    await commonHelpers.checkVisibleAndPresent(
      page.locator(
        `.node__name--folder:text-is("${caseFileViewTabContent.textOnPage9}")`,
      ),
      1,
    );
    await commonHelpers.checkVisibleAndPresent(
      page.locator(
        `.node__name--folder:text-is("${caseFileViewTabContent.textOnPage10}")`,
      ),
      1,
    );

    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async changeToCaseFileViewTab(page: Page): Promise<void> {
    await page.locator(this.caseFileViewTab).nth(10).click();
    await page.locator(this.caseFileViewTab).nth(10).click();
  },

  async checkPageInfo(
    page: Page,
    multipleDocuments: boolean,
    uploadAdditionalInfo: boolean,
  ): Promise<void> {
    if (multipleDocuments) {
      await commonHelpers.checkVisibleAndPresent(
        page.locator(
          `.node__count:text-is("${uploadedDocumentsContent.multipleDocuments}")`,
        ),
        1,
      );
      await expect(page.locator(".node-name-document").nth(0)).toHaveText(
        path.basename(config.testFile),
      );
      await expect(page.locator(".node-name-document").nth(1)).toHaveText(
        path.basename(config.testFile),
      );
      await expect(page.locator(".node-name-document").nth(2)).toHaveText(
        path.basename(config.testFile),
      );
      await expect(page.locator(".node-name-document").nth(3)).toHaveText(
        path.basename(config.testFile),
      );
      await expect(page.locator(".node-name-document").nth(4)).toHaveText(
        path.basename(config.testPdfFile),
      );
      await expect(page.locator(".node-name-document").nth(5)).toHaveText(
        path.basename(config.testPdfFile),
      );
      await expect(page.locator(".node-name-document").nth(6)).toHaveText(
        path.basename(config.testPdfFile),
      );
      await expect(page.locator(".node-name-document").nth(7)).toHaveText(
        path.basename(config.testPdfFile),
      );
      await expect(page.locator(".node-name-document").nth(8)).toHaveText(
        path.basename(config.testWordFile),
      );
      await expect(page.locator(".node-name-document").nth(9)).toHaveText(
        path.basename(config.testWordFile),
      );
      await expect(page.locator(".node-name-document").nth(10)).toHaveText(
        path.basename(config.testWordFile),
      );
      await expect(page.locator(".node-name-document").nth(11)).toHaveText(
        path.basename(config.testWordFile),
      );
    } else {
      if (!uploadAdditionalInfo) {
        await commonHelpers.checkVisibleAndPresent(
          page.locator(
            `.node__count:text-is("${uploadedDocumentsContent.totalDocuments}")`,
          ),
          1,
        );
      } else {
        await commonHelpers.checkVisibleAndPresent(
          page.locator(
            `.node__count:text-is("${uploadedDocumentsContent.totalDocumentsAdditional}")`,
          ),
          1,
        );
        await expect(page.locator(".node-name-document").nth(2)).toHaveText(
          path.basename(config.testWordFile),
        );
      }
      await expect(page.locator(".node-name-document").nth(0)).toHaveText(
        path.basename(config.testFile),
      );
      await expect(page.locator(".node-name-document").nth(1)).toHaveText(
        path.basename(config.testPdfFile),
      );
    }
  },
};

export default caseFileViewTabPage;
