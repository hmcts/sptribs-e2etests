import { expect, Page } from "@playwright/test";
import createFlags3ReasonableAdjustment_content from "../../../fixtures/content/CaseAPI/createFlag/createFlagscaseworkerCaseFlag3_content.ts";
import caseSubjectDetailsObject_content from "../../../fixtures/content/CaseAPI/createCase/caseSubjectDetailsObject_content.ts";
import commonHelpers from "../../../helpers/commonHelpers.ts";
//import axeTest from "../../../helpers/accessibilityTestHelper.ts";

type CreateFlags3Page = {
    previous: string;
    continue: string;
    cancel: string;
    next: string;
    checkPageLoadsReasonableAdjustment(page:Page, accessibilityTest: boolean, caseNumber: string,):Promise<void>;
    selectAdjustmentType(page:Page, adjustmentType: any):Promise<void>;
};

const createFlags3Page: CreateFlags3Page = {
    previous: `.button-secondary:text-is("Previous")`,
    continue: '[type="submit"]',
    cancel: ".cancel",
    next: `button:text-is("Next")`,

async checkPageLoadsReasonableAdjustment(page:Page, accessibilityTest: boolean, caseNumber: string,): Promise<void> {
    await page.waitForSelector(`#flag-type-heading:text-is("${createFlags3ReasonableAdjustment_content.subTitle1}")`);
        
    await Promise.all([
        expect(page.locator(".govuk-heading-l")).toHaveText(
          `${createFlags3ReasonableAdjustment_content.pageTitle}`,
        ),
        expect(page.locator("markdown > h3")).toContainText(
          caseSubjectDetailsObject_content.name,
        ),
        expect(page.locator("markdown > p").first()).toContainText(
            createFlags3ReasonableAdjustment_content.caseReference + caseNumber,
        ),
        expect(
           page.locator(`#flag-type-heading:text-is("${createFlags3ReasonableAdjustment_content.subTitle1}")`),
         ).toBeVisible(),

         ...Array.from({ length: 8 }, (_, index: number) => {
            const textOnPage: ArrayConstructor = (createFlags3ReasonableAdjustment_content as any)[
              `textOnPage${index + 1}`
            ];
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
        await page.waitForSelector(`h1#flag-type-heading:text-is("${adjustmentType}")`)
},
};

export default createFlags3Page;