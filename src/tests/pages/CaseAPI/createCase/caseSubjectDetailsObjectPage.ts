import { expect, Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import commonHelpers, {
  ContactPreference,
} from "../../../helpers/commonHelpers.ts";
import caseSubjectDetailsObject_content from "../../../fixtures/content/CaseAPI/createCase/caseSubjectDetailsObject_content.ts";

type CaseSubjectDetailsObjectPage = {
  continue: string;
  findAddress: string;
  fullName: string;
  phoneNumber: string;
  day: string;
  month: string;
  year: string;
  emailAddress: string;
  selectEmail: string;
  selectPost: string;
  checkPageLoads(page: Page, accessibilityTest: boolean): Promise<void>;
  fillInFields(page: Page, contactPreference: ContactPreference): Promise<void>;
  triggerErrorMessages(page: Page): Promise<void>;
};

const caseSubjectDetailsObjectPage: CaseSubjectDetailsObjectPage = {
  continue: '[type="submit"]',
  findAddress: ".button-30",
  fullName: "#cicCaseFullName",
  phoneNumber: "#cicCasePhoneNumber",
  day: "#cicCaseDateOfBirth-day",
  month: "#cicCaseDateOfBirth-month",
  year: "#cicCaseDateOfBirth-year",
  emailAddress: "#cicCaseEmail",
  selectEmail: "#cicCaseContactPreferenceType-Email",
  selectPost: "#cicCaseContactPreferenceType-Post",

  async checkPageLoads(page: Page, accessibilityTest: boolean): Promise<void> {
    await Promise.all([
      expect(page.locator(".govuk-caption-l")).toHaveText(
        caseSubjectDetailsObject_content.pageHint,
      ),
      expect(page.locator(".govuk-heading-l")).toHaveText(
        caseSubjectDetailsObject_content.pageTitle,
      ),
      ...Array.from({ length: 7 }, (_, index) => {
        const textOnPage = (caseSubjectDetailsObject_content as any)[
          `textOnPage${index + 1}`
        ];
        return expect(page.locator(".form-label").nth(index)).toHaveText(
          textOnPage,
        );
      }),
      expect(page.locator(".heading-h2")).toHaveText(
        caseSubjectDetailsObject_content.subTitle1,
      ),
      expect(page.locator(".manual-link")).toHaveText(
        caseSubjectDetailsObject_content.linkOnPage1,
      ),
      ...Array.from({ length: 4 }, (_, index) => {
        const textOnPage = (caseSubjectDetailsObject_content as any)[
          `textOnPage${index + 8}`
        ];
        return expect(page.locator(".form-label").nth(index + 14)).toHaveText(
          textOnPage,
        );
      }),
    ]);
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async fillInFields(
    page: Page,
    contactPreference: ContactPreference,
  ): Promise<void> {
    await page.fill(this.fullName, caseSubjectDetailsObject_content.name);
    await page.fill(
      this.phoneNumber,
      caseSubjectDetailsObject_content.contactNumber,
    );
    await page.fill(this.day, caseSubjectDetailsObject_content.dayOfBirth);
    await page.fill(this.month, caseSubjectDetailsObject_content.monthOfBirth);
    await page.fill(this.year, caseSubjectDetailsObject_content.yearOfBirth);
    await commonHelpers.postcodeHandler(page, "Subject");
    if (contactPreference === "Email") {
      await page.click(this.selectEmail);
      await page.fill(
        this.emailAddress,
        caseSubjectDetailsObject_content.emailAddress,
      );
    } else if (contactPreference === "Post") {
      await page.click(this.selectPost);
    }
    await page.click(this.continue);
  },

  async triggerErrorMessages(page: Page): Promise<void> {
    await page.click(this.continue);
    await Promise.all([
      expect(page.locator("#error-summary-title")).toHaveText(
        caseSubjectDetailsObject_content.errorBanner,
      ),
      expect(page.locator(".validation-error").nth(0)).toHaveText(
        caseSubjectDetailsObject_content.nameError,
      ),
      expect(page.locator(".error-message").nth(0)).toHaveText(
        caseSubjectDetailsObject_content.nameError,
      ),
      expect(page.locator(".validation-error").nth(1)).toHaveText(
        caseSubjectDetailsObject_content.dobError,
      ),
      expect(page.locator(".error-message").nth(1)).toHaveText(
        caseSubjectDetailsObject_content.dobError,
      ),
      expect(page.locator(".validation-error").nth(2)).toHaveText(
        caseSubjectDetailsObject_content.addressError,
      ),
      expect(page.locator(".error-message").nth(2)).toHaveText(
        caseSubjectDetailsObject_content.postcodeError,
      ),
      expect(page.locator(".validation-error").nth(3)).toHaveText(
        caseSubjectDetailsObject_content.contactError,
      ),
      expect(page.locator(".error-message").nth(3)).toHaveText(
        caseSubjectDetailsObject_content.streetError,
      ),
      expect(page.locator(".error-message").nth(4)).toHaveText(
        caseSubjectDetailsObject_content.contactError,
      ),
    ]);
    await page.fill(this.day, "90");
    await page.click(this.month);
    await expect(page.locator(".error-message").nth(1)).toHaveText(
      caseSubjectDetailsObject_content.invalidDOBError,
    );
    await page.locator(this.day).clear();
    await page.fill("#cicCaseAddress_cicCaseAddress_postcodeInput", "...");
    await page.click(this.findAddress);
    await expect(page.locator(".error-message").nth(2)).toHaveText(
      caseSubjectDetailsObject_content.validPostcodeError,
    );
    await page.getByLabel("Email", { exact: true }).click();
    await page.click(this.emailAddress);
    await page.locator(this.continue).dispatchEvent("click");
    await Promise.all([
      expect(page.locator(".validation-error").last()).toHaveText(
        caseSubjectDetailsObject_content.emailError,
      ),
      expect(page.locator(".error-message").last()).toHaveText(
        caseSubjectDetailsObject_content.emailError,
      ),
    ]);
  },
};

export default caseSubjectDetailsObjectPage;
