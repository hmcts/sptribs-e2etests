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
  continueButton: "#main-form-submit",
  rejectCookiesButton: ".cookie-banner-reject-button",

  async checkPageLoads(page: Page, cy: boolean, accessibilityTest: boolean) {
    switch (cy) {
      case true:
        await page.locator(".govuk-link.language").click();
        await Promise.all([
          expect(page.locator(".govuk-link.language")).toHaveText("English"),
          expect(page.locator(".govuk-heading-l")).toHaveText(
            subjectDetailsContent.pageTitleCy,
          ),
          expect(page.locator(".govuk-label").nth(0)).toHaveText(
            subjectDetailsContent.subHeadingCy1,
          ),
          expect(page.locator(".govuk-fieldset__legend")).toHaveText(
            subjectDetailsContent.subHeadingCy2,
          ),
          expect(page.locator("#subjectDateOfBirth-hint")).toHaveText(
            subjectDetailsContent.hintTextCy2,
          ),
          ...Array.from({ length: 2 }, (_, index) => {
            const textOnPage = (subjectDetailsContent as any)[
              `hintTextCy${index + 1}`
            ];
            return expect(page.locator(".govuk-hint").nth(index)).toHaveText(
              textOnPage,
            );
          }),
          ...Array.from({ length: 3 }, (_, index) => {
            const textOnPage = (subjectDetailsContent as any)[
              `textOnPageCy${index + 1}`
            ];
            return expect(
              page.locator(".govuk-label").nth(index + 1),
            ).toHaveText(textOnPage);
          }),
        ]);
        break;
      default:
        await Promise.all([
          expect(page.locator(".govuk-heading-l")).toHaveText(
            subjectDetailsContent.pageTitle,
          ),
          expect(page.locator(".govuk-label").nth(0)).toHaveText(
            subjectDetailsContent.subHeading1,
          ),
          expect(page.locator(".govuk-fieldset__legend")).toHaveText(
            subjectDetailsContent.subHeading2,
          ),
          expect(page.locator("#subjectDateOfBirth-hint")).toHaveText(
            subjectDetailsContent.hintText2,
          ),
          ...Array.from({ length: 2 }, (_, index) => {
            const textOnPage = (subjectDetailsContent as any)[
              `hintText${index + 1}`
            ];
            return expect(page.locator(".govuk-hint").nth(index)).toHaveText(
              textOnPage,
            );
          }),
          ...Array.from({ length: 3 }, (_, index) => {
            const textOnPage = (subjectDetailsContent as any)[
              `textOnPage${index + 1}`
            ];
            return expect(
              page.locator(".govuk-label").nth(index + 1),
            ).toHaveText(textOnPage);
          }),
        ]);
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

  async triggerErrorMessages(page: Page, cy: boolean) {
    const currentDate = new Date();
    switch (cy) {
      case true:
        await expect(page.locator(".govuk-link.language")).toHaveText(
          "English",
        );
        await page.click(this.continueButton);
        await Promise.all([
          expect(page.locator(".govuk-error-summary__title")).toHaveText(
            subjectDetailsContent.errorBannerCy,
          ),
          expect(page.locator("[href='#subjectFullName']")).toHaveText(
            subjectDetailsContent.fullNameErrorCy,
          ),
          expect(page.locator("[href='#subjectDateOfBirth']")).toHaveText(
            subjectDetailsContent.dateOfBirthErrorCy,
          ),
          expect(page.locator("#subjectFullName-error")).toContainText(
            subjectDetailsContent.fullNameErrorCy,
          ),
          expect(page.locator("#subjectDateOfBirth-error")).toContainText(
            subjectDetailsContent.dateOfBirthErrorCy,
          ),
        ]);
        break;
      default:
        await page.click(this.continueButton);
        await Promise.all([
          expect(page.locator(".govuk-error-summary__title")).toHaveText(
            subjectDetailsContent.errorBanner,
          ),
          expect(page.locator("[href='#subjectFullName']")).toHaveText(
            subjectDetailsContent.fullNameError,
          ),
          expect(page.locator("[href='#subjectDateOfBirth']")).toHaveText(
            subjectDetailsContent.dateOfBirthError,
          ),
          expect(page.locator("#subjectFullName-error")).toContainText(
            subjectDetailsContent.fullNameError,
          ),
          expect(page.locator("#subjectDateOfBirth-error")).toContainText(
            subjectDetailsContent.dateOfBirthError,
          ),
        ]);
        await page.fill(this.fields.fullName, "<a>https://www.google.com</a>");
        await page.click(this.continueButton);
        await Promise.all([
          expect(page.locator(".govuk-error-summary__title")).toHaveText(
            subjectDetailsContent.errorBanner,
          ),
          expect(page.locator("[href='#subjectFullName']")).toHaveText(
            subjectDetailsContent.htmlError,
          ),
          expect(page.locator("#subjectFullName-error")).toContainText(
            subjectDetailsContent.htmlError,
          ),
        ]);
        await page.locator(this.fields.fullName).clear();
        await page.fill(this.fields.dayOfBirth, "32");
        await page.click(this.continueButton);
        await Promise.all([
          expect(page.locator(".govuk-error-summary__title")).toHaveText(
            subjectDetailsContent.errorBanner,
          ),
          expect(page.locator("[href='#subjectDateOfBirth']")).toHaveText(
            subjectDetailsContent.incompleteDOBError,
          ),
          expect(page.locator("#subjectDateOfBirth-error")).toContainText(
            subjectDetailsContent.incompleteDOBError,
          ),
        ]);
        await page.fill(this.fields.dayOfBirth, "a");
        await page.fill(this.fields.monthOfBirth, "a");
        await page.fill(this.fields.yearOfBirth, "a");
        await page.click(this.continueButton);
        await Promise.all([
          expect(page.locator(".govuk-error-summary__title")).toHaveText(
            subjectDetailsContent.errorBanner,
          ),
          expect(page.locator("[href='#subjectDateOfBirth']")).toHaveText(
            subjectDetailsContent.invalidDOBError,
          ),
          expect(page.locator("#subjectDateOfBirth-error")).toContainText(
            subjectDetailsContent.invalidDOBError,
          ),
        ]);
        await page.fill(this.fields.dayOfBirth, "1");
        await page.fill(this.fields.monthOfBirth, "1");
        await page.fill(this.fields.yearOfBirth, "1899");
        await page.click(this.continueButton);
        await Promise.all([
          expect(page.locator(".govuk-error-summary__title")).toHaveText(
            subjectDetailsContent.errorBanner,
          ),
          expect(page.locator("[href='#subjectDateOfBirth']")).toHaveText(
            subjectDetailsContent.pastDOBError,
          ),
          expect(page.locator("#subjectDateOfBirth-error")).toContainText(
            subjectDetailsContent.pastDOBError,
          ),
        ]);
        await page.fill(this.fields.dayOfBirth, `${currentDate.getDate()}`);
        await page.fill(
          this.fields.monthOfBirth,
          `${currentDate.getMonth() + 1}`,
        );
        await page.fill(
          this.fields.yearOfBirth,
          `${currentDate.getFullYear() + 1}`,
        );
        await page.click(this.continueButton);
        await Promise.all([
          expect(page.locator(".govuk-error-summary__title")).toHaveText(
            subjectDetailsContent.errorBanner,
          ),
          expect(page.locator("[href='#subjectDateOfBirth']")).toHaveText(
            subjectDetailsContent.futureDOBError,
          ),
          expect(page.locator("#subjectDateOfBirth-error")).toContainText(
            subjectDetailsContent.futureDOBError,
          ),
        ]);
        break;
    }
  },
};

export default subjectDetailsPage;
