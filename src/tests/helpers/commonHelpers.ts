import subjectDetailsPage from "../fixtures/content/DSSCreateCase/SubjectDetails_content";
import { expect, Locator, Page } from "@playwright/test";
import authors_content from "../fixtures/content/authors_content.ts";
import CookiesContent from "../fixtures/content/cookies_content.ts";
import caseDocumentsUploadObject_content from "../fixtures/content/CaseAPI/createCase/caseDocumentsUploadObject_content.ts";
import allTabTitles_content from "../fixtures/content/CaseAPI/caseTabs/allTabTitles_content.ts";
import SubjectDetails_content from "../fixtures/content/DSSCreateCase/SubjectDetails_content";
import CaseFinderContent from "../fixtures/content/DSSUpdateCase/CaseFinder_content.ts";
import feedbackBanner_content from "../fixtures/content/DSSUpdateCase/feedbackBanner_content.ts";

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
  checkAndAcceptCookies(page: Page, service: string): Promise<void>;
  chooseEventFromDropdown(page: Page, chosenEvent: allEvents): Promise<void>;
  checkNumberAndSubject(page: Page, caseNumber: string): Promise<void>;
  checkAllCaseTabs(page: Page, caseNumber: string): Promise<void>;
  generateUrl(baseURL: string, caseNumber: string): Promise<string>;
  feedbackBanner(page: Page, landingPage: boolean): Promise<void>;
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
    } else {
      await new Promise((resolve) => setTimeout(resolve, 5000)); // Handle EXUI file rate limiting.
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
    const promises = Array.from({ length: count }, (_, i) => {
      return expect(locator.nth(i)).toBeVisible();
    });
    await Promise.all([promises, expect(locator).toHaveCount(count)]);
  },

  async chooseEventFromDropdown(
    page: Page,
    chosenEvent: string,
  ): Promise<void> {
    await page.selectOption("#next-step", chosenEvent);
    await page.getByRole("button", { name: "Go" }).click();
  },

  async checkNumberAndSubject(page: Page, caseNumber: string): Promise<void> {
    await Promise.all([
      expect(
        page.locator(
          "ccd-case-header > div > ccd-label-field > dl > dt > ccd-markdown > div > markdown > h3",
        ),
      ).toHaveText(SubjectDetails_content.name),
      expect(page.locator(".case-field").first()).toContainText(
        allTabTitles_content.pageTitle + caseNumber,
      ),
    ]);
  },

  async checkAllCaseTabs(page: Page, caseNumber: string): Promise<void> {
    await Promise.all([
      this.checkNumberAndSubject(page, caseNumber),
      Array.from({ length: 15 }, (_, index) => {
        if (index !== 11) {
          // Exclude tab 12 (index 11)
          const textOnPage = (allTabTitles_content as any)[`tab${index + 1}`];
          return commonHelpers.checkVisibleAndPresent(
            page.locator(`.mat-tab-label-content:text-is("${textOnPage}")`),
            1,
          );
        }
      }).filter(Boolean),
    ]);
  },

  async generateUrl(baseURL: string, caseNumber: string): Promise<string> {
    const caseNumberDigits = caseNumber.replace(/\D/g, "");
    return `${baseURL}/case-details/${caseNumberDigits}#History`;
  },

  async checkAndAcceptCookies(page: Page, service: string): Promise<void> {
    if (service == "UC") {
      await Promise.all([
        expect(page.locator(".govuk-cookie-banner__heading")).toHaveText(
          CookiesContent.title + CaseFinderContent.header,
        ),
        ...Array.from({ length: 2 }, (_, index) => {
          const textOnPage = (CookiesContent as any)[`textOnPage${index + 1}`];
          return expect(page.locator(".govuk-body").nth(index)).toContainText(
            textOnPage,
          );
        }),
      ]);
    }
    await page.locator(".govuk-button").nth(0).click();
    await page.getByRole("button", { name: "Hide this message" }).click();
  },

  async feedbackBanner(page: Page, landingPage: boolean): Promise<void> {
    if (landingPage) {
      await Promise.all([
        expect(page.locator(".govuk-phase-banner__text")).toContainText(
          feedbackBanner_content.feedbackBanner,
        ),
        expect(page.locator("a.govuk-link").nth(0)).toHaveText(
          feedbackBanner_content.feedbackLinkText,
        ),
        expect(page.locator("a.govuk-link").nth(0)).toHaveAttribute(
          "href",
          feedbackBanner_content.feedbackLink,
        ),
      ]);
    } else {
      await Promise.all([
        expect(page.locator(".govuk-phase-banner__text")).toContainText(
          feedbackBanner_content.feedbackBanner,
        ),
        expect(page.locator("a.govuk-link").nth(3)).toHaveText(
          feedbackBanner_content.feedbackLinkText,
        ),
        expect(
          await page.locator("a.govuk-link").nth(3).getAttribute("href"),
        ).toContain(feedbackBanner_content.feedbackLink),
      ]);
    }
  },
};

export default commonHelpers;

export type parties = "Subject" | "Representative" | "Respondent" | "Applicant";

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

export type caseRegionCode =
  | "1-London"
  | "11-Scotland"
  | "2-Midlands"
  | "3-North East"
  | "4-North West"
  | "5-South East"
  | "6-South West"
  | "7-Wales";

export type allEvents =
  | "Submit case (cic)"
  | "Create Case"
  | "Case: Build case"
  | "To link related cases"
  | "Case: Issue to respondent"
  | "Case: Hearing Options"
  | "Link cases";
