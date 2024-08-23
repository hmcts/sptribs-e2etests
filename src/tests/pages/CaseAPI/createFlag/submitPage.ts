import { expect, Page } from "@playwright/test";
import submit_content from "../../../fixtures/content/CaseAPI/createFlag/submit_content.ts";
import caseSubjectDetailsObject_content from "../../../fixtures/content/CaseAPI/createCase/caseSubjectDetailsObject_content.ts";
import createFlags5ReasonableAdjustment_content from "../../../fixtures/content/CaseAPI/createFlag/createFlagscaseworkerCaseFlag5_content.ts";
import commonHelpers from "../../../helpers/commonHelpers.ts";
//import axeTest from "../../../helpers/accessibilityTestHelper.ts";

type SubmitPage = {
    saveAndContinue: string;
    cancel: string;
    comment: string;
    checkPageLoads(page:Page, accessibilityTest: boolean, caseNumber: string,):Promise<void>;
    checkSummaryInfo(page:Page, flagLocation: string, flagType: string ): Promise<void>;
    clickSaveAndContinue(page:Page):Promise<void>;
};

const submitPage: SubmitPage = {
    saveAndContinue: '[type="submit"]',
    cancel: ".cancel",
    comment: "Test comments for flag",

async checkPageLoads(page:Page, accessibilityTest: boolean, caseNumber: string,): Promise<void> {
    await page.waitForSelector(`h2:text-is("${submit_content.subTitle1}")`);
        
    await Promise.all([
        expect(page.locator(".govuk-heading-l")).toHaveText(
          `${submit_content.pageTitle}`,
        ),
        expect(page.locator("markdown > h3")).toContainText(
          caseSubjectDetailsObject_content.name,
        ),
        expect(page.locator("markdown > p").first()).toContainText(
            submit_content.caseReference + caseNumber,
        ),
        expect(
           page.locator(`h2:text-is("${submit_content.subTitle1}")`),
         ).toBeVisible(),

         ...Array.from({ length: 4 }, (_, index: number) => {
            const textOnPage: ArrayConstructor = (submit_content as any)[
              `textOnPage${index + 1}`
            ];
            return commonHelpers.checkVisibleAndPresent(
              page.locator(`.govuk-summary-list__key:text-is("${textOnPage}")`),
              1,
            );
          }),

        expect(page.locator(this.saveAndContinue)).toBeVisible(),
        expect(page.locator(this.cancel)).toBeVisible(),
      ]);
    //   if (accessibilityTest) {
    //     await axeTest(page);
    //   }
    },


    async checkSummaryInfo(page, flagLocation, flagType):Promise<void> {
        
        expect(page.locator(`.govuk-summary-list__value:text-is("${flagLocation}")`)).toBeVisible()
        //expect(page.getByRole('cell').getByText(`${flagLocation}`)).toBeVisible()
        expect(page.getByText(`${flagType}`)).toBeVisible()
        expect(page.getByText(`${createFlags5ReasonableAdjustment_content.commentInputText}`)).toBeVisible()
        expect(page.getByText(" Active ")).toBeVisible()
    },

    async clickSaveAndContinue(page):Promise<void> {

    }

};

export default submitPage;