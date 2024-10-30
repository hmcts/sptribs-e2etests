import { expect, Page } from "@playwright/test";
import { RejectionReason } from "./rejectionDetailsPage.ts";
import commonHelpers from "../../../helpers/commonHelpers.ts";
import createListingListingDetailsContent from "../../../fixtures/content/CaseAPI/createListing/createListingListingDetails_content.ts";
import submit_content from "../../../fixtures/content/CaseAPI/closeCase/submit_content.ts";
import { CaseCloseReason } from "./selectReasonPage.ts";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import uploadDocuments_content from "../../../fixtures/content/CaseAPI/closeCase/uploadDocuments_content.ts";
import path from "path";
import config from "../../../config.ts";
import selectReason_content from "../../../fixtures/content/CaseAPI/closeCase/selectReason_content.ts";
import withdrawalDetails_content from "../../../fixtures/content/CaseAPI/closeCase/withdrawalDetails_content.ts";
import rejectionDetails_content from "../../../fixtures/content/CaseAPI/closeCase/rejectionDetails_content.ts";
import { StrikeoutReason } from "./strikeoutDetailsPage.ts";
import strikeoutDetails_content from "../../../fixtures/content/CaseAPI/closeCase/strikeoutDetails_content.ts";
import concessionDetails_content from "../../../fixtures/content/CaseAPI/closeCase/concessionDetails_content.ts";
import consentOrder_content from "../../../fixtures/content/CaseAPI/closeCase/consentOrder_content.ts";
import rule27_content from "../../../fixtures/content/CaseAPI/closeCase/rule27_content.ts";

type SubmitPage = {
  continue: string;
  previous: string;
  cancel: string;
  checkCommon(
    page: Page,
    caseNumber: string,
    subjectName: string,
  ): Promise<void>;
  checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
    closeReason: CaseCloseReason,
    optionalText: boolean,
    subjectName: string,
  ): Promise<void>;
  checkCommonInfo(page: Page): Promise<void>;
  checkAllInfo(
    page: Page,
    closeReason: CaseCloseReason,
    optionalText: boolean,
    rejectionReason: RejectionReason | null,
    strikeoutReason: StrikeoutReason | null,
  ): Promise<void>;
  continueOn(page: Page): Promise<void>;
};

