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
    await Promise.all([
      commonHelpers.checkAllCaseTabs(page, caseNumber),
      expect(page.locator("markdown[class='markdown'] h4")).toHaveText(
        caseDocumentsTabContent.pageTitle,
      ),
      expect(page.locator(".text-16").nth(1)).toHaveText(
        caseDocumentsTabContent.subHeading1,
      ),
      expect(page.locator(".text-16").nth(3)).toHaveText(
        caseDocumentsTabContent.title1,
      ),
      expect(page.locator(".text-16").nth(4)).toHaveText(
        caseDocumentsTabContent.textOnPage1,
      ),
      expect(page.locator(".text-16").nth(7)).toHaveText(
        caseDocumentsTabContent.textOnPage2,
      ),
      expect(page.locator(".text-16").nth(9)).toHaveText(
        caseDocumentsTabContent.title2,
      ),
      expect(page.locator(".text-16").nth(10)).toHaveText(
        caseDocumentsTabContent.textOnPage1,
      ),
      expect(page.locator(".text-16").nth(13)).toHaveText(
        caseDocumentsTabContent.textOnPage2,
      ),
    ]);
    if (multipleDocuments) {
      await Promise.all([
        expect(page.locator(".text-16").nth(15)).toHaveText(
          caseDocumentsTabContent.title3,
        ),
        expect(page.locator(".text-16").nth(16)).toHaveText(
          caseDocumentsTabContent.textOnPage1,
        ),
        expect(page.locator(".text-16").nth(19)).toHaveText(
          caseDocumentsTabContent.textOnPage2,
        ),
        expect(page.locator(".text-16").nth(21)).toHaveText(
          caseDocumentsTabContent.title4,
        ),
        expect(page.locator(".text-16").nth(22)).toHaveText(
          caseDocumentsTabContent.textOnPage1,
        ),
        expect(page.locator(".text-16").nth(25)).toHaveText(
          caseDocumentsTabContent.textOnPage2,
        ),
        expect(page.locator(".text-16").nth(27)).toHaveText(
          caseDocumentsTabContent.title5,
        ),
        expect(page.locator(".text-16").nth(28)).toHaveText(
          caseDocumentsTabContent.textOnPage1,
        ),
        expect(page.locator(".text-16").nth(31)).toHaveText(
          caseDocumentsTabContent.textOnPage2,
        ),
        expect(page.locator(".text-16").nth(33)).toHaveText(
          caseDocumentsTabContent.title6,
        ),
        expect(page.locator(".text-16").nth(34)).toHaveText(
          caseDocumentsTabContent.textOnPage1,
        ),
        expect(page.locator(".text-16").nth(37)).toHaveText(
          caseDocumentsTabContent.textOnPage2,
        ),
        expect(page.locator(".text-16").nth(39)).toHaveText(
          caseDocumentsTabContent.title7,
        ),
        expect(page.locator(".text-16").nth(40)).toHaveText(
          caseDocumentsTabContent.textOnPage1,
        ),
        expect(page.locator(".text-16").nth(43)).toHaveText(
          caseDocumentsTabContent.textOnPage2,
        ),
        expect(page.locator(".text-16").nth(45)).toHaveText(
          caseDocumentsTabContent.title8,
        ),
        expect(page.locator(".text-16").nth(46)).toHaveText(
          caseDocumentsTabContent.textOnPage1,
        ),
        expect(page.locator(".text-16").nth(49)).toHaveText(
          caseDocumentsTabContent.textOnPage2,
        ),
      ]);
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
      await Promise.all([
        expect(page.locator(".text-16").nth(6)).toHaveText(caseDocumentsTabContent.firstDocCategory),
        expect(page.locator(".text-16").nth(8)).toHaveText(path.basename(config.testFile)),
        expect(page.locator(".text-16").nth(12)).toHaveText(caseDocumentsTabContent.firstDocCategory),
        expect(page.locator(".text-16").nth(14)).toHaveText(path.basename(config.testFile)),
        expect(page.locator(".text-16").nth(18)).toHaveText(caseDocumentsTabContent.firstDocCategory),
        expect(page.locator(".text-16").nth(20)).toHaveText(path.basename(config.testFile)),
        expect(page.locator(".text-16").nth(24)).toHaveText(caseDocumentsTabContent.firstDocCategory),
        expect(page.locator(".text-16").nth(26)).toHaveText(path.basename(config.testFile)),
        expect(page.locator(".text-16").nth(30)).toHaveText(caseDocumentsTabContent.secondDocCategory),
        expect(page.locator(".text-16").nth(32)).toHaveText(path.basename(config.testPdfFile)),
        expect(page.locator(".text-16").nth(36)).toHaveText(caseDocumentsTabContent.secondDocCategory),
        expect(page.locator(".text-16").nth(38)).toHaveText(path.basename(config.testPdfFile)),
        expect(page.locator(".text-16").nth(42)).toHaveText(caseDocumentsTabContent.secondDocCategory),
        expect(page.locator(".text-16").nth(44)).toHaveText(path.basename(config.testPdfFile)),
        expect(page.locator(".text-16").nth(48)).toHaveText(caseDocumentsTabContent.secondDocCategory),
        expect(page.locator(".text-16").nth(50)).toHaveText(path.basename(config.testPdfFile))
      ]);
    } else {
      await Promise.all([
        expect(page.locator(".text-16").nth(6)).toHaveText(
          caseDocumentsTabContent.firstDocCategory,
        ),
        expect(page.locator(".text-16").nth(8)).toHaveText(
          path.basename(config.testFile),
        ),
        expect(page.locator(".text-16").nth(12)).toHaveText(
          caseDocumentsTabContent.secondDocCategory,
        ),
        expect(page.locator(".text-16").nth(14)).toHaveText(
          path.basename(config.testPdfFile),
        ),
      ]);
    }
  },
};

export default caseDocumentsTabPage;
