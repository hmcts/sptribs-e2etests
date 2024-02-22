import { expect, Page } from "@playwright/test";
import path from "path";
import config from "../../../config.ts";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import caseDocumentsTabContent from "../../../fixtures/content/CaseAPI/caseTabs/caseDocumentsTab_content.ts";
import commonHelpers from "../../../helpers/commonHelpers.ts";

type CaseDocumentsTabPage = {
  caseDocumentsTab: string;
  checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    caseNumber: string,
    multipleDocuments: boolean,
  ): Promise<void>;
  changeToCaseDocumentsTab(page: Page): Promise<void>;
  checkPageInfo(page: Page, multipleDocuments: boolean): Promise<void>;
};

const caseDocumentsTabPage: CaseDocumentsTabPage = {
  caseDocumentsTab: ".mat-tab-label",

  async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    caseNumber: string,
    multipleDocuments: boolean,
  ): Promise<void> {
    await commonHelpers.checkAllCaseTabs(page, caseNumber);
    // await expect(page.locator(".case-field").first()).toContainText(
    //   allTabTitlesContent.pageTitle + caseNumber,
    // );
    // await expect(page.locator(".mat-tab-label").nth(0)).toHaveText(
    //   allTabTitlesContent.tab1,
    // );
    // await expect(page.locator(".mat-tab-label").nth(1)).toHaveText(
    //   allTabTitlesContent.tab2,
    // );
    // await expect(page.locator(".mat-tab-label").nth(2)).toHaveText(
    //   allTabTitlesContent.tab3,
    // );
    // await expect(page.locator(".mat-tab-label").nth(3)).toHaveText(
    //   allTabTitlesContent.tab4,
    // );
    // await expect(page.locator(".mat-tab-label").nth(4)).toHaveText(
    //   allTabTitlesContent.tab5,
    // );
    // await expect(page.locator(".mat-tab-label").nth(5)).toHaveText(
    //   allTabTitlesContent.tab6,
    // );
    // await expect(page.locator(this.caseDocumentsTab).nth(6)).toHaveText(
    //   allTabTitlesContent.tab7,
    // );
    // await expect(page.locator(".mat-tab-label").nth(7)).toHaveText(
    //   allTabTitlesContent.tab8,
    // );
    // await expect(page.locator(".mat-tab-label").nth(8)).toHaveText(
    //   allTabTitlesContent.tab9,
    // );
    // await expect(page.locator(".mat-tab-label").nth(9)).toHaveText(
    //   allTabTitlesContent.tab10,
    // );
    // await expect(page.locator(".mat-tab-label").nth(10)).toHaveText(
    //   allTabTitlesContent.tab11,
    // );
    // await expect(page.locator(".mat-tab-label").nth(11)).toHaveText(
    //   allTabTitlesContent.tab12,
    // );
    // await expect(page.locator(".mat-tab-label").nth(12)).toHaveText(
    //   allTabTitlesContent.tab13,
    // );
    // await expect(page.locator(".mat-tab-label").nth(13)).toHaveText(
    //   allTabTitlesContent.tab14,
    // );
    // await expect(page.locator(".mat-tab-label").nth(14)).toHaveText(
    //   allTabTitlesContent.tab15,
    // );
    await expect(page.locator("markdown[class='markdown'] h4")).toHaveText(
      caseDocumentsTabContent.pageTitle,
    );
    await expect(page.locator(".text-16").nth(1)).toHaveText(
      caseDocumentsTabContent.subHeading1,
    );
    await expect(page.locator(".text-16").nth(3)).toHaveText(
      caseDocumentsTabContent.title1,
    );
    await expect(page.locator(".text-16").nth(4)).toHaveText(
      caseDocumentsTabContent.textOnPage1,
    );
    await expect(page.locator(".text-16").nth(7)).toHaveText(
      caseDocumentsTabContent.textOnPage2,
    );
    await expect(page.locator(".text-16").nth(9)).toHaveText(
      caseDocumentsTabContent.title2,
    );
    await expect(page.locator(".text-16").nth(10)).toHaveText(
      caseDocumentsTabContent.textOnPage1,
    );
    await expect(page.locator(".text-16").nth(13)).toHaveText(
      caseDocumentsTabContent.textOnPage2,
    );
    if (multipleDocuments) {
      await expect(page.locator(".text-16").nth(15)).toHaveText(
        caseDocumentsTabContent.title3,
      );
      await expect(page.locator(".text-16").nth(16)).toHaveText(
        caseDocumentsTabContent.textOnPage1,
      );
      await expect(page.locator(".text-16").nth(19)).toHaveText(
        caseDocumentsTabContent.textOnPage2,
      );
      await expect(page.locator(".text-16").nth(21)).toHaveText(
        caseDocumentsTabContent.title4,
      );
      await expect(page.locator(".text-16").nth(22)).toHaveText(
        caseDocumentsTabContent.textOnPage1,
      );
      await expect(page.locator(".text-16").nth(25)).toHaveText(
        caseDocumentsTabContent.textOnPage2,
      );
      await expect(page.locator(".text-16").nth(27)).toHaveText(
        caseDocumentsTabContent.title5,
      );
      await expect(page.locator(".text-16").nth(28)).toHaveText(
        caseDocumentsTabContent.textOnPage1,
      );
      await expect(page.locator(".text-16").nth(31)).toHaveText(
        caseDocumentsTabContent.textOnPage2,
      );
      await expect(page.locator(".text-16").nth(33)).toHaveText(
        caseDocumentsTabContent.title6,
      );
      await expect(page.locator(".text-16").nth(34)).toHaveText(
        caseDocumentsTabContent.textOnPage1,
      );
      await expect(page.locator(".text-16").nth(37)).toHaveText(
        caseDocumentsTabContent.textOnPage2,
      );
      await expect(page.locator(".text-16").nth(39)).toHaveText(
        caseDocumentsTabContent.title7,
      );
      await expect(page.locator(".text-16").nth(40)).toHaveText(
        caseDocumentsTabContent.textOnPage1,
      );
      await expect(page.locator(".text-16").nth(43)).toHaveText(
        caseDocumentsTabContent.textOnPage2,
      );
      await expect(page.locator(".text-16").nth(45)).toHaveText(
        caseDocumentsTabContent.title8,
      );
      await expect(page.locator(".text-16").nth(46)).toHaveText(
        caseDocumentsTabContent.textOnPage1,
      );
      await expect(page.locator(".text-16").nth(49)).toHaveText(
        caseDocumentsTabContent.textOnPage2,
      );
    }

    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async changeToCaseDocumentsTab(page: Page): Promise<void> {
    await page.locator(this.caseDocumentsTab).nth(6).click();
  },

  async checkPageInfo(page: Page, multipleDocuments: boolean): Promise<void> {
    if (multipleDocuments) {
      await expect(page.locator(".text-16").nth(6)).toHaveText(
        caseDocumentsTabContent.firstDocCategory,
      );
      await expect(page.locator(".text-16").nth(8)).toHaveText(
        path.basename(config.testFile),
      );
      await expect(page.locator(".text-16").nth(12)).toHaveText(
        caseDocumentsTabContent.firstDocCategory,
      );
      await expect(page.locator(".text-16").nth(14)).toHaveText(
        path.basename(config.testFile),
      );
      await expect(page.locator(".text-16").nth(18)).toHaveText(
        caseDocumentsTabContent.firstDocCategory,
      );
      await expect(page.locator(".text-16").nth(20)).toHaveText(
        path.basename(config.testFile),
      );
      await expect(page.locator(".text-16").nth(24)).toHaveText(
        caseDocumentsTabContent.firstDocCategory,
      );
      await expect(page.locator(".text-16").nth(26)).toHaveText(
        path.basename(config.testFile),
      );
      await expect(page.locator(".text-16").nth(30)).toHaveText(
        caseDocumentsTabContent.secondDocCategory,
      );
      await expect(page.locator(".text-16").nth(32)).toHaveText(
        path.basename(config.testPdfFile),
      );
      await expect(page.locator(".text-16").nth(36)).toHaveText(
        caseDocumentsTabContent.secondDocCategory,
      );
      await expect(page.locator(".text-16").nth(38)).toHaveText(
        path.basename(config.testPdfFile),
      );
      await expect(page.locator(".text-16").nth(42)).toHaveText(
        caseDocumentsTabContent.secondDocCategory,
      );
      await expect(page.locator(".text-16").nth(44)).toHaveText(
        path.basename(config.testPdfFile),
      );
      await expect(page.locator(".text-16").nth(48)).toHaveText(
        caseDocumentsTabContent.secondDocCategory,
      );
      await expect(page.locator(".text-16").nth(50)).toHaveText(
        path.basename(config.testPdfFile),
      );
    } else {
      await expect(page.locator(".text-16").nth(6)).toHaveText(
        caseDocumentsTabContent.firstDocCategory,
      );
      await expect(page.locator(".text-16").nth(8)).toHaveText(
        path.basename(config.testFile),
      );
      await expect(page.locator(".text-16").nth(12)).toHaveText(
        caseDocumentsTabContent.secondDocCategory,
      );
      await expect(page.locator(".text-16").nth(14)).toHaveText(
        path.basename(config.testPdfFile),
      );
    }
  },
};

export default caseDocumentsTabPage;
