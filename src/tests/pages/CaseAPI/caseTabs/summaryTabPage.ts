import { expect, Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import commonHelpers from "../../../helpers/commonHelpers.ts";
import summaryTabContent from "../../../fixtures/content/CaseAPI/caseTabs/summaryTab_content.ts";
import subjectDetailsContent from "../../../fixtures/content/DSSCreateCase/SubjectDetails_content.ts";
import subjectContactDetailsContent from "../../../fixtures/content/DSSCreateCase/SubjectContactDetails_content.ts";
import representativeDetailsContent from "../../../fixtures/content/DSSCreateCase/RepresentativeDetails_content.ts";
import createEditStaySubmit_content from "../../../fixtures/content/CaseAPI/createEditStay/submit_content.ts";
import removeStaySubmit_content from "../../../fixtures/content/CaseAPI/removeStay/submit_content.ts";
import addStay_content from "../../../fixtures/content/CaseAPI/createEditStay/addStay_content.ts";
import summaryTab_content from "../../../fixtures/content/CaseAPI/caseTabs/summaryTab_content.ts";
import removeStay_content from "../../../fixtures/content/CaseAPI/removeStay/removeStay_content.ts";

type SummaryTabPage = {
  summaryTab: string;
  checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    representationPresent: boolean,
    caseNumber: string,
  ): Promise<void>;
  changeToSummaryTab(page: Page): Promise<void>;
  checkPageInfo(
    page: Page,
    caseNumber: string,
    representationPresent: boolean,
    representationQualified: boolean,
  ): Promise<void>;
  checkStayDetails(
    page: Page,
    stayReason: keyof typeof createEditStaySubmit_content,
    optionalText: boolean,
  ): Promise<void>;
  checkRemoveStayDetails(
    page: Page,
    Remove: keyof typeof removeStaySubmit_content,
    optionalText: boolean,
  ): Promise<void>;
};