const submitPage: SubmitPage = {
  continue: '[type="submit"]',
  previous: ".button-secondary",
  cancel: ".cancel",

  async checkCommon(
    page: Page,
    caseNumber: string,
    subjectName: string,
  ): Promise<void> {
    await page.waitForSelector(
      `.govuk-heading-l:text-is("${submit_content.pageHint}")`,
    );
    await Promise.all([
      expect(page.locator("markdown > h3")).toContainText(`${subjectName}`),
      expect(page.locator("markdown > p").nth(0)).toContainText(
        createListingListingDetailsContent.caseReference + caseNumber,
      ),
      ...Array.from({ length: 7 }, (_, index: number) => {
        const textOnPage = (submit_content as any)[`textOnPage${index + 2}`];
        return commonHelpers.checkVisibleAndPresent(
          page.locator(`.text-16:text-is("${textOnPage}")`),
          1,
        );
      }),
      commonHelpers.checkVisibleAndPresent(
        page.locator(`.text-16:text-is("${submit_content.textOnPage9}")`),
        4,
      ),
      commonHelpers.checkForButtons(
        page,
        this.continue,
        this.previous,
        this.cancel,
      ),
    ]);
  },

  async checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
    closeReason: CaseCloseReason,
    optionalText: boolean,
    subjectName: string,
  ): Promise<void> {
    switch (closeReason) {
      default: // Case withdrawn
        await Promise.all([
          this.checkCommon(page, caseNumber, subjectName),
          ...Array.from({ length: 2 }, (_, index: number) => {
            const textOnPage = (submit_content as any)[`withdrawn${index + 1}`];
            return commonHelpers.checkVisibleAndPresent(
              page.locator(`.text-16:text-is("${textOnPage}")`),
              1,
            );
          }),
        ]);
        if (optionalText) {
          await commonHelpers.checkVisibleAndPresent(
            page.locator(`.text-16:text-is("${submit_content.textOnPage1}")`),
            1,
          );
        }
        break;
      case "caseRejected":
        await Promise.all([
          this.checkCommon(page, caseNumber, subjectName),
          commonHelpers.checkVisibleAndPresent(
            page.locator(`.text-16:text-is("${submit_content.rejected1}")`),
            1,
          ),
        ]);
        if (optionalText) {
          await commonHelpers.checkVisibleAndPresent(
            page.locator(`.text-16:text-is("${submit_content.textOnPage1}")`),
            1,
          );
        }
        break;
      case "caseStrikeOut":
        await Promise.all([
          this.checkCommon(page, caseNumber, subjectName),
          commonHelpers.checkVisibleAndPresent(
            page.locator(`.text-16:text-is("${submit_content.strikeOut1}")`),
            1,
          ),
        ]);
        if (optionalText) {
          await commonHelpers.checkVisibleAndPresent(
            page.locator(`.text-16:text-is("${submit_content.textOnPage1}")`),
            1,
          );
        }
        break;
      case "caseConcession":
        await Promise.all([
          this.checkCommon(page, caseNumber, subjectName),
          commonHelpers.checkVisibleAndPresent(
            page.locator(`.text-16:text-is("${submit_content.conceded}")`),
            1,
          ),
        ]);
        if (optionalText) {
          await commonHelpers.checkVisibleAndPresent(
            page.locator(`.text-16:text-is("${submit_content.textOnPage1}")`),
            1,
          );
        }
        break;
      case "consentOrder":
        await Promise.all([
          this.checkCommon(page, caseNumber, subjectName),
          commonHelpers.checkVisibleAndPresent(
            page.locator(`.text-16:text-is("${submit_content.consentOrder}")`),
            1,
          ),
        ]);
        if (optionalText) {
          await commonHelpers.checkVisibleAndPresent(
            page.locator(`.text-16:text-is("${submit_content.textOnPage1}")`),
            1,
          );
        }
        break;
      case "rule27":
        await Promise.all([
          this.checkCommon(page, caseNumber, subjectName),
          commonHelpers.checkVisibleAndPresent(
            page.locator(`.text-16:text-is("${submit_content.rule27}")`),
            1,
          ),
        ]);
        if (optionalText) {
          await commonHelpers.checkVisibleAndPresent(
            page.locator(`.text-16:text-is("${submit_content.textOnPage1}")`),
            1,
          );
        }
        break;
      case "deathOfAppellant":
        if (optionalText) {
          await commonHelpers.checkVisibleAndPresent(
            page.locator(`.text-16:text-is("${submit_content.textOnPage1}")`),
            1,
          );
        }
        break;
    }
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async checkCommonInfo(page: Page): Promise<void> {
    await Promise.all([
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `.text-16:text-is("${uploadDocuments_content.uploadedDocumentCategory}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `span:text-is("${uploadDocuments_content.uploadedDocumentDescription}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `.ng-star-inserted:text-is("${path.basename(config.testPdfFile)}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(`.text-16:text-is("Subject")`),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(`.text-16:text-is("Representative")`),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(`.text-16:text-is("Respondent")`),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `.text-16:text-is("Applicant (if different from subject)")`,
        ),
        1,
      ),
    ]);
  },

  async checkAllInfo(
    page: Page,
    closeReason: CaseCloseReason,
    optionalText: boolean,
    rejectionReason: RejectionReason | null,
    strikeoutReason: StrikeoutReason | null,
  ): Promise<void> {
    switch (closeReason) {
      default: // Case withdrawn
        await Promise.all([
          this.checkCommonInfo(page),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.text-16:text-is("${selectReason_content.textOnPage2}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.text-16:text-is("${withdrawalDetails_content.withdrawalName}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.text-16:text-is("${withdrawalDetails_content.day} ${await commonHelpers.shortMonths(parseInt(withdrawalDetails_content.month))} ${withdrawalDetails_content.year}")`,
            ),
            1,
          ),
        ]);
        if (optionalText) {
          await commonHelpers.checkVisibleAndPresent(
            page.locator(
              `span:text-is("${selectReason_content.optionalText}")`,
            ),
            1,
          );
        }
        break;
      case "caseRejected":
        switch (rejectionReason) {
          case "other":
            await Promise.all([
              this.checkCommonInfo(page),
              commonHelpers.checkVisibleAndPresent(
                page.locator(`.text-16:text-is("${submit_content.rejected2}")`),
                1,
              ),
              commonHelpers.checkVisibleAndPresent(
                page.locator(
                  `.text-16:text-is("${selectReason_content.textOnPage3}")`,
                ),
                1,
              ),
              commonHelpers.checkVisibleAndPresent(
                page.locator(
                  `.text-16:text-is("${rejectionDetails_content.textOnPage7}")`,
                ),
                1,
              ),
              commonHelpers.checkVisibleAndPresent(
                page.locator(
                  `.text-16:text-is("${rejectionDetails_content.otherText}")`,
                ),
                1,
              ),
            ]);
            break;
          case "createdInError":
            await Promise.all([
              this.checkCommonInfo(page),
              commonHelpers.checkVisibleAndPresent(
                page.locator(
                  `.text-16:text-is("${selectReason_content.textOnPage3}")`,
                ),
                1,
              ),
              commonHelpers.checkVisibleAndPresent(
                page.locator(
                  `.text-16:text-is("${rejectionDetails_content.textOnPage3}")`,
                ),
                1,
              ),
            ]);
            break;
          case "duplicateCase":
            await Promise.all([
              this.checkCommonInfo(page),
              commonHelpers.checkVisibleAndPresent(
                page.locator(
                  `.text-16:text-is("${selectReason_content.textOnPage3}")`,
                ),
                1,
              ),
              commonHelpers.checkVisibleAndPresent(
                page.locator(
                  `.text-16:text-is("${rejectionDetails_content.textOnPage5}")`,
                ),
                1,
              ),
            ]);
            break;
          case "deadlineMissed":
            await Promise.all([
              this.checkCommonInfo(page),
              commonHelpers.checkVisibleAndPresent(
                page.locator(
                  `.text-16:text-is("${selectReason_content.textOnPage3}")`,
                ),
                1,
              ),
              commonHelpers.checkVisibleAndPresent(
                page.locator(
                  `.text-16:text-is("${rejectionDetails_content.textOnPage4}")`,
                ),
                1,
              ),
            ]);
            break;
          case "vexatiousLitigant":
            await Promise.all([
              this.checkCommonInfo(page),
              commonHelpers.checkVisibleAndPresent(
                page.locator(
                  `.text-16:text-is("${selectReason_content.textOnPage3}")`,
                ),
                1,
              ),
              commonHelpers.checkVisibleAndPresent(
                page.locator(
                  `.text-16:text-is("${rejectionDetails_content.textOnPage6}")`,
                ),
                1,
              ),
            ]);
            break;
          default:
            throw new Error("No rejection reason given.");
        }
        if (optionalText) {
          await commonHelpers.checkVisibleAndPresent(
            page.locator(
              `span:text-is("${selectReason_content.optionalText}")`,
            ),
            1,
          );
        }
        break;
      case "caseStrikeOut":
        switch (strikeoutReason) {
          case "other":
            await Promise.all([
              this.checkCommonInfo(page),
              commonHelpers.checkVisibleAndPresent(
                page.locator(
                  `.text-16:text-is("${submit_content.strikeOut2}")`,
                ),
                1,
              ),
              commonHelpers.checkVisibleAndPresent(
                page.locator(
                  `.text-16:text-is("${selectReason_content.textOnPage4}")`,
                ),
                1,
              ),
              commonHelpers.checkVisibleAndPresent(
                page.locator(
                  `.text-16:text-is("${strikeoutDetails_content.textOnPage4}")`,
                ),
                1,
              ),
              commonHelpers.checkVisibleAndPresent(
                page.locator(
                  `.text-16:text-is("${strikeoutDetails_content.otherText}")`,
                ),
                1,
              ),
            ]);
            break;
          case "noncomplianceWithDirections":
            await Promise.all([
              this.checkCommonInfo(page),
              commonHelpers.checkVisibleAndPresent(
                page.locator(
                  `.text-16:text-is("${selectReason_content.textOnPage4}")`,
                ),
                1,
              ),
              commonHelpers.checkVisibleAndPresent(
                page.locator(
                  `.text-16:text-is("${strikeoutDetails_content.textOnPage3}")`,
                ),
                1,
              ),
            ]);
            break;
          default:
            throw new Error("No strikeout reason given.");
        }
        if (optionalText) {
          await commonHelpers.checkVisibleAndPresent(
            page.locator(
              `span:text-is("${selectReason_content.optionalText}")`,
            ),
            1,
          );
        }
        break;
      case "caseConcession":
        await Promise.all([
          this.checkCommonInfo(page),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.text-16:text-is("${selectReason_content.textOnPage5}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.text-16:text-is("${concessionDetails_content.day} ${await commonHelpers.shortMonths(parseInt(concessionDetails_content.month))} ${concessionDetails_content.year}")`,
            ),
            1,
          ),
        ]);
        if (optionalText) {
          await commonHelpers.checkVisibleAndPresent(
            page.locator(
              `span:text-is("${selectReason_content.optionalText}")`,
            ),
            1,
          );
        }
        break;
      case "consentOrder":
        await Promise.all([
          this.checkCommonInfo(page),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.text-16:text-is("${selectReason_content.textOnPage6}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.text-16:text-is("${consentOrder_content.day} ${await commonHelpers.shortMonths(parseInt(consentOrder_content.month))} ${consentOrder_content.year}")`,
            ),
            1,
          ),
        ]);
        if (optionalText) {
          await commonHelpers.checkVisibleAndPresent(
            page.locator(
              `span:text-is("${selectReason_content.optionalText}")`,
            ),
            1,
          );
        }
        break;
      case "rule27":
        await Promise.all([
          this.checkCommonInfo(page),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.text-16:text-is("${selectReason_content.textOnPage7}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.text-16:text-is("${rule27_content.day} ${await commonHelpers.shortMonths(parseInt(rule27_content.month))} ${rule27_content.year}")`,
            ),
            1,
          ),
        ]);
        if (optionalText) {
          await commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.ng-valid > div > .ng-valid > div > ccd-read-text-area-field > span:text-is("${selectReason_content.optionalText}")`,
            ),
            1,
          );
        }
        break;
      case "deathOfAppellant":
        await Promise.all([
          this.checkCommonInfo(page),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.text-16:text-is("${selectReason_content.textOnPage9}")`,
            ),
            1,
          ),
        ]);
        if (optionalText) {
          await commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.ng-valid > div > .ng-valid > div > ccd-read-text-area-field > span:text-is("${selectReason_content.optionalText}")`,
            ),
            1,
          );
        }
        break;
    }
  },

  async continueOn(page: Page): Promise<void> {
    await page.click(this.continue);
  },
};

export default submitPage;
