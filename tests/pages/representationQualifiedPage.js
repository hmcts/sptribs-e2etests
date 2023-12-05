const { expect } = require("@playwright/test");
const axeTest = require("../helpers/accessibilityTestHelper.js");
const representationQualified = require("../fixtures/content/RepresentationQualified_content");

module.exports = {
  qualifiedYes: "#representationQualified",
  qualifiedNo: "#representationQualified-2",
  continueButton: "#main-form-submit",
  backButton: ".govuk-back-link",

  async checkPageLoads(page, accessibilityTest) {
    await expect(page.locator(".govuk-fieldset__heading")).toHaveText(
      representationQualified.pageTitle,
    );
    await expect(page.locator(".govuk-hint")).toHaveText(
      representationQualified.hintMessage,
    );
    await expect(page.locator(".govuk-radios__label").nth(0)).toHaveText(
      representationQualified.textOnPage1,
    );
    await expect(page.locator(".govuk-radios__label").nth(1)).toHaveText(
      representationQualified.textOnPage2,
    );
    if (accessibilityTest) {
      await axeTest.axeTest(page);
    }
  },

  async fillInFields(page, representationQualified) {
    if (representationQualified) {
      await page.click(this.qualifiedYes);
    } else {
      await page.click(this.qualifiedNo);
    }
    await page.click(this.continueButton);
  },

  async triggerErrorMessages(page) {
    await page.click(this.continueButton);
    await expect(page.locator(".govuk-error-summary__title")).toHaveText(
      representationQualified.errorBanner,
    );
    await expect(page.locator("[href='#representationQualified']")).toHaveText(
      representationQualified.selectionError,
    );
    await expect(page.locator("#representationQualified-error")).toContainText(
      representationQualified.selectionError,
    );
  },

  async pressBackButton(page) {
    await page.waitForURL('**/representation-qualified')
    await page.click(this.backButton);
  },
};
