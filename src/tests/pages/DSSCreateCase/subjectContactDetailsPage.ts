import { expect, Page } from "@playwright/test";
import axeTest from "../../helpers/accessibilityTestHelper";
import subjectContactDetailsContent from "../../fixtures/content/DSSCreateCase/SubjectContactDetails_content";

type SubjectContactDetailsPage = {
  fields: {
    email: string;
    mobileNumber: string;
  };
  contactAgreeBox: string;
  continueButton: string;
  backButton: string;
  checkPageLoads(
    page: Page,
    welsh: boolean,
    accessibilityTest: boolean,
  ): Promise<void>;
  fillInFields(page: Page): Promise<void>;
  triggerErrorMessages(page: Page, welsh: boolean): Promise<void>;
  pressBackButton(page: Page): Promise<void>;
};

const subjectContactDetailsPage: SubjectContactDetailsPage = {
  fields: {
    email: "#subjectEmailAddress",
    mobileNumber: "#subjectContactNumber",
  },

  contactAgreeBox: "#subjectAgreeContact",
  continueButton: "#main-form-submit",
  backButton: ".govuk-back-link",

  async checkPageLoads(page: Page, welsh: boolean, accessibilityTest: boolean) {
    switch (welsh) {
      case true:
        await expect(page.locator(".govuk-link.language")).toHaveText(
          "English",
        );
        await expect(page.locator(".govuk-heading-l")).toHaveText(
          subjectContactDetailsContent.welshPageTitle,
        );
        await expect(
          page.locator("main[id='main-content'] p[class='govuk-body']"),
        ).toHaveText(subjectContactDetailsContent.welshTextOnPage1);
        await expect(page.locator(".govuk-label").nth(0)).toHaveText(
          subjectContactDetailsContent.welshSubHeading1,
        );
        await expect(page.locator(".govuk-label").nth(1)).toHaveText(
          subjectContactDetailsContent.welshSubHeading2,
        );
        await expect(
          page.locator("label[for='subjectAgreeContact']"),
        ).toHaveText(subjectContactDetailsContent.welshTextOnPage2);
        break;
      case false:
        await expect(page.locator(".govuk-heading-l")).toHaveText(
          subjectContactDetailsContent.pageTitle,
        );
        await expect(
          page.locator("main[id='main-content'] p[class='govuk-body']"),
        ).toHaveText(subjectContactDetailsContent.textOnPage1);
        await expect(page.locator(".govuk-label").nth(0)).toHaveText(
          subjectContactDetailsContent.subHeading1,
        );
        await expect(page.locator(".govuk-label").nth(1)).toHaveText(
          subjectContactDetailsContent.subHeading2,
        );
        await expect(
          page.locator("label[for='subjectAgreeContact']"),
        ).toHaveText(subjectContactDetailsContent.textOnPage2);
        break;
    }
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async fillInFields(page: Page) {
    await page.fill(
      this.fields.email,
      subjectContactDetailsContent.emailAddress,
    );
    await page.fill(
      this.fields.mobileNumber,
      subjectContactDetailsContent.contactNumber,
    );
    await page.click(this.contactAgreeBox);
    await page.click(this.continueButton);
  },

  async triggerErrorMessages(page: Page, welsh: boolean) {
    switch (welsh) {
      case true:
        await page.click(this.continueButton);
        await expect(page.locator(".govuk-error-summary__title")).toHaveText(
          subjectContactDetailsContent.welshErrorBanner,
        );
        await expect(page.locator("[href='#subjectEmailAddress']")).toHaveText(
          subjectContactDetailsContent.welshValidEmailError,
        );
        await expect(page.locator("[href='#subjectContactNumber']")).toHaveText(
          subjectContactDetailsContent.welshValidContactNumberError,
        );
        await expect(page.locator("[href='#subjectAgreeContact']")).toHaveText(
          subjectContactDetailsContent.welshAgreeError,
        );
        await expect(page.locator("#subjectEmailAddress-error")).toContainText(
          subjectContactDetailsContent.welshValidEmailError,
        );
        await expect(page.locator("#subjectContactNumber-error")).toContainText(
          subjectContactDetailsContent.welshValidContactNumberError,
        );
        await expect(page.locator("#subjectAgreeContact-error")).toContainText(
          subjectContactDetailsContent.welshAgreeError,
        );
        await page.fill(
          this.fields.email,
          subjectContactDetailsContent.partEmailEntry,
        );
        await page.click(this.continueButton);
        await expect(page.locator("[href='#subjectEmailAddress']")).toHaveText(
          subjectContactDetailsContent.welshPartEmailError,
        );
        await expect(page.locator("#subjectEmailAddress-error")).toContainText(
          subjectContactDetailsContent.welshPartEmailError,
        );
        await page.fill(this.fields.email, "");
        break;
      case false:
        await page.click(this.continueButton);
        await expect(page.locator(".govuk-error-summary__title")).toHaveText(
          subjectContactDetailsContent.errorBanner,
        );
        await expect(page.locator("[href='#subjectEmailAddress']")).toHaveText(
          subjectContactDetailsContent.validEmailError,
        );
        await expect(page.locator("[href='#subjectContactNumber']")).toHaveText(
          subjectContactDetailsContent.validContactNumberError,
        );
        await expect(page.locator("[href='#subjectAgreeContact']")).toHaveText(
          subjectContactDetailsContent.agreeError,
        );
        await expect(page.locator("#subjectEmailAddress-error")).toContainText(
          subjectContactDetailsContent.validEmailError,
        );
        await expect(page.locator("#subjectContactNumber-error")).toContainText(
          subjectContactDetailsContent.validContactNumberError,
        );
        await expect(page.locator("#subjectAgreeContact-error")).toContainText(
          subjectContactDetailsContent.agreeError,
        );
        await page.fill(
          this.fields.email,
          subjectContactDetailsContent.partEmailEntry,
        );
        await page.click(this.continueButton);
        await expect(page.locator("[href='#subjectEmailAddress']")).toHaveText(
          subjectContactDetailsContent.partEmailError,
        );
        await expect(page.locator("#subjectEmailAddress-error")).toContainText(
          subjectContactDetailsContent.partEmailError,
        );
        await page.fill(this.fields.email, "");
        break;
    }
  },

  async pressBackButton(page) {
    await page.click(this.backButton);
  },
};

export default subjectContactDetailsPage;
