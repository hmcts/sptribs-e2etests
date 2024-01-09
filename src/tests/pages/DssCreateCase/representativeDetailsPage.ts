import { expect, Page } from "@playwright/test";
import axeTest from "../../helpers/accessibilityTestHelper";
import representativeDetailsContent from "../../fixtures/content/DSSCreateCase/RepresentativeDetails_content.ts";

type RepresentativeDetailsPage = {
  fields: {
    fullName: string;
    representativeOrgName: string;
    representativeContactNumber: string;
    representativeEmailAddress: string;
  }
  continueButton: string;
  backButton: string;
  checkPageLoads(page: Page, accessibilityTest: boolean): Promise<void>;
  fillInFields(page: Page): Promise<void>;
  triggerErrorMessages(page: Page): Promise<void>;
  pressBackButton(page: Page): Promise<void>;
}

const representativeDetailsPage: RepresentativeDetailsPage = {
  fields: {
    fullName: "#representativeFullName",
    representativeOrgName: "#representativeOrganisationName",
    representativeContactNumber: "#representativeContactNumber",
    representativeEmailAddress: "#representativeEmailAddress",
  },

  continueButton: "#main-form-submit",
  backButton: ".govuk-back-link",

  async checkPageLoads(page: Page, accessibilityTest: boolean): Promise<void> {
    await expect(page.locator(".govuk-heading-l")).toHaveText(
      representativeDetailsContent.pageTitle,
    );
    await expect(page.locator(".govuk-body").nth(4)).toHaveText(
      representativeDetailsContent.textOnPage1,
    );
    await expect(page.locator(".govuk-body").nth(5)).toHaveText(
      representativeDetailsContent.textOnPage2,
    );
    await expect(page.locator(".govuk-label").nth(0)).toHaveText(
      representativeDetailsContent.subHeading1,
    );
    await expect(page.locator(".govuk-label").nth(1)).toHaveText(
      representativeDetailsContent.subHeading2,
    );
    await expect(page.locator(".govuk-label").nth(2)).toHaveText(
      representativeDetailsContent.subHeading3,
    );
    await expect(page.locator(".govuk-label").nth(3)).toHaveText(
      representativeDetailsContent.subHeading4,
    );
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async fillInFields(page: Page): Promise<void> {
    await page.fill(this.fields.fullName, representativeDetailsContent.fullName);
    await page.fill(
      this.fields.representativeOrgName,
      representativeDetailsContent.Organisation,
    );
    await page.fill(
      this.fields.representativeContactNumber,
      representativeDetailsContent.contactNumber,
    );
    await page.fill(
      this.fields.representativeEmailAddress,
      representativeDetailsContent.emailAddress,
    );
    await page.click(this.continueButton);
  },

  async triggerErrorMessages(page: Page): Promise<void> {
    await page.click(this.continueButton);
    await expect(page.locator(".govuk-error-summary__title")).toHaveText(
      representativeDetailsContent.errorBanner,
    );
    await expect(page.locator("[href='#representativeFullName']")).toHaveText(
      representativeDetailsContent.fullNameError,
    );
    await expect(
      page.locator("[href='#representativeOrganisationName']"),
    ).toHaveText(representativeDetailsContent.organisationNameError);
    await expect(
      page.locator("[href='#representativeContactNumber']"),
    ).toHaveText(representativeDetailsContent.validContactNumberError);
    await expect(
      page.locator("[href='#representativeEmailAddress']"),
    ).toHaveText(representativeDetailsContent.validEmailError);
    await expect(page.locator("#representativeFullName-error")).toContainText(
      representativeDetailsContent.fullNameError,
    );
    await expect(
      page.locator("#representativeOrganisationName-error"),
    ).toContainText(representativeDetailsContent.organisationNameError);
    await expect(
      page.locator("#representativeContactNumber-error"),
    ).toContainText(representativeDetailsContent.validContactNumberError);
    await expect(
      page.locator("#representativeEmailAddress-error"),
    ).toContainText(representativeDetailsContent.validEmailError);
    await page.fill(
      this.fields.representativeEmailAddress,
      representativeDetailsContent.partEmailEntry,
    );
    await page.click(this.continueButton);
    await expect(
      page.locator("[href='#representativeEmailAddress']"),
    ).toHaveText(representativeDetailsContent.partEmailError);
    await expect(
      page.locator("#representativeEmailAddress-error"),
    ).toContainText(representativeDetailsContent.partEmailError);
    await page.fill(this.fields.representativeEmailAddress, "");
  },

  async pressBackButton(page: Page): Promise<void> {
    await page.click(this.backButton);
  },
};

export default representativeDetailsPage;
