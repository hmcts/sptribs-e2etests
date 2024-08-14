import { Page } from "@playwright/test";
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
          commonHelpers.checkVisibleAndPresent(
            page.locator(`.govuk-link.language:text-is("English")`),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-heading-l:text-is("${subjectDetailsContent.pageTitleCy}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-label:text-is("${subjectDetailsContent.subHeadingCy1}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-fieldset__legend:text-is("${subjectDetailsContent.subHeadingCy2}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `#subjectDateOfBirth-hint:text-is("${subjectDetailsContent.hintTextCy2}")`,
            ),
            1,
          ),
          ...Array.from({ length: 2 }, (_, index) => {
            const textOnPage = (subjectDetailsContent as any)[
              `hintTextCy${index + 1}`
            ];
            return commonHelpers.checkVisibleAndPresent(
              page.locator(`.govuk-hint:text-is("${textOnPage}")`),
              1,
            );
          }),
          ...Array.from({ length: 3 }, (_, index) => {
            const textOnPage = (subjectDetailsContent as any)[
              `textOnPageCy${index + 1}`
            ];
            return commonHelpers.checkVisibleAndPresent(
              page.locator(`.govuk-label:text-is("${textOnPage}")`),
              1,
            );
          }),
        ]);
        break;
      default:
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-heading-l:text-is("${subjectDetailsContent.pageTitle}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-label:text-is("${subjectDetailsContent.subHeading1}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-fieldset__legend:text-is("${subjectDetailsContent.subHeading2}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `#subjectDateOfBirth-hint:text-is("${subjectDetailsContent.hintText2}")`,
            ),
            1,
          ),
          ...Array.from({ length: 2 }, (_, index) => {
            const textOnPage = (subjectDetailsContent as any)[
              `hintText${index + 1}`
            ];
            return commonHelpers.checkVisibleAndPresent(
              page.locator(`.govuk-hint:text-is("${textOnPage}")`),
              1,
            );
          }),
          ...Array.from({ length: 3 }, (_, index) => {
            const textOnPage = (subjectDetailsContent as any)[
              `textOnPage${index + 1}`
            ];
            return commonHelpers.checkVisibleAndPresent(
              page.locator(`.govuk-label:text-is("${textOnPage}")`),
              1,
            );
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
        await commonHelpers.checkVisibleAndPresent(
          page.locator(`.govuk-link.language:text-is("English")`),
          1,
        );
        await page.click(this.continueButton);
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-error-summary__title:text-is("${subjectDetailsContent.errorBannerCy}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `[href='#subjectFullName']:text-is("${subjectDetailsContent.fullNameErrorCy}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `[href='#subjectDateOfBirth']:text-is("${subjectDetailsContent.dateOfBirthErrorCy}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `#subjectFullName-error:text-is("${subjectDetailsContent.fullNameErrorCy}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `#subjectDateOfBirth-error:text-is("${subjectDetailsContent.dateOfBirthErrorCy}")`,
            ),
            1,
          ),
        ]);
        await page.fill(this.fields.fullName, "<a>https://www.google.com</a>");
        await page.click(this.continueButton);
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-error-summary__title:text-is("${subjectDetailsContent.errorBannerCy}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `[href='#subjectFullName']:text-is("${subjectDetailsContent.htmlErrorCy}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `#subjectFullName-error:text-is("${subjectDetailsContent.htmlErrorCy}")`,
            ),
            1,
          ),
        ]);
        await page.locator(this.fields.fullName).clear();
        await page.fill(this.fields.dayOfBirth, "32");
        await page.click(this.continueButton);
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-error-summary__title:text-is("${subjectDetailsContent.errorBannerCy}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `[href='#subjectDateOfBirth']:text-is("${subjectDetailsContent.incompleteDOBErrorCy}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `#subjectDateOfBirth-error:text-is("${subjectDetailsContent.incompleteDOBErrorCy}")`,
            ),
            1,
          ),
        ]);
        await page.fill(this.fields.dayOfBirth, "a");
        await page.fill(this.fields.monthOfBirth, "a");
        await page.fill(this.fields.yearOfBirth, "a");
        await page.click(this.continueButton);
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-error-summary__title:text-is("${subjectDetailsContent.errorBannerCy}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `[href='#subjectDateOfBirth']:text-is("${subjectDetailsContent.invalidDOBErrorCy}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `#subjectDateOfBirth-error:text-is("${subjectDetailsContent.invalidDOBErrorCy}")`,
            ),
            1,
          ),
        ]);
        await page.fill(this.fields.dayOfBirth, "1");
        await page.fill(this.fields.monthOfBirth, "1");
        await page.fill(this.fields.yearOfBirth, "1899");
        await page.click(this.continueButton);
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-error-summary__title:text-is("${subjectDetailsContent.errorBannerCy}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `[href='#subjectDateOfBirth']:text-is("${subjectDetailsContent.pastDOBErrorCy}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `#subjectDateOfBirth-error:text-is("${subjectDetailsContent.pastDOBErrorCy}")`,
            ),
            1,
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
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-error-summary__title:text-is("${subjectDetailsContent.errorBannerCy}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `[href='#subjectDateOfBirth']:text-is("${subjectDetailsContent.futureDOBErrorCy}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `#subjectDateOfBirth-error:text-is("${subjectDetailsContent.futureDOBErrorCy}")`,
            ),
            1,
          ),
        ]);
        break;
      default:
        await page.click(this.continueButton);
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-error-summary__title:text-is("${subjectDetailsContent.errorBanner}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `[href='#subjectFullName']:text-is("${subjectDetailsContent.fullNameError}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `[href='#subjectDateOfBirth']:text-is("${subjectDetailsContent.dateOfBirthError}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `#subjectFullName-error:text-is("${subjectDetailsContent.fullNameError}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `#subjectDateOfBirth-error:text-is("${subjectDetailsContent.dateOfBirthError}")`,
            ),
            1,
          ),
        ]);
        await page.fill(this.fields.fullName, "<a>https://www.google.com</a>");
        await page.click(this.continueButton);
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-error-summary__title:text-is("${subjectDetailsContent.errorBanner}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `[href='#subjectFullName']:text-is("${subjectDetailsContent.htmlError}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `#subjectFullName-error:text-is("${subjectDetailsContent.htmlError}")`,
            ),
            1,
          ),
        ]);
        await page.locator(this.fields.fullName).clear();
        await page.fill(this.fields.dayOfBirth, "32");
        await page.click(this.continueButton);
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-error-summary__title:text-is("${subjectDetailsContent.errorBanner}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `[href='#subjectDateOfBirth']:text-is("${subjectDetailsContent.incompleteDOBError}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `#subjectDateOfBirth-error:text-is("${subjectDetailsContent.incompleteDOBError}")`,
            ),
            1,
          ),
        ]);
        await page.fill(this.fields.dayOfBirth, "a");
        await page.fill(this.fields.monthOfBirth, "a");
        await page.fill(this.fields.yearOfBirth, "a");
        await page.click(this.continueButton);
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-error-summary__title:text-is("${subjectDetailsContent.errorBanner}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `[href='#subjectDateOfBirth']:text-is("${subjectDetailsContent.invalidDOBError}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `#subjectDateOfBirth-error:text-is("${subjectDetailsContent.invalidDOBError}")`,
            ),
            1,
          ),
        ]);
        await page.fill(this.fields.dayOfBirth, "1");
        await page.fill(this.fields.monthOfBirth, "1");
        await page.fill(this.fields.yearOfBirth, "1899");
        await page.click(this.continueButton);
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-error-summary__title:text-is("${subjectDetailsContent.errorBanner}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `[href='#subjectDateOfBirth']:text-is("${subjectDetailsContent.pastDOBError}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `#subjectDateOfBirth-error:text-is("${subjectDetailsContent.pastDOBError}")`,
            ),
            1,
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
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-error-summary__title:text-is("${subjectDetailsContent.errorBanner}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `[href='#subjectDateOfBirth']:text-is("${subjectDetailsContent.futureDOBError}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `#subjectDateOfBirth-error:text-is("${subjectDetailsContent.futureDOBError}")`,
            ),
            1,
          ),
        ]);
        break;
    }
  },
};

export default subjectDetailsPage;
