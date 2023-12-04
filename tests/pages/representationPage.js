const { expect } = require("@playwright/test");
const axeTest = require("../helpers/accessibilityTestHelper.js");
const representation = require("../fixtures/content/Representation_content");

module.exports = {
  representationYes: "#representation",
  representationNo: "#representation-2",
  continueButton: "#main-form-submit",
  backButton: ".govuk-back-link",

  async checkPageLoads(page, accessibilityTest) {
    await expect(page.locator(".govuk-fieldset__heading")).toHaveText(
      representation.pageTitle,
    );
    await expect(page.locator(".govuk-label").nth(0)).toHaveText(
      representation.textOnPage1,
    );
    await expect(page.locator(".govuk-label").nth(1)).toHaveText(
      representation.textOnPage2,
    );
    if (accessibilityTest) {
      await axeTest.axeTest(page);
    }
  },

  async fillInFields(page, representationPresent) {
    if (representationPresent) {
      await page.click(this.representationYes);
    } else {
      await page.click(this.representationNo);
    }
    await page.click(this.continueButton);
  },

  async triggerErrorMessages(page) {
    await page.click(this.continueButton);
    await expect(page.locator(".govuk-error-summary__title")).toHaveText(
      representation.errorBanner,
    );
    await expect(page.locator("[href='#representation']")).toHaveText(
      representation.selectionError,
    );
    await expect(page.locator("#representation-error")).toContainText(
      representation.selectionError,
    );
  },

  async pressBackButton(page) {
    await page.click(this.backButton);
  },
};
