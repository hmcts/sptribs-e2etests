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
  checkPageLoads(page: Page, accessibilityTest: boolean): Promise<void>;
  fillInFields(page: Page): Promise<void>;
  triggerErrorMessages(page: Page): Promise<void>;
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

  async checkPageLoads(page: Page, accessibilityTest: boolean) {
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
    await expect(page.locator("label[for='subjectAgreeContact']")).toHaveText(
      subjectContactDetailsContent.textOnPage2,
    );
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

  async triggerErrorMessages(page: Page) {
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
  },

  async pressBackButton(page) {
    await page.click(this.backButton);
  },
};

export default subjectContactDetailsPage;
