import { expect, Page } from "@playwright/test";
import createFlags5ReasonableAdjustment_content from "../../../fixtures/content/CaseAPI/createFlag/createFlagscaseworkerCaseFlag5_content.ts";
import caseSubjectDetailsObject_content from "../../../fixtures/content/CaseAPI/createCase/caseSubjectDetailsObject_content.ts";
import commonHelpers from "../../../helpers/commonHelpers.ts";
//import axeTest from "../../../helpers/accessibilityTestHelper.ts";

type CreateFlags5Page = {
    previous: string;
    continue: string;
    cancel: string;
    next: string;
    checkPageLoads(page:Page, accessibilityTest: boolean, caseNumber: string,):Promise<void>;
    addTextToTextBox(page:Page):Promise<void>;
};

const createFlags5Page: CreateFlags5Page = {
    previous: `.button-secondary:text-is("Previous")`,
    continue: '[type="submit"]',
    cancel: ".cancel",
    next: `button:text-is("Next")`,

async checkPageLoads(page:Page, accessibilityTest: boolean, caseNumber: string,): Promise<void> {
    await page.waitForSelector(`.govuk-label:text-is("${createFlags5ReasonableAdjustment_content.subTitle1}")`);
        
    await Promise.all([
        expect(page.locator(".govuk-heading-l")).toHaveText(
          `${createFlags5ReasonableAdjustment_content.pageTitle}`,
        ),
        expect(page.locator("markdown > h3")).toContainText(
          caseSubjectDetailsObject_content.name,
        ),
        expect(page.locator("markdown > p").first()).toContainText(
            createFlags5ReasonableAdjustment_content.caseReference + caseNumber,
        ),
        expect(
           page.locator(`.govuk-label:text-is("${createFlags5ReasonableAdjustment_content.subTitle1}")`),
         ).toBeVisible(),

         ...Array.from({ length: 2 }, (_, index: number) => {
            const textOnPage: ArrayConstructor = (createFlags5ReasonableAdjustment_content as any)[
              `textOnPage${index + 1}`
            ];
            return commonHelpers.checkVisibleAndPresent(
              page.locator(`.govuk-hint:text-is("${textOnPage}")`),
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

async addTextToTextBox(page):Promise<void> {
  await page.locator("textarea").fill(`${createFlags5ReasonableAdjustment_content.commentInputText}`)
  await page.locator(this.next).click();
  await page.waitForURL(/.*\/submit$/,)
}

};

export default createFlags5Page;