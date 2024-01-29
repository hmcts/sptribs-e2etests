import subjectDetailsPage from "../fixtures/content/DSSCreateCase/SubjectDetails_content";
import { expect, Page } from "@playwright/test";
import caseSubjectDetailsObject_content from "../fixtures/content/CaseAPI/createCase/caseSubjectDetailsObject_content.ts";

interface CommonHelpers {
  readonly months: string[];
  padZero(value: number): string;
  postcodeHandler(page: Page, party: string): Promise<void>;
  convertDate(tab: boolean): Promise<string>;
  getTimestamp(): Promise<string>;
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
    await page.fill(postCode, caseSubjectDetailsObject_content.postCode);
    await page.click(findAddress);
    await page.selectOption(
      selectAddress,
      caseSubjectDetailsObject_content.selectOption,
    );
    expect(await page.inputValue(buildingAndStreet)).toEqual(
      caseSubjectDetailsObject_content.buildingAndStreet,
    );
    expect(await page.inputValue(addressLine2)).toEqual("");
    expect(await page.inputValue(addressLine3)).toEqual("");
    expect(await page.inputValue(townOrCity)).toEqual(
      caseSubjectDetailsObject_content.townOrCity,
    );
    expect(await page.inputValue(countyState)).toEqual("");
    expect(await page.inputValue(country)).toEqual(
      caseSubjectDetailsObject_content.country,
    );
    expect(await page.inputValue(postcodeZipcode)).toEqual(
      caseSubjectDetailsObject_content.postCode,
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
