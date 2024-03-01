import { expect, Page } from "@playwright/test";
import axeTest from "../../helpers/accessibilityTestHelper";
import SubjectDetailsContent from "../../fixtures/content/DSSUpdateCase/SubjectDetails_content.ts";

type SubjectDetailsPage = {
  fields: {
    fullName: string;
    dayOfBirth: string;
    monthOfBirth: string;
    yearOfBirth: string;
  };
  continueButton: string;
  backButton: string;
  checkPageLoads(page: Page, accessibilityTest: boolean): Promise<void>;
  fillInFields(page: Page): Promise<void>;
  continueOn(page: Page): Promise<void>;
  triggerErrorMessages(page: Page): Promise<void>;
  pressBackButton(page: Page): Promise<void>;
};

const subjectDetailsPage: SubjectDetailsPage = {
  fields: {
    fullName: "#subjectFullName",
    dayOfBirth: "#subjectDOB-day",
    monthOfBirth: "#subjectDOB-month",
    yearOfBirth: "#subjectDOB-year",
  },
  continueButton: "#main-form-submit",
  backButton: ".govuk-back-link",

  async checkPageLoads(page: Page, accessibilityTest: boolean): Promise<void> {
    await expect(page.locator(".govuk-header__service-name")).toHaveText(
      SubjectDetailsContent.header,
    );
    await expect(page.locator(".govuk-phase-banner__text")).toContainText(SubjectDetailsContent.feedbackBanner);
    await expect(page.locator("a.govuk-link").nth(2)).toHaveText(SubjectDetailsContent.feedbackLinkText);
    await expect(page.locator('a.govuk-link').nth(2)).toHaveAttribute('href', SubjectDetailsContent.feedbackLink);
    await expect(page.locator(".govuk-heading-l")).toHaveText(
      SubjectDetailsContent.pageTitle,
    );
    await expect(page.locator(".govuk-label").nth(0)).toHaveText(
      SubjectDetailsContent.subHeading1,
    );
    await expect(page.locator(".govuk-fieldset__legend")).toHaveText(
      SubjectDetailsContent.subHeading2,
    );
    await expect(page.locator(".govuk-label").nth(1)).toHaveText(
      SubjectDetailsContent.textOnPage1,
    );
    await expect(page.locator(".govuk-label").nth(2)).toHaveText(
      SubjectDetailsContent.textOnPage2,
    );
    await expect(page.locator(".govuk-label").nth(3)).toHaveText(
      SubjectDetailsContent.textOnPage3,
    );
    await expect(page.locator(this.continueButton)).toHaveText("Continue");
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async fillInFields(page: Page): Promise<void> {
    await page.fill(this.fields.fullName, SubjectDetailsContent.name);
    await page.fill(this.fields.dayOfBirth, SubjectDetailsContent.dayOfBirth);
    await page.fill(
      this.fields.monthOfBirth,
      SubjectDetailsContent.monthOfBirth,
    );
    await page.fill(this.fields.yearOfBirth, SubjectDetailsContent.yearOfBirth);
  },

  async triggerErrorMessages(page: Page): Promise<void> {
    await page.click(this.continueButton);
    await expect(page.locator(".govuk-error-summary__title")).toHaveText(
      SubjectDetailsContent.errorBanner,
    );
    await expect(page.locator("#subjectFullName-error")).toContainText(
      SubjectDetailsContent.fullNameError,
    );
    await expect(page.locator("#subjectDOB-error")).toContainText(
      SubjectDetailsContent.dateOfBirthError,
    );
    await page.fill(this.fields.fullName, "!@£$%^&*()");
    await page.fill(this.fields.dayOfBirth, "90");
    await page.click(this.continueButton);
    await expect(page.locator("#subjectFullName-error")).toContainText(
      SubjectDetailsContent.validFullNameError,
    );
    await expect(page.locator("#subjectDOB-error")).toContainText(
      SubjectDetailsContent.validDateOfBirthError,
    );
  },

  async continueOn(page: Page): Promise<void> {
    await page.click(this.continueButton);
  },

  async pressBackButton(page: Page): Promise<void> {
    await page.click(this.backButton);
  },
};

export default subjectDetailsPage;
