const { expect } = require("@playwright/test");
const axeTest = require("../helpers/accessibilityTestHelper.js");
const cases = require("../fixtures/content/cases_content");

module.exports = {
  searchCaseNumber: "#\\[CASE_REFERENCE\\]",
  caseType: "#wb-case-type",

  async checkPageLoads(page, accessibilityTest) {
    await expect(page.locator(".govuk-heading-xl")).toHaveText(cases.pageTitle);
    await expect(page.locator("h2[aria-label='Filters']")).toHaveText(
      cases.subTitle1,
    );
    await expect(page.locator("label[for='wb-jurisdiction']")).toHaveText(
      cases.textOnPage1,
    );
    await expect(page.locator("label[for='wb-case-type']")).toHaveText(
      cases.textOnPage2,
    );
    await expect(page.locator("label[for='wb-case-state']")).toHaveText(
      cases.textOnPage3,
    );
    await expect(page.locator("label[for='[CASE_REFERENCE]']")).toHaveText(
      cases.textOnPage4,
    );
    await expect(page.locator("label[for='hearingVenueName']")).toHaveText(
      cases.textOnPage5,
    );
    await expect(page.locator("label[for='cicCaseFullName']")).toHaveText(
      cases.textOnPage6,
    );
    await expect(page.locator("label[for='cicCaseAddress.PostCode']"),).toHaveText(
        cases.textOnPage7,
    );
    await expect(page.locator("#cicCaseDateOfBirth")).toHaveText(
      cases.textOnPage8,
    );
    await expect(
      page.locator("label[for='cicCaseApplicantFullName']"),
    ).toHaveText(cases.textOnPage9);
    await expect(
      page.locator("label[for='cicCaseRepresentativeReference']"),
    ).toHaveText(cases.textOnPage10);
    if (accessibilityTest) {
      await axeTest.axeTest(page);
    }
  },

  async changeCaseType(page) {
    await page.selectOption(this.caseType, 'CIC');
    await page.getByRole("button", { name: "Apply"}).click();
  },

  async searchForCaseNumber(page, caseNumber) {
    await page.fill(this.searchCaseNumber, caseNumber);
    await page.getByRole("button", { name: "Apply"}).click();
    await page.getByRole("link", { name: caseNumber}).click();
  },
};
