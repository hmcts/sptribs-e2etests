import subjectDetailsPage from "../fixtures/content/DSSCreateCase/SubjectDetails_content";
import { expect, Locator, Page } from "@playwright/test";
import authors_content from "../fixtures/content/authors_content.ts";
import caseDocumentsUploadObject_content from "../fixtures/content/CaseAPI/createCase/caseDocumentsUploadObject_content.ts";

interface CommonHelpers {
  readonly months: string[];
  shortMonths(index: number): Promise<string>;
  padZero(value: number): string;
  postcodeHandler(page: Page, party: string): Promise<void>;
  convertDate(tab: boolean): Promise<string>;
  getTimestamp(): Promise<string>;
  uploadFileController(
    page: Page,
    selector: string,
    docNumber: number,
    documentCategory: documentCategory,
    file: string,
  ): Promise<void>;
  checkVisibleAndPresent(locator: Locator, count: number): Promise<void>;
  clickContinueButton(page: Page): Promise<void>;
  clickBackButton(page: Page): Promise<void>;
}

const commonHelpers: CommonHelpers = {
  months: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],

  async shortMonths(index: number): Promise<string> {
    const monthFullName = this.months[index - 1];
    return monthFullName.substring(0, 3);
  },

  padZero(value: number): string {
    return value < 10 ? "0" + value : value.toString();
  },

  async postcodeHandler(page: Page, party: string): Promise<void> {
    let findAddress: string;
    let postCode: string;
    let selectAddress: string;
    let buildingAndStreet: string;
    let addressLine2: string;
    let addressLine3: string;
    let townOrCity: string;
    let countyState: string;
    let country: string;
    let postcodeZipcode: string;

    switch (party) {
      case "Subject":
        findAddress = ".button-30";
        postCode = "#cicCaseAddress_cicCaseAddress_postcodeInput";
        selectAddress = "#cicCaseAddress_cicCaseAddress_addressList";
        buildingAndStreet = "#cicCaseAddress__detailAddressLine1";
        addressLine2 = "#cicCaseAddress__detailAddressLine2";
        addressLine3 = "#cicCaseAddress__detailAddressLine3";
        townOrCity = "#cicCaseAddress__detailPostTown";
        countyState = "#cicCaseAddress__detailCounty";
        country = "#cicCaseAddress__detailCountry";
        postcodeZipcode = "#cicCaseAddress__detailPostCode";
        break;
      default:
        findAddress = ".button-30";
        postCode = `#cicCase${party}Address_cicCase${party}Address_postcodeInput`;
        selectAddress = `#cicCase${party}Address_cicCase${party}Address_addressList`;
        buildingAndStreet = `#cicCase${party}Address__detailAddressLine1`;
        addressLine2 = `#cicCase${party}Address__detailAddressLine2`;
        addressLine3 = `#cicCase${party}Address__detailAddressLine3`;
        townOrCity = `#cicCase${party}Address__detailPostTown`;
        countyState = `#cicCase${party}Address__detailCounty`;
        country = `#cicCase${party}Address__detailCountry`;
        postcodeZipcode = `#cicCase${party}Address__detailPostCode`;
        break;
    }
    await page.fill(postCode, authors_content.postCode);
    await page.click(findAddress);
    await page.selectOption(selectAddress, authors_content.selectOption);
    expect(await page.inputValue(buildingAndStreet)).toEqual(
      authors_content.buildingAndStreet,
    );
    expect(await page.inputValue(addressLine2)).toEqual("");
    expect(await page.inputValue(addressLine3)).toEqual("");
    expect(await page.inputValue(townOrCity)).toEqual(
      authors_content.townOrCity,
    );
    expect(await page.inputValue(countyState)).toEqual("");
    expect(await page.inputValue(country)).toEqual(authors_content.country);
    expect(await page.inputValue(postcodeZipcode)).toEqual(
      authors_content.postCode,
    );
  },

  async convertDate(tab: boolean): Promise<string> {
    const dayOfBirth = subjectDetailsPage.dayOfBirth;
    const monthOfBirth = subjectDetailsPage.monthOfBirth;
    const yearOfBirth = subjectDetailsPage.yearOfBirth;
    const monthName = this.months[Number(monthOfBirth) - 1];
    if (tab) {
      return `${dayOfBirth} ${monthName.slice(0, 3)} ${yearOfBirth}`;
    } else {
      return `${dayOfBirth} ${monthName} ${yearOfBirth}`;
    }
  },

  async getTimestamp(): Promise<string> {
    const currentDate = new Date();
    let hours = currentDate.getHours();
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${currentDate.getDate()} ${this.months[currentDate.getMonth()].slice(0, 3)} ${currentDate.getFullYear()}, ${hours}:${this.padZero(
      currentDate.getMinutes(),
    )}`;
  },

  async uploadFileController(
    page: Page,
    selector: string,
    docNumber: number,
    documentCategory: documentCategory,
    file: string,
  ): Promise<void> {
    if (docNumber === 0) {
      await expect(page.locator(".heading-h3")).toHaveText(
        caseDocumentsUploadObject_content.subSubTitle1,
      );
      await expect(page.locator(".form-label").nth(0)).toHaveText(
        caseDocumentsUploadObject_content.textOnPage5,
      );
      await expect(page.locator(".form-label").nth(1)).toHaveText(
        caseDocumentsUploadObject_content.textOnPage6,
      );
      await expect(page.locator(".form-label").nth(2)).toHaveText(
        caseDocumentsUploadObject_content.textOnPage7,
      );
    }

    await page.selectOption(
      `#${selector}_${docNumber.toString()}_documentCategory`,
      documentCategory,
    );
    await page.fill(
      `#${selector}_${docNumber.toString()}_documentEmailContent`,
      `Lorem ipsum text ${documentCategory}`,
    );
    let fileUploadLocator = `#${selector}_${docNumber}_documentLink`;
    await page.locator(fileUploadLocator).setInputFiles(file);
    await expect(page.locator(".error-message")).toHaveCount(0);
  },

  async checkVisibleAndPresent(locator: Locator, count: number): Promise<void> {
    await expect(locator).toHaveCount(count);
    for (let i = 0; i < count; i++) {
      await expect(locator.nth(i)).toBeVisible();
    }
  },

  async clickContinueButton(page: Page): Promise<void> {
    await page.getByRole("button", { name: "Continue" }).click();
  },

  async clickBackButton(page: Page): Promise<void> {
    await page.locator(".govuk-back-link").click();
    await page.reload();
  },
};

