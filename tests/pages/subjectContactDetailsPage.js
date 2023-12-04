const { expect } = require("@playwright/test");
const axeTest = require("../helpers/accessibilityTestHelper.js");
const subjectContactDetails = require("../fixtures/content/SubjectContactDetails_content");

module.exports = {
  fields: {
    email: "#subjectEmailAddress",
    mobileNumber: "#subjectContactNumber",
  },

  contactAgreeBox: "#subjectAgreeContact",
  continueButton: "#main-form-submit",
  backButton: ".govuk-back-link",

  async checkPageLoads(page) {
    await expect(page.locator(".govuk-heading-l")).toHaveText(
      subjectContactDetails.pageTitle,
    );
    await expect(
      page.locator("main[id='main-content'] p[class='govuk-body']"),
    ).toHaveText(subjectContactDetails.textOnPage1);
    await expect(page.locator(".govuk-label").nth(0)).toHaveText(
      subjectContactDetails.subHeading1,
    );
    await expect(page.locator(".govuk-label").nth(1)).toHaveText(
      subjectContactDetails.subHeading2,
    );
    await expect(page.locator("label[for='subjectAgreeContact']")).toHaveText(
      subjectContactDetails.textOnPage2,
    );
  },

  async fillInFields(page, accessibilityTest) {
    await page.fill(this.fields.email, subjectContactDetails.emailAddress);
    await page.fill(
      this.fields.mobileNumber,
      subjectContactDetails.contactNumber,
    );
    await page.click(this.contactAgreeBox);
    await page.click(this.continueButton);
    if (accessibilityTest) {
      await axeTest.axeTest(page);
    }
  },

  async triggerErrorMessages(page) {
    await page.click(this.continueButton);
    await expect(page.locator(".govuk-error-summary__title")).toHaveText(
      subjectContactDetails.errorBanner,
    );
    await expect(page.locator("[href='#subjectEmailAddress']")).toHaveText(
      subjectContactDetails.validEmailError,
    );
    await expect(page.locator("[href='#subjectContactNumber']")).toHaveText(
      subjectContactDetails.validContactNumberError,
    );
    await expect(page.locator("[href='#subjectAgreeContact']")).toHaveText(
      subjectContactDetails.agreeError,
    );
    await expect(page.locator("#subjectEmailAddress-error")).toContainText(
      subjectContactDetails.validEmailError,
    );
    await expect(page.locator("#subjectContactNumber-error")).toContainText(
      subjectContactDetails.validContactNumberError,
    );
    await expect(page.locator("#subjectAgreeContact-error")).toContainText(
      subjectContactDetails.agreeError,
    );
    await page.fill(this.fields.email, subjectContactDetails.partEmailEntry);
    await page.click(this.continueButton);
    await expect(page.locator("[href='#subjectEmailAddress']")).toHaveText(
      subjectContactDetails.partEmailError,
    );
    await expect(page.locator("#subjectEmailAddress-error")).toContainText(
      subjectContactDetails.partEmailError,
    );
    await page.fill(this.fields.email, "");
  },

  async pressBackButton(page) {
    await page.click(this.backButton);
  },
};
