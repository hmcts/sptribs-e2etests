const { expect } = require("@playwright/test");
const axeTest = require("../helpers/accessibilityTestHelper.js");
const representativeDetails = require("../fixtures/content/RepresentativeDetails_content");

module.exports = {
  fields: {
    fullName: "#representativeFullName",
    representativeOrgName: "#representativeOrganisationName",
    representativeContactNumber: "#representativeContactNumber",
    representativeEmailAddress: "#representativeEmailAddress",
  },

  continueButton: "#main-form-submit",
  backButton: ".govuk-back-link",

  async checkPageLoads(page, accessibilityTest) {
    await expect(page.locator(".govuk-heading-l")).toHaveText(
      representativeDetails.pageTitle,
    );
    await expect(page.locator(".govuk-body").nth(4)).toHaveText(
      representativeDetails.textOnPage1,
    );
    await expect(page.locator(".govuk-body").nth(5)).toHaveText(
      representativeDetails.textOnPage2,
    );
    await expect(page.locator(".govuk-label").nth(0)).toHaveText(
      representativeDetails.subHeading1,
    );
    await expect(page.locator(".govuk-label").nth(1)).toHaveText(
      representativeDetails.subHeading2,
    );
    await expect(page.locator(".govuk-label").nth(2)).toHaveText(
      representativeDetails.subHeading3,
    );
    await expect(page.locator(".govuk-label").nth(3)).toHaveText(
      representativeDetails.subHeading4,
    );
    if (accessibilityTest) {
      await axeTest.axeTest(page);
    }
  },

  async fillInFields(page) {
    await page.fill(this.fields.fullName, representativeDetails.fullName);
    await page.fill(
      this.fields.representativeOrgName,
      representativeDetails.Organisation,
    );
    await page.fill(
      this.fields.representativeContactNumber,
      representativeDetails.contactNumber,
    );
    await page.fill(
      this.fields.representativeEmailAddress,
      representativeDetails.emailAddress,
    );
    await page.click(this.continueButton);
  },

  async triggerErrorMessages(page) {
    await page.click(this.continueButton);
    await expect(page.locator(".govuk-error-summary__title")).toHaveText(
      representativeDetails.errorBanner,
    );
    await expect(page.locator("[href='#representativeFullName']")).toHaveText(
      representativeDetails.fullNameError,
    );
    await expect(
      page.locator("[href='#representativeOrganisationName']"),
    ).toHaveText(representativeDetails.organisationNameError);
    await expect(
      page.locator("[href='#representativeContactNumber']"),
    ).toHaveText(representativeDetails.validContactNumberError);
    await expect(
      page.locator("[href='#representativeEmailAddress']"),
    ).toHaveText(representativeDetails.validEmailError);
    await expect(page.locator("#representativeFullName-error")).toContainText(
      representativeDetails.fullNameError,
    );
    await expect(
      page.locator("#representativeOrganisationName-error"),
    ).toContainText(representativeDetails.organisationNameError);
    await expect(
      page.locator("#representativeContactNumber-error"),
    ).toContainText(representativeDetails.validContactNumberError);
    await expect(
      page.locator("#representativeEmailAddress-error"),
    ).toContainText(representativeDetails.validEmailError);
    await page.fill(
      this.fields.representativeEmailAddress,
      representativeDetails.partEmailEntry,
    );
    await page.click(this.continueButton);
    await expect(
      page.locator("[href='#representativeEmailAddress']"),
    ).toHaveText(representativeDetails.partEmailError);
    await expect(
      page.locator("#representativeEmailAddress-error"),
    ).toContainText(representativeDetails.partEmailError);
    await page.fill(this.fields.representativeEmailAddress, "");
  },

  async pressBackButton(page) {
    await page.waitForURL('**/representative-details')
    await page.click(this.backButton);
  },
};