const summaryTabPage: SummaryTabPage = {
  summaryTab: ".mat-tab-label",

  async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    representationPresent: boolean,
    caseNumber: string,
  ): Promise<void> {
    await Promise.all([
      commonHelpers.checkAllCaseTabs(page, caseNumber),
      expect(page.locator("markdown[class='markdown'] h4")).toHaveText(
        summaryTabContent.caseState,
      ),
      expect(page.locator("dl[id='case-details'] h3")).toHaveText(
        summaryTabContent.subHeading1,
      ),
      ...Array.from({ length: 4 }, (_, index) => {
        const textOnPage = (summaryTabContent as any)[`textOnPage${index + 1}`];
        return expect(page.locator(".case-viewer-label").nth(index)).toHaveText(
          textOnPage,
        );
      }),
    ]);
    if (representationPresent) {
      await commonHelpers.checkVisibleAndPresent(
        page.locator(`h3:text-is("${summaryTabContent.subHeading2}")`),
        1,
      );
      await Promise.all([
        ...Array.from({ length: 5 }, (_, index) => {
          const textOnPage = (summaryTabContent as any)[
            `textOnPage${index + 5}`
          ];
          return expect(
            page.locator(".case-viewer-label").nth(index + 4),
          ).toHaveText(textOnPage);
        }),
      ]);
    }

    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async changeToSummaryTab(page: Page): Promise<void> {
    await page.locator(this.summaryTab).nth(1).click();
  },

  async checkPageInfo(
    page: Page,
    caseNumber: string,
    representationPresent: boolean,
    representationQualified: boolean,
  ): Promise<void> {
    await Promise.all([
      expect(
        page.locator("td[id='case-viewer-field-read--cicCaseFullName']"),
      ).toHaveText(subjectDetailsContent.name),
      expect(
        page.locator("ccd-read-date-field[class='ng-star-inserted']"),
      ).toHaveText(await commonHelpers.convertDate(true)),
      expect(
        page.locator("ccd-read-email-field[class='ng-star-inserted']").nth(0),
      ).toHaveText(subjectContactDetailsContent.emailAddress),
      expect(
        page.locator("ccd-read-text-field[class='ng-star-inserted']").nth(1),
      ).toHaveText(caseNumber),
    ]);
    if (representationPresent) {
      await Promise.all([
        expect(
          page.locator("ccd-read-text-field[class='ng-star-inserted']").nth(2),
        ).toHaveText(representativeDetailsContent.Organisation),
        expect(
          page.locator("ccd-read-text-field[class='ng-star-inserted']").nth(3),
        ).toHaveText(representativeDetailsContent.fullName),
        expect(
          page.locator("ccd-read-text-field[class='ng-star-inserted']").nth(4),
        ).toHaveText(representativeDetailsContent.contactNumber),
        expect(
          page.locator("ccd-read-email-field[class='ng-star-inserted']").nth(1),
        ).toHaveText(representativeDetailsContent.emailAddress),
      ]);
      if (representationQualified) {
        await expect(page.locator("ccd-read-yes-no-field").nth(0)).toHaveText(
          "Yes",
        );
      } else {
        await expect(page.locator("ccd-read-yes-no-field").nth(0)).toHaveText(
          "No",
        );
      }
    }
  },

  async checkStayDetails(
    page: Page,
    stayReason: keyof typeof createEditStaySubmit_content,
    optionalText: boolean,
  ): Promise<void> {
    const stayReasonText = createEditStaySubmit_content[stayReason];
    await Promise.all([
      commonHelpers.checkVisibleAndPresent(
        page.locator(`.text-16:text-is("${summaryTab_content.textOnPage10}")`),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(`.text-16:text-is("${summaryTab_content.textOnPage11}")`),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(`.text-16:text-is("${stayReasonText}")`),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `.text-16:text-is("${addStay_content.day} ${await commonHelpers.shortMonths(parseInt(addStay_content.month))} ${addStay_content.year}")`,
        ),
        1,
      ),
    ]);
    if (stayReason === "Other") {
      await Promise.all([
        commonHelpers.checkVisibleAndPresent(
          page.locator(
            `.text-16:text-is("${summaryTab_content.textOnPage13}")`,
          ),
          1,
        ),
        commonHelpers.checkVisibleAndPresent(
          page.locator(`span:text-is("${addStay_content.otherText}")`),
          1,
        ),
      ]);
    }
    if (optionalText) {
      await Promise.all([
        commonHelpers.checkVisibleAndPresent(
          page.locator(
            `.text-16:text-is("${summaryTab_content.textOnPage12}")`,
          ),
          1,
        ),
        commonHelpers.checkVisibleAndPresent(
          page.locator(`span:text-is("${addStay_content.optionalText}")`),
          1,
        ),
      ]);
    }
  },

  async checkRemoveStayDetails(
    page: Page,
    removeReason: keyof typeof removeStaySubmit_content,
    optionalText: boolean,
  ): Promise<void> {
    const removeReasonText = removeStaySubmit_content[removeReason];
    await Promise.all([
      commonHelpers.checkVisibleAndPresent(
        page.locator(`.text-16:text-is("${summaryTab_content.textOnPage14}")`),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(`.text-16:text-is("${summaryTab_content.textOnPage11}")`),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(`.text-16:text-is("${removeReasonText}")`),
        1,
      ),
    ]);
    if (removeReason === "Other") {
      await Promise.all([
        commonHelpers.checkVisibleAndPresent(
          page.locator(
            `.text-16:text-is("${summaryTab_content.textOnPage15}")`,
          ),
          1,
        ),
        commonHelpers.checkVisibleAndPresent(
          page.locator(`span:text-is("${removeStay_content.otherText}")`),
          1,
        ),
      ]);
    }
    if (optionalText) {
      await Promise.all([
        commonHelpers.checkVisibleAndPresent(
          page.locator(
            `.text-16:text-is("${summaryTab_content.textOnPage16}")`,
          ),
          1,
        ),
        commonHelpers.checkVisibleAndPresent(
          page.locator(`span:text-is("${removeStay_content.optionalText}")`),
          1,
        ),
      ]);
    }
  },
};

export default summaryTabPage;
