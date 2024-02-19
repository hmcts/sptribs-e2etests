import { expect, Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import caseCategorisationDetails_content from "../../../fixtures/content/CaseAPI/createCase/caseCategorisationDetails_content.ts";
import commonHelpers, {
  Category,
  SubCategory,
} from "../../../helpers/commonHelpers.ts";

type CaseCategorisationDetailsPage = {
  category: string;
  subCategory: string;
  checkPageLoads(page: Page, accessibilityTest: boolean): Promise<void>;
  fillInFields(
    page: Page,
    category: Category,
    subCategory: SubCategory,
  ): Promise<void>;
};

const caseCategorisationDetailsPage: CaseCategorisationDetailsPage = {
  category: "#cicCaseCaseCategory",
  subCategory: "#cicCaseCaseSubcategory",

  async checkPageLoads(page: Page, accessibilityTest: boolean): Promise<void> {
    await expect(page.locator(".govuk-caption-l")).toHaveText(
      caseCategorisationDetails_content.pageHint,
    );
    await expect(page.locator(".govuk-heading-l")).toHaveText(
      caseCategorisationDetails_content.pageTitle,
    );
    await expect(page.locator(".form-label").nth(0)).toHaveText(
      caseCategorisationDetails_content.textOnPage1,
    );
    await expect(page.locator(".form-label").nth(1)).toHaveText(
      caseCategorisationDetails_content.textOnPage2,
    );
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async fillInFields(
    page: Page,
    category: string,
    subCategory: string,
  ): Promise<void> {
    await page.selectOption(this.category, category);
    await page.selectOption(this.subCategory, subCategory);
    await commonHelpers.clickContinueButton(page);
  },
};

export default caseCategorisationDetailsPage;
