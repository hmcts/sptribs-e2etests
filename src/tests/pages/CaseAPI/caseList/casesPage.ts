import { expect, Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import casesContent from "../../../fixtures/content/CaseAPI/caseList/cases_content.ts";

type CasesPage = {
  searchCaseNumber: string;
  caseType: string;
  checkPageLoads(page: Page, accessibilityTest: boolean): Promise<void>;
  changeCaseType(page: Page): Promise<void>;
  searchForCaseNumber(page: Page, caseNumber: string): Promise<void>;
};

const casesPage: CasesPage = {
  searchCaseNumber: "#\\[CASE_REFERENCE\\]",
  caseType: "#wb-case-type",

  async checkPageLoads(page: Page, accessibilityTest: boolean): Promise<void> {
    await expect(page.locator(".govuk-heading-xl")).toHaveText(
      casesContent.pageTitle,
    );
    await expect(page.locator("h2[aria-label='Filters']")).toHaveText(
      casesContent.subTitle1,
    );
    await expect(page.locator("label[for='wb-jurisdiction']")).toHaveText(
      casesContent.textOnPage1,
    );
    await expect(page.locator("label[for='wb-case-type']")).toHaveText(
      casesContent.textOnPage2,
    );
    await expect(page.locator("label[for='wb-case-state']")).toHaveText(
      casesContent.textOnPage3,
    );
    await expect(page.locator("label[for='[CASE_REFERENCE]']")).toHaveText(
      casesContent.textOnPage4,
    );
    await expect(page.locator("label[for='hearingVenueName']")).toHaveText(
      casesContent.textOnPage5,
    );
    await expect(page.locator("label[for='cicCaseFullName']")).toHaveText(
      casesContent.textOnPage6,
    );
    await expect(
      page.locator("label[for='cicCaseAddress.PostCode']"),
    ).toHaveText(casesContent.textOnPage7);
    await expect(page.locator("#cicCaseDateOfBirth")).toHaveText(
      casesContent.textOnPage8,
    );
    await expect(
      page.locator("label[for='cicCaseApplicantFullName']"),
    ).toHaveText(casesContent.textOnPage9);
    await expect(
      page.locator("label[for='cicCaseRepresentativeReference']"),
    ).toHaveText(casesContent.textOnPage10);
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async changeCaseType(page: Page): Promise<void> {
    await page.selectOption(this.caseType, "CIC");
    await page.locator("button[title='Apply filter']").click();
  },

  async searchForCaseNumber(page: Page, caseNumber: string): Promise<void> {
    await page.fill(this.searchCaseNumber, caseNumber);
    await page.locator("button[title='Apply filter']").click();
    await page.locator("ccd-read-text-field").nth(0).click();
  },
};

export default casesPage;
