import { expect, Page } from "@playwright/test";
import createFlags1_content from "../../../fixtures/content/CaseAPI/createFlag/createFlagscaseworkerCaseFlag1_content.ts";
import caseSubjectDetailsObject_content from "../../../fixtures/content/CaseAPI/createCase/caseSubjectDetailsObject_content.ts";
import commonHelpers from "../../../helpers/commonHelpers.ts";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";

type CreateFlags1Page = {
  previous: string;
  continue: string;
  cancel: string;
  next: string;
  checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    caseNumber: string,
  ): Promise<void>;
  selectFlagLocation(page: Page, flagLocation: any): Promise<void>;
};

const createFlags1Page: CreateFlags1Page = {
  previous: `.button-secondary:text-is("Previous")`,
  continue: '[type="submit"]',
  cancel: ".cancel",
  next: `button:text-is("Next")`,

  async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    caseNumber: string,
  ): Promise<void> {
    await page.waitForURL(/.*\/createFlagscaseworkerCaseFlag$/);
    await Promise.all([
      expect(page.locator(".govuk-heading-l")).toHaveText(
        `${createFlags1_content.pageTitle}`,
      ),
      expect(page.locator("markdown > h3")).toContainText(
        caseSubjectDetailsObject_content.name,
      ),
      expect(page.locator("markdown > p").first()).toContainText(
        createFlags1_content.caseReference + caseNumber,
      ),
      expect(
        page.locator(
          `#flag-location-heading:text-is("${createFlags1_content.subTitle1}")`,
        ),
      ).toBeVisible(),

      ...Array.from({ length: 4 }, (_, index: number) => {
        const textOnPage: ArrayConstructor = (createFlags1_content as any)[
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
  async selectFlagLocation(page, flagLocation): Promise<void> {
    const radioButtonLabel: { [key: string]: string } = {
      applicant: createFlags1_content.textOnPage1,
      subject: createFlags1_content.textOnPage4,
      representative: createFlags1_content.textOnPage3,
      caseLevel: createFlags1_content.textOnPage2,
    };
    const label = radioButtonLabel[flagLocation];
    if (label) {
      await page.locator(`.govuk-label:text-is("${label}")`).click();
      await page.locator(this.next).click();
      await page.waitForSelector(
        `h1#flag-type-heading:text-is(" Select flag type ")`,
      );
    }
  },
};

export default createFlags1Page;
