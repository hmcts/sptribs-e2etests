import { expect, Page } from "@playwright/test";
import axeTest from "../../helpers/accessibilityTestHelper";
import subjectDetailsContent from "../../fixtures/content/DSSCreateCase/SubjectDetails_content";
import commonHelpers from "../../helpers/commonHelpers.ts";

type SubjectDetailsPage = {
  fields: {
    fullName: string;
    dayOfBirth: string;
    monthOfBirth: string;
    yearOfBirth: string;
  };
  rejectCookiesButton: string;
  checkPageLoads(
    page: Page,
    cy: boolean,
    accessibilityTest: boolean,
  ): Promise<void>;
  fillInFields(page: Page): Promise<void>;
  triggerErrorMessages(page: Page, cy: boolean): Promise<void>;
};

const subjectDetailsPage: SubjectDetailsPage = {
  fields: {
    fullName: "#subjectFullName",
    dayOfBirth: "#subjectDateOfBirth-day",
    monthOfBirth: "#subjectDateOfBirth-month",
    yearOfBirth: "#subjectDateOfBirth-year",
  },
  rejectCookiesButton: "Reject analytics cookies",

  async checkPageLoads(page: Page, cy: boolean, accessibilityTest: boolean) {
    switch (cy) {
      case true:
        await page.locator(".govuk-link.language").click();
        await expect(page.locator(".govuk-link.language")).toHaveText(
          "English",
        );
        await expect(page.locator(".govuk-heading-l")).toHaveText(
          subjectDetailsContent.pageTitleCy,
        );
        await expect(page.locator(".govuk-hint").nth(0)).toHaveText(
          subjectDetailsContent.hintTextCy1,
        );
        await expect(page.locator(".govuk-hint").nth(1)).toHaveText(
          subjectDetailsContent.hintTextCy2,
        );
        await expect(page.locator(".govuk-label").nth(0)).toHaveText(
          subjectDetailsContent.subHeadingCy1,
        );
        await expect(page.locator(".govuk-fieldset__legend")).toHaveText(
          subjectDetailsContent.subHeadingCy2,
        );
        await expect(page.locator("#subjectDateOfBirth-hint")).toHaveText(
          subjectDetailsContent.hintTextCy2,
        );
        await expect(page.locator(".govuk-label").nth(1)).toHaveText(
          subjectDetailsContent.textOnPageCy1,
        );
        await expect(page.locator(".govuk-label").nth(2)).toHaveText(
          subjectDetailsContent.textOnPageCy2,
        );
        await expect(page.locator(".govuk-label").nth(3)).toHaveText(
          subjectDetailsContent.textOnPageCy3,
        );
        break;
      default:
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
    await page.getByRole("button", {name: this.rejectCookiesButton}).click();
    await page.fill(this.fields.fullName, subjectDetailsContent.name);
    await page.fill(this.fields.dayOfBirth, subjectDetailsContent.dayOfBirth);
    await page.fill(
      this.fields.monthOfBirth,
      subjectDetailsContent.monthOfBirth,
    );
    await page.fill(this.fields.yearOfBirth, subjectDetailsContent.yearOfBirth);
    await commonHelpers.clickContinueButton(page);
  },

  async triggerErrorMessages(page: Page, cy: boolean) {
    switch (cy) {
      case true:
        await expect(page.locator(".govuk-link.language")).toHaveText(
          "English",
        );
        await commonHelpers.clickContinueButton(page);
        await expect(page.locator(".govuk-error-summary__title")).toHaveText(
          subjectDetailsContent.errorBannerCy,
        );
        await expect(page.locator("[href='#subjectFullName']")).toHaveText(
          subjectDetailsContent.fullNameErrorCy,
        );
        await expect(page.locator("[href='#subjectDateOfBirth']")).toHaveText(
          subjectDetailsContent.dateOfBirthErrorCy,
        );
        await expect(page.locator("#subjectFullName-error")).toContainText(
          subjectDetailsContent.fullNameErrorCy,
        );
        await expect(page.locator("#subjectDateOfBirth-error")).toContainText(
          subjectDetailsContent.dateOfBirthErrorCy,
        );
        break;
      default:
        await commonHelpers.clickContinueButton(page);
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