export default commonHelpers;

export type Category = "Assessment" | "Eligibility";

export type SubCategory =
  | "Fatal"
  | "Medical Re-opening"
  | "Minor"
  | "Paragraph 26"
  | "Sexual Abuse"
  | "Special Jurisdiction"
  | "Other";

export type ContactPreference = "Email" | "Post";

export type documentCategory =
  | "A - Application Form"
  | "A - First decision"
  | "A - Application for review"
  | "A - Review decision"
  | "A - Notice of Appeal"
  | "A - Evidence/correspondence from the Appellant"
  | "A - Correspondence from the CICA"
  | "TD - Direction / decision notices"
  | "B - Police evidence"
  | "C - GP records"
  | "C - Hospital records"
  | "C - Mental Health records"
  | "C - Expert evidence"
  | "C - Other medical records"
  | "D - DWP records"
  | "D - HMRC records"
  | "D - Employment records"
  | "D - Schedule of Loss"
  | "D - Counter Schedule"
  | "D - Other"
  | "E - Care plan"
  | "E - Local Authority/care records"
  | "E - Other"
  | "L - Linked docs"
  | "S - Witness Statement"
  | "TG - Application for an extension of time"
  | "TG - Application for a postponement"
  | "TG - Submission from appellant"
  | "TG - Submission from respondent"
  | "TG - Other"
  | "DSS Tribunal form uploaded documents"
  | "DSS Supporting uploaded documents"
  | "DSS Other information documents";

export type Scheme = "1996" | "2001" | "2008" | "2012";

export type caseRegion =
  | "Scotland"
  | "London"
  | "Midlands"
  | "North East"
  | "North West"
  | "Wales & South West";
