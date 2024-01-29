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
  postCode: string;
  selectAddress: string;
  buildingAndStreet: string;
  addressLine2: string;
  addressLine3: string;
  townOrCity: string;
  countyState: string;
  country: string;
  postcodeZipcode: string;
  emailAddress: string;
  selectEmail: string;
  selectPost: string;
  checkPageLoads(page: Page, accessibilityTest: boolean): Promise<void>;
  fillInFields(page: Page, contactPreference: ContactPreference): Promise<void>;
};

const caseSubjectDetailsObjectPage: CaseSubjectDetailsObjectPage = {
  continue: '[type="submit"]',
  findAddress: ".button-30",
  fullName: "#cicCaseFullName",
  phoneNumber: "#cicCasePhoneNumber",
  day: "#cicCaseDateOfBirth-day",
  month: "#cicCaseDateOfBirth-month",
  year: "#cicCaseDateOfBirth-year",
  postCode: "#cicCaseAddress_cicCaseAddress_postcodeInput",
  selectAddress: "#cicCaseAddress_cicCaseAddress_addressList",
  buildingAndStreet: "#cicCaseAddress__detailAddressLine1",
  addressLine2: "#cicCaseAddress__detailAddressLine2",
  addressLine3: "#cicCaseAddress__detailAddressLine3",
  townOrCity: "#cicCaseAddress__detailPostTown",
  countyState: "#cicCaseAddress__detailCounty",
  country: "#cicCaseAddress__detailCountry",
  postcodeZipcode: "#cicCaseAddress__detailPostCode",
  emailAddress: "#cicCaseEmail",
  selectEmail: "#cicCaseContactPreferenceType-Email",
  selectPost: "#cicCaseContactPreferenceType-Post",

  async checkPageLoads(page: Page, accessibilityTest: boolean): Promise<void> {
    await expect(page.locator(".govuk-caption-l")).toHaveText(
      caseSubjectDetailsObject_content.pageHint,
    );
    await expect(page.locator(".govuk-heading-l")).toHaveText(
      caseSubjectDetailsObject_content.pageTitle,
    );
    await expect(page.locator(".form-label").nth(0)).toHaveText(
      caseSubjectDetailsObject_content.textOnPage1,
    );
    await expect(page.locator(".form-label").nth(1)).toHaveText(
      caseSubjectDetailsObject_content.textOnPage2,
    );
    await expect(page.locator(".form-label").nth(2)).toHaveText(
      caseSubjectDetailsObject_content.textOnPage3,
    );
    await expect(page.locator(".form-label").nth(3)).toHaveText(
      caseSubjectDetailsObject_content.textOnPage4,
    );
    await expect(page.locator(".form-label").nth(4)).toHaveText(
      caseSubjectDetailsObject_content.textOnPage5,
    );
    await expect(page.locator(".heading-h2")).toHaveText(
      caseSubjectDetailsObject_content.subTitle1,
    );
    await expect(page.locator(".form-label").nth(5)).toHaveText(
      caseSubjectDetailsObject_content.textOnPage6,
    );
    await expect(page.locator(".manual-link")).toHaveText(
      caseSubjectDetailsObject_content.linkOnPage1,
    );
    await expect(page.locator(".form-label").nth(6)).toHaveText(
      caseSubjectDetailsObject_content.textOnPage7,
    );
    await expect(page.locator(".form-label").nth(14)).toHaveText(
      caseSubjectDetailsObject_content.textOnPage8,
    );
    await expect(page.locator(".form-label").nth(15)).toHaveText(
      caseSubjectDetailsObject_content.textOnPage9,
    );
    await expect(page.locator(".form-label").nth(16)).toHaveText(
      caseSubjectDetailsObject_content.textOnPage10,
    );
    await expect(page.locator(".form-label").nth(17)).toHaveText(
      caseSubjectDetailsObject_content.textOnPage11,
    );
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
};

export default caseSubjectDetailsObjectPage;
