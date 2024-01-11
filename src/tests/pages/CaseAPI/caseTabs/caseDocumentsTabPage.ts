import { expect, Page } from "@playwright/test";
import path from "path";
import config from "../../../config.ts";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import allTabTitlesContent from "../../../fixtures/content/CaseAPI/caseTabs/allTabTitles_content.ts";
import caseDocumentsTabContent from "../../../fixtures/content/CaseAPI/caseTabs/caseDocumentsTab_content.ts";

type CaseDocumentsTabPage = {
  caseDocumentsTab: string;
  textClass: string;
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
  textClass: ".text-16",

  async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    caseNumber: string,
    multipleDocuments: boolean,
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
    await expect(page.locator(this.caseDocumentsTab).nth(6)).toHaveText(
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
    await expect(page.locator("markdown[class='markdown'] h4")).toHaveText(
      caseDocumentsTabContent.pageTitle,
    );
    await expect(page.locator(this.textClass).nth(1)).toHaveText(
      caseDocumentsTabContent.subHeading1,
    );
    await expect(page.locator(this.textClass).nth(3)).toHaveText(
      caseDocumentsTabContent.title1,
    );
    await expect(page.locator(this.textClass).nth(4)).toHaveText(
      caseDocumentsTabContent.textOnPage1,
    );
    await expect(page.locator(this.textClass).nth(7)).toHaveText(
      caseDocumentsTabContent.textOnPage2,
    );
    await expect(page.locator(this.textClass).nth(9)).toHaveText(
      caseDocumentsTabContent.title2,
    );
    await expect(page.locator(this.textClass).nth(10)).toHaveText(
      caseDocumentsTabContent.textOnPage1,
    );
    await expect(page.locator(this.textClass).nth(13)).toHaveText(
      caseDocumentsTabContent.textOnPage2,
    );
    if (multipleDocuments) {
      await expect(page.locator(this.textClass).nth(15)).toHaveText(
        caseDocumentsTabContent.title3,
      );
      await expect(page.locator(this.textClass).nth(16)).toHaveText(
        caseDocumentsTabContent.textOnPage1,
      );
      await expect(page.locator(this.textClass).nth(19)).toHaveText(
        caseDocumentsTabContent.textOnPage2,
      );
      await expect(page.locator(this.textClass).nth(21)).toHaveText(
        caseDocumentsTabContent.title4,
      );
      await expect(page.locator(this.textClass).nth(22)).toHaveText(
        caseDocumentsTabContent.textOnPage1,
      );
      await expect(page.locator(this.textClass).nth(25)).toHaveText(
        caseDocumentsTabContent.textOnPage2,
      );
      await expect(page.locator(this.textClass).nth(27)).toHaveText(
        caseDocumentsTabContent.title5,
      );
      await expect(page.locator(this.textClass).nth(28)).toHaveText(
        caseDocumentsTabContent.textOnPage1,
      );
      await expect(page.locator(this.textClass).nth(31)).toHaveText(
        caseDocumentsTabContent.textOnPage2,
      );
      await expect(page.locator(this.textClass).nth(33)).toHaveText(
        caseDocumentsTabContent.title6,
      );
      await expect(page.locator(this.textClass).nth(34)).toHaveText(
        caseDocumentsTabContent.textOnPage1,
      );
      await expect(page.locator(this.textClass).nth(37)).toHaveText(
        caseDocumentsTabContent.textOnPage2,
      );
      await expect(page.locator(this.textClass).nth(39)).toHaveText(
        caseDocumentsTabContent.title7,
      );
      await expect(page.locator(this.textClass).nth(40)).toHaveText(
        caseDocumentsTabContent.textOnPage1,
      );
      await expect(page.locator(this.textClass).nth(43)).toHaveText(
        caseDocumentsTabContent.textOnPage2,
      );
      await expect(page.locator(this.textClass).nth(45)).toHaveText(
        caseDocumentsTabContent.title8,
      );
      await expect(page.locator(this.textClass).nth(46)).toHaveText(
        caseDocumentsTabContent.textOnPage1,
      );
      await expect(page.locator(this.textClass).nth(49)).toHaveText(
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
      await expect(page.locator(this.textClass).nth(6)).toHaveText(
        caseDocumentsTabContent.firstDocCategory,
      );
      await expect(page.locator(this.textClass).nth(8)).toHaveText(
        path.basename(config.testFile),
      );
      await expect(page.locator(this.textClass).nth(12)).toHaveText(
        caseDocumentsTabContent.firstDocCategory,
      );
      await expect(page.locator(this.textClass).nth(14)).toHaveText(
        path.basename(config.testFile),
      );
      await expect(page.locator(this.textClass).nth(18)).toHaveText(
        caseDocumentsTabContent.firstDocCategory,
      );
      await expect(page.locator(this.textClass).nth(20)).toHaveText(
        path.basename(config.testFile),
      );
      await expect(page.locator(this.textClass).nth(24)).toHaveText(
        caseDocumentsTabContent.firstDocCategory,
      );
      await expect(page.locator(this.textClass).nth(26)).toHaveText(
        path.basename(config.testFile),
      );
      await expect(page.locator(this.textClass).nth(30)).toHaveText(
        caseDocumentsTabContent.secondDocCategory,
      );
      await expect(page.locator(this.textClass).nth(32)).toHaveText(
        path.basename(config.testPdfFile),
      );
      await expect(page.locator(this.textClass).nth(36)).toHaveText(
        caseDocumentsTabContent.secondDocCategory,
      );
      await expect(page.locator(this.textClass).nth(38)).toHaveText(
        path.basename(config.testPdfFile),
      );
      await expect(page.locator(this.textClass).nth(42)).toHaveText(
        caseDocumentsTabContent.secondDocCategory,
      );
      await expect(page.locator(this.textClass).nth(44)).toHaveText(
        path.basename(config.testPdfFile),
      );
      await expect(page.locator(this.textClass).nth(48)).toHaveText(
        caseDocumentsTabContent.secondDocCategory,
      );
      await expect(page.locator(this.textClass).nth(50)).toHaveText(
        path.basename(config.testPdfFile),
      );
    } else {
      await expect(page.locator(this.textClass).nth(6)).toHaveText(
        caseDocumentsTabContent.firstDocCategory,
      );
      await expect(page.locator(this.textClass).nth(8)).toHaveText(
        path.basename(config.testFile),
      );
      await expect(page.locator(this.textClass).nth(12)).toHaveText(
        caseDocumentsTabContent.secondDocCategory,
      );
      await expect(page.locator(this.textClass).nth(14)).toHaveText(
        path.basename(config.testPdfFile),
      );
    }
  },
};

export default caseDocumentsTabPage;
