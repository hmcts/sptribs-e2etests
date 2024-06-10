import { expect, Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import commonHelpers from "../../../helpers/commonHelpers.ts";
import { initialState } from "../../../journeys/CaseAPI/editCase.ts";
import editCaseDateObjectsContent from "../../../fixtures/content/CaseAPI/editCase/editCaseDateObjects_content.ts";
import caseSubjectDetailsObject_content from "../../../fixtures/content/CaseAPI/createCase/caseSubjectDetailsObject_content.ts";

type EditCaseDateObjectsPage = {
  continue: string;
  day: string;
  month: string;
  year: string;
  checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
  ): Promise<void>;
  checkAndFillInFields(page: Page, initialState: initialState): Promise<void>;
  triggerErrorMessages(page: Page): Promise<void>;
};

const editCaseDateObjectsPage: EditCaseDateObjectsPage = {
  continue: '[type="submit"]',
  day: "#cicCaseCaseReceivedDate-day",
  month: "#cicCaseCaseReceivedDate-month",
  year: "#cicCaseCaseReceivedDate-year",

  async checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
  ): Promise<void> {
    await Promise.all([
      expect(page.locator(".govuk-caption-l")).toHaveText(
        editCaseDateObjectsContent.pageHint,
      ),
      expect(page.locator(".govuk-heading-l")).toHaveText(
        editCaseDateObjectsContent.pageTitle,
      ),
      expect(page.locator("markdown > h3")).toContainText(
        caseSubjectDetailsObject_content.name,
      ),
      expect(page.locator("markdown > p").nth(0)).toContainText(
        editCaseDateObjectsContent.caseReference + caseNumber,
      ),
      ...Array.from({ length: 4 }, (_, index) => {
        const textOnPage = (editCaseDateObjectsContent as any)[
          `textOnPage${index + 1}`
        ];
        return commonHelpers.checkVisibleAndPresent(
          page.locator(`.form-label:text-is("${textOnPage}")`),
          1,
        );
      }),
    ]);
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async checkAndFillInFields(
    page: Page,
    initialState: initialState,
  ): Promise<void> {
    const currentDate = new Date();
    if (initialState !== "DSS Submitted") {
      await expect(page.locator(this.day)).toHaveValue(
        "0" + editCaseDateObjectsContent.day,
      );
      await expect(page.locator(this.month)).toHaveValue(
        "0" + editCaseDateObjectsContent.month,
      );
      await expect(page.locator(this.year)).toHaveValue(
        editCaseDateObjectsContent.year,
      );
      await page.fill(this.day, `${currentDate.getDate()}`);
      await page.fill(this.month, `${currentDate.getMonth() + 1}`);
      await page.fill(this.year, `${currentDate.getFullYear()}`);
    } else {
      await expect(page.locator(this.day)).toHaveValue(
        `${commonHelpers.padZero(currentDate.getDate())}`,
      );
      await expect(page.locator(this.month)).toHaveValue(
        `${commonHelpers.padZero(currentDate.getMonth() + 1)}`,
      );
      await expect(page.locator(this.year)).toHaveValue(
        `${currentDate.getFullYear()}`,
      );
    }
    await page.click(this.continue);
    if (page.url().includes("casedateObjects")) {
      await page.click(this.continue); // This is here in the chance that the "continue" button does not continue
    }
  },

  async triggerErrorMessages(page: Page): Promise<void> {
    await page.locator(this.day).clear();
    await page.locator(this.month).clear();
    await page.locator(this.year).clear();
    await page.click(this.continue);
    await Promise.all([
      expect(page.locator("#error-summary-title")).toHaveText(
        editCaseDateObjectsContent.errorBanner,
      ),
      expect(page.locator(".validation-error")).toHaveText(
        editCaseDateObjectsContent.dateError,
      ),
      expect(page.locator(".error-message")).toHaveText(
        editCaseDateObjectsContent.dateError,
      ),
    ]);
    await page.fill(this.day, "90");
    await page.click(this.continue);
    await Promise.all([
      expect(page.locator("#error-summary-title")).toHaveText(
        editCaseDateObjectsContent.errorBanner,
      ),
      expect(page.locator(".validation-error")).toHaveText(
        editCaseDateObjectsContent.validDateError,
      ),
      expect(page.locator(".error-message")).toHaveText(
        editCaseDateObjectsContent.inlineValidDateError,
      ),
    ]);
    await page.locator(this.day).clear();
  },
};

export default editCaseDateObjectsPage;
