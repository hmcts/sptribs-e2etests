import { expect, Page } from "@playwright/test";
import createFlags4ReasonableAdjustment_content from "../../../fixtures/content/CaseAPI/createFlag/createFlagscaseworkerCaseFlag4_content.ts";
import caseSubjectDetailsObject_content from "../../../fixtures/content/CaseAPI/createCase/caseSubjectDetailsObject_content.ts";
import commonHelpers from "../../../helpers/commonHelpers.ts";
//import axeTest from "../../../helpers/accessibilityTestHelper.ts";

type CreateFlags4Page = {
  previous: string;
  continue: string;
  cancel: string;
  next: string;
  checkPageLoadsReasonableAdjustAltFormat(
    page: Page,
    accessibilityTest: boolean,
    caseNumber: string,
  ): Promise<void>;
  selectAdjustmentType(page: Page, adjustmentType: any): Promise<void>;
  addTextToTextBox(page: Page): Promise<void>;
};

const createFlags4Page: CreateFlags4Page = {
  previous: `.button-secondary:text-is("Previous")`,
  continue: '[type="submit"]',
  cancel: ".cancel",
  next: `button:text-is("Next")`,

  async checkPageLoadsReasonableAdjustAltFormat(
    page: Page,
    accessibilityTest: boolean,
    caseNumber: string,
  ): Promise<void> {
    await page.waitForSelector(
      `#flag-type-heading:text-is("${createFlags4ReasonableAdjustment_content.subTitle1}")`,
    );

    await Promise.all([
      expect(page.locator(".govuk-heading-l")).toHaveText(
        `${createFlags4ReasonableAdjustment_content.pageTitle}`,
      ),
      expect(page.locator("markdown > h3")).toContainText(
        caseSubjectDetailsObject_content.name,
      ),
      expect(page.locator("markdown > p").first()).toContainText(
        createFlags4ReasonableAdjustment_content.caseReference + caseNumber,
      ),
      expect(
        page.locator(
          `#flag-type-heading:text-is("${createFlags4ReasonableAdjustment_content.subTitle1}")`,
        ),
      ).toBeVisible(),

      ...Array.from({ length: 8 }, (_, index: number) => {
        const textOnPage: ArrayConstructor = (
          createFlags4ReasonableAdjustment_content as any
        )[`textOnPage${index + 1}`];
        return commonHelpers.checkVisibleAndPresent(
          page.locator(`.govuk-label:text-is("${textOnPage}")`),
          1,
        );
      }),

      commonHelpers.checkForButtons(
        page,
        this.continue,
        this.previous,
        this.cancel,
      ),
      expect(page.locator(this.next)).toBeVisible(),
    ]);
    //   if (accessibilityTest) {
    //     await axeTest(page);
    //   }
  },
  async selectAdjustmentType(page, adjustmentType): Promise<void> {
    await page.locator(`.govuk-label:text-is("${adjustmentType}")`).click();
    await page.locator(this.next).click();
    await page.waitForSelector(
      `.govuk-label:text-is(" Add comments for this flag")`,
    );
  },

  async addTextToTextBox(page): Promise<void> {
    await page.locator("textarea").fill(" Test comments for flag");
  },
};

export default createFlags4Page;
