import { expect, Page } from "@playwright/test";
import axeTest from "../../helpers/accessibilityTestHelper";
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
  checkPageLoads(page: Page, welsh: boolean, accessibilityTest: boolean): Promise<void>;
  fillInFields(page: Page): Promise<void>;
  triggerErrorMessages(page: Page, welsh: boolean): Promise<void>;
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

  async checkPageLoads(page: Page, welsh: boolean, accessibilityTest: boolean) {
    switch (welsh) {
      case true:
        await page.locator(".govuk-link.language").click();
        await expect(page.locator(".govuk-link.language")).toHaveText("English");
        await expect(page.locator(".govuk-heading-l")).toHaveText(
          subjectDetailsContent.welshPageTitle,
        );
        await expect(page.locator(".govuk-hint").nth(0)).toHaveText(
          subjectDetailsContent.welshHintText1,
        );
        await expect(page.locator(".govuk-hint").nth(1)).toHaveText(
          subjectDetailsContent.welshHintText2,
        );
        await expect(page.locator(".govuk-label").nth(0)).toHaveText(
          subjectDetailsContent.welshSubHeading1,
        );
        await expect(page.locator(".govuk-fieldset__legend")).toHaveText(
          subjectDetailsContent.welshSubHeading2,
        );
        await expect(page.locator("#subjectDateOfBirth-hint")).toHaveText(
          subjectDetailsContent.welshHintText2,
        );
        await expect(page.locator(".govuk-label").nth(1)).toHaveText(
          subjectDetailsContent.welshTextOnPage1,
        );
        await expect(page.locator(".govuk-label").nth(2)).toHaveText(
          subjectDetailsContent.welshTextOnPage2,
        );
        await expect(page.locator(".govuk-label").nth(3)).toHaveText(
          subjectDetailsContent.welshTextOnPage3,
        );
        break;
      case false:
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
        break;
    }
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async fillInFields(page: Page) {
    await page.click(this.rejectCookiesButton);
    await page.fill(this.fields.fullName, subjectDetailsContent.name);
    await page.fill(this.fields.dayOfBirth, subjectDetailsContent.dayOfBirth);
    await page.fill(
      this.fields.monthOfBirth,
      subjectDetailsContent.monthOfBirth,
    );
    await page.fill(this.fields.yearOfBirth, subjectDetailsContent.yearOfBirth);
    await page.click(this.continueButton);
  },

  async triggerErrorMessages(page: Page, welsh: boolean) {
    switch (welsh) {
      case true:
        await expect(page.locator(".govuk-link.language")).toHaveText("English");
        await page.click(this.continueButton);
        await expect(page.locator(".govuk-error-summary__title")).toHaveText(
          subjectDetailsContent.welshErrorBanner,
        );
        await expect(page.locator("[href='#subjectFullName']")).toHaveText(
          subjectDetailsContent.welshFullNameError,
        );
        await expect(page.locator("[href='#subjectDateOfBirth']")).toHaveText(
          subjectDetailsContent.welshDateOfBirthError,
        );
        await expect(page.locator("#subjectFullName-error")).toContainText(
          subjectDetailsContent.welshFullNameError,
        );
        await expect(page.locator("#subjectDateOfBirth-error")).toContainText(
          subjectDetailsContent.welshDateOfBirthError,
        );
        break;
      case false:
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
        break;
    }
  },
};

export default subjectDetailsPage;
