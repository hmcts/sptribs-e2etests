import { expect, Page } from "@playwright/test";
import caseSubjectDetailsObject_content from "../../../fixtures/content/CaseAPI/createCase/caseSubjectDetailsObject_content.ts";
import submit_content from "../../../fixtures/content/CaseAPI/documentManagementAmend/submit_content.ts";
import commonHelpers from "../../../helpers/commonHelpers.ts";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import config from "../../../config.ts";
import path from "path";
import selectCaseDocuments_content from "../../../fixtures/content/CaseAPI/documentManagementAmend/selectCaseDocuments_content.ts";
import amendCaseDocuments_content from "../../../fixtures/content/CaseAPI/documentManagementAmend/amendCaseDocuments_content.ts";

type SubmitPage = {
  continue: string;
  previous: string;
  cancel: string;
  checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
  ): Promise<void>;
  continueOn(page: Page): Promise<void>;
};

const submitPage: SubmitPage = {
  continue: '[type="submit"]',
  previous: ".button-secondary[disabled]",
  cancel: ".cancel",
  async checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page.waitForSelector(
      `.heading-h2:text-is("${submit_content.pageTitle}")`,
    );
    await Promise.all([
      expect(page.locator(".govuk-heading-l")).toHaveText(
        submit_content.pageHint,
      ),
      expect(page.locator(".heading-h2")).toHaveText(submit_content.pageTitle),
      expect(page.locator("markdown > h3")).toContainText(
        caseSubjectDetailsObject_content.name,
      ),
      expect(page.locator("markdown > p").nth(0)).toContainText(
        submit_content.caseReference + caseNumber,
      ),
      ...Array.from({ length: 3 }, (_, index) => {
        const textOnPage = (submit_content as any)[`textOnPage${index + 1}`];
        return commonHelpers.checkVisibleAndPresent(
          page.locator(`span.text-16:text-is("${textOnPage}")`),
          1,
        );
      }),
      commonHelpers.checkVisibleAndPresent(
        page.locator(`text="${submit_content.textOnPage4}"`),
        2,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `text="DOC-MGMT--${path.basename(config.testPdfFile)}--${selectCaseDocuments_content.category}"`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(`text="${submit_content.textOnPage5}"`),
        2,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(`text="${amendCaseDocuments_content.category}"`),
        1,
      ),
    ]);
    if (accessibilityTest) {
      await axeTest(page);
    }
  },
  async continueOn(page: Page): Promise<void> {
    await page.click(this.continue);
  },
};

export default submitPage;
