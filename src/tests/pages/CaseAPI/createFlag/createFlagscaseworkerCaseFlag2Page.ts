import { expect, Page } from "@playwright/test";
import createFlags2_content from "../../../fixtures/content/CaseAPI/createFlag/createFlagscaseworkerCaseFlag2_content.ts";
import caseSubjectDetailsObject_content from "../../../fixtures/content/CaseAPI/createCase/caseSubjectDetailsObject_content.ts";
import commonHelpers from "../../../helpers/commonHelpers.ts";
//import axeTest from "../../../helpers/accessibilityTestHelper.ts";

type CreateFlags2Page = {
    previous: string;
    continue: string;
    cancel: string;
    next: string;
    checkPageLoads(page:Page, accessibilityTest: boolean, caseNumber: string,):Promise<void>;
    selectFlagType(page:Page, flagType: any):Promise<void>;
};

const createFlags2Page: CreateFlags2Page = {
    previous: `.button-secondary:text-is("Previous")`,
    continue: '[type="submit"]',
    cancel: ".cancel",
    next: `button:text-is("Next")`,

async checkPageLoads(page:Page, accessibilityTest: boolean, caseNumber: string,): Promise<void> {
    await Promise.all([
        expect(page.locator(".govuk-heading-l")).toHaveText(
          `${createFlags2_content.pageTitle}`,
        ),
        expect(page.locator("markdown > h3")).toContainText(
          caseSubjectDetailsObject_content.name,
        ),
        expect(page.locator("markdown > p").first()).toContainText(
            createFlags2_content.caseReference + caseNumber,
        ),
        expect(
           page.locator(`#flag-type-heading:text-is("${createFlags2_content.subTitle1}")`),
         ).toBeVisible(),
  
        ...Array.from({ length: 4 }, (_, index: number) => {
          const textOnPage: ArrayConstructor = (createFlags2_content as any)[
            `textOnPage${index + 1}`
          ];
          return commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-label:text-is("${textOnPage}")`,
            ),
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
async selectFlagType(page, flagType): Promise<void> {
        await page.locator(`.govuk-label:text-is("${flagType}")`).click();
        await page.locator(this.next).click();
},
};

export default createFlags2Page;