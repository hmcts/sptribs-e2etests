import { expect, Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import commonHelpers, {
  Category,
  ContactPreference,
  SubCategory,
} from "../../../helpers/commonHelpers.ts";
import submit_content from "../../../fixtures/content/CaseAPI/createCase/submit_content.ts";
import caseDateObjects_content from "../../../fixtures/content/CaseAPI/createCase/casedateObjects_content.ts";

type SubmitPage = {
  saveAndContinue: string;
  checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    contactPreference: ContactPreference,
    applicant: boolean,
    representative: boolean,
    multipleFiles: boolean,
  ): Promise<void>;
  handleStandardLabels(page: Page): Promise<void>;
  handleContactLabels(
    page: Page,
    applicant: boolean,
    representative: boolean,
    contactPreference: ContactPreference,
  ): Promise<void>;
  handleApplicantLabels(page: Page): Promise<void>;
  handleRepresentativeLabels(page: Page): Promise<void>;
  handleDocumentLabels(page: Page, multipleFiles: boolean): Promise<void>;
  checkValidInfo(
    page: Page,
    contactPreference: ContactPreference,
    applicant: boolean,
    representative: boolean,
    multipleFiles: boolean,
    category: Category,
    subCategory: SubCategory,
  ): Promise<void>;
  handleStandardInfo(
    page: Page,
    category: Category,
    subCategory: SubCategory,
  ): Promise<void>;
  handleContactInfo(
    page: Page,
    applicant: boolean,
    representative: boolean,
    contactPreference: ContactPreference,
  ): Promise<void>;
  handleApplicantInfo(page: Page): Promise<void>;
  handleRepresentativeInfo(page: Page): Promise<void>;
  handleDocumentInfo(page: Page, multipleFiles: boolean): Promise<void>;
};

