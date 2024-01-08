import { expect, Page } from "@playwright/test";
import { axeTest } from "../../helpers/accessibilityTestHelper";
import subjectDetailsContent from "../../fixtures/content/DSSCreateCase/SubjectDetails_content";

type SubjectDetailsPage = {
  fields: {
    fullName: string;
    dayOfBirth: string;
    monthOfBirth: string;
    yearOfBirth: string;
  };
  continueButton: string;
  rejectCookiesButton: string;
  checkPageLoads(page: Page, accessibilityTest: boolean): Promise<void>;
  fillInFields(page: Page): Promise<void>;
  triggerErrorMessages(page: Page): Promise<void>;
};

const subjectDetailsPage: SubjectDetailsPage = {
  fields: {
    fullName: "#subjectFullName",
    dayOfBirth: "#subjectDateOfBirth-day",
    monthOfBirth: "#subjectDateOfBirth-month",
    yearOfBirth: "#subjectDateOfBirth-year",
  },
  continueButton: "#main-form-submit",
  rejectCookiesButton: ".cookie-banner-reject-button",

  async checkPageLoads(page, accessibilityTest) {
    await expect(page.locator(".govuk-heading-l")).toHaveText(
      subjectDetailsContent.pageTitle,
    );
    await expect(page.locator(".govuk-hint").nth(0)).toHaveText(
      subjectDetailsContent.hintText1,
    );
    await expect(page.locator(".govuk-hint").nth(1)).toHaveText(
      subjectDetailsContent.hintText2,
    );
    await expect(page.locator(".govuk-label").nth(0)).toHaveText(
      subjectDetailsContent.subHeading1,
    );
    await expect(page.locator(".govuk-fieldset__legend")).toHaveText(
      subjectDetailsContent.subHeading2,
    );
    await expect(page.locator("#subjectDateOfBirth-hint")).toHaveText(
      subjectDetailsContent.hintText2,
    );
    await expect(page.locator(".govuk-label").nth(1)).toHaveText(
      subjectDetailsContent.textOnPage1,
    );
    await expect(page.locator(".govuk-label").nth(2)).toHaveText(
      subjectDetailsContent.textOnPage2,
    );
    await expect(page.locator(".govuk-label").nth(3)).toHaveText(
      subjectDetailsContent.textOnPage3,
    );
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async fillInFields(page) {
    await page.click(this.rejectCookiesButton);
    await page.fill(this.fields.fullName, subjectDetailsContent.name);
    await page.fill(this.fields.dayOfBirth, subjectDetailsContent.dayOfBirth);
    await page.fill(this.fields.monthOfBirth, subjectDetailsContent.monthOfBirth);
    await page.fill(this.fields.yearOfBirth, subjectDetailsContent.yearOfBirth);
    await page.click(this.continueButton);
  },

  async triggerErrorMessages(page) {
    await page.click(this.continueButton);
    await expect(page.locator(".govuk-error-summary__title")).toHaveText(
      subjectDetailsContent.errorBanner,
    );
    await expect(page.locator("[href='#subjectFullName']")).toHaveText(
      subjectDetailsContent.fullNameError,
    );
    await expect(page.locator("[href='#subjectDateOfBirth']")).toHaveText(
      subjectDetailsContent.dateOfBirthError,
    );
    await expect(page.locator("#subjectFullName-error")).toContainText(
      subjectDetailsContent.fullNameError,
    );
    await expect(page.locator("#subjectDateOfBirth-error")).toContainText(
      subjectDetailsContent.dateOfBirthError,
    );
  },
};

export default subjectDetailsPage;