const submitPage: SubmitPage = {
  saveAndContinue: '[type="submit"]',

  async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    contactPreference: ContactPreference,
    applicant: boolean,
    representative: boolean,
    multipleFiles: boolean,
  ): Promise<void> {
    await this.handleStandardLabels(page);
    await this.handleContactLabels(
      page,
      applicant,
      representative,
      contactPreference,
    );
    if (applicant) {
      await this.handleApplicantLabels(page);
    }
    if (representative) {
      await this.handleRepresentativeLabels(page);
    }
    await this.handleDocumentLabels(page, multipleFiles);
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async handleStandardLabels(page: Page): Promise<void> {
    await expect(page.locator(".govuk-heading-l")).toHaveText(
      submit_content.title,
    );
    await expect(page.locator(".heading-h2")).toHaveText(
      submit_content.subTitle1,
    );
    await expect(page.locator(".text-16").nth(0)).toHaveText(
      submit_content.textOnPage1,
    );
    await commonHelpers.checkVisibleAndPresent(
      page.locator(
        `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage2}")`,
      ),
      1,
    );
    await commonHelpers.checkVisibleAndPresent(
      page.locator(
        `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage3}")`,
      ),
      1,
    );
    await commonHelpers.checkVisibleAndPresent(
      page.locator(
        `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage4}")`,
      ),
      1,
    );
    await commonHelpers.checkVisibleAndPresent(
      page.locator(
        `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage5}")`,
      ),
      1,
    );
    await commonHelpers.checkVisibleAndPresent(
      page.locator(
        `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage6}")`,
      ),
      1,
    );
    await commonHelpers.checkVisibleAndPresent(
      page.locator(
        `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage7}")`,
      ),
      1,
    );
    await commonHelpers.checkVisibleAndPresent(
      page.locator(
        `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage8}")`,
      ),
      1,
    );
    await commonHelpers.checkVisibleAndPresent(
      page.locator(
        `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage9}")`,
      ),
      1,
    );
    await commonHelpers.checkVisibleAndPresent(
      page.locator(
        `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage45}")`,
      ),
      1,
    );
    await commonHelpers.checkVisibleAndPresent(
      page.locator(
        `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage46}")`,
      ),
      1,
    );
    await commonHelpers.checkVisibleAndPresent(
      page.locator(
        `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage47}")`,
      ),
      1,
    );
    await commonHelpers.checkVisibleAndPresent(
      page.locator(
        `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage48}")`,
      ),
      1,
    );
    await commonHelpers.checkVisibleAndPresent(
      page.locator(
        `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage49}")`,
      ),
      1,
    );
    await commonHelpers.checkVisibleAndPresent(
      page.locator(
        `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage50}")`,
      ),
      1,
    );
  },

  async handleContactLabels(
    page: Page,
    applicant: boolean,
    representative: boolean,
    contactPreference: ContactPreference,
  ): Promise<void> {
    switch (contactPreference) {
      case "Post":
        let count = 1;
        if (applicant && representative) {
          count = 3;
          // === Checking for subject's address field ===
          await commonHelpers.checkVisibleAndPresent(
            page.locator(
              `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage9}")`,
            ),
            1,
          );
          await commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.complex-panel-title > dt > span.text-16:text-is("${submit_content.textOnPage9}")`,
            ),
            1,
          );
          // === Checking for applicant's address field ===
          await commonHelpers.checkVisibleAndPresent(
            page.locator(
              `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage21}")`,
            ),
            1,
          );
          await commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.complex-panel-title > dt > span.text-16:text-is("${submit_content.textOnPage21}")`,
            ),
            1,
          );
          // === Checking for representative's address field ===
          await commonHelpers.checkVisibleAndPresent(
            page.locator(
              `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage32}")`,
            ),
            1,
          );
          await commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.complex-panel-title > dt > span.text-16:text-is("${submit_content.textOnPage32}")`,
            ),
            1,
          );
          await commonHelpers.checkVisibleAndPresent(
            page.locator(
              `th#complex-panel-simple-field-label > span.text-16:text-is("${submit_content.textOnPage10}")`,
            ),
            count,
          );
          await commonHelpers.checkVisibleAndPresent(
            page.locator(
              `th#complex-panel-simple-field-label > span.text-16:text-is("${submit_content.textOnPage11}")`,
            ),
            count,
          );
          await commonHelpers.checkVisibleAndPresent(
            page.locator(
              `th#complex-panel-simple-field-label > span.text-16:text-is("${submit_content.textOnPage12}")`,
            ),
            count,
          );
          await commonHelpers.checkVisibleAndPresent(
            page.locator(
              `th#complex-panel-simple-field-label > span.text-16:text-is("${submit_content.textOnPage13}")`,
            ),
            count,
          );
        } else if (applicant && !representative) {
          count = 2;
          // === Checking for subject's address field ===
          await commonHelpers.checkVisibleAndPresent(
            page.locator(
              `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage9}")`,
            ),
            1,
          );
          await commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.complex-panel-title > dt > span.text-16:text-is("${submit_content.textOnPage9}")`,
            ),
            1,
          );
          // === Checking for applicant's address field ===
          await commonHelpers.checkVisibleAndPresent(
            page.locator(
              `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage21}")`,
            ),
            1,
          );
          await commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.complex-panel-title > dt > span.text-16:text-is("${submit_content.textOnPage21}")`,
            ),
            1,
          );
          await commonHelpers.checkVisibleAndPresent(
            page.locator(
              `th#complex-panel-simple-field-label > span.text-16:text-is("${submit_content.textOnPage10}")`,
            ),
            count,
          );
          await commonHelpers.checkVisibleAndPresent(
            page.locator(
              `th#complex-panel-simple-field-label > span.text-16:text-is("${submit_content.textOnPage11}")`,
            ),
            count,
          );
          await commonHelpers.checkVisibleAndPresent(
            page.locator(
              `th#complex-panel-simple-field-label > span.text-16:text-is("${submit_content.textOnPage12}")`,
            ),
            count,
          );
          await commonHelpers.checkVisibleAndPresent(
            page.locator(
              `th#complex-panel-simple-field-label > span.text-16:text-is("${submit_content.textOnPage13}")`,
            ),
            count,
          );
        } else if (representative && !applicant) {
          count = 2;
          // === Checking for subject's address field ===
          await commonHelpers.checkVisibleAndPresent(
            page.locator(
              `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage9}")`,
            ),
            1,
          );
          await commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.complex-panel-title > dt > span.text-16:text-is("${submit_content.textOnPage9}")`,
            ),
            1,
          );
          // === Checking for representative's address field ===
          await commonHelpers.checkVisibleAndPresent(
            page.locator(
              `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage32}")`,
            ),
            1,
          );
          await commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.complex-panel-title > dt > span.text-16:text-is("${submit_content.textOnPage32}")`,
            ),
            1,
          );
          await commonHelpers.checkVisibleAndPresent(
            page.locator(
              `th#complex-panel-simple-field-label > span.text-16:text-is("${submit_content.textOnPage10}")`,
            ),
            count,
          );
          await commonHelpers.checkVisibleAndPresent(
            page.locator(
              `th#complex-panel-simple-field-label > span.text-16:text-is("${submit_content.textOnPage11}")`,
            ),
            count,
          );
          await commonHelpers.checkVisibleAndPresent(
            page.locator(
              `th#complex-panel-simple-field-label > span.text-16:text-is("${submit_content.textOnPage12}")`,
            ),
            count,
          );
          await commonHelpers.checkVisibleAndPresent(
            page.locator(
              `th#complex-panel-simple-field-label > span.text-16:text-is("${submit_content.textOnPage13}")`,
            ),
            count,
          );
        } else {
          // === Checking for subject's address field ===
          await commonHelpers.checkVisibleAndPresent(
            page.locator(
              `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage9}")`,
            ),
            count,
          );
          await commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.complex-panel-title > dt > span.text-16:text-is("${submit_content.textOnPage9}")`,
            ),
            count,
          );
          await commonHelpers.checkVisibleAndPresent(
            page.locator(
              `th#complex-panel-simple-field-label > span.text-16:text-is("${submit_content.textOnPage10}")`,
            ),
            count,
          );
          await commonHelpers.checkVisibleAndPresent(
            page.locator(
              `th#complex-panel-simple-field-label > span.text-16:text-is("${submit_content.textOnPage11}")`,
            ),
            count,
          );
          await commonHelpers.checkVisibleAndPresent(
            page.locator(
              `th#complex-panel-simple-field-label > span.text-16:text-is("${submit_content.textOnPage12}")`,
            ),
            count,
          );
          await commonHelpers.checkVisibleAndPresent(
            page.locator(
              `th#complex-panel-simple-field-label > span.text-16:text-is("${submit_content.textOnPage13}")`,
            ),
            count,
          );
        }
        break;
      case "Email":
        await commonHelpers.checkVisibleAndPresent(
          page.locator(
            `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage15}")`,
          ),
          1,
        );
        if (applicant) {
          await commonHelpers.checkVisibleAndPresent(
            page.locator(
              `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage20}")`,
            ),
            1,
          );
        }
        if (representative) {
          await commonHelpers.checkVisibleAndPresent(
            page.locator(
              `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage31}")`,
            ),
            1,
          );
        }
        break;
      default:
        console.log("You have not selected a valid contact type.");
        process.exit(1);
    }
  },

  async handleApplicantLabels(page: Page): Promise<void> {
    await commonHelpers.checkVisibleAndPresent(
      page.locator(
        `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage16}")`,
      ),
      1,
    );
    await commonHelpers.checkVisibleAndPresent(
      page.locator(
        `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage17}")`,
      ),
      1,
    );
    await commonHelpers.checkVisibleAndPresent(
      page.locator(
        `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage18}")`,
      ),
      1,
    );
    await commonHelpers.checkVisibleAndPresent(
      page.locator(
        `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage19}")`,
      ),
      1,
    );
  },

  async handleRepresentativeLabels(page: Page): Promise<void> {
    await commonHelpers.checkVisibleAndPresent(
      page.locator(
        `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage26}")`,
      ),
      1,
    );
    await commonHelpers.checkVisibleAndPresent(
      page.locator(
        `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage27}")`,
      ),
      1,
    );
    await commonHelpers.checkVisibleAndPresent(
      page.locator(
        `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage28}")`,
      ),
      1,
    );
    await commonHelpers.checkVisibleAndPresent(
      page.locator(
        `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage29}")`,
      ),
      1,
    );
    await commonHelpers.checkVisibleAndPresent(
      page.locator(
        `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage30}")`,
      ),
      1,
    );
  },

  async handleDocumentLabels(
    page: Page,
    multipleFiles: boolean,
  ): Promise<void> {
    await commonHelpers.checkVisibleAndPresent(
      page.locator(
        `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage38}")`,
      ),
      1,
    );
    await commonHelpers.checkVisibleAndPresent(
      page.locator(
        `.complex-panel-title > dt > span.text-16:text-is("${submit_content.textOnPage39}")`,
      ),
      1,
    );
    switch (multipleFiles) {
      default:
        await commonHelpers.checkVisibleAndPresent(
          page.locator(
            `th#complex-panel-simple-field-label > span.text-16:text-is("${submit_content.textOnPage40}")`,
          ),
          1,
        );
        await commonHelpers.checkVisibleAndPresent(
          page.locator(
            `th#complex-panel-simple-field-label > span.text-16:text-is("${submit_content.textOnPage41}")`,
          ),
          1,
        );
        await commonHelpers.checkVisibleAndPresent(
          page.locator(
            `th#complex-panel-simple-field-label > span.text-16:text-is("${submit_content.textOnPage42}")`,
          ),
          1,
        );
        break;
      case true: // uploaded 3 documents
        await commonHelpers.checkVisibleAndPresent(
          page.locator(
            `.complex-panel-title > dt > span.text-16:text-is("${submit_content.textOnPage43}")`,
          ),
          1,
        );
        await commonHelpers.checkVisibleAndPresent(
          page.locator(
            `.complex-panel-title > dt > span.text-16:text-is("${submit_content.textOnPage44}")`,
          ),
          1,
        );
        await commonHelpers.checkVisibleAndPresent(
          page.locator(
            `th#complex-panel-simple-field-label > span.text-16:text-is("${submit_content.textOnPage40}")`,
          ),
          3,
        );
        await commonHelpers.checkVisibleAndPresent(
          page.locator(
            `th#complex-panel-simple-field-label > span.text-16:text-is("${submit_content.textOnPage41}")`,
          ),
          3,
        );
        await commonHelpers.checkVisibleAndPresent(
          page.locator(
            `th#complex-panel-simple-field-label > span.text-16:text-is("${submit_content.textOnPage42}")`,
          ),
          3,
        );
        break;
    }
  },

  async checkValidInfo(
    page: Page,
    contactPreference: ContactPreference,
    applicant: boolean,
    representative: boolean,
    multipleFiles: boolean,
    category: Category,
    subCategory: SubCategory,
  ): Promise<void> {
    await this.handleStandardInfo(page, category, subCategory);
    await this.handleContactLabels(
      page,
      applicant,
      representative,
      contactPreference,
    );
    if (applicant) {
      await this.handleApplicantInfo(page);
    }
    if (representative) {
      await this.handleRepresentativeInfo(page);
    }
    await this.handleDocumentInfo(page, multipleFiles);
  },

  async handleStandardInfo(
    page: Page,
    category: Category,
    subCategory: SubCategory,
  ): Promise<void> {
    await commonHelpers.checkVisibleAndPresent(
      page.locator(
        `ccd-read-fixed-list-field > span.text-16:text-is("${category}")`,
      ),
      1,
    );
    await commonHelpers.checkVisibleAndPresent(
      page.locator(
        `ccd-read-fixed-list-field > span.text-16:text-is("${subCategory}")`,
      ),
      1,
    );
    const locator = `${caseDateObjects_content.day} ${commonHelpers.shortMonths(parseInt(caseDateObjects_content.month))} ${caseDateObjects_content.year}`
    await commonHelpers.checkVisibleAndPresent(
      page.locator(
        `ccd-read-date-field > span.text-16:text-is("${caseDateObjects_content.day} ${commonHelpers.shortMonths(parseInt(caseDateObjects_content.month))} ${caseDateObjects_content.year}")`,
      ),
      1,
    );
  },
  async handleContactInfo(
    page: Page,
    applicant: boolean,
    representative: boolean,
    contactPreference: ContactPreference,
  ): Promise<void> {},
  async handleApplicantInfo(page: Page): Promise<void> {},
  async handleRepresentativeInfo(page: Page): Promise<void> {},
  async handleDocumentInfo(
    page: Page,
    multipleFiles: boolean,
  ): Promise<void> {},
};

export default submitPage;
